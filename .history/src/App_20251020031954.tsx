import { useState, useEffect } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { PagbabalikaralScreen } from './components/PagbabalikaralScreen';
import { UnlockedScreen } from './components/UnlockedScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultScreen } from './components/ResultScreen';
import { TeacherDashboard } from './components/TeacherDashboard';
import { AdminLogin } from './components/AdminLogin';

// ⚠️ SUPABASE INTEGRATION - Uncomment these imports when using in VSCode
import { saveQuizScore, getAllQuizScores } from './utils/supabase/database';
import { signInTeacher, getCurrentTeacher, signOutTeacher } from './utils/supabase/auth';

type Screen = 'welcome' | 'pagbabalik-aral' | 'unlocked' | 'quiz' | 'result' | 'admin-login' | 'admin-dashboard';

interface StudentScore {
  name: string;
  part1_score: number;
  part2_score: number;
  part1_total: number;
  part2_total: number;
  date: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [studentName, setStudentName] = useState('');
  const [reviewScore, setReviewScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [scores, setScores] = useState<StudentScore[]>([]);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [hasCompletedPart1, setHasCompletedPart1] = useState(false);

  const totalReviewQuestions = 5; // Pagbabalik-aral has 5 questions
  const totalQuestions = 5; // Main quiz has 5 questions

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    const { success, session } = await getCurrentTeacher();
    if (success && session) {
      setIsAdminAuthenticated(true);
    }
  };

  // Check URL for /admin route
  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/admin' || path.startsWith('/admin/')) {
      if (!isAdminAuthenticated) {
        setCurrentScreen('admin-login');
      } else {
        setCurrentScreen('admin-dashboard');
      }
    }
  }, [isAdminAuthenticated]);

  // Update URL when navigating to admin
  useEffect(() => {
    if (currentScreen === 'admin-login' || currentScreen === 'admin-dashboard') {
      if (window.location.pathname !== '/admin') {
        window.history.pushState({}, '', '/admin');
      }
    } else {
      if (window.location.pathname === '/admin') {
        window.history.pushState({}, '', '/');
      }
    }
  }, [currentScreen]);

  useEffect(() => {
    if (currentScreen === 'admin-dashboard') {
      loadScoresFromDatabase();
    }
  }, [currentScreen]);

  const loadScoresFromDatabase = async () => {
    const { success, data } = await getAllQuizScores();
    if (success && data) {
      const formattedScores = data.map((score: any) => ({
        name: score.student_name,
        part1_score: score.part1_score,
        part2_score: score.part2_score,
        part1_total: score.part1_total,
        part2_total: score.part2_total,
        date: new Date(score.created_at).toLocaleDateString('fil-PH', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      }));
      setScores(formattedScores);
    }
  };

  const handleStart = (name: string) => {
    setStudentName(name);
    // If they haven't completed Part 1, start there
    // If they have, go directly to Part 2
    if (!hasCompletedPart1) {
      setCurrentScreen('pagbabalik-aral');
    } else {
      setCurrentScreen('quiz');
    }
  };

  const handleReviewComplete = (score: number) => {
    setReviewScore(score);
    setHasCompletedPart1(true);
    setCurrentScreen('unlocked');
  };

  const handleContinueToQuiz = () => {
    setCurrentScreen('quiz');
  };

  const handleBackToMenuFromUnlocked = () => {
    // DON'T reset progress - they can continue later
    setCurrentScreen('welcome');
  };

  const handleQuizComplete = async (score: number) => {
    setCurrentScore(score);
    
    const part1Percentage = (reviewScore / totalReviewQuestions) * 100;
    const part2Percentage = (score / totalQuestions) * 100;
    
    await saveQuizScore({
      student_name: studentName,
      part1_score: reviewScore,
      part2_score: score,
      part1_total: totalReviewQuestions,
      part2_total: totalQuestions,
      part1_percentage: part1Percentage,
      part2_percentage: part2Percentage,
      quiz_topic: 'Ang Matanda at ang Dagat'
    });
    
    setCurrentScreen('result');
  };

  const handleRetake = () => {
    setCurrentScreen('welcome');
    // Reset all progress for a fresh start
    setReviewScore(0);
    setCurrentScore(0);
    setHasCompletedPart1(false);
  };

  const handleViewScores = () => {
    if (isAdminAuthenticated) {
      setCurrentScreen('admin-dashboard');
    } else {
      setCurrentScreen('admin-login');
    }
  };

  const handleAdminLogin = async (email?: string, password?: string) => {
    if (email && password) {
      const { success } = await signInTeacher(email, password);
      if (success) {
        setIsAdminAuthenticated(true);
        setCurrentScreen('admin-dashboard');
        return true;
      } else {
        return false;
      }
    }
    return false;
  };

  const handleBackFromAdmin = async () => {
    await signOutTeacher();
    setIsAdminAuthenticated(false);
    setCurrentScreen('welcome');
    window.history.pushState({}, '', '/');
  };

  const handleBackFromAdminLogin = () => {
    setCurrentScreen('welcome');
    window.history.pushState({}, '', '/');
  };

  return (
    <div className="size-full">
      {currentScreen === 'welcome' && (
        <WelcomeScreen 
          onStart={handleStart}
          existingName={studentName}
          hasCompletedPart1={hasCompletedPart1}
        />
      )}

      {currentScreen === 'pagbabalik-aral' && (
        <PagbabalikaralScreen
          studentName={studentName}
          onComplete={handleReviewComplete}
        />
      )}

      {currentScreen === 'unlocked' && (
        <UnlockedScreen
          studentName={studentName}
          reviewScore={reviewScore}
          totalReviewQuestions={totalReviewQuestions}
          onContinue={handleContinueToQuiz}
          onBackToMenu={handleBackToMenuFromUnlocked}
        />
      )}
      
      {currentScreen === 'quiz' && (
        <QuizScreen 
          studentName={studentName} 
          onComplete={handleQuizComplete} 
        />
      )}
      
      {currentScreen === 'result' && (
        <ResultScreen
          studentName={studentName}
          part1Score={reviewScore}
          part2Score={currentScore}
          part1Total={totalReviewQuestions}
          part2Total={totalQuestions}
          onRetake={handleRetake}
          onViewScores={handleViewScores}
        />
      )}

      {currentScreen === 'admin-login' && (
        <AdminLogin
          onLogin={handleAdminLogin}
          onBack={handleBackFromAdminLogin}
        />
      )}
      
      {currentScreen === 'admin-dashboard' && (
        <TeacherDashboard
          scores={scores}
          onBack={handleBackFromAdmin}
        />
      )}
    </div>
  );
}