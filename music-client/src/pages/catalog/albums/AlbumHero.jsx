import React from "react";
import tauren from "../../../assets/images/artists/taurenCover.jpg";

const AlbumHero = () => {
  return (
    <div className="hero relative h-[600px] flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={tauren}
          alt="album-cover"
          className="w-full h-full object-cover grayscale blur-sm scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 max-w-6xl mx-auto">
          <div className="w-64 md:w-80 lg:w-96 flex-shrink-0 transform transition-all hover:scale-105">
            <img
              src={tauren}
              alt="album-cover"
              className="rounded-xl shadow-2xl ring-2 ring-white/10 grayscale"
            />
          </div>

          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-2 text-white">
              Let The Church Sing
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-6">
              Tauren Wells
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4 text-gray-300 mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < 4 ? "text-white" : "text-gray-600"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2">4.2</span>
              </div>
              <span>•</span>
              <span className="px-3 py-1 bg-white/10 rounded-full">
                Christian Worship
              </span>
              <span>•</span>
              <span>2025</span>
            </div>

            <p className="text-lg text-gray-300 italic mb-8 max-w-2xl mx-auto lg:mx-0">
              "Inspired By the historic launch of His Church of White-stone,
              Wells Delivers a collection of songs that are sure to uplift and
              inspire the church to sing His praises."
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <button className="bg-white text-black hover:bg-gray-200 px-8 py-3 rounded-full flex items-center gap-2 transition-all transform hover:scale-105 shadow-lg hover:shadow-white/30">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
                Play Samples
              </button>
              <button className="bg-black text-white border border-white hover:bg-gray-900 px-8 py-3 rounded-full transition-all transform hover:scale-105 shadow-lg">
                Buy $9.99
              </button>
              <button className="border border-white/30 hover:bg-white/10 text-white px-6 py-3 rounded-full transition-all flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                Add to Wishlist
              </button>
            </div>

            <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-gray-400">
              <div>
                <span className="block font-medium text-gray-300">
                  Release Date
                </span>
                <span>March 21, 2025</span>
              </div>
              <div>
                <span className="block font-medium text-gray-300">Tracks</span>
                <span>5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumHero;
