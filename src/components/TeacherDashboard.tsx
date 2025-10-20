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
import { GraduationCap, ArrowLeft, RefreshCw, Award, TrendingUp, Users, Target, Crown, Medal, Download } from 'lucide-react';
import { FloatingFish } from './FloatingFish';

interface StudentScore {
  name: string;
  score: number;
  totalQuestions: number;
  date: string;
}

interface TeacherDashboardProps {
  scores: StudentScore[];
  onBack: () => void;
  onRefresh?: () => void;
}

export function TeacherDashboard({ scores, onBack, onRefresh }: TeacherDashboardProps) {
  const averageScore = scores.length > 0
    ? scores.reduce((sum, s) => sum + s.score, 0) / scores.length
    : 0;

  const totalStudents = scores.length;
  const perfectScores = scores.filter(s => s.score === s.totalQuestions).length;
  const averagePercentage = scores.length > 0
    ? (scores.reduce((sum, s) => sum + (s.score / s.totalQuestions) * 100, 0) / scores.length)
    : 0;

  // Sort scores by percentage (highest first)
  const sortedScores = [...scores].sort((a, b) => {
    const percentA = (a.score / a.totalQuestions) * 100;
    const percentB = (b.score / b.totalQuestions) * 100;
    return percentB - percentA;
  });

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

      {/* Animated grid pattern */}
      <motion.div
        className="absolute inset-0 opacity-5"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='1'%3E%3Cpath d='M0 0h80v80H0z'/%3E%3Cpath d='M0 0l80 80M80 0L0 80'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 min-h-screen p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto mb-8"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#FDB813]/20 to-[#4ECDC4]/20 blur-3xl" />

            <div className="relative bg-white/98 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex items-center gap-4">
                  <motion.div
                    className="bg-gradient-to-br from-[#FDB813] to-[#4ECDC4] rounded-2xl p-4 shadow-xl"
                    animate={{
                      rotate: [0, 5, 0, -5, 0],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <GraduationCap className="w-10 h-10 text-white" />
                  </motion.div>
                  <div>
                    <h1 className="bg-gradient-to-r from-[#0B3D91] to-[#4ECDC4] bg-clip-text text-transparent">
                      Dashboard ng Guro
                    </h1>
                    <p className="text-[#0B3D91]/70 text-lg">
                      📊 Mga Resulta ng Pagsusulit
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  {onRefresh && (
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        onClick={onRefresh}
                        className="bg-gradient-to-r from-[#4ECDC4] to-[#4ECDC4]/80 hover:from-[#4ECDC4]/90 hover:to-[#4ECDC4]/70 text-white shadow-lg"
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        I-refresh
                      </Button>
                    </motion.div>
                  )}
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={onBack}
                      variant="outline"
                      className="border-2 border-[#0B3D91] text-[#0B3D91] hover:bg-[#0B3D91] hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Bumalik
                    </Button>
                  </motion.div>
                </div>
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
              bgGradient: 'from-[#4ECDC4]/20 to-[#4ECDC4]/5',
            },
            {
              icon: TrendingUp,
              label: 'Average na Iskor',
              value: `${averageScore.toFixed(1)} / 5`,
              gradient: 'from-[#FDB813] to-[#FDB813]/70',
              bgGradient: 'from-[#FDB813]/20 to-[#FDB813]/5',
            },
            {
              icon: Crown,
              label: 'Perpektong Iskor',
              value: perfectScores,
              gradient: 'from-[#FF6B6B] to-[#FF6B6B]/70',
              bgGradient: 'from-[#FF6B6B]/20 to-[#FF6B6B]/5',
            },
            {
              icon: Target,
              label: 'Average na %',
              value: `${averagePercentage.toFixed(1)}%`,
              gradient: 'from-[#0B3D91] to-[#0B3D91]/70',
              bgGradient: 'from-[#0B3D91]/20 to-[#0B3D91]/5',
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
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} blur-xl opacity-70 group-hover:opacity-100 transition-opacity`} />

                <div className="relative bg-white/98 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/50">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`bg-gradient-to-br ${stat.gradient} rounded-xl p-3 shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className={`text-4xl bg-gradient-to-br ${stat.gradient} bg-clip-text text-transparent`}
                    >
                      {stat.value}
                    </motion.div>
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
            <div className="absolute inset-0 bg-gradient-to-r from-[#FDB813]/20 to-[#4ECDC4]/20 blur-3xl" />

            <div className="relative bg-white/98 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/50">
              {/* Table Header with decorative design */}
              <div className="relative bg-gradient-to-r from-[#0B3D91] via-[#0B3D91]/95 to-[#0B3D91] p-8 overflow-hidden">
                {/* Decorative pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0L100 50L50 100L0 50z' fill='%23ffffff'/%3E%3C/svg%3E")`,
                    backgroundSize: '50px 50px',
                  }} />
                </div>

                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Medal className="w-8 h-8 text-[#FDB813]" />
                    <h2 className="text-white">
                      📚 Kompletong Listahan ng mga Iskor
                    </h2>
                  </div>
                  <Button
                    variant="ghost"
                    className="text-white hover:bg-white/10"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    I-download
                  </Button>
                </div>
              </div>

              {/* Table Content */}
              <div className="p-8">
                {scores.length === 0 ? (
                  <div className="text-center py-20">
                    <motion.div
                      animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="text-9xl mb-6"
                    >
                      📝
                    </motion.div>
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
                        <TableRow className="border-[#0B3D91]/20 hover:bg-transparent">
                          <TableHead className="text-[#0B3D91]">
                            🏅 Rank
                          </TableHead>
                          <TableHead className="text-[#0B3D91]">
                            👤 Pangalan
                          </TableHead>
                          <TableHead className="text-[#0B3D91]">
                            ✅ Iskor
                          </TableHead>
                          <TableHead className="text-[#0B3D91]">
                            📊 Porsyento
                          </TableHead>
                          <TableHead className="text-[#0B3D91]">
                            📅 Petsa
                          </TableHead>
                          <TableHead className="text-[#0B3D91]">
                            ⭐ Katayuan
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {sortedScores.map((student, index) => {
                          const percentage = (student.score / student.totalQuestions) * 100;
                          const isTop3 = index < 3;

                          return (
                            <motion.tr
                              key={index}
                              initial={{ opacity: 0, x: -30 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.05 * index }}
                              className={`border-[#0B3D91]/10 hover:bg-gradient-to-r transition-all ${
                                isTop3
                                  ? 'hover:from-[#FDB813]/10 hover:to-[#4ECDC4]/10'
                                  : 'hover:from-[#F5E8C7]/30 hover:to-transparent'
                              }`}
                            >
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  {index === 0 && (
                                    <motion.div
                                      animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                                      transition={{ duration: 2, repeat: Infinity }}
                                    >
                                      <Crown className="w-6 h-6 text-[#FDB813]" fill="currentColor" />
                                    </motion.div>
                                  )}
                                  {index === 1 && (
                                    <Medal className="w-6 h-6 text-[#C0C0C0]" />
                                  )}
                                  {index === 2 && (
                                    <Medal className="w-6 h-6 text-[#CD7F32]" />
                                  )}
                                  <span className={`${isTop3 ? 'font-semibold text-[#FDB813]' : 'text-[#0B3D91]/60'}`}>
                                    #{index + 1}
                                  </span>
                                </div>
                              </TableCell>

                              <TableCell>
                                <span className={`${isTop3 ? 'font-semibold text-[#0B3D91]' : 'text-[#0B3D91]'}`}>
                                  {student.name}
                                </span>
                              </TableCell>

                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <span className="text-[#0B3D91] font-semibold text-lg">
                                    {student.score}
                                  </span>
                                  <span className="text-[#0B3D91]/60">
                                    / {student.totalQuestions}
                                  </span>
                                </div>
                              </TableCell>

                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <div className="w-32 bg-gradient-to-r from-[#F5E8C7] to-[#F5E8C7]/50 rounded-full h-3 overflow-hidden shadow-inner">
                                    <motion.div
                                      className={`h-full rounded-full ${
                                        percentage === 100
                                          ? 'bg-gradient-to-r from-[#FDB813] to-[#FF6B6B]'
                                          : percentage >= 80
                                          ? 'bg-gradient-to-r from-[#4ECDC4] to-[#FDB813]'
                                          : 'bg-gradient-to-r from-[#0B3D91] to-[#4ECDC4]'
                                      }`}
                                      initial={{ width: 0 }}
                                      animate={{ width: `${percentage}%` }}
                                      transition={{ duration: 1, delay: 0.1 * index }}
                                    />
                                  </div>
                                  <span className={`font-semibold ${
                                    percentage === 100
                                      ? 'text-[#FDB813]'
                                      : percentage >= 80
                                      ? 'text-[#4ECDC4]'
                                      : 'text-[#0B3D91]'
                                  }`}>
                                    {percentage.toFixed(0)}%
                                  </span>
                                </div>
                              </TableCell>

                              <TableCell className="text-[#0B3D91]/70">
                                {student.date}
                              </TableCell>

                              <TableCell>
                                {percentage === 100 && (
                                  <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    whileHover={{ scale: 1.1 }}
                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FDB813] to-[#FF6B6B] text-white px-4 py-2 rounded-full shadow-lg"
                                  >
                                    <Crown className="w-4 h-4" fill="currentColor" />
                                    Perpekto!
                                  </motion.span>
                                )}
                                {percentage >= 80 && percentage < 100 && (
                                  <span className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4ECDC4] to-[#4ECDC4]/80 text-white px-4 py-2 rounded-full shadow-lg">
                                    <Award className="w-4 h-4" />
                                    Mahusay
                                  </span>
                                )}
                                {percentage >= 60 && percentage < 80 && (
                                  <span className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FDB813]/80 to-[#FDB813]/60 text-[#0B3D91] px-4 py-2 rounded-full shadow-lg">
                                    👍 Mabuti
                                  </span>
                                )}
                                {percentage < 60 && (
                                  <span className="inline-flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-full">
                                    📚 Mag-aral pa
                                  </span>
                                )}
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
              ⚓ Inspirado sa "Ang Matanda at ang Dagat" ni Ernest Hemingway ⚓
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
