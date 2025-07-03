import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { fetchArtistDetails, fetchArtists } from '../../../services/artistApi';
import HeroArtist from './HeroArtist';
import SocialLinks from './SocialLinks';
import AboutArtist from './AboutArtist';
import { FaUsers, FaInfoCircle, FaStore, FaStar } from 'react-icons/fa';
import SpotifyTab from './SpotifyTab';

const Artist = () => {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [artist, setArtist] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [allArtists, setAllArtists] = useState([]);
    const [loadingArtists, setLoadingArtists] = useState(true);

    // Get initial tab from URL or default to 'spotify'
    const initialTab = searchParams.get('tab') || 'spotify';
    const [activeTab, setActiveTab] = useState(initialTab);

    // Update URL when tab changes
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        navigate(`/artists/${id}?tab=${tab}`, { replace: true });
    };

    useEffect(() => {
        // Fetch all artists for the list
        fetchArtists()
            .then(data => {
                setAllArtists(data);
                setLoadingArtists(false);
            })
            .catch(err => {
                setLoadingArtists(false);
                console.error('Error fetching artists:', err);
            });
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
            
            setLoading(true);
            setError(null);
            
            try {
                const artistData = await fetchArtistDetails(id);
                
                if (!artistData) {
                    setError('Artist not found');
                    return;
                }
                
                setArtist(artistData);
            } catch (err) {
                console.error('Error fetching artist data:', err);
                setError('Failed to load artist data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        
        fetchData();
    }, [id]);

    // Show all artists if no id is provided
    if (!id) {
        if (loadingArtists) return <div className="flex justify-center items-center min-h-screen">Loading artists...</div>;
        return (
            <div className="container mx-auto px-4 py-20">
                <h1 className="text-3xl font-bold mb-6">Artists</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {allArtists.map(artist => (
                        <div
                            key={artist._id}
                            className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center cursor-pointer hover:shadow-lg transition-shadow duration-300"
                            onClick={() => navigate(`/artists/${artist._id}?tab=spotify`)}
                        >
                            <img 
                                src={artist.imageUrl} 
                                alt={artist.name} 
                                className="w-32 h-32 object-cover rounded-full mb-4"
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
                                            img.src = 'https://via.placeholder.com/150';
                                        }
                                    };
                                    
                                    retryLoad();
                                }}
                            />
                            <h2 className="text-xl font-semibold mb-2 text-center">{artist.name}</h2>
                            <p className="text-gray-600 text-sm mb-2 text-center">
                                {artist.genre?.join(', ')}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    if (error) return <div className="text-red-500 text-center p-4">Error: {error}</div>;
    if (!artist) return <div className="text-center p-4">Artist not found</div>;

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white ">
            {/* Hero Section */}
            <div className="hero bg-gradient-to-r from-blue-600 to-purple-700 text-white">
                <HeroArtist artist={artist} />
            </div>

            <div className="container mx-auto px-4 pt-4 pb-8 max-w-7xl">
                {/* Tabs Navigation */}
                <div className="flex border-b border-gray-200 mb-8 overflow-x-auto">
                    <button
                        onClick={() => handleTabChange('spotify')}
                        className={`py-3 px-6 font-medium text-sm flex items-center whitespace-nowrap ${
                            activeTab === 'spotify' 
                                ? 'text-blue-600 border-b-2 border-blue-600' 
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        <FaStar className="mr-2" />
                        Spotify
                    </button>
                    <button
                        onClick={() => handleTabChange('about')}
                        className={`py-3 px-6 font-medium text-sm flex items-center whitespace-nowrap ${
                            activeTab === 'about' 
                                ? 'text-blue-600 border-b-2 border-blue-600' 
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        <FaInfoCircle className="mr-2" />
                        About
                    </button>
                </div>

                {/* Tab Content */}
                <div className="relative mt-4">
                    {/* Spotify Tab */}
                    {activeTab === 'spotify' && (
                        <div className="animate-fadeIn">
                            {loading ? (
                                <div className="flex justify-center items-center py-12">
                                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                                </div>
                            ) : artist ? (
                                <SpotifyTab artist={artist} />
                            ) : (
                                <div className="p-4 text-center text-gray-500">
                                    No artist data available
                                </div>
                            )}
                        </div>
                    )}

                    {/* About Tab */}
                    {activeTab === 'about' && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn">
                            <div className="lg:col-span-2">
                                <AboutArtist artist={artist} />
                            </div>
                            <div>
                                <SocialLinks artist={artist} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Artist;