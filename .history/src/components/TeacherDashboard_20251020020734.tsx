import { motion } from 'motion/react';
import { Button } from './ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { GraduationCap, ArrowLeft, RefreshCw, Users, TrendingUp, Award, Target } from 'lucide-react';
import { FloatingFish } from './FloatingFish';

interface StudentScore {
  name: string;
  part1Score?: number;
  part1Total?: number;
  part2Score?: number;
  part2Total?: number;
  overallScore?: number;
  overallTotal?: number;
  date: string;
}

interface TeacherDashboardProps {
  scores: StudentScore[];
  onBack: () => void;
  onRefresh?: () => void;
}

export function TeacherDashboard({ scores, onBack, onRefresh }: TeacherDashboardProps) {
  // Calculate statistics
  const totalStudents = scores.length;
  
  const avgPart1 = scores.length > 0
    ? scores.reduce((sum, s) => sum + (s.part1Score || 0), 0) / scores.length
    : 0;
  
  const avgPart2 = scores.length > 0
    ? scores.reduce((sum, s) => sum + (s.part2Score || 0), 0) / scores.length
    : 0;
  
  const avgOverall = scores.length > 0
    ? scores.reduce((sum, s) => sum + (s.overallScore || 0), 0) / scores.length
    : 0;
  
  const avgOverallPercentage = ((avgOverall / 10) * 100) || 0;

  const perfectScores = scores.filter(s => 
    s.part1Score === s.part1Total && s.part2Score === s.part2Total
  ).length;

  // Sort scores by overall percentage
  const sortedScores = [...scores].sort((a, b) => {
    const percentA = ((a.overallScore || 0) / (a.overallTotal || 1)) * 100;
    const percentB = ((b.overallScore || 0) / (b.overallTotal || 1)) * 100;
    return percentB - percentA;
  });

  const getStarRating = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 90) return '⭐⭐⭐⭐⭐';
    if (percentage >= 70) return '⭐⭐⭐⭐';
    if (percentage >= 50) return '⭐⭐⭐';
    if (percentage >= 30) return '⭐⭐';
    return '⭐';
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1719754521254-fe2bf48055a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMHVuZGVyd2F0ZXIlMjBibHVlfGVufDF8fHx8MTc2MDc4NDY2M3ww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Ocean background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B3D91]/95 via-[#0B3D91]/90 to-[#0B3D91]/95" />
      </div>

      <FloatingFish />

      <div className="relative z-10 min-h-screen p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto mb-8"
        >
          <div className="bg-white/98 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-[#FDB813] to-[#4ECDC4] rounded-2xl p-4 shadow-xl">
                  <GraduationCap className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h1 className="bg-gradient-to-r from-[#0B3D91] to-[#4ECDC4] bg-clip-text text-transparent">
                    Dashboard ng Guro
                  </h1>
                  <p className="text-[#0B3D91]/70 text-lg">
                    📊 Detailed Quiz Results (Part 1 & 2)
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {onRefresh && (
                  <Button
                    onClick={onRefresh}
                    className="bg-gradient-to-r from-[#4ECDC4] to-[#4ECDC4]/80 hover:from-[#4ECDC4]/90 hover:to-[#4ECDC4]/70 text-white shadow-lg"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    I-refresh
                  </Button>
                )}
                <Button
                  onClick={onBack}
                  variant="outline"
                  className="border-2 border-[#0B3D91] text-[#0B3D91] hover:bg-[#0B3D91] hover:text-white"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Bumalik
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Statistics Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-7xl mx-auto mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            {
              icon: Users,
              label: 'Kabuuang Mag-aaral',
              value: totalStudents,
              gradient: 'from-[#4ECDC4] to-[#4ECDC4]/70',
            },
            {
              icon: TrendingUp,
              label: 'Average Bahagi 1',
              value: `${avgPart1.toFixed(1)} / 5`,
              gradient: 'from-blue-500 to-blue-400',
            },
            {
              icon: Target,
              label: 'Average Bahagi 2',