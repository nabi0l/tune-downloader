import React from "react";

const SingleHero = () => {
  return (
    <div className="relative bg-black text-white min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Background overlay with subtle texture */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1501612780327-45045538702b?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center opacity-20" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/30" />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            Discover New Christian Singles
          </span>
        </h1>

        <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto leading-relaxed">
          Fresh worship anthems and spirit-filled melodies from emerging voices
          of faith
        </p>

        {/* <div className="mt-10 space-x-4">
          <button className="px-8 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg">
            Browse All Singles
          </button>
          <button className="px-8 py-3 border border-white text-white font-medium rounded-full hover:bg-white hover:text-black transition-all">
            Listen to Samples
          </button>
        </div> */}

        {/* Featured artists scroller */}
        <div className="mt-16 overflow-hidden">
          <div className="flex space-x-8 animate-marquee whitespace-nowrap">
            {[
              "Hillsong",
              "Elevation Worship",
              "Maverick City",
              "Tauren Wells",
              "Lauren Daigle",
              "Bethel Music",
              "Chris Tomlin",
              "Phil Wickham",
            ].map((artist) => (
              <span
                key={artist}
                className="text-gray-400 text-lg font-light tracking-wider"
              >
                {artist} •
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Add this to your global CSS */}
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default SingleHero;
