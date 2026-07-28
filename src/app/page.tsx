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
      <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-50 pb-20 relative">
        
        {/* Hero Section */}
        <section className="relative pt-16 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 text-xs font-bold uppercase tracking-widest mb-6">
                <Zap className="w-4 h-4" /> Day-1 Job Readiness Online Course
              </div>

              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-stone-900 dark:text-stone-50 mb-6 leading-[1.1]">
                Commercial Wide-Format Print & <br className="hidden sm:block" />
                <span className="text-stone-700 dark:text-stone-300">
                  CNC Digital Finishing Mastery
                </span>
              </h1>

            <p className="text-stone-600 dark:text-stone-400 text-lg max-w-2xl mb-10 leading-relaxed font-light">
              Master industrial wide-format presses (AGFA TAURO, Mimaki), CNC flatbed cutters (Kongsberg, MultiCam), pre-press vector workflows, substrate science, RIP software, and shop floor SOPs.
            </p>

            {/* Progress Bar Widget */}
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm rounded-2xl p-6 relative overflow-hidden group">
              <ProgressTracker />
            </div>
          </div>
          
          {/* Custom Bespoke Logo */}
          <div className="hidden md:flex flex-1 justify-center relative">
             <div className="w-72 h-72 relative">
                <img src="/industrial_logo.png" alt="Industrial Print Logo" className="w-full h-full object-contain" />
             </div>
          </div>
        </div>
        </section>

        {/* Quick Action Hub */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link
              href="/simulators"
              className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm hover:border-stone-300 dark:hover:border-stone-700 rounded-2xl p-6 transition-all duration-500 group flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 flex items-center justify-center text-stone-600 dark:text-stone-400 group-hover:scale-110 transition-transform duration-500">
                  <Sliders className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-stone-900 dark:text-stone-50 group-hover:text-stone-700 dark:group-hover:text-stone-300 transition-colors duration-300">Equipment Simulators</h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">Press purge & CNC registration</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-stone-500 dark:text-stone-400 group-hover:text-stone-700 dark:group-hover:text-stone-300 group-hover:translate-x-2 transition-all duration-300" />
            </Link>

            <Link
              href="/reference"
              className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm hover:border-stone-300 dark:hover:border-stone-700 rounded-2xl p-6 transition-all duration-500 group flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 flex items-center justify-center text-stone-600 dark:text-stone-400 group-hover:scale-110 transition-transform duration-500">
                  <Printer className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-stone-900 dark:text-stone-50 group-hover:text-stone-700 dark:group-hover:text-stone-300 transition-colors duration-300">Day-1 Reference Hub</h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">Materials, tooling & troubleshooting</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-stone-500 dark:text-stone-400 group-hover:text-stone-700 dark:group-hover:text-stone-300 group-hover:translate-x-2 transition-all duration-300" />
            </Link>

            <Link
              href="/certificate"
              className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm hover:border-stone-300 dark:hover:border-stone-700 rounded-2xl p-6 transition-all duration-500 group flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 flex items-center justify-center text-stone-600 dark:text-stone-400 group-hover:scale-110 transition-transform duration-500">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-stone-900 dark:text-stone-50 group-hover:text-stone-700 dark:group-hover:text-stone-300 transition-colors duration-300">Mastery Certificate</h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">View completion status</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-stone-500 dark:text-stone-400 group-hover:text-stone-700 dark:group-hover:text-stone-300 group-hover:translate-x-2 transition-all duration-300" />
            </Link>
          </div>
        </section>

        {/* Modules Grid Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-black text-stone-900 dark:text-stone-50 tracking-tight">Curriculum Modules</h2>
              <p className="text-sm text-stone-500 dark:text-stone-400 mt-1 font-semibold tracking-wide uppercase">7 Ground-Up to Advanced Training Modules</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MODULES.map((module) => {
              const Icon = ICON_MAP[module.iconName] || BookOpen;
              return (
                <div
                  key={module.id}
                  className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm hover:border-stone-300 dark:hover:border-stone-700 rounded-3xl p-8 transition-all duration-500 flex flex-col justify-between group"
                >
                  <div>
                    {/* Header icon & badge */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 flex items-center justify-center text-stone-600 dark:text-stone-400 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className="text-[10px] uppercase font-bold px-3 py-1.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700">
                        {module.difficulty}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-stone-900 dark:text-stone-50 group-hover:text-stone-700 dark:group-hover:text-stone-300 transition-colors duration-300 mb-3 leading-tight">
                      {module.title}
                    </h3>
                    <p className="text-sm text-stone-600 dark:text-stone-400 mb-8 line-clamp-3 leading-relaxed font-light">
                      {module.shortDesc}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs font-semibold text-stone-500 dark:text-stone-400 border-t border-stone-200 dark:border-stone-800 pt-5 mb-5">
                      <span className="flex items-center gap-1.5"><ClipboardCheck className="w-4 h-4"/> {module.estimatedHours}</span>
                      <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4"/> {module.lessons.length} Lessons</span>
                    </div>

                    <Link
                      href={`/modules/${module.id}`}
                      className="w-full py-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:hover:bg-stone-200 dark:text-stone-900 text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 group/btn hover:scale-[1.02]"
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
