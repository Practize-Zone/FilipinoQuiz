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
  id: number;
  student_name: string;
  part1_score: number;
  part1_total: number;
  part2_score?: number;
  part2_total?: number;
  created_at: string;
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
    ? scores.reduce((sum, s) => sum + (s.part1_score || 0), 0) / scores.length
    : 0;
  
  const avgPart2 = scores.length > 0
    ? scores.reduce((sum, s) => sum + (s.part2_score || 0), 0) / scores.length
    : 0;
  
  const avgOverall = scores.length > 0
    ? scores.reduce((sum, s) => {
        const total = (s.part1_score || 0) + (s.part2_score || 0);
        const maxTotal = (s.part1_total || 0) + (s.part2_total || 0);
        return sum + (total / maxTotal) * 100;
      }, 0) / scores.length
    : 0;
  
  const avgOverallPercentage = avgOverall;

  const perfectScores = scores.filter(s => 
    s.part1_score === s.part1_total && 
    (s.part2_score === s.part2_total || (!s.part2_score && !s.part2_total))
  ).length;

  // Sort by overall percentage descending
  const sortedScores = [...scores].sort((a, b) => {
    const percentA = ((a.part1_score + (a.part2_score || 0)) / (a.part1_total + (a.part2_total || 0))) * 100;
    const percentB = ((b.part1_score + (b.part2_score || 0)) / (b.part1_total + (b.part2_total || 0))) * 100;
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
              value: `${avgPart2.toFixed(1)} / 5`,
              gradient: 'from-indigo-500 to-indigo-400',
            },
            {
              icon: Award,
              label: 'Perfect Scores',
              value: perfectScores,
              gradient: 'from-[#FDB813] to-[#FDB813]/70',
            },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.1 * i, type: 'spring' }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative group"
              >
                <div className="relative bg-white/98 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/50">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`bg-gradient-to-br ${stat.gradient} rounded-xl p-3 shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className={`text-4xl bg-gradient-to-br ${stat.gradient} bg-clip-text text-transparent`}>
                      {stat.value}
                    </div>
                  </div>
                  <p className="text-[#0B3D91]/70">{stat.label}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Scores Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-7xl mx-auto"
        >
          <div className="relative">
            <div className="relative bg-white/98 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/50">
              {/* Table Header */}
              <div className="bg-gradient-to-r from-[#0B3D91] via-[#0B3D91]/95 to-[#0B3D91] p-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-white">
                    📚 Kompletong Listahan (Bahagi 1 & 2)
                  </h2>
                </div>
              </div>

              {/* Table Content */}
              <div className="p-8">
                {scores.length === 0 ? (
                  <div className="text-center py-20">
                    <div className="text-9xl mb-6">📝</div>
                    <p className="text-[#0B3D91]/70 text-xl mb-2">
                      Wala pang kumuha ng pagsusulit
                    </p>
                    <p className="text-[#0B3D91]/50">
                      Ang mga iskor ay lalabas dito kapag may nag-submit na
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-[#0B3D91]/20">
                          <TableHead className="text-[#0B3D91]">🏅 Rank</TableHead>
                          <TableHead className="text-[#0B3D91]">👤 Pangalan</TableHead>
                          <TableHead className="text-[#0B3D91]">📘 Bahagi 1</TableHead>
                          <TableHead className="text-[#0B3D91]">📗 Bahagi 2</TableHead>
                          <TableHead className="text-[#0B3D91]">📊 Kabuuan</TableHead>
                          <TableHead className="text-[#0B3D91]">⭐ Rating</TableHead>
                          <TableHead className="text-[#0B3D91]">📅 Petsa</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {sortedScores.map((student, index) => {
                          const totalScore = student.part1_score + (student.part2_score || 0);
                          const totalPossible = student.part1_total + (student.part2_total || 0);
                          const overallPercentage = (totalScore / totalPossible) * 100;
                          const part1Percentage = (student.part1_score / student.part1_total) * 100;
                          const part2Percentage = student.part2_score ? ((student.part2_score / (student.part2_total || 5)) * 100) : 0;
                          const isTop3 = index < 3;
                          
                          return (
                            <motion.tr
                              key={index}
                              initial={{ opacity: 0, x: -30 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.05 * index }}
                              className="border-[#0B3D91]/10 hover:bg-gradient-to-r hover:from-[#F5E8C7]/30 hover:to-transparent"
                            >
                              {/* Rank */}
                              <TableCell>
                                <span className={`font-semibold ${isTop3 ? 'text-[#FDB813]' : 'text-[#0B3D91]/60'}`}>
                                  #{index + 1}
                                </span>
                              </TableCell>
                              
                              {/* Name */}
                              <TableCell>
                                <span className={`${isTop3 ? 'font-semibold text-[#0B3D91]' : 'text-[#0B3D91]'}`}>
                                  {student.student_name}
                                </span>
                              </TableCell>
                              
                              {/* Part 1 Score */}
                              <TableCell>
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-blue-600 font-semibold">
                                      {student.part1_score}/{student.part1_total}
                                    </span>
                                    <span className="text-sm text-blue-600">
                                      ({part1Percentage.toFixed(0)}%)
                                    </span>
                                  </div>
                                  <div className="w-24 bg-blue-100 rounded-full h-2">
                                    <div 
                                      className="bg-blue-600 h-2 rounded-full"
                                      style={{ width: `${part1Percentage}%` }}
                                    />
                                  </div>
                                </div>
                              </TableCell>
                              
                              {/* Part 2 Score */}
                              <TableCell>
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-indigo-600 font-semibold">
                                      {student.part2_score || 0}/{student.part2_total || 5}
                                    </span>
                                    <span className="text-sm text-indigo-600">
                                      ({part2Percentage.toFixed(0)}%)
                                    </span>
                                  </div>
                                  <div className="w-24 bg-indigo-100 rounded-full h-2">
                                    <div 
                                      className="bg-indigo-600 h-2 rounded-full"
                                      style={{ width: `${part2Percentage}%` }}
                                    />
                                  </div>
                                </div>
                              </TableCell>
                              
                              {/* Overall Score */}
                              <TableCell>
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-[#0B3D91] font-bold text-lg">
                                      {student.part1_score + (student.part2_score || 0)}/{student.part1_total + (student.part2_total || 5)}
                                    </span>
                                    <span className={`font-semibold ${
                                      overallPercentage >= 90 ? 'text-green-600' :
                                      overallPercentage >= 70 ? 'text-blue-600' :
                                      'text-gray-600'
                                    }`}>
                                      {overallPercentage.toFixed(0)}%
                                    </span>
                                  </div>
                                  <div className="w-32 bg-gray-200 rounded-full h-2">
                                    <div 
                                      className={`h-2 rounded-full ${
                                        overallPercentage >= 90 ? 'bg-green-600' :
                                        overallPercentage >= 70 ? 'bg-blue-600' :
                                        'bg-gray-600'
                                      }`}
                                      style={{ width: `${overallPercentage}%` }}
                                    />
                                  </div>
                                </div>
                              </TableCell>
                              
                              {/* Star Rating */}
                              <TableCell>
                                <span className="text-lg">
                                  {getStarRating(student.overallScore || 0, student.overallTotal || 10)}
                                </span>
                              </TableCell>
                              
                              {/* Date */}
                              <TableCell className="text-[#0B3D91]/70 text-sm">
                                {student.date}
                              </TableCell>
                            </motion.tr>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="max-w-7xl mx-auto mt-8 text-center"
        >
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-white/50">
            <p className="text-[#0B3D91]/70 italic mb-2">
              ⚓ Bahagi 1: 5 tanong | Bahagi 2: 5 tanong | Kabuuan: 10 tanong ⚓
            </p>
            <p className="text-[#0B3D91]/50">
              Ginawa nang may pagmamahal para sa Filipino education
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}