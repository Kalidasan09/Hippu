import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const FloatingHearts = () => {
  const hearts = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 5,
    duration: 8 + Math.random() * 4,
    size: 20 + Math.random() * 20,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute"
          style={{
            left: heart.left,
            bottom: '-50px',
          }}
          initial={{ y: 0, opacity: 0.2 }}
          animate={{
            y: -window.innerHeight - 100,
            opacity: [0.2, 0.5, 0.3, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <Heart
            size={heart.size}
            className="text-rose-300 fill-rose-200"
            style={{ filter: 'blur(1px)' }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;
