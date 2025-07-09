// Enhanced AudioPlayer.js

import { useEffect, useRef } from "react";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaStepForward, FaStepBackward, FaTimes } from "react-icons/fa";
import { useMusicPlayer } from "../contexts/MusicPlayerContext";

const AudioPlayer = () => {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    playTrack,
    pauseTrack,
    seekTo,
    setVolumeLevel,
    toggleMute,
    formatTime,
    closePlayer
  } = useMusicPlayer();

  const progressRef = useRef(null);
  const volumeRef = useRef(null);

  // Handle progress bar click
  const handleProgressClick = (e) => {
    if (!progressRef.current) return;
    
    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = clickX / width;
    const newTime = percentage * duration;
    seekTo(newTime);
  };

  // Handle volume slider change
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolumeLevel(newVolume);
  };

  // Auto-hide player when no track is selected
  if (!currentTrack) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 audio-player shadow-lg z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Track Info */}
          <div className="flex items-center space-x-4 flex-1">
            <img
              src={currentTrack.coverImage}
              alt={currentTrack.title}
              className="w-12 h-12 rounded-lg object-cover"
              onError={(e) => {
                e.target.src = "/images/home/newRelease/default-album.jpg";
              }}
            />
            <div className="min-w-0 flex-1 track-info">
              <h4 className="font-semibold text-sm truncate">{currentTrack.title}</h4>
              <p className="text-gray-600 text-xs truncate">{currentTrack.artist}</p>
            </div>
          </div>

          {/* Playback Controls */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
                // Previous track functionality can be added here
              }}
              className="p-2 text-gray-600 hover:text-black transition-colors btn-control"
              disabled
            >
              <FaStepBackward className="w-4 h-4" />
            </button>
            
            <button
              onClick={isPlaying ? pauseTrack : () => playTrack(currentTrack)}
              className="bg-black text-white p-3 rounded-full hover:bg-gray-800 transition-colors btn-play"
            >
              {isPlaying ? (
                <FaPause className="w-4 h-4" />
              ) : (
                <FaPlay className="w-4 h-4 ml-1" />
              )}
            </button>
            
            <button
              onClick={() => {
                // Next track functionality can be added here
              }}
              className="p-2 text-gray-600 hover:text-black transition-colors btn-control"
              disabled
            >
              <FaStepForward className="w-4 h-4" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex-1 mx-8">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500 w-12 text-right">
                {formatTime(currentTime)}
              </span>
              <div
                ref={progressRef}
                className="flex-1 h-1 bg-gray-200 rounded-full cursor-pointer relative progress-container"
                onClick={handleProgressClick}
              >
                <div
                  className="h-full bg-black rounded-full transition-all duration-100 progress-fill"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </div>
              <span className="text-xs text-gray-500 w-12">
                {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Volume Controls */}
          <div className="flex items-center space-x-2 volume-control">
            <button
              onClick={toggleMute}
              className="p-2 text-gray-600 hover:text-black transition-colors btn-control"
            >
              {isMuted ? (
                <FaVolumeMute className="w-4 h-4" />
              ) : (
                <FaVolumeUp className="w-4 h-4" />
              )}
            </button>
            <div className="w-20">
              <input
                ref={volumeRef}
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer slider volume-slider"
              />
            </div>
          </div>

          {/* Close Button */}
          <div className="flex items-center ml-4">
            <button
              onClick={closePlayer}
              className="p-2 text-gray-600 hover:text-red-500 transition-colors btn-control"
              title="Close player"
            >
              <FaTimes className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
