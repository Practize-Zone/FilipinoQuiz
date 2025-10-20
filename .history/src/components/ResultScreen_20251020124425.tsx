import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Trophy, RotateCcw, BarChart3, Star } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ResultScreenProps {
  studentName: string;
  score: number;
  totalQuestions: number;
  onRetake: () => void;
  onViewScores: () => void;
}

export function ResultScreen({
  studentName,
  score,
  totalQuestions,
  onRetake,
  onViewScores
}: ResultScreenProps) {
  const percentage = Math.round((score / totalQuestions) * 100);
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const getStarCount = () => {
    if (percentage >= 90) return 5;
    if (percentage >= 70) return 4;
    if (percentage >= 50) return 3;
    if (percentage >= 30) return 2;
    return 1;
  };

  const getMessage = () => {
    if (percentage >= 90) return { emoji: '🏆', text: 'Napakahusay!', color: 'text-yellow-600' };
    if (percentage >= 70) return { emoji: '🌟', text: 'Mahusay!', color: 'text-blue-600' };
    if (percentage >= 50) return { emoji: '👍', text: 'Mabuti!', color: 'text-green-600' };
    if (percentage >= 30) return { emoji: '💪', text: 'Magaling!', color: 'text-indigo-600' };
    return { emoji: '📚', text: 'Subukan muli!', color: 'text-gray-600' };
  };

  const starCount = getStarCount();
  const message = getMessage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
      {/* Confetti */}
      {showConfetti && percentage >= 70 && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: -20,
                backgroundColor: ['#3B82F6', '#10B981', '#b89860ff', '#EF4444', '#8B5CF6'][Math.floor(Math.random() * 5)]
              }}
              animate={{
                y: window.innerHeight + 100,
                rotate: Math.random() * 360,
                x: Math.random() * 200 - 100
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                delay: Math.random() * 0.5,
                ease: 'linear'
              }}
            />
          ))}
        </div>
      )}

      <div className="w-full max-w-2xl">
        {/* Main Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 md:p-12"
        >
          {/* Trophy Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 rounded-full mb-6"
          >
            <Trophy className="w-10 h-10 text-yellow-600" />
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl text-gray-900 mb-2"
          >
            Quiz Tapos Na! 🎉
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 mb-8"
          >
            Salamat, {studentName}!
          </motion.p>

          {/* Score Display */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 mb-6"
          >
            <p className="text-sm text-gray-600 mb-2">Iyong Puntos sa Bahagi 2</p>
            <p className="text-6xl text-blue-600 mb-4">
              {score}/{totalQuestions}
            </p>
            <p className="text-3xl text-gray-700 mb-4">{percentage}%</p>

            {/* Stars */}
            <div className="flex items-center justify-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.6 + i * 0.1, type: 'spring' }}
                >
                  <Star
                    className={`w-8 h-8 ${
                      i < starCount
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </motion.div>
              ))}
            </div>

            {/* Message */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className={`text-2xl ${message.color}`}
            >
              {message.emoji} {message.text}
            </motion.p>
          </motion.div>

          {/* Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6 text-sm text-gray-600"
          >
            <p>
              <strong>Tandaan:</strong> Ang puntos na ito ay para sa Bahagi 2 lamang (Pangunahing Quiz). 
              Kumpletuhin mo rin ang Bahagi 1 bago makapunta dito!
            </p>
          </motion.div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <Button
                onClick={onRetake}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white h-14 text-lg rounded-xl shadow-lg"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Ulitin ang Quiz
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <Button
                onClick={onViewScores}
                variant="outline"
                className="w-full h-12 text-gray-700 border-gray-300 hover:bg-gray-50 rounded-xl"
              >
                <BarChart3 className="w-5 h-5 mr-2" />
                Tingnan ang Lahat ng Scores (Teacher)
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center text-gray-600 mt-6 text-sm"
        >
          Maraming salamat sa pagsagot! 📚
        </motion.p>
      </div>
    </div>
  );
}
