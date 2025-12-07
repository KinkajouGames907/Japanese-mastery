import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useStore } from './store/useStore';
import { LevelAssessment } from './components/LevelAssessment';
import { Dashboard } from './components/Dashboard';
import { LessonsList } from './components/LessonsList';
import { LessonView } from './components/LessonView';
import { VocabularyPractice } from './components/VocabularyPractice';
import { KanjiStudy } from './components/KanjiStudy';
import { ReviewSession } from './components/ReviewSession';
import { AchievementsView } from './components/AchievementsView';
import { Settings } from './components/Settings';
import { Navigation } from './components/Navigation';
import { LevelUpModal } from './components/LevelUpModal';
import { AchievementModal } from './components/AchievementModal';
import { lessons } from './data/lessons';
import { Lesson } from './types';
import './index.css';

type Page = 'assessment' | 'home' | 'lessons' | 'lesson' | 'vocabulary' | 'kanji' | 'review' | 'achievements' | 'settings';

function App() {
  const { progress, initProgress } = useStore();
  const [currentPage, setCurrentPage] = useState<Page>('assessment');
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    initProgress();
    // Check if user has already completed assessment
    if (progress.level > 0 && progress.studyDates.length > 0) {
      setCurrentPage('home');
    }
    setIsFirstLoad(false);
  }, []);

  const handleNavigate = (page: string, data?: any) => {
    if (page === 'lesson' && data?.lessonId) {
      const lesson = lessons.find(l => l.id === data.lessonId);
      if (lesson) {
        setSelectedLesson(lesson);
        setCurrentPage('lesson');
        return;
      }
    }
    setCurrentPage(page as Page);
  };

  const handleAssessmentComplete = (level: number) => {
    setCurrentPage('home');
  };

  const handleSelectLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setCurrentPage('lesson');
  };

  const handleLessonComplete = () => {
    setSelectedLesson(null);
    setCurrentPage('lessons');
  };

  // Show loading or assessment on first load
  if (isFirstLoad) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-6xl animate-pulse">🎌</div>
      </div>
    );
  }

  // Show assessment for new users
  if (currentPage === 'assessment' && progress.studyDates.length === 0) {
    return <LevelAssessment onComplete={handleAssessmentComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <AnimatePresence mode="wait">
        {currentPage === 'home' && (
          <Dashboard key="dashboard" onNavigate={handleNavigate} />
        )}

        {currentPage === 'lessons' && (
          <LessonsList
            key="lessons"
            onBack={() => setCurrentPage('home')}
            onSelectLesson={handleSelectLesson}
          />
        )}

        {currentPage === 'lesson' && selectedLesson && (
          <LessonView
            key="lesson"
            lesson={selectedLesson}
            onBack={() => {
              setSelectedLesson(null);
              setCurrentPage('lessons');
            }}
            onComplete={handleLessonComplete}
          />
        )}

        {currentPage === 'vocabulary' && (
          <VocabularyPractice
            key="vocabulary"
            onBack={() => setCurrentPage('home')}
          />
        )}

        {currentPage === 'kanji' && (
          <KanjiStudy
            key="kanji"
            onBack={() => setCurrentPage('home')}
          />
        )}

        {currentPage === 'review' && (
          <ReviewSession
            key="review"
            onBack={() => setCurrentPage('home')}
          />
        )}

        {currentPage === 'achievements' && (
          <AchievementsView
            key="achievements"
            onBack={() => setCurrentPage('home')}
          />
        )}

        {currentPage === 'settings' && (
          <Settings
            key="settings"
            onBack={() => setCurrentPage('home')}
          />
        )}
      </AnimatePresence>

      {/* Bottom Navigation - show on main pages */}
      {['home', 'lessons', 'vocabulary', 'achievements', 'settings'].includes(currentPage) && (
        <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      )}

      {/* Modals */}
      <LevelUpModal />
      <AchievementModal />
    </div>
  );
}

export default App;
