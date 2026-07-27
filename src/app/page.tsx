'use client';

import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';
import ProgressTracker from '@/components/ProgressTracker';
import { MODULES } from '@/data/modulesData';
import { Printer, Sliders, BookOpen, Award, ArrowRight, ShieldCheck, Zap, Layers, Cpu, Scissors, ClipboardCheck, Wrench, CheckCircle2 } from 'lucide-react';

const ICON_MAP: Record<string, any> = {
  Printer,
  Layers,
  FileCode: BookOpen,
  Cpu,
  Scissors,
  ClipboardCheck,
  Tool: Wrench,
};

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-950 text-white pb-20">
        
        {/* Hero Section */}
        <section className="relative pt-12 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <Zap className="w-4 h-4" /> Day-1 Job Readiness Online Course
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4 leading-tight">
              Commercial Wide-Format Print & <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                CNC Digital Finishing Mastery
              </span>
            </h1>

            <p className="text-slate-400 text-base sm:text-lg max-w-3xl mb-8 leading-relaxed">
              Master industrial wide-format presses (AGFA TAURO, Mimaki), CNC flatbed cutters (Kongsberg, MultiCam), pre-press vector workflows, substrate science, RIP software, and shop floor SOPs.
            </p>

            {/* Progress Bar Widget */}
            <ProgressTracker />
          </div>
        </section>

        {/* Quick Action Hub */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/simulators"
              className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-all group flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                  <Sliders className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">Equipment Simulators</h3>
                  <p className="text-xs text-slate-400">Press purge & CNC registration</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
            </Link>

            <Link
              href="/reference"
              className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-900/60 border border-slate-800 hover:border-blue-500/40 transition-all group flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                  <Printer className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">Day-1 Reference Hub</h3>
                  <p className="text-xs text-slate-400">Materials, tooling & troubleshooting</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
            </Link>

            <Link
              href="/certificate"
              className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition-all group flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">Mastery Certificate</h3>
                  <p className="text-xs text-slate-400">View completion status</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
            </Link>
          </div>
        </section>

        {/* Modules Grid Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white">Curriculum Modules</h2>
              <p className="text-xs text-slate-400">7 Ground-Up to Advanced Training Modules</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MODULES.map((module) => {
              const Icon = ICON_MAP[module.iconName] || BookOpen;
              return (
                <div
                  key={module.id}
                  className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500/40 transition-all flex flex-col justify-between group shadow-xl"
                >
                  <div>
                    {/* Header icon & badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] uppercase font-bold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                        {module.difficulty}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors mb-2">
                      {module.title}
                    </h3>
                    <p className="text-xs text-slate-400 mb-6 line-clamp-2 leading-relaxed">
                      {module.shortDesc}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80 pt-4 mb-4">
                      <span>Est. Time: {module.estimatedHours}</span>
                      <span>{module.lessons.length} Detailed Lessons</span>
                    </div>

                    <Link
                      href={`/modules/${module.id}`}
                      className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-2 group/btn"
                    >
                      Start Module
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </ProtectedRoute>
  );
}
