export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  correctIndex: number;
  explanation: string;
}

export interface ModuleQuiz {
  moduleId: string;
  moduleTitle: string;
  questions: QuizQuestion[];
}

export type QuizData = ModuleQuiz;

export const QUIZZES: Record<string, ModuleQuiz> = {
  m1: {
    moduleId: 'm1',
    moduleTitle: 'Module 1 Assessment: Color Management & RIP Calibration',
    questions: [
      {
        id: 'm1-q1',
        question: 'What does a Delta E 2000 (ΔE00) value of 1.5 indicate when evaluating a printed corporate logo against a proof?',
        options: [
          'Critical failure; immediate color rejection required.',
          'Pass: Very slight difference within standard corporate brand matching tolerance (ΔE < 2.0).',
          'Imperceptible to the human eye under all conditions.',
          'Severe color shift due to missing black ink.'
        ],
        correctAnswer: 1,
        correctIndex: 1,
        explanation: 'ΔE < 2.0 is the standard commercial brand matching target for corporate logos under ISO 12647 standards.'
      },
      {
        id: 'm1-q2',
        question: 'What happens if you set Total Area Coverage (TAC) above 320% when printing on non-porous Sintra PVC boards?',
        options: [
          'Print speed increases by 50%.',
          'UV lamps cannot fully cure bottom ink layers, causing wet ink pooling, odor, and flaking during CNC routing.',
          'Print resolution automatically doubles from 600 DPI to 1200 DPI.',
          'The press carriage lowers clearance by 1.0mm.'
        ],
        correctAnswer: 1,
        correctIndex: 1,
        explanation: 'Exceeding TAC limits lays down excessive ink depth that blocks UV light penetration, preventing bottom ink layers from polymerizing.'
      },
      {
        id: 'm1-q3',
        question: 'What is the primary function of RIP Linearization?',
        options: [
          'To cut outer bleed margins off the substrate.',
          'To map input percentages (0-100%) to true measured output density and compensate for dot gain.',
          'To automatically convert vector paths to raster JPEG images.',
          'To rotate printed boards by 90 degrees.'
        ],
        correctAnswer: 1,
        correctIndex: 1,
        explanation: 'Linearization creates an inverse LUT curve so that a 50% input percentage produces true 50% optical density on media.'
      }
    ]
  },
  m2: {
    moduleId: 'm2',
    moduleTitle: 'Module 2 Assessment: Substrates & Surface Chemistry',
    questions: [
      {
        id: 'm2-q1',
        question: 'When performing a Dyne test on a raw polypropylene sheet, the Dyne 44 pen liquid breaks into isolated droplets within 1 second. What does this mean?',
        options: [
          'Pass: Surface energy is >= 44 dynes/cm; proceed to printing.',
          'Fail: Surface energy is too low (<44 dynes/cm). Apply adhesion primer wipe or flame treatment before printing.',
          'The substrate is too thick for flatbed printing.',
          'The board requires higher vacuum hold-down.'
        ],
        correctAnswer: 1,
        correctIndex: 1,
        explanation: 'If Dyne liquid beads up, surface energy is below 44 dynes/cm. Printing directly will cause ink flaking when cut.'
      },
      {
        id: 'm2-q2',
        question: 'Why must vertical structural support panels on corrugated floor displays have flutes running vertically?',
        options: [
          'It improves printing speed on Mimaki roll printers.',
          'Vertical flutes act as structural columns. Running flutes horizontally reduces load capacity by over 70%, causing display collapse.',
          'It reduces ink consumption by 20%.',
          'It prevents static electricity build-up.'
        ],
        correctAnswer: 1,
        correctIndex: 1,
        explanation: 'Corrugated board strength is directional along internal flute columns. Vertical flute alignment is mandatory for weight-bearing displays.'
      }
    ]
  },
  m3: {
    moduleId: 'm3',
    moduleTitle: 'Module 3 Assessment: Pre-Press Vector & i-cut Engineering',
    questions: [
      {
        id: 'm3-q1',
        question: 'Why MUST vector cut lines (e.g. CutContour) have Overprint Stroke ENABLED in Adobe Illustrator?',
        options: [
          'To double the thickness of the vector line.',
          'To prevent the RIP software from knocking out (erasing) a white line in the background artwork under the path.',
          'To change the ink color to Cyan.',
          'To speed up cutter camera scanning.'
        ],
        correctAnswer: 1,
        correctIndex: 1,
        explanation: 'If Overprint Stroke is off, RIPs erase background graphics under the stroke, creating white border artifacts on cut edges.'
      },
      {
        id: 'm3-q2',
        question: 'What is the function of Esko i-cut 6mm solid black registration dots placed on sheet perimeters?',
        options: [
          'They indicate ink fill levels to press operators.',
          'They guide the cutter optical camera to calculate 3D distortion mesh warping and align tool paths to distorted prints.',
          'They absorb excess UV lamp heat.',
          'They trigger automatic sheet feeding.'
        ],
        correctAnswer: 1,
        correctIndex: 1,
        explanation: 'i-cut camera dots allow the cutter vision system to measure physical print distortion and warp cut vectors to match.'
      }
    ]
  },
  m4: {
    moduleId: 'm4',
    moduleTitle: 'Module 4 Assessment: Industrial Press Operations',
    questions: [
      {
        id: 'm4-q1',
        question: 'What is the correct procedure for wiping printhead faceplates during start-of-day maintenance?',
        options: [
          'Scrub back and forth vigorously with dry paper towels.',
          'Wipe in ONE forward direction using a lint-free poly-wipe saturated with flush solution; never scrub back and forth.',
          'Use compressed air at 90 PSI directly into nozzles.',
          'Spray glass cleaner onto the carriage.'
        ],
        correctAnswer: 1,
        correctIndex: 1,
        explanation: 'Scrubbing back and forth pushes dried ink and dust into delicate nozzle orifices. Always wipe forward smoothly with solvent poly-wipes.'
      },
      {
        id: 'm4-q2',
        question: 'What is the risk of setting gantry carriage clearance below 1.5mm above bowed substrate?',
        options: [
          'Ink dries too fast under UV lamps.',
          'Head Strike: The moving carriage strikes board edges, causing catastrophic, multi-thousand-dollar printhead damage.',
          'Static electricity increases by 50%.',
          'Vacuum bed pressure drops to zero.'
        ],
        correctAnswer: 1,
        correctIndex: 1,
        explanation: 'Head strikes occur when uneven media contacts printheads, crushing nozzles and tearing faceplates.'
      }
    ]
  },
  m5: {
    moduleId: 'm5',
    moduleTitle: 'Module 5 Assessment: CNC Finishing & Routing Physics',
    questions: [
      {
        id: 'm5-q1',
        question: 'What happens if the CNC router Chip Load is too small (e.g., Spindle RPM too high and Feed Rate IPM too slow) when cutting Acrylic?',
        options: [
          'The router bit cuts twice as fast.',
          'The bit rubs against plastic, generating extreme friction heat that melts the plastic and welds it around the bit (chip welding).',
          'The vacuum bed loses static pressure.',
          'The cut edge becomes completely polished instantly.'
        ],
        correctAnswer: 1,
        correctIndex: 1,
        explanation: 'Low chip load means the bit is rubbing instead of carving chips. Friction heat rapidly melts acrylic, ruining the bit and workpiece.'
      },
      {
        id: 'm5-q2',
        question: 'Why are Single-Flute Polished O-Flute bits specified for CNC routing Acrylic?',
        options: [
          'They are cheaper than multi-flute bits.',
          'The single wide open flute valley rapidly evacuates soft plastic chips before heat can build up in the cut channel.',
          'They allow oscillating knife cutting.',
          'They do not require vacuum hold-down.'
        ],
        correctAnswer: 1,
        correctIndex: 1,
        explanation: 'Single-flute O-flute geometries feature a large polished gullet designed specifically for rapid chip ejection in heat-sensitive plastics.'
      }
    ]
  },
  m6: {
    moduleId: 'm6',
    moduleTitle: 'Module 6 Assessment: Operations & SOPs',
    questions: [
      {
        id: 'm6-q1',
        question: 'What is the Mandatory Kitting SOP when a press is undergoing maintenance or waiting for substrate delivery?',
        options: [
          'Operators may sit in break rooms until machines restart.',
          'Operators MUST move to kitting benches to assemble display accessories (hooks, tape, cartons); zero idle time on shop floor.',
          'Operators should shut down all UV lamp power breakers.',
          'Operators must clean office break rooms.'
        ],
        correctAnswer: 1,
        correctIndex: 1,
        explanation: 'The Zero-Idle Kitting SOP mandates that machine downtime is utilized to package display hardware and assemble kits.'
      }
    ]
  },
  m7: {
    moduleId: 'm7',
    moduleTitle: 'Module 7 Assessment: Day-1 Mastery Verification',
    questions: [
      {
        id: 'm7-q1',
        question: 'What is the correct protocol when stacking printed boards off a wide-format press?',
        options: [
          'Stack boards on workbenches or directly on floor mats.',
          'All printed output MUST be stacked neatly on wooden or plastic pallets for forklift and pallet jack transport.',
          'Lean boards vertically against press side covers.',
          'Store boards inside UV curing enclosures.'
        ],
        correctAnswer: 1,
        correctIndex: 1,
        explanation: 'The Pallet-Only Staging Rule ensures material mobility via forklifts/pallet jacks and prevents trip hazards.'
      }
    ]
  }
};
