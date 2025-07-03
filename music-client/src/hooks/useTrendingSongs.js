import { useState, useEffect } from 'react';

const useTrendingSongs = (limit = 20, offset = 0) => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get the base URL for API calls
  const getApiUrl = () => {
    // In development, use the proxy
    if (import.meta.env.DEV) {
      return '/api';
    }
    // In production, use the full server URL
    return 'http://localhost:5000/api';
  };

  useEffect(() => {
    const fetchTrendingSongs = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const apiUrl = getApiUrl();
        const response = await fetch(`${apiUrl}/songs/trending?limit=${limit}&offset=${offset}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success) {
          setSongs(data.data);
        } else {
          throw new Error(data.message || 'Failed to fetch trending songs');
        }
      } catch (err) {
        console.error('Error fetching trending songs:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingSongs();
  }, [limit, offset]);

  const refreshTrendingSongs = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const apiUrl = getApiUrl();
      const response = await fetch(`${apiUrl}/songs/trending?limit=${limit}&offset=${offset}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setSongs(data.data);
      } else {
        throw new Error(data.message || 'Failed to fetch trending songs');
      }
    } catch (err) {
      console.error('Error refreshing trending songs:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    songs,
    loading,
    error,
    refreshTrendingSongs
  };
};

export default useTrendingSongs;
