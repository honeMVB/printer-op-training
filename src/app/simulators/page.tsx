'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import EquipmentSimulator from '@/components/EquipmentSimulator';
import { Sliders, Zap, ShieldCheck } from 'lucide-react';

export default function SimulatorsPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-950 text-white pb-20 pt-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Zap className="w-4 h-4" /> Hands-On Virtual Equipment Practice
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight mb-2">
            Interactive Machinery Simulators
          </h1>
          <p className="text-slate-400 text-sm max-w-2xl">
            Simulate start-of-day UV press purging, nozzle diagnostic grid patterns, and CNC flatbed optical camera registration alignment before stepping onto the physical shop floor.
          </p>
        </div>

        <EquipmentSimulator />
      </div>
    </ProtectedRoute>
  );
}
