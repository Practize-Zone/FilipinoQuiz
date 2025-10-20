import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Unlock, Star, ChevronRight, Home } from 'lucide-react';
import { useState, useEffect } from 'react';

interface UnlockedScreenProps {
  studentName: string;
  reviewScore: number;
  totalReviewQuestions: number;
  onContinue: () => void;
  onBackToMenu: () => void;
}

export function UnlockedScreen({ 
  studentName, 
  reviewScore, 
  totalReviewQuestions, 
  onContinue,
  onBackToMenu
}: UnlockedScreenProps) {
  const percentage = Math.round((reviewScore / totalReviewQuestions) * 100);
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

  const starCount = getStarCount();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      {/* Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: -20,
                backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'][Math.floor(Math.random() * 5)]
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
          className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 md:p-12 text-center"
        >
          {/* Unlock Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6"
          >
            <Unlock className="w-10 h-10 text-green-600" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl text-gray-900 mb-2"
          >
            Bahagi 1 Tapos Na! 🎉
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 mb-8"
          >
            Mahusay, {studentName}!ffs
          </motion.p>

          {/* Score Display */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 mb-6"
          >
            <p className="text-sm text-gray-600 mb-2">Iyong Puntos</p>
            <p className="text-5xl text-blue-600 mb-4">
              {reviewScore}/{totalReviewQuestions}
            </p>
            <p className="text-2xl text-gray-700">{percentage}%</p>

            {/* Stars */}
            <div className="flex items-center justify-center gap-2 mt-4">
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
          </motion.div>

          {/* Info Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6"
          >
            <p className="text-sm text-green-900">
              ✅ Naka-unlock na ang <strong>Bahagi 2: Pangunahing Quiz</strong>
            </p>
            <p className="text-xs text-green-700 mt-1">
              5 tanong tungkol sa "Ang Matanda at ang Dagat"
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
                onClick={onContinue}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white h-14 text-lg rounded-xl shadow-lg"
              >
                Magpatuloy sa Bahagi 2
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <Button
                onClick={onBackToMenu}
                variant="outline"
                className="w-full h-12 text-gray-700 border-gray-300 hover:bg-gray-50 rounded-xl"
              >
                <Home className="w-5 h-5 mr-2" />
                Bumalik sa Menu
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Encouragement Message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="text-center text-gray-600 mt-6 text-sm"
        >
          {percentage >= 80 ? '🌟 Napakahusay!' : percentage >= 60 ? '💪 Magaling!' : '📚 Kaya mo yan! Subukan muli!'}
        </motion.p>
      </div>
    </div>
  );
}
