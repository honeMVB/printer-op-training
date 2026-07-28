'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MODULES } from '@/data/modulesData';
import { BookOpen, Sliders, Printer, Award, CheckCircle2, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { getProgress } from '@/lib/progress';
import { useEffect, useState } from 'react';

export default function Sidebar() {
  const pathname = usePathname();
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [collapsed, setCollapsed] = useState(false);

  if (pathname === '/login') return null;

  useEffect(() => {
    // Restore collapsed state from localStorage
    const saved = localStorage.getItem('sidebar-collapsed');
    if (saved === 'true') setCollapsed(true);

    const updateProgress = () => {
      const p = getProgress();
      setCompletedModules(p.completedModules);
    };

    updateProgress();
    window.addEventListener('storage', updateProgress);
    return () => window.removeEventListener('storage', updateProgress);
  }, [pathname]);

  const toggleCollapse = () => {
    const next = !collapsed;
    setCollapsed(next);
    localStorage.setItem('sidebar-collapsed', String(next));
  };

  const mainLinks = [
    { href: '/', label: 'Dashboard', icon: BookOpen },
    { href: '/simulators', label: 'Equipment Simulators', icon: Sliders },
    { href: '/reference', label: 'Day-1 Reference Hub', icon: Printer },
    { href: '/certificate', label: 'Certificate', icon: Award },
  ];

  return (
    <aside
      className={`flex-shrink-0 border-r border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/50 hidden md:flex flex-col sidebar-transition ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Collapse Toggle */}
      <div className={`flex items-center border-b border-stone-200 dark:border-stone-800 px-3 py-3 ${collapsed ? 'justify-center' : 'justify-between'}`}>
        {!collapsed && (
          <h4 className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-1">
            Menu
          </h4>
        )}
        <button
          onClick={toggleCollapse}
          className="p-1.5 rounded-md text-stone-400 dark:text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
        </button>
      </div>

      {/* Main Navigation */}
      <div className="p-2">
        <nav className="space-y-1">
          {mainLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                title={collapsed ? link.label : undefined}
                className={`flex items-center gap-3 rounded-lg text-sm font-medium transition-colors ${
                  collapsed ? 'justify-center px-2 py-2.5' : 'px-3 py-2'
                } ${
                  isActive
                    ? 'bg-stone-200 dark:bg-stone-800 text-stone-900 dark:text-stone-50'
                    : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800/50 hover:text-stone-900 dark:hover:text-stone-200'
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {!collapsed && <span>{link.label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Curriculum Modules */}
      <div className={`flex-1 border-t border-stone-200 dark:border-stone-800 p-2 ${collapsed ? 'overflow-hidden' : ''}`}>
        {!collapsed && (
          <h4 className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-2 px-3 pt-1">
            Curriculum
          </h4>
        )}
        <nav className="space-y-1">
          {MODULES.map((mod) => {
            const isCompleted = completedModules.includes(mod.id);
            const isActive = pathname === `/modules/${mod.id}`;
            return (
              <Link
                key={mod.id}
                href={`/modules/${mod.id}`}
                title={collapsed ? mod.title : undefined}
                className={`group flex items-start gap-3 rounded-lg transition-colors ${
                  collapsed ? 'justify-center px-2 py-2.5' : 'px-3 py-2.5'
                } ${
                  isActive
                    ? 'bg-stone-200 dark:bg-stone-800'
                    : 'hover:bg-stone-100 dark:hover:bg-stone-800/50'
                }`}
              >
                <div className="mt-0.5 flex-shrink-0">
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  ) : (
                    <div className={`w-4 h-4 rounded-full border-2 ${isActive ? 'border-stone-500 dark:border-stone-400' : 'border-stone-300 dark:border-stone-600 group-hover:border-stone-400'}`} />
                  )}
                </div>
                {!collapsed && (
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${isActive ? 'text-stone-900 dark:text-stone-50' : 'text-stone-700 dark:text-stone-300 group-hover:text-stone-900 dark:group-hover:text-stone-100'}`}>
                      {mod.title}
                    </p>
                  </div>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
