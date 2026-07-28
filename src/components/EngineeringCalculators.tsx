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
    <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
      <div className="absolute top-[20%] right-[10%] w-80 h-80 bg-blue-500/10 blur-[90px] pointer-events-none rounded-full animate-pulse-glow"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-72 h-72 bg-cyan-500/10 blur-[80px] pointer-events-none rounded-full"></div>

      {/* Header */}
      <div className="flex items-center gap-4 border-b border-white/10 pb-5 relative z-10">
        <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.2)]">
          <Calculator className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-white tracking-tight">Practical Engineering Calculators</h3>
          <p className="text-sm text-slate-300 font-light mt-1">Master the math behind the machines.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 relative z-10">
        <button
          onClick={() => setActiveTab('chipLoad')}
          className={`px-6 py-3 rounded-xl text-xs font-bold transition-all duration-300 ${activeTab === 'chipLoad' ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'bg-white/5 text-slate-400 hover:bg-white/10 border border-white/10'}`}
        >
          CNC Chip Load
        </button>
        <button
          onClick={() => setActiveTab('tac')}
          className={`px-6 py-3 rounded-xl text-xs font-bold transition-all duration-300 ${activeTab === 'tac' ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'bg-white/5 text-slate-400 hover:bg-white/10 border border-white/10'}`}
        >
          Total Area Coverage (TAC)
        </button>
      </div>

      {/* Chip Load Calculator */}
      {activeTab === 'chipLoad' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
          <div className="space-y-6">
            <p className="text-sm text-slate-300 leading-relaxed">
              <strong className="text-white">Chip Load</strong> is the actual physical thickness of the chip carved out by the router bit on each rotation. If it's too small, the bit creates friction and melts plastic.
            </p>
            
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-400 tracking-wider uppercase">Spindle Speed (RPM)</label>
              <input type="range" min="10000" max="24000" step="1000" value={spindleRpm} onChange={(e) => setSpindleRpm(Number(e.target.value))} className="w-full accent-cyan-500 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer" />
              <div className="text-right text-sm font-mono text-cyan-400 font-bold">{spindleRpm.toLocaleString()} RPM</div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-400 tracking-wider uppercase">Feed Rate (Inches Per Minute - IPM)</label>
              <input type="range" min="50" max="400" step="10" value={feedRateIpm} onChange={(e) => setFeedRateIpm(Number(e.target.value))} className="w-full accent-cyan-500 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer" />
              <div className="text-right text-sm font-mono text-cyan-400 font-bold">{feedRateIpm} IPM</div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-400 tracking-wider uppercase">Number of Flutes (Cutting Edges)</label>
              <div className="flex gap-3">
                {[1, 2, 3, 4].map(num => (
                  <button key={num} onClick={() => setFlutes(num)} className={`flex-1 py-3 rounded-xl font-bold transition-all duration-300 ${flutes === num ? 'bg-gradient-to-br from-cyan-400 to-blue-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.4)]' : 'bg-white/5 text-slate-400 hover:bg-white/10 border border-white/10'}`}>
                    {num}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-[#030305]/80 backdrop-blur-md rounded-3xl p-8 border border-white/10 flex flex-col justify-center items-center text-center shadow-inner relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 pointer-events-none"></div>
            <span className="text-xs font-bold tracking-widest text-slate-500 mb-4 uppercase relative z-10">CALCULATED CHIP LOAD</span>
            <div className={`text-6xl font-black font-mono mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] relative z-10 ${chipLoadColor}`}>
              {chipLoad}"
            </div>
            <div className={`px-5 py-2 rounded-full text-xs font-bold mb-8 uppercase tracking-wide relative z-10 border ${chipLoadValue >= 0.006 && chipLoadValue <= 0.012 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-red-500/10 text-red-400 border-red-500/30'}`}>
              {chipLoadStatus}
            </div>
            <p className="text-sm text-slate-300 font-light leading-relaxed relative z-10">
              {chipLoadMessage}
            </p>
          </div>
        </div>
      )}

      {/* TAC Calculator */}
      {activeTab === 'tac' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
          <div className="space-y-6">
            <p className="text-sm text-slate-300 leading-relaxed">
              <strong className="text-white">Total Area Coverage (TAC)</strong> is the combined percentage of Cyan, Magenta, Yellow, and Black ink requested in dark shadow areas of an image.
            </p>
            
            {[{label: 'Cyan (C)', val: c, set: setC, color: 'text-cyan-400'},
              {label: 'Magenta (M)', val: m, set: setM, color: 'text-fuchsia-500'},
              {label: 'Yellow (Y)', val: y, set: setY, color: 'text-yellow-400'},
              {label: 'Black (K)', val: k, set: setK, color: 'text-slate-200'}].map((ink, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-end">
                  <label className={`text-xs font-bold tracking-wider uppercase ${ink.color}`}>{ink.label}</label>
                  <span className={`text-sm font-black font-mono ${ink.color}`}>{ink.val}%</span>
                </div>
                <input type="range" min="0" max="100" step="1" value={ink.val} onChange={(e) => ink.set(Number(e.target.value))} className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer" style={{accentColor: ink.color.includes('cyan') ? '#22d3ee' : ink.color.includes('fuchsia') ? '#d946ef' : ink.color.includes('yellow') ? '#facc15' : '#e2e8f0'}} />
              </div>
            ))}
          </div>

          <div className="bg-[#030305]/80 backdrop-blur-md rounded-3xl p-8 border border-white/10 flex flex-col justify-center items-center text-center shadow-inner relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 pointer-events-none"></div>
            <span className="text-xs font-bold tracking-widest text-slate-500 mb-4 uppercase relative z-10">TOTAL INK VOLUME (TAC)</span>
            <div className={`text-6xl font-black font-mono mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] relative z-10 ${tacColor}`}>
              {tac}%
            </div>
            <div className={`px-5 py-2 rounded-full text-xs font-bold mb-8 uppercase tracking-wide relative z-10 border ${tac <= 300 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-red-500/10 text-red-400 border-red-500/30'}`}>
              {tacStatus}
            </div>
            <p className="text-sm text-slate-300 font-light leading-relaxed relative z-10">
              {tacMessage}
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
