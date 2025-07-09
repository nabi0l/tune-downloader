import React from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import { useMusicPlayer } from '../contexts/MusicPlayerContext';

const AudioTest = () => {
  const { playTrack, pauseTrack, currentTrack, isPlaying } = useMusicPlayer();

  const testTracks = [
    {
      id: 'test-1',
      title: 'What A Beautiful Name',
      artist: 'Hillsong Worship',
      audioUrl: '/audio/artists/hillsong-worship/full-songs/What A Beautiful Name - Hillsong Worship - Hillsong Worship.mp3',
      coverImage: 'https://i.scdn.co/image/ab67616d0000b273a0c48b2a6eab12b6bca444b0',
      duration: 257
    },
    {
      id: 'test-2',
      title: 'King of Kings',
      artist: 'Hillsong Worship',
      audioUrl: '/audio/artists/hillsong-worship/full-songs/King of Kings (Live) - Hillsong Worship - Hillsong Worship.mp3',
      coverImage: 'https://i.scdn.co/image/ab67616d0000b2734f75c1a0de4d60e722f7badf',
      duration: 287
    },
    {
      id: 'test-3',
      title: 'Cornerstone',
      artist: 'Hillsong Worship',
      audioUrl: '/audio/artists/hillsong-worship/full-songs/Cornerstone - Live  Hillsong Worship - Hillsong Worship.mp3',
      coverImage: 'https://upload.wikimedia.org/wikipedia/en/c/c1/Hillsong-Cornerstone.jpg',
      duration: 312
    }
  ];

  const handlePlayPause = (track) => {
    const isCurrentlyPlaying = currentTrack && currentTrack.id === track.id && isPlaying;
    
    if (isCurrentlyPlaying) {
      pauseTrack();
    } else {
      playTrack(track);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Audio Player Test</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testTracks.map((track) => {
            const isCurrentlyPlaying = currentTrack && currentTrack.id === track.id && isPlaying;
            
            return (
              <div key={track.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative aspect-square">
                  <img
                    src={track.coverImage}
                    alt={track.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <button
                      onClick={() => handlePlayPause(track)}
                      className="bg-white bg-opacity-90 p-4 rounded-full hover:scale-110 transition-transform shadow-lg opacity-0 hover:opacity-100"
                    >
                      {isCurrentlyPlaying ? (
                        <FaPause className="text-black text-xl" />
                      ) : (
                        <FaPlay className="text-black text-xl ml-1" />
                      )}
                    </button>
                  </div>
                  
                  {/* Currently Playing Indicator */}
                  {isCurrentlyPlaying && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-green-500 text-white p-2 rounded-full animate-pulse">
                        <FaPause className="h-3 w-3" />
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{track.title}</h3>
                  <p className="text-gray-600">{track.artist}</p>
                  <p className="text-gray-500 text-sm mt-1">
                    Duration: {Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}
                  </p>
                  
                  <button
                    onClick={() => handlePlayPause(track)}
                    className="mt-3 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center"
                  >
                    {isCurrentlyPlaying ? (
                      <>
                        <FaPause className="mr-2" />
                        Pause
                      </>
                    ) : (
                      <>
                        <FaPlay className="mr-2" />
                        Play
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-8 p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Current Status</h2>
          <div className="space-y-2">
            <p><strong>Current Track:</strong> {currentTrack ? currentTrack.title : 'None'}</p>
            <p><strong>Artist:</strong> {currentTrack ? currentTrack.artist : 'None'}</p>
            <p><strong>Playing:</strong> {isPlaying ? 'Yes' : 'No'}</p>
            <p><strong>Audio URL:</strong> {currentTrack ? currentTrack.audioUrl : 'None'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioTest; 