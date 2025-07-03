import React, { useState, useEffect } from 'react';
import { FaPlay, FaUsers, FaMusic, FaExternalLinkAlt, FaHeart, FaShare, FaSync, FaPause, FaTimes } from 'react-icons/fa';
import SpotifyImage from '../../../components/SpotifyImage.jsx';
import AudioPlayer from '../../../components/AudioPlayer.jsx';

const SpotifyTab = ({ artist }) => {
    const [spotifyData, setSpotifyData] = useState(artist.spotify || null);
    const [loading, setLoading] = useState(!artist.spotify);
    const [error, setError] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentPlayingTrack, setCurrentPlayingTrack] = useState(null);
    const [country] = useState('US'); // Default to US for now
    const [currentPlayingAlbum, setCurrentPlayingAlbum] = useState(null);
    const [albumPreviewUrl, setAlbumPreviewUrl] = useState(null);
    const [albumIsPlaying, setAlbumIsPlaying] = useState(false);
    const [albumTracks, setAlbumTracks] = useState([]);

    const [currentPreviewUrl, setCurrentPreviewUrl] = useState(null);
    const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);
    const [currentPreviewTrackId, setCurrentPreviewTrackId] = useState(null);
    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // If we don't have spotify data yet, fetch it
    useEffect(() => {
        const fetchSpotifyData = async () => {
            if (!artist?._id || spotifyData) return;
            
            setLoading(true);
            setError(null);
            
            try {
                console.log(`Fetching Spotify data for artist:`, artist);
                const response = await fetch(`http://localhost:5000/api/artists/${artist._id}/spotify?market=${country}`);
                
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to fetch Spotify data');
                }
                
                const data = await response.json();
                console.log('Spotify API response:', data);
                
                setSpotifyData(data);
                
                // Log preview URLs for debugging
                if (data.topTracks) {
                    console.log('Track previews available:');
                    data.topTracks.forEach((track, index) => {
                        console.log(`${index + 1}. ${track.name} - Preview: ${track.preview_url || 'Not available'}`);
                    });
                }
                
            } catch (err) {
                console.error('Error loading Spotify data:', err);
                setError(err.message || 'Failed to load Spotify data');
            } finally {
                setLoading(false);
            }
        };
        
        fetchSpotifyData();
    }, [artist?._id, country, spotifyData, artist]);

    // Format number with commas
    const formatNumber = (num) => {
        return num ? num.toLocaleString() : '0';
    };

    // Format duration from milliseconds
    const formatDuration = (ms) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = ((ms % 60000) / 1000).toFixed(0);
        return `${minutes}:${seconds.padStart(2, '0')}`;
    };

    const playAlbumPreview = async (album) => {
        if (currentPlayingAlbum === album.id && albumIsPlaying) {
            setAlbumIsPlaying(false);
            return;
        }
        setCurrentPlayingAlbum(album.id);
        setAlbumIsPlaying(false);
        setAlbumPreviewUrl(null);

        try {
            const response = await fetch(`http://localhost:5000/api/artists/spotify/albums/${album.id}/tracks`);
            const data = await response.json();
            if (data.tracks && data.tracks.length > 0) {
                const previewTrack = data.tracks.find(track => track.preview_url);
                if (previewTrack) {
                    setAlbumPreviewUrl(previewTrack.preview_url);
                    setAlbumIsPlaying(true);
                } else {
                    alert('No preview available for this album.');
                }
            }
        } catch (err) {
            alert('Failed to fetch album tracks.');
        }
    };

    const handleAlbumClick = async (album) => {
        setSelectedAlbum(album);
        setAlbumTracks([]);
        setCurrentPreviewUrl(null);
        setCurrentPreviewTrackId(null);
        setIsPreviewPlaying(false);
        setIsModalOpen(true);

        try {
            const response = await fetch(`http://localhost:5000/api/artists/spotify/albums/${album.id}/tracks`);
            const data = await response.json();
            setAlbumTracks(data.tracks || []);
        } catch (err) {
            alert('Failed to fetch album tracks.');
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedAlbum(null);
        setCurrentPreviewUrl(null);
        setCurrentPreviewTrackId(null);
        setIsPreviewPlaying(false);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <p className="text-red-600">{error}</p>
                <button 
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Retry
                </button>
            </div>
        );
    }

    if (!spotifyData) {
        return (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center max-w-2xl mx-auto">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-200 rounded-full mb-4">
                    <FaMusic className="text-gray-500 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No Spotify Data Available</h3>
                <p className="text-gray-600 mb-4">
                    {artist.spotifyId 
                        ? "We couldn't find any additional data for this artist on Spotify."
                        : "This artist doesn't have a Spotify ID associated with their profile."}
                </p>
                {!artist.spotifyId && (
                    <p className="text-sm text-gray-500 mb-4">
                        If you believe this is an error, please contact support.
                    </p>
                )}
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center mx-auto"
                >
                    <FaSync className="mr-2" />
                    {artist.spotifyId ? 'Retry' : 'Check Again'}
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header with Spotify Stats */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Spotify Profile</h2>
                        <p className="text-green-100">Live data from Spotify</p>
                    </div>
                    <a 
                        href={`https://open.spotify.com/artist/${artist.spotifyId}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-white text-green-600 px-4 py-2 rounded-lg hover:bg-green-50 flex items-center"
                    >
                        <FaExternalLinkAlt className="mr-2" />
                        View on Spotify
                    </a>
                </div>
            </div>

            {/* Top Tracks Section */}
            {spotifyData.topTracks && spotifyData.topTracks.length > 0 && (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-xl font-semibold flex items-center">
                            <FaMusic className="mr-2 text-green-600" />
                            Top Tracks
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">Most popular tracks on Spotify</p>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {spotifyData.topTracks.map((track, index) => (
                            <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50">
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center text-sm font-medium">
                                        {index + 1}
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        {track.album && track.album.images && track.album.images[0] && (
                                            <img 
                                                src={track.album.images[0].url} 
                                                alt={track.album.name}
                                                className="w-12 h-12 rounded object-cover"
                                            />
                                        )}
                                        <div>
                                            <h4 className="font-medium text-gray-900">{track.name}</h4>
                                            <p className="text-sm text-gray-500">
                                                {track.album ? track.album.name : 'Single'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <span className="text-sm text-gray-500">{formatDuration(track.duration_ms)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Albums Section */}
            {spotifyData.albums && spotifyData.albums.length > 0 && (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-xl font-semibold flex items-center">
                            <FaMusic className="mr-2 text-green-600" />
                            Albums & Singles
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">Latest releases on Spotify</p>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {spotifyData.albums.slice(0, 10).map((album, index) => (
                                <div key={index} className="group cursor-pointer">
                                    <div className="relative aspect-square overflow-hidden rounded-lg mb-3">
                                        <SpotifyImage
                                            src={album.images && album.images.length > 0 ? album.images[0].url : '/album-placeholder.jpg'}
                                            alt={album.name}
                                            className="w-full h-full"
                                            fallbackSrc="/album-placeholder.jpg"
                                        />
                                        {/* Only show overlay and play button if albumTracks for this album have a preview */}
                                        {albumTracks.some(track => track.preview_url) && (
                                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                                                <button
                                                    className="w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleAlbumClick(album);
                                                    }}
                                                >
                                                    <FaPlay className="text-green-600 ml-1" />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    <h4 className="font-medium text-sm text-gray-900 truncate">{album.name}</h4>
                                    <p className="text-xs text-gray-500 capitalize">{album.album_type}</p>
                                    <p className="text-xs text-gray-400">{album.release_date}</p>

                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Album Tracks Modal */}
            {isModalOpen && selectedAlbum && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col">
                        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-semibold">{selectedAlbum.name}</h3>
                                <p className="text-sm text-gray-600 capitalize">{selectedAlbum.album_type} • {selectedAlbum.release_date?.split('-')[0]}</p>
                            </div>
                            <button 
                                onClick={closeModal}
                                className="p-2 hover:bg-gray-100 rounded-full"
                                aria-label="Close"
                            >
                                <FaTimes />
                            </button>
                        </div>
                        <div className="overflow-y-auto flex-1">
                            {albumTracks.length === 0 ? (
                                <div className="p-6 text-center">
                                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500 mx-auto mb-4"></div>
                                    <p>Loading tracks...</p>
                                </div>
                            ) : (
                                <ul className="divide-y divide-gray-100">
                                    {albumTracks.map((track, index) => (
                                        <li key={track.id} className="p-4 hover:bg-gray-50">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-4">
                                                    <span className="w-6 text-right text-gray-500">{index + 1}</span>
                                                    <div>
                                                        <p className={`font-medium ${currentPreviewTrackId === track.id ? 'text-green-600' : 'text-gray-900'}`}>
                                                            {track.name}
                                                        </p>
                                                        <p className="text-sm text-gray-500">{formatDuration(track.duration_ms)}</p>
                                                    </div>
                                                </div>
                                                {track.preview_url ? (
                                                    <button
                                                        className="p-2 rounded-full hover:bg-green-50"
                                                        onClick={() => {
                                                            if (currentPreviewTrackId === track.id && isPreviewPlaying) {
                                                                setIsPreviewPlaying(false);
                                                            } else {
                                                                setCurrentPreviewUrl(track.preview_url);
                                                                setCurrentPreviewTrackId(track.id);
                                                                setIsPreviewPlaying(true);
                                                            }
                                                        }}
                                                        aria-label={currentPreviewTrackId === track.id && isPreviewPlaying ? 'Pause' : 'Play'}
                                                    >
                                                        {currentPreviewTrackId === track.id && isPreviewPlaying ? (
                                                            <FaPause className="text-green-600" />
                                                        ) : (
                                                            <FaPlay className="text-gray-600" />
                                                        )}
                                                    </button>
                                                ) : (
                                                    <span className="text-xs text-gray-400 px-2">No preview</span>
                                                )}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {albumTracks.length > 0 && !albumTracks.some(track => track.preview_url) && (
                                <div className="text-xs text-gray-500 mt-2">
                                    No previews available for any track in this album.<br/>
                                    <span className="text-xs text-gray-400">Spotify does not provide previews for all tracks due to licensing restrictions. This is especially common for some Christian and major label releases.</span>
                                </div>
                            )}
                        </div>
                        {currentPreviewUrl && isPreviewPlaying && (
                            <div className="p-4 border-t border-gray-200">
                                <AudioPlayer
                                    src={currentPreviewUrl}
                                    isPlaying={isPreviewPlaying}
                                    onEnded={() => setIsPreviewPlaying(false)}
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Related Artists Section */}
            {spotifyData.relatedArtists && spotifyData.relatedArtists.length > 0 && (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-xl font-semibold flex items-center">
                            <FaUsers className="mr-2 text-green-600" />
                            Related Artists
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">Artists you might also like</p>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                            {spotifyData.relatedArtists.map((relatedArtist, index) => (
                                <div key={index} className="text-center group cursor-pointer">
                                    <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden">
                                        <SpotifyImage
                                            src={relatedArtist.images && relatedArtist.images[0] ? relatedArtist.images[0].url : ''}
                                            alt={relatedArtist.name}
                                            className="w-full h-full"
                                            fallbackSrc="/artist-placeholder.jpg"
                                        />
                                    </div>
                                    <h4 className="font-medium text-sm text-gray-900 group-hover:text-green-600 truncate">
                                        {relatedArtist.name}
                                    </h4>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {relatedArtist.genres && relatedArtist.genres.slice(0, 2).join(', ')}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Artist Stats */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Artist Statistics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{formatNumber(artist.followers)}</div>
                        <div className="text-sm text-gray-600">Spotify Followers</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{artist.popularity}/100</div>
                        <div className="text-sm text-gray-600">Popularity Score</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">{artist.genre?.length || 0}</div>
                        <div className="text-sm text-gray-600">Genres</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpotifyTab; 