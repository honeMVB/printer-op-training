export interface Question {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizData {
  moduleId: string;
  moduleTitle: string;
  questions: Question[];
}

export const QUIZZES: Record<string, QuizData> = {
  m1: {
    moduleId: 'm1',
    moduleTitle: 'Module 1: Printing Foundations & Physics',
    questions: [
      {
        id: 'q1-1',
        question: 'How do UV-curable inks dry when jetted onto a substrate surface?',
        options: [
          'Through water evaporation over 24 hours',
          'Through instant photo-polymerization when struck by UV LED light',
          'By chemical etching into the paper liner',
          'By high-temperature thermal baking at 200°C'
        ],
        correctIndex: 1,
        explanation: 'UV inks contain monomers, oligomers, and photo-initiators that undergo rapid cross-linking polymerization when exposed to 365–395nm UV light.'
      },
      {
        id: 'q1-2',
        question: 'What does a Delta E (ΔE00) value under 1.0 represent in commercial color management?',
        options: [
          'An obvious unacceptable color shift',
          'A visible shift that requires immediate re-printing',
          'A color difference imperceptible to the human eye meeting ISO master standards',
          'A 50% loss in ink density'
        ],
        correctIndex: 2,
        explanation: 'Delta E < 1.0 indicates a virtually perfect color match that cannot be distinguished by the human eye.'
      },
      {
        id: 'q1-3',
        question: 'What is the primary trade-off when increasing press pass count (e.g., from 4-pass to 8-pass)?',
        options: [
          'Higher speed but increased banding',
          'Higher print quality and color density, but reduced printing speed',
          'Lower ink adhesion on plastic boards',
          'Automatic conversion from CMYK to RGB'
        ],
        correctIndex: 1,
        explanation: 'Higher pass counts lay down more overlapping ink passes to eliminate banding and increase color vibrancy, but cut print output speed in half.'
      }
    ]
  },
  m2: {
    moduleId: 'm2',
    moduleTitle: 'Module 2: Substrate Science & Inventory',
    questions: [
      {
        id: 'q2-1',
        question: 'What is the minimum Dyne surface energy level required for UV ink to adhere to plastic boards without flaking?',
        options: [
          '15 dynes/cm',
          '28 dynes/cm',
          '44 dynes/cm or higher',
          '100 dynes/cm'
        ],
        correctIndex: 2,
        explanation: 'UV ink requires a surface energy of at least 44 dynes/cm for adequate wetting and chemical adhesion.'
      },
      {
        id: 'q2-2',
        question: 'According to the OVERS Depletion Mandate, what must an operator do if 50 over-printed headers exist in stock for a 500-unit repeat order?',
        options: [
          'Print 500 new headers and throw away the old ones',
          'Record and deduct the 50 stock units, printing only 450 new headers',
          'Print 550 headers to add to the extra stock',
          "Stop production and return the material to the vendor's warehouse"
        ],
        correctIndex: 1,
        explanation: 'Operators must check OVERS inventory and deduct existing components from incoming print dockets to prevent material waste.'
      }
    ]
  },
  m3: {
    moduleId: 'm3',
    moduleTitle: 'Module 3: Pre-Press & Structural Design',
    questions: [
      {
        id: 'q3-1',
        question: 'In Adobe Illustrator prepress, how should cut contour dielines be defined?',
        options: [
          'As RGB Process Red lines set to 10pt stroke',
          'As 100% Spot Colors with Overprint Stroke enabled and exact names like CutContour',
          'As filled black squares',
          'As hidden invisible guide lines'
        ],
        correctIndex: 1,
        explanation: 'Cut contour vector paths must be Spot Colors (e.g. CutContour) set to Overprint Stroke so RIP software isolates them for the cutter table.'
      },
      {
        id: 'q3-2',
        question: 'Why are i-cut registration target dots (black 6mm circles) printed around the graphic border?',
        options: [
          'To decorate the board edges',
          'To allow the cutter optical camera to scan targets and compensate for material distortion or stretching',
          'To test ink drying speed',
          'To indicate where forklift prongs should lift the pallet'
        ],
        correctIndex: 1,
        explanation: 'The cutter optical camera scans the registration dots to calculate sheet rotation, skew, and 3D warp compensation.'
      }
    ]
  },
  m4: {
    moduleId: 'm4',
    moduleTitle: 'Module 4: Industrial Wide-Format Press Operations',
    questions: [
      {
        id: 'q4-1',
        question: 'What is the maximum time allowed for the start-of-day press purge routine?',
        options: [
          '10 minutes',
          '30 minutes maximum',
          '2 hours',
          'No time limit'
        ],
        correctIndex: 1,
        explanation: 'Start-of-day purge, faceplate wipe, and nozzle check must be completed within 30 minutes to maximize production output.'
      },
      {
        id: 'q4-2',
        question: 'How do operators maintain zero-downtime continuous printing during lunch and rest breaks?',
        options: [
          'By turning off the press and clearing the queue',
          'By staggering rest breaks so partner operators cover and run active machinery',
          'By speeding up the press to 200% draft mode',
          'By leaving the press unattended without supervision'
        ],
        correctIndex: 1,
        explanation: 'Operators alternate break times so partner operators cover active equipment, preventing ink drying in nozzles and eliminating downtime.'
      }
    ]
  },
  m5: {
    moduleId: 'm5',
    moduleTitle: 'Module 5: CNC Digital Finishing & Heavy Routing',
    questions: [
      {
        id: 'q5-1',
        question: 'Which router bit type is mandatory for routing Acrylic to evacuate chips and prevent plastic melting?',
        options: [
          'Standard drag knife blade',
          'Single-flute Up-cut O-flute spiral bit',
          'Four-flute straight drill bit',
          'Diamond glass scoring wheel'
        ],
        correctIndex: 1,
        explanation: 'Single-flute O-flute bits feature a wide polished flute valley designed specifically to eject plastic chips before heat causes acrylic re-melting.'
      },
      {
        id: 'q5-2',
        question: 'If a CNC router operates at 18,000 RPM with a single-flute bit and a target Chip Load of 0.008", what is the required Feed Rate (IPM)?',
        options: [
          '50 IPM',
          '144 IPM (18,000 × 0.008)',
          '500 IPM',
          '1,000 IPM'
        ],
        correctIndex: 1,
        explanation: 'Feed Rate = Spindle RPM × Chip Load × Flutes = 18,000 × 0.008 × 1 = 144 IPM.'
      }
    ]
  },
  m6: {
    moduleId: 'm6',
    moduleTitle: 'Module 6: Shop Floor Management & SOPs',
    questions: [
      {
        id: 'q6-1',
        question: 'What is an operator required to do under the Mandatory Kitting SOP if a machine becomes idle during maintenance?',
        options: [
          'Sit at the workstation and wait',
          'Immediately notify the Team Lead and begin kitting display accessories or assembly kits',
          'Leave the shop floor for an unscheduled break',
          'Shut down all shop power'
        ],
        correctIndex: 1,
        explanation: 'Zero idle time policy dictates that operators must report equipment holds and kit display accessories immediately.'
      },
      {
        id: 'q6-2',
        question: 'Why must printed materials ALWAYS be stacked on pallets rather than tables?',
        options: [
          'Because tables are reserved for operator lunches',
          'To ensure immediate mobility using forklift or pallet jacks and prevent floor obstruction',
          'To protect tables from ink spills',
          'Because pallets make graphics look larger'
        ],
        correctIndex: 1,
        explanation: 'Pallet-only staging guarantees rapid logistics mobility across assembly, packaging, and shipping departments.'
      }
    ]
  },
  m7: {
    moduleId: 'm7',
    moduleTitle: 'Module 7: Day-1 Mastery Hub & Simulators',
    questions: [
      {
        id: 'q7-1',
        question: 'What is the first step an operator should take upon arriving at their assigned press on Day 1?',
        options: [
          'Start printing without checking nozzles',
          'Put on mandatory PPE, clock in, review Monday.com dashboard, and verify clean workspace',
          'Change the printer RIP color profiles',
          'Disassemble the printhead carriage'
        ],
        correctIndex: 1,
        explanation: 'Safety PPE, dashboard review, workspace check, and 30-min purge SOP form the core morning start-up sequence.'
      }
    ]
  }
};
