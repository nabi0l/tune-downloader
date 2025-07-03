import { useState, useEffect } from 'react';
import { FaUser, FaEdit, FaTrash, FaPlus, FaSearch, FaMusic, FaGlobe } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Artists = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGenre, setFilterGenre] = useState('all');

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        // In a real app, you would fetch from your API
        // const response = await fetch('/api/admin/artists');
        // const data = await response.json();
        
        // Mock data for now
        const mockArtists = [
          {
            id: 1,
            name: 'Hillsong Worship',
            genre: 'Worship',
            country: 'Australia',
            albums: 15,
            songs: 120,
            followers: 2500000,
            status: 'active',
            image: '/path/to/hillsong.jpg',
            bio: 'Hillsong Worship is the worship music ministry of Hillsong Church.'
          },
          {
            id: 2,
            name: 'Bethel Music',
            genre: 'Worship',
            country: 'USA',
            albums: 12,
            songs: 95,
            followers: 1800000,
            status: 'active',
            image: '/path/to/bethel.jpg',
            bio: 'Bethel Music is a worship ministry from Bethel Church in Redding, California.'
          },
          {
            id: 3,
            name: 'Sinach',
            genre: 'Gospel',
            country: 'Nigeria',
            albums: 8,
            songs: 65,
            followers: 1200000,
            status: 'active',
            image: '/path/to/sinach.jpg',
            bio: 'Sinach is a Nigerian gospel singer, songwriter, and worship leader.'
          },
          {
            id: 4,
            name: 'Elevation Worship',
            genre: 'Worship',
            country: 'USA',
            albums: 10,
            songs: 85,
            followers: 1500000,
            status: 'inactive',
            image: '/path/to/elevation.jpg',
            bio: 'Elevation Worship is the worship ministry of Elevation Church.'
          }
        ];
        
        setArtists(mockArtists);
      } catch (error) {
        console.error('Error fetching artists:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  const filteredArtists = artists.filter(artist => {
    const matchesSearch = artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artist.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = filterGenre === 'all' || artist.genre === filterGenre;
    return matchesSearch && matchesGenre;
  });

  const handleDeleteArtist = async (artistId) => {
    if (window.confirm('Are you sure you want to delete this artist?')) {
      try {
        // In a real app, you would make an API call
        // await fetch(`/api/admin/artists/${artistId}`, { method: 'DELETE' });
        
        setArtists(artists.filter(artist => artist.id !== artistId));
      } catch (error) {
        console.error('Error deleting artist:', error);
      }
    }
  };

  const handleStatusChange = async (artistId, newStatus) => {
    try {
      // In a real app, you would make an API call
      // await fetch(`/api/admin/artists/${artistId}/status`, {
      //   method: 'PATCH',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ status: newStatus })
      // });
      
      setArtists(artists.map(artist => 
        artist.id === artistId ? { ...artist, status: newStatus } : artist
      ));
    } catch (error) {
      console.error('Error updating artist status:', error);
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
        <h1 className="text-2xl font-bold">Artist Management</h1>
        <Link
          to="/admin/artists/new"
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <FaPlus className="mr-2" />
          Add Artist
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
                placeholder="Search artists..."
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

      {/* Artists Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArtists.map((artist) => (
          <div key={artist.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-w-16 aspect-h-9 bg-gray-200">
              <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
                <FaUser className="text-gray-500 text-4xl" />
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-900 truncate">{artist.name}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  artist.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {artist.status}
                </span>
              </div>
              
              <div className="flex items-center text-gray-600 mb-2">
                <FaGlobe className="mr-1" />
                <span>{artist.country}</span>
              </div>
              
              <p className="text-sm text-gray-500 mb-4">{artist.genre}</p>
              
              <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                <div>
                  <p className="text-lg font-semibold text-blue-600">{artist.albums}</p>
                  <p className="text-xs text-gray-500">Albums</p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-green-600">{artist.songs}</p>
                  <p className="text-xs text-gray-500">Songs</p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-purple-600">{(artist.followers / 1000).toFixed(1)}K</p>
                  <p className="text-xs text-gray-500">Followers</p>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{artist.bio}</p>
              
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleStatusChange(artist.id, artist.status === 'active' ? 'inactive' : 'active')}
                    className={`px-3 py-1 text-xs rounded ${
                      artist.status === 'active' 
                        ? 'bg-red-100 text-red-800 hover:bg-red-200' 
                        : 'bg-green-100 text-green-800 hover:bg-green-200'
                    }`}
                  >
                    {artist.status === 'active' ? 'Deactivate' : 'Activate'}
                  </button>
                </div>
                
                <div className="flex space-x-2">
                  <Link
                    to={`/admin/artists/edit/${artist.id}`}
                    className="text-blue-600 hover:text-blue-800"
                    title="Edit artist"
                  >
                    <FaEdit />
                  </Link>
                  <button
                    onClick={() => handleDeleteArtist(artist.id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete artist"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredArtists.length === 0 && (
        <div className="text-center py-12">
          <FaUser className="mx-auto text-gray-400 text-4xl mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No artists found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Artists; 