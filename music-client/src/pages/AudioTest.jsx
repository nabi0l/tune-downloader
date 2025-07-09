import React from 'react';
import { useMusicPlayer } from '../contexts/MusicPlayerContext';

const AudioTest = () => {
  const { playTrack, pauseTrack, currentTrack, isPlaying } = useMusicPlayer();

  // Get the server base URL
  const getServerBaseUrl = () => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    return apiUrl.replace('/api', '');
  };

  const testTracks = [
    {
      id: 'test1',
      title: 'What A Beautiful Name',
      artist: 'Hillsong Worship',
      audioUrl: `${getServerBaseUrl()}/audio/artists/hillsong-worship/full-songs/What A Beautiful Name - Hillsong Worship - Hillsong Worship.mp3`,
      coverImage: 'https://i.scdn.co/image/ab67616d0000b273a0c48b2a6eab12b6bca444b0'
    },
    {
      id: 'test2',
      title: 'How Great Is Our God',
      artist: 'Chris Tomlin',
      audioUrl: `${getServerBaseUrl()}/audio/artists/chris-tomlin/full-songs/Chris Tomlin - How Great Is Our God (Lyrics And Chords) - ChrisTomlinVEVO.mp3`,
      coverImage: 'https://m.media-amazon.com/images/I/91pUVqOwjtL._UF1000,1000_QL80_.jpg'
    },
    {
      id: 'test3',
      title: 'You Say',
      artist: 'Lauren Daigle',
      audioUrl: `${getServerBaseUrl()}/audio/artists/lauren-daigle/full-songs/Lauren Daigle - You Say (Official Music Video) - Lauren Daigle.mp3`,
      coverImage: 'https://i1.sndcdn.com/artworks-DNWDXrlFr4qw-0-t500x500.jpg'
    },
    {
      id: 'test4',
      title: 'This Is Amazing Grace',
      artist: 'Phil Wickham',
      audioUrl: `${getServerBaseUrl()}/audio/artists/phil-wickham/full-songs/Phil Wickham - This Is Amazing Grace (Official Music Video) - PhilWickhamVEVO.mp3`,
      coverImage: 'https://i1.sndcdn.com/artworks-KEQ4Mqe7gZQW-0-t500x500.jpg'
    }
  ];

  const handlePlay = async (track) => {
    try {
      console.log('Testing audio URL:', track.audioUrl);
      
      // Test if the audio file exists
      const response = await fetch(track.audioUrl, { method: 'HEAD' });
      console.log('Audio file response:', response.status, response.statusText);
      
      if (response.ok) {
        await playTrack(track);
      } else {
        alert(`Audio file not found: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error testing audio:', error);
      alert('Error testing audio file');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Audio Test Page</h1>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Current Player State</h2>
        <div className="bg-gray-100 p-4 rounded">
          <p><strong>Currently Playing:</strong> {currentTrack?.title || 'None'}</p>
          <p><strong>Artist:</strong> {currentTrack?.artist || 'None'}</p>
          <p><strong>Is Playing:</strong> {isPlaying ? 'Yes' : 'No'}</p>
          <p><strong>Audio URL:</strong> {currentTrack?.audioUrl || 'None'}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {testTracks.map((track) => (
          <div key={track.id} className="bg-white rounded-lg shadow-md p-4">
            <img 
              src={track.coverImage} 
              alt={track.title}
              className="w-full h-32 object-cover rounded mb-3"
            />
            <h3 className="font-semibold text-lg">{track.title}</h3>
            <p className="text-gray-600">{track.artist}</p>
            <div className="mt-3 space-y-2">
              <button
                onClick={() => handlePlay(track)}
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                Test Play
              </button>
              <button
                onClick={pauseTrack}
                className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
              >
                Pause
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AudioTest; 