import { useState, useEffect } from 'react';

const useTrendingSongs = (limit = 20, offset = 0) => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Base URL for API calls
  const getApiUrl = () => {
    // In development, the proxy will handle the request
    // In production, use the environment variable VITE_API_URL
    return import.meta.env.VITE_API_BASE_URL || '';
  };

  useEffect(() => {
    const fetchTrendingSongs = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const apiUrl = getApiUrl();
        const url = `${apiUrl}/songs/trending?limit=${limit}&offset=${offset}`;
        console.log('Fetching from URL:', url);
        
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          // Add credentials if your API requires authentication
          // credentials: 'include',
        });
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error('API Error Response:', errorData);
          throw new Error(`HTTP error! status: ${response.status} - ${errorData.message || 'No error details'}`);
        }
        
        const data = await response.json();
        
        if (data.success) {
          setSongs(data.data);
        } else {
          throw new Error(data.message || 'Failed to fetch trending songs');
        }
      } catch (err) {
        console.error('Error fetching trending songs:', {
          message: err.message,
          name: err.name,
          stack: err.stack,
          url: window.location.href,
          timestamp: new Date().toISOString()
        });
        setError(`Network error: ${err.message}. Please check your connection and try again.`);
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
