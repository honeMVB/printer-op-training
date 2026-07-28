'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';
import QuizComponent from '@/components/QuizComponent';
import FormattedLessonContent from '@/components/FormattedLessonContent';
import { MODULES, Lesson } from '@/data/modulesData';
import { QUIZZES } from '@/data/quizData';
import { getProgress, toggleLessonComplete } from '@/lib/progress';
import { ArrowLeft, CheckCircle2, Clock, BookOpen, HelpCircle, ArrowRight, Lightbulb, AlertTriangle, ShieldCheck, Sparkles } from 'lucide-react';

export default function ModulePage() {
  const params = useParams();
  const router = useRouter();
  const moduleId = params?.moduleId as string;

  const targetModule = MODULES.find((m) => m.id === moduleId);
  const targetQuiz = QUIZZES[moduleId];

  const [activeLessonIdx, setActiveLessonIdx] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [showQuiz, setShowQuiz] = useState(false);

  useEffect(() => {
    const p = getProgress();
    // eslint-disable-next-line
    setCompletedLessons(p.completedLessons);
  }, [moduleId]);

  if (!targetModule) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-stone-950 text-white flex flex-col items-center justify-center p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Module Not Found</h2>
          <Link href="/" className="px-5 py-2.5 rounded-xl bg-sky-500 text-stone-950 font-bold text-sm">
            Back to Dashboard
          </Link>
        </div>
      </ProtectedRoute>
    );
  }

  const currentLesson: Lesson = targetModule.lessons[activeLessonIdx];
  const isCompleted = completedLessons.includes(currentLesson.id);

  const handleToggleComplete = () => {
    const p = toggleLessonComplete(currentLesson.id, targetModule.id, targetModule.lessons.length);
    setCompletedLessons([...p.completedLessons]);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-stone-950 text-white pb-20">
        
        {/* Navigation Breadcrumb Header */}
        <div className="bg-stone-900/90 border-b border-stone-800 px-4 sm:px-6 lg:px-8 py-4 backdrop-blur-md sticky top-16 z-40">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-xs font-semibold text-stone-400 hover:text-sky-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </Link>

            <div className="flex items-center gap-2 text-xs text-stone-400">
              <span className="font-bold text-sky-400">{targetModule.category}</span>
              <span>•</span>
              <span className="truncate max-w-[200px] sm:max-w-xs">{targetModule.title}</span>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Sidebar Lesson Selector */}
            <div className="lg:col-span-1 space-y-4">
              <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-5 shadow-xl sticky top-32">
                <div className="flex items-center justify-between mb-4 border-b border-stone-800 pb-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-sky-400" />
                    Module Lessons
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-800 text-stone-400 border border-stone-700">
                    {targetModule.lessons.length} Parts
                  </span>
                </div>

                <div className="space-y-2">
                  {targetModule.lessons.map((lesson, idx) => {
                    const done = completedLessons.includes(lesson.id);
                    const active = activeLessonIdx === idx && !showQuiz;

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => {
                          setActiveLessonIdx(idx);
                          setShowQuiz(false);
                        }}
                        className={`w-full text-left p-3 rounded-xl text-xs transition-all flex items-start justify-between gap-2 ${
                          active
                            ? 'bg-sky-500/20 border border-sky-500/40 text-sky-300 font-bold shadow-lg shadow-sky-500/10'
                            : 'bg-stone-800/40 hover:bg-stone-800 border border-transparent text-stone-300'
                        }`}
                      >
                        <div>
                          <span className="block text-[10px] text-stone-500 uppercase font-semibold mb-0.5">
                            Part {idx + 1}
                          </span>
                          <span className="line-clamp-2 leading-tight">{lesson.title}</span>
                        </div>
                        {done && <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />}
                      </button>
                    );
                  })}
                </div>

                {/* Quiz Navigation Button */}
                {targetQuiz && (
                  <div className="pt-4 mt-4 border-t border-stone-800">
                    <button
                      onClick={() => setShowQuiz(true)}
                      className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                        showQuiz
                          ? 'bg-sky-500 text-stone-950 shadow-lg shadow-sky-500/20'
                          : 'bg-stone-800 hover:bg-stone-700 text-sky-400 border border-sky-500/30'
                      }`}
                    >
                      <HelpCircle className="w-4 h-4" />
                      Take Module Quiz
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Main Lesson Body */}
            <div className="lg:col-span-3">
              {showQuiz && targetQuiz ? (
                <div>
                  <div className="mb-6">
                    <button
                      onClick={() => setShowQuiz(false)}
                      className="text-xs text-sky-400 hover:underline flex items-center gap-1 mb-2 font-medium"
                    >
                      ← Return to Lesson Text
                    </button>
                    <h2 className="text-2xl font-bold text-white">{targetQuiz.moduleTitle} Assessment</h2>
                  </div>
                  <QuizComponent quiz={targetQuiz} />
                </div>
              ) : (
                <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
                  
                  {/* Lesson Header */}
                  <div>
                    <div className="flex items-center gap-3 text-xs text-stone-400 mb-3">
                      <span className="flex items-center gap-1 bg-sky-500/10 border border-sky-500/20 px-3 py-1 rounded-full text-sky-400 font-semibold">
                        <Clock className="w-3.5 h-3.5" /> {currentLesson.duration}
                      </span>
                      <span>•</span>
                      <span>Part {activeLessonIdx + 1} of {targetModule.lessons.length}</span>
                    </div>

                    <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight mb-4">
                      {currentLesson.title}
                    </h1>

                    <p className="text-stone-300 text-sm sm:text-base leading-relaxed p-5 rounded-2xl bg-gradient-to-r from-stone-800/80 to-stone-900 border border-stone-700/60 italic shadow-inner">
                      &quot;{currentLesson.summary}&quot;
                    </p>
                  </div>

                  {/* Key Takeaways Box */}
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-sky-950/40 to-stone-900 border border-sky-500/30 space-y-3 shadow-xl">
                    <h4 className="text-sm font-bold text-sky-400 flex items-center gap-2 uppercase tracking-wider">
                      <Sparkles className="w-4 h-4" /> Core Learning Objectives & Key Takeaways
                    </h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-stone-200">
                      {currentLesson.keyTakeaways.map((point, i) => (
                        <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Refined Formatted Lesson Content */}
                  <div className="pt-2">
                    <FormattedLessonContent content={currentLesson.content} />
                  </div>

                  {/* Real World Case Study Box if available */}
                  {currentLesson.caseStudy && (
                    <div className="p-6 rounded-2xl bg-orange-500/10 border border-orange-500/30 space-y-3 shadow-xl">
                      <h4 className="text-sm font-bold text-orange-400 flex items-center gap-2 uppercase tracking-wider">
                        <AlertTriangle className="w-4 h-4" /> Industry Practical Case Study: {currentLesson.caseStudy.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                        {currentLesson.caseStudy.description}
                      </p>
                      <div className="p-4 rounded-xl bg-stone-950/90 border border-orange-500/20 text-xs sm:text-sm text-orange-300">
                        <span className="font-bold block mb-1 uppercase tracking-wider text-[10px] text-orange-400">Key Practical Lesson:</span>
                        {currentLesson.caseStudy.keyLesson}
                      </div>
                    </div>
                  )}

                  {/* Footer Completion Controls */}
                  <div className="pt-6 border-t border-stone-800 flex items-center justify-between flex-wrap gap-4">
                    <button
                      onClick={handleToggleComplete}
                      className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs transition-all ${
                        isCompleted
                          ? 'bg-teal-500/20 text-teal-400 border border-teal-500/40 hover:bg-teal-500/30'
                          : 'bg-sky-500 hover:bg-sky-400 text-stone-950 shadow-lg shadow-sky-500/20'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      {isCompleted ? 'Marked as Completed' : 'Mark Part as Complete'}
                    </button>

                    <div className="flex items-center gap-3">
                      {activeLessonIdx > 0 && (
                        <button
                          onClick={() => setActiveLessonIdx(activeLessonIdx - 1)}
                          className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-xs font-semibold text-stone-300"
                        >
                          Previous Part
                        </button>
                      )}
                      {activeLessonIdx + 1 < targetModule.lessons.length ? (
                        <button
                          onClick={() => setActiveLessonIdx(activeLessonIdx + 1)}
                          className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-xs font-semibold text-sky-400 border border-sky-500/30"
                        >
                          Next Part <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        targetQuiz && (
                          <button
                            onClick={() => setShowQuiz(true)}
                            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-stone-950 text-xs font-bold shadow-lg shadow-sky-500/20"
                          >
                            Take Module Quiz <HelpCircle className="w-3.5 h-3.5" />
                          </button>
                        )
                      )}
                    </div>
                  </div>

                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </ProtectedRoute>
  );
}
