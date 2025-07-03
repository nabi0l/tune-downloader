import React, { useState, useEffect } from 'react';
import { FaPlay, FaUsers, FaStar, FaMusic, FaExternalLinkAlt } from 'react-icons/fa';
import SpotifyImage from '../../../components/SpotifyImage';

const AboutArtist = ({ artist }) => {
    const [spotifyData, setSpotifyData] = useState(null);
    const [loadingSpotify, setLoadingSpotify] = useState(false);

    useEffect(() => {
        if (artist && artist.spotifyId) {
            fetchSpotifyData();
        }
    }, [artist]);

    const fetchSpotifyData = async () => {
        try {
            setLoadingSpotify(true);
            const response = await fetch(`http://localhost:5000/api/artists/${artist._id}/spotify`);
            if (response.ok) {
                const data = await response.json();
                setSpotifyData(data);
            }
        } catch (error) {
            console.error('Error fetching Spotify data:', error);
        } finally {
            setLoadingSpotify(false);
        }
    };

    if (!artist) return null;

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

    return (
        <div className="space-y-6">
            {/* Artist Bio Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">About {artist.name}</h3>
                <div className="prose max-w-none">
                    {artist.bio ? (
                        <p className="text-gray-700 leading-relaxed">{artist.bio}</p>
                    ) : (
                        <p className="text-gray-500 italic">No biography available.</p>
                    )}
                </div>
            </div>

            {/* Spotify Stats Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <FaStar className="text-yellow-500 mr-2" />
                    Spotify Stats
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{formatNumber(artist.followers)}</div>
                        <div className="text-sm text-gray-600">Followers</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{artist.popularity}/100</div>
                        <div className="text-sm text-gray-600">Popularity</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">{artist.genre?.length || 0}</div>
                        <div className="text-sm text-gray-600">Genres</div>
                    </div>
                </div>
            </div>

            {/* Genres Section */}
            {artist.genre && artist.genre.length > 0 && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Genres</h3>
                    <div className="flex flex-wrap gap-2">
                        {artist.genre.map((genre, index) => (
                            <span 
                                key={index}
                                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                            >
                                {genre}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Top Tracks Section */}
            {artist.spotifyData && artist.spotifyData.topTracks && artist.spotifyData.topTracks.length > 0 && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                        <FaMusic className="mr-2" />
                        Top Tracks
                    </h3>
                    <div className="space-y-3">
                        {artist.spotifyData.topTracks.slice(0, 5).map((track, index) => (
                            <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-sm font-medium">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900">{track.name}</h4>
                                        <p className="text-sm text-gray-500">{track.album}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-gray-500">{formatDuration(track.duration)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Related Artists Section */}
            {artist.spotifyData && artist.spotifyData.relatedArtists && artist.spotifyData.relatedArtists.length > 0 && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                        <FaUsers className="mr-2" />
                        Related Artists
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {artist.spotifyData.relatedArtists.slice(0, 8).map((relatedArtist, index) => (
                            <div key={index} className="text-center group cursor-pointer">
                                <div className="w-16 h-16 mx-auto mb-2 rounded-full overflow-hidden">
                                    <SpotifyImage
                                        src={relatedArtist.image}
                                        alt={relatedArtist.name}
                                        className="w-full h-full"
                                        fallbackSrc="/artist-placeholder.jpg"
                                    />
                                </div>
                                <h4 className="font-medium text-sm text-gray-900 group-hover:text-blue-600">
                                    {relatedArtist.name}
                                </h4>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Fresh Spotify Data Section */}
            {spotifyData && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                        <FaExternalLinkAlt className="mr-2" />
                        Live Spotify Data
                    </h3>
                    {loadingSpotify ? (
                        <div className="flex justify-center py-4">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {spotifyData.topTracks && spotifyData.topTracks.length > 0 && (
                                <div>
                                    <h4 className="font-medium mb-2">Latest Top Tracks</h4>
                                    <div className="space-y-2">
                                        {spotifyData.topTracks.slice(0, 3).map((track, index) => (
                                            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                                <span className="text-sm font-medium">{track.name}</span>
                                                <span className="text-xs text-gray-500">{formatDuration(track.duration_ms)}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            
                            {spotifyData.relatedArtists && spotifyData.relatedArtists.length > 0 && (
                                <div>
                                    <h4 className="font-medium mb-2">Similar Artists</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {spotifyData.relatedArtists.slice(0, 6).map((related, index) => (
                                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                                {related.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* Additional Info */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Additional Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {artist.origin && (
                        <div>
                            <h4 className="font-medium text-gray-900">Origin</h4>
                            <p className="text-gray-600">{artist.origin}</p>
                        </div>
                    )}
                    {artist.yearsActive && (
                        <div>
                            <h4 className="font-medium text-gray-900">Years Active</h4>
                            <p className="text-gray-600">{artist.yearsActive}</p>
                        </div>
                    )}
                    {artist.website && (
                        <div>
                            <h4 className="font-medium text-gray-900">Website</h4>
                            <a 
                                href={artist.website} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                Visit Website
                            </a>
                        </div>
                    )}
                    {artist.spotifyId && (
                        <div>
                            <h4 className="font-medium text-gray-900">Spotify</h4>
                            <a 
                                href={`https://open.spotify.com/artist/${artist.spotifyId}`}
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-green-600 hover:underline flex items-center"
                            >
                                <FaExternalLinkAlt className="mr-1" />
                                View on Spotify
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AboutArtist;
