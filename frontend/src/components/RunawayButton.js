import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const RunawayButton = ({ onClick }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hasRunAway, setHasRunAway] = useState(false);

  const getRandomPosition = () => {
    const padding = 100; // Padding from edges
    const maxX = window.innerWidth - 150 - padding;
    const maxY = window.innerHeight - 60 - padding;
    
    const newX = Math.random() * maxX - (window.innerWidth / 2) + 75;
    const newY = Math.random() * maxY - (window.innerHeight / 2) + 30;
    
    return { x: newX, y: newY };
  };

  const handleRunAway = () => {
    setHasRunAway(true);
    setPosition(getRandomPosition());
  };

  return (
    <motion.button
      data-testid="no-button"
      onMouseEnter={handleRunAway}
      onTouchStart={handleRunAway}
      onClick={(e) => {
        e.preventDefault();
        handleRunAway();
      }}
      animate={position}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="px-8 py-4 bg-gray-200 text-gray-700 rounded-full text-xl font-semibold hover:bg-gray-300 transition-colors duration-200 shadow-md cursor-pointer"
      style={{
        position: hasRunAway ? 'fixed' : 'relative',
        left: hasRunAway ? '50%' : 'auto',
        top: hasRunAway ? '50%' : 'auto',
        transform: hasRunAway ? 'translate(-50%, -50%)' : 'none',
      }}
    >
      No
    </motion.button>
  );
};

export default RunawayButton;
