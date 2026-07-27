'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import InteractivePrepressInspector from '@/components/InteractivePrepressInspector';
import InteractiveRipConsole from '@/components/InteractiveRipConsole';
import EquipmentSimulator from '@/components/EquipmentSimulator';
import EngineeringCalculators from '@/components/EngineeringCalculators';
import { Sliders, Cpu, Wrench, ShieldCheck } from 'lucide-react';

export default function SimulatorsPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-950 text-white pb-20 pt-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Sliders className="w-4 h-4" /> Interactive Equipment & Software Workstations
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Virtual Production & Software Simulators
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            Practice pre-press dieline auditing, RIP linearization curves, total area coverage ink limiting, press nozzle diagnostics, and CNC chip load tuning in realistic interactive software environments.
          </p>
        </div>

        {/* Workstation 1: Pre-Press Illustrator Dieline Inspector */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-cyan-400 uppercase tracking-wider">
            <Cpu className="w-4 h-4" /> Workstation 1: Pre-Press Vector Dieline Auditor
          </div>
          <InteractivePrepressInspector />
        </section>

        {/* Workstation 2: RIP Software Console */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-blue-400 uppercase tracking-wider">
            <Sliders className="w-4 h-4" /> Workstation 2: Agfa Asanti / Onyx RIP Spooling Station
          </div>
          <InteractiveRipConsole />
        </section>

        {/* Workstation 3: Industrial Press & CNC Finishing Panel */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-emerald-400 uppercase tracking-wider">
            <Wrench className="w-4 h-4" /> Workstation 3: Press Purge & CNC Router Operations Panel
          </div>
          <EquipmentSimulator />
        </section>

        {/* Workstation 4: Engineering Calculators */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-yellow-400 uppercase tracking-wider">
            <Wrench className="w-4 h-4" /> Workstation 4: Practical Engineering Calculators
          </div>
          <EngineeringCalculators />
        </section>

      </div>
    </ProtectedRoute>
  );
}
