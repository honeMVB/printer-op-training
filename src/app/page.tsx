'use client';

import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';
import ProgressTracker from '@/components/ProgressTracker';
import { MODULES } from '@/data/modulesData';
import { Printer, Sliders, BookOpen, Award, ArrowRight, ShieldCheck, Zap, Layers, Cpu, Scissors, ClipboardCheck, Wrench, CheckCircle2 } from 'lucide-react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      <div className="min-h-screen text-white pb-20 relative">
        
        {/* Hero Section */}
        <section className="relative pt-16 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none animate-float"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-6 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
                <Zap className="w-4 h-4" /> Day-1 Job Readiness Online Course
              </div>

              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-6 leading-[1.1] drop-shadow-2xl">
                Commercial Wide-Format Print & <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent text-glow">
                  CNC Digital Finishing Mastery
                </span>
              </h1>

            <p className="text-slate-300 text-lg max-w-2xl mb-10 leading-relaxed font-light">
              Master industrial wide-format presses (AGFA TAURO, Mimaki), CNC flatbed cutters (Kongsberg, MultiCam), pre-press vector workflows, substrate science, RIP software, and shop floor SOPs.
            </p>

            {/* Progress Bar Widget */}
            <div className="glass-panel rounded-2xl p-6 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <ProgressTracker />
            </div>
          </div>
          
          {/* Custom Bespoke Logo */}
          <div className="hidden md:flex flex-1 justify-center relative">
             <div className="w-72 h-72 relative animate-float">
                <img src="/industrial_logo.png" alt="Industrial Print Logo" className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(6,182,212,0.3)]" />
             </div>
          </div>
        </div>
        </section>

        {/* Quick Action Hub */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link
              href="/simulators"
              className="glass-panel rounded-2xl p-6 hover:glass-panel-active transition-all duration-500 group flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform duration-500">
                  <Sliders className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">Equipment Simulators</h3>
                  <p className="text-xs text-slate-400 mt-1">Press purge & CNC registration</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-2 transition-all duration-300" />
            </Link>

            <Link
              href="/reference"
              className="glass-panel rounded-2xl p-6 hover:glass-panel-active transition-all duration-500 group flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform duration-500">
                  <Printer className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors duration-300">Day-1 Reference Hub</h3>
                  <p className="text-xs text-slate-400 mt-1">Materials, tooling & troubleshooting</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-2 transition-all duration-300" />
            </Link>

            <Link
              href="/certificate"
              className="glass-panel rounded-2xl p-6 hover:glass-panel-active transition-all duration-500 group flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform duration-500">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors duration-300">Mastery Certificate</h3>
                  <p className="text-xs text-slate-400 mt-1">View completion status</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-2 transition-all duration-300" />
            </Link>
          </div>
        </section>

        {/* Modules Grid Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-black text-white tracking-tight">Curriculum Modules</h2>
              <p className="text-sm text-cyan-400 mt-1 font-semibold tracking-wide uppercase">7 Ground-Up to Advanced Training Modules</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MODULES.map((module) => {
              const Icon = ICON_MAP[module.iconName] || BookOpen;
              return (
                <div
                  key={module.id}
                  className="glass-panel rounded-3xl p-8 hover:glass-panel-active transition-all duration-500 flex flex-col justify-between group"
                >
                  <div>
                    {/* Header icon & badge */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className="text-[10px] uppercase font-bold px-3 py-1.5 rounded-full bg-white/5 text-slate-300 border border-white/10 backdrop-blur-md">
                        {module.difficulty}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300 mb-3 leading-tight">
                      {module.title}
                    </h3>
                    <p className="text-sm text-slate-400 mb-8 line-clamp-3 leading-relaxed font-light">
                      {module.shortDesc}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-400 border-t border-white/10 pt-5 mb-5">
                      <span className="flex items-center gap-1.5"><ClipboardCheck className="w-4 h-4"/> {module.estimatedHours}</span>
                      <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4"/> {module.lessons.length} Lessons</span>
                    </div>

                    <Link
                      href={`/modules/${module.id}`}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:scale-[1.02]"
                    >
                      Enter Module
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform" />
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
