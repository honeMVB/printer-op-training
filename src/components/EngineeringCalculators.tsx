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
  let chipLoadColor = 'text-emerald-400';
  let chipLoadMessage = 'Perfect chip load for clean cutting and chip evacuation.';
  if (chipLoadValue < 0.006) {
    chipLoadStatus = 'Too Low (Friction Risk)';
    chipLoadColor = 'text-red-400';
    chipLoadMessage = 'DANGER: The bit is rubbing, not cutting. Friction will generate extreme heat, melting the plastic and welding it around the bit (chip welding). Increase Feed Rate (IPM) or decrease RPM.';
  } else if (chipLoadValue > 0.012) {
    chipLoadStatus = 'Too High (Breakage Risk)';
    chipLoadColor = 'text-red-400';
    chipLoadMessage = 'DANGER: The bit is taking too big of a bite. The physical force will likely snap the router bit or leave jagged, chipped edges on the material. Decrease Feed Rate (IPM) or increase RPM.';
  }

  const tac = c + m + y + k;
  let tacStatus = 'Safe';
  let tacColor = 'text-emerald-400';
  let tacMessage = 'TAC is within safe limits. UV lamps will fully cure the ink.';
  if (tac > 300) {
    tacStatus = 'Too High (Curing Failure)';
    tacColor = 'text-red-400';
    tacMessage = 'DANGER: Laying down >300% total ink on plastics blocks UV light penetration. The bottom layers of ink will remain wet, emit solvent odor, and flake off when cut by the CNC router.';
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-3 bg-blue-500/20 rounded-xl">
          <Calculator className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Practical Engineering Calculators</h3>
          <p className="text-xs text-slate-400">Master the math behind the machines.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('chipLoad')}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${activeTab === 'chipLoad' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
        >
          CNC Chip Load
        </button>
        <button
          onClick={() => setActiveTab('tac')}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${activeTab === 'tac' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
        >
          Total Area Coverage (TAC)
        </button>
      </div>

      {/* Chip Load Calculator */}
      {activeTab === 'chipLoad' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <p className="text-sm text-slate-300 mb-6">
              **Chip Load** is the actual physical thickness of the chip carved out by the router bit on each rotation. If it's too small, the bit creates friction and melts plastic.
            </p>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400">Spindle Speed (RPM)</label>
              <input type="range" min="10000" max="24000" step="1000" value={spindleRpm} onChange={(e) => setSpindleRpm(Number(e.target.value))} className="w-full accent-blue-500" />
              <div className="text-right text-sm font-mono text-blue-400">{spindleRpm.toLocaleString()} RPM</div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400">Feed Rate (Inches Per Minute - IPM)</label>
              <input type="range" min="50" max="400" step="10" value={feedRateIpm} onChange={(e) => setFeedRateIpm(Number(e.target.value))} className="w-full accent-blue-500" />
              <div className="text-right text-sm font-mono text-blue-400">{feedRateIpm} IPM</div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400">Number of Flutes (Cutting Edges)</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4].map(num => (
                  <button key={num} onClick={() => setFlutes(num)} className={`flex-1 py-2 rounded-lg font-bold ${flutes === num ? 'bg-cyan-500 text-slate-900' : 'bg-slate-800 text-slate-400'}`}>
                    {num}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 flex flex-col justify-center items-center text-center">
            <span className="text-xs text-slate-500 mb-2">CALCULATED CHIP LOAD</span>
            <div className={`text-5xl font-mono font-bold mb-4 ${chipLoadColor}`}>
              {chipLoad}"
            </div>
            <div className={`px-4 py-1 rounded-full text-xs font-bold mb-6 ${chipLoadValue >= 0.006 && chipLoadValue <= 0.012 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
              {chipLoadStatus}
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              {chipLoadMessage}
            </p>
          </div>
        </div>
      )}

      {/* TAC Calculator */}
      {activeTab === 'tac' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <p className="text-sm text-slate-300 mb-6">
              **Total Area Coverage (TAC)** is the combined percentage of Cyan, Magenta, Yellow, and Black ink requested in dark shadow areas of an image.
            </p>
            
            {[{label: 'Cyan (C)', val: c, set: setC, color: 'text-cyan-400'},
              {label: 'Magenta (M)', val: m, set: setM, color: 'text-fuchsia-500'},
              {label: 'Yellow (Y)', val: y, set: setY, color: 'text-yellow-400'},
              {label: 'Black (K)', val: k, set: setK, color: 'text-slate-200'}].map((ink, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between">
                  <label className={`text-xs font-bold ${ink.color}`}>{ink.label}</label>
                  <span className={`text-xs font-mono ${ink.color}`}>{ink.val}%</span>
                </div>
                <input type="range" min="0" max="100" step="1" value={ink.val} onChange={(e) => ink.set(Number(e.target.value))} className="w-full" />
              </div>
            ))}
          </div>

          <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 flex flex-col justify-center items-center text-center">
            <span className="text-xs text-slate-500 mb-2">TOTAL INK VOLUME (TAC)</span>
            <div className={`text-5xl font-mono font-bold mb-4 ${tacColor}`}>
              {tac}%
            </div>
            <div className={`px-4 py-1 rounded-full text-xs font-bold mb-6 ${tac <= 300 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
              {tacStatus}
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              {tacMessage}
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
