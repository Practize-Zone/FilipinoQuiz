import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { BookOpen, ChevronRight, Info, User, Edit2 } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: (name: string) => void;
  existingName?: string;
}

export function WelcomeScreen({ onStart, existingName = '' }: WelcomeScreenProps) {
  const [name, setName] = useState(existingName);
  const [isEditingName, setIsEditingName] = useState(!existingName);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onStart(name.trim());
    }
  };

  const handleQuickStart = () => {
    if (name.trim()) {
      onStart(name.trim());
    }
  };

  const handleChangeName = () => {
    setIsEditingName(true);
    setName('');
  };

  // Show "Welcome Back" screen if user already has a name
  if (existingName && !isEditingName) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 md:p-12"
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-2xl mb-6"
            >
              <User className="w-10 h-10 text-green-600" />
            </motion.div>

            {/* Welcome Back Message */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl text-gray-900 mb-3"
            >
              Mabuhay, {existingName}! 👋
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-600 mb-8"
            >
              Handa ka na bang magsimula ng bagong quiz?
            </motion.p>

            {/* Quick Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8"
            >
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-gray-900 mb-2">
                    <strong>Dalawang Bahagi:</strong>
                  </p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                      Bahagi 1: Pagbabalik-aral (5 tanong)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                      Bahagi 2: Pangunahing Quiz (5 tanong)
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Button
                  onClick={handleQuickStart}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white h-14 text-lg rounded-xl shadow-lg"
                >
                  Simulan ang Quiz
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Button
                  onClick={handleChangeName}
                  variant="outline"
                  className="w-full h-12 text-gray-700 border-gray-300 hover:bg-gray-50 rounded-xl"
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Palitan ang Pangalan
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Footer Note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center text-gray-500 mt-6 text-sm"
          >
            Kabuuang Tanong: <strong>10</strong> (5 + 5)
          </motion.p>
        </div>
      </div>
    );
  }

  // Show normal login form if no name or editing
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 md:p-12"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-2xl mb-6"
          >
            <BookOpen className="w-10 h-10 text-blue-600" />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-4xl text-gray-900 mb-3"
          >
            Ang Matanda at ang Dagat
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 mb-8"
          >
            Quiz para sa mga Mag-aaral
          </motion.p>

          {/* Quiz Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8"
          >
            <div className="flex items-start gap-3 mb-4">
              <Info className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-gray-900 mb-3">
                  <strong>Dalawang Bahagi:</strong>
                </p>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    Bahagi 1: Pagbabalik-aral (5 tanong)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                    Bahagi 2: Pangunahing Quiz (5 tanong)
                  </li>
                </ul>
                <p className="text-xs text-gray-500 mt-3 italic">
                  * Kailangan mong tapusin ang Bahagi 1 upang ma-unlock ang Bahagi 2
                </p>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div>
              <label htmlFor="name" className="block text-sm text-gray-700 mb-2">
                Ipasok ang iyong pangalan
              </label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Juan Dela Cruz"
                className="w-full h-14 text-lg rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                required
                autoFocus
              />
            </div>

            <Button
              type="submit"
              disabled={!name.trim()}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white h-14 text-lg rounded-xl shadow-lg disabled:opacity-50"
            >
              Simulan ang Quiz
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.form>
        </motion.div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-gray-500 mt-6 text-sm"
        >
          Kabuuang Tanong: <strong>7</strong> (2 + 5)
        </motion.p>
      </div>
    </div>
  );
}
