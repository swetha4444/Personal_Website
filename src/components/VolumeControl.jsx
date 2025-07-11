import React, { useState, useEffect } from 'react';
import { FaVolumeUp, FaVolumeDown, FaVolumeMute } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const VolumeControl = ({ audioRef }) => {
  const [volume, setVolume] = useState(0.1);
  const [isMuted, setIsMuted] = useState(false);
  const [showSlider, setShowSlider] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted, audioRef]);

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) {
      return <FaVolumeMute size={22} />;
    }
    if (volume < 0.5) {
      return <FaVolumeDown size={22} />;
    }
    return <FaVolumeUp size={22} />;
  };

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
      onMouseEnter={() => setShowSlider(true)}
      onMouseLeave={() => setShowSlider(false)}
    >
      <AnimatePresence>
        {showSlider && (
          <motion.input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            initial={{ width: 0, opacity: 0, marginRight: -10 }}
            animate={{ width: 100, opacity: 1, marginRight: 0 }}
            exit={{ width: 0, opacity: 0, marginRight: -10 }}
            transition={{ duration: 0.3 }}
            className="volume-slider"
          />
        )}
      </AnimatePresence>
      <button
        onClick={toggleMute}
        className="bg-black/60 rounded-full p-3 border-2 border-[#5dff4e] shadow-lg hover:bg-[#222] transition-all"
        aria-label="Toggle mute"
      >
        <div className="text-[#5dff4e] drop-shadow-[0_0_8px_#5dff4e]">
          {getVolumeIcon()}
        </div>
      </button>
    </div>
  );
};

export default VolumeControl;