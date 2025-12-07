import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight, BookOpen, Pencil, Check, X } from 'lucide-react';
import { kanjiData, getRandomKanji, getKanjiByLevel } from '../data/kanji';
import { useStore } from '../store/useStore';
import { Kanji } from '../types';

interface KanjiStudyProps {
  onBack: () => void;
}

type StudyMode = 'browse' | 'flashcards' | 'quiz';

export const KanjiStudy: React.FC<KanjiStudyProps> = ({ onBack }) => {
  const { progress, learnKanji, addXp, updateStreak } = useStore();
  const [mode, setMode] = useState<StudyMode | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [studyKanji, setStudyKanji] = useState<Kanji[]>([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);

  const startStudy = (studyMode: StudyMode, level?: number) => {
    setMode(studyMode);
    setSelectedLevel(level || null);
    setCurrentIndex(0);
    setCorrectCount(0);
    setShowDetails(false);
    setSessionComplete(false);

    if (studyMode === 'browse') {
      const kanji = level ? getKanjiByLevel(level) : kanjiData;
      setStudyKanji(kanji);
    } else {
      const kanji = getRandomKanji(10, progress.level + 1);
      setStudyKanji(kanji);
    }
  };

  const currentKanji = studyKanji[currentIndex];

  const handleFlashcardNext = (known: boolean) => {
    if (known) {
      setCorrectCount(correctCount + 1);
      learnKanji(currentKanji.id);
    }

    if (currentIndex < studyKanji.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowDetails(false);
    } else if (mode !== 'browse') {
      finishSession();
    }
  };

  const handleQuizAnswer = (answer: string) => {
    if (showFeedback) return;

    setSelectedAnswer(answer);
    setShowFeedback(true);

    const isCorrect = currentKanji.meaning.includes(answer);

    if (isCorrect) {
      setCorrectCount(correctCount + 1);
      learnKanji(currentKanji.id);
    }

    setTimeout(() => {
      if (currentIndex < studyKanji.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        finishSession();
      }
    }, 1500);
  };

  const finishSession = () => {
    const xpEarned = correctCount * 10;
    addXp(xpEarned);
    updateStreak();
    setSessionComplete(true);
  };

  const generateOptions = (kanji: Kanji): string[] => {
    const correct = kanji.meaning[0];
    const options = [correct];
    const others = kanjiData.filter(k => k.id !== kanji.id);
    while (options.length < 4 && others.length > 0) {
      const idx = Math.floor(Math.random() * others.length);
      const meaning = others[idx].meaning[0];
      if (!options.includes(meaning)) {
        options.push(meaning);
      }
      others.splice(idx, 1);
    }
    return options.sort(() => Math.random() - 0.5);
  };

  // Mode Selection
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
            <h1 className="text-2xl font-bold text-white">Kanji Study</h1>
            <p className="text-white/60 text-sm">{progress.kanjiLearned.length} kanji learned</p>
          </div>
        </div>

        {/* Study Modes */}
        <div className="space-y-4 mb-8">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => startStudy('browse')}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-left"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-xl">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Browse All</h3>
                <p className="text-white/70">Explore all {kanjiData.length} kanji</p>
              </div>
            </div>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onClick={() => startStudy('flashcards')}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-left"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-xl">
                <span className="text-3xl">漢</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Flashcards</h3>
                <p className="text-white/70">Review with flip cards</p>
              </div>
            </div>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => startStudy('quiz')}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-left"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-xl">
                <Pencil className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Quiz Mode</h3>
                <p className="text-white/70">Test your knowledge</p>
              </div>
            </div>
          </motion.button>
        </div>

        {/* By Level */}
        <h2 className="text-lg font-bold text-white mb-4">Study by Level</h2>
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4, 5].map(level => {
            const levelKanji = getKanjiByLevel(level);
            const learned = levelKanji.filter(k => progress.kanjiLearned.includes(k.id)).length;

            return (
              <button
                key={level}
                onClick={() => startStudy('browse', level)}
                className="bg-white/10 rounded-xl p-4 text-left hover:bg-white/20 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">
                    {level === 1 && '🌱'}
                    {level === 2 && '🌿'}
                    {level === 3 && '🌳'}
                    {level === 4 && '🎋'}
                    {level === 5 && '🗻'}
                  </span>
                  <span className="text-white/60 text-sm">Level {level}</span>
                </div>
                <p className="text-white font-medium">{levelKanji.length} kanji</p>
                <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-400"
                    style={{ width: `${(learned / levelKanji.length) * 100}%` }}
                  />
                </div>
                <p className="text-white/50 text-xs mt-1">{learned}/{levelKanji.length} learned</p>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Session Complete
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
            {correctCount === studyKanji.length ? '🎌' : correctCount >= studyKanji.length / 2 ? '👏' : '💪'}
          </motion.div>
          <h2 className="text-3xl font-bold text-white mb-2">Session Complete!</h2>
          <p className="text-white/60 mb-6">
            {correctCount}/{studyKanji.length} correct
          </p>

          <div className="bg-white/10 rounded-xl p-4 mb-6 inline-block">
            <p className="text-yellow-400 text-2xl font-bold">+{correctCount * 10} XP</p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setMode(null)}
              className="px-6 py-3 bg-white/10 rounded-xl text-white hover:bg-white/20"
            >
              Back
            </button>
            <button
              onClick={() => startStudy(mode)}
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-500 rounded-xl text-white font-medium"
            >
              Practice Again
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Browse Mode
  if (mode === 'browse' && currentKanji) {
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
            {currentIndex + 1} / {studyKanji.length}
          </span>
          <div className="w-10" />
        </div>

        {/* Kanji Card */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 mb-6"
        >
          {/* Character */}
          <div className="text-center mb-6">
            <div className="text-9xl font-bold text-white mb-2">{currentKanji.character}</div>
            <div className="flex justify-center gap-2">
              <span className="px-3 py-1 bg-white/10 rounded-full text-white/60 text-sm">
                {currentKanji.strokeCount} strokes
              </span>
              <span className="px-3 py-1 bg-purple-500/30 rounded-full text-purple-300 text-sm">
                {currentKanji.jlpt}
              </span>
            </div>
          </div>

          {/* Meanings */}
          <div className="mb-4">
            <p className="text-white/60 text-sm mb-1">Meanings</p>
            <p className="text-xl font-bold text-white">{currentKanji.meaning.join(', ')}</p>
          </div>

          {/* Readings */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-white/60 text-sm mb-1">On'yomi (Chinese)</p>
              <p className="text-pink-400 font-medium">
                {currentKanji.onyomi.length > 0 ? currentKanji.onyomi.join(', ') : '—'}
              </p>
            </div>
            <div>
              <p className="text-white/60 text-sm mb-1">Kun'yomi (Japanese)</p>
              <p className="text-green-400 font-medium">
                {currentKanji.kunyomi.length > 0 ? currentKanji.kunyomi.join(', ') : '—'}
              </p>
            </div>
          </div>

          {/* Mnemonic */}
          <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-xl p-4 mb-4">
            <p className="text-yellow-400 text-sm">💡 Memory Tip</p>
            <p className="text-white/90">{currentKanji.mnemonics}</p>
          </div>

          {/* Examples */}
          <div>
            <p className="text-white/60 text-sm mb-2">Examples</p>
            <div className="space-y-2">
              {currentKanji.examples.slice(0, 3).map((ex, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-white/5 rounded-lg p-3">
                  <span className="text-xl font-bold text-white">{ex.word}</span>
                  <span className="text-white/60">{ex.reading}</span>
                  <span className="text-white/80 ml-auto">{ex.meaning}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => currentIndex > 0 && setCurrentIndex(currentIndex - 1)}
            disabled={currentIndex === 0}
            className="p-4 bg-white/10 rounded-full disabled:opacity-30 hover:bg-white/20 transition-all"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={() => {
              learnKanji(currentKanji.id);
              if (currentIndex < studyKanji.length - 1) {
                setCurrentIndex(currentIndex + 1);
              }
            }}
            className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full text-white font-medium hover:from-green-600 hover:to-emerald-600 transition-all"
          >
            Mark as Learned
          </button>
          <button
            onClick={() => currentIndex < studyKanji.length - 1 && setCurrentIndex(currentIndex + 1)}
            disabled={currentIndex === studyKanji.length - 1}
            className="p-4 bg-white/10 rounded-full disabled:opacity-30 hover:bg-white/20 transition-all"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    );
  }

  // Flashcard Mode
  if (mode === 'flashcards' && currentKanji) {
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
            {currentIndex + 1} / {studyKanji.length}
          </span>
          <div className="text-green-400 font-medium">{correctCount} known</div>
        </div>

        {/* Progress */}
        <div className="h-2 bg-white/20 rounded-full overflow-hidden mb-8">
          <motion.div
            className="h-full bg-gradient-to-r from-pink-500 to-orange-500"
            animate={{ width: `${((currentIndex + 1) / studyKanji.length) * 100}%` }}
          />
        </div>

        {/* Flashcard */}
        <div className="flex flex-col items-center">
          <motion.div
            <motion.div
            key={currentIndex}
            initial={{ rotateY: 0 }}
            animate={{ rotateY: showDetails ? 180 : 0 }}
            onClick={() => setShowDetails(!showDetails)}
            className="w-full max-w-sm aspect-square cursor-pointer active:scale-95 transition-transform duration-200"
            style={{
              perspective: '1000px',
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Front */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex flex-col items-center justify-center backface-hidden"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden'
              }}
            >
              <span className="text-8xl font-bold text-white">{currentKanji.character}</span>
              <p className="text-white/60 mt-4">Tap to reveal</p>
            </div>

            {/* Back */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-pink-500 to-orange-500 rounded-3xl p-6 flex flex-col items-center justify-center backface-hidden"
              style={{
                transform: 'rotateY(180deg)',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden'
              }}
            >
              <p className="text-2xl font-bold text-white mb-4">{currentKanji.meaning.join(', ')}</p>
              <div className="grid grid-cols-2 gap-4 w-full text-center">
                <div>
                  <p className="text-white/60 text-sm">On</p>
                  <p className="text-white">{currentKanji.onyomi.join(', ') || '—'}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">Kun</p>
                  <p className="text-white">{currentKanji.kunyomi.join(', ') || '—'}</p>
                </div>
              </div>
              <p className="text-white/80 text-sm mt-4 text-center">💡 {currentKanji.mnemonics}</p>
            </div>
          </motion.div>

          {showDetails && (
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
      </div>
    );
  }

  // Quiz Mode
  if (mode === 'quiz' && currentKanji) {
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
            {currentIndex + 1} / {studyKanji.length}
          </span>
          <div className="text-green-400 font-medium">{correctCount} correct</div>
        </div>

        {/* Progress */}
        <div className="h-2 bg-white/20 rounded-full overflow-hidden mb-8">
          <motion.div
            className="h-full bg-gradient-to-r from-pink-500 to-orange-500"
            animate={{ width: `${((currentIndex + 1) / studyKanji.length) * 100}%` }}
          />
        </div>

        {/* Question */}
        <div className="text-center mb-8">
          <p className="text-white/60 mb-4">What does this kanji mean?</p>
          <div className="text-8xl font-bold text-white">{currentKanji.character}</div>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {generateOptions(currentKanji).map((option, idx) => {
            const isSelected = selectedAnswer === option;
            const isCorrect = currentKanji.meaning.includes(option);
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

        {/* Feedback with mnemonic */}
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-white/10 rounded-xl"
          >
            <p className="text-yellow-400 text-sm mb-1">💡 Memory Tip</p>
            <p className="text-white/80">{currentKanji.mnemonics}</p>
          </motion.div>
        )}
      </div>
    );
  }

  return null;
};
