// Enhanced AudioPlayer.js

import { useEffect,useRef } from "react";
const AudioPlayer = ({ src, isPlaying, onEnded }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (!src) return;

    const playAudio = async () => {
      try {
        if (isPlaying) {
          await audioRef.current.play();
          // Check if preview expired
          if (src.expiresAt && Date.now() > src.expiresAt) {
            console.warn("Audio preview expired");
            onEnded();
          }
        } else {
          audioRef.current.pause();
        }
      } catch (error) {
        console.error("Playback failed:", error);
        onEnded();
      }
    };

    playAudio();
  }, [src, isPlaying, onEnded]);

  return (
    <audio
      ref={audioRef}
      src={typeof src === "string" ? src : src.url}
      onEnded={onEnded}
      hidden
    />
  );
};

export default AudioPlayer;
