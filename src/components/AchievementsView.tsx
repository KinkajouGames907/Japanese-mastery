import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Lock } from 'lucide-react';
import { achievements, getUnlockedAchievements, getLockedAchievements } from '../data/achievements';
import { useStore } from '../store/useStore';

interface AchievementsViewProps {
  onBack: () => void;
}

export const AchievementsView: React.FC<AchievementsViewProps> = ({ onBack }) => {
  const { progress } = useStore();

  const unlocked = getUnlockedAchievements(progress);
  const locked = getLockedAchievements(progress);

  const totalXp = unlocked.reduce((sum, a) => sum + a.xpReward, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 pb-24">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white">Achievements</h1>
          <p className="text-white/60 text-sm">
            {unlocked.length}/{achievements.length} unlocked
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-xl p-4">
          <p className="text-yellow-400 text-3xl font-bold">{unlocked.length}</p>
          <p className="text-white/60 text-sm">Achievements</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-4">
          <p className="text-purple-400 text-3xl font-bold">+{totalXp}</p>
          <p className="text-white/60 text-sm">XP Earned</p>
        </div>
      </div>

      {/* Unlocked */}
      {unlocked.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <span className="text-2xl">🏆</span> Unlocked
          </h2>
          <div className="space-y-3">
            {unlocked.map((achievement, idx) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <p className="text-white font-bold">{achievement.title}</p>
                    <p className="text-white/60 text-sm">{achievement.titleJp}</p>
                    <p className="text-white/40 text-sm mt-1">{achievement.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-yellow-400 font-bold">+{achievement.xpReward}</p>
                    <p className="text-white/40 text-xs">XP</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Locked */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
          <Lock className="w-5 h-5 text-white/40" /> Locked
        </h2>
        <div className="space-y-3">
          {locked.map((achievement, idx) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (unlocked.length + idx) * 0.03 }}
              className="bg-white/5 border border-white/10 rounded-xl p-4 opacity-60"
            >
              <div className="flex items-center gap-4">
                <div className="text-4xl grayscale">{achievement.icon}</div>
                <div className="flex-1">
                  <p className="text-white font-bold">{achievement.title}</p>
                  <p className="text-white/40 text-sm">{achievement.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-white/40 font-bold">+{achievement.xpReward}</p>
                  <p className="text-white/40 text-xs">XP</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
