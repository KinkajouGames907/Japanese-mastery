import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, X, Clock, Zap } from 'lucide-react';
import { useStore } from '../store/useStore';
import { vocabulary } from '../data/vocabulary';
import { kanjiData } from '../data/kanji';
import { ReviewItem } from '../types';
import { format, addDays, parseISO, isBefore } from 'date-fns';

interface ReviewSessionProps {
  onBack: () => void;
}

export const ReviewSession: React.FC<ReviewSessionProps> = ({ onBack }) => {
  const { progress, updateReviewItem, addXp, updateStreak } = useStore();
  const [dueItems, setDueItems] = useState<ReviewItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [sessionComplete, setSessionComplete] = useState(false);

  useEffect(() => {
    // Filter items that are due for review
    const now = new Date();
    const due = progress.reviewQueue.filter(item => {
      const reviewDate = parseISO(item.nextReview);
      return isBefore(reviewDate, now);
    });
    setDueItems(due);
  }, [progress.reviewQueue]);

  const currentItem = dueItems[currentIndex];

  const getItemContent = (item: ReviewItem) => {
    if (item.type === 'word') {
      return vocabulary.find(w => w.id === item.id);
    } else if (item.type === 'kanji') {
      return kanjiData.find(k => k.id === item.id);
    }
    return null;
  };

  const handleResponse = (quality: number) => {
    // Spaced repetition algorithm (SM-2 inspired)
    const item = { ...currentItem };

    if (quality >= 3) {
      setCorrectCount(correctCount + 1);
      // Correct response
      if (item.repetitions === 0) {
        item.interval = 1;
      } else if (item.repetitions === 1) {
        item.interval = 6;
      } else {
        item.interval = Math.round(item.interval * item.easeFactor);
      }
      item.repetitions++;
      item.easeFactor = Math.max(1.3, item.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
    } else {
      // Incorrect response - reset
      item.repetitions = 0;
      item.interval = 1;
      item.easeFactor = Math.max(1.3, item.easeFactor - 0.2);
    }

    item.nextReview = format(addDays(new Date(), item.interval), 'yyyy-MM-dd');
    updateReviewItem(item);

    if (currentIndex < dueItems.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    } else {
      finishSession();
    }
  };

  const finishSession = () => {
    const xpEarned = correctCount * 5;
    addXp(xpEarned);
    updateStreak();
    setSessionComplete(true);
  };

  // No items to review
  if (dueItems.length === 0 && !sessionComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="text-7xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-white mb-2">All Caught Up!</h2>
          <p className="text-white/60 mb-6">No items due for review right now.</p>
          <p className="text-white/40 text-sm mb-6">
            Keep learning new words and kanji to build your review queue!
          </p>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-500 rounded-xl text-white font-medium"
          >
            Back to Dashboard
          </button>
        </motion.div>
      </div>
    );
  }

  // Session complete
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
            {correctCount === dueItems.length ? '⭐' : '👍'}
          </motion.div>
          <h2 className="text-3xl font-bold text-white mb-2">Review Complete!</h2>
          <p className="text-white/60 mb-6">
            {correctCount}/{dueItems.length} recalled
          </p>

          <div className="bg-white/10 rounded-xl p-4 mb-6 inline-block">
            <p className="text-yellow-400 text-2xl font-bold">+{correctCount * 5} XP</p>
          </div>

          <div>
            <button
              onClick={onBack}
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-500 rounded-xl text-white font-medium"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const content = getItemContent(currentItem);
  if (!content) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-white/60" />
          <span className="text-white/60">{dueItems.length} due</span>
        </div>
        <span className="text-white/60">
          {currentIndex + 1} / {dueItems.length}
        </span>
      </div>

      {/* Progress */}
      <div className="h-2 bg-white/20 rounded-full overflow-hidden mb-8">
        <motion.div
          className="h-full bg-gradient-to-r from-green-400 to-emerald-500"
          animate={{ width: `${((currentIndex + 1) / dueItems.length) * 100}%` }}
        />
      </div>

      {/* Card */}
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={() => !showAnswer && setShowAnswer(true)}
        className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 cursor-pointer min-h-[300px] flex flex-col"
      >
        {currentItem.type === 'word' && 'japanese' in content && (
          <>
            {/* Front - Japanese word */}
            <div className="flex-1 flex flex-col items-center justify-center">
              <p className="text-4xl font-bold text-white mb-2">{content.japanese}</p>
              <p className="text-xl text-white/60">{content.hiragana}</p>
            </div>

            {/* Back - Answer */}
            {showAnswer && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border-t border-white/20 pt-4 mt-4"
              >
                <p className="text-2xl font-bold text-white text-center mb-2">{content.english}</p>
                {content.slangNote && (
                  <p className="text-yellow-400/80 text-sm text-center mb-2">💡 {content.slangNote}</p>
                )}
                <div className="text-center text-white/60 text-sm">
                  <p>{content.exampleSentence}</p>
                  <p className="text-white/40">{content.exampleTranslation}</p>
                </div>
              </motion.div>
            )}
          </>
        )}

        {currentItem.type === 'kanji' && 'character' in content && (
          <>
            {/* Front - Kanji */}
            <div className="flex-1 flex flex-col items-center justify-center">
              <p className="text-7xl font-bold text-white">{content.character}</p>
            </div>

            {/* Back - Answer */}
            {showAnswer && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border-t border-white/20 pt-4 mt-4"
              >
                <p className="text-2xl font-bold text-white text-center mb-3">
                  {content.meaning.join(', ')}
                </p>
                <div className="grid grid-cols-2 gap-4 text-center mb-3">
                  <div>
                    <p className="text-white/60 text-sm">On'yomi</p>
                    <p className="text-pink-400">{content.onyomi.join(', ') || '—'}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Kun'yomi</p>
                    <p className="text-green-400">{content.kunyomi.join(', ') || '—'}</p>
                  </div>
                </div>
                <p className="text-yellow-400/80 text-sm text-center">💡 {content.mnemonics}</p>
              </motion.div>
            )}
          </>
        )}

        {!showAnswer && (
          <p className="text-white/40 text-center">Tap to reveal answer</p>
        )}
      </motion.div>

      {/* Response Buttons */}
      {showAnswer && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6"
        >
          <p className="text-white/60 text-center mb-4">How well did you remember?</p>
          <div className="grid grid-cols-4 gap-2">
            <button
              onClick={() => handleResponse(1)}
              className="py-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 hover:bg-red-500/30 transition-all"
            >
              <X className="w-5 h-5 mx-auto mb-1" />
              <span className="text-xs">Again</span>
            </button>
            <button
              onClick={() => handleResponse(2)}
              className="py-4 bg-orange-500/20 border border-orange-500/30 rounded-xl text-orange-400 hover:bg-orange-500/30 transition-all"
            >
              <span className="text-lg mb-1 block">😅</span>
              <span className="text-xs">Hard</span>
            </button>
            <button
              onClick={() => handleResponse(3)}
              className="py-4 bg-blue-500/20 border border-blue-500/30 rounded-xl text-blue-400 hover:bg-blue-500/30 transition-all"
            >
              <span className="text-lg mb-1 block">👍</span>
              <span className="text-xs">Good</span>
            </button>
            <button
              onClick={() => handleResponse(5)}
              className="py-4 bg-green-500/20 border border-green-500/30 rounded-xl text-green-400 hover:bg-green-500/30 transition-all"
            >
              <Zap className="w-5 h-5 mx-auto mb-1" />
              <span className="text-xs">Easy</span>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
