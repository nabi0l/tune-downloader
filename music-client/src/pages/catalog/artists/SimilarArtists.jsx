import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchSimilarArtists } from '../../../services/artistApi';
import { FaSpotify, FaYoutube, FaItunesNote, FaHeart, FaRegHeart, FaPlay } from 'react-icons/fa';

const SimilarArtists = ({ artistId }) => {
    const [similarArtists, setSimilarArtists] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadSimilarArtists = async () => {
            try {
                const artists = await fetchSimilarArtists(artistId);
                setSimilarArtists(artists.slice(0, 6)); // Show max 6 similar artists
            } catch (error) {
                console.error('Error loading similar artists:', error);
            } finally {
                setLoading(false);
            }
        };

        if (artistId) {
            loadSimilarArtists();
        }
    }, [artistId]);

    if (loading) {
        return (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                        <div className="aspect-square w-full rounded-xl bg-gray-200 mb-3"></div>
                        <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 mt-1"></div>
                    </div>
                ))}
            </div>
        );
    }

    if (similarArtists.length === 0) {
        return (
            <div className="text-center py-8">
                <div className="text-gray-400 mb-2">🎵</div>
                <p className="text-gray-500">No similar artists found</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {similarArtists.map((artist) => (
                <div 
                    key={artist.id}
                    className="group relative overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300"
                >
                    <Link to={`/artist/${artist.id}`} className="block">
                        <div className="relative aspect-square overflow-hidden rounded-t-xl">
                            {artist.image ? (
                                <img 
                                    src={artist.image} 
                                    alt={artist.name}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
                                    <span className="text-4xl font-bold">{artist.name.charAt(0)}</span>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                                <div className="w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                    <FaPlay className="text-indigo-600 ml-1" />
                                </div>
                            </div>
                        </div>
                        <div className="p-4">
                            <h4 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors truncate">
                                {artist.name}
                            </h4>
                            {artist.genres && artist.genres.length > 0 && (
                                <p className="text-xs text-gray-500 truncate mt-1">
                                    {artist.genres.slice(0, 2).join(' • ')}
                                </p>
                            )}
                            <div className="flex items-center justify-between mt-3 text-gray-400">
                                <button className="hover:text-indigo-600 transition-colors p-1">
                                    <FaSpotify className="text-lg" />
                                </button>
                                <button className="hover:text-indigo-600 transition-colors p-1">
                                    <FaYoutube className="text-lg" />
                                </button>
                                <button className="hover:text-indigo-600 transition-colors p-1">
                                    <FaItunesNote className="text-lg" />
                                </button>
                                <button className="ml-auto hover:text-red-500 transition-colors p-1">
                                    <FaRegHeart className="text-lg" />
                                </button>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default SimilarArtists;
