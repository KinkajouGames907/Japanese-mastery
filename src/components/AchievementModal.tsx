import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';

export const AchievementModal: React.FC = () => {
  const { showAchievement, currentAchievement, dismissAchievement } = useStore();

  return (
    <AnimatePresence>
      {showAchievement && currentAchievement && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={dismissAchievement}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 50 }}
            transition={{ type: 'spring', damping: 15 }}
            className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-3xl p-8 text-center max-w-sm w-full"
            onClick={e => e.stopPropagation()}
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-white/80 text-sm font-medium mb-2"
            >
              Achievement Unlocked!
            </motion.p>

            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="text-8xl mb-4"
            >
              {currentAchievement.icon}
            </motion.div>

            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold text-white mb-1"
            >
              {currentAchievement.title}
            </motion.h2>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="text-white/80 text-lg mb-2"
            >
              {currentAchievement.titleJp}
            </motion.p>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-white/70 mb-4"
            >
              {currentAchievement.description}
            </motion.p>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
              className="bg-white/20 rounded-xl py-2 px-4 inline-block mb-6"
            >
              <span className="text-2xl font-bold text-white">+{currentAchievement.xpReward} XP</span>
            </motion.div>

            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              onClick={dismissAchievement}
              className="w-full py-4 bg-white/20 hover:bg-white/30 rounded-xl font-bold text-white transition-all"
            >
              Awesome!
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
