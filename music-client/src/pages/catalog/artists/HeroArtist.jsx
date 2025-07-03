import React from "react";

const ArtistHero = ({ artist }) => {
  // Fallbacks for missing data
  const name = artist?.name || "Unknown Artist";
  const origin = artist?.origin || artist?.country || "";
  const genres = artist?.genres || [];
  // Prioritize imageUrl (Spotify images) over other image fields
  const bannerImage = artist?.imageUrl || artist?.bannerImage || artist?.image || "https://images.unsplash.com/photo-1501612780327-45045538702b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
  const profileImage = artist?.imageUrl || artist?.profileImage || artist?.image || "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80";
  const tagline = artist?.tagline || "Experience God's Presence Through Worship";
  const verse = artist?.verse || "Psalm 100:2 - 'Worship the Lord with gladness...'";
  const followers = artist?.followers || (artist?.followerCount ? `${artist.followerCount} Followers` : "");

  const handleImageError = (e, fallbackSrc) => {
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
        img.src = fallbackSrc;
      }
    };
    
    retryLoad();
  };

  return (
    <div className="relative h-[600px] w-full bg-gray-900 overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0">
        <img
          src={bannerImage}
          alt="Worship background"
          className="w-full h-full object-cover opacity-40"
          onError={(e) => handleImageError(e, "https://images.unsplash.com/photo-1501612780327-45045538702b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent" />
      </div>

      {/* Content container */}
      <div className="container mx-auto px-4 h-full flex items-center relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10 w-full">
          {/* Profile image */}
          <div className="relative w-56 h-56 rounded-full border-4 border-white/80 overflow-hidden shadow-xl">
            <img
              src={profileImage}
              alt={name}
              className="w-full h-full object-cover"
              onError={(e) => handleImageError(e, "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80")}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>

          {/* Text content */}
          <div className="text-center lg:text-left max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
              {name}
            </h1>

            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-5 mb-8 text-white/90">
              {origin && (
                <span className="flex items-center text-lg">
                  <LocationIcon className="mr-2" />
                  {origin}
                </span>
              )}
              {genres.length > 0 && (
                <span className="flex items-center text-lg">
                  <MusicIcon className="mr-2" />
                  {genres.join(" • ")}
                </span>
              )}
              {followers && (
                <span className="flex items-center text-lg">
                  <UserIcon className="mr-2" />
                  {followers}
                </span>
              )}
            </div>

            {/* Bible verse card */}
            <div className="bg-white/10 rounded-xl p-6 border border-white/20">
              <p className="italic text-xl md:text-2xl text-white mb-2">
                "{tagline}"
              </p>
              <p className="text-lg text-white/80 font-serif">{verse}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Icon components
const LocationIcon = ({ className }) => (
  <svg
    className={`h-5 w-5 ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const MusicIcon = ({ className }) => (
  <svg
    className={`h-5 w-5 ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
    />
  </svg>
);

const UserIcon = ({ className }) => (
  <svg
    className={`h-5 w-5 ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

export default ArtistHero;
