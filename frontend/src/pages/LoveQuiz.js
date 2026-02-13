import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, CheckCircle, XCircle, ArrowRight } from 'lucide-react';

const LoveQuiz = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const questions = [
    {
      question: "Where did we have our first date?",
      options: ["Beach Side Cafe", "Adyar Hills Mangalore", "Movie Theater", "College Campus"],
      correct: 1,
      image: "https://customer-assets.emergentagent.com/job_3d176d06-f49b-4fd0-bdae-308074ed6951/artifacts/dhsv8r1h_photo_2025-04-11_22-19-24.jpg"
    },
    {
      question: "What special day marks our anniversary?",
      options: ["June 1st", "June 3rd", "July 3rd", "May 3rd"],
      correct: 1,
      image: "https://customer-assets.emergentagent.com/job_3d176d06-f49b-4fd0-bdae-308074ed6951/artifacts/438kmmxl_WhatsApp%20Image%202026-02-13%20at%209.16.53%20PM.jpeg"
    },
    {
      question: "Who's always stealing glances at whom?",
      options: ["You at me", "Me at you", "Both of us", "Neither"],
      correct: 2,
      image: "https://customer-assets.emergentagent.com/job_3d176d06-f49b-4fd0-bdae-308074ed6951/artifacts/lf8jl46i_WhatsApp%20Image%202026-02-13%20at%209.16.54%20PM%20%282%29.jpeg"
    },
    {
      question: "What makes our long distance relationship strong?",
      options: ["Video calls", "Trust and love", "Texts", "All of the above"],
      correct: 3,
      image: "https://customer-assets.emergentagent.com/job_3d176d06-f49b-4fd0-bdae-308074ed6951/artifacts/wpzauyjh_WhatsApp%20Image%202026-02-13%20at%209.16.54%20PM%20%281%29.jpeg"
    }
  ];

  const handleAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);

    const isCorrect = answerIndex === questions[currentQuestion].correct;
    setAnswers([...answers, isCorrect]);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        // Quiz complete
        setTimeout(() => navigate('/reveal'), 1500);
      }
    }, 2000);
  };

  const isComplete = currentQuestion === questions.length - 1 && showFeedback;
  const correctCount = answers.filter(Boolean).length;

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl w-full"
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
            How Well Do You Know Us?
          </motion.h1>
          <p className="text-lg text-rose-800" style={{ fontFamily: "'Manrope', sans-serif" }}>
            Let's test your memory of our love story
          </p>
          <div className="mt-4 flex justify-center gap-2">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index < currentQuestion ? 'bg-rose-500' :
                  index === currentQuestion ? 'bg-pink-400' :
                  'bg-rose-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl shadow-xl overflow-hidden"
          >
            {/* Image */}
            <div className="relative h-64 overflow-hidden">
              <img
                src={questions[currentQuestion].image}
                alt="Memory"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h2 className="text-white text-2xl md:text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {questions[currentQuestion].question}
                </h2>
              </div>
            </div>

            {/* Options */}
            <div className="p-6 space-y-3">
              {questions[currentQuestion].options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === questions[currentQuestion].correct;
                const showCorrect = showFeedback && isCorrect;
                const showWrong = showFeedback && isSelected && !isCorrect;

                return (
                  <motion.button
                    key={index}
                    data-testid={`quiz-option-${index}`}
                    onClick={() => !showFeedback && handleAnswer(index)}
                    disabled={showFeedback}
                    whileHover={!showFeedback ? { scale: 1.02 } : {}}
                    whileTap={!showFeedback ? { scale: 0.98 } : {}}
                    animate={showWrong ? { x: [-10, 10, -10, 10, 0] } : {}}
                    transition={showWrong ? { duration: 0.4 } : {}}
                    className={`w-full p-4 rounded-2xl text-left font-semibold transition-all duration-300 flex items-center justify-between ${
                      showCorrect ? 'bg-green-100 border-2 border-green-500 text-green-800' :
                      showWrong ? 'bg-red-100 border-2 border-red-500 text-red-800' :
                      isSelected ? 'bg-rose-100 border-2 border-rose-300 text-rose-800' :
                      'bg-rose-50 border-2 border-rose-200 text-rose-800 hover:bg-rose-100 hover:border-rose-300'
                    }`}
                  >
                    <span>{option}</span>
                    {showCorrect && <CheckCircle className="text-green-600" size={24} />}
                    {showWrong && <XCircle className="text-red-600" size={24} />}
                  </motion.button>
                );
              })}
            </div>

            {/* Feedback */}
            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-6 pb-6"
              >
                {selectedAnswer === questions[currentQuestion].correct ? (
                  <div className="flex items-center gap-3 text-green-700 bg-green-50 p-4 rounded-2xl">
                    <Heart className="fill-green-600 text-green-600" size={24} />
                    <span className="font-semibold">Perfect! You remember this moment ❤️</span>
                  </div>
                ) : (
                  <div className="text-rose-700 bg-rose-50 p-4 rounded-2xl">
                    <span className="font-semibold">That's okay! Every day with you is a new memory 💕</span>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Complete Message */}
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 text-center"
          >
            <p className="text-2xl font-bold text-rose-700 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              You got {correctCount} out of {questions.length} right!
            </p>
            <p className="text-rose-600">
              Taking you to something special...
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default LoveQuiz;
