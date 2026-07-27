'use client';

import { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { getProgress, resetAllProgress, UserProgress } from '@/lib/progress';
import { checkServerAuth } from '@/lib/auth';
import { Award, CheckCircle2, ShieldCheck, Printer, RotateCcw, Download } from 'lucide-react';

export default function CertificatePage() {
  const [progress, setProgress] = useState<UserProgress>({
    completedLessons: [],
    completedModules: [],
    quizScores: {},
    bookmarkedLessons: [],
  });
  const [username, setUsername] = useState('Operator');

  useEffect(() => {
    const p = getProgress();
    setProgress(p);

    async function fetchSession() {
      const s = await checkServerAuth();
      if (s) setUsername(s.username);
    }
    fetchSession();
  }, []);

  const totalModules = 7;
  const isEarned = progress.completedModules.length >= totalModules;
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all training progress?')) {
      resetAllProgress();
      window.location.reload();
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-950 text-white pb-20 pt-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Award className="w-4 h-4" /> Certification Verification
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight mb-2">
            Commercial Print & CNC Operator Mastery Certificate
          </h1>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Complete all 7 curriculum modules and pass module assessments to unlock your official Certificate of Completion.
          </p>
        </div>

        {/* Certificate Card Display */}
        <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-4 border-cyan-500/30 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden mb-8">
          
          {/* Decorative Corner Accents */}
          <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-cyan-500"></div>
          <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-cyan-500"></div>
          <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-cyan-500"></div>
          <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-cyan-500"></div>

          <div className="text-center space-y-6 relative z-10">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 mx-auto flex items-center justify-center shadow-xl shadow-cyan-500/20">
              <Printer className="w-10 h-10 text-white" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold block mb-1">
                Certificate of Completion & Professional Competency
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Commercial Printer & CNC Operator
              </h2>
            </div>

            <p className="text-slate-400 text-sm">This is to certify that</p>

            <div className="text-3xl sm:text-4xl font-bold text-cyan-300 capitalize border-b border-cyan-500/30 pb-2 max-w-md mx-auto">
              {username}
            </div>

            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
              has successfully completed all 7 curriculum modules, mastering industrial UV presses (AGFA TAURO, Mimaki), CNC flatbed routers (Kongsberg, MultiCam), pre-press vector art, substrate science, and shop floor SOPs.
            </p>

            <div className="pt-6 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 max-w-xl mx-auto">
              <div>
                <span className="block text-[10px] text-slate-500 uppercase font-bold">Issued Date</span>
                <span className="font-semibold text-slate-300">{today}</span>
              </div>

              <div>
                <span className="block text-[10px] text-slate-500 uppercase font-bold">Verification ID</span>
                <span className="font-semibold text-cyan-400 font-mono">PRINTOP-2026-8942</span>
              </div>

              <div>
                <span className="block text-[10px] text-slate-500 uppercase font-bold">Status</span>
                <span className={`font-bold uppercase ${isEarned ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {isEarned ? 'FULLY CERTIFIED' : 'IN PROGRESS'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Certificate Actions */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-red-400 border border-slate-800 text-xs font-semibold"
          >
            <RotateCcw className="w-4 h-4" /> Reset Training Progress
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              disabled={!isEarned}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20"
            >
              <Download className="w-4 h-4" /> Print / Save Certificate PDF
            </button>
          </div>
        </div>

      </div>
    </ProtectedRoute>
  );
}
