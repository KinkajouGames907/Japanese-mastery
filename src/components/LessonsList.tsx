import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Languages, MessageCircle, Sparkles, Lock, Check } from 'lucide-react';
import { lessons } from '../data/lessons';
import { useStore } from '../store/useStore';
import { Lesson } from '../types';

interface LessonsListProps {
  onBack: () => void;
  onSelectLesson: (lesson: Lesson) => void;
}

export const LessonsList: React.FC<LessonsListProps> = ({ onBack, onSelectLesson }) => {
  const { progress } = useStore();
  const [filter, setFilter] = useState<string>('all');

  const filteredLessons = filter === 'all'
    ? lessons
    : lessons.filter(l => l.type === filter);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'vocabulary': return <Languages className="w-5 h-5" />;
      case 'kanji': return <span className="text-lg">漢</span>;
      case 'grammar': return <BookOpen className="w-5 h-5" />;
      case 'slang': return <Sparkles className="w-5 h-5" />;
      case 'conversation': return <MessageCircle className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'vocabulary': return 'from-blue-500 to-cyan-500';
      case 'kanji': return 'from-purple-500 to-pink-500';
      case 'grammar': return 'from-green-500 to-emerald-500';
      case 'slang': return 'from-orange-500 to-red-500';
      case 'conversation': return 'from-indigo-500 to-blue-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const isLocked = (lesson: Lesson) => lesson.level > progress.level + 1;
  const isCompleted = (lesson: Lesson) => progress.lessonsCompleted.includes(lesson.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 pb-24">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white">Lessons</h1>
          <p className="text-white/60 text-sm">{lessons.length} lessons available</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-4 -mx-4 px-4">
        {[
          { id: 'all', label: 'All' },
          { id: 'vocabulary', label: 'Vocab' },
          { id: 'kanji', label: 'Kanji' },
          { id: 'grammar', label: 'Grammar' },
          { id: 'slang', label: 'Slang' },
          { id: 'conversation', label: 'Convo' }
        ].map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
              filter === f.id
                ? 'bg-white text-slate-900 font-medium'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Lessons Grid */}
      <div className="space-y-3">
        {filteredLessons.map((lesson, idx) => {
          const locked = isLocked(lesson);
          const completed = isCompleted(lesson);

          return (
            <motion.button
              key={lesson.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => !locked && onSelectLesson(lesson)}
              disabled={locked}
              className={`w-full text-left rounded-xl overflow-hidden ${
                locked ? 'opacity-50' : 'hover:scale-[1.02]'
              } transition-all`}
            >
              <div className={`bg-gradient-to-r ${getTypeColor(lesson.type)} p-1`}>
                <div className="bg-slate-900/90 backdrop-blur p-4 rounded-lg">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${getTypeColor(lesson.type)} text-white`}>
                      {getTypeIcon(lesson.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/60">
                          Level {lesson.level}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/60 capitalize">
                          {lesson.type}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white truncate">{lesson.title}</h3>
                      <p className="text-white/60 text-sm">{lesson.titleJp}</p>
                      <p className="text-white/40 text-sm mt-1 line-clamp-2">{lesson.description}</p>
                    </div>

                    {/* Status */}
                    <div className="flex flex-col items-center gap-1">
                      {locked ? (
                        <Lock className="w-5 h-5 text-white/40" />
                      ) : completed ? (
                        <div className="p-1 bg-green-500/20 rounded-full">
                          <Check className="w-5 h-5 text-green-400" />
                        </div>
                      ) : (
                        <div className="text-right">
                          <p className="text-yellow-400 text-sm font-medium">+{lesson.xpReward} XP</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
