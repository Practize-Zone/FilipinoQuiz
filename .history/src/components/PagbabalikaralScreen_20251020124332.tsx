import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Check, X, ChevronRight, BookOpen, Sparkles } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface PagbabalikaralScreenProps {
  studentName: string;
  onComplete: (score: number) => void;
}

const questions: Question[] = [
  {
    id: 1,
    question: 'Ano ang ibig sabihin ng talumpati?',
    options: [
      'Isang akdang pampanitikan na binabasa lamang sa sarili',
      'Isang pormal na pahayag o pananalita na binibigkas sa harap ng madla tungkol sa isang paksa',
      'Isang liham na ipinapadala sa mga tagapakinig',
      'Isang awit na nagpapahayag ng damdamin'
    ],
    correctAnswer: 2
  },
  {
    id: 2,
    question: 'Sino si Dilma Rousseff?',
    options: [
      'Isang manunulat na mula sa Brazil na tumanggap ng Nobel Prize sa Panitikan',
      'Isang guro at makata na lumaban sa diktadura sa Brazil',
      'Isang politiko at ekonomistang mula sa Brazil na naging unang babaeng pangulo ng bansa',
      'Isang artista at mang-aawit na sumikat sa Latin America'
    ],
    correctAnswer: 2
  },
  
];

export function PagbabalikaralScreen({ studentName, onComplete }: PagbabalikaralScreenProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);

  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;

  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback) return;
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    if (!showFeedback) {
      // Show feedback first
      setShowFeedback(true);
      // Update score if correct
      if (selectedAnswer === question.correctAnswer) {
        setScore(score + 1);
      }
    } else {
      // Move to next question or complete
      if (isLastQuestion) {
        // FIX: Don't add to score again, just pass current score
        onComplete(score);
      } else {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      }
    }
  };

  const getAnswerClassName = (index: number) => {
    const baseClass = "relative w-full p-5 rounded-xl border-2 transition-all duration-300 text-left";
    
    if (!showFeedback) {
      if (selectedAnswer === index) {
        return `${baseClass} bg-blue-600 border-blue-600 text-white shadow-lg`;
      }
      return `${baseClass} bg-white border-gray-200 text-gray-800 hover:border-blue-400 hover:shadow-md`;
    } else {
      if (index === question.correctAnswer) {
        return `${baseClass} bg-green-500 border-green-500 text-white shadow-lg`;
      }
      if (selectedAnswer === index && index !== question.correctAnswer) {
        return `${baseClass} bg-red-500 border-red-500 text-white shadow-lg`;
      }
      return `${baseClass} bg-gray-50 border-gray-200 text-gray-400`;
    }
  };

  const isCorrect = selectedAnswer === question.correctAnswer;
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-3 rounded-xl">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-gray-900">Bahagi 1: Pagbabalik-aral</h2>
                <p className="text-sm text-gray-500">Mabuhay, {studentName}!</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Tanong</p>
              <p className="text-2xl text-blue-600">{currentQuestion + 1}/{questions.length}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Instruction - only show on first question */}
          {currentQuestion === 0 && !showFeedback && (
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-sm text-blue-900">
              </p>
            </div>
          )}
        </div>

        {/* Question Card */}
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-6"
        >
          <h3 className="text-xl text-gray-900 mb-6">{question.question}</h3>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <motion.button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={getAnswerClassName(index)}
                whileHover={!showFeedback ? { scale: 1.01 } : {}}
                whileTap={!showFeedback ? { scale: 0.99 } : {}}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {showFeedback && (
                    <div>
                      {index === question.correctAnswer && (
                        <Check className="w-5 h-5" />
                      )}
                      {selectedAnswer === index && index !== question.correctAnswer && (
                        <X className="w-5 h-5" />
                      )}
                    </div>
                  )}
                </div>
              </motion.button>
            ))}
          </div>

          {/* Feedback Message */}
          <AnimatePresence>
            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`mt-6 p-4 rounded-xl ${
                  isCorrect 
                    ? 'bg-green-50 border border-green-200' 
                    : 'bg-red-50 border border-red-200'
                }`}
              >
                <p className={`text-center ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                  {isCorrect ? '🎉 Tama! Mahusay!' : '❌ Mali. Subukang muli sa susunod!'}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Next Button */}
        <Button
          onClick={handleNext}
          disabled={selectedAnswer === null}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white h-14 text-lg rounded-xl shadow-lg disabled:opacity-50"
        >
          {showFeedback ? (isLastQuestion ? 'Tapusin' : 'Susunod') : 'Suriin'}
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
}
