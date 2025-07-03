import React, { useState } from 'react';
import AlbumGrid from './AlbumGrid';
import { FaFilter, FaSearch, FaSort, FaMusic, FaCompactDisc } from 'react-icons/fa';

const Albums = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [sortBy, setSortBy] = useState('popularity');
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    const filters = [
        { id: 'all', label: 'All Albums', icon: <FaMusic className="w-4 h-4" /> },
        { id: 'popular', label: 'Popular', icon: <FaCompactDisc className="w-4 h-4" /> },
        { id: 'new', label: 'New Releases', icon: <FaMusic className="w-4 h-4" /> },
        { id: 'worship', label: 'Worship', icon: <FaMusic className="w-4 h-4" /> },
        { id: 'gospel', label: 'Gospel', icon: <FaCompactDisc className="w-4 h-4" /> },
        { id: 'hymns', label: 'Hymns', icon: <FaMusic className="w-4 h-4" /> },
    ];

    const sortOptions = [
        { id: 'popularity', label: 'Most Popular' },
        { id: 'newest', label: 'Newest First' },
        { id: 'oldest', label: 'Oldest First' },
        { id: 'title-asc', label: 'Title (A-Z)' },
        { id: 'title-desc', label: 'Title (Z-A)' },
        { id: 'artist', label: 'Artist' },
    ];

    return (
        <div className='min-h-screen bg-white'>
            <div className='container mx-auto px-4 py-16 max-w-7xl'>
                {/* Page Header */}
                <div className='mb-12 text-center'>
                    <h1 className='text-4xl font-light text-black mb-4 py-4'>
                        Music Collection
                    </h1>
                    <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
                        Discover timeless Christian music across all genres. From contemporary worship to classic hymns, find your next favorite album.
                    </p>
                </div>

                {/* Filter and Sort Section */}
                <div className='mb-12'>
                    <div className='flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8'>
                        {/* Filter Chips */}
                        <div className='flex flex-wrap gap-3'>
                            {filters.map((filter) => (
                                <button
                                    key={filter.id}
                                    onClick={() => setActiveFilter(filter.id)}
                                    className={`inline-flex items-center px-6 py-3 text-sm font-medium rounded-full transition-all duration-200 border-2 ${
                                        activeFilter === filter.id
                                            ? 'bg-black text-white border-black'
                                            : 'bg-white text-black border-gray-200 hover:border-black hover:bg-gray-50'
                                    }`}
                                >
                                    <span className='mr-2'>{filter.icon}</span>
                                    {filter.label}
                                </button>
                            ))}
                        </div>
                        
                        {/* Sort Dropdown */}
                        <div className='relative'>
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className='flex items-center space-x-2 px-6 py-3 bg-white border-2 border-gray-200 rounded-full hover:border-black transition-colors text-black font-medium'
                            >
                                <FaSort className='text-gray-600' />
                                <span>Sort by: {sortOptions.find(opt => opt.id === sortBy)?.label}</span>
                            </button>
                            
                            {showFilters && (
                                <div className='absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl py-2 z-20 border border-gray-200'>
                                    <div className='px-4 py-3 text-sm font-medium text-black border-b border-gray-200'>
                                        Sort By
                                    </div>
                                    {sortOptions.map((option) => (
                                        <button
                                            key={option.id}
                                            className={`w-full flex items-center px-4 py-3 text-sm ${
                                                sortBy === option.id
                                                    ? 'bg-black text-white font-medium'
                                                    : 'text-black hover:bg-gray-50'
                                            }`}
                                            onClick={() => {
                                                setSortBy(option.id);
                                                setShowFilters(false);
                                            }}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className='w-full'>
                    {/* Album Grid Section */}
                    <div className='mb-8'>
                        <div className='flex justify-between items-center mb-8'>
                            <div>
                                <h2 className='text-3xl font-light text-black mb-2'>
                                    {activeFilter === 'all' ? 'All Albums' : 
                                     activeFilter === 'new' ? 'New Releases' :
                                     activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)}
                                </h2>
                                <p className='text-gray-600 text-lg'>
                                    {activeFilter === 'all' ? 'Browse our complete collection' : 
                                     activeFilter === 'popular' ? 'Most played and trending albums' :
                                     activeFilter === 'new' ? 'Fresh releases just for you' :
                                     activeFilter === 'featured' ? 'Handpicked selections' :
                                     `Best ${activeFilter} albums`}
                                </p>
                            </div>
                            <div className='text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-full border border-gray-200'>
                                {sortOptions.find(opt => opt.id === sortBy)?.label || 'Popular'}
                            </div>
                        </div>
                        <AlbumGrid 
                            filter={activeFilter} 
                            sortBy={sortBy}
                            searchQuery={searchQuery}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Albums;