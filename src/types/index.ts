export interface Word {
  id: number;
  japanese: string;
  hiragana: string;
  romaji: string;
  english: string;
  level: number; // 1-10 difficulty
  category: string;
  exampleSentence: string;
  exampleTranslation: string;
  casualForm?: string;
  slangNote?: string;
  frequency: number; // 1-2000 most common
}

export interface Kanji {
  id: number;
  character: string;
  onyomi: string[];
  kunyomi: string[];
  meaning: string[];
  strokeCount: number;
  level: number;
  jlpt: string;
  examples: { word: string; reading: string; meaning: string }[];
  radicals: string[];
  mnemonics: string;
}

export interface SlangPhrase {
  id: number;
  phrase: string;
  reading: string;
  meaning: string;
  usage: string;
  formality: 'casual' | 'slang' | 'internet' | 'youth';
  example: string;
  exampleTranslation: string;
  warning?: string;
}

export interface GrammarPoint {
  id: number;
  pattern: string;
  meaning: string;
  formalForm: string;
  casualForm: string;
  level: number;
  examples: { japanese: string; english: string; casual: string }[];
  notes: string;
  realLifeTip: string;
}

export interface Lesson {
  id: number;
  title: string;
  titleJp: string;
  description: string;
  type: 'vocabulary' | 'kanji' | 'grammar' | 'slang' | 'conversation' | 'culture';
  level: number;
  content: LessonContent[];
  quiz: QuizQuestion[];
  xpReward: number;
}

export interface LessonContent {
  type: 'text' | 'vocabulary' | 'kanji' | 'grammar' | 'dialogue' | 'tip';
  data: any;
}

export interface QuizQuestion {
  id: number;
  type: 'multiple_choice' | 'typing' | 'listening' | 'matching' | 'fill_blank';
  question: string;
  questionJp?: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  points: number;
}

export interface UserProgress {
  oderId: string;
  level: number;
  xp: number;
  totalXp: number;
  streak: number;
  longestStreak: number;
  lastStudyDate: string;
  studyDates: string[];
  wordsLearned: number[];
  kanjiLearned: number[];
  lessonsCompleted: number[];
  quizScores: { lessonId: number; score: number; date: string }[];
  achievements: string[];
  dailyGoal: number;
  dailyProgress: number;
  reviewQueue: ReviewItem[];
  settings: UserSettings;
}

export interface ReviewItem {
  type: 'word' | 'kanji' | 'grammar';
  id: number;
  nextReview: string;
  interval: number;
  easeFactor: number;
  repetitions: number;
}

export interface UserSettings {
  dailyGoal: number;
  notifications: boolean;
  darkMode: boolean;
  soundEffects: boolean;
  preferRomaji: boolean;
  showFurigana: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  titleJp: string;
  description: string;
  icon: string;
  xpReward: number;
  condition: (progress: UserProgress) => boolean;
}

export interface DailyChallenge {
  id: string;
  date: string;
  type: 'vocabulary' | 'kanji' | 'translation' | 'listening';
  questions: QuizQuestion[];
  reward: number;
  completed: boolean;
}
