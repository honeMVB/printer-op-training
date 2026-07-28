'use client';

import { useState } from 'react';
import { FileCode, CheckCircle2, AlertTriangle, Layers, Eye, RefreshCw, ArrowRight, Settings } from 'lucide-react';

export default function InteractivePrepressInspector() {
  const [dielineSpotColor, setDielineSpotColor] = useState<string>('Process CMYK Red');
  const [overprintStroke, setOverprintStroke] = useState<boolean>(false);
  const [bleedAmount, setBleedAmount] = useState<number>(0.0);
  const [fontsOutlined, setFontsOutlined] = useState<boolean>(false);
  const [passed, setPassed] = useState<boolean>(false);

  const handleFixSpotColor = () => setDielineSpotColor('CutContour (Spot Color)');
  const handleFixOverprint = () => setOverprintStroke(true);
  const handleFixBleed = () => setBleedAmount(0.25);
  const handleFixFonts = () => setFontsOutlined(true);

  const isSpotValid = dielineSpotColor === 'CutContour (Spot Color)';
  const isOverprintValid = overprintStroke === true;
  const isBleedValid = bleedAmount >= 0.125;
  const isFontsValid = fontsOutlined === true;

  const allValid = isSpotValid && isOverprintValid && isBleedValid && isFontsValid;

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-5%] w-64 h-64 bg-cyan-500/10 blur-[80px] pointer-events-none rounded-full"></div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-400 mb-1.5 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">
            <FileCode className="w-4 h-4" /> Workstation 1: Pre-Press Artwork Inspector
          </div>
          <h3 className="text-2xl font-black text-white tracking-tight">Adobe Illustrator Vector Dieline Audit</h3>
          <p className="text-sm text-slate-300 font-light mt-1">Inspect client incoming vector artwork, fix spot colors, overprint stroke attributes, and bleeds before sending to RIP.</p>
        </div>

        <button
          onClick={() => {
            setDielineSpotColor('Process CMYK Red');
            setOverprintStroke(false);
            setBleedAmount(0.0);
            setFontsOutlined(false);
            setPassed(false);
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-xs font-bold text-slate-200 border border-white/10 backdrop-blur-md"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Reset Client File
        </button>
      </div>

      {/* Simulator Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
        
        {/* Left: Vector Canvas Preview */}
        <div className="bg-[#030305]/80 backdrop-blur-md border border-white/10 shadow-inner rounded-2xl p-6 relative overflow-hidden font-mono flex flex-col justify-between min-h-[320px]">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400 border-b border-white/10 pb-3 mb-4">
            <span>CANVAS_PREVIEW: JOB-8942_Header.ai</span>
            <span className="text-cyan-400">ARTBOARD: 48" x 24"</span>
          </div>

          {/* Graphic Art & Dieline Box Mockup */}
          <div className="relative w-full h-52 bg-[#05050A] rounded-xl border border-white/5 flex items-center justify-center p-4 shadow-inner">
            
            {/* Bleed Area Indicator */}
            <div className={`absolute inset-2 border-2 border-dashed transition-colors ${isBleedValid ? 'border-emerald-500/60 bg-emerald-500/5' : 'border-red-500/40 bg-red-500/5'}`}>
              <span className="absolute top-1 left-1 text-[9px] text-slate-500">
                Bleed Area: {bleedAmount}" {isBleedValid ? '(PASS)' : '(FAIL: Missing Bleed)'}
              </span>
            </div>

            {/* Graphic Artwork */}
            <div className="z-10 text-center space-y-1">
              <span className={`text-lg font-black block tracking-wider ${isFontsValid ? 'text-white font-mono' : 'text-amber-400 font-sans'}`}>
                {isFontsValid ? 'COCA-COLA POP HEADER' : 'COCA-COLA POP HEADER (Live Font)'}
              </span>
              <span className="text-[10px] text-slate-400 block">SUBSTRATE: 3mm EXPANDED PVC</span>
            </div>

            {/* CutContour Dieline Stroke */}
            <div className={`absolute inset-6 border-2 transition-colors ${
              isSpotValid ? 'border-magenta-500 shadow-[0_0_15px_rgba(236,72,153,0.5)]' : 'border-red-500'
            }`} style={{ borderColor: isSpotValid ? '#ec4899' : '#ef4444' }}>
              <span className="absolute -top-3 left-2 px-2 py-0.5 rounded text-[9px] font-bold bg-slate-900 text-pink-400 border border-pink-500/40">
                Dieline: {dielineSpotColor} | Overprint: {overprintStroke ? 'ON' : 'OFF (FAIL)'}
              </span>
            </div>
          </div>

          {/* Prepress Inspection Status Banner */}
          <div className="mt-5 pt-4 border-t border-white/10 text-xs font-sans">
            {allValid ? (
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-3 backdrop-blur-sm shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span className="font-bold tracking-wide">FILE PRE-PRESS AUDIT PASSED: File is 100% compliant for RIP Spooling!</span>
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-center gap-3 backdrop-blur-sm shadow-[0_0_20px_rgba(245,158,11,0.1)]">
                <AlertTriangle className="w-5 h-5 shrink-0 animate-pulse" />
                <span className="font-semibold tracking-wide">PRE-PRESS ISSUES DETECTED: Correct red highlighted attributes on right panel.</span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Illustrator Attributes Inspection Panel */}
        <div className="space-y-4">
          <h4 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2 pb-2">
            <Settings className="w-4 h-4 text-cyan-400" /> Vector Attribute Controls
          </h4>

          {/* Check 1: Dieline Spot Color */}
          <div className={`p-5 rounded-xl border transition-all duration-300 ${isSpotValid ? 'bg-white/5 border-white/10' : 'bg-red-500/10 border-red-500/40 shadow-[0_0_15px_rgba(239,68,68,0.15)]'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wide">1. Cut Dieline Swatch Name</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${isSpotValid ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                {isSpotValid ? 'PASS' : 'FAIL'}
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-3">Dielines must be Spot Colors named `CutContour` so RIPs isolate tool paths.</p>
            {!isSpotValid && (
              <button
                onClick={handleFixSpotColor}
                className="w-full py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20"
              >
                Convert Swatch to Spot `CutContour`
              </button>
            )}
          </div>

          {/* Check 2: Overprint Stroke */}
          <div className={`p-5 rounded-xl border transition-all duration-300 ${isOverprintValid ? 'bg-white/5 border-white/10' : 'bg-red-500/10 border-red-500/40 shadow-[0_0_15px_rgba(239,68,68,0.15)]'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wide">2. Overprint Stroke Attribute</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${isOverprintValid ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                {isOverprintValid ? 'PASS' : 'FAIL'}
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-3">Overprint Stroke prevents RIPs from knocking out white gaps under cut lines.</p>
            {!isOverprintValid && (
              <button
                onClick={handleFixOverprint}
                className="w-full py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20"
              >
                Enable Overprint Stroke in Attributes
              </button>
            )}
          </div>

          {/* Check 3: Bleed Expansion */}
          <div className={`p-5 rounded-xl border transition-all duration-300 ${isBleedValid ? 'bg-white/5 border-white/10' : 'bg-red-500/10 border-red-500/40 shadow-[0_0_15px_rgba(239,68,68,0.15)]'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wide">3. Graphic Exterior Bleed</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${isBleedValid ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                {isBleedValid ? 'PASS' : 'FAIL'}
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-3">Requires 0.25" exterior bleed to prevent unprinted white board edges.</p>
            {!isBleedValid && (
              <button
                onClick={handleFixBleed}
                className="w-full py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20"
              >
                Apply 0.25" Offset Path Bleed
              </button>
            )}
          </div>

          {/* Check 4: Font Outlines */}
          <div className={`p-5 rounded-xl border transition-all duration-300 ${isFontsValid ? 'bg-white/5 border-white/10' : 'bg-red-500/10 border-red-500/40 shadow-[0_0_15px_rgba(239,68,68,0.15)]'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wide">4. Font Vector Outlines</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${isFontsValid ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                {isFontsValid ? 'PASS' : 'FAIL'}
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-3">Live text fonts must be converted to vector paths (Ctrl+Shift+O).</p>
            {!isFontsValid && (
              <button
                onClick={handleFixFonts}
                className="w-full py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20"
              >
                Convert All Fonts to Outlines
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
