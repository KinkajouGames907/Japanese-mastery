import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Volume2, RefreshCw, Check, X, Shuffle } from 'lucide-react';
import { vocabulary, getRandomWords } from '../data/vocabulary';
import { useStore } from '../store/useStore';
import { Word } from '../types';

interface VocabularyPracticeProps {
  onBack: () => void;
}

type PracticeMode = 'flashcards' | 'quiz' | 'typing';

export const VocabularyPractice: React.FC<VocabularyPracticeProps> = ({ onBack }) => {
  const { progress, addXp, learnWord, updateStreak } = useStore();
  const [mode, setMode] = useState<PracticeMode | null>(null);
  const [words, setWords] = useState<Word[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [typedAnswer, setTypedAnswer] = useState('');
  const [sessionComplete, setSessionComplete] = useState(false);

  const startPractice = (selectedMode: PracticeMode) => {
    setMode(selectedMode);
    const practiceWords = getRandomWords(10, progress.level + 1);
    setWords(practiceWords);
    setCurrentIndex(0);
    setCorrectCount(0);
    setShowAnswer(false);
    setSessionComplete(false);
  };

  const currentWord = words[currentIndex];

  const handleFlashcardNext = (known: boolean) => {
    if (known) {
      setCorrectCount(correctCount + 1);
      learnWord(currentWord.id);
    }

    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    } else {
      finishSession();
    }
  };

  const handleQuizAnswer = (answer: string) => {
    if (showFeedback) return;

    setSelectedAnswer(answer);
    setShowFeedback(true);

    if (answer === currentWord.english) {
      setCorrectCount(correctCount + 1);
      learnWord(currentWord.id);
    }

    setTimeout(() => {
      if (currentIndex < words.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        finishSession();
      }
    }, 1500);
  };

  const handleTypingSubmit = () => {
    const correct = typedAnswer.toLowerCase().trim() === currentWord.hiragana ||
      typedAnswer.toLowerCase().trim() === currentWord.romaji;

    setShowFeedback(true);

    if (correct) {
      setCorrectCount(correctCount + 1);
      learnWord(currentWord.id);
    }

    setTimeout(() => {
      if (currentIndex < words.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setTypedAnswer('');
        setShowFeedback(false);
      } else {
        finishSession();
      }
    }, 1500);
  };

  const finishSession = () => {
    const xpEarned = correctCount * 5;
    addXp(xpEarned);
    updateStreak();
    setSessionComplete(true);
  };

  const generateOptions = (correct: Word): string[] => {
    const options = [correct.english];
    const others = vocabulary.filter(w => w.id !== correct.id && w.level <= progress.level + 2);
    while (options.length < 4 && others.length > 0) {
      const idx = Math.floor(Math.random() * others.length);
      if (!options.includes(others[idx].english)) {
        options.push(others[idx].english);
      }
      others.splice(idx, 1);
    }
    return options.sort(() => Math.random() - 0.5);
  };

  if (!mode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={onBack}
            className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white">Vocabulary Practice</h1>
            <p className="text-white/60 text-sm">{progress.wordsLearned.length} words learned</p>
          </div>
        </div>

        {/* Mode Selection */}
        <div className="space-y-4">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => startPractice('flashcards')}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-left"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-xl">
                <RefreshCw className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Flashcards</h3>
                <p className="text-white/70">Flip through cards to review</p>
              </div>
            </div>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onClick={() => startPractice('quiz')}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-left"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-xl">
                <Check className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Multiple Choice</h3>
                <p className="text-white/70">Pick the correct meaning</p>
              </div>
            </div>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => startPractice('typing')}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-left"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-xl">
                <span className="text-2xl">あ</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Typing Practice</h3>
                <p className="text-white/70">Type the reading</p>
              </div>
            </div>
          </motion.button>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-xl p-4">
            <p className="text-white/60 text-sm">Words Learned</p>
            <p className="text-3xl font-bold text-white">{progress.wordsLearned.length}</p>
          </div>
          <div className="bg-white/10 rounded-xl p-4">
            <p className="text-white/60 text-sm">Available</p>
            <p className="text-3xl font-bold text-white">
              {vocabulary.filter(w => w.level <= progress.level + 1).length}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (sessionComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="text-7xl mb-4"
          >
            {correctCount === words.length ? '🎉' : correctCount >= words.length / 2 ? '👍' : '💪'}
          </motion.div>
          <h2 className="text-3xl font-bold text-white mb-2">Session Complete!</h2>
          <p className="text-white/60 mb-6">
            {correctCount}/{words.length} correct
          </p>

          <div className="bg-white/10 rounded-xl p-4 mb-6 inline-block">
            <p className="text-yellow-400 text-2xl font-bold">+{correctCount * 5} XP</p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setMode(null)}
              className="px-6 py-3 bg-white/10 rounded-xl text-white hover:bg-white/20"
            >
              Back
            </button>
            <button
              onClick={() => startPractice(mode)}
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-500 rounded-xl text-white font-medium"
            >
              Practice Again
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setMode(null)}
          className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <span className="text-white/60">
          {currentIndex + 1} / {words.length}
        </span>
        <div className="text-green-400 font-medium">{correctCount} correct</div>
      </div>

      {/* Progress */}
      <div className="h-2 bg-white/20 rounded-full overflow-hidden mb-8">
        <motion.div
          className="h-full bg-gradient-to-r from-pink-500 to-orange-500"
          animate={{ width: `${((currentIndex + 1) / words.length) * 100}%` }}
        />
      </div>

      {/* Flashcard Mode */}
      {mode === 'flashcards' && currentWord && (
        <div className="flex flex-col items-center">
          <motion.div
            key={currentIndex}
            initial={{ rotateY: 0 }}
            animate={{ rotateY: showAnswer ? 180 : 0 }}
            className="w-full max-w-sm aspect-[3/4] cursor-pointer perspective-1000"
            onClick={() => setShowAnswer(!showAnswer)}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="relative w-full h-full">
              {/* Front */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 flex flex-col items-center justify-center"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <p className="text-5xl font-bold text-white mb-4">{currentWord.japanese}</p>
                <p className="text-xl text-white/70">{currentWord.hiragana}</p>
                <p className="text-white/50 mt-4">Tap to reveal</p>
              </div>

              {/* Back */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-pink-500 to-orange-500 rounded-3xl p-6 flex flex-col items-center justify-center"
                style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
              >
                <p className="text-3xl font-bold text-white mb-4">{currentWord.english}</p>
                {currentWord.slangNote && (
                  <p className="text-white/80 text-center text-sm mb-4">💡 {currentWord.slangNote}</p>
                )}
                <div className="text-white/70 text-center text-sm">
                  <p>{currentWord.exampleSentence}</p>
                  <p className="text-white/50">{currentWord.exampleTranslation}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {showAnswer && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-4 mt-8"
            >
              <button
                onClick={() => handleFlashcardNext(false)}
                className="px-8 py-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 font-medium hover:bg-red-500/30"
              >
                <X className="w-6 h-6" />
              </button>
              <button
                onClick={() => handleFlashcardNext(true)}
                className="px-8 py-4 bg-green-500/20 border border-green-500/30 rounded-xl text-green-400 font-medium hover:bg-green-500/30"
              >
                <Check className="w-6 h-6" />
              </button>
            </motion.div>
          )}
        </div>
      )}

      {/* Quiz Mode */}
      {mode === 'quiz' && currentWord && (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <p className="text-5xl font-bold text-white mb-2">{currentWord.japanese}</p>
            <p className="text-xl text-white/60">{currentWord.hiragana}</p>
          </div>

          <div className="space-y-3">
            {generateOptions(currentWord).map((option, idx) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = option === currentWord.english;
              const showCorrect = showFeedback && isCorrect;
              const showWrong = showFeedback && isSelected && !isCorrect;

              return (
                <motion.button
                  key={idx}
                  onClick={() => handleQuizAnswer(option)}
                  disabled={showFeedback}
                  whileHover={!showFeedback ? { scale: 1.02 } : {}}
                  whileTap={!showFeedback ? { scale: 0.98 } : {}}
                  className={`w-full p-4 rounded-xl text-left font-medium transition-all flex items-center justify-between ${showCorrect
                      ? 'bg-green-500/30 border-2 border-green-400'
                      : showWrong
                        ? 'bg-red-500/30 border-2 border-red-400'
                        : 'bg-white/10 border-2 border-transparent hover:bg-white/20'
                    }`}
                >
                  <span className="text-white">{option}</span>
                  {showCorrect && <Check className="w-5 h-5 text-green-400" />}
                  {showWrong && <X className="w-5 h-5 text-red-400" />}
                </motion.button>
              );
            })}
          </div>
        </div>
      )}

      {/* Typing Mode */}
      {mode === 'typing' && currentWord && (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <p className="text-3xl font-bold text-white mb-2">{currentWord.english}</p>
            {currentWord.slangNote && (
              <p className="text-yellow-400/70 text-sm">💡 {currentWord.slangNote}</p>
            )}
          </div>

          <div className="space-y-4">
            <input
              type="text"
              value={typedAnswer}
              onChange={(e) => setTypedAnswer(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !showFeedback && handleTypingSubmit()}
              placeholder="Type in hiragana or romaji..."
              disabled={showFeedback}
              className={`w-full p-4 rounded-xl text-center text-xl bg-white/10 border-2 text-white placeholder-white/40 focus:outline-none ${showFeedback
                  ? typedAnswer.toLowerCase().trim() === currentWord.hiragana || typedAnswer.toLowerCase().trim() === currentWord.romaji
                    ? 'border-green-400'
                    : 'border-red-400'
                  : 'border-white/20 focus:border-pink-400'
                }`}
            />

            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <p className="text-white/60">Answer:</p>
                <p className="text-2xl font-bold text-white">{currentWord.japanese}</p>
                <p className="text-white/60">{currentWord.hiragana}</p>
              </motion.div>
            )}

            {!showFeedback && (
              <button
                onClick={handleTypingSubmit}
                disabled={!typedAnswer.trim()}
                className="w-full py-4 bg-gradient-to-r from-pink-500 to-orange-500 rounded-xl font-bold text-white disabled:opacity-50"
              >
                Check
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
