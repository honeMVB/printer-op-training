'use client';

import { useState } from 'react';
import { Sliders, CheckCircle2, AlertTriangle, RefreshCw, Gauge, Cpu, BarChart2 } from 'lucide-react';

export default function InteractiveRipConsole() {
  const [passCount, setPassCount] = useState<number>(4);
  const [tacLimit, setTacLimit] = useState<number>(340); // Too high by default
  const [linearized, setLinearized] = useState<boolean>(false);
  const [spotOverride, setSpotOverride] = useState<boolean>(false);

  const isPassValid = passCount >= 6;
  const isTacValid = tacLimit <= 300;
  const isLinValid = linearized === true;
  const isSpotValid = spotOverride === true;

  const allReady = isPassValid && isTacValid && isLinValid && isSpotValid;

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
      <div className="absolute top-[10%] left-[-5%] w-64 h-64 bg-blue-500/10 blur-[80px] pointer-events-none rounded-full"></div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-400 mb-1.5 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">
            <Sliders className="w-4 h-4" /> Workstation 2: Industrial RIP Software Console
          </div>
          <h3 className="text-2xl font-black text-white tracking-tight">Agfa Asanti / Onyx RIP Spooling Station</h3>
          <p className="text-sm text-slate-300 font-light mt-1">Configure print pass modes, Total Area Coverage (TAC) ink limits, linearization LUT curves, and Pantone spot color swatch patch overrides.</p>
        </div>

        <button
          onClick={() => {
            setPassCount(4);
            setTacLimit(340);
            setLinearized(false);
            setSpotOverride(false);
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-xs font-bold text-slate-200 border border-white/10 backdrop-blur-md"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Reset RIP Settings
        </button>
      </div>

      {/* Simulator Interface Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
        
        {/* Left: RIP Console Screen View */}
        <div className="bg-[#030305]/80 backdrop-blur-md border border-white/10 shadow-inner rounded-2xl p-6 font-mono flex flex-col justify-between min-h-[340px]">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400 border-b border-white/10 pb-3 mb-4">
            <span>MEDIA PROFILE: 3mm_SINTRA_UV_CMYK_W.icc</span>
            <span className="text-blue-400">PRESS: AGFA TAURO H3300</span>
          </div>

          <div className="space-y-4 my-4">
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="bg-[#05050A] p-4 rounded-xl border border-white/5 shadow-inner">
                <span className="text-slate-500 block text-[10px]">PASS COUNT MODE</span>
                <span className={`text-sm font-bold ${isPassValid ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {passCount}-Pass ({passCount >= 8 ? 'High Quality' : passCount === 6 ? 'Production' : 'Draft / Banding Risk'})
                </span>
              </div>

              <div className="bg-[#05050A] p-4 rounded-xl border border-white/5 shadow-inner">
                <span className="text-slate-500 block text-[10px] mb-1">TOTAL INK LIMIT (TAC)</span>
                <span className={`text-sm font-bold ${isTacValid ? 'text-emerald-400 drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]' : 'text-red-400'}`}>
                  {tacLimit}% {isTacValid ? '(Cured Solid)' : '(CRITICAL: Wet Pooling!)'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="bg-[#05050A] p-4 rounded-xl border border-white/5 shadow-inner">
                <span className="text-slate-500 block text-[10px]">LINEARIZATION LUT</span>
                <span className={`text-sm font-bold ${isLinValid ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {isLinValid ? 'Linearized (Spectro)' : 'Uncalibrated (Dot Gain Shift)'}
                </span>
              </div>

              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500 block text-[10px]">PANTONE SPOT OVERRIDE</span>
                <span className={`text-sm font-bold ${isSpotValid ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {isSpotValid ? 'PMS 185C Grid Matched' : 'Standard CMYK Fallback'}
                </span>
              </div>
            </div>

            {/* Simulated Dot Gain Graph */}
            <div className="p-4 rounded-xl bg-[#05050A] border border-white/5 text-[10px] shadow-inner">
              <span className="text-slate-400 block mb-1 font-bold">DOT GAIN DENSITY CURVE:</span>
              <div className="w-full bg-slate-950 h-8 rounded relative overflow-hidden flex items-center px-2">
                <div
                  className={`h-2 rounded transition-all ${isLinValid ? 'bg-emerald-500 w-full' : 'bg-amber-500 w-2/3'}`}
                ></div>
                <span className="absolute right-2 text-[9px] text-slate-400">
                  {isLinValid ? '100% Linear Response Curve' : 'High Dot Gain Deviation (+18%)'}
                </span>
              </div>
            </div>
          </div>


          <div className="pt-4 border-t border-white/10 text-xs font-sans">
            {allReady ? (
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-3 backdrop-blur-sm shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span className="font-bold tracking-wide">RIP QUEUE READY: Color linearization, TAC ink limits, and spot overrides spooled!</span>
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-center gap-3 backdrop-blur-sm shadow-[0_0_20px_rgba(245,158,11,0.1)]">
                <AlertTriangle className="w-5 h-5 shrink-0 animate-pulse" />
                <span className="font-semibold tracking-wide">RIP CONFIGURATION INCOMPLETE: Configure settings on right panel before spooling.</span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Interactive RIP Settings */}
        <div className="space-y-4">
          <h4 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2 pb-2">
            <Cpu className="w-4 h-4 text-blue-400" /> RIP Media Controls
          </h4>

          {/* Setting 1: Pass Count Selection */}
          <div className="p-5 rounded-xl bg-white/5 border border-white/10 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wide">1. Select Press Pass Mode</span>
              <span className="text-xs font-bold text-cyan-400">{passCount}-Pass</span>
            </div>
            <div className="flex gap-2">
              {[4, 6, 8, 12].map((num) => (
                <button
                  key={num}
                  onClick={() => setPassCount(num)}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                    passCount === num
                      ? 'bg-blue-500 text-slate-950 shadow-lg shadow-blue-500/20'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {num}-Pass
                </button>
              ))}
            </div>
          </div>

          {/* Setting 2: TAC Ink Limit Slider */}
          <div className="p-5 rounded-xl bg-white/5 border border-white/10 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wide">2. Set TAC Ink Limit (%)</span>
              <span className={`text-xs font-bold ${isTacValid ? 'text-emerald-400' : 'text-red-400'}`}>
                {tacLimit}% {isTacValid ? '(Optimal)' : '(Danger: >300%)'}
              </span>
            </div>
            <input
              type="range"
              min="240"
              max="380"
              step="10"
              value={tacLimit}
              onChange={(e) => setTacLimit(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <p className="text-[10px] text-slate-400 mt-1">Set between 260% and 300% to ensure 100% UV lamp cure without ink pooling.</p>
          </div>

          {/* Setting 3: Execute Spectrophotometer Linearization */}
          <div className="p-5 rounded-xl bg-white/5 border border-white/10 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wide">3. RIP Density Linearization</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${isLinValid ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                {isLinValid ? 'Linearized' : 'Uncalibrated'}
              </span>
            </div>
            <button
              onClick={() => setLinearized(true)}
              disabled={isLinValid}
              className="w-full py-2 rounded-lg bg-blue-500 hover:bg-blue-400 disabled:opacity-50 text-slate-950 font-bold text-xs shadow-lg shadow-blue-500/20"
            >
              {isLinValid ? 'Spectro Curve Applied' : 'Run X-Rite Spectro Linearization'}
            </button>
          </div>

          {/* Setting 4: Pantone Swatch Override */}
          <div className="p-5 rounded-xl bg-white/5 border border-white/10 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wide">4. Pantone PMS 185C Swatch Grid Match</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${isSpotValid ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                {isSpotValid ? 'Matched (ΔE < 1.0)' : 'Default CMYK'}
              </span>
            </div>
            <button
              onClick={() => setSpotOverride(true)}
              disabled={isSpotValid}
              className="w-full py-2 rounded-lg bg-blue-500 hover:bg-blue-400 disabled:opacity-50 text-slate-950 font-bold text-xs shadow-lg shadow-blue-500/20"
            >
              {isSpotValid ? 'Spot Override Saved' : 'Print & Select Swatch Patch Grid'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
