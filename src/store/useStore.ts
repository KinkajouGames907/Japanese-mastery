import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProgress, ReviewItem, Achievement } from '../types';
import { checkAchievements } from '../data/achievements';
import { format, differenceInDays, isToday, isYesterday } from 'date-fns';

interface AppState {
  // User Progress
  progress: UserProgress;

  // UI State
  showLevelUp: boolean;
  newAchievements: Achievement[];
  showAchievement: boolean;
  currentAchievement: Achievement | null;

  // Actions
  initProgress: () => void;
  addXp: (amount: number) => void;
  completeLesson: (lessonId: number, quizScore: number) => void;
  learnWord: (wordId: number) => void;
  learnKanji: (kanjiId: number) => void;
  setLevel: (level: number) => void;
  updateStreak: () => void;
  addToReviewQueue: (item: ReviewItem) => void;
  updateReviewItem: (item: ReviewItem) => void;
  removeFromReviewQueue: (type: string, id: number) => void;
  setDailyGoal: (goal: number) => void;
  addDailyProgress: (amount: number) => void;
  resetDailyProgress: () => void;
  unlockAchievement: (achievementId: string) => void;
  dismissLevelUp: () => void;
  dismissAchievement: () => void;
  checkAndAwardAchievements: () => void;
  updateSettings: (settings: Partial<UserProgress['settings']>) => void;
}

const XP_PER_LEVEL = 100;

const initialProgress: UserProgress = {
  oderId: '',
  level: 1,
  xp: 0,
  totalXp: 0,
  streak: 0,
  longestStreak: 0,
  lastStudyDate: '',
  studyDates: [],
  wordsLearned: [],
  kanjiLearned: [],
  lessonsCompleted: [],
  quizScores: [],
  achievements: [],
  dailyGoal: 50,
  dailyProgress: 0,
  reviewQueue: [],
  settings: {
    dailyGoal: 50,
    notifications: true,
    darkMode: false,
    soundEffects: true,
    preferRomaji: false,
    showFurigana: true
  }
};

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      progress: initialProgress,
      showLevelUp: false,
      newAchievements: [],
      showAchievement: false,
      currentAchievement: null,

      initProgress: () => {
        const today = format(new Date(), 'yyyy-MM-dd');
        const { progress } = get();

        if (progress.lastStudyDate !== today) {
          // Check if we need to reset daily progress
          set(state => ({
            progress: {
              ...state.progress,
              dailyProgress: 0
            }
          }));
        }
      },

      addXp: (amount: number) => {
        set(state => {
          const newXp = state.progress.xp + amount;
          const newTotalXp = state.progress.totalXp + amount;
          let newLevel = state.progress.level;
          let remainingXp = newXp;
          let leveledUp = false;

          // Calculate new level
          while (remainingXp >= XP_PER_LEVEL * newLevel) {
            remainingXp -= XP_PER_LEVEL * newLevel;
            newLevel++;
            leveledUp = true;
          }

          return {
            progress: {
              ...state.progress,
              xp: remainingXp,
              totalXp: newTotalXp,
              level: newLevel,
              dailyProgress: state.progress.dailyProgress + amount
            },
            showLevelUp: leveledUp
          };
        });

        // Check for achievements after XP update
        get().checkAndAwardAchievements();
      },

      completeLesson: (lessonId: number, quizScore: number) => {
        set(state => {
          const newLessonsCompleted = state.progress.lessonsCompleted.includes(lessonId)
            ? state.progress.lessonsCompleted
            : [...state.progress.lessonsCompleted, lessonId];

          return {
            progress: {
              ...state.progress,
              lessonsCompleted: newLessonsCompleted,
              quizScores: [
                ...state.progress.quizScores,
                { lessonId, score: quizScore, date: format(new Date(), 'yyyy-MM-dd') }
              ]
            }
          };
        });

        get().updateStreak();
        get().checkAndAwardAchievements();
      },

      learnWord: (wordId: number) => {
        set(state => {
          if (state.progress.wordsLearned.includes(wordId)) {
            return state;
          }
          return {
            progress: {
              ...state.progress,
              wordsLearned: [...state.progress.wordsLearned, wordId]
            }
          };
        });
        get().checkAndAwardAchievements();
      },

      learnKanji: (kanjiId: number) => {
        set(state => {
          if (state.progress.kanjiLearned.includes(kanjiId)) {
            return state;
          }
          return {
            progress: {
              ...state.progress,
              kanjiLearned: [...state.progress.kanjiLearned, kanjiId]
            }
          };
        });
        get().checkAndAwardAchievements();
      },

      setLevel: (level: number) => {
        set(state => ({
          progress: {
            ...state.progress,
            level
          }
        }));
      },

      updateStreak: () => {
        const today = format(new Date(), 'yyyy-MM-dd');

        set(state => {
          const lastDate = state.progress.lastStudyDate;
          let newStreak = state.progress.streak;

          if (!lastDate) {
            // First time studying
            newStreak = 1;
          } else if (lastDate === today) {
            // Already studied today
            return state;
          } else {
            const lastStudy = new Date(lastDate);
            if (isYesterday(lastStudy)) {
              // Studied yesterday - continue streak
              newStreak = state.progress.streak + 1;
            } else if (!isToday(lastStudy)) {
              // Missed days - reset streak
              newStreak = 1;
            }
          }

          const longestStreak = Math.max(newStreak, state.progress.longestStreak);

          return {
            progress: {
              ...state.progress,
              streak: newStreak,
              longestStreak,
              lastStudyDate: today,
              studyDates: state.progress.studyDates.includes(today)
                ? state.progress.studyDates
                : [...state.progress.studyDates, today]
            }
          };
        });

        get().checkAndAwardAchievements();
      },

      addToReviewQueue: (item: ReviewItem) => {
        set(state => ({
          progress: {
            ...state.progress,
            reviewQueue: [...state.progress.reviewQueue, item]
          }
        }));
      },

      updateReviewItem: (item: ReviewItem) => {
        set(state => ({
          progress: {
            ...state.progress,
            reviewQueue: state.progress.reviewQueue.map(r =>
              r.type === item.type && r.id === item.id ? item : r
            )
          }
        }));
      },

      removeFromReviewQueue: (type: string, id: number) => {
        set(state => ({
          progress: {
            ...state.progress,
            reviewQueue: state.progress.reviewQueue.filter(
              r => !(r.type === type && r.id === id)
            )
          }
        }));
      },

      setDailyGoal: (goal: number) => {
        set(state => ({
          progress: {
            ...state.progress,
            dailyGoal: goal,
            settings: {
              ...state.progress.settings,
              dailyGoal: goal
            }
          }
        }));
      },

      addDailyProgress: (amount: number) => {
        set(state => ({
          progress: {
            ...state.progress,
            dailyProgress: state.progress.dailyProgress + amount
          }
        }));
      },

      resetDailyProgress: () => {
        set(state => ({
          progress: {
            ...state.progress,
            dailyProgress: 0
          }
        }));
      },

      unlockAchievement: (achievementId: string) => {
        set(state => {
          if (state.progress.achievements.includes(achievementId)) {
            return state;
          }
          return {
            progress: {
              ...state.progress,
              achievements: [...state.progress.achievements, achievementId]
            }
          };
        });
      },

      dismissLevelUp: () => {
        set({ showLevelUp: false });
      },

      dismissAchievement: () => {
        set(state => {
          const remaining = state.newAchievements.slice(1);
          return {
            showAchievement: remaining.length > 0,
            currentAchievement: remaining[0] || null,
            newAchievements: remaining
          };
        });
      },

      checkAndAwardAchievements: () => {
        const { progress, unlockAchievement } = get();
        const newAchievements = checkAchievements(progress);

        if (newAchievements.length > 0) {
          newAchievements.forEach(achievement => {
            unlockAchievement(achievement.id);
          });

          // Add XP for achievements
          const totalXpReward = newAchievements.reduce((sum, a) => sum + a.xpReward, 0);
          if (totalXpReward > 0) {
            get().addXp(totalXpReward);
          }

          set({
            newAchievements,
            showAchievement: true,
            currentAchievement: newAchievements[0]
          });
        }
      },

      updateSettings: (settings: Partial<UserProgress['settings']>) => {
        set(state => ({
          progress: {
            ...state.progress,
            settings: {
              ...state.progress.settings,
              ...settings
            }
          }
        }));
      }
    }),
    {
      name: 'nihongo-mastery-storage',
      partialize: (state) => ({ progress: state.progress })
    }
  )
);
