'use client';

import { useState } from 'react';
import { Calculator, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function EngineeringCalculators() {
  const [activeTab, setActiveTab] = useState<'chipLoad' | 'tac'>('chipLoad');

  // Chip Load State
  const [spindleRpm, setSpindleRpm] = useState<number>(18000);
  const [feedRateIpm, setFeedRateIpm] = useState<number>(150);
  const [flutes, setFlutes] = useState<number>(1);

  // TAC State
  const [c, setC] = useState<number>(100);
  const [m, setM] = useState<number>(100);
  const [y, setY] = useState<number>(100);
  const [k, setK] = useState<number>(100);

  // Calculations
  const chipLoad = (feedRateIpm / (spindleRpm * flutes)).toFixed(4);
  const chipLoadValue = parseFloat(chipLoad);
  
  let chipLoadStatus = 'Ideal';
  let chipLoadColor = 'text-teal-400';
  let chipLoadMessage = 'Perfect chip load for clean cutting and chip evacuation.';
  if (chipLoadValue < 0.006) {
    chipLoadStatus = 'Too Low (Friction Risk)';
    chipLoadColor = 'text-rose-400';
    chipLoadMessage = 'DANGER: The bit is rubbing, not cutting. Friction will generate extreme heat, melting the plastic and welding it around the bit (chip welding). Increase Feed Rate (IPM) or decrease RPM.';
  } else if (chipLoadValue > 0.012) {
    chipLoadStatus = 'Too High (Breakage Risk)';
    chipLoadColor = 'text-rose-400';
    chipLoadMessage = 'DANGER: The bit is taking too big of a bite. The physical force will likely snap the router bit or leave jagged, chipped edges on the material. Decrease Feed Rate (IPM) or increase RPM.';
  }

  const tac = c + m + y + k;
  let tacStatus = 'Safe';
  let tacColor = 'text-teal-400';
  let tacMessage = 'TAC is within safe limits. UV lamps will fully cure the ink.';
  if (tac > 300) {
    tacStatus = 'Too High (Curing Failure)';
    tacColor = 'text-rose-400';
    tacMessage = 'DANGER: Laying down >300% total ink on plastics blocks UV light penetration. The bottom layers of ink will remain wet, emit solvent odor, and flake off when cut by the CNC router.';
  }

  return (
    <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-stone-200 dark:border-stone-800 pb-5">
        <div className="p-3 bg-stone-100 dark:bg-stone-800 rounded-xl">
          <Calculator className="w-6 h-6 text-stone-700 dark:text-stone-300" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-50 tracking-tight">Practical Engineering Calculators</h3>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">Master the math behind the machines.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-3">
        <button
          onClick={() => setActiveTab('chipLoad')}
          className={`px-6 py-2.5 rounded-md text-sm font-medium transition-colors ${activeTab === 'chipLoad' ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900' : 'bg-stone-50 text-stone-600 hover:bg-stone-100 border border-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:border-stone-700 dark:hover:bg-stone-700'}`}
        >
          CNC Chip Load
        </button>
        <button
          onClick={() => setActiveTab('tac')}
          className={`px-6 py-2.5 rounded-md text-sm font-medium transition-colors ${activeTab === 'tac' ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900' : 'bg-stone-50 text-stone-600 hover:bg-stone-100 border border-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:border-stone-700 dark:hover:bg-stone-700'}`}
        >
          Total Area Coverage (TAC)
        </button>
      </div>

      {/* Chip Load Calculator */}
      {activeTab === 'chipLoad' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              <strong className="text-stone-900 dark:text-stone-100">Chip Load</strong> is the actual physical thickness of the chip carved out by the router bit on each rotation. If it&apos;s too small, the bit creates friction and melts plastic.
            </p>
            
            <div className="space-y-3">
              <label className="text-xs font-semibold text-stone-500 dark:text-stone-400 tracking-wider uppercase">Spindle Speed (RPM)</label>
              <input type="range" min="10000" max="24000" step="1000" value={spindleRpm} onChange={(e) => setSpindleRpm(Number(e.target.value))} className="w-full h-2 bg-stone-200 dark:bg-stone-800 rounded-lg appearance-none cursor-pointer accent-stone-900 dark:accent-stone-100" />
              <div className="text-right text-sm font-mono text-stone-900 dark:text-stone-100 font-bold">{spindleRpm.toLocaleString()} RPM</div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-semibold text-stone-500 dark:text-stone-400 tracking-wider uppercase">Feed Rate (Inches Per Minute - IPM)</label>
              <input type="range" min="50" max="400" step="10" value={feedRateIpm} onChange={(e) => setFeedRateIpm(Number(e.target.value))} className="w-full h-2 bg-stone-200 dark:bg-stone-800 rounded-lg appearance-none cursor-pointer accent-stone-900 dark:accent-stone-100" />
              <div className="text-right text-sm font-mono text-stone-900 dark:text-stone-100 font-bold">{feedRateIpm} IPM</div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-semibold text-stone-500 dark:text-stone-400 tracking-wider uppercase">Number of Flutes (Cutting Edges)</label>
              <div className="flex gap-3">
                {[1, 2, 3, 4].map(num => (
                  <button key={num} onClick={() => setFlutes(num)} className={`flex-1 py-2.5 rounded-md font-medium transition-colors border ${flutes === num ? 'bg-stone-900 text-white border-stone-900 dark:bg-stone-100 dark:text-stone-900 dark:border-stone-100' : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50 dark:bg-stone-800 dark:text-stone-400 dark:border-stone-700 dark:hover:bg-stone-700'}`}>
                    {num}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-stone-50 dark:bg-stone-950 rounded-2xl p-8 border border-stone-200 dark:border-stone-800 flex flex-col justify-center items-center text-center">
            <span className="text-xs font-semibold tracking-widest text-stone-500 dark:text-stone-400 mb-4 uppercase">CALCULATED CHIP LOAD</span>
            <div className={`text-6xl font-black font-mono mb-6 ${chipLoadColor.replace('text-teal-400', 'text-teal-600 dark:text-teal-400').replace('text-rose-400', 'text-rose-600 dark:text-rose-400')}`}>
              {chipLoad}&quot;
            </div>
            <div className={`px-4 py-1.5 rounded-full text-xs font-semibold mb-8 uppercase tracking-wide border ${chipLoadValue >= 0.006 && chipLoadValue <= 0.012 ? 'bg-teal-50 dark:bg-teal-950/30 text-teal-700 dark:text-teal-400 border-teal-200 dark:border-teal-900/50' : 'bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-900/50'}`}>
              {chipLoadStatus}
            </div>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed max-w-md mx-auto">
              {chipLoadMessage}
            </p>
          </div>
        </div>
      )}

      {/* TAC Calculator */}
      {activeTab === 'tac' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              <strong className="text-stone-900 dark:text-stone-100">Total Area Coverage (TAC)</strong> is the combined percentage of Cyan, Magenta, Yellow, and Black ink requested in dark shadow areas of an image.
            </p>
            
            {[{label: 'Cyan (C)', val: c, set: setC, color: 'text-sky-600 dark:text-sky-400', accent: '#06b6d4'},
              {label: 'Magenta (M)', val: m, set: setM, color: 'text-fuchsia-600 dark:text-fuchsia-400', accent: '#d946ef'},
              {label: 'Yellow (Y)', val: y, set: setY, color: 'text-orange-500 dark:text-orange-400', accent: '#f59e0b'},
              {label: 'Black (K)', val: k, set: setK, color: 'text-stone-800 dark:text-stone-300', accent: '#3f3f46'}].map((ink, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-end">
                  <label className={`text-xs font-semibold tracking-wider uppercase ${ink.color}`}>{ink.label}</label>
                  <span className={`text-sm font-bold font-mono ${ink.color}`}>{ink.val}%</span>
                </div>
                <input type="range" min="0" max="100" step="1" value={ink.val} onChange={(e) => ink.set(Number(e.target.value))} className="w-full h-2 bg-stone-200 dark:bg-stone-800 rounded-lg appearance-none cursor-pointer" style={{accentColor: ink.accent}} />
              </div>
            ))}
          </div>

          <div className="bg-stone-50 dark:bg-stone-950 rounded-2xl p-8 border border-stone-200 dark:border-stone-800 flex flex-col justify-center items-center text-center">
            <span className="text-xs font-semibold tracking-widest text-stone-500 dark:text-stone-400 mb-4 uppercase">TOTAL INK VOLUME (TAC)</span>
            <div className={`text-6xl font-black font-mono mb-6 ${tacColor.replace('text-teal-400', 'text-teal-600 dark:text-teal-400').replace('text-rose-400', 'text-rose-600 dark:text-rose-400')}`}>
              {tac}%
            </div>
            <div className={`px-4 py-1.5 rounded-full text-xs font-semibold mb-8 uppercase tracking-wide border ${tac <= 300 ? 'bg-teal-50 dark:bg-teal-950/30 text-teal-700 dark:text-teal-400 border-teal-200 dark:border-teal-900/50' : 'bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-900/50'}`}>
              {tacStatus}
            </div>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed max-w-md mx-auto">
              {tacMessage}
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
