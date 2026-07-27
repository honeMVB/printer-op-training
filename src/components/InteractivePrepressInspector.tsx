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
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-1">
            <FileCode className="w-4 h-4" /> Workstation 1: Pre-Press Artwork Inspector
          </div>
          <h3 className="text-xl font-bold text-white">Adobe Illustrator Vector Dieline Audit</h3>
          <p className="text-xs text-slate-400">Inspect client incoming vector artwork, fix spot colors, overprint stroke attributes, and bleeds before sending to RIP.</p>
        </div>

        <button
          onClick={() => {
            setDielineSpotColor('Process CMYK Red');
            setOverprintStroke(false);
            setBleedAmount(0.0);
            setFontsOutlined(false);
            setPassed(false);
          }}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 border border-slate-700"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Reset Client File
        </button>
      </div>

      {/* Simulator Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Vector Canvas Preview */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 relative overflow-hidden font-mono flex flex-col justify-between min-h-[300px]">
          <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2">
            <span>CANVAS PREVIEW: JOB-8942_Header.ai</span>
            <span className="text-cyan-400">ARTBOARD: 48" x 24"</span>
          </div>

          {/* Graphic Art & Dieline Box Mockup */}
          <div className="relative w-full h-48 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-center p-4">
            
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
          <div className="mt-4 pt-3 border-t border-slate-800 text-xs">
            {allValid ? (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>FILE PRE-PRESS AUDIT PASSED: File is 100% compliant for RIP Spooling!</span>
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>PRE-PRESS ISSUES DETECTED: Correct red highlighted attributes on right panel.</span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Illustrator Attributes Inspection Panel */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Settings className="w-4 h-4 text-cyan-400" /> Vector Attribute Controls
          </h4>

          {/* Check 1: Dieline Spot Color */}
          <div className={`p-4 rounded-xl border transition-all ${isSpotValid ? 'bg-slate-900/60 border-slate-800' : 'bg-red-500/10 border-red-500/40'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-200">1. Cut Dieline Swatch Name</span>
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
          <div className={`p-4 rounded-xl border transition-all ${isOverprintValid ? 'bg-slate-900/60 border-slate-800' : 'bg-red-500/10 border-red-500/40'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-200">2. Overprint Stroke Attribute</span>
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
          <div className={`p-4 rounded-xl border transition-all ${isBleedValid ? 'bg-slate-900/60 border-slate-800' : 'bg-red-500/10 border-red-500/40'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-200">3. Graphic Exterior Bleed</span>
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
          <div className={`p-4 rounded-xl border transition-all ${isFontsValid ? 'bg-slate-900/60 border-slate-800' : 'bg-red-500/10 border-red-500/40'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-200">4. Font Vector Outlines</span>
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
