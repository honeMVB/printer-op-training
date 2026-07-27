'use client';

import { useEffect, useState } from 'react';
import { getProgress, UserProgress } from '@/lib/progress';
import { Award, CheckCircle2, BookOpen, Layers } from 'lucide-react';

export default function ProgressTracker() {
  const [progress, setProgress] = useState<UserProgress>({
    completedLessons: [],
    completedModules: [],
    quizScores: {},
    bookmarkedLessons: [],
  });

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  const totalModules = 7;
  const completedModulesCount = progress.completedModules.length;
  const percentage = Math.round((completedModulesCount / totalModules) * 100);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-cyan-400" />
            Your Training Progress
          </h3>
          <p className="text-xs text-slate-400">Track module completions, quiz scores, and day-1 readiness badges.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-2xl font-black text-cyan-400">{percentage}%</span>
            <span className="text-xs text-slate-400 block">Completed</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden mb-6">
        <div
          className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full transition-all duration-500 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      {/* Quick Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
          <span className="text-xs text-slate-400 block mb-1">Modules Done</span>
          <span className="text-lg font-bold text-white">{completedModulesCount} / 7</span>
        </div>
        <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
          <span className="text-xs text-slate-400 block mb-1">Lessons Completed</span>
          <span className="text-lg font-bold text-white">{progress.completedLessons.length}</span>
        </div>
        <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
          <span className="text-xs text-slate-400 block mb-1">Quizzes Passed</span>
          <span className="text-lg font-bold text-emerald-400">
            {Object.values(progress.quizScores).filter(s => s >= 70).length}
          </span>
        </div>
        <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
          <span className="text-xs text-slate-400 block mb-1">Certificate Status</span>
          <span className="text-xs font-bold text-cyan-400 uppercase">
            {percentage === 100 ? 'EARNED' : 'IN PROGRESS'}
          </span>
        </div>
      </div>
    </div>
  );
}
