import { useState, useEffect } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { PagbabalikaralScreen } from './components/PagbabalikaralScreen';
import { UnlockedScreen } from './components/UnlockedScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultScreen } from './components/ResultScreen';
import { TeacherDashboard } from './components/TeacherDashboard';
import { AdminLogin } from './components/AdminLogin';

// ⚠️ SUPABASE INTEGRATION - Uncomment these imports when using in VSCode
// import { saveQuizScore, getAllQuizScores } from './utils/supabase/database';
// import { signInTeacher, getCurrentTeacher, signOutTeacher } from './utils/supabase/auth';

type Screen = 'welcome' | 'pagbabalik-aral' | 'unlocked' | 'quiz' | 'result' | 'admin-login' | 'admin-dashboard';

interface StudentScore {
  name: string;
  score: number;
  totalQuestions: number;
  date: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [studentName, setStudentName] = useState('');
  const [reviewScore, setReviewScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [scores, setScores] = useState<StudentScore[]>([]);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const totalReviewQuestions = 5; // Pagbabalik-aral has 5 questions
  const totalQuestions = 5; // Main quiz has 5 questions

  // ⚠️ SUPABASE AUTH - Uncomment when using in VSCode
  // Check if teacher is already logged in on mount
  // useEffect(() => {
  //   checkAuthStatus();
  // }, []);

  // const checkAuthStatus = async () => {
  //   const { success, session } = await getCurrentTeacher();
  //   if (success && session) {
  //     setIsAdminAuthenticated(true);
  //   }
  // };

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

  // ⚠️ SUPABASE - Load scores from database when admin dashboard opens
  // useEffect(() => {
  //   if (currentScreen === 'admin-dashboard') {
  //     loadScoresFromDatabase();
  //   }
  // }, [currentScreen]);

  // const loadScoresFromDatabase = async () => {
  //   const { success, data } = await getAllQuizScores();
  //   if (success && data) {
  //     const formattedScores = data.map((score: any) => ({
  //       name: score.student_name,
  //       score: score.score,
  //       totalQuestions: score.total_questions,
  //       date: new Date(score.created_at).toLocaleDateString('fil-PH', {
  //         year: 'numeric',
  //         month: 'long',
  //         day: 'numeric',
  //         hour: '2-digit',
  //         minute: '2-digit'
  //       })
  //     }));
  //     setScores(formattedScores);
  //   }
  // };

  const handleStart = (name: string) => {
    setStudentName(name);
    setCurrentScreen('pagbabalik-aral'); // Start with review section
  };

  const handleReviewComplete = (score: number) => {
    setReviewScore(score);
    setCurrentScreen('unlocked'); // Show unlocked screen
  };

  const handleContinueToQuiz = () => {
    setCurrentScreen('quiz'); // Proceed to main quiz
  };

  const handleBackToMenuFromUnlocked = () => {
    setCurrentScreen('welcome'); // Go back to main menu
    // DON'T reset studentName - keep it so they can restart quickly!
    setReviewScore(0);
    setCurrentScore(0);
  };

  const handleQuizComplete = async (score: number) => {
    setCurrentScore(score);
    
    const percentage = (score / totalQuestions) * 100;
    
    // ⚠️ SUPABASE - Save to database (uncomment when using in VSCode)
    // await saveQuizScore({
    //   student_name: studentName,
    //   score: score,
    //   total_questions: totalQuestions,
    //   percentage: percentage,
    //   quiz_topic: 'Ang Matanda at ang Dagat'
    // });

    // Temporary: Save to local state (remove when using Supabase)
    const newScore: StudentScore = {
      name: studentName,
      score: score,
      totalQuestions: totalQuestions,
      date: new Date().toLocaleDateString('fil-PH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    
    setScores(prevScores => [...prevScores, newScore]);
    setCurrentScreen('result');
  };

  const handleRetake = () => {
    setCurrentScreen('welcome');
    // DON'T reset studentName - keep it for quick restart!
    setReviewScore(0);
    setCurrentScore(0);
  };

  const handleViewScores = () => {
    if (isAdminAuthenticated) {
      setCurrentScreen('admin-dashboard');
    } else {
      setCurrentScreen('admin-login');
    }
  };

  const handleAdminLogin = async (email?: string, password?: string) => {
    // ⚠️ SUPABASE AUTH - Use real authentication (uncomment when using in VSCode)
    // if (email && password) {
    //   const { success } = await signInTeacher(email, password);
    //   if (success) {
    //     setIsAdminAuthenticated(true);
    //     setCurrentScreen('admin-dashboard');
    //   } else {
    //     // Show error message
    //     return false;
    //   }
    // }

    // Temporary: Simple password check (remove when using Supabase)
    setIsAdminAuthenticated(true);
    setCurrentScreen('admin-dashboard');
    return true;
  };

  const handleBackFromAdmin = async () => {
    // ⚠️ SUPABASE AUTH - Sign out (uncomment when using in VSCode)
    // await signOutTeacher();
    
    setIsAdminAuthenticated(false);
    setCurrentScreen('welcome');
    setStudentName('');
    setReviewScore(0);
    setCurrentScore(0);
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
          score={currentScore}
          totalQuestions={totalQuestions}
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