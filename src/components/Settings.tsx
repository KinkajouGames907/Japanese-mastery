import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Target, Bell, Moon, Volume2, Type, BookOpen, RotateCcw } from 'lucide-react';
import { useStore } from '../store/useStore';

interface SettingsProps {
  onBack: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ onBack }) => {
  const { progress, updateSettings, setDailyGoal } = useStore();

  const dailyGoalOptions = [30, 50, 100, 150, 200];

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
        <h1 className="text-2xl font-bold text-white">Settings</h1>
      </div>

      {/* Daily Goal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg rounded-xl p-4 mb-4"
      >
        <div className="flex items-center gap-3 mb-4">
          <Target className="w-6 h-6 text-green-400" />
          <div>
            <p className="text-white font-medium">Daily XP Goal</p>
            <p className="text-white/60 text-sm">Current: {progress.dailyGoal} XP</p>
          </div>
        </div>
        <div className="flex gap-2">
          {dailyGoalOptions.map(goal => (
            <button
              key={goal}
              onClick={() => setDailyGoal(goal)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                progress.dailyGoal === goal
                  ? 'bg-green-500 text-white'
                  : 'bg-white/10 text-white/60 hover:bg-white/20'
              }`}
            >
              {goal}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Learning Preferences */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/10 backdrop-blur-lg rounded-xl p-4 mb-4"
      >
        <h2 className="text-white font-medium mb-4">Learning Preferences</h2>

        <div className="space-y-4">
          {/* Show Furigana */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-white">Show Furigana</p>
                <p className="text-white/50 text-sm">Display readings above kanji</p>
              </div>
            </div>
            <button
              onClick={() => updateSettings({ showFurigana: !progress.settings.showFurigana })}
              className={`w-12 h-6 rounded-full transition-all ${
                progress.settings.showFurigana ? 'bg-green-500' : 'bg-white/20'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-all ${
                  progress.settings.showFurigana ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>

          {/* Prefer Romaji */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Type className="w-5 h-5 text-purple-400" />
              <div>
                <p className="text-white">Prefer Romaji</p>
                <p className="text-white/50 text-sm">Show romanized readings</p>
              </div>
            </div>
            <button
              onClick={() => updateSettings({ preferRomaji: !progress.settings.preferRomaji })}
              className={`w-12 h-6 rounded-full transition-all ${
                progress.settings.preferRomaji ? 'bg-green-500' : 'bg-white/20'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-all ${
                  progress.settings.preferRomaji ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>

          {/* Sound Effects */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Volume2 className="w-5 h-5 text-orange-400" />
              <div>
                <p className="text-white">Sound Effects</p>
                <p className="text-white/50 text-sm">Play sounds on actions</p>
              </div>
            </div>
            <button
              onClick={() => updateSettings({ soundEffects: !progress.settings.soundEffects })}
              className={`w-12 h-6 rounded-full transition-all ${
                progress.settings.soundEffects ? 'bg-green-500' : 'bg-white/20'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-all ${
                  progress.settings.soundEffects ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/10 backdrop-blur-lg rounded-xl p-4 mb-4"
      >
        <h2 className="text-white font-medium mb-4">Your Progress</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-3xl font-bold text-white">{progress.totalXp.toLocaleString()}</p>
            <p className="text-white/60 text-sm">Total XP</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-white">{progress.level}</p>
            <p className="text-white/60 text-sm">Level</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-white">{progress.wordsLearned.length}</p>
            <p className="text-white/60 text-sm">Words Learned</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-white">{progress.kanjiLearned.length}</p>
            <p className="text-white/60 text-sm">Kanji Learned</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-orange-400">{progress.streak}</p>
            <p className="text-white/60 text-sm">Current Streak</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-yellow-400">{progress.longestStreak}</p>
            <p className="text-white/60 text-sm">Longest Streak</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-white">{progress.lessonsCompleted.length}</p>
            <p className="text-white/60 text-sm">Lessons Done</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-white">{progress.studyDates.length}</p>
            <p className="text-white/60 text-sm">Days Studied</p>
          </div>
        </div>
      </motion.div>

      {/* About */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/10 backdrop-blur-lg rounded-xl p-4"
      >
        <h2 className="text-white font-medium mb-2">About</h2>
        <p className="text-white/60 text-sm mb-4">
          日本語マスター - Learn real Japanese, not textbook Japanese.
          This app focuses on practical vocabulary, slang, and casual expressions
          that native speakers actually use.
        </p>
        <p className="text-white/40 text-xs">Version 1.0.0</p>
      </motion.div>
    </div>
  );
};
