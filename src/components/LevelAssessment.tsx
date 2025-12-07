import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Check, X, Loader2 } from 'lucide-react';
import { vocabulary } from '../data/vocabulary';
import { kanjiData } from '../data/kanji';
import { useStore } from '../store/useStore';

interface Question {
  id: number;
  type: 'word_meaning' | 'kanji_reading' | 'sentence_translation' | 'listening';
  question: string;
  options: string[];
  correctAnswer: string;
  level: number;
}

const generateQuestions = (): Question[] => {
  const questions: Question[] = [];

  // Level 1-2 questions (Easy)
  const easyWords = vocabulary.filter(w => w.level <= 2).slice(0, 20);
  easyWords.slice(0, 5).forEach((word, i) => {
    questions.push({
      id: i + 1,
      type: 'word_meaning',
      question: `What does "${word.japanese}" mean?`,
      options: generateOptions(word.english, vocabulary.map(v => v.english)),
      correctAnswer: word.english,
      level: 1
    });
  });

  // Level 2-3 questions (Medium)
  const mediumWords = vocabulary.filter(w => w.level >= 2 && w.level <= 3);
  mediumWords.slice(0, 5).forEach((word, i) => {
    questions.push({
      id: i + 6,
      type: 'word_meaning',
      question: `What does "${word.japanese}" (${word.hiragana}) mean?`,
      options: generateOptions(word.english, vocabulary.map(v => v.english)),
      correctAnswer: word.english,
      level: 2
    });
  });

  // Kanji questions
  const easyKanji = kanjiData.filter(k => k.level <= 2).slice(0, 10);
  easyKanji.slice(0, 5).forEach((kanji, i) => {
    questions.push({
      id: i + 11,
      type: 'kanji_reading',
      question: `What is the meaning of "${kanji.character}"?`,
      options: generateOptions(kanji.meaning[0], kanjiData.map(k => k.meaning[0])),
      correctAnswer: kanji.meaning[0],
      level: 2
    });
  });

  // Level 3-4 questions (Hard)
  const hardWords = vocabulary.filter(w => w.level >= 3 && w.level <= 4);
  hardWords.slice(0, 5).forEach((word, i) => {
    questions.push({
      id: i + 16,
      type: 'sentence_translation',
      question: `What does "${word.exampleSentence}" mean?`,
      options: generateOptions(word.exampleTranslation, vocabulary.filter(v => v.level >= 3).map(v => v.exampleTranslation)),
      correctAnswer: word.exampleTranslation,
      level: 3
    });
  });

  return questions.sort(() => Math.random() - 0.5).slice(0, 15);
};

const generateOptions = (correct: string, pool: string[]): string[] => {
  const options = [correct];
  const filtered = pool.filter(o => o !== correct && o.length > 0);
  while (options.length < 4 && filtered.length > 0) {
    const idx = Math.floor(Math.random() * filtered.length);
    if (!options.includes(filtered[idx])) {
      options.push(filtered[idx]);
    }
    filtered.splice(idx, 1);
  }
  return options.sort(() => Math.random() - 0.5);
};

interface LevelAssessmentProps {
  onComplete: (level: number) => void;
}

export const LevelAssessment: React.FC<LevelAssessmentProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<'intro' | 'quiz' | 'calculating' | 'result'>('intro');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{ questionId: number; correct: boolean; level: number }[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [calculatedLevel, setCalculatedLevel] = useState(1);
  const { setLevel, updateStreak } = useStore();

  useEffect(() => {
    if (stage === 'quiz' && questions.length === 0) {
      setQuestions(generateQuestions());
    }
  }, [stage]);

  const handleAnswer = (answer: string) => {
    if (showFeedback) return;

    setSelectedAnswer(answer);
    setShowFeedback(true);

    const currentQuestion = questions[currentIndex];
    const isCorrect = answer === currentQuestion.correctAnswer;

    setAnswers([...answers, {
      questionId: currentQuestion.id,
      correct: isCorrect,
      level: currentQuestion.level
    }]);

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        setStage('calculating');
        calculateLevel();
      }
    }, 1500);
  };

  const calculateLevel = () => {
    setTimeout(() => {
      const correctByLevel: Record<number, { correct: number; total: number }> = {};

      answers.forEach(a => {
        if (!correctByLevel[a.level]) {
          correctByLevel[a.level] = { correct: 0, total: 0 };
        }
        correctByLevel[a.level].total++;
        if (a.correct) correctByLevel[a.level].correct++;
      });

      // Calculate level based on performance
      let level = 1;
      Object.entries(correctByLevel).forEach(([lvl, stats]) => {
        const accuracy = stats.correct / stats.total;
        if (accuracy >= 0.7) {
          level = Math.max(level, parseInt(lvl) + 1);
        } else if (accuracy >= 0.5) {
          level = Math.max(level, parseInt(lvl));
        }
      });

      // If they got most wrong, they're absolute beginner
      const totalCorrect = answers.filter(a => a.correct).length;
      if (totalCorrect < 3) {
        level = 1;
      }

      setCalculatedLevel(Math.min(level, 5)); // Cap at level 5 for assessment
      setStage('result');
    }, 2000);
  };

  const handleComplete = () => {
    setLevel(calculatedLevel);
    updateStreak();
    onComplete(calculatedLevel);
  };

  const skipAssessment = () => {
    setLevel(1);
    updateStreak();
    onComplete(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
      <AnimatePresence mode="wait">
        {stage === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 max-w-md w-full text-center text-white"
          >
            <div className="text-6xl mb-4">🎌</div>
            <h1 className="text-3xl font-bold mb-2">Level Assessment</h1>
            <p className="text-lg text-white/80 mb-6">
              Let's find out your current Japanese level! Answer a few questions and we'll customize your learning path.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => setStage('quiz')}
                className="w-full py-4 bg-gradient-to-r from-pink-500 to-orange-500 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:from-pink-600 hover:to-orange-600 transition-all"
              >
                Start Assessment
                <ChevronRight className="w-5 h-5" />
              </button>
              <button
                onClick={skipAssessment}
                className="w-full py-3 bg-white/10 rounded-xl font-medium hover:bg-white/20 transition-all"
              >
                I'm a complete beginner
              </button>
            </div>
          </motion.div>
        )}

        {stage === 'quiz' && questions.length > 0 && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 max-w-lg w-full text-white"
          >
            {/* Progress bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Question {currentIndex + 1}/{questions.length}</span>
                <span>{Math.round((currentIndex / questions.length) * 100)}%</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-green-400 to-emerald-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="mb-6">
              <p className="text-sm text-white/60 mb-2">
                {questions[currentIndex].type === 'word_meaning' && 'Word Meaning'}
                {questions[currentIndex].type === 'kanji_reading' && 'Kanji Meaning'}
                {questions[currentIndex].type === 'sentence_translation' && 'Translation'}
              </p>
              <h2 className="text-2xl font-bold">{questions[currentIndex].question}</h2>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {questions[currentIndex].options.map((option, idx) => {
                const isSelected = selectedAnswer === option;
                const isCorrect = option === questions[currentIndex].correctAnswer;
                const showCorrect = showFeedback && isCorrect;
                const showWrong = showFeedback && isSelected && !isCorrect;

                return (
                  <motion.button
                    key={idx}
                    onClick={() => handleAnswer(option)}
                    disabled={showFeedback}
                    whileHover={!showFeedback ? { scale: 1.02 } : {}}
                    whileTap={!showFeedback ? { scale: 0.98 } : {}}
                    className={`w-full p-4 rounded-xl text-left font-medium transition-all flex items-center justify-between ${
                      showCorrect
                        ? 'bg-green-500/30 border-2 border-green-400'
                        : showWrong
                        ? 'bg-red-500/30 border-2 border-red-400'
                        : isSelected
                        ? 'bg-white/30 border-2 border-white'
                        : 'bg-white/10 border-2 border-transparent hover:bg-white/20'
                    }`}
                  >
                    <span>{option}</span>
                    {showCorrect && <Check className="w-5 h-5 text-green-400" />}
                    {showWrong && <X className="w-5 h-5 text-red-400" />}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {stage === 'calculating' && (
          <motion.div
            key="calculating"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center text-white"
          >
            <Loader2 className="w-16 h-16 animate-spin mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Analyzing your results...</h2>
            <p className="text-white/60">Finding the perfect starting point for you</p>
          </motion.div>
        )}

        {stage === 'result' && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 max-w-md w-full text-center text-white"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="text-7xl mb-4"
            >
              {calculatedLevel === 1 && '🌱'}
              {calculatedLevel === 2 && '🌿'}
              {calculatedLevel === 3 && '🌳'}
              {calculatedLevel === 4 && '🎋'}
              {calculatedLevel >= 5 && '🗻'}
            </motion.div>

            <h1 className="text-3xl font-bold mb-2">
              {calculatedLevel === 1 && 'Beginner'}
              {calculatedLevel === 2 && 'Elementary'}
              {calculatedLevel === 3 && 'Intermediate'}
              {calculatedLevel === 4 && 'Upper Intermediate'}
              {calculatedLevel >= 5 && 'Advanced'}
            </h1>

            <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-4">
              Level {calculatedLevel}
            </p>

            <p className="text-white/70 mb-6">
              {calculatedLevel === 1 && "Perfect! We'll start from the very beginning with essential vocabulary and basic kanji."}
              {calculatedLevel === 2 && "Nice! You know some basics. We'll build on that foundation with more vocabulary and grammar."}
              {calculatedLevel === 3 && "Impressive! You have a solid base. Time to expand with more complex patterns and kanji."}
              {calculatedLevel === 4 && "すごい！You're quite advanced. We'll focus on nuance, slang, and native-level expressions."}
              {calculatedLevel >= 5 && "Wow! 日本語上手！Let's polish your skills with advanced content and real-world Japanese."}
            </p>

            <div className="text-sm text-white/60 mb-6">
              Score: {answers.filter(a => a.correct).length}/{answers.length} correct
            </div>

            <button
              onClick={handleComplete}
              className="w-full py-4 bg-gradient-to-r from-pink-500 to-orange-500 rounded-xl font-bold text-lg hover:from-pink-600 hover:to-orange-600 transition-all"
            >
              Start Learning!
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
