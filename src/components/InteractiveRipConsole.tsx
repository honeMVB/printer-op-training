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
    <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 sm:p-8 max-w-5xl mx-auto shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2">
            <Sliders className="w-4 h-4" /> Workstation 2: Industrial RIP Software Console
          </div>
          <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-50 tracking-tight">Agfa Asanti / Onyx RIP Spooling Station</h3>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">Configure print pass modes, Total Area Coverage (TAC) ink limits, linearization LUT curves, and Pantone spot color swatch patch overrides.</p>
        </div>

        <button
          onClick={() => {
            setPassCount(4);
            setTacLimit(340);
            setLinearized(false);
            setSpotOverride(false);
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 transition-colors text-sm font-medium text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700"
        >
          <RefreshCw className="w-4 h-4" /> Reset RIP Settings
        </button>
      </div>

      {/* Simulator Interface Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left: RIP Console Screen View */}
        <div className="bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl p-6 font-mono flex flex-col justify-between min-h-[340px]">
          <div className="flex items-center justify-between text-xs font-medium text-stone-500 dark:text-stone-400 border-b border-stone-200 dark:border-stone-800 pb-3 mb-4">
            <span>MEDIA PROFILE: 3mm_SINTRA_UV_CMYK_W.icc</span>
            <span className="text-stone-700 dark:text-stone-300">PRESS: AGFA TAURO H3300</span>
          </div>

          <div className="space-y-4 my-4">
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="bg-white dark:bg-stone-900 p-4 rounded-lg border border-stone-200 dark:border-stone-800">
                <span className="text-stone-500 block text-[10px] uppercase font-semibold">PASS COUNT MODE</span>
                <span className={`text-sm font-bold mt-1 block ${isPassValid ? 'text-teal-600 dark:text-teal-400' : 'text-orange-600 dark:text-orange-400'}`}>
                  {passCount}-Pass ({passCount >= 8 ? 'High Quality' : passCount === 6 ? 'Production' : 'Draft / Banding Risk'})
                </span>
              </div>

              <div className="bg-white dark:bg-stone-900 p-4 rounded-lg border border-stone-200 dark:border-stone-800">
                <span className="text-stone-500 block text-[10px] uppercase font-semibold mb-1">TOTAL INK LIMIT (TAC)</span>
                <span className={`text-sm font-bold ${isTacValid ? 'text-teal-600 dark:text-teal-400' : 'text-rose-600 dark:text-rose-400'}`}>
                  {tacLimit}% {isTacValid ? '(Cured Solid)' : '(CRITICAL: Wet Pooling!)'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="bg-white dark:bg-stone-900 p-4 rounded-lg border border-stone-200 dark:border-stone-800">
                <span className="text-stone-500 block text-[10px] uppercase font-semibold">LINEARIZATION LUT</span>
                <span className={`text-sm font-bold mt-1 block ${isLinValid ? 'text-teal-600 dark:text-teal-400' : 'text-orange-600 dark:text-orange-400'}`}>
                  {isLinValid ? 'Linearized (Spectro)' : 'Uncalibrated (Dot Gain Shift)'}
                </span>
              </div>

              <div className="bg-white dark:bg-stone-900 p-4 rounded-lg border border-stone-200 dark:border-stone-800">
                <span className="text-stone-500 block text-[10px] uppercase font-semibold">PANTONE SPOT OVERRIDE</span>
                <span className={`text-sm font-bold mt-1 block ${isSpotValid ? 'text-teal-600 dark:text-teal-400' : 'text-orange-600 dark:text-orange-400'}`}>
                  {isSpotValid ? 'PMS 185C Grid Matched' : 'Standard CMYK Fallback'}
                </span>
              </div>
            </div>

            {/* Simulated Dot Gain Graph */}
            <div className="p-4 rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-[10px]">
              <span className="text-stone-500 dark:text-stone-400 block mb-2 font-semibold">DOT GAIN DENSITY CURVE:</span>
              <div className="w-full bg-stone-100 dark:bg-stone-800 h-6 rounded relative overflow-hidden flex items-center px-2">
                <div
                  className={`h-1.5 rounded transition-all ${isLinValid ? 'bg-teal-500 w-full' : 'bg-orange-500 w-2/3'}`}
                ></div>
                <span className="absolute right-2 text-[10px] text-stone-500 font-medium">
                  {isLinValid ? '100% Linear Response Curve' : 'High Dot Gain Deviation (+18%)'}
                </span>
              </div>
            </div>
          </div>


          <div className="pt-4 border-t border-stone-200 dark:border-stone-800 text-sm font-sans">
            {allReady ? (
              <div className="p-3 rounded-lg bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900/50 text-teal-700 dark:text-teal-400 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span className="font-medium">RIP QUEUE READY: Color linearization, TAC ink limits, and spot overrides spooled!</span>
              </div>
            ) : (
              <div className="p-3 rounded-lg bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900/50 text-orange-700 dark:text-orange-400 flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <span className="font-medium">RIP CONFIGURATION INCOMPLETE: Configure settings on right panel before spooling.</span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Interactive RIP Settings */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2 pb-2">
            <Cpu className="w-4 h-4 text-stone-500" /> RIP Media Controls
          </h4>

          {/* Setting 1: Pass Count Selection */}
          <div className="p-4 rounded-lg bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-stone-900 dark:text-stone-100">1. Select Press Pass Mode</span>
              <span className="text-xs font-medium bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 px-2 py-0.5 rounded">{passCount}-Pass</span>
            </div>
            <div className="flex gap-2">
              {[4, 6, 8, 12].map((num) => (
                <button
                  key={num}
                  onClick={() => setPassCount(num)}
                  className={`flex-1 py-2 rounded-md text-xs font-medium transition-colors ${
                    passCount === num
                      ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900'
                      : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50 dark:bg-stone-800 dark:text-stone-300 dark:border-stone-700 dark:hover:bg-stone-700'
                  }`}
                >
                  {num}-Pass
                </button>
              ))}
            </div>
          </div>

          {/* Setting 2: TAC Ink Limit Slider */}
          <div className="p-4 rounded-lg bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-stone-900 dark:text-stone-100">2. Set TAC Ink Limit (%)</span>
              <span className={`text-xs font-medium px-2 py-0.5 rounded ${isTacValid ? 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400' : 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'}`}>
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
              className="w-full h-2 bg-stone-200 dark:bg-stone-800 rounded-lg appearance-none cursor-pointer accent-stone-900 dark:accent-stone-100"
            />
            <p className="text-xs text-stone-500 mt-2">Set between 260% and 300% to ensure 100% UV lamp cure without ink pooling.</p>
          </div>

          {/* Setting 3: Execute Spectrophotometer Linearization */}
          <div className="p-4 rounded-lg bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-stone-900 dark:text-stone-100">3. RIP Density Linearization</span>
              <span className={`text-xs font-medium px-2 py-0.5 rounded ${isLinValid ? 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400' : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'}`}>
                {isLinValid ? 'Linearized' : 'Uncalibrated'}
              </span>
            </div>
            <button
              onClick={() => setLinearized(true)}
              disabled={isLinValid}
              className="w-full py-2 rounded-md bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:hover:bg-stone-200 dark:text-stone-900 font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLinValid ? 'Spectro Curve Applied' : 'Run X-Rite Spectro Linearization'}
            </button>
          </div>

          {/* Setting 4: Pantone Swatch Override */}
          <div className="p-4 rounded-lg bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-stone-900 dark:text-stone-100">4. Pantone PMS 185C Swatch Grid Match</span>
              <span className={`text-xs font-medium px-2 py-0.5 rounded ${isSpotValid ? 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400' : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'}`}>
                {isSpotValid ? 'Matched (ΔE < 1.0)' : 'Default CMYK'}
              </span>
            </div>
            <button
              onClick={() => setSpotOverride(true)}
              disabled={isSpotValid}
              className="w-full py-2 rounded-md bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:hover:bg-stone-200 dark:text-stone-900 font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSpotValid ? 'Spot Override Saved' : 'Print & Select Swatch Patch Grid'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
