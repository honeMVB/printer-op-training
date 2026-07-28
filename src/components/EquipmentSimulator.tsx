'use client';

import { useState } from 'react';
import { Play, CheckCircle2, AlertTriangle, RefreshCw, Gauge, Crosshair, Droplets, ShieldCheck, Zap } from 'lucide-react';

export default function EquipmentSimulator() {
  const [activeTab, setActiveTab] = useState<'press' | 'cnc'>('press');

  // Press Purge Simulator State
  const [powerOn, setPowerOn] = useState(false);
  const [subtankTemp, setSubtankTemp] = useState(25); // degrees C
  const [purged, setPurged] = useState(false);
  const [wiped, setWiped] = useState(false);
  const [cloggedNozzleFixed, setCloggedNozzleFixed] = useState(false);
  const [nozzleCheck, setNozzleCheck] = useState<number | null>(null);

  // CNC Simulator State
  const [laserOn, setLaserOn] = useState(false);
  const [cameraLocked, setCameraLocked] = useState(false);
  const [warpCalculated, setWarpCalculated] = useState(false);
  const [spindleRPM, setSpindleRPM] = useState(22000);
  const [feedRateIPM, setFeedRateIPM] = useState(100); // Too low -> high friction
  const [testCutDone, setTestCutDone] = useState(false);

  // Chip Load Calculation: IPM / (RPM * 1 flute)
  const chipLoad = Number((feedRateIPM / (spindleRPM * 1)).toFixed(4));
  const chipLoadIdeal = chipLoad >= 0.006 && chipLoad <= 0.010;

  const resetPress = () => {
    setPowerOn(false);
    setSubtankTemp(25);
    setPurged(false);
    setWiped(false);
    setCloggedNozzleFixed(false);
    setNozzleCheck(null);
  };

  const resetCNC = () => {
    setLaserOn(false);
    setCameraLocked(false);
    setWarpCalculated(false);
    setSpindleRPM(22000);
    setFeedRateIPM(100);
    setTestCutDone(false);
  };

  const handleWarmup = () => {
    setPowerOn(true);
    setSubtankTemp(45);
  };

  const handlePurge = () => {
    if (!powerOn) return;
    setPurged(true);
  };

  const handleWipe = () => {
    if (!purged) return;
    setWiped(true);
  };

  const handleNozzleTest = () => {
    if (!wiped) return;
    setNozzleCheck(cloggedNozzleFixed ? 100 : 85);
  };

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
      <div className="absolute top-[30%] left-[-10%] w-96 h-96 bg-cyan-500/10 blur-[100px] pointer-events-none rounded-full"></div>
      <div className="absolute top-[60%] right-[-10%] w-96 h-96 bg-blue-600/10 blur-[100px] pointer-events-none rounded-full animate-pulse-glow"></div>
      {/* Simulator Switcher Tabs */}
      <div className="flex border-b border-white/10 pb-4 relative z-10">
        <button
          onClick={() => setActiveTab('press')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs transition-all duration-300 ${
            activeTab === 'press'
              ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.2)]'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
          }`}
        >
          <Droplets className="w-4 h-4" /> AGFA TAURO / UV Press Maintenance Panel
        </button>
        <button
          onClick={() => setActiveTab('cnc')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs transition-all duration-300 ml-4 ${
            activeTab === 'cnc'
              ? 'bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-400 border border-blue-500/40 shadow-[0_0_20px_rgba(59,130,246,0.2)]'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
          }`}
        >
          <Crosshair className="w-4 h-4" /> Kongsberg & MultiCam CNC Operations Panel
        </button>
      </div>

      {/* Tab 1: Press Purge & Nozzle Diagnostic */}
      {activeTab === 'press' && (
        <div className="space-y-6 relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-2xl font-black text-white tracking-tight">Industrial UV Press Operations & Diagnostic Console</h4>
              <p className="text-sm text-slate-300 font-light mt-1">Execute the 30-minute start-of-day purging SOP, diagnose nozzle test grids, and resolve nozzle jet deflections.</p>
            </div>
            <button
              onClick={resetPress}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-xs font-bold text-slate-200 border border-white/10 backdrop-blur-md"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reset Console
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className={`p-5 rounded-xl border transition-all duration-500 ${powerOn ? 'bg-emerald-500/10 border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.15)]' : 'bg-white/5 border-white/10'}`}>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Step 1</span>
              <h5 className="text-xs font-bold text-white mb-3">Sub-tank Warmup (45°C)</h5>
              <button
                onClick={handleWarmup}
                disabled={powerOn}
                className="w-full py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold text-xs transition-colors"
              >
                {powerOn ? 'Temp 45°C (Ready)' : 'Heat Sub-tanks'}
              </button>
            </div>

            <div className={`p-5 rounded-xl border transition-all duration-500 ${purged ? 'bg-emerald-500/10 border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.15)]' : 'bg-white/5 border-white/10'}`}>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Step 2</span>
              <h5 className="text-xs font-bold text-white mb-3">3-Sec Positive Purge</h5>
              <button
                onClick={handlePurge}
                disabled={!powerOn || purged}
                className="w-full py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold text-xs transition-colors"
              >
                {purged ? 'Purge Complete' : 'Flush Positive Valve'}
              </button>
            </div>

            <div className={`p-5 rounded-xl border transition-all duration-500 ${wiped ? 'bg-emerald-500/10 border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.15)]' : 'bg-white/5 border-white/10'}`}>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Step 3</span>
              <h5 className="text-xs font-bold text-white mb-3">Forward Poly-Wipe</h5>
              <button
                onClick={handleWipe}
                disabled={!purged || wiped}
                className="w-full py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold text-xs transition-colors"
              >
                {wiped ? 'Wiped Forward' : 'Solvent Poly-Wipe'}
              </button>
            </div>

            <div className={`p-5 rounded-xl border transition-all duration-500 ${nozzleCheck ? 'bg-emerald-500/10 border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.15)]' : 'bg-white/5 border-white/10'}`}>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Step 4</span>
              <h5 className="text-xs font-bold text-white mb-3">Nozzle Grid Inspection</h5>
              <button
                onClick={handleNozzleTest}
                disabled={!wiped || nozzleCheck !== null}
                className="w-full py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold text-xs transition-colors"
              >
                {nozzleCheck !== null ? `Grid Evaluated (${nozzleCheck}%)` : 'Print Test Pattern'}
              </button>
            </div>
          </div>

          {/* Console Display Screen */}
          <div className="bg-[#030305]/80 backdrop-blur-md border border-white/10 shadow-inner rounded-2xl p-6 sm:p-8 font-mono relative overflow-hidden">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-6 border-b border-white/10 pb-3">
              <span>AGFA TAURO H3300 LED - CARRIAGE HYDRAULICS</span>
              <span className={`font-bold ${powerOn ? 'text-emerald-400 drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]' : 'text-slate-500'}`}>{powerOn ? 'PRESS READY' : 'STANDBY'}</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mb-6">
              <div className="bg-[#05050A] p-4 rounded-xl border border-white/5 shadow-inner">
                <span className="text-[10px] text-slate-500 block mb-1 font-semibold tracking-wider">SUB-TANK TEMP</span>
                <span className={`text-xl font-bold ${powerOn ? 'text-cyan-400 drop-shadow-[0_0_5px_rgba(6,182,212,0.5)]' : 'text-slate-400'}`}>{subtankTemp}°C</span>
              </div>
              <div className="bg-[#05050A] p-4 rounded-xl border border-white/5 shadow-inner">
                <span className="text-[10px] text-slate-500 block mb-1 font-semibold tracking-wider">MENISCUS VACUUM</span>
                <span className={`text-xl font-bold ${powerOn ? 'text-cyan-400 drop-shadow-[0_0_5px_rgba(6,182,212,0.5)]' : 'text-slate-400'}`}>{powerOn ? '-3.5 mbar' : '0.0 mbar'}</span>
              </div>
              <div className="bg-[#05050A] p-4 rounded-xl border border-white/5 shadow-inner">
                <span className="text-[10px] text-slate-500 block mb-1 font-semibold tracking-wider">GANTRY CLEARANCE</span>
                <span className={`text-xl font-bold ${powerOn ? 'text-cyan-400 drop-shadow-[0_0_5px_rgba(6,182,212,0.5)]' : 'text-slate-400'}`}>{powerOn ? '1.8 mm' : 'OFF'}</span>
              </div>
              <div className="bg-[#05050A] p-4 rounded-xl border border-white/5 shadow-inner">
                <span className="text-[10px] text-slate-500 block mb-1 font-semibold tracking-wider">NOZZLE JETTING</span>
                <span className={`text-xl font-bold ${nozzleCheck === 100 ? 'text-emerald-400 drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]' : nozzleCheck === 85 ? 'text-amber-400' : 'text-slate-500'}`}>
                  {nozzleCheck ? `${nozzleCheck}%` : 'UNCHECKED'}
                </span>
              </div>
            </div>

            {/* Targeted Clogged Jet Fix Handler */}
            {nozzleCheck === 85 && !cloggedNozzleFixed && (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span>NOZZLE DIAGNOSTIC: 15% missing jets detected in Cyan Channel 2.</span>
                </div>
                <p className="text-slate-300">Execute targeted localized vacuum flush on Cyan channel to pull out micro-bubbles.</p>
                <button
                  onClick={() => {
                    setCloggedNozzleFixed(true);
                    setNozzleCheck(100);
                  }}
                  className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
                >
                  Execute Targeted Cyan Meniscus Flush
                </button>
              </div>
            )}

            {nozzleCheck === 100 && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>PURGE SOP COMPLETE: All printhead channels jetting 100% solid. Safe for production run!</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: CNC Camera Registration & Chip Load Tuning */}
      {activeTab === 'cnc' && (
        <div className="space-y-6 relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-2xl font-black text-white tracking-tight">Kongsberg & MultiCam CNC Finishing Operations Console</h4>
              <p className="text-sm text-slate-300 font-light mt-1">Align i-cut optical camera targets, apply 3D distortion mesh warping, and calibrate Chip Load feed speeds for Acrylic/ACM.</p>
            </div>
            <button
              onClick={resetCNC}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-xs font-bold text-slate-200 border border-white/10 backdrop-blur-md"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reset CNC Console
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className={`p-5 rounded-xl border transition-all duration-500 ${laserOn ? 'bg-blue-500/10 border-blue-500/40 shadow-[0_0_20px_rgba(59,130,246,0.15)]' : 'bg-white/5 border-white/10'}`}>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Step 1</span>
              <h5 className="text-xs font-bold text-white mb-3">Laser Target Pointer</h5>
              <button
                onClick={() => setLaserOn(true)}
                disabled={laserOn}
                className="w-full py-2.5 rounded-lg bg-blue-500 hover:bg-blue-400 disabled:opacity-50 text-slate-950 font-bold text-xs transition-colors"
              >
                {laserOn ? 'Laser Aligned' : 'Activate Red Laser'}
              </button>
            </div>

            <div className={`p-5 rounded-xl border transition-all duration-500 ${cameraLocked ? 'bg-blue-500/10 border-blue-500/40 shadow-[0_0_20px_rgba(59,130,246,0.15)]' : 'bg-white/5 border-white/10'}`}>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Step 2</span>
              <h5 className="text-xs font-bold text-white mb-3">i-cut Camera Scan</h5>
              <button
                onClick={() => setCameraLocked(true)}
                disabled={!laserOn || cameraLocked}
                className="w-full py-2.5 rounded-lg bg-blue-500 hover:bg-blue-400 disabled:opacity-50 text-slate-950 font-bold text-xs transition-colors"
              >
                {cameraLocked ? 'Camera Lock (8 Dots)' : 'Scan 6mm Reg Marks'}
              </button>
            </div>

            <div className={`p-5 rounded-xl border transition-all duration-500 ${warpCalculated ? 'bg-blue-500/10 border-blue-500/40 shadow-[0_0_20px_rgba(59,130,246,0.15)]' : 'bg-white/5 border-white/10'}`}>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Step 3</span>
              <h5 className="text-xs font-bold text-white mb-3">3D Mesh Distortion</h5>
              <button
                onClick={() => setWarpCalculated(true)}
                disabled={!cameraLocked || warpCalculated}
                className="w-full py-2.5 rounded-lg bg-blue-500 hover:bg-blue-400 disabled:opacity-50 text-slate-950 font-bold text-xs transition-colors"
              >
                {warpCalculated ? 'Warp Adjusted (+0.12%)' : 'Apply Mesh Compensation'}
              </button>
            </div>

            <div className={`p-5 rounded-xl border transition-all duration-500 ${testCutDone ? 'bg-blue-500/10 border-blue-500/40 shadow-[0_0_20px_rgba(59,130,246,0.15)]' : 'bg-white/5 border-white/10'}`}>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Step 4</span>
              <h5 className="text-xs font-bold text-white mb-3">Execute CNC Cut Path</h5>
              <button
                onClick={() => setTestCutDone(true)}
                disabled={!warpCalculated || !chipLoadIdeal || testCutDone}
                className="w-full py-2.5 rounded-lg bg-blue-500 hover:bg-blue-400 disabled:opacity-50 text-slate-950 font-bold text-xs transition-colors"
              >
                {testCutDone ? 'Cut Completed' : 'Fire CNC Spindle'}
              </button>
            </div>
          </div>

          {/* Interactive Router Feed & Speed Chip Load Tuner */}
          <div className="p-8 rounded-3xl bg-[#030305]/80 backdrop-blur-md border border-white/10 space-y-6 shadow-inner">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Gauge className="w-4 h-4 text-blue-400" /> Troubleshooting Scenario: Acrylic Edge Melting
            </h5>
            <p className="text-xs text-slate-300">
              <span className="font-bold text-amber-400">SCENARIO:</span> You are routing 0.25" Cast Acrylic. The cut edges are melting and plastic chips are welding to the bit. The current Chip Load is too low (causing extreme friction). Adjust the Spindle Speed (RPM) and Feed Rate (IPM) to achieve the ideal Chip Load target of ~0.008".
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Spindle Speed (RPM): <span className="text-cyan-400 font-bold">{spindleRPM} RPM</span></label>
                <input
                  type="range"
                  min="12000"
                  max="24000"
                  step="1000"
                  value={spindleRPM}
                  onChange={(e) => setSpindleRPM(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Feed Rate (IPM): <span className="text-cyan-400 font-bold">{feedRateIPM} IPM</span></label>
                <input
                  type="range"
                  min="60"
                  max="250"
                  step="10"
                  value={feedRateIPM}
                  onChange={(e) => setFeedRateIPM(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>

              <div className="p-4 rounded-xl bg-[#05050A] border border-white/5 shadow-inner">
                <span className="text-[10px] font-bold text-slate-500 block mb-2 tracking-wider">CALCULATED CHIP LOAD</span>
                <span className={`text-xl font-black font-mono ${chipLoadIdeal ? 'text-emerald-400 drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]' : 'text-red-400'}`}>
                  {chipLoad}" IPT {chipLoadIdeal ? '(IDEAL)' : chipLoad < 0.006 ? '(FAIL: Friction Heat!)' : '(FAIL: Bit Snapping!)'}
                </span>
              </div>
            </div>

            {!chipLoadIdeal && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                <span className="font-bold block mb-0.5">Chip Load Warning:</span>
                {chipLoad < 0.006
                  ? 'Chip load is too low! High friction will melt plastic onto the router bit. Increase Feed Rate (IPM) or lower Spindle RPM to reach 0.008" target.'
                  : 'Chip load is too high! Excessive force will snap single-flute router bit. Lower Feed Rate or increase Spindle RPM.'}
              </div>
            )}
          </div>

          {testCutDone && (
            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs flex items-center gap-2 font-mono">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>CNC CUT SUCCESSFUL: 3D Camera Warp applied (+0.12%). Single-flute O-flute bit produced polished acrylic cut edges!</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
