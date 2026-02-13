import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ArrowRight } from 'lucide-react';

const MemoryLane = () => {
  const navigate = useNavigate();
  
  const photos = [
    {
      id: 1,
      url: 'https://customer-assets.emergentagent.com/job_3d176d06-f49b-4fd0-bdae-308074ed6951/artifacts/438kmmxl_WhatsApp%20Image%202026-02-13%20at%209.16.53%20PM.jpeg',
      caption: 'Graduation Day - Our Beginning'
    },
    {
      id: 2,
      url: 'https://customer-assets.emergentagent.com/job_3d176d06-f49b-4fd0-bdae-308074ed6951/artifacts/wpzauyjh_WhatsApp%20Image%202026-02-13%20at%209.16.54%20PM%20%281%29.jpeg',
      caption: 'Shopping Adventures Together'
    },
    {
      id: 3,
      url: 'https://customer-assets.emergentagent.com/job_3d176d06-f49b-4fd0-bdae-308074ed6951/artifacts/jg293b4v_WhatsApp%20Image%202026-02-13%20at%209.16.54%20PM.jpeg',
      caption: 'Sweet Shopping Moments'
    },
    {
      id: 4,
      url: 'https://customer-assets.emergentagent.com/job_3d176d06-f49b-4fd0-bdae-308074ed6951/artifacts/dhsv8r1h_photo_2025-04-11_22-19-24.jpg',
      caption: 'Beautiful Memories'
    }
  ];

  // Create pairs for matching game
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    // Create pairs and shuffle
    const pairs = [...photos, ...photos].map((photo, index) => ({
      ...photo,
      uniqueId: index,
      pairId: photo.id
    }));
    
    // Shuffle array
    const shuffled = pairs.sort(() => Math.random() - 0.5);
    setCards(shuffled);
  }, []);

  const handleCardClick = (index) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(cards[index].pairId)) {
      return;
    }

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      const [first, second] = newFlipped;
      
      if (cards[first].pairId === cards[second].pairId) {
        // Match found
        setTimeout(() => {
          setMatched([...matched, cards[first].pairId]);
          setFlipped([]);
        }, 600);
      } else {
        // No match
        setTimeout(() => {
          setFlipped([]);
        }, 1000);
      }
    }
  };

  const isComplete = matched.length === photos.length;

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl w-full"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ 
              fontFamily: "'Playfair Display', serif",
              color: '#4A0404'
            }}
          >
            Our Memory Lane
          </motion.h1>
          <p className="text-lg text-rose-800" style={{ fontFamily: "'Manrope', sans-serif" }}>
            Match the pairs to relive our beautiful moments together
          </p>
          <div className="mt-4 text-rose-600 font-semibold">
            Moves: {moves} | Matched: {matched.length}/{photos.length}
          </div>
        </div>

        {/* Game Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {cards.map((card, index) => {
            const isFlipped = flipped.includes(index);
            const isMatched = matched.includes(card.pairId);
            const showCard = isFlipped || isMatched;

            return (
              <motion.div
                key={card.uniqueId}
                data-testid={`memory-card-${index}`}
                onClick={() => handleCardClick(index)}
                className="aspect-square cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="w-full h-full relative"
                  animate={{ rotateY: showCard ? 180 : 0 }}
                  transition={{ duration: 0.6 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Front (hidden) */}
                  <div
                    className="absolute w-full h-full bg-gradient-to-br from-rose-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <Heart size={48} className="text-white fill-white" />
                  </div>

                  {/* Back (photo) */}
                  <div
                    className="absolute w-full h-full rounded-2xl overflow-hidden shadow-lg"
                    style={{ 
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}
                  >
                    <img
                      src={card.url}
                      alt={card.caption}
                      className="w-full h-full object-cover"
                    />
                    {isMatched && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                        <p className="text-white text-sm font-semibold">
                          {card.caption}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Complete Message */}
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 1 }}
              className="inline-block mb-4"
            >
              <Heart size={64} className="text-rose-500 fill-rose-500" />
            </motion.div>
            <h2 className="text-3xl font-bold text-rose-700 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Beautiful Memories Unlocked!
            </h2>
            <p className="text-lg text-rose-800 mb-6">
              These moments are just the beginning of our forever...
            </p>
            <motion.button
              data-testid="next-to-quiz-button"
              onClick={() => navigate('/quiz')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-full text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-3"
            >
              Continue the Journey
              <ArrowRight size={24} />
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default MemoryLane;
