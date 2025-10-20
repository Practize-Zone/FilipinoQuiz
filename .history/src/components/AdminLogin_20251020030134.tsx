import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Lock, Eye, EyeOff, Mail } from 'lucide-react';
import { FloatingFish } from './FloatingFish';

interface AdminLoginProps {
  onLogin: (email: string, password: string) => Promise<boolean>;
  onBack: () => void;
}

export function AdminLogin({ onLogin, onBack }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await onLogin(email, password);
      
      if (!success) {
        setError('Mali ang email o password. Subukan muli.');
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
        setPassword('');
      }
    } catch (err) {
      setError('May error sa pag-login. Subukan muli.');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1719754521254-fe2bf48055a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMHVuZGVyd2F0ZXIlMjBibHVlfGVufDF8fHx8MTc2MDc4NDY2M3ww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Underwater ocean"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B3D91]/95 via-[#0B3D91]/90 to-[#0B3D91]/95" />
      </div>

      <FloatingFish />

      {/* Bubbles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 bg-white/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: -20,
          }}
          animate={{
            y: [0, -window.innerHeight - 100],
            x: [0, (Math.random() - 0.5) * 100],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md px-6"
      >
        <motion.div
          animate={isShaking ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.5 }}
          className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 border border-[#4ECDC4]/30"
        >
          {/* Lock Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            className="flex justify-center mb-6"
          >
            <div className="bg-gradient-to-br from-[#0B3D91] to-[#4ECDC4] rounded-full p-6 shadow-xl">
              <Lock className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center mb-8"
          >
            <h1 className="text-[#0B3D91] mb-2">
              Dashboard ng Guro
            </h1>
            <p className="text-[#0B3D91]/70">
              Mangyaring mag-login upang makita ang mga iskor
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block mb-2 text-[#0B3D91]">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#0B3D91]/60" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  placeholder="teacher@example.com"
                  className="w-full bg-[#F5E8C7] border-[#FDB813]/30 focus:border-[#FDB813] text-[#0B3D91] placeholder:text-[#0B3D91]/40 rounded-xl h-12 pl-12"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block mb-2 text-[#0B3D91]">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  placeholder="Ilagay ang password..."
                  className="w-full bg-[#F5E8C7] border-[#FDB813]/30 focus:border-[#FDB813] text-[#0B3D91] placeholder:text-[#0B3D91]/40 rounded-xl h-12 pr-12"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0B3D91]/60 hover:text-[#0B3D91] transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#FF6B6B]/20 border border-[#FF6B6B]/50 text-[#FF6B6B] px-4 py-3 rounded-xl text-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Login Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#FDB813] to-[#4ECDC4] hover:from-[#FDB813]/90 hover:to-[#4ECDC4]/90 text-[#0B3D91] h-14 rounded-xl shadow-lg disabled:opacity-50"
            >
              {isLoading ? 'Nag-login...' : 'Mag-login'}
            </Button>
          </motion.form>

          {/* Back Button */}
          <Button
            onClick={onBack}
            variant="ghost"
            className="w-full mt-4 text-[#0B3D91]/70 hover:text-[#0B3D91] hover:bg-[#0B3D91]/5"
            disabled={isLoading}
          >
            Bumalik sa Quiz
          </Button>

        </motion.div>
      </motion.div>
    </div>
  );
}