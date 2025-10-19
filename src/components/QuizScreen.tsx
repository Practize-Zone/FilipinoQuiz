import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Check, X, ChevronRight, FileText } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizScreenProps {
  studentName: string;
  onComplete: (score: number) => void;
}

const questions: Question[] = [
  {
    id: 1,
    question: 'Ang salitang matanda ay karaniwang nauugnay sa __.',
    options: [
      'Kabataan at kasiglahan',
      'Karanasan at karunungan',
      'Pagiging tamad',
      'Kawalan ng pag-asa'
    ],
    correctAnswer: 1
  },
  {
    id: 2,
    question: 'Ang bangka ay ginagamit bilang __.',
    options: [
      'Panakip sa ulan',
      'Sasakyang pandagat sa pangingisda',
      'Kagamitang pambahay',
      'Laruan ng mga bata'
    ],
    correctAnswer: 1
  },
  {
    id: 3,
    question: 'Ang salitang pisi ay nangangahulugang __.',
    options: [
      'Tela o kasuotan',
      'Tali o lubid na ginagamit sa panghuhuli ng isda',
      'Uri ng isda',
      'Bahagi ng bangka'
    ],
    correctAnswer: 1
  },
  {
    id: 4,
    question: 'Ang lambat ay ginagamit upang __.',
    options: [
      'Maglayag sa dagat',
      'Manghuli ng isda',
      'Magtali ng bangka',
      'Magtago sa araw'
    ],
    correctAnswer: 1
  },
  {
    id: 5,
    question: 'Ang dagat ay karaniwang sumisimbolo sa __.',
    options: [
      'Laban at kabuhayan ng tao',
      'Lugar ng libangan',
      'Simbolo ng kaguluhan',
      'Panahon ng kasayahan'
    ],
    correctAnswer: 0
  }
];

export function QuizScreen({ studentName, onComplete }: QuizScreenProps) {
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
        return `${baseClass} bg-indigo-600 border-indigo-600 text-white shadow-lg`;
      }
      return `${baseClass} bg-white border-gray-200 text-gray-800 hover:border-indigo-400 hover:shadow-md`;
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 p-3 rounded-xl">
                <FileText className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-gray-900">Bahagi 2: Pangunahing Quiz</h2>
                <p className="text-sm text-gray-500">Ang Matanda at ang Dagat</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Tanong</p>
              <p className="text-2xl text-indigo-600">{currentQuestion + 1}/{questions.length}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-600"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
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
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-14 text-lg rounded-xl shadow-lg disabled:opacity-50"
        >
          {showFeedback ? (isLastQuestion ? 'Tapusin' : 'Susunod') : 'Suriin'}
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
}
