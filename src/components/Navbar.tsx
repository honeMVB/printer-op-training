'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logoutWithServer, checkServerAuth } from '@/lib/auth';
import { getProgress } from '@/lib/progress';
import { Printer, BookOpen, LogOut, CheckCircle2, Menu, X, ShieldCheck, Sun, Moon, Sliders, Award } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function Navbar() {
  const pathname = usePathname();
  const [session, setSession] = useState<{ username: string } | null>(null);
  const [completedCount, setCompletedCount] = useState<number>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    async function fetchSession() {
      const s = await checkServerAuth();
      if (s) setSession(s);
    }
    fetchSession();

    const updateProgress = () => {
      const p = getProgress();
      setCompletedCount(p.completedModules.length);
    };

    updateProgress();
    window.addEventListener('storage', updateProgress);
    return () => window.removeEventListener('storage', updateProgress);
  }, [pathname]);

  if (pathname === '/login') return null;

  const handleLogout = async () => {
    await logoutWithServer();
  };

  const navLinks = [
    { href: '/', label: 'Dashboard', icon: BookOpen },
    { href: '/simulators', label: 'Equipment Simulators', icon: Sliders },
    { href: '/reference', label: 'Day-1 Reference Hub', icon: Printer },
    { href: '/certificate', label: 'Certificate', icon: Award },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center transition-transform">
              <Printer className="w-5 h-5 text-zinc-50 dark:text-zinc-900" />
            </div>
            <div>
              <span className="font-bold text-lg text-zinc-900 dark:text-zinc-50 tracking-tight flex items-center gap-1.5">
                PrintOp<span className="text-zinc-500 dark:text-zinc-400">Mastery</span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                  PRO
                </span>
              </span>
            </div>
          </Link>

          {/* User, Progress & Theme */}
          <div className="hidden sm:flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-zinc-700 dark:text-zinc-300 font-medium">{completedCount} / 7 Modules</span>
            </div>

            <div className="flex items-center gap-3 border-l border-zinc-200 dark:border-zinc-800 pl-4">
              {mounted && (
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="p-2 rounded-md text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  title="Toggle Theme"
                >
                  {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
              )}

            {session && (
              <>
                <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="capitalize">{session.username}</span>
                </div>
                <button
                  onClick={handleLogout}
                  title="Logout Session"
                  className="p-2 rounded-md text-zinc-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 px-4 pt-2 pb-4 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium ${
                  active
                    ? 'bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50'
                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                {link.label}
              </Link>
            );
          })}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Completed: {completedCount} / 7 Modules</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-red-400 hover:text-red-300 font-medium"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
