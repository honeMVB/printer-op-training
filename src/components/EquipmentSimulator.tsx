'use client';

import { useState } from 'react';
import { Play, CheckCircle2, AlertTriangle, RefreshCw, Gauge, Crosshair, Droplets, ShieldCheck } from 'lucide-react';

export default function EquipmentSimulator() {
  const [activeTab, setActiveTab] = useState<'press' | 'cnc'>('press');

  // Press Purge Simulator State
  const [powerOn, setPowerOn] = useState(false);
  const [purged, setPurged] = useState(false);
  const [wiped, setWiped] = useState(false);
  const [nozzleCheck, setNozzleCheck] = useState<number | null>(null); // percentage jetting

  // CNC Registration Simulator State
  const [laserOn, setLaserOn] = useState(false);
  const [cameraLocked, setCameraLocked] = useState(false);
  const [warpCalculated, setWarpCalculated] = useState(false);
  const [testCutDone, setTestCutDone] = useState(false);

  // Reset Press
  const resetPress = () => {
    setPowerOn(false);
    setPurged(false);
    setWiped(false);
    setNozzleCheck(null);
  };

  // Reset CNC
  const resetCNC = () => {
    setLaserOn(false);
    setCameraLocked(false);
    setWarpCalculated(false);
    setTestCutDone(false);
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
    setNozzleCheck(100);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
      {/* Simulator Switcher Tabs */}
      <div className="flex border-b border-slate-800 pb-4 mb-6">
        <button
          onClick={() => setActiveTab('press')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
            activeTab === 'press'
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Droplets className="w-4 h-4" /> AGFA TAURO / Press Purge Simulator
        </button>
        <button
          onClick={() => setActiveTab('cnc')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ml-3 ${
            activeTab === 'cnc'
              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Crosshair className="w-4 h-4" /> Kongsberg / CNC Target Camera Simulator
        </button>
      </div>

      {/* Tab 1: Press Purge & Nozzle Diagnostic */}
      {activeTab === 'press' && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-lg font-bold text-white">Interactive Press Purge Control Panel</h4>
              <p className="text-xs text-slate-400">Perform the 30-minute start-of-day purging SOP and nozzle diagnostic routine.</p>
            </div>
            <button
              onClick={resetPress}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 border border-slate-700"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reset Controls
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {/* Step 1 */}
            <div className={`p-4 rounded-xl border transition-all ${powerOn ? 'bg-emerald-950/20 border-emerald-500/40' : 'bg-slate-800/60 border-slate-700'}`}>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Step 1</span>
              <h5 className="text-sm font-bold text-white mb-2">Chiller & Lamps Warmup</h5>
              <button
                onClick={() => setPowerOn(true)}
                disabled={powerOn}
                className="w-full py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold text-xs"
              >
                {powerOn ? 'System Ready (20°C)' : 'Power On Press'}
              </button>
            </div>

            {/* Step 2 */}
            <div className={`p-4 rounded-xl border transition-all ${purged ? 'bg-emerald-950/20 border-emerald-500/40' : 'bg-slate-800/60 border-slate-700'}`}>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Step 2</span>
              <h5 className="text-sm font-bold text-white mb-2">3-Sec Pressure Purge</h5>
              <button
                onClick={handlePurge}
                disabled={!powerOn || purged}
                className="w-full py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold text-xs"
              >
                {purged ? 'Flush Completed' : 'Flush Ink Lines'}
              </button>
            </div>

            {/* Step 3 */}
            <div className={`p-4 rounded-xl border transition-all ${wiped ? 'bg-emerald-950/20 border-emerald-500/40' : 'bg-slate-800/60 border-slate-700'}`}>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Step 3</span>
              <h5 className="text-sm font-bold text-white mb-2">Manual Faceplate Wipe</h5>
              <button
                onClick={handleWipe}
                disabled={!purged || wiped}
                className="w-full py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold text-xs"
              >
                {wiped ? 'Wipe Complete' : 'Poly-Cloth Wipe'}
              </button>
            </div>

            {/* Step 4 */}
            <div className={`p-4 rounded-xl border transition-all ${nozzleCheck ? 'bg-emerald-950/20 border-emerald-500/40' : 'bg-slate-800/60 border-slate-700'}`}>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Step 4</span>
              <h5 className="text-sm font-bold text-white mb-2">Nozzle Check Pattern</h5>
              <button
                onClick={handleNozzleTest}
                disabled={!wiped || nozzleCheck !== null}
                className="w-full py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold text-xs"
              >
                {nozzleCheck !== null ? '100% Jetting' : 'Print Grid Check'}
              </button>
            </div>
          </div>

          {/* Visual Press Console Screen */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 relative overflow-hidden font-mono">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-4 border-b border-slate-800 pb-2">
              <span>AGFA TAURO H3300 LED - LIVE CARRIAGE FEED</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                {powerOn ? 'READY' : 'STANDBY'}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-500 block">COOLANT TEMP</span>
                <span className="text-lg font-bold text-cyan-400">{powerOn ? '20.2°C' : '--'}</span>
              </div>
              <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-500 block">INK PRESSURE</span>
                <span className="text-lg font-bold text-cyan-400">{purged ? '4.2 PSI' : '0.0 PSI'}</span>
              </div>
              <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-500 block">VACUUM BED</span>
                <span className="text-lg font-bold text-cyan-400">{powerOn ? '-12.5 kPa' : 'OFF'}</span>
              </div>
              <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-500 block">NOZZLE JETTING</span>
                <span className="text-lg font-bold text-emerald-400">{nozzleCheck ? '100% OK' : 'UNCHECKED'}</span>
              </div>
            </div>

            {nozzleCheck === 100 && (
              <div className="mt-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>PURGE SOP COMPLETE: Press is 100% operational and ready for continuous production printing!</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: CNC Camera Registration */}
      {activeTab === 'cnc' && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-lg font-bold text-white">Interactive CNC Camera Target Alignment Panel</h4>
              <p className="text-xs text-slate-400">Align laser target dot over i-cut registration marks and execute 3D mesh warp calibration.</p>
            </div>
            <button
              onClick={resetCNC}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 border border-slate-700"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reset Controls
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className={`p-4 rounded-xl border transition-all ${laserOn ? 'bg-blue-950/20 border-blue-500/40' : 'bg-slate-800/60 border-slate-700'}`}>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Step 1</span>
              <h5 className="text-sm font-bold text-white mb-2">Laser Pointer Alignment</h5>
              <button
                onClick={() => setLaserOn(true)}
                disabled={laserOn}
                className="w-full py-2 rounded-lg bg-blue-500 hover:bg-blue-400 disabled:opacity-50 text-slate-950 font-bold text-xs"
              >
                {laserOn ? 'Laser On Target Dot' : 'Activate Red Laser'}
              </button>
            </div>

            <div className={`p-4 rounded-xl border transition-all ${cameraLocked ? 'bg-blue-950/20 border-blue-500/40' : 'bg-slate-800/60 border-slate-700'}`}>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Step 2</span>
              <h5 className="text-sm font-bold text-white mb-2">i-cut Camera Scan</h5>
              <button
                onClick={() => setCameraLocked(true)}
                disabled={!laserOn || cameraLocked}
                className="w-full py-2 rounded-lg bg-blue-500 hover:bg-blue-400 disabled:opacity-50 text-slate-950 font-bold text-xs"
              >
                {cameraLocked ? 'Camera Lock (8 Dots)' : 'Scan Reg Targets'}
              </button>
            </div>

            <div className={`p-4 rounded-xl border transition-all ${warpCalculated ? 'bg-blue-950/20 border-blue-500/40' : 'bg-slate-800/60 border-slate-700'}`}>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Step 3</span>
              <h5 className="text-sm font-bold text-white mb-2">3D Mesh Warp Calculation</h5>
              <button
                onClick={() => setWarpCalculated(true)}
                disabled={!cameraLocked || warpCalculated}
                className="w-full py-2 rounded-lg bg-blue-500 hover:bg-blue-400 disabled:opacity-50 text-slate-950 font-bold text-xs"
              >
                {warpCalculated ? 'Warp Adjusted (+0.12%)' : 'Calculate Distortion'}
              </button>
            </div>

            <div className={`p-4 rounded-xl border transition-all ${testCutDone ? 'bg-blue-950/20 border-blue-500/40' : 'bg-slate-800/60 border-slate-700'}`}>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Step 4</span>
              <h5 className="text-sm font-bold text-white mb-2">Execute CNC Cut Path</h5>
              <button
                onClick={() => setTestCutDone(true)}
                disabled={!warpCalculated || testCutDone}
                className="w-full py-2 rounded-lg bg-blue-500 hover:bg-blue-400 disabled:opacity-50 text-slate-950 font-bold text-xs"
              >
                {testCutDone ? 'Cut Completed' : 'Fire Cut Tool'}
              </button>
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 relative overflow-hidden font-mono">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-4 border-b border-slate-800 pb-2">
              <span>KONGSBERG / MULTICAM VISION CAMERA FEED</span>
              <span className="text-blue-400 font-bold">
                {cameraLocked ? 'REGISTRATION LOCKED' : 'SEARCHING TARGETS...'}
              </span>
            </div>

            <div className="relative w-full h-40 bg-slate-900 rounded-lg flex items-center justify-center border border-slate-800 overflow-hidden">
              {/* Target Dot */}
              <div className="w-12 h-12 rounded-full border-4 border-slate-600 flex items-center justify-center relative">
                <div className={`w-4 h-4 rounded-full ${laserOn ? 'bg-red-500 shadow-lg shadow-red-500/50' : 'bg-slate-700'}`}></div>
                {cameraLocked && (
                  <div className="absolute inset-0 border-2 border-dashed border-emerald-400 rounded-full animate-spin"></div>
                )}
              </div>
            </div>

            {testCutDone && (
              <div className="mt-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>CNC CUT SUCCESSFUL: Optical camera alignment verified. Cut contours executed with 0.05mm precision!</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
