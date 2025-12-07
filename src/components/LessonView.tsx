import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronRight, Check, X, Volume2, Lightbulb, MessageCircle } from 'lucide-react';
import { Lesson, QuizQuestion } from '../types';
import { vocabulary } from '../data/vocabulary';
import { kanjiData } from '../data/kanji';
import { slangPhrases } from '../data/slang';
import { useStore } from '../store/useStore';

interface LessonViewProps {
  lesson: Lesson;
  onBack: () => void;
  onComplete: () => void;
}

export const LessonView: React.FC<LessonViewProps> = ({ lesson, onBack, onComplete }) => {
  const [stage, setStage] = useState<'content' | 'quiz' | 'complete'>('content');
  const [contentIndex, setContentIndex] = useState(0);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);

  const { addXp, completeLesson, learnWord, learnKanji, updateStreak } = useStore();

  const currentContent = lesson.content[contentIndex];
  const currentQuiz = lesson.quiz[quizIndex];

  const handleNextContent = () => {
    // Track learned items
    if (currentContent.type === 'vocabulary' && currentContent.data.words) {
      currentContent.data.words.forEach((wordId: number) => learnWord(wordId));
    }
    if (currentContent.type === 'kanji' && currentContent.data.characters) {
      currentContent.data.characters.forEach((kanjiId: number) => learnKanji(kanjiId));
    }

    if (contentIndex < lesson.content.length - 1) {
      setContentIndex(contentIndex + 1);
    } else {
      setStage('quiz');
    }
  };

  const handleAnswer = (answer: string) => {
    if (showFeedback) return;

    setSelectedAnswer(answer);
    setShowFeedback(true);

    const isCorrect = Array.isArray(currentQuiz.correctAnswer)
      ? currentQuiz.correctAnswer.includes(answer)
      : answer === currentQuiz.correctAnswer;

    if (isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
      setTotalPoints(totalPoints + currentQuiz.points);
    }

    setTimeout(() => {
      if (quizIndex < lesson.quiz.length - 1) {
        setQuizIndex(quizIndex + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        // Complete lesson
        const score = Math.round((correctAnswers + (isCorrect ? 1 : 0)) / lesson.quiz.length * 100);
        const xpEarned = lesson.xpReward + totalPoints + (isCorrect ? currentQuiz.points : 0);

        addXp(xpEarned);
        completeLesson(lesson.id, score);
        updateStreak();

        setStage('complete');
      }
    }, 2000);
  };

  const renderContent = () => {
    if (!currentContent) return null;

    switch (currentContent.type) {
      case 'text':
        return (
          <motion.div
            key={`text-${contentIndex}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold text-white">{currentContent.data.title}</h2>
            <p className="text-white/80 leading-relaxed">{currentContent.data.body}</p>
          </motion.div>
        );

      case 'tip':
        return (
          <motion.div
            key={`tip-${contentIndex}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-yellow-500/20 border border-yellow-500/30 rounded-xl p-5"
          >
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-6 h-6 text-yellow-400" />
              <h3 className="text-lg font-bold text-yellow-400">{currentContent.data.title}</h3>
            </div>
            <p className="text-white/90">{currentContent.data.body}</p>
          </motion.div>
        );

      case 'vocabulary':
        const words = currentContent.data.words
          ? currentContent.data.words.map((id: number) => vocabulary.find(w => w.id === id)).filter(Boolean)
          : currentContent.data.custom || [];

        return (
          <motion.div
            key={`vocab-${contentIndex}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-3"
          >
            <h3 className="text-lg font-bold text-white mb-4">New Vocabulary</h3>
            {words.slice(0, 5).map((word: any, idx: number) => (
              <div key={idx} className="bg-white/10 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="text-2xl font-bold text-white">{word.japanese}</span>
                    {word.hiragana && (
                      <span className="text-white/60 ml-2">({word.hiragana})</span>
                    )}
                  </div>
                  <button className="p-2 bg-white/10 rounded-full hover:bg-white/20">
                    <Volume2 className="w-5 h-5 text-white" />
                  </button>
                </div>
                <p className="text-white/80 font-medium">{word.english}</p>
                {word.slangNote && (
                  <p className="text-yellow-400/80 text-sm mt-2 italic">💡 {word.slangNote}</p>
                )}
                {word.exampleSentence && (
                  <div className="mt-3 p-3 bg-white/5 rounded-lg">
                    <p className="text-white/70 text-sm">{word.exampleSentence}</p>
                    <p className="text-white/50 text-sm">{word.exampleTranslation}</p>
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        );

      case 'kanji':
        const kanjis = currentContent.data.characters
          ? currentContent.data.characters.map((id: number) => kanjiData.find(k => k.id === id)).filter(Boolean)
          : [];

        return (
          <motion.div
            key={`kanji-${contentIndex}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-bold text-white mb-4">Kanji Study</h3>
            {kanjis.slice(0, 3).map((kanji: any, idx: number) => (
              <div key={idx} className="bg-white/10 rounded-xl p-5">
                <div className="flex items-start gap-4">
                  <div className="text-6xl font-bold text-white">{kanji.character}</div>
                  <div className="flex-1">
                    <p className="text-white/60 text-sm">Meanings</p>
                    <p className="text-white font-medium mb-2">{kanji.meaning.join(', ')}</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-white/60">On'yomi</p>
                        <p className="text-pink-400">{kanji.onyomi.join(', ') || '—'}</p>
                      </div>
                      <div>
                        <p className="text-white/60">Kun'yomi</p>
                        <p className="text-green-400">{kanji.kunyomi.join(', ') || '—'}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-3 p-3 bg-white/5 rounded-lg">
                  <p className="text-yellow-400 text-sm">💡 {kanji.mnemonics}</p>
                </div>
              </div>
            ))}
          </motion.div>
        );

      case 'dialogue':
        return (
          <motion.div
            key={`dialogue-${contentIndex}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 mb-4">
              <MessageCircle className="w-6 h-6 text-blue-400" />
              <h3 className="text-lg font-bold text-white">{currentContent.data.title}</h3>
            </div>
            <div className="space-y-3">
              {currentContent.data.lines.map((line: any, idx: number) => (
                <div
                  key={idx}
                  className={`flex ${line.speaker === 'You' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-3 rounded-2xl ${
                    line.speaker === 'You'
                      ? 'bg-blue-500/30 rounded-br-none'
                      : 'bg-white/10 rounded-bl-none'
                  }`}>
                    <p className="text-xs text-white/50 mb-1">{line.speaker}</p>
                    <p className="text-white font-medium">{line.japanese}</p>
                    <p className="text-white/60 text-sm">{line.english}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );

      case 'grammar':
        return (
          <motion.div
            key={`grammar-${contentIndex}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-bold text-white mb-4">Grammar Patterns</h3>
            {currentContent.data.patterns?.map((pattern: any, idx: number) => (
              <div key={idx} className="bg-white/10 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold text-pink-400">{pattern.pattern}</span>
                </div>
                <p className="text-white/80 mb-3">{pattern.meaning}</p>
                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                  <div>
                    <p className="text-white/60">Formal</p>
                    <p className="text-white">{pattern.formal}</p>
                  </div>
                  <div>
                    <p className="text-white/60">Casual</p>
                    <p className="text-green-400">{pattern.casual}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  {pattern.examples?.map((ex: string, i: number) => (
                    <p key={i} className="text-white/70 text-sm">• {ex}</p>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        );

      default:
        return null;
    }
  };

  const renderQuiz = () => {
    if (!currentQuiz) return null;

    return (
      <motion.div
        key={`quiz-${quizIndex}`}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="space-y-6"
      >
        {/* Progress */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-white/60 text-sm">
            Question {quizIndex + 1} of {lesson.quiz.length}
          </span>
          <span className="text-yellow-400 text-sm">+{currentQuiz.points} pts</span>
        </div>
        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-pink-500 to-orange-500"
            initial={{ width: 0 }}
            animate={{ width: `${((quizIndex + 1) / lesson.quiz.length) * 100}%` }}
          />
        </div>

        {/* Question */}
        <h2 className="text-xl font-bold text-white">{currentQuiz.question}</h2>
        {currentQuiz.questionJp && (
          <p className="text-white/60">{currentQuiz.questionJp}</p>
        )}

        {/* Options */}
        {currentQuiz.type === 'multiple_choice' && currentQuiz.options && (
          <div className="space-y-3">
            {currentQuiz.options.map((option, idx) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = Array.isArray(currentQuiz.correctAnswer)
                ? currentQuiz.correctAnswer.includes(option)
                : option === currentQuiz.correctAnswer;
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
                  <span className="text-white">{option}</span>
                  {showCorrect && <Check className="w-5 h-5 text-green-400" />}
                  {showWrong && <X className="w-5 h-5 text-red-400" />}
                </motion.button>
              );
            })}
          </div>
        )}

        {currentQuiz.type === 'typing' && (
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Type your answer..."
              className="w-full p-4 rounded-xl bg-white/10 border-2 border-white/20 text-white placeholder-white/40 focus:border-pink-400 focus:outline-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAnswer((e.target as HTMLInputElement).value);
                }
              }}
            />
          </div>
        )}

        {/* Feedback */}
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-xl ${
              (Array.isArray(currentQuiz.correctAnswer)
                ? currentQuiz.correctAnswer.includes(selectedAnswer || '')
                : selectedAnswer === currentQuiz.correctAnswer)
                ? 'bg-green-500/20 border border-green-500/30'
                : 'bg-red-500/20 border border-red-500/30'
            }`}
          >
            <p className="text-white/80">{currentQuiz.explanation}</p>
          </motion.div>
        )}
      </motion.div>
    );
  };

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
        <div className="flex-1">
          <h1 className="text-xl font-bold text-white">{lesson.title}</h1>
          <p className="text-white/60 text-sm">{lesson.titleJp}</p>
        </div>
      </div>

      {/* Progress */}
      {stage !== 'complete' && (
        <div className="mb-6">
          <div className="flex gap-1">
            {lesson.content.map((_, idx) => (
              <div
                key={idx}
                className={`h-1 flex-1 rounded-full ${
                  idx < contentIndex
                    ? 'bg-green-400'
                    : idx === contentIndex && stage === 'content'
                    ? 'bg-pink-400'
                    : 'bg-white/20'
                }`}
              />
            ))}
            <div
              className={`h-1 flex-1 rounded-full ${
                stage === 'quiz' ? 'bg-pink-400' : 'bg-white/20'
              }`}
            />
          </div>
        </div>
      )}

      {/* Content */}
      <AnimatePresence mode="wait">
        {stage === 'content' && (
          <div className="mb-6">
            {renderContent()}
          </div>
        )}

        {stage === 'quiz' && (
          <div className="mb-6">
            {renderQuiz()}
          </div>
        )}

        {stage === 'complete' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="text-7xl mb-4"
            >
              🎉
            </motion.div>
            <h2 className="text-3xl font-bold text-white mb-2">Lesson Complete!</h2>
            <p className="text-white/60 mb-6">{lesson.title}</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-3xl font-bold text-yellow-400">+{lesson.xpReward + totalPoints}</p>
                <p className="text-white/60 text-sm">XP Earned</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-3xl font-bold text-green-400">
                  {Math.round((correctAnswers / lesson.quiz.length) * 100)}%
                </p>
                <p className="text-white/60 text-sm">Quiz Score</p>
              </div>
            </div>

            <button
              onClick={onComplete}
              className="w-full py-4 bg-gradient-to-r from-pink-500 to-orange-500 rounded-xl font-bold text-lg text-white hover:from-pink-600 hover:to-orange-600 transition-all"
            >
              Continue
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Continue Button */}
      {stage === 'content' && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleNextContent}
          className="fixed bottom-6 left-4 right-4 py-4 bg-gradient-to-r from-pink-500 to-orange-500 rounded-xl font-bold text-lg text-white flex items-center justify-center gap-2 hover:from-pink-600 hover:to-orange-600 transition-all"
        >
          {contentIndex < lesson.content.length - 1 ? 'Continue' : 'Start Quiz'}
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      )}
    </div>
  );
};
