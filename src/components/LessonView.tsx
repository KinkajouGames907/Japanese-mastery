import React, { useState, useEffect } from 'react';
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
  const [matchingLeft, setMatchingLeft] = useState<{ id: number, text: string, matched: boolean }[]>([]);
  const [matchingRight, setMatchingRight] = useState<{ id: number, text: string, matched: boolean }[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<{ side: 'left' | 'right', id: number } | null>(null);
  const completedRef = React.useRef(false); // Ref to track if completion logic has run

  const { addXp, completeLesson, learnWord, learnKanji, updateStreak } = useStore();

  const currentContent = lesson.content[contentIndex];
  const currentQuiz = lesson.quiz[quizIndex];

  useEffect(() => {
    if (currentQuiz?.type === 'matching') {
      const left = (currentQuiz.options || []).map((text, i) => ({ id: i, text, matched: false }));
      const right = (Array.isArray(currentQuiz.correctAnswer) ? currentQuiz.correctAnswer : [currentQuiz.correctAnswer]).map((text, i) => ({ id: i, text, matched: false }));

      setMatchingLeft(left);
      setMatchingRight([...right].sort(() => Math.random() - 0.5));
      setSelectedMatch(null);
    }
  }, [quizIndex, lesson.quiz]);

  // Handle lesson completion effects
  useEffect(() => {
    if (stage === 'complete' && !completedRef.current) {
      completedRef.current = true;

      const score = Math.round((correctAnswers / lesson.quiz.length) * 100);

      // Calculate XP: Base reward + points from matching + points from standard quizzes
      // Note: totalPoints tracks points from ALL quizzes (both simple and matching) if they update it correctly.
      // handleAnswer updates totalPoints. handleMatchClick updates totalPoints. 
      // So totalPoints should be correct.
      const xpEarned = lesson.xpReward + totalPoints;

      addXp(xpEarned);
      completeLesson(lesson.id, score);
      updateStreak();
    }
  }, [stage, correctAnswers, lesson.quiz.length, lesson.xpReward, totalPoints, lesson.id, addXp, completeLesson, updateStreak]);

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
      handleNextQuestion();
    }, 2000);
  };

  const handleNextQuestion = () => {
    if (quizIndex < lesson.quiz.length - 1) {
      setQuizIndex(quizIndex + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      // Complete lesson
      // Calculate score based on current accumulated specific logic or pass it through
      // Recalculate score to be safe or rely on state? 
      // State 'correctAnswers' is up to date BEFORE this function is called usually.
      // But wait, handleAnswer updates it immediately.

      // We need to access the LATEST state. Closures might be stale if inside setTimeout?
      // No, functional updates setCorrectAnswers(p => p+1) solve that, but reading it here?
      // React state updates are batched. 
      // To refer to the final value, relying on the state variable 'correctAnswers' inside render scope might be stale in the timeout datum.
      // BUT, handleAnswer creates the timeout. The callback closes over the scope. 
      // 'correctAnswers' in the timeout will be the OLD value (before setCorrectAnswers update).
      // So logic in lines 68-76 used (correctAnswers + (isCorrect ? 1 : 0)).
      // I should replicate that calculation or use a ref?
      // Simpler: Just rely on 'correctAnswers' (which tracked previous) + pending success.

      // Actually, let's keep the logic simple.
      // If I extract this, I lose the context of 'isCorrect' for the final calculation.
      // I should just make handleNextQuestion purely about navigation, and handle scoring calculation BEFORE calling it? 
      // No, scoring calculation happens AT THE END of the quiz.

      finishLesson();
    }
  };

  const finishLesson = () => {
    // Note: This function assumes correctAnswers is fully updated? 
    // Or we can't trust it if called from handleAnswer's timeout?
    // The original code calculated score using local variables. 
    // I will revert the "Extract" plan slightly to avoid bugs.
    // Instead, I will duplicate the finish logic or create a robust 'complete' function.

    // Let's use the messy but safe approach: copy the logic.
    const isLast = quizIndex >= lesson.quiz.length - 1;
    if (!isLast) {
      setQuizIndex(quizIndex + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      return;
    }

    // It's the last one.
    // This is tricky because we need the FINAL count.
    // Let's pass the final count to finishLesson?
    setStage('complete');

    // The side effects (addXp, completeLesson) need the score.
    // I'll execute them in a useEffect dependent on 'stage' being 'complete'?
    // Or just do them here assuming state is effectively updated? 
    // If I trigger setStage('complete'), the component re-renders. 
    // I can put the completion logic in a useEffect(() => { if stage === 'complete' ... }, [stage]);
  };

  // Dedicated matching handler
  const handleMatchClick = (side: 'left' | 'right', id: number) => {
    if (showFeedback) return;

    if (selectedMatch && selectedMatch.side !== side) {
      if (selectedMatch.id === id) {
        // Correct match
        const newLeft = matchingLeft.map(i => i.id === id ? { ...i, matched: true } : i);
        const newRight = matchingRight.map(i => i.id === id ? { ...i, matched: true } : i);
        setMatchingLeft(newLeft);
        setMatchingRight(newRight);
        setSelectedMatch(null);

        // Full completion check
        if (newLeft.every(i => i.matched)) {
          // Success!
          setCorrectAnswers(c => c + 1);
          setTotalPoints(p => p + currentQuiz.points);
          setShowFeedback(true);

          setTimeout(() => {
            if (quizIndex < lesson.quiz.length - 1) {
              setQuizIndex(quizIndex + 1);
              setSelectedAnswer(null);
              setShowFeedback(false);
            } else {
              setStage('complete');
            }
          }, 1500);
        }
      } else {
        // Wrong match
        setSelectedMatch(null);

        // Optional shake effect or red flash?
        // Implementing simple momentary red flash by setting a temporary state?
        // For now, simply deselecting is standard behavior in many such games.
      }
    } else {
      if (selectedMatch && selectedMatch.side === side && selectedMatch.id === id) {
        setSelectedMatch(null); // deselect
      } else {
        setSelectedMatch({ side, id });
      }
    }
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
          : currentContent.data.slangIds
            ? currentContent.data.slangIds.map((id: number) => {
              const slang = slangPhrases.find(s => s.id === id);
              if (!slang) return null;
              return {
                ...slang,
                japanese: slang.phrase,
                hiragana: slang.reading,
                english: slang.meaning,
                slangNote: slang.formality === 'slang' ? 'Slang' : 'Casual',
                exampleSentence: slang.example,
                exampleTranslation: slang.exampleTranslation
              };
            }).filter(Boolean)
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
                    {word.hiragana || word.reading && (
                      <span className="text-white/60 ml-2">({word.hiragana || word.reading})</span>
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
                  <div className={`max-w-[80%] p-3 rounded-2xl ${line.speaker === 'You'
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
                  className={`w-full p-4 rounded-xl text-left font-medium transition-all flex items-center justify-between ${showCorrect
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

        {(currentQuiz.type === 'typing' || currentQuiz.type === 'fill_blank') && (
          <div className="space-y-3">
            <input
              type="text"
              placeholder={currentQuiz.type === 'fill_blank' ? "Fill in the blank..." : "Type your answer..."}
              className="w-full p-4 rounded-xl bg-white/10 border-2 border-white/20 text-white placeholder-white/40 focus:border-pink-400 focus:outline-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAnswer((e.target as HTMLInputElement).value);
                }
              }}
            />
          </div>
        )}

        {currentQuiz.type === 'matching' && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              {matchingLeft.map((item) => (
                <motion.button
                  key={`left-${item.id}`}
                  onClick={() => !item.matched && handleMatchClick('left', item.id)}
                  disabled={item.matched || showFeedback}
                  whileHover={!item.matched ? { scale: 1.02 } : {}}
                  whileTap={!item.matched ? { scale: 0.98 } : {}}
                  className={`w-full p-4 rounded-xl text-center font-medium transition-all ${item.matched
                    ? 'bg-green-500/20 border-2 border-green-500/30 text-white/40'
                    : selectedMatch?.side === 'left' && selectedMatch.id === item.id
                      ? 'bg-pink-500/20 border-2 border-pink-400 text-white'
                      : 'bg-white/10 border-2 border-transparent hover:bg-white/20 text-white'
                    }`}
                >
                  {item.text}
                </motion.button>
              ))}
            </div>
            <div className="space-y-3">
              {matchingRight.map((item) => (
                <motion.button
                  key={`right-${item.id}`}
                  onClick={() => !item.matched && handleMatchClick('right', item.id)}
                  disabled={item.matched || showFeedback}
                  whileHover={!item.matched ? { scale: 1.02 } : {}}
                  whileTap={!item.matched ? { scale: 0.98 } : {}}
                  className={`w-full p-4 rounded-xl text-center font-medium transition-all ${item.matched
                    ? 'bg-green-500/20 border-2 border-green-500/30 text-white/40'
                    : selectedMatch?.side === 'right' && selectedMatch.id === item.id
                      ? 'bg-pink-500/20 border-2 border-pink-400 text-white'
                      : 'bg-white/10 border-2 border-transparent hover:bg-white/20 text-white'
                    }`}
                >
                  {item.text}
                </motion.button>
              ))}
            </div>
          </div >
        )
        }

        {/* Feedback */}
        {
          showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl ${(Array.isArray(currentQuiz.correctAnswer)
                ? currentQuiz.correctAnswer.includes(selectedAnswer || '')
                : selectedAnswer === currentQuiz.correctAnswer)
                ? 'bg-green-500/20 border border-green-500/30'
                : 'bg-red-500/20 border border-red-500/30'
                }`}
            >
              <p className="text-white/80">{currentQuiz.explanation}</p>
            </motion.div>
          )
        }
      </motion.div >
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
                className={`h-1 flex-1 rounded-full ${idx < contentIndex
                  ? 'bg-green-400'
                  : idx === contentIndex && stage === 'content'
                    ? 'bg-pink-400'
                    : 'bg-white/20'
                  }`}
              />
            ))}
            <div
              className={`h-1 flex-1 rounded-full ${stage === 'quiz' ? 'bg-pink-400' : 'bg-white/20'
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
