'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MODULES } from '@/data/modulesData';
import { BookOpen, Sliders, Printer, Award, CheckCircle2, ChevronRight } from 'lucide-react';
import { getProgress } from '@/lib/progress';
import { useEffect, useState } from 'react';

export default function Sidebar() {
  const pathname = usePathname();
  const [completedModules, setCompletedModules] = useState<string[]>([]);

  if (pathname === '/login') return null;

  useEffect(() => {
    const updateProgress = () => {
      const p = getProgress();
      setCompletedModules(p.completedModules);
    };

    updateProgress();
    window.addEventListener('storage', updateProgress);
    return () => window.removeEventListener('storage', updateProgress);
  }, [pathname]);

  const mainLinks = [
    { href: '/', label: 'Dashboard', icon: BookOpen },
    { href: '/simulators', label: 'Equipment Simulators', icon: Sliders },
    { href: '/reference', label: 'Day-1 Reference Hub', icon: Printer },
    { href: '/certificate', label: 'Certificate', icon: Award },
  ];

  return (
    <aside className="w-64 flex-shrink-0 border-r border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/50 hidden md:flex flex-col">
      <div className="p-4">
        <h4 className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-3 px-2">Main Menu</h4>
        <nav className="space-y-1">
          {mainLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-stone-200 dark:bg-stone-800 text-stone-900 dark:text-stone-50'
                    : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800/50 hover:text-stone-900 dark:hover:text-stone-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 pt-2 border-t border-stone-200 dark:border-stone-800 flex-1">
        <h4 className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-3 px-2">Curriculum</h4>
        <nav className="space-y-1">
          {MODULES.map((mod) => {
            const isCompleted = completedModules.includes(mod.id);
            const isActive = pathname === `/modules/${mod.id}`;
            return (
              <Link
                key={mod.id}
                href={`/modules/${mod.id}`}
                className={`group flex items-start gap-3 px-3 py-2.5 rounded-md transition-colors ${
                  isActive
                    ? 'bg-stone-200 dark:bg-stone-800 border border-stone-300 dark:border-stone-700'
                    : 'hover:bg-stone-100 dark:hover:bg-stone-800/50 border border-transparent'
                }`}
              >
                <div className="mt-0.5 flex-shrink-0">
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  ) : (
                    <div className={`w-4 h-4 rounded-full border-2 ${isActive ? 'border-stone-500 dark:border-stone-400' : 'border-stone-300 dark:border-stone-600 group-hover:border-stone-400'}`} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${isActive ? 'text-stone-900 dark:text-stone-50' : 'text-stone-700 dark:text-stone-300 group-hover:text-stone-900 dark:group-hover:text-stone-100'}`}>
                    {mod.title}
                  </p>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
