import { Achievement, UserProgress } from '../types';

export const achievements: Achievement[] = [
  // Streak achievements
  {
    id: 'streak_3',
    title: '3 Day Streak',
    titleJp: '三日坊主じゃない！',
    description: 'Study for 3 days in a row',
    icon: '🔥',
    xpReward: 50,
    condition: (p: UserProgress) => p.streak >= 3
  },
  {
    id: 'streak_7',
    title: 'One Week Warrior',
    titleJp: '一週間の戦士',
    description: 'Study for 7 days in a row',
    icon: '⚔️',
    xpReward: 100,
    condition: (p: UserProgress) => p.streak >= 7
  },
  {
    id: 'streak_30',
    title: 'Monthly Master',
    titleJp: '月間マスター',
    description: 'Study for 30 days in a row',
    icon: '👑',
    xpReward: 500,
    condition: (p: UserProgress) => p.streak >= 30
  },
  {
    id: 'streak_100',
    title: 'Century Student',
    titleJp: '百日の努力',
    description: 'Study for 100 days in a row',
    icon: '💯',
    xpReward: 2000,
    condition: (p: UserProgress) => p.streak >= 100
  },
  {
    id: 'streak_365',
    title: 'Year of Japanese',
    titleJp: '一年の旅',
    description: 'Study for 365 days in a row',
    icon: '🎌',
    xpReward: 10000,
    condition: (p: UserProgress) => p.streak >= 365
  },

  // Words learned
  {
    id: 'words_10',
    title: 'Word Collector',
    titleJp: '言葉コレクター',
    description: 'Learn 10 words',
    icon: '📝',
    xpReward: 25,
    condition: (p: UserProgress) => p.wordsLearned.length >= 10
  },
  {
    id: 'words_50',
    title: 'Vocabulary Builder',
    titleJp: '語彙力アップ',
    description: 'Learn 50 words',
    icon: '📚',
    xpReward: 100,
    condition: (p: UserProgress) => p.wordsLearned.length >= 50
  },
  {
    id: 'words_100',
    title: 'Century of Words',
    titleJp: '百語達成',
    description: 'Learn 100 words',
    icon: '💬',
    xpReward: 250,
    condition: (p: UserProgress) => p.wordsLearned.length >= 100
  },
  {
    id: 'words_500',
    title: 'Vocabulary Monster',
    titleJp: '語彙モンスター',
    description: 'Learn 500 words',
    icon: '🐉',
    xpReward: 1000,
    condition: (p: UserProgress) => p.wordsLearned.length >= 500
  },
  {
    id: 'words_1000',
    title: 'Word Wizard',
    titleJp: '言葉の魔術師',
    description: 'Learn 1000 words',
    icon: '🧙',
    xpReward: 3000,
    condition: (p: UserProgress) => p.wordsLearned.length >= 1000
  },
  {
    id: 'words_2000',
    title: 'Vocabulary King',
    titleJp: '語彙の王様',
    description: 'Learn all 2000 words',
    icon: '👸',
    xpReward: 10000,
    condition: (p: UserProgress) => p.wordsLearned.length >= 2000
  },

  // Kanji achievements
  {
    id: 'kanji_10',
    title: 'Kanji Beginner',
    titleJp: '漢字入門',
    description: 'Learn 10 kanji',
    icon: '🔤',
    xpReward: 50,
    condition: (p: UserProgress) => p.kanjiLearned.length >= 10
  },
  {
    id: 'kanji_50',
    title: 'Kanji Student',
    titleJp: '漢字生徒',
    description: 'Learn 50 kanji',
    icon: '📖',
    xpReward: 200,
    condition: (p: UserProgress) => p.kanjiLearned.length >= 50
  },
  {
    id: 'kanji_100',
    title: 'Kanji Century',
    titleJp: '百字達成',
    description: 'Learn 100 kanji',
    icon: '🎓',
    xpReward: 500,
    condition: (p: UserProgress) => p.kanjiLearned.length >= 100
  },
  {
    id: 'kanji_500',
    title: 'Kanji Scholar',
    titleJp: '漢字学者',
    description: 'Learn 500 kanji',
    icon: '📜',
    xpReward: 2000,
    condition: (p: UserProgress) => p.kanjiLearned.length >= 500
  },
  {
    id: 'kanji_1000',
    title: 'Kanji Master',
    titleJp: '漢字マスター',
    description: 'Learn 1000 kanji',
    icon: '🏯',
    xpReward: 5000,
    condition: (p: UserProgress) => p.kanjiLearned.length >= 1000
  },

  // Lesson achievements
  {
    id: 'lessons_1',
    title: 'First Steps',
    titleJp: '第一歩',
    description: 'Complete your first lesson',
    icon: '👣',
    xpReward: 20,
    condition: (p: UserProgress) => p.lessonsCompleted.length >= 1
  },
  {
    id: 'lessons_5',
    title: 'Getting Started',
    titleJp: 'スタート',
    description: 'Complete 5 lessons',
    icon: '🚀',
    xpReward: 75,
    condition: (p: UserProgress) => p.lessonsCompleted.length >= 5
  },
  {
    id: 'lessons_10',
    title: 'Dedicated Learner',
    titleJp: '熱心な生徒',
    description: 'Complete 10 lessons',
    icon: '📱',
    xpReward: 150,
    condition: (p: UserProgress) => p.lessonsCompleted.length >= 10
  },
  {
    id: 'lessons_25',
    title: 'Committed Student',
    titleJp: '真剣な学生',
    description: 'Complete 25 lessons',
    icon: '🎯',
    xpReward: 400,
    condition: (p: UserProgress) => p.lessonsCompleted.length >= 25
  },

  // Level achievements
  {
    id: 'level_5',
    title: 'Level 5',
    titleJp: 'レベル5到達',
    description: 'Reach level 5',
    icon: '⭐',
    xpReward: 100,
    condition: (p: UserProgress) => p.level >= 5
  },
  {
    id: 'level_10',
    title: 'Double Digits',
    titleJp: '二桁レベル',
    description: 'Reach level 10',
    icon: '🌟',
    xpReward: 300,
    condition: (p: UserProgress) => p.level >= 10
  },
  {
    id: 'level_25',
    title: 'Quarter Century',
    titleJp: 'レベル25',
    description: 'Reach level 25',
    icon: '💫',
    xpReward: 750,
    condition: (p: UserProgress) => p.level >= 25
  },
  {
    id: 'level_50',
    title: 'Half Way Hero',
    titleJp: '半分ヒーロー',
    description: 'Reach level 50',
    icon: '🏆',
    xpReward: 2000,
    condition: (p: UserProgress) => p.level >= 50
  },

  // XP achievements
  {
    id: 'xp_1000',
    title: 'First Thousand',
    titleJp: '千XP達成',
    description: 'Earn 1000 XP total',
    icon: '💎',
    xpReward: 100,
    condition: (p: UserProgress) => p.totalXp >= 1000
  },
  {
    id: 'xp_10000',
    title: 'XP Master',
    titleJp: '一万XP達成',
    description: 'Earn 10,000 XP total',
    icon: '💰',
    xpReward: 500,
    condition: (p: UserProgress) => p.totalXp >= 10000
  },
  {
    id: 'xp_100000',
    title: 'XP Legend',
    titleJp: '十万XP達成',
    description: 'Earn 100,000 XP total',
    icon: '🏅',
    xpReward: 2000,
    condition: (p: UserProgress) => p.totalXp >= 100000
  },

  // Special achievements
  {
    id: 'perfect_quiz',
    title: 'Perfect Score',
    titleJp: '満点',
    description: 'Get 100% on any quiz',
    icon: '✨',
    xpReward: 50,
    condition: (p: UserProgress) => p.quizScores.some(s => s.score === 100)
  },
  {
    id: 'night_owl',
    title: 'Night Owl',
    titleJp: '夜更かし',
    description: 'Study after midnight',
    icon: '🦉',
    xpReward: 25,
    condition: () => {
      const hour = new Date().getHours();
      return hour >= 0 && hour < 5;
    }
  },
  {
    id: 'early_bird',
    title: 'Early Bird',
    titleJp: '早起き',
    description: 'Study before 7am',
    icon: '🐦',
    xpReward: 25,
    condition: () => {
      const hour = new Date().getHours();
      return hour >= 5 && hour < 7;
    }
  }
];

// Check for new achievements
export const checkAchievements = (progress: UserProgress): Achievement[] => {
  const newAchievements: Achievement[] = [];

  achievements.forEach(achievement => {
    if (!progress.achievements.includes(achievement.id) && achievement.condition(progress)) {
      newAchievements.push(achievement);
    }
  });

  return newAchievements;
};

// Get unlocked achievements
export const getUnlockedAchievements = (progress: UserProgress): Achievement[] => {
  return achievements.filter(a => progress.achievements.includes(a.id));
};

// Get locked achievements
export const getLockedAchievements = (progress: UserProgress): Achievement[] => {
  return achievements.filter(a => !progress.achievements.includes(a.id));
};
