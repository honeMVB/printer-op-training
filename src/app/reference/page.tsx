'use client';

import { useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { MATERIAL_REFERENCES, TROUBLESHOOTING_GUIDE, MaterialReference, TroubleshootingItem } from '@/data/referenceData';
import { Search, Printer, Sliders, AlertTriangle, Layers, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function ReferencePage() {
  const [activeTab, setActiveTab] = useState<'materials' | 'trouble'>('materials');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMaterials = MATERIAL_REFERENCES.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.cuttingTool.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTroubleshooting = TROUBLESHOOTING_GUIDE.filter(
    (t) =>
      t.issue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.symptom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.probableCause.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-50 pb-20 pt-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Printer className="w-4 h-4" /> Day-1 Job Survival Cheat Sheet
          </div>
          <h1 className="text-3xl font-black text-stone-900 dark:text-stone-50 tracking-tight mb-2">
            Day-1 Reference Hub & Search Engine
          </h1>
          <p className="text-stone-600 dark:text-stone-400 text-sm max-w-2xl">
            Search material cutting parameters, spindle RPM/IPM feed rates, dyne requirements, and instant troubleshooting SOPs for press and CNC operations.
          </p>
        </div>

        {/* Controls: Search Bar & Tab Switcher */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-4 rounded-2xl shadow-sm">
          <div className="relative w-full sm:w-96">
            <Search className="w-5 h-5 text-stone-500 dark:text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search materials, tools, or errors..."
              className="w-full bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl pl-11 pr-4 py-2.5 text-sm text-stone-900 dark:text-stone-50 placeholder-stone-500 focus:outline-none focus:border-stone-400 dark:focus:border-stone-600 focus:ring-1 focus:ring-stone-400 dark:focus:ring-stone-600 transition-all"
            />
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('materials')}
              className={`flex-1 sm:flex-none px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 border ${
                activeTab === 'materials'
                  ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-sm border-transparent'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 border-stone-200 dark:border-stone-700'
              }`}
            >
              <Layers className="w-4 h-4" /> Substrate & Tooling Database
            </button>
            <button
              onClick={() => setActiveTab('trouble')}
              className={`flex-1 sm:flex-none px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 border ${
                activeTab === 'trouble'
                  ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-sm border-transparent'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 border-stone-200 dark:border-stone-700'
              }`}
            >
              <AlertTriangle className="w-4 h-4" /> Emergency Troubleshooting Finder
            </button>
          </div>
        </div>

        {/* Tab 1: Substrates & Tooling Finder */}
        {activeTab === 'materials' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMaterials.map((item, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 hover:border-stone-300 dark:hover:border-stone-700 transition-all shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700">
                      {item.category}
                    </span>
                    <span className="text-xs text-stone-500 dark:text-stone-400 font-semibold">{item.thickness}</span>
                  </div>

                  <h3 className="text-lg font-bold text-stone-900 dark:text-stone-50 mb-4">{item.name}</h3>

                  <div className="space-y-2 text-xs text-stone-600 dark:text-stone-300 mb-4">
                    <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800">
                      <span className="text-stone-500 dark:text-stone-400 block text-[10px] font-bold uppercase mb-0.5">Recommended Tool</span>
                      <span className="font-semibold text-stone-900 dark:text-stone-100">{item.cuttingTool}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800">
                        <span className="text-stone-500 dark:text-stone-400 block text-[10px] font-bold uppercase mb-0.5">Spindle Speed</span>
                        <span className="font-semibold text-stone-900 dark:text-stone-100">{item.spindleRPM}</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800">
                        <span className="text-stone-500 dark:text-stone-400 block text-[10px] font-bold uppercase mb-0.5">Feed Rate</span>
                        <span className="font-semibold text-stone-900 dark:text-stone-100">{item.feedRateIPM}</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800">
                      <span className="text-stone-500 dark:text-stone-400 block text-[10px] font-bold uppercase mb-0.5">Dyne Level Needed</span>
                      <span className="font-semibold text-stone-900 dark:text-stone-100">{item.dyneRequired}</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-600 dark:text-stone-400">
                  <span className="font-bold text-stone-800 dark:text-stone-200 block mb-0.5">Pro Operator Note:</span>
                  {item.specialNotes}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Emergency Troubleshooting Finder */}
        {activeTab === 'trouble' && (
          <div className="space-y-4">
            {filteredTroubleshooting.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 dark:border-stone-800 pb-3 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] uppercase font-bold px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800">
                      {item.category} Defect
                    </span>
                    <h3 className="text-lg font-bold text-stone-900 dark:text-stone-50">{item.issue}</h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-xs">
                  <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800">
                    <span className="text-stone-500 dark:text-stone-400 font-bold block mb-1 uppercase text-[10px]">Symptom Description</span>
                    <p className="text-stone-700 dark:text-stone-300">{item.symptom}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800">
                    <span className="text-stone-500 dark:text-stone-400 font-bold block mb-1 uppercase text-[10px]">Probable Root Cause</span>
                    <p className="text-amber-700 dark:text-amber-400">{item.probableCause}</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-700 dark:text-stone-300">
                  <span className="font-bold text-stone-800 dark:text-stone-200 block mb-1 uppercase text-[10px]">Corrective SOP Solution</span>
                  <p className="leading-relaxed font-mono">{item.solutionSOP}</p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </ProtectedRoute>
  );
}
