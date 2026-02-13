import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import RunawayButton from '../components/RunawayButton';
import { Sparkles, Heart } from 'lucide-react';

const ProposalPage = () => {
  const navigate = useNavigate();

  const handleYes = () => {
    // Trigger confetti
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        navigate('/memories');
        return;
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#E11D48', '#FB7185', '#FDA4AF', '#FECDD3']
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#E11D48', '#FB7185', '#FDA4AF', '#FECDD3']
      });
    }, 250);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl"
      >
        {/* Top decoration */}
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex justify-center mb-8"
        >
          <Sparkles size={48} className="text-rose-500" />
        </motion.div>

        {/* Main heading */}
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
          style={{ 
            fontFamily: "'Playfair Display', serif",
            color: '#4A0404'
          }}
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          Will You Be My Valentine?
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-2xl md:text-3xl mb-4"
          style={{ 
            fontFamily: "'Great Vibes', cursive",
            color: '#9F1239'
          }}
        >
          Dear Hippu,
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-lg md:text-xl mb-12 text-rose-800 leading-relaxed max-w-2xl mx-auto"
          style={{ fontFamily: "'Manrope', sans-serif" }}
        >
          This Valentine's Day, I have something special for you. 
          Even though miles separate us, my heart is always with you. 
          Will you make this day unforgettable?
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex gap-6 justify-center items-center flex-wrap"
        >
          <motion.button
            data-testid="yes-button"
            onClick={handleYes}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            animate={{ 
              boxShadow: [
                '0 0 20px rgba(225, 29, 72, 0.3)',
                '0 0 40px rgba(225, 29, 72, 0.5)',
                '0 0 20px rgba(225, 29, 72, 0.3)',
              ]
            }}
            transition={{ 
              boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
            className="px-12 py-5 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-full text-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3"
          >
            <Heart className="fill-white" size={28} />
            Yes!
          </motion.button>

          <RunawayButton />
        </motion.div>

        {/* Bottom decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-12 text-sm text-rose-600"
          style={{ fontFamily: "'Manrope', sans-serif" }}
        >
          Made with ❤️ by Kichu for Hippu
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProposalPage;
