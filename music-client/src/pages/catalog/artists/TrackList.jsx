import React from 'react';

const TrackList = ({ songs }) => {
  if (!songs || songs.length === 0) {
    return <div className="text-gray-500 italic p-4">No songs available.</div>;
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Songs</h3>
      <ul className="divide-y divide-gray-200">
        {songs.map((song) => (
          <li key={song.id} className="flex justify-between items-center py-2 px-2">
            <span className="text-gray-800">{song.title}</span>
            <span className="text-gray-500 text-sm">{song.duration}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrackList; 