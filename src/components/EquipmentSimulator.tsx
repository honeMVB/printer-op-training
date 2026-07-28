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
    <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm max-w-5xl mx-auto">
      {/* Simulator Switcher Tabs */}
      <div className="flex border-b border-stone-200 dark:border-stone-800 pb-4">
        <button
          onClick={() => setActiveTab('press')}
          className={`flex items-center gap-2 px-6 py-3 rounded-md font-medium text-sm transition-colors ${
            activeTab === 'press'
              ? 'bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-50'
              : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 hover:bg-stone-50 dark:hover:bg-stone-800 dark:hover:text-stone-200'
          }`}
        >
          <Droplets className="w-4 h-4" /> AGFA TAURO / UV Press Maintenance Panel
        </button>
        <button
          onClick={() => setActiveTab('cnc')}
          className={`flex items-center gap-2 px-6 py-3 rounded-md font-medium text-sm transition-colors ml-4 ${
            activeTab === 'cnc'
              ? 'bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-50'
              : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 hover:bg-stone-50 dark:hover:bg-stone-800 dark:hover:text-stone-200'
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
              <h4 className="text-2xl font-bold text-stone-900 dark:text-stone-50 tracking-tight">Industrial UV Press Operations & Diagnostic Console</h4>
              <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">Execute the 30-minute start-of-day purging SOP, diagnose nozzle test grids, and resolve nozzle jet deflections.</p>
            </div>
            <button
              onClick={resetPress}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 transition-colors text-sm font-medium text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700"
            >
              <RefreshCw className="w-4 h-4" /> Reset Console
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className={`p-4 rounded-lg border transition-all ${powerOn ? 'bg-stone-50 dark:bg-stone-800 border-stone-300 dark:border-stone-600' : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800'}`}>
              <span className="text-[10px] uppercase font-semibold text-stone-500 dark:text-stone-400 block mb-1">Step 1</span>
              <h5 className="text-sm font-semibold text-stone-900 dark:text-stone-100 mb-3">Sub-tank Warmup (45°C)</h5>
              <button
                onClick={handleWarmup}
                disabled={powerOn}
                className="w-full py-2 rounded-md bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:hover:bg-stone-200 dark:text-stone-900 disabled:opacity-50 font-medium text-xs transition-colors"
              >
                {powerOn ? 'Temp 45°C (Ready)' : 'Heat Sub-tanks'}
              </button>
            </div>

            <div className={`p-4 rounded-lg border transition-all ${purged ? 'bg-stone-50 dark:bg-stone-800 border-stone-300 dark:border-stone-600' : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800'}`}>
              <span className="text-[10px] uppercase font-semibold text-stone-500 dark:text-stone-400 block mb-1">Step 2</span>
              <h5 className="text-sm font-semibold text-stone-900 dark:text-stone-100 mb-3">3-Sec Positive Purge</h5>
              <button
                onClick={handlePurge}
                disabled={!powerOn || purged}
                className="w-full py-2 rounded-md bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:hover:bg-stone-200 dark:text-stone-900 disabled:opacity-50 font-medium text-xs transition-colors"
              >
                {purged ? 'Purge Complete' : 'Flush Positive Valve'}
              </button>
            </div>

            <div className={`p-4 rounded-lg border transition-all ${wiped ? 'bg-stone-50 dark:bg-stone-800 border-stone-300 dark:border-stone-600' : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800'}`}>
              <span className="text-[10px] uppercase font-semibold text-stone-500 dark:text-stone-400 block mb-1">Step 3</span>
              <h5 className="text-sm font-semibold text-stone-900 dark:text-stone-100 mb-3">Forward Poly-Wipe</h5>
              <button
                onClick={handleWipe}
                disabled={!purged || wiped}
                className="w-full py-2 rounded-md bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:hover:bg-stone-200 dark:text-stone-900 disabled:opacity-50 font-medium text-xs transition-colors"
              >
                {wiped ? 'Wiped Forward' : 'Solvent Poly-Wipe'}
              </button>
            </div>

            <div className={`p-4 rounded-lg border transition-all ${nozzleCheck ? 'bg-stone-50 dark:bg-stone-800 border-stone-300 dark:border-stone-600' : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800'}`}>
              <span className="text-[10px] uppercase font-semibold text-stone-500 dark:text-stone-400 block mb-1">Step 4</span>
              <h5 className="text-sm font-semibold text-stone-900 dark:text-stone-100 mb-3">Nozzle Grid Inspection</h5>
              <button
                onClick={handleNozzleTest}
                disabled={!wiped || nozzleCheck !== null}
                className="w-full py-2 rounded-md bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:hover:bg-stone-200 dark:text-stone-900 disabled:opacity-50 font-medium text-xs transition-colors"
              >
                {nozzleCheck !== null ? `Grid Evaluated (${nozzleCheck}%)` : 'Print Test Pattern'}
              </button>
            </div>
          </div>

          {/* Console Display Screen */}
          <div className="bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl p-6 sm:p-8 font-mono">
            <div className="flex items-center justify-between text-xs font-medium text-stone-500 dark:text-stone-400 mb-6 border-b border-stone-200 dark:border-stone-800 pb-3">
              <span>AGFA TAURO H3300 LED - CARRIAGE HYDRAULICS</span>
              <span className={`font-semibold ${powerOn ? 'text-teal-600 dark:text-teal-400' : 'text-stone-500 dark:text-stone-400'}`}>{powerOn ? 'PRESS READY' : 'STANDBY'}</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mb-6">
              <div className="bg-white dark:bg-stone-900 p-4 rounded-lg border border-stone-200 dark:border-stone-800">
                <span className="text-[10px] text-stone-500 dark:text-stone-400 block mb-1 font-semibold tracking-wider">SUB-TANK TEMP</span>
                <span className={`text-xl font-bold ${powerOn ? 'text-stone-900 dark:text-stone-100' : 'text-stone-400 dark:text-stone-600'}`}>{subtankTemp}°C</span>
              </div>
              <div className="bg-white dark:bg-stone-900 p-4 rounded-lg border border-stone-200 dark:border-stone-800">
                <span className="text-[10px] text-stone-500 dark:text-stone-400 block mb-1 font-semibold tracking-wider">MENISCUS VACUUM</span>
                <span className={`text-xl font-bold ${powerOn ? 'text-stone-900 dark:text-stone-100' : 'text-stone-400 dark:text-stone-600'}`}>{powerOn ? '-3.5 mbar' : '0.0 mbar'}</span>
              </div>
              <div className="bg-white dark:bg-stone-900 p-4 rounded-lg border border-stone-200 dark:border-stone-800">
                <span className="text-[10px] text-stone-500 dark:text-stone-400 block mb-1 font-semibold tracking-wider">GANTRY CLEARANCE</span>
                <span className={`text-xl font-bold ${powerOn ? 'text-stone-900 dark:text-stone-100' : 'text-stone-400 dark:text-stone-600'}`}>{powerOn ? '1.8 mm' : 'OFF'}</span>
              </div>
              <div className="bg-white dark:bg-stone-900 p-4 rounded-lg border border-stone-200 dark:border-stone-800">
                <span className="text-[10px] text-stone-500 dark:text-stone-400 block mb-1 font-semibold tracking-wider">NOZZLE JETTING</span>
                <span className={`text-xl font-bold ${nozzleCheck === 100 ? 'text-teal-600 dark:text-teal-400' : nozzleCheck === 85 ? 'text-orange-600 dark:text-orange-400' : 'text-stone-400 dark:text-stone-600'}`}>
                  {nozzleCheck ? `${nozzleCheck}%` : 'UNCHECKED'}
                </span>
              </div>
            </div>

            {/* Targeted Clogged Jet Fix Handler */}
            {nozzleCheck === 85 && !cloggedNozzleFixed && (
              <div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900/50 text-orange-800 dark:text-orange-300 text-sm space-y-2">
                <div className="flex items-center gap-2 font-semibold">
                  <AlertTriangle className="w-4 h-4 text-orange-500" />
                  <span>NOZZLE DIAGNOSTIC: 15% missing jets detected in Cyan Channel 2.</span>
                </div>
                <p className="text-orange-700 dark:text-orange-400">Execute targeted localized vacuum flush on Cyan channel to pull out micro-bubbles.</p>
                <button
                  onClick={() => {
                    setCloggedNozzleFixed(true);
                    setNozzleCheck(100);
                  }}
                  className="px-4 py-2 rounded-md bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:hover:bg-stone-200 dark:text-stone-900 font-medium text-xs transition-colors"
                >
                  Execute Targeted Cyan Meniscus Flush
                </button>
              </div>
            )}

            {nozzleCheck === 100 && (
              <div className="p-4 rounded-lg bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900/50 text-teal-800 dark:text-teal-300 text-sm flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
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
              <h4 className="text-2xl font-bold text-stone-900 dark:text-stone-50 tracking-tight">Kongsberg & MultiCam CNC Finishing Operations Console</h4>
              <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">Align i-cut optical camera targets, apply 3D distortion mesh warping, and calibrate Chip Load feed speeds for Acrylic/ACM.</p>
            </div>
            <button
              onClick={resetCNC}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 transition-colors text-sm font-medium text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700"
            >
              <RefreshCw className="w-4 h-4" /> Reset CNC Console
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className={`p-4 rounded-lg border transition-all ${laserOn ? 'bg-stone-50 dark:bg-stone-800 border-stone-300 dark:border-stone-600' : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800'}`}>
              <span className="text-[10px] uppercase font-semibold text-stone-500 dark:text-stone-400 block mb-1">Step 1</span>
              <h5 className="text-sm font-semibold text-stone-900 dark:text-stone-100 mb-3">Laser Target Pointer</h5>
              <button
                onClick={() => setLaserOn(true)}
                disabled={laserOn}
                className="w-full py-2 rounded-md bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:hover:bg-stone-200 dark:text-stone-900 disabled:opacity-50 font-medium text-xs transition-colors"
              >
                {laserOn ? 'Laser Aligned' : 'Activate Red Laser'}
              </button>
            </div>

            <div className={`p-4 rounded-lg border transition-all ${cameraLocked ? 'bg-stone-50 dark:bg-stone-800 border-stone-300 dark:border-stone-600' : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800'}`}>
              <span className="text-[10px] uppercase font-semibold text-stone-500 dark:text-stone-400 block mb-1">Step 2</span>
              <h5 className="text-sm font-semibold text-stone-900 dark:text-stone-100 mb-3">i-cut Camera Scan</h5>
              <button
                onClick={() => setCameraLocked(true)}
                disabled={!laserOn || cameraLocked}
                className="w-full py-2 rounded-md bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:hover:bg-stone-200 dark:text-stone-900 disabled:opacity-50 font-medium text-xs transition-colors"
              >
                {cameraLocked ? 'Camera Lock (8 Dots)' : 'Scan 6mm Reg Marks'}
              </button>
            </div>

            <div className={`p-4 rounded-lg border transition-all ${warpCalculated ? 'bg-stone-50 dark:bg-stone-800 border-stone-300 dark:border-stone-600' : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800'}`}>
              <span className="text-[10px] uppercase font-semibold text-stone-500 dark:text-stone-400 block mb-1">Step 3</span>
              <h5 className="text-sm font-semibold text-stone-900 dark:text-stone-100 mb-3">3D Mesh Distortion</h5>
              <button
                onClick={() => setWarpCalculated(true)}
                disabled={!cameraLocked || warpCalculated}
                className="w-full py-2 rounded-md bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:hover:bg-stone-200 dark:text-stone-900 disabled:opacity-50 font-medium text-xs transition-colors"
              >
                {warpCalculated ? 'Warp Adjusted (+0.12%)' : 'Apply Mesh Compensation'}
              </button>
            </div>

            <div className={`p-4 rounded-lg border transition-all ${testCutDone ? 'bg-stone-50 dark:bg-stone-800 border-stone-300 dark:border-stone-600' : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800'}`}>
              <span className="text-[10px] uppercase font-semibold text-stone-500 dark:text-stone-400 block mb-1">Step 4</span>
              <h5 className="text-sm font-semibold text-stone-900 dark:text-stone-100 mb-3">Execute CNC Cut Path</h5>
              <button
                onClick={() => setTestCutDone(true)}
                disabled={!warpCalculated || !chipLoadIdeal || testCutDone}
                className="w-full py-2 rounded-md bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:hover:bg-stone-200 dark:text-stone-900 disabled:opacity-50 font-medium text-xs transition-colors"
              >
                {testCutDone ? 'Cut Completed' : 'Fire CNC Spindle'}
              </button>
            </div>
          </div>

          {/* Interactive Router Feed & Speed Chip Load Tuner */}
          <div className="p-6 md:p-8 rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 space-y-6">
            <h5 className="text-sm font-semibold text-stone-900 dark:text-stone-100 uppercase tracking-wider flex items-center gap-2">
              <Gauge className="w-5 h-5 text-stone-500 dark:text-stone-400" /> Troubleshooting Scenario: Acrylic Edge Melting
            </h5>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              <span className="font-bold text-orange-600 dark:text-orange-500">SCENARIO:</span> You are routing 0.25&quot; Cast Acrylic. The cut edges are melting and plastic chips are welding to the bit. The current Chip Load is too low (causing extreme friction). Adjust the Spindle Speed (RPM) and Feed Rate (IPM) to achieve the ideal Chip Load target of ~0.008&quot;.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <label className="block text-stone-600 dark:text-stone-400 mb-2 font-medium">Spindle Speed: <span className="text-stone-900 dark:text-stone-100 font-bold">{spindleRPM} RPM</span></label>
                <input
                  type="range"
                  min="12000"
                  max="24000"
                  step="1000"
                  value={spindleRPM}
                  onChange={(e) => setSpindleRPM(Number(e.target.value))}
                  className="w-full h-2 bg-stone-200 dark:bg-stone-700 rounded-lg appearance-none cursor-pointer accent-stone-900 dark:accent-stone-100"
                />
              </div>

              <div>
                <label className="block text-stone-600 dark:text-stone-400 mb-2 font-medium">Feed Rate: <span className="text-stone-900 dark:text-stone-100 font-bold">{feedRateIPM} IPM</span></label>
                <input
                  type="range"
                  min="60"
                  max="250"
                  step="10"
                  value={feedRateIPM}
                  onChange={(e) => setFeedRateIPM(Number(e.target.value))}
                  className="w-full h-2 bg-stone-200 dark:bg-stone-700 rounded-lg appearance-none cursor-pointer accent-stone-900 dark:accent-stone-100"
                />
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
                <span className="text-[10px] font-bold text-stone-500 dark:text-stone-400 block mb-2 tracking-wider">CALCULATED CHIP LOAD</span>
                <span className={`text-xl font-bold font-mono ${chipLoadIdeal ? 'text-teal-600 dark:text-teal-400' : 'text-rose-600 dark:text-rose-400'}`}>
                  {chipLoad}&quot; IPT {chipLoadIdeal ? '(IDEAL)' : chipLoad < 0.006 ? '(FAIL: Friction Heat!)' : '(FAIL: Bit Snapping!)'}
                </span>
              </div>
            </div>

            {!chipLoadIdeal && (
              <div className="p-4 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-400 text-sm">
                <span className="font-semibold block mb-1">Chip Load Warning:</span>
                {chipLoad < 0.006
                  ? 'Chip load is too low! High friction will melt plastic onto the router bit. Increase Feed Rate (IPM) or lower Spindle RPM to reach 0.008" target.'
                  : 'Chip load is too high! Excessive force will snap single-flute router bit. Lower Feed Rate or increase Spindle RPM.'}
              </div>
            )}
          </div>

          {testCutDone && (
            <div className="p-4 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50 text-indigo-800 dark:text-indigo-300 text-sm flex items-center gap-3 font-medium">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>CNC CUT SUCCESSFUL: 3D Camera Warp applied (+0.12%). Single-flute O-flute bit produced polished acrylic cut edges!</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
