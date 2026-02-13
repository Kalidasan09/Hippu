import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef(null);

  // Romantic music - using a romantic instrumental
  const musicUrl = 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_4a4fc29896.mp3';

  useEffect(() => {
    const handleFirstClick = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        // Try to auto-play after first interaction
        if (audioRef.current) {
          audioRef.current.play().catch(() => {
            // If autoplay fails, that's okay
          });
          setIsPlaying(true);
        }
      }
    };

    document.addEventListener('click', handleFirstClick, { once: true });
    return () => document.removeEventListener('click', handleFirstClick);
  }, [hasInteracted]);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <audio ref={audioRef} loop>
        <source src={musicUrl} type="audio/mpeg" />
      </audio>
      
      <motion.button
        onClick={toggleMusic}
        data-testid="music-toggle-button"
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-rose-500 to-pink-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isPlaying ? (
          <Volume2 size={24} />
        ) : (
          <VolumeX size={24} />
        )}
      </motion.button>
    </>
  );
};

export default MusicPlayer;
