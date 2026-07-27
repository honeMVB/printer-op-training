export interface MaterialReference {
  id: string;
  name: string;
  category: 'Rigid Plastic' | 'Corrugated' | 'Composite' | 'Roll Media' | 'Wood';
  thickness: string;
  dyneRequired: string;
  bestTool: string;
  cuttingTool: string;
  spindleRpm: string;
  spindleRPM: string;
  feedRateIpm: string;
  feedRateIPM: string;
  passCount: string;
  notes: string;
  specialNotes: string;
}

export interface TroubleshootingItem {
  id: string;
  issue: string;
  category: string;
  symptom: string;
  machine: 'AGFA TAURO Press' | 'Mimaki Press' | 'Kongsberg Cutter' | 'MultiCam Router' | 'Adobe / RIP';
  rootCause: string;
  probableCause: string;
  correctiveAction: string;
  solution: string;
  solutionSOP: string;
}

export const MATERIAL_REFERENCES: MaterialReference[] = [
  {
    id: 'sub-1',
    name: 'Sintra / Expanded PVC',
    category: 'Rigid Plastic',
    thickness: '3mm - 12mm',
    dyneRequired: '>= 44 dynes/cm',
    bestTool: 'Single-Flute Up-cut Spiral Bit / Heavy Drag Knife',
    cuttingTool: 'Single-Flute Up-cut Spiral Bit / Heavy Drag Knife',
    spindleRpm: '18,000 RPM',
    spindleRPM: '18,000 RPM',
    feedRateIpm: '220 IPM',
    feedRateIPM: '220 IPM',
    passCount: '1 Pass',
    notes: 'Excellent rigid stock. Test Dyne level before printing. Use single-flute bits for clean chip removal.',
    specialNotes: 'Excellent rigid stock. Test Dyne level before printing. Use single-flute bits for clean chip removal.'
  },
  {
    id: 'sub-2',
    name: 'Cast Acrylic (Plexiglas/PMMA)',
    category: 'Rigid Plastic',
    thickness: '3mm - 12mm',
    dyneRequired: '>= 46 dynes/cm',
    bestTool: 'Single-Flute Polished O-Flute Up-cut Bit',
    cuttingTool: 'Single-Flute Polished O-Flute Up-cut Bit',
    spindleRpm: '18,000 RPM',
    spindleRPM: '18,000 RPM',
    feedRateIpm: '150 IPM',
    feedRateIPM: '150 IPM',
    passCount: '2 Passes (Roughing + 0.5mm Finishing)',
    notes: 'Requires 2-pass routing to prevent chip welding and produce flame-smooth polished edges.',
    specialNotes: 'Requires 2-pass routing to prevent chip welding and produce flame-smooth polished edges.'
  },
  {
    id: 'sub-3',
    name: 'Dibond / ACM (Aluminum Composite)',
    category: 'Composite',
    thickness: '3mm - 4mm',
    dyneRequired: 'N/A (Coated Metal)',
    bestTool: '90° V-Groove Router Bit',
    cuttingTool: '90° V-Groove Router Bit',
    spindleRpm: '16,000 RPM',
    spindleRPM: '16,000 RPM',
    feedRateIpm: '180 IPM',
    feedRateIPM: '180 IPM',
    passCount: '1 Pass (Score skin + core, leave 0.5mm bottom skin)',
    notes: 'V-groove routing enables 90° hand folding for architectural fascia and 3D display boxes.',
    specialNotes: 'V-groove routing enables 90° hand folding for architectural fascia and 3D display boxes.'
  },
  {
    id: 'sub-4',
    name: 'Coroplast (Corrugated Polypropylene)',
    category: 'Corrugated',
    thickness: '4mm - 10mm',
    dyneRequired: '>= 44 dynes/cm (Corona Treated)',
    bestTool: 'High-Frequency Oscillating Knife (MPOR)',
    cuttingTool: 'High-Frequency Oscillating Knife (MPOR)',
    spindleRpm: '12,000 Strokes/min',
    spindleRPM: '12,000 Strokes/min',
    feedRateIpm: '300 IPM',
    feedRateIPM: '300 IPM',
    passCount: '1 Pass',
    notes: 'Mandatory Corona Dyne check. Use oscillating knife to cut clean edges without crushing flutes.',
    specialNotes: 'Mandatory Corona Dyne check. Use oscillating knife to cut clean edges without crushing flutes.'
  },
  {
    id: 'sub-5',
    name: 'E / B / C Flute Linerboard',
    category: 'Corrugated',
    thickness: '1.5mm - 4.0mm',
    dyneRequired: 'Porous (N/A)',
    bestTool: 'Oscillating Knife + Creasing Wheel (R15/R30)',
    cuttingTool: 'Oscillating Knife + Creasing Wheel (R15/R30)',
    spindleRpm: '12,000 Strokes/min',
    spindleRPM: '12,000 Strokes/min',
    feedRateIpm: '350 IPM',
    feedRateIPM: '350 IPM',
    passCount: '1 Pass Cut + 1 Pass Crease',
    notes: 'Align vertical support display panels so flutes run vertically for max column strength.',
    specialNotes: 'Align vertical support display panels so flutes run vertically for max column strength.'
  }
];

export const TROUBLESHOOTING_GUIDE: TroubleshootingItem[] = [
  {
    id: 'tb-1',
    issue: 'UV Ink Flaking',
    category: 'Ink Adhesion',
    symptom: 'UV ink peeling off Sintra/Acrylic like tape during CNC routing',
    machine: 'AGFA TAURO Press',
    rootCause: 'Low substrate surface energy (<44 dynes/cm) or excessive TAC ink limit (>320%) preventing full UV curing.',
    probableCause: 'Low substrate surface energy (<44 dynes/cm) or excessive TAC ink limit (>320%) preventing full UV curing.',
    correctiveAction: 'Run Dyne test pen. Apply liquid adhesion primer wipe or activate flame treater. Reduce TAC ink limit to 280% in RIP.',
    solution: 'Run Dyne test pen. Apply liquid adhesion primer wipe or activate flame treater. Reduce TAC ink limit to 280% in RIP.',
    solutionSOP: 'Run Dyne test pen. Apply liquid adhesion primer wipe or activate flame treater. Reduce TAC ink limit to 280% in RIP.'
  },
  {
    id: 'tb-2',
    issue: 'Melted Plastic Bit Welding',
    category: 'CNC Routing',
    symptom: 'Melted plastic wrapped around router bit (Chip Welding)',
    machine: 'MultiCam Router',
    rootCause: 'Chip Load too small due to excessive Spindle RPM or slow Feed Rate IPM. Bit is rubbing instead of cutting chips.',
    probableCause: 'Chip Load too small due to excessive Spindle RPM or slow Feed Rate IPM. Bit is rubbing instead of cutting chips.',
    correctiveAction: 'Increase Feed Rate (IPM) on MultiCam pendant or lower Spindle RPM to achieve target 0.008" Chip Load.',
    solution: 'Increase Feed Rate (IPM) on MultiCam pendant or lower Spindle RPM to achieve target 0.008" Chip Load.',
    solutionSOP: 'Increase Feed Rate (IPM) on MultiCam pendant or lower Spindle RPM to achieve target 0.008" Chip Load.'
  },
  {
    id: 'tb-3',
    issue: 'White Edge Knockout Artifacts',
    category: 'Pre-Press Vector',
    symptom: 'Thin white unprinted borders along cut edges of display headers',
    machine: 'Adobe / RIP',
    rootCause: 'Dieline vector path was missing Overprint Stroke in Illustrator, causing RIP to knock out background artwork.',
    probableCause: 'Dieline vector path was missing Overprint Stroke in Illustrator, causing RIP to knock out background artwork.',
    correctiveAction: 'Select dieline in Illustrator, open Attributes panel (Window > Attributes), check Overprint Stroke, and re-spool to RIP.',
    solution: 'Select dieline in Illustrator, open Attributes panel (Window > Attributes), check Overprint Stroke, and re-spool to RIP.',
    solutionSOP: 'Select dieline in Illustrator, open Attributes panel (Window > Attributes), check Overprint Stroke, and re-spool to RIP.'
  },
  {
    id: 'tb-4',
    issue: 'Printhead Jet Banding',
    category: 'Press Operations',
    symptom: 'Banding / missing lines in printed solid dark areas',
    machine: 'AGFA TAURO Press',
    rootCause: 'Clogged printhead nozzles, dry ink crust, or trapped air in sub-tank meniscus line.',
    probableCause: 'Clogged printhead nozzles, dry ink crust, or trapped air in sub-tank meniscus line.',
    correctiveAction: 'Execute 3-second positive pressure ink flush. Wipe faceplate smoothly in ONE forward direction with solvent poly-wipe.',
    solution: 'Execute 3-second positive pressure ink flush. Wipe faceplate smoothly in ONE forward direction with solvent poly-wipe.',
    solutionSOP: 'Execute 3-second positive pressure ink flush. Wipe faceplate smoothly in ONE forward direction with solvent poly-wipe.'
  },
  {
    id: 'tb-5',
    issue: 'i-cut Camera Alignment Drift',
    category: 'CNC Finishing',
    symptom: 'Kongsberg cutter missing registration marks or misaligning cut paths',
    machine: 'Kongsberg Cutter',
    rootCause: 'i-cut registration camera dots printed too close to artwork edge or non-linear sheet distortion from UV lamp heat.',
    probableCause: 'i-cut registration camera dots printed too close to artwork edge or non-linear sheet distortion from UV lamp heat.',
    correctiveAction: 'Ensure 6mm black i-cut dots are spaced >=10mm from artwork. Run 3D camera mesh warp compensation pass in i-cut.',
    solution: 'Ensure 6mm black i-cut dots are spaced >=10mm from artwork. Run 3D camera mesh warp compensation pass in i-cut.',
    solutionSOP: 'Ensure 6mm black i-cut dots are spaced >=10mm from artwork. Run 3D camera mesh warp compensation pass in i-cut.'
  }
];
