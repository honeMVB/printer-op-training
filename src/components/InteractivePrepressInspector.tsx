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
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
            <FileCode className="w-4 h-4" /> Workstation 1: Pre-Press Artwork Inspector
          </div>
          <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">Adobe Illustrator Vector Dieline Audit</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">Inspect client incoming vector artwork, fix spot colors, overprint stroke attributes, and bleeds before sending to RIP.</p>
        </div>

        <button
          onClick={() => {
            setDielineSpotColor('Process CMYK Red');
            setOverprintStroke(false);
            setBleedAmount(0.0);
            setFontsOutlined(false);
            setPassed(false);
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 transition-colors text-sm font-medium text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700"
        >
          <RefreshCw className="w-4 h-4" /> Reset Client File
        </button>
      </div>

      {/* Simulator Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left: Vector Canvas Preview */}
        <div className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 font-mono flex flex-col justify-between min-h-[320px]">
          <div className="flex items-center justify-between text-xs font-medium text-zinc-500 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-800 pb-3 mb-4">
            <span>CANVAS_PREVIEW: JOB-8942_Header.ai</span>
            <span className="text-zinc-700 dark:text-zinc-300">ARTBOARD: 48&quot; x 24&quot;</span>
          </div>

          {/* Graphic Art & Dieline Box Mockup */}
          <div className="relative w-full h-52 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 flex items-center justify-center p-4">
            
            {/* Bleed Area Indicator */}
            <div className={`absolute inset-2 border-2 border-dashed transition-colors ${isBleedValid ? 'border-emerald-500/50 bg-emerald-50 dark:bg-emerald-500/10' : 'border-red-500/40 bg-red-50 dark:bg-red-500/10'}`}>
              <span className="absolute top-1 left-1 text-[10px] text-zinc-500 dark:text-zinc-400">
                Bleed Area: {bleedAmount}&quot; {isBleedValid ? '(PASS)' : '(FAIL: Missing Bleed)'}
              </span>
            </div>

            {/* Graphic Artwork */}
            <div className="z-10 text-center space-y-1">
              <span className={`text-lg font-bold block tracking-wide ${isFontsValid ? 'text-zinc-900 dark:text-zinc-100 font-mono' : 'text-amber-600 dark:text-amber-400 font-sans'}`}>
                {isFontsValid ? 'COCA-COLA POP HEADER' : 'COCA-COLA POP HEADER (Live Font)'}
              </span>
              <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block">SUBSTRATE: 3mm EXPANDED PVC</span>
            </div>

            {/* CutContour Dieline Stroke */}
            <div className={`absolute inset-6 border-2 transition-colors ${
              isSpotValid ? 'border-fuchsia-500' : 'border-red-500'
            }`}>
              <span className="absolute -top-3 left-2 px-2 py-0.5 rounded text-[10px] font-medium bg-white dark:bg-zinc-950 text-fuchsia-600 dark:text-fuchsia-400 border border-zinc-200 dark:border-zinc-800">
                Dieline: {dielineSpotColor} | Overprint: {overprintStroke ? 'ON' : 'OFF (FAIL)'}
              </span>
            </div>
          </div>

          {/* Prepress Inspection Status Banner */}
          <div className="mt-5 pt-4 border-t border-zinc-200 dark:border-zinc-800 text-sm font-sans">
            {allValid ? (
              <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 text-emerald-700 dark:text-emerald-400 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span className="font-medium">FILE PRE-PRESS AUDIT PASSED: File is 100% compliant for RIP Spooling!</span>
              </div>
            ) : (
              <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-amber-700 dark:text-amber-400 flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <span className="font-medium">PRE-PRESS ISSUES DETECTED: Correct red highlighted attributes on right panel.</span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Illustrator Attributes Inspection Panel */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 pb-2">
            <Settings className="w-4 h-4 text-zinc-500" /> Vector Attribute Controls
          </h4>

          {/* Check 1: Dieline Spot Color */}
          <div className={`p-4 rounded-lg border transition-all ${isSpotValid ? 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800' : 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900/50'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">1. Cut Dieline Swatch Name</span>
              <span className={`text-xs font-medium px-2 py-0.5 rounded ${isSpotValid ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                {isSpotValid ? 'PASS' : 'FAIL'}
              </span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">Dielines must be Spot Colors named `CutContour` so RIPs isolate tool paths.</p>
            {!isSpotValid && (
              <button
                onClick={handleFixSpotColor}
                className="w-full py-2 rounded-md bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 font-medium text-sm transition-colors"
              >
                Convert Swatch to Spot `CutContour`
              </button>
            )}
          </div>

          {/* Check 2: Overprint Stroke */}
          <div className={`p-4 rounded-lg border transition-all ${isOverprintValid ? 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800' : 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900/50'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">2. Overprint Stroke Attribute</span>
              <span className={`text-xs font-medium px-2 py-0.5 rounded ${isOverprintValid ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                {isOverprintValid ? 'PASS' : 'FAIL'}
              </span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">Overprint Stroke prevents RIPs from knocking out white gaps under cut lines.</p>
            {!isOverprintValid && (
              <button
                onClick={handleFixOverprint}
                className="w-full py-2 rounded-md bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 font-medium text-sm transition-colors"
              >
                Enable Overprint Stroke in Attributes
              </button>
            )}
          </div>

          {/* Check 3: Bleed Expansion */}
          <div className={`p-4 rounded-lg border transition-all ${isBleedValid ? 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800' : 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900/50'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">3. Graphic Exterior Bleed</span>
              <span className={`text-xs font-medium px-2 py-0.5 rounded ${isBleedValid ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                {isBleedValid ? 'PASS' : 'FAIL'}
              </span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">Requires 0.25&quot; exterior bleed to prevent unprinted white board edges.</p>
            {!isBleedValid && (
              <button
                onClick={handleFixBleed}
                className="w-full py-2 rounded-md bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 font-medium text-sm transition-colors"
              >
                Apply 0.25&quot; Offset Path Bleed
              </button>
            )}
          </div>

          {/* Check 4: Font Outlines */}
          <div className={`p-4 rounded-lg border transition-all ${isFontsValid ? 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800' : 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900/50'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">4. Font Vector Outlines</span>
              <span className={`text-xs font-medium px-2 py-0.5 rounded ${isFontsValid ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                {isFontsValid ? 'PASS' : 'FAIL'}
              </span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">Live text fonts must be converted to vector paths (Ctrl+Shift+O).</p>
            {!isFontsValid && (
              <button
                onClick={handleFixFonts}
                className="w-full py-2 rounded-md bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 font-medium text-sm transition-colors"
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
