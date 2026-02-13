import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Home } from 'lucide-react';

const FinalReveal = () => {
  const navigate = useNavigate();
  const [showLetter, setShowLetter] = useState(false);

  useEffect(() => {
    // Trigger confetti on mount
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#E11D48', '#FB7185', '#FDA4AF', '#FECDD3', '#FFF0F5']
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#E11D48', '#FB7185', '#FDA4AF', '#FECDD3', '#FFF0F5']
      });
    }, 250);

    // Show letter after brief delay
    setTimeout(() => setShowLetter(true), 1000);

    return () => clearInterval(interval);
  }, []);

  const photos = [
    'https://customer-assets.emergentagent.com/job_3d176d06-f49b-4fd0-bdae-308074ed6951/artifacts/438kmmxl_WhatsApp%20Image%202026-02-13%20at%209.16.53%20PM.jpeg',
    'https://customer-assets.emergentagent.com/job_3d176d06-f49b-4fd0-bdae-308074ed6951/artifacts/wpzauyjh_WhatsApp%20Image%202026-02-13%20at%209.16.54%20PM%20%281%29.jpeg',
    'https://customer-assets.emergentagent.com/job_3d176d06-f49b-4fd0-bdae-308074ed6951/artifacts/lf8jl46i_WhatsApp%20Image%202026-02-13%20at%209.16.54%20PM%20%282%29.jpeg',
    'https://customer-assets.emergentagent.com/job_3d176d06-f49b-4fd0-bdae-308074ed6951/artifacts/jg293b4v_WhatsApp%20Image%202026-02-13%20at%209.16.54%20PM.jpeg',
    'https://customer-assets.emergentagent.com/job_3d176d06-f49b-4fd0-bdae-308074ed6951/artifacts/dhsv8r1h_photo_2025-04-11_22-19-24.jpg'
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-4xl w-full"
      >
        {/* Hero Section */}
        <div className="text-center mb-12">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block mb-6"
          >
            <Heart size={80} className="text-rose-500 fill-rose-500" />
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold mb-4"
            style={{ 
              fontFamily: "'Playfair Display', serif",
              color: '#4A0404'
            }}
          >
            Happy Valentine's Day!
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-3xl md:text-4xl mb-8"
            style={{ 
              fontFamily: "'Great Vibes', cursive",
              color: '#9F1239'
            }}
          >
            My Dearest Hippu ❤️
          </motion.p>
        </div>

        {/* Photo Gallery */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12"
        >
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.9 + index * 0.1, type: 'spring' }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="aspect-square rounded-2xl overflow-hidden shadow-lg"
            >
              <img
                src={photo}
                alt={`Memory ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Love Letter */}
        {showLetter && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-8 border-4 border-rose-200"
          >
            <div className="flex justify-center mb-6">
              <Sparkles size={40} className="text-rose-500" />
            </div>

            <div 
              className="text-lg md:text-xl leading-relaxed text-rose-900 space-y-6"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              <p>
                My Beautiful Hippu,
              </p>
              <p>
                Distance may keep us apart physically, but nothing can separate our hearts. 
                Every day without you feels incomplete, yet every moment I think of you fills 
                me with warmth and happiness.
              </p>
              <p>
                Since that special day on <strong>June 3rd, 2023</strong>, at Adyar Hills in Mangalore, 
                my life has been a beautiful journey. You've filled my days with laughter, my 
                nights with dreams, and my heart with endless love.
              </p>
              <p>
                Even though we're miles apart, you're always in my thoughts, in my heart, 
                and in every beat that keeps me going. This long distance isn't easy, but 
                loving you makes every challenge worth it.
              </p>
              <p>
                Thank you for being my partner, my best friend, my everything. Thank you for 
                choosing me every single day, for your patience, your love, and for making 
                me the luckiest person alive.
              </p>
              <p className="text-2xl font-bold text-rose-600" style={{ fontFamily: "'Great Vibes', cursive" }}>
                I love you more than words can say, Hippu. Happy Valentine's Day! 💕
              </p>
              <p className="text-right font-semibold text-rose-700">
                Forever yours,<br />
                Kichu ❤️
              </p>
            </div>
          </motion.div>
        )}

        {/* Restart Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="text-center"
        >
          <motion.button
            data-testid="restart-button"
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-full text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-3"
          >
            <Home size={24} />
            Experience Again
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FinalReveal;
