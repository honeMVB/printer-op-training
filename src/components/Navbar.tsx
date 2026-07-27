'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logoutWithServer, checkServerAuth } from '@/lib/auth';
import { getProgress } from '@/lib/progress';
import { Printer, Sliders, BookOpen, Award, LogOut, CheckCircle2, Menu, X, ShieldCheck } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [session, setSession] = useState<{ username: string } | null>(null);
  const [completedCount, setCompletedCount] = useState<number>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
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
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <Printer className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-lg text-white tracking-wide flex items-center gap-1.5">
                PrintOp<span className="text-cyan-400">Mastery</span>
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  PRO
                </span>
              </span>
              <p className="text-[11px] text-slate-400 font-medium">Commercial Print & CNC Training</p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* User & Progress Badge */}
          <div className="hidden sm:flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="text-slate-300 font-medium">{completedCount} / 7 Modules Done</span>
            </div>

            {session && (
              <div className="flex items-center gap-3 border-l border-slate-800 pl-4">
                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span className="capitalize text-slate-200">{session.username}</span>
                </div>
                <button
                  onClick={handleLogout}
                  title="Logout Session"
                  className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
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
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-4 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium ${
                  active
                    ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                    : 'text-slate-300 hover:bg-slate-800'
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
