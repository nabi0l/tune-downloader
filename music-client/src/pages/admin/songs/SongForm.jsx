import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { FaSpinner, FaArrowLeft, FaSave } from 'react-icons/fa';

const SongForm = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    album: '',
    duration: 0,
    genre: '',
    releaseDate: '',
    lyrics: '',
    audioFile: null,
    coverImage: null,
    isExplicit: false,
    isFeatured: false,
  });

  // Fetch song data if in edit mode
  useEffect(() => {
    const fetchData = async () => {
      if (!isEditMode) return;
      
      try {
        const token = await currentUser.getIdToken();
        const [songRes, artistsRes, albumsRes] = await Promise.all([
          fetch(`http://localhost:5000/api/admin/songs/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch('http://localhost:5000/api/artists', {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch('http://localhost:5000/api/albums', {
            headers: { 'Authorization': `Bearer ${token}` }
          })
        ]);

        const [songData, artistsData, albumsData] = await Promise.all([
          songRes.json(),
          artistsRes.json(),
          albumsRes.json()
        ]);

        setArtists(artistsData);
        setAlbums(albumsData);
        
        if (songRes.ok) {
          setFormData({
            title: songData.title,
            artist: songData.artist?._id || '',
            album: songData.album?._id || '',
            duration: songData.duration || 0,
            genre: songData.genre || '',
            releaseDate: songData.releaseDate ? new Date(songData.releaseDate).toISOString().split('T')[0] : '',
            lyrics: songData.lyrics || '',
            isExplicit: songData.isExplicit || false,
            isFeatured: songData.isFeatured || false,
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, isEditMode, currentUser]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'file') {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    } else if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const token = await currentUser.getIdToken();
      const formDataToSend = new FormData();
      
      // Append all form fields to FormData
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formDataToSend.append(key, value);
        }
      });
      
      const url = isEditMode 
        ? `http://localhost:5000/api/admin/songs/${id}`
        : 'http://localhost:5000/api/admin/songs';
      
      const method = isEditMode ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend,
      });
      
      if (response.ok) {
        navigate('/admin/songs');
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'An error occurred');
      }
    } catch (error) {
      console.error('Error saving song:', error);
      alert('Failed to save song');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin h-8 w-8 text-blue-600" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <FaArrowLeft className="mr-2" /> Back to Songs
        </button>
        <h1 className="text-2xl font-bold text-gray-800">
          {isEditMode ? 'Edit Song' : 'Add New Song'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="artist" className="block text-sm font-medium text-gray-700 mb-1">
                Artist <span className="text-red-500">*</span>
              </label>
              <select
                id="artist"
                name="artist"
                value={formData.artist}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select an artist</option>
                {artists.map(artist => (
                  <option key={artist._id} value={artist._id}>
                    {artist.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="album" className="block text-sm font-medium text-gray-700 mb-1">
                Album (Optional)
              </label>
              <select
                id="album"
                name="album"
                value={formData.album}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select an album (Optional)</option>
                {albums.map(album => (
                  <option key={album._id} value={album._id}>
                    {album.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mb-1">
                Genre
              </label>
              <input
                type="text"
                id="genre"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                Duration (seconds)
              </label>
              <input
                type="number"
                id="duration"
                name="duration"
                min="0"
                value={formData.duration}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Right Column */}
          <div>
            <div className="mb-4">
              <label htmlFor="releaseDate" className="block text-sm font-medium text-gray-700 mb-1">
                Release Date
              </label>
              <input
                type="date"
                id="releaseDate"
                name="releaseDate"
                value={formData.releaseDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="audioFile" className="block text-sm font-medium text-gray-700 mb-1">
                {isEditMode ? 'Replace Audio File' : 'Audio File'} <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                id="audioFile"
                name="audioFile"
                accept="audio/*"
                onChange={handleChange}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                required={!isEditMode}
              />
              {isEditMode && (
                <p className="mt-1 text-xs text-gray-500">
                  Leave empty to keep the current file
                </p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 mb-1">
                {isEditMode ? 'Replace Cover Image' : 'Cover Image'}
              </label>
              <input
                type="file"
                id="coverImage"
                name="coverImage"
                accept="image/*"
                onChange={handleChange}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {isEditMode && (
                <p className="mt-1 text-xs text-gray-500">
                  Leave empty to keep the current image
                </p>
              )}
            </div>

            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="isExplicit"
                name="isExplicit"
                checked={formData.isExplicit}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isExplicit" className="ml-2 block text-sm text-gray-700">
                Explicit Content
              </label>
            </div>

            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="isFeatured"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isFeatured" className="ml-2 block text-sm text-gray-700">
                Featured Song
              </label>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="lyrics" className="block text-sm font-medium text-gray-700 mb-1">
            Lyrics
          </label>
          <textarea
            id="lyrics"
            name="lyrics"
            rows={6}
            value={formData.lyrics}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {saving ? (
              <>
                <FaSpinner className="animate-spin -ml-1 mr-2 h-4 w-4" />
                Saving...
              </>
            ) : (
              <>
                <FaSave className="-ml-1 mr-2 h-4 w-4" />
                {isEditMode ? 'Update Song' : 'Add Song'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SongForm;
