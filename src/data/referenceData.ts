export interface MaterialReference {
  name: string;
  category: 'Rigid Plastic' | 'Corrugated' | 'Wood/Composite' | 'Flexible Vinyl';
  thickness: string;
  cuttingTool: string;
  spindleRPM: string;
  feedRateIPM: string;
  dyneRequired: string;
  specialNotes: string;
}

export interface TroubleshootingItem {
  id: string;
  issue: string;
  category: 'Press' | 'CNC Cutter' | 'Color/RIP' | 'Substrate';
  symptom: string;
  probableCause: string;
  solutionSOP: string;
}

export const MATERIAL_REFERENCES: MaterialReference[] = [
  {
    name: 'Expanded PVC (Sintra / Komatex)',
    category: 'Rigid Plastic',
    thickness: '3mm - 12mm',
    cuttingTool: 'Single-Flute Up-cut Spiral Bit or Heavy Drag Knife',
    spindleRPM: '18,000 - 20,000 RPM',
    feedRateIPM: '200 - 250 IPM',
    dyneRequired: '≥ 44 dynes/cm',
    specialNotes: 'Low melting point. Avoid high RPM with zero feed speed to prevent chip welding.'
  },
  {
    name: 'Acrylic / PMMA (Plexiglas)',
    category: 'Rigid Plastic',
    thickness: '3mm - 6mm',
    cuttingTool: 'Single-Flute Polished O-Flute Up-cut Spiral',
    spindleRPM: '18,000 RPM',
    feedRateIPM: '140 - 160 IPM',
    dyneRequired: '≥ 46 dynes/cm (Use Primer)',
    specialNotes: 'Execute 2 passes (Roughing + 0.5mm Finishing pass) for polished crystal edges.'
  },
  {
    name: 'Aluminum Composite (ACM / Dibond)',
    category: 'Wood/Composite',
    thickness: '3mm (0.118")',
    cuttingTool: '90° V-Groove Router Bit (Folding) / 2-Flute Spiral',
    spindleRPM: '16,000 RPM',
    feedRateIPM: '180 IPM',
    dyneRequired: '≥ 42 dynes/cm',
    specialNotes: 'Leave 0.02" (0.5mm) polyethylene core intact when V-grooving for clean hand folds.'
  },
  {
    name: 'Corrugated Paperboard (B / E Flute)',
    category: 'Corrugated',
    thickness: '1.5mm - 3mm',
    cuttingTool: 'Oscillating Knife + Creasing Wheel (R15)',
    spindleRPM: 'N/A (Knife Tool)',
    feedRateIPM: '300 - 450 IPM',
    dyneRequired: 'Natural Paper Surface',
    specialNotes: 'Crease parallel to flute direction requires 20% less pressure than cross-flute.'
  },
  {
    name: 'Corrugated Plastic (Coroplast)',
    category: 'Corrugated',
    thickness: '4mm - 10mm',
    cuttingTool: 'Oscillating Knife (High Frequency)',
    spindleRPM: 'N/A (Knife Tool)',
    feedRateIPM: '250 - 350 IPM',
    dyneRequired: '≥ 46 dynes/cm',
    specialNotes: 'Use vacuum bed tape masking to prevent suction loss through flutes.'
  },
  {
    name: 'Gatorfoam / Foam-Cor',
    category: 'Wood/Composite',
    thickness: '3/16" - 1/2"',
    cuttingTool: 'High-Frequency Oscillating Heavy Blade',
    spindleRPM: 'N/A (Knife Tool)',
    feedRateIPM: '200 - 300 IPM',
    dyneRequired: '≥ 40 dynes/cm',
    specialNotes: 'Wood-veneer facer on Gatorfoam can dull standard drag knives; use heavy carbide blade.'
  },
  {
    name: '13oz / 18oz Frontlit Banner Vinyl',
    category: 'Flexible Vinyl',
    thickness: '13oz - 18oz',
    cuttingTool: 'Standard Drag Knife / Kiss-Cut Blade',
    spindleRPM: 'N/A (Knife Tool)',
    feedRateIPM: '500 IPM',
    dyneRequired: '≥ 38 dynes/cm',
    specialNotes: 'Requires 24-hour solvent outgassing if printed on solvent press prior to lamination.'
  }
];

export const TROUBLESHOOTING_GUIDE: TroubleshootingItem[] = [
  {
    id: 't-1',
    issue: 'Horizontal White Banding Across Print',
    category: 'Press',
    symptom: 'Regular horizontal unprinted streaks in solid color areas.',
    probableCause: 'Clogged printhead nozzles or air bubbles in ink supply line.',
    solutionSOP: '1. Pause print queue. 2. Fire 3-second positive pressure ink purge. 3. Perform single forward wipe with poly-wipe cloth. 4. Print nozzle diagnostic grid. 5. Resume queue.'
  },
  {
    id: 't-2',
    issue: 'UV Ink Flaking / Peeling Edge',
    category: 'Substrate',
    symptom: 'Ink chips off substrate edge during CNC routing or thumb scratching.',
    probableCause: 'Low surface energy (Dyne level < 44) or under-cured UV lamp output.',
    solutionSOP: '1. Test board surface with Dyne pen. 2. Apply adhesion promoter primer wipe. 3. Increase UV LED lamp power setting in press control panel.'
  },
  {
    id: 't-3',
    issue: 'CNC Router Bit Plastic Melting & Welding',
    category: 'CNC Cutter',
    symptom: 'Plastic chips melt and fuse back into the cut channel, binding the bit.',
    probableCause: 'Spindle RPM too high relative to Feed Rate (IPM), creating excessive friction heat.',
    solutionSOP: '1. Reduce Spindle RPM from 22,000 to 18,000. 2. Increase Feed Rate (IPM) to increase Chip Load. 3. Switch to single-flute polished O-flute bit.'
  },
  {
    id: 't-4',
    issue: 'Fuzzy / Shadowed Text (Satellite Overspray)',
    category: 'Press',
    symptom: 'Fine text has a blurry outline or tiny ink dots scattered around edges.',
    probableCause: 'Static electricity buildup on plastic board or printhead carriage set too high above media.',
    solutionSOP: '1. Check carriage height (set to 1.5mm - 2.0mm). 2. Turn on anti-static ionizing bar. 3. Wipe plastic board with anti-static cloth before loading.'
  },
  {
    id: 't-5',
    issue: 'Cut Path Misaligned with Graphic Print',
    category: 'CNC Cutter',
    symptom: 'CNC knife slices 2mm into graphic art on one side of the board.',
    probableCause: 'Optical camera missed registration marks or board stretched under UV heat.',
    solutionSOP: '1. Inspect printed i-cut registration dots for ink smudges. 2. Re-scan initial target dot manually. 3. Enable 3D Mesh Distortion Compensation in cutter software.'
  }
];
