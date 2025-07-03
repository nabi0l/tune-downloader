import React, { useState } from "react";
import { FaSearch} from "react-icons/fa";

const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const popularSearches = [
    "Worship",
    "Gospel",
    "Contemporary",
    "Acoustic",
    "Hymns",
    "Praise",
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Implement search functionality
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-3">
            Discover Divine Melodies
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Search thousands of Christian songs across all genres and styles
          </p>
        </div>

        <form onSubmit={handleSearch} className="relative">
          <div
            className={`flex items-center bg-white rounded-xl shadow-lg overflow-hidden border-2 ${
              isFocused ? "border-black" : "border-gray-200"
            } transition-all duration-200`}
          >
            <div className="pl-5 text-gray-400">
              <FaSearch />
            </div>
            <input
              type="text"
              placeholder="Search songs, artists, or albums..."
              className="flex-grow px-4 py-5 text-lg focus:outline-none bg-transparent text-gray-800 placeholder-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            
            <button
              type="submit"
              className="bg-black text-white px-6 py-5 font-medium hover:bg-gray-800 transition-colors"
            >
              Search
            </button>
          </div>
        </form>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {popularSearches.map((term) => (
            <button
              key={term}
              onClick={() => setSearchQuery(term)}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium text-gray-800 transition-colors"
            >
              {term}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
