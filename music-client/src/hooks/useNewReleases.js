import { useState, useEffect } from 'react';

const useNewReleases = (limit = 20, offset = 0) => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get the base URL for API calls
  const getApiUrl = () => {
    // Use VITE_API_URL for both development and production
    return import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  };

  useEffect(() => {
    const fetchNewReleases = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const apiUrl = getApiUrl();
        const response = await fetch(`${apiUrl}/songs/new-releases?limit=${limit}&offset=${offset}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success) {
          setSongs(data.data);
        } else {
          throw new Error(data.message || 'Failed to fetch new releases');
        }
      } catch (err) {
        console.error('Error fetching new releases:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNewReleases();
  }, [limit, offset]);

  const refreshNewReleases = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const apiUrl = getApiUrl();
      const response = await fetch(`${apiUrl}/songs/new-releases?limit=${limit}&offset=${offset}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setSongs(data.data);
      } else {
        throw new Error(data.message || 'Failed to fetch new releases');
      }
    } catch (err) {
      console.error('Error refreshing new releases:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    songs,
    loading,
    error,
    refreshNewReleases
  };
};

export default useNewReleases; 