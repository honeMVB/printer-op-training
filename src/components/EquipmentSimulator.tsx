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
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
      
      {/* Simulator Switcher Tabs */}
      <div className="flex border-b border-slate-800 pb-4">
        <button
          onClick={() => setActiveTab('press')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all ${
            activeTab === 'press'
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-lg shadow-cyan-500/10'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Droplets className="w-4 h-4" /> AGFA TAURO / UV Press Maintenance Panel
        </button>
        <button
          onClick={() => setActiveTab('cnc')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all ml-3 ${
            activeTab === 'cnc'
              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40 shadow-lg shadow-blue-500/10'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Crosshair className="w-4 h-4" /> Kongsberg & MultiCam CNC Operations Panel
        </button>
      </div>

      {/* Tab 1: Press Purge & Nozzle Diagnostic */}
      {activeTab === 'press' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-bold text-white">Industrial UV Press Operations & Diagnostic Console</h4>
              <p className="text-xs text-slate-400">Execute the 30-minute start-of-day purging SOP, diagnose nozzle test grids, and resolve nozzle jet deflections.</p>
            </div>
            <button
              onClick={resetPress}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 border border-slate-700"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reset Console
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className={`p-4 rounded-xl border transition-all ${powerOn ? 'bg-emerald-950/20 border-emerald-500/40' : 'bg-slate-800/60 border-slate-700'}`}>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Step 1</span>
              <h5 className="text-xs font-bold text-white mb-2">Sub-tank Warmup (45°C)</h5>
              <button
                onClick={handleWarmup}
                disabled={powerOn}
                className="w-full py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold text-xs"
              >
                {powerOn ? 'Temp 45°C (Ready)' : 'Heat Sub-tanks'}
              </button>
            </div>

            <div className={`p-4 rounded-xl border transition-all ${purged ? 'bg-emerald-950/20 border-emerald-500/40' : 'bg-slate-800/60 border-slate-700'}`}>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Step 2</span>
              <h5 className="text-xs font-bold text-white mb-2">3-Sec Positive Purge</h5>
              <button
                onClick={handlePurge}
                disabled={!powerOn || purged}
                className="w-full py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold text-xs"
              >
                {purged ? 'Purge Complete' : 'Flush Positive Valve'}
              </button>
            </div>

            <div className={`p-4 rounded-xl border transition-all ${wiped ? 'bg-emerald-950/20 border-emerald-500/40' : 'bg-slate-800/60 border-slate-700'}`}>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Step 3</span>
              <h5 className="text-xs font-bold text-white mb-2">Forward Poly-Wipe</h5>
              <button
                onClick={handleWipe}
                disabled={!purged || wiped}
                className="w-full py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold text-xs"
              >
                {wiped ? 'Wiped Forward' : 'Solvent Poly-Wipe'}
              </button>
            </div>

            <div className={`p-4 rounded-xl border transition-all ${nozzleCheck ? 'bg-emerald-950/20 border-emerald-500/40' : 'bg-slate-800/60 border-slate-700'}`}>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Step 4</span>
              <h5 className="text-xs font-bold text-white mb-2">Nozzle Grid Inspection</h5>
              <button
                onClick={handleNozzleTest}
                disabled={!wiped || nozzleCheck !== null}
                className="w-full py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold text-xs"
              >
                {nozzleCheck !== null ? `Grid Evaluated (${nozzleCheck}%)` : 'Print Test Pattern'}
              </button>
            </div>
          </div>

          {/* Console Display Screen */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 font-mono relative overflow-hidden">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-4 border-b border-slate-800 pb-2">
              <span>AGFA TAURO H3300 LED - CARRIAGE HYDRAULICS</span>
              <span className="text-emerald-400 font-bold">{powerOn ? 'PRESS READY' : 'STANDBY'}</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center mb-4">
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 block">SUB-TANK TEMP</span>
                <span className="text-base font-bold text-cyan-400">{subtankTemp}°C</span>
              </div>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 block">MENISCUS VACUUM</span>
                <span className="text-base font-bold text-cyan-400">{powerOn ? '-3.5 mbar' : '0.0 mbar'}</span>
              </div>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 block">GANTRY CLEARANCE</span>
                <span className="text-base font-bold text-cyan-400">{powerOn ? '1.8 mm' : 'OFF'}</span>
              </div>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 block">NOZZLE JETTING</span>
                <span className={`text-base font-bold ${nozzleCheck === 100 ? 'text-emerald-400' : nozzleCheck === 85 ? 'text-amber-400' : 'text-slate-500'}`}>
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
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-bold text-white">Kongsberg & MultiCam CNC Finishing Operations Console</h4>
              <p className="text-xs text-slate-400">Align i-cut optical camera targets, apply 3D distortion mesh warping, and calibrate Chip Load feed speeds for Acrylic/ACM.</p>
            </div>
            <button
              onClick={resetCNC}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 border border-slate-700"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reset CNC Console
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className={`p-4 rounded-xl border transition-all ${laserOn ? 'bg-blue-950/20 border-blue-500/40' : 'bg-slate-800/60 border-slate-700'}`}>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Step 1</span>
              <h5 className="text-xs font-bold text-white mb-2">Laser Target Pointer</h5>
              <button
                onClick={() => setLaserOn(true)}
                disabled={laserOn}
                className="w-full py-2 rounded-lg bg-blue-500 hover:bg-blue-400 disabled:opacity-50 text-slate-950 font-bold text-xs"
              >
                {laserOn ? 'Laser Aligned' : 'Activate Red Laser'}
              </button>
            </div>

            <div className={`p-4 rounded-xl border transition-all ${cameraLocked ? 'bg-blue-950/20 border-blue-500/40' : 'bg-slate-800/60 border-slate-700'}`}>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Step 2</span>
              <h5 className="text-xs font-bold text-white mb-2">i-cut Camera Scan</h5>
              <button
                onClick={() => setCameraLocked(true)}
                disabled={!laserOn || cameraLocked}
                className="w-full py-2 rounded-lg bg-blue-500 hover:bg-blue-400 disabled:opacity-50 text-slate-950 font-bold text-xs"
              >
                {cameraLocked ? 'Camera Lock (8 Dots)' : 'Scan 6mm Reg Marks'}
              </button>
            </div>

            <div className={`p-4 rounded-xl border transition-all ${warpCalculated ? 'bg-blue-950/20 border-blue-500/40' : 'bg-slate-800/60 border-slate-700'}`}>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Step 3</span>
              <h5 className="text-xs font-bold text-white mb-2">3D Mesh Distortion</h5>
              <button
                onClick={() => setWarpCalculated(true)}
                disabled={!cameraLocked || warpCalculated}
                className="w-full py-2 rounded-lg bg-blue-500 hover:bg-blue-400 disabled:opacity-50 text-slate-950 font-bold text-xs"
              >
                {warpCalculated ? 'Warp Adjusted (+0.12%)' : 'Apply Mesh Compensation'}
              </button>
            </div>

            <div className={`p-4 rounded-xl border transition-all ${testCutDone ? 'bg-blue-950/20 border-blue-500/40' : 'bg-slate-800/60 border-slate-700'}`}>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Step 4</span>
              <h5 className="text-xs font-bold text-white mb-2">Execute CNC Cut Path</h5>
              <button
                onClick={() => setTestCutDone(true)}
                disabled={!warpCalculated || !chipLoadIdeal || testCutDone}
                className="w-full py-2 rounded-lg bg-blue-500 hover:bg-blue-400 disabled:opacity-50 text-slate-950 font-bold text-xs"
              >
                {testCutDone ? 'Cut Completed' : 'Fire CNC Spindle'}
              </button>
            </div>
          </div>

          {/* Interactive Router Feed & Speed Chip Load Tuner */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
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

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">CALCULATED CHIP LOAD</span>
                <span className={`text-base font-bold font-mono ${chipLoadIdeal ? 'text-emerald-400' : 'text-red-400'}`}>
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
