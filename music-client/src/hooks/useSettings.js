import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

const useSettings = () => {
  const { currentUser } = useAuth();
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      marketing: false
    },
    privacy: {
      profileVisibility: 'public',
      showEmail: false,
      showPurchaseHistory: false
    },
    preferences: {
      theme: 'light',
      language: 'en',
      autoPlay: true,
      quality: 'high'
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load settings from localStorage or API
  useEffect(() => {
    const loadSettings = async () => {
      try {
        // First try to load from localStorage
        const savedSettings = localStorage.getItem('userSettings');
        if (savedSettings) {
          setSettings(JSON.parse(savedSettings));
        }

        // If user is logged in, try to load from API
        if (currentUser) {
          const token = localStorage.getItem('token');
          if (token) {
            const response = await fetch('https://tune-downloader.onrender.com/api/auth/settings', {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });

          if (response.ok) {
            const apiSettings = await response.json();
            setSettings(prev => ({ ...prev, ...apiSettings }));
            localStorage.setItem('userSettings', JSON.stringify({ ...prev, ...apiSettings }));
          }
        }
        }
      } catch (err) {
        console.error('Error loading settings:', err);
        setError('Failed to load settings');
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, [currentUser]);

  // Save settings to localStorage and API
  const saveSettings = async (newSettings) => {
    try {
      setSettings(newSettings);
      localStorage.setItem('userSettings', JSON.stringify(newSettings));

      // If user is logged in, save to API
      if (currentUser) {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await fetch('https://tune-downloader.onrender.com/api/auth/settings', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(newSettings)
          });

          if (!response.ok) {
            throw new Error('Failed to save settings to server');
          }
        }
      }
    } catch (err) {
      console.error('Error saving settings:', err);
      setError('Failed to save settings');
      throw err;
    }
  };

  // Update a specific setting
  const updateSetting = async (category, setting, value) => {
    const newSettings = {
      ...settings,
      [category]: {
        ...settings[category],
        [setting]: value
      }
    };
    await saveSettings(newSettings);
  };

  // Reset settings to defaults
  const resetSettings = async () => {
    const defaultSettings = {
      notifications: {
        email: true,
        push: true,
        marketing: false
      },
      privacy: {
        profileVisibility: 'public',
        showEmail: false,
        showPurchaseHistory: false
      },
      preferences: {
        theme: 'light',
        language: 'en',
        autoPlay: true,
        quality: 'high'
      }
    };
    await saveSettings(defaultSettings);
  };

  return {
    settings,
    loading,
    error,
    saveSettings,
    updateSetting,
    resetSettings
  };
};

export default useSettings; 