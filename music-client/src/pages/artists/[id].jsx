import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { 
  fetchArtistDetails, 
  fetchTopTracks, 
  fetchAlbums, 
  fetchSimilarArtists, 
  fetchUpcomingEvents 
} from '../../services/artistApi';

const ArtistDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [artist, setArtist] = useState(null);
  const [tabData, setTabData] = useState({
    discography: [],
    songs: [],
    about: null,
    events: [],
    similar: []
  });
  const [error, setError] = useState(null);

  // Tab configuration
  const tabs = [
    { id: 'discography', label: 'Discography' },
    { id: 'songs', label: 'Songs' },
    { id: 'about', label: 'About' },
    { id: 'events', label: 'Events' },
    { id: 'similar', label: 'Similar Artists' }
  ];

  // Fetch artist details
  useEffect(() => {
    const loadArtist = async () => {
      try {
        const artistData = await fetchArtistDetails(id);
        setArtist(artistData);
      } catch (err) {
        console.error('Error loading artist:', err);
        setError('Failed to load artist details');
      }
    };

    loadArtist();
  }, [id]);

  // Handle tab changes and fetch data
  useEffect(() => {
    const loadTabData = async () => {
      if (!id) return;
      
      const tabId = tabs[activeTab]?.id;
      if (!tabId) return;

      setLoading(true);
      try {
        let data;
        
        switch (tabId) {
          case 'discography':
            data = await fetchAlbums(id);
            break;
          case 'songs':
            data = await fetchTopTracks(id);
            break;
          case 'about':
            // About tab doesn't need additional data
            data = null;
            break;
          case 'events':
            data = await fetchUpcomingEvents(id);
            break;
          case 'similar':
            data = await fetchSimilarArtists(id);
            break;
          default:
            data = [];
        }

        setTabData(prev => ({
          ...prev,
          [tabId]: data || []
        }));
      } catch (err) {
        console.error(`Error loading ${tabId} data:`, err);
        setError(`Failed to load ${tabId} data`);
      } finally {
        setLoading(false);
      }
    };

    loadTabData();
  }, [id, activeTab]);

  // Update URL hash when tab changes
  const handleTabSelect = (index) => {
    setActiveTab(index);
    navigate(`#${tabs[index].id}`);
  };

  // Set active tab based on URL hash
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    const tabIndex = tabs.findIndex(tab => tab.id === hash);
    if (tabIndex !== -1) {
      setActiveTab(tabIndex);
    }
  }, [location.hash]);

  if (!artist) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  // Render tab content based on active tab
  const renderTabContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    const currentTab = tabs[activeTab]?.id;
    const data = tabData[currentTab];

    switch (currentTab) {
      case 'discography':
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {data.map((item) => (
              <div key={item.id} className="group">
                <div className="relative overflow-hidden rounded-lg mb-2">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full aspect-square object-cover"
                    onError={(e) => {
                      const img = e.target;
                      const originalSrc = img.src;
                      let retryCount = 0;
                      const maxRetries = 2;
                      
                      const retryLoad = () => {
                        if (retryCount < maxRetries) {
                          retryCount++;
                          setTimeout(() => {
                            img.src = originalSrc + '?retry=' + retryCount + '&t=' + Date.now();
                          }, 1000 * retryCount);
                        } else {
                          img.src = '/album-placeholder.jpg';
                        }
                      };
                      
                      retryLoad();
                    }}
                  />
                </div>
                <h3 className="font-semibold text-sm">{item.title}</h3>
                <p className="text-xs text-gray-600">{item.year} • {item.type}</p>
              </div>
            ))}
          </div>
        );

      case 'songs':
        return (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((track, index) => (
                  <tr key={track.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {track.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {track.duration}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'about':
        return (
          <div className="prose max-w-none">
            <h3 className="text-xl font-semibold mb-4">Biography</h3>
            <p className="text-gray-700 mb-6">
              {artist.biography || 'No biography available.'}
            </p>
            {artist.genres && (
              <div className="mt-6">
                <h4 className="font-medium mb-2">Genres</h4>
                <div className="flex flex-wrap gap-2">
                  {artist.genres.map((genre, i) => (
                    <span key={i} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'events':
        if (data.length === 0) {
          return <p className="text-gray-500">No upcoming events scheduled.</p>;
        }
        return (
          <div className="space-y-4">
            {data.map((event) => (
              <div key={event.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{event.venue.name}</h3>
                    <p className="text-sm text-gray-600">
                      {new Date(event.date).toLocaleDateString()} • {event.venue.city}, {event.venue.country}
                    </p>
                  </div>
                  <a 
                    href={event.ticketUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium"
                  >
                    Get Tickets
                  </a>
                </div>
              </div>
            ))}
          </div>
        );

      case 'similar':
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {data.map((similar) => (
              <div key={similar.id} className="text-center">
                <div className="w-full aspect-square rounded-full overflow-hidden mb-2 mx-auto">
                  <img 
                    src={similar.image} 
                    alt={similar.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const img = e.target;
                      const originalSrc = img.src;
                      let retryCount = 0;
                      const maxRetries = 2;
                      
                      const retryLoad = () => {
                        if (retryCount < maxRetries) {
                          retryCount++;
                          setTimeout(() => {
                            img.src = originalSrc + '?retry=' + retryCount + '&t=' + Date.now();
                          }, 1000 * retryCount);
                        } else {
                          img.src = '/artist-placeholder.jpg';
                        }
                      };
                      
                      retryLoad();
                    }}
                  />
                </div>
                <h4 className="font-medium text-sm">{similar.name}</h4>
                <p className="text-xs text-gray-600">
                  {similar.genres?.slice(0, 2).join(', ')}
                </p>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Artist Header */}
      <div className="flex flex-col md:flex-row items-center md:items-end gap-6 mb-8">
        <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden shadow-lg">
          <img 
            src={artist.imageUrl || artist.image} 
            alt={artist.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const img = e.target;
              const originalSrc = img.src;
              let retryCount = 0;
              const maxRetries = 3;
              
              const retryLoad = () => {
                if (retryCount < maxRetries) {
                  retryCount++;
                  setTimeout(() => {
                    img.src = originalSrc + '?retry=' + retryCount + '&t=' + Date.now();
                  }, 1000 * retryCount);
                } else {
                  img.src = '/artist-placeholder.jpg';
                }
              };
              
              retryLoad();
            }}
          />
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold">{artist.name}</h1>
          <div className="mt-2 flex flex-wrap gap-2 justify-center md:justify-start">
            {artist.genres?.slice(0, 3).map((genre, i) => (
              <span key={i} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                {genre}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs selectedIndex={activeTab} onSelect={handleTabSelect}>
        <div className="border-b border-gray-200 mb-6">
          <TabList className="flex flex-wrap -mb-px">
            {tabs.map((tab, index) => (
              <Tab key={tab.id} className="mr-2">
                <button 
                  className={`inline-block p-4 border-b-2 rounded-t-lg ${
                    activeTab === index 
                      ? 'text-blue-600 border-blue-600' 
                      : 'border-transparent hover:text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              </Tab>
            ))}
          </TabList>
        </div>

        {/* Tab Content */}
        <div className="py-4">
          {tabs.map((tab, index) => (
            <TabPanel key={tab.id}>
              {activeTab === index && renderTabContent()}
            </TabPanel>
          ))}
        </div>
      </Tabs>
    </div>
  );
};

export default ArtistDetail;