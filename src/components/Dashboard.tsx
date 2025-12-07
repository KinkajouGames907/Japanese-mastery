import React from 'react';
import { motion } from 'framer-motion';
import {
  Flame,
  Target,
  Trophy,
  BookOpen,
  Languages,
  Sparkles,
  ChevronRight,
  Star,
  TrendingUp,
  Calendar
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { lessons } from '../data/lessons';
import { achievements } from '../data/achievements';
import { format } from 'date-fns';

interface DashboardProps {
  onNavigate: (page: string, data?: any) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { progress } = useStore();

  const xpForNextLevel = 100 * progress.level;
  const xpProgress = (progress.xp / xpForNextLevel) * 100;

  const availableLessons = lessons.filter(l => l.level <= progress.level + 1);
  const uncompletedLessons = availableLessons.filter(l => !progress.lessonsCompleted.includes(l.id));
  const nextLesson = uncompletedLessons[0];

  const dailyGoalProgress = Math.min((progress.dailyProgress / progress.dailyGoal) * 100, 100);

  const unlockedAchievements = achievements.filter(a => progress.achievements.includes(a.id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-white/60 text-sm">Welcome back!</p>
          <h1 className="text-2xl font-bold text-white">日本語マスター</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-orange-500/20 px-3 py-1.5 rounded-full">
            <Flame className="w-5 h-5 text-orange-400" />
            <span className="text-orange-400 font-bold">{progress.streak}</span>
          </div>
        </div>
      </div>

      {/* Level & XP Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-5 mb-4"
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-white/70 text-sm">Current Level</p>
            <p className="text-4xl font-black text-white">{progress.level}</p>
          </div>
          <div className="text-right">
            <p className="text-white/70 text-sm">Total XP</p>
            <p className="text-2xl font-bold text-white">{progress.totalXp.toLocaleString()}</p>
          </div>
        </div>
        <div className="mb-2">
          <div className="flex justify-between text-sm text-white/70 mb-1">
            <span>{progress.xp} XP</span>
            <span>{xpForNextLevel} XP</span>
          </div>
          <div className="h-3 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-400"
              initial={{ width: 0 }}
              animate={{ width: `${xpProgress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
        <p className="text-white/60 text-sm text-center">
          {xpForNextLevel - progress.xp} XP until Level {progress.level + 1}
        </p>
      </motion.div>

      {/* Daily Goal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 mb-4"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-green-500/20 rounded-xl">
            <Target className="w-6 h-6 text-green-400" />
          </div>
          <div className="flex-1">
            <p className="text-white font-semibold">Daily Goal</p>
            <p className="text-white/60 text-sm">{progress.dailyProgress}/{progress.dailyGoal} XP</p>
          </div>
          {dailyGoalProgress >= 100 && (
            <div className="flex items-center gap-1 text-green-400">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-medium">Complete!</span>
            </div>
          )}
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className={`h-full ${dailyGoalProgress >= 100 ? 'bg-green-400' : 'bg-gradient-to-r from-green-400 to-emerald-500'}`}
            initial={{ width: 0 }}
            animate={{ width: `${dailyGoalProgress}%` }}
          />
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <Languages className="w-5 h-5 text-blue-400" />
            <span className="text-white/60 text-sm">Words</span>
          </div>
          <p className="text-2xl font-bold text-white">{progress.wordsLearned.length}</p>
          <p className="text-white/40 text-xs">learned</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-5 h-5 text-purple-400" />
            <span className="text-white/60 text-sm">Kanji</span>
          </div>
          <p className="text-2xl font-bold text-white">{progress.kanjiLearned.length}</p>
          <p className="text-white/40 text-xs">learned</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <span className="text-white/60 text-sm">Achievements</span>
          </div>
          <p className="text-2xl font-bold text-white">{unlockedAchievements.length}</p>
          <p className="text-white/40 text-xs">unlocked</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <span className="text-white/60 text-sm">Lessons</span>
          </div>
          <p className="text-2xl font-bold text-white">{progress.lessonsCompleted.length}</p>
          <p className="text-white/40 text-xs">completed</p>
        </motion.div>
      </div>

      {/* Continue Learning */}
      {nextLesson && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onClick={() => onNavigate('lesson', { lessonId: nextLesson.id })}
          className="w-full bg-gradient-to-r from-pink-500 to-orange-500 rounded-2xl p-5 mb-4 text-left hover:from-pink-600 hover:to-orange-600 transition-all"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm mb-1">Continue Learning</p>
              <p className="text-xl font-bold text-white">{nextLesson.title}</p>
              <p className="text-white/70">{nextLesson.titleJp}</p>
            </div>
            <ChevronRight className="w-8 h-8 text-white" />
          </div>
        </motion.button>
      )}

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="mb-4"
      >
        <h2 className="text-lg font-semibold text-white mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onNavigate('lessons')}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-4 text-left hover:bg-white/20 transition-all"
          >
            <BookOpen className="w-8 h-8 text-indigo-400 mb-2" />
            <p className="text-white font-medium">All Lessons</p>
            <p className="text-white/50 text-sm">{availableLessons.length} available</p>
          </button>

          <button
            onClick={() => onNavigate('review')}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-4 text-left hover:bg-white/20 transition-all"
          >
            <Star className="w-8 h-8 text-yellow-400 mb-2" />
            <p className="text-white font-medium">Review</p>
            <p className="text-white/50 text-sm">{progress.reviewQueue.length} items</p>
          </button>

          <button
            onClick={() => onNavigate('vocabulary')}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-4 text-left hover:bg-white/20 transition-all"
          >
            <Languages className="w-8 h-8 text-green-400 mb-2" />
            <p className="text-white font-medium">Vocabulary</p>
            <p className="text-white/50 text-sm">Practice words</p>
          </button>

          <button
            onClick={() => onNavigate('kanji')}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-4 text-left hover:bg-white/20 transition-all"
          >
            <span className="text-3xl mb-2 block">漢</span>
            <p className="text-white font-medium">Kanji</p>
            <p className="text-white/50 text-sm">Study kanji</p>
          </button>
        </div>
      </motion.div>

      {/* Recent Achievements */}
      {unlockedAchievements.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-white">Recent Achievements</h2>
            <button
              onClick={() => onNavigate('achievements')}
              className="text-sm text-white/60 hover:text-white"
            >
              View All
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {unlockedAchievements.slice(-5).reverse().map((achievement) => (
              <div
                key={achievement.id}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-3 min-w-[120px] flex flex-col items-center"
              >
                <span className="text-3xl mb-1">{achievement.icon}</span>
                <p className="text-white text-xs text-center font-medium">{achievement.title}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Streak Calendar Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="mt-4 bg-white/10 backdrop-blur-lg rounded-xl p-4"
      >
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="w-5 h-5 text-orange-400" />
          <span className="text-white font-medium">This Week</span>
        </div>
        <div className="flex justify-between">
          {[...Array(7)].map((_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - 6 + i);
            const dateStr = format(date, 'yyyy-MM-dd');
            const studied = progress.studyDates.includes(dateStr);
            const isToday = i === 6;

            return (
              <div key={i} className="flex flex-col items-center">
                <span className="text-white/40 text-xs mb-1">
                  {format(date, 'EEE').charAt(0)}
                </span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  studied
                    ? 'bg-gradient-to-br from-orange-400 to-pink-500'
                    : isToday
                    ? 'border-2 border-dashed border-white/30'
                    : 'bg-white/10'
                }`}>
                  {studied && <Flame className="w-4 h-4 text-white" />}
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-3 text-center">
          <p className="text-white/60 text-sm">
            {progress.streak === 0
              ? "Start your streak today!"
              : progress.streak === 1
              ? "1 day streak! Keep it going!"
              : `${progress.streak} day streak! 🔥`
            }
          </p>
        </div>
      </motion.div>
    </div>
  );
};
