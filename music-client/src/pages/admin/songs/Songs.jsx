import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaPlus, FaEdit, FaTrash, FaMusic } from 'react-icons/fa';
import { useAuth } from '../../../hooks/useAuth';

const Songs = () => {
  console.log('Songs component is rendering!'); // Debug log
  
  const { currentUser } = useAuth();
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [songsPerPage] = useState(10);
  const [totalSongs, setTotalSongs] = useState(0);

  // Fetch songs from API
  const fetchSongs = useCallback(async () => {
    console.log('Songs fetchSongs called');
    if (!currentUser) {
      console.log('Songs - No current user, skipping fetch');
      return;
    }
    
    try {
      setLoading(true);
      const token = await currentUser.getIdToken();
      const response = await fetch(
        `https://tune-downloader.onrender.com/api/admin/songs?page=${currentPage}&limit=${songsPerPage}&search=${searchTerm}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        console.log('Songs - Data received:', data);
        setSongs(data.songs);
        setTotalSongs(data.total);
      } else {
        console.log('Songs - API response not ok:', response.status);
      }
    } catch (error) {
      console.error('Error fetching songs:', error);
    } finally {
      setLoading(false);
    }
  }, [currentUser, currentPage, songsPerPage, searchTerm]);

  useEffect(() => {
    console.log('Songs useEffect running');
    fetchSongs();
  }, [fetchSongs]);

  // Delete a song
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this song?')) {
      try {
        const token = await currentUser.getIdToken();
        const response = await fetch(`https://tune-downloader.onrender.com/api/admin/songs/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          // Refresh the songs list
          fetchSongs();
        }
      } catch (error) {
        console.error('Error deleting song:', error);
      }
    }
  };

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Format duration (seconds to MM:SS)
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  console.log('Songs render - loading:', loading, 'songs count:', songs.length);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Songs Management</h1>
        <Link
          to="/admin/songs/new"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center"
        >
          <FaPlus className="mr-2" /> Add New Song
        </Link>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Search songs..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page when searching
            }}
          />
        </div>
      </div>

      {/* Songs Table */}
      <div className="bg-white shadow overflow-hidden rounded-lg">
        {loading ? (
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : songs.length === 0 ? (
          <div className="text-center p-8 text-gray-500">
            <FaMusic className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No songs found</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by adding a new song.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Artist
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Album
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {songs.map((song) => (
                  <tr key={song._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded" src={song.album?.coverImage || '/default-song.png'} alt={song.title} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{song.title}</div>
                          <div className="text-sm text-gray-500">{song.genre}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{song.artist?.name || 'Unknown'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{song.album?.title || 'Single'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDuration(song.duration)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        to={`/admin/songs/edit/${song._id}`}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        <FaEdit className="inline-block" />
                      </Link>
                      <button
                        onClick={() => handleDelete(song._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FaTrash className="inline-block" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalSongs > songsPerPage && (
        <div className="flex justify-center mt-6">
          <nav className="inline-flex rounded-md shadow">
            {Array.from({ length: Math.ceil(totalSongs / songsPerPage) }, (_, i) => i + 1).map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`px-4 py-2 border ${
                  currentPage === number
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {number}
              </button>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
};

export default Songs;
