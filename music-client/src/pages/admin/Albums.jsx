import { useState, useEffect } from 'react';
import { FaCompactDisc, FaEdit, FaTrash, FaPlus, FaSearch, FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Albums = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGenre, setFilterGenre] = useState('all');

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        // In a real app, you would fetch from your API
        // const response = await fetch('/api/admin/albums');
        // const data = await response.json();
        
        // Mock data for now
        const mockAlbums = [
          {
            id: 1,
            title: 'What A Beautiful Name',
            artist: 'Hillsong Worship',
            genre: 'Worship',
            releaseDate: '2023-01-15',
            tracks: 12,
            status: 'published',
            coverImage: '/path/to/cover1.jpg'
          },
          {
            id: 2,
            title: 'Reckless Love',
            artist: 'Cory Asbury',
            genre: 'Worship',
            releaseDate: '2023-02-20',
            tracks: 10,
            status: 'published',
            coverImage: '/path/to/cover2.jpg'
          },
          {
            id: 3,
            title: 'Goodness of God',
            artist: 'Bethel Music',
            genre: 'Gospel',
            releaseDate: '2023-03-10',
            tracks: 15,
            status: 'draft',
            coverImage: '/path/to/cover3.jpg'
          }
        ];
        
        setAlbums(mockAlbums);
      } catch (error) {
        console.error('Error fetching albums:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  const filteredAlbums = albums.filter(album => {
    const matchesSearch = album.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         album.artist.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = filterGenre === 'all' || album.genre === filterGenre;
    return matchesSearch && matchesGenre;
  });

  const handleDeleteAlbum = async (albumId) => {
    if (window.confirm('Are you sure you want to delete this album?')) {
      try {
        // In a real app, you would make an API call
        // await fetch(`/api/admin/albums/${albumId}`, { method: 'DELETE' });
        
        setAlbums(albums.filter(album => album.id !== albumId));
      } catch (error) {
        console.error('Error deleting album:', error);
      }
    }
  };

  const handleStatusChange = async (albumId, newStatus) => {
    try {
      // In a real app, you would make an API call
      // await fetch(`/api/admin/albums/${albumId}/status`, {
      //   method: 'PATCH',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ status: newStatus })
      // });
      
      setAlbums(albums.map(album => 
        album.id === albumId ? { ...album, status: newStatus } : album
      ));
    } catch (error) {
      console.error('Error updating album status:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Album Management</h1>
        <Link
          to="/admin/albums/new"
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <FaPlus className="mr-2" />
          Add Album
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search albums..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <select
              value={filterGenre}
              onChange={(e) => setFilterGenre(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Genres</option>
              <option value="Worship">Worship</option>
              <option value="Gospel">Gospel</option>
              <option value="CCM">CCM</option>
              <option value="Hymns">Hymns</option>
            </select>
          </div>
        </div>
      </div>

      {/* Albums Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAlbums.map((album) => (
          <div key={album.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-w-16 aspect-h-9 bg-gray-200">
              <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
                <FaCompactDisc className="text-gray-500 text-4xl" />
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-900 truncate">{album.title}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  album.status === 'published' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {album.status}
                </span>
              </div>
              
              <p className="text-gray-600 mb-2">{album.artist}</p>
              <p className="text-sm text-gray-500 mb-4">
                {album.genre} • {album.tracks} tracks • {new Date(album.releaseDate).toLocaleDateString()}
              </p>
              
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleStatusChange(album.id, album.status === 'published' ? 'draft' : 'published')}
                    className={`px-3 py-1 text-xs rounded ${
                      album.status === 'published' 
                        ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' 
                        : 'bg-green-100 text-green-800 hover:bg-green-200'
                    }`}
                  >
                    {album.status === 'published' ? 'Unpublish' : 'Publish'}
                  </button>
                </div>
                
                <div className="flex space-x-2">
                  <Link
                    to={`/admin/albums/edit/${album.id}`}
                    className="text-blue-600 hover:text-blue-800"
                    title="Edit album"
                  >
                    <FaEdit />
                  </Link>
                  <button
                    onClick={() => handleDeleteAlbum(album.id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete album"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAlbums.length === 0 && (
        <div className="text-center py-12">
          <FaCompactDisc className="mx-auto text-gray-400 text-4xl mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No albums found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Albums; 