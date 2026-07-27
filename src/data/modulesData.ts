export interface Lesson {
  id: string;
  title: string;
  duration: string;
  summary: string;
  content: string;
  keyTakeaways: string[];
  caseStudy?: {
    title: string;
    description: string;
    keyLesson: string;
  };
}

export interface ModuleData {
  id: string;
  title: string;
  category: string;
  iconName: string;
  shortDesc: string;
  estimatedHours: string;
  difficulty: 'Foundation' | 'Intermediate' | 'Advanced' | 'Mastery';
  lessons: Lesson[];
}

export const MODULES: ModuleData[] = [
  {
    id: 'm1',
    title: 'Module 1: Commercial Wide-Format Printing Foundations',
    category: 'Printing Technology',
    iconName: 'Printer',
    shortDesc: 'Master print engine physics, ink chemistry, UV curing, color management, Delta E, and printhead diagnostics.',
    estimatedHours: '3.5 Hours',
    difficulty: 'Foundation',
    lessons: [
      {
        id: 'm1-l1',
        title: 'Lesson 1.1: Industrial Print Technologies & Ink Chemistries',
        duration: '45 mins',
        summary: 'Understand UV LED, Solvent, Eco-Solvent, Latex, Dye-Sublimation, and Screen printing mechanics.',
        keyTakeaways: [
          'UV-curable inks dry instantly via photo-polymerization under UV LED lamps, enabling direct-to-rigid printing.',
          'Solvent inks bond chemically by etching into vinyl substrates but require 24-48 hour outgassing.',
          'Latex inks use water-based polymer resins cured by heat, producing odorless, eco-friendly prints.',
          'Dye-sublimation turns solid ink into gas under heat (200°C) to dye polyester fabric fibers directly.'
        ],
        content: `
### 1. Overview of Commercial Digital Wide-Format Printing
Commercial wide-format printing encompasses digital imaging systems designed to produce graphics ranging from 24 inches to over 16 feet wide. Unlike desktop inkjet or commercial offset lithography, wide-format presses handle diverse rigid and flexible media types.

#### Primary Digital Inkjet Technologies Comparison

| Technology | Ink Chemistry | Curing / Drying Mechanism | Primary Substrates | Best Applications |
| :--- | :--- | :--- | :--- | :--- |
| **UV-Curable (UV LED)** | Monomers, oligomers, photo-initiators, pigments | Instant polymerization under UV light (365–395nm wavelength) | Rigid boards (Foam PVC, Acrylic, Corrugated, ACM) & heavy roll stock | POP Displays, Signage, Architectural Panels, Packaging |
| **Eco-Solvent / Solvent** | Aggressive solvent carriers, resin, pigments | Evaporation of solvent carrier into air (requires heat & ventilation) | Cast/Calendered Vinyl, Banner material, Mesh | Outdoor Banners, Vehicle Wraps, Long-term signage |
| **Water-Based Latex** | Polymer resin encapsulated pigment in water | Thermal evaporation of water + heat fusion of latex resin | Paper, Wallcoverings, Fabrics, Self-adhesive vinyl | Indoor Decor, Trade Show Graphics, Eco-friendly POS |
| **Dye-Sublimation** | Disperse dyes in liquid carrier | Heat transfer press (200°C / 400°F) sublimes dye into gas | 100% Polyester fabrics, Soft signage, Apparel | Soft Signage, Flags, Backlit Fabric Lightboxes |

---

### 2. Deep Dive: UV LED Photo-Polymerization
In industrial UV inkjet presses (such as the **AGFA TAURO**), ink does not "dry" by liquid evaporation. Instead, ink droplets are jetted onto the substrate surface and immediately struck by high-intensity UV LED lamps.

1. **Jetting Phase**: Piezoelectric printheads fire microscopic droplets (as small as 4 to 12 picoliters) through thousands of nozzles at speeds up to 10 m/s.
2. **Pinning Phase** (Optional): A low-intensity UV light partially cures the droplet to lock dot gain and control drop spread before spot colors or varnish are applied.
3. **Full Curing Phase**: High-power UV LED lamps emit ultraviolet radiation, exciting photo-initiator molecules in the ink. These photo-initiators trigger rapid cross-linking between monomer and oligomer chains, transforming liquid ink into a solid, scratch-resistant polymer film within milliseconds.

---

### 3. Printhead Mechanics: Piezoelectric Drop-on-Demand (DOD)
Industrial wide-format presses utilize **Piezoelectric Drop-on-Demand (DOD)** printheads (e.g., Ricoh Gen5/Gen6, Konica Minolta, Fujifilm Dimatix).

- **How Piezo Works**: Electric voltage is applied to a piezo-electric crystal behind each nozzle chamber. The crystal deforms, creating a pressure pulse that ejects a precise droplet of ink.
- **Grayscale Variable Drop Technology**: Modern printheads fire multiple drop sizes (e.g., 4pL, 8pL, 12pL, 24pL) from the same nozzle. Small drops produce ultra-smooth skin tones and sharp text, while larger drops provide dense, opaque solid fills.
        `,
        caseStudy: {
          title: 'Direct-to-Acrylic POP Display Failure',
          description: 'A press operator printed a high-end cosmetic display directly onto smooth acrylic without checking ink adhesion. During CNC routing, ink flaked off along cut edges.',
          keyLesson: 'UV inks require high surface energy (Dyne level >44). For non-porous acrylic, operators must apply a chemical adhesion promoter (primer) or use a flame-treating pass prior to printing.'
        }
      },
      {
        id: 'm1-l2',
        title: 'Lesson 1.2: Color Management, Gamut & Delta E Accuracy',
        duration: '50 mins',
        summary: 'Master RGB vs CMYK color conversion, ICC profiling, Pantone spot color matching, and spectrophotometer measuring.',
        keyTakeaways: [
          'RGB is an additive light color space (monitors); CMYK is a subtractive ink color space (printing).',
          'Delta E (ΔE00) measures color difference; ΔE < 2.0 is visually imperceptible to the human eye.',
          'ICC profiles map printer/ink/media combinations to guarantee color consistency across different presses.',
          'Spot colors (Pantone PMS) require precise RIP spot-color lookup tables or extended gamut inks (OGV).'
        ],
        content: `
### 1. Color Theory Fundamentals for Print Operators

#### Additive vs. Subtractive Color Spaces
- **RGB (Red, Green, Blue)**: Additive light model used by digital cameras, monitors, and artwork files. Combining equal 100% values produces White ($R+G+B = \\text{White}$).
- **CMYK (Cyan, Magenta, Yellow, Key/Black)**: Subtractive ink model used in physical printing. Inks absorb specific wavelengths of light. Combining Cyan, Magenta, and Yellow subtracts reflected light, producing a dark muddy brown—requiring Black (K) ink for deep contrast and density.

- **Additive (Light)**: R + G = Yellow | R + B = Magenta | G + B = Cyan
- **Subtractive (Ink)**: C + M = Blue | C + Y = Green | M + Y = Red

---

### 2. Understanding Color Difference: Delta E ($\Delta E$)
In commercial printing, client brand guidelines demand strict color accuracy (e.g., Coca-Cola Red, Home Depot Orange). Color accuracy is measured objectively using a **Spectrophotometer** (e.g., X-Rite i1Pro 3) using the CIELAB color space ($L^*a^*b^*$).

#### Delta E 2000 ($\Delta E_{00}$) Interpretation Scale

| $\Delta E$ Value | Visual Difference Level | Industry Acceptance Standard |
| :--- | :--- | :--- |
| **$< 1.0$** | Imperceptible to trained human eye | ISO Master Print Standard / Proof Match |
| **$1.0 - 2.0$** | Very slight difference, visible only on tight side-by-side inspection | Standard Brand Package Target (Strict Client QC) |
| **$2.0 - 3.5$** | Noticeable color difference to trained eye | Commercial General Print Acceptance Threshold |
| **$> 5.0$** | Obvious color shift; unacceptable print defect | Immediate Reject & Re-run Required |

---

### 3. ICC Profiling & RIP Management
An **ICC Profile** is a mathematical file describing how a specific printer, ink set, and substrate combination reproduces color.

- **Input Profile**: Converts incoming digital artwork (sRGB, Adobe RGB 1998, US Web Coated SWOP) into CIELAB connection space.
- **Output Profile**: Maps CIELAB values into the exact ink volume combinations ($C, M, Y, K, + \\text{White/Light Inks}$) required by the press for the loaded substrate.
- **Media Calibration**: Operators must perform regular linearization (density calibration) using a spectrophotometer to adjust for batch-to-batch substrate brightness variations or ink lot shifts.
        `,
        caseStudy: {
          title: 'Brand Logo Color Dispute',
          description: 'A customer rejected a 500-unit retail header order because the corporate red looked slightly orange on corrugated plastic compared to paper proofs.',
          keyLesson: 'Substrate color temperature affects print perception. Corrugated plastic has a yellowish tone. Operators must read the media white point with a spectrophotometer before running high-volume brand color jobs.'
        }
      },
      {
        id: 'm1-l3',
        title: 'Lesson 1.3: Resolution, Pass Counts & Dot Gain Dynamics',
        duration: '45 mins',
        summary: 'Understand DPI vs LPI, pass count trade-offs between speed and quality, and dot gain compensation.',
        keyTakeaways: [
          'DPI (Dots Per Inch) measures hardware drop resolution; LPI (Lines Per Inch) measures screening halftone density.',
          'Increasing pass count (e.g., 4-pass vs 8-pass) increases color density and eliminates banding but cuts printing speed in half.',
          'Bi-directional printing doubles output speed; mono-directional printing ensures maximum registration precision for fine detail.',
          'Dot gain occurs when liquid ink spreads outward on porous media, requiring RIP curve compensation.'
        ],
        content: `
### 1. Resolution Dynamics: DPI vs. LPI
- **DPI (Dots Per Inch)**: The physical number of ink droplets the printhead carriage lays down per linear inch (e.g., 720 x 1440 DPI).
- **LPI (Lines Per Inch)**: The frequency of halftone dot grids used in printing. Standard billboard printing uses 35–65 LPI; high-end indoor POP displays use 125–175 LPI.

---

### 2. Pass Count & Speed Trade-off Matrix

| Mode | Pass Count | Carriage Speed | Resolution | Best Used For |
| :--- | :--- | :--- | :--- | :--- |
| **Express / Draft** | 2-Pass | Ultra-Fast | 360 x 720 DPI | Outdoor billboards (>30ft viewing distance), temporary site banners |
| **Production** | 4-Pass / 6-Pass | Fast | 720 x 720 DPI | Standard floor merchandisers, retail wall graphics, trade show signs |
| **High Quality / Quality** | 8-Pass / 12-Pass | Moderate | 720 x 1440 DPI | Close-range POP displays, fine art, cosmetics packaging, backlit lightboxes |
| **Ultra Precision** | 16-Pass | Slow | 1440 x 1440 DPI | Micro-text (<4pt), lenticular printing, varnish textured effects |

---

### 3. Bi-Directional vs. Uni-Directional Printing
- **Bi-Directional**: Printheads lay ink while moving left-to-right AND right-to-left. Maximizes throughput speed by 90-100%, but requires precise bidirectional head alignment calibration to prevent ghosting or micro-banding.
- **Uni-Directional**: Printheads lay ink ONLY when traveling in one direction, returning idle. Used when printing critical drop alignment, ultra-small text, or heavy double-strike backlit graphics.
        `
      }
    ]
  },
  {
    id: 'm2',
    title: 'Module 2: Substrate Science, Material Prep & Inventory Control',
    category: 'Materials & Production',
    iconName: 'Layers',
    shortDesc: 'Master rigid and flexible substrate characteristics, grain direction, static reduction, OVERS policies, and sheet nesting.',
    estimatedHours: '3.0 Hours',
    difficulty: 'Foundation',
    lessons: [
      {
        id: 'm2-l1',
        title: 'Lesson 2.1: Substrate Classification & Mechanical Properties',
        duration: '50 mins',
        summary: 'Detailed taxonomy of rigid boards, corrugated flutes, plastics, and roll media used in wide-format manufacturing.',
        keyTakeaways: [
          'Corrugated flutes (E, B, C, EB double-wall) provide structural rigidity; grain/flute direction dictates folding strength.',
          'Expanded PVC (Sintra/Komatex) is lightweight, rigid, and highly machineable on CNC routers.',
          'Acrylic (PMMA) requires specialized polished router bits to avoid edge melting or chipping.',
          'Aluminum Composite Material (ACM/Dibond) features poly cores sandwiched between aluminum skins, requiring V-groove routing for folding.'
        ],
        content: `
### 1. Comprehensive Substrate Taxonomy

#### Rigid Board Materials

| Substrate Name | Composition | Key Strengths | Cutting Tool Required | Common Applications |
| :--- | :--- | :--- | :--- | :--- |
| **Expanded PVC Foam** *(Sintra, Komatex)* | Closed-cell polyvinyl chloride | Rigid, smooth surface, weather-resistant | CNC Router / Single-flute spiral bit or Heavy Drag Knife | Indoor/Outdoor Signage, Retail Fixtures, POP Displays |
| **Corrugated Plastic** *(Coroplast)* | Fluted polypropylene plastic | Waterproof, lightweight, low-cost | Oscillating Knife / Kiss-cut blade | Yard signs, temporary packaging, pallet wraps |
| **Corrugated Paperboard** *(E, B, C, EB Flute)* | Fluted linerboard paper | Sustainable, high structural strength when folded | Heavy Drag Knife / Creasing Wheel | POP Dump Bins, Counter Displays, Retail Boxes |
| **Acrylic / PMMA** *(Plexiglas, Perspex)* | Thermoplastic polymer | Optical clarity, glass-like finish, rigid | CNC High-Speed Router (Single-flute O-flute bit) | High-end retail displays, illuminated signs, cosmetics |
| **Aluminum Composite** *(ACM / Dibond)* | Polyethylene core between 0.3mm aluminum | Ultra-flat, extremely rigid, weather-proof | CNC Router (90°/135° V-groove bit for folding) | Exterior building signs, durable retail displays |
| **Foam Board** *(Gatorfoam / Foam-Cor)* | Polystyrene core with clay-coated paper facers | Flat, rigid, lightweight | Oscillating Knife / Heavy Utility Blade | Photo mounting, indoor ceiling hangers, exhibition panels |

---

### 2. Physical & Chemical Surface Properties
1. **Dyne Level (Surface Energy)**: Measures how well liquid ink wets out on a plastic surface. Polyolefins (polyethylene, polypropylene) have low natural dyne levels (<30 dynes/cm). UV ink requires a dyne level of **>= 44 dynes/cm** for durable ink adhesion. Operators test media using Dyne Corona Test Pens prior to printing.
2. **Static Charge & Dust Suppression**: Friction during sheet unstacking generates static electricity (>15,000V). Static deflects flying ink droplets, causing fuzzy text ("overspray" or "satellite drops"). Operators use anti-static ionizing blowers or grounding bars during sheet loading.
3. **Flute & Grain Direction**: Corrugated paper and plastic sheets have a natural structural grain (direction of interior flutes). Always load sheets so major structural folds run parallel to the flute direction.
        `
      },
      {
        id: 'm2-l2',
        title: 'Lesson 2.2: Inventory Management, Waste Reduction & The OVERS Policy',
        duration: '40 mins',
        summary: 'Learn sheet utilization calculation, yield optimization, material waste control, and the mandatory OVERS deduction rule.',
        keyTakeaways: [
          'Sheet utilization percentage = (Total Cut Parts Surface Area / Total Blank Sheet Area) x 100.',
          'Target minimum sheet utilization yield is 88-92% to eliminate material waste.',
          'The OVERS Rule: Over-printed components from previous production runs MUST be recorded and deducted from incoming print dockets.',
          'Never print full blank sheets when offcuts exist; nest secondary smaller jobs onto remaining sheet margins.'
        ],
        content: `
### 1. Sheet Yield Calculation & Waste Economics
Raw material substrates represent 40-60% of total manufacturing cost in display printing.

#### Yield Performance Guidelines
- **< 80% Yield**: POOR — Excessive substrate waste. Requires re-nesting or grouping with secondary dockets.
- **80% - 88% Yield**: ACCEPTABLE — Standard production target for complex irregular shapes.
- **> 90% Yield**: EXCELLENT — Highly optimized automated nesting.

---

### 2. Operational Case Study SOP: The "OVERS" Depletion Mandate
In high-volume display facilities, production runs frequently generate extra printed components ("OVERS") due to minimum sheet yield setups.

> **Mandatory OVERS Policy**:
> 1. **Record & Store**: When a job finishes, any over-printed header cards, side panels, or shelf talkers must be tagged, cataloged with the job docket number, and placed in assigned inventory bins.
> 2. **Docket Check**: Before releasing a new print order to the press floor, the printer operator MUST inspect the OVERS log in the Work OS (Monday.com).
> 3. **Deduct Before Printing**: If 50 extra side panels exist in OVERS inventory for a 500-unit repeat order, the operator MUST adjust the print run quantity down to 450 units. Printing full sheets "just because it is easier" is strictly prohibited.
> 4. **Margin Nesting**: If a job layout leaves a blank 24" x 48" tail on a 4' x 8' sheet, the operator must open pending dockets and nest smaller items (e.g., price tags, small signs) into the blank tail.
        `
      }
    ]
  },
  {
    id: 'm3',
    title: 'Module 3: Pre-Press, Vector Art & Structural CAD Design',
    category: 'Pre-Press & Software',
    iconName: 'FileCode',
    shortDesc: 'Master Adobe Illustrator prepress, spot color dielines, bleeds, Esko i-cut structural design, and camera registration marks.',
    estimatedHours: '3.5 Hours',
    difficulty: 'Intermediate',
    lessons: [
      {
        id: 'm3-l1',
        title: 'Lesson 3.1: Vector Art Verification, Dielines & Bleeds in Adobe Illustrator',
        duration: '50 mins',
        summary: 'Learn Illustrator prepress prep, spot color naming conventions, cut contours, registration marks, and bleed extensions.',
        keyTakeaways: [
          'Cut contour lines MUST be vector strokes defined as 100% Spot Colors with exact names (e.g., "CutContour", "Crease").',
          'Cut contour paths must be set to "Overprint Stroke" in Illustrator to prevent RIP software from knocking out underlying graphics.',
          'Standard print bleed is 0.125" (3mm) for vinyl/paper and 0.25" (6mm) for thick rigid boards to prevent white borders after cutting.',
          'Embedded raster images must be checked for minimum 150 DPI resolution at 100% final print scale.'
        ],
        content: `
### 1. Pre-Press Dieline Layer Conventions
When sending print files to digital flatbed cutters (Kongsberg, MultiCam), cutting and creasing toolpaths are driven by dedicated vector stroke layers in the artwork file.

#### Standard Pre-Press Spot Color Naming Matrix

| Operation | Stroke Color | Spot Swatch Name | Stroke Weight | Attributes |
| :--- | :--- | :--- | :--- | :--- |
| **Thru-Cut (Full Cut)** | 100% Magenta | CutContour | 0.25 pt | Overprint Stroke ENABLED |
| **Kiss-Cut (Vinyl Layer Only)** | 100% Cyan | KissCut | 0.25 pt | Overprint Stroke ENABLED |
| **Crease / Score Line** | 100% Green | Crease | 0.25 pt | Overprint Stroke ENABLED |
| **Router V-Groove** | 100% Yellow | VGroove | 0.50 pt | Overprint Stroke ENABLED |
| **Reg Marks (i-cut dots)** | 100% Black | i-cut | Solid 6mm Circle | Standard Black Fill |

---

### 2. Bleed & Safe Margin Rules
- **Why Bleed is Required**: During CNC cutting, minor mechanical tolerances (+-0.5mm) or board stretching can cause the cutter blade to slice slightly outside the graphic boundary. Without bleed, a thin white unprinted margin will appear along the edge of the finished display.
- **Bleed Rule**:
  - Thin materials (<1mm): Add **0.125" (3.175mm)** exterior graphic bleed beyond the CutContour vector path.
  - Thick rigid board (3mm - 16mm): Add **0.25" (6.35mm)** exterior graphic bleed.
- **Safety Margin**: Keep all vital logos, text, and barcodes at least **0.25" (6.35mm) inside** the CutContour path.
        `
      },
      {
        id: 'm3-l2',
        title: 'Lesson 3.2: Esko i-cut Suite & Structural Packaging Design',
        duration: '50 mins',
        summary: 'Master structural box design, CAD folding lines, auto-nesting layout optimization, and camera target placement.',
        keyTakeaways: [
          'Esko i-cut Layout automatically calculates optimal nest rotation and sheet arrangement to maximize substrate yield.',
          'i-cut Vision camera registration dots (black 6mm circles) must be placed around the sheet perimeter to guide cutter cameras.',
          'Barcodes generated by i-cut allow the cutter operator to scan a printed sheet and automatically open the correct cut file.',
          'Crease allowances must account for substrate caliper thickness to ensure clean 90 degree folds without cracking facers.'
        ],
        content: `
### 1. Esko i-cut Suite Workflow
Esko i-cut Suite is the graphic arts industry standard pre-press tool for wide-format printing and digital cutting tables.

---

### 2. Registration Targets & Barcode Automation
1. **i-cut Registration Marks**: Black 6mm solid circles placed around the border of the nested layout. The optical camera on the Kongsberg or MultiCam cutter scans these targets to calculate sheet distortion, rotation angle, and material stretching before firing the cut tool.
2. **Automated Barcode Matching**: i-cut prints a unique 1D or QR barcode at the leading edge of the sheet. When the cutter operator lays the sheet on the table, the camera scans the barcode, queries the server network, and instantly loads the matching cut path file—eliminating manual file searching errors.
        `
      }
    ]
  },
  {
    id: 'm4',
    title: 'Module 4: Industrial Wide-Format Press Operations',
    category: 'Equipment Operations',
    iconName: 'Cpu',
    shortDesc: 'Master AGFA TAURO & Mimaki press operation, 30-min purge SOPs, RIP software, continuous printing, and nozzle diagnostics.',
    estimatedHours: '4.0 Hours',
    difficulty: 'Advanced',
    lessons: [
      {
        id: 'm4-l1',
        title: 'Lesson 4.1: AGFA TAURO & Mimaki Press Operating SOPs',
        duration: '60 mins',
        summary: 'Step-by-step operating procedures for heavy UV presses, vacuum zone adjustment, media loading, and carriage alignment.',
        keyTakeaways: [
          'Daily Start-of-Day Purge SOP MUST be completed within 30 minutes of shift start to prevent production delays.',
          'Vacuum bed zones must be masked off using scrap material to prevent air loss and ensure flat substrate hold-down.',
          'Head height / gantry clearance must be set precisely (typically 1.5mm to 2.0mm above media) to prevent head strikes.',
          'UV lamp intensity (mJ/cm2) must be verified using a radiometer for temperature-sensitive substrates.'
        ],
        content: `
### 1. Start-of-Day Operating SOP (The 30-Minute Purge Protocol)
To ensure maximum press throughput, operators follow a strict 30-minute start-of-day startup routine:

#### Detailed Step-by-Step Purge Procedure
1. **System Health Check**: Inspect ink reservoir levels (C, M, Y, K, + White), waste ink bottle capacity, and UV lamp coolant chiller temperature.
2. **Ink Purge Execution**: Press the positive pressure ink purge button for 3 seconds to flush stagnant ink and trapped micro-bubbles from the nozzle plate.
3. **Faceplate Maintenance**: Using lint-free poly-wipe cloths saturated with approved UV flush solution, gently wipe the printhead underside in a single forward stroke (NEVER scrub back and forth).
4. **Nozzle Test Pattern**: Print a diagnostic grid pattern. Every individual nozzle line must be visible. If nozzles are missing, perform a targeted localized pressure purge.
5. **Vacuum Zone Masking**: Adjust vacuum bed switches matching the exact width and length of the loaded substrate. Mask any open vacuum holes outside the board area with tape or scrap linerboard to ensure maximum vacuum suction down to the bed.

---

### 2. Preventing Head Strikes
A **head strike** occurs when a bowed or warped substrate catches the bottom of the moving printhead carriage. This can destroy thousand-dollar piezo printheads instantly!

- **Prevention Rules**:
  - Always inspect rigid boards for edge curl or center warping before loading.
  - Set the automated media thickness sensor (gantry height) to **1.5mm – 2.0mm** above substrate thickness.
  - Enable the carriage **Anti-Crash Bumper Bar**. If the sensor bar touches an uneven board edge, the carriage stops instantly before printheads contact the board.
        `
      },
      {
        id: 'm4-l2',
        title: 'Lesson 4.2: Zero-Downtime Shift Management & Continuous Printing SOP',
        duration: '45 mins',
        summary: 'Learn staggered break coverage strategies, preventing ink drying in nozzles, and continuous production execution.',
        keyTakeaways: [
          'Industrial Rule: "Print DOES NOT Stop." Presses must run continuously throughout 8-hour shifts.',
          'Operators stagger lunch and rest breaks so alternate qualified operators cover active machinery.',
          'Stopping UV presses during lunch causes ink to warm up in static heads, leading to nozzle clogging and 45-min re-purges.',
          'Shift handover requires active logging of job progress, media remaining, and machine performance notes.'
        ],
        content: `
### 1. The Economics of Continuous Printing
In commercial wide-format manufacturing, an idle $500,000 UV press costs the company over **$250/hour in lost productivity and overhead**. Furthermore, allowing UV inkjet heads to sit idle with UV lamps warm causes heat migration into nozzle plates, thickening ink and clogging nozzles.

> **Zero-Downtime Staggered Coverage Protocol**:
> - **Operator A Break (11:30 - 12:00)**: Operator B takes over monitoring Operator A’s TAURO press, loading boards and unloading finished pallets.
> - **Operator B Break (12:00 - 12:30)**: Operator A returns and covers Operator B’s Mimaki printer and Kongsberg cutter.
> - **Result**: Zero machine idle time, zero wasted ink from re-purging, and 100% production throughput.

---

### 2. Print Error Diagnostic & Troubleshooting Matrix

| Symptom | Root Cause | Immediate Corrective Action |
| :--- | :--- | :--- |
| **Horizontal White Lines (Banding)** | Missing nozzles / Clogged jet | Perform positive pressure purge & lint-free wipe. Re-print nozzle test. |
| **Fuzzy / Blurry Text Edge** | Excessive gantry height / Static buildup | Lower carriage to 1.5mm above media. Turn on anti-static ionizing bar. |
| **Ink Flaking / Peeling Off** | Low surface energy / Insufficient UV cure | Test media dyne level. Increase UV lamp power level or apply adhesion primer. |
| **Dark Horizontal Lines** | Overlapping passes / Feed calibration off | Adjust media feed compensation (PF adjust step value) in RIP software. |
| **Print Head Scratch Marks** | Warped substrate / Bowed board edge | Flatten board edge with hold-down clips or activate edge guide clamps. |
        `
      }
    ]
  },
  {
    id: 'm5',
    title: 'Module 5: CNC Digital Finishing & Heavy Routing',
    category: 'Finishing & CNC',
    iconName: 'Scissors',
    shortDesc: 'Master Kongsberg knife cutting, MultiCam CNC routing, spindle RPM/IPM formulas, camera registration, and vacuum zoning.',
    estimatedHours: '4.0 Hours',
    difficulty: 'Advanced',
    lessons: [
      {
        id: 'm5-l1',
        title: 'Lesson 5.1: Kongsberg Digital Knife Finishing & Tooling Selection',
        duration: '50 mins',
        summary: 'Learn drag knives, oscillating blades, kiss-cut tools, creasing wheels, and camera registration alignment.',
        keyTakeaways: [
          'Drag knives cut thin vinyl and paper; Oscillating knives use vertical high-frequency vibration to slice thick foam and corrugated.',
          'Creasing wheels require specific width and depth profiles matched to board flute orientation (E-flute vs B-flute).',
          'Optical Camera Registration scans printed target dots to automatically correct for material stretching, skew, and rotation.',
          'Under-lay felt mats protect the aluminum vacuum table surface from blade penetration damage.'
        ],
        content: `
### 1. Kongsberg Tooling System Taxonomy

| Tool Insert | Mechanical Operation | Ideal Substrates | Operating Parameters |
| :--- | :--- | :--- | :--- |
| **Standard Drag Knife** | Static blade dragged by carriage movement | Self-adhesive vinyl, paper, thin cardstock | Fast speed, low downward pressure |
| **Oscillating Knife (MPOR/HPU)** | Vertical reciprocating blade (12,000 strokes/min) | Corrugated plastic, Foam-Cor, Gatorfoam, Honeycomb board | High stroke frequency, medium feed rate |
| **Kiss-Cut Tool** | Spring-loaded precision depth blade | Sticker vinyl (cuts top film layer only, leaving liner intact) | Micro-depth adjustment (0.05mm precision) |
| **Creasing Wheel** | Rotating steel wheel (15mm to 60mm diameter) | Corrugated paperboard, folding carton box stock | High downward pressure (up to 50 kg) |
| **V-Notch Cut Tool** | Angled blades (45, 30, 22.5 degrees) | Re-board, Heavy Honeycomb board for 90 degree box corners | Dual pass angled slicing |

---

### 2. Camera Registration & Distortion Compensation
When paper or plastic boards pass through UV curing lamps, heat can cause non-linear material shrinkage (0.1% to 0.5%).

- **How i-cut Camera Registration Works**:
  1. The cutter operator aligns the laser pointer over the first printed target dot on the sheet.
  2. The optical camera scans 4 to 12 perimeter registration dots.
  3. The cutter software compares the scanned physical dot coordinates against the original CAD file coordinates.
  4. The system applies **3D Mesh Warping Compensation**—stretching, scaling, rotating, and distorting the cut vectors in real time to match the distorted print perfectly!
        `
      },
      {
        id: 'm5-l2',
        title: 'Lesson 5.2: MultiCam Heavy CNC Router Mechanics & Feed/Speed Calibration',
        duration: '60 mins',
        summary: 'Master heavy CNC routing for Acrylic, ACM, and Hardwood; calculate Chip Load, Spindle RPM, and IPM feed rates.',
        keyTakeaways: [
          'Chip Load is the thickness of material removed by a single cutting edge fluting during one revolution.',
          'Chip Load Formula: Chip Load = Feed Rate (IPM) / (Spindle RPM x Number of Flutes).',
          'Single-flute O-flute spiral bits are mandatory for Acrylic to evacuate chips and prevent plastic melting.',
          'High-vacuum table zoning and dust collection extraction are essential for clean, burr-free cut edges.'
        ],
        content: `
### 1. The Physics of CNC Routing: Chip Load Calibration
Unlike knife cutting, CNC routing uses a high-speed rotating cutter bit (spindle speeds up to 24,000 RPM) to carve away material.

#### Recommended Routing Parameters Reference Table

| Substrate | Bit Type | Spindle Speed (RPM) | Feed Rate (IPM) | Pass Count / Depth |
| :--- | :--- | :--- | :--- | :--- |
| **Acrylic (0.25" / 6mm)** | Single-Flute Up-cut O-Flute | 18,000 RPM | 150 IPM | 2 Passes (Roughing + Finishing) |
| **Expanded PVC (0.50" / 12mm)** | Twin-Flute Straight / Up-cut | 20,000 RPM | 250 IPM | 1 Pass Single Depth |
| **Aluminum Composite (ACM)** | 90 degree V-Groove Router Bit | 16,000 RPM | 180 IPM | Score aluminum skin + core (leave 0.02" skin) |
| **MDF / Solid Wood (0.75" / 19mm)** | Compression Spiral Bit | 18,000 RPM | 300 IPM | 2 Passes with Dust Shroud Active |

---

### 2. Router Bit Flute Geometries
- **Up-Cut Spiral**: Pulls chips UP and out of the cut channel. Excellent chip clearance, but can lift top facer of delicate laminates.
- **Down-Cut Spiral**: Pushes chips DOWN. Leaves an immaculate top surface edge, but requires high vacuum hold-down to prevent chip packing in the channel.
- **Compression Bit**: Combines Up-cut at the tip and Down-cut at the shank. Compresses both top and bottom edges inward—ideal for double-sided laminated wood and thick Gatorboard!
        `
      }
    ]
  },
  {
    id: 'm6',
    title: 'Module 6: Shop Floor Management, Work OS & Operations',
    category: 'Shop Floor & SOPs',
    iconName: 'ClipboardCheck',
    shortDesc: 'Master Monday.com work OS tracking, mandatory kitting protocols, standing ergonomics, and safety hazard controls.',
    estimatedHours: '2.5 Hours',
    difficulty: 'Intermediate',
    lessons: [
      {
        id: 'm6-l1',
        title: 'Lesson 6.1: Work OS Tracking, Schedule Shifts & Monday.com Dockets',
        duration: '40 mins',
        summary: 'Understand digital job dockets, real-time schedule adjustments, delivery priorities, and job tracking.',
        keyTakeaways: [
          'Production schedules constantly shift based on client rush orders and substrate delivery changes.',
          'Operators must review the Monday.com Production Dashboard at the beginning and middle of every shift.',
          'Job dockets contain critical specs: media substrate type, quantity, print quality pass count, finish cut paths, and pallet packing instructions.',
          'Always log completed quantity and waste counts into the Work OS immediately upon finishing a job run.'
        ],
        content: `
### 1. Digital Work OS & Job Docket Anatomy
Modern print shops manage workflow using cloud-based Work OS platforms (e.g., **Monday.com**). Operators interact with digital dockets containing all job specifications.

#### Key Fields on a Commercial Print Docket
1. **Docket ID & Job Name**: Unique tracking number (e.g., WWD-2026-8942: Coca-Cola POP Header).
2. **Substrate Requirements**: Exact stock brand, sheet size, caliper thickness, and quantity required.
3. **Press Setup Specs**: Assigned machine (TAURO / Mimaki), color mode (CMYK + White), pass count (6-Pass), and RIP file path.
4. **Finishing Specs**: Assigned cutter (Kongsberg / MultiCam), cut file name, bit type, and accessory kitting details (clips, display hooks, tape).
5. **Delivery Date & Shipping Priority**: Flagged as Standard, Rush, or Critical Event Launch.

---

### 2. Managing Dynamic Schedule Changes
Delivery dates and project priorities change dynamically throughout the shift.

- **Rule**: If a high-priority Rush Order appears on Monday.com while a long standard job is printing:
  1. Complete the current active board/sheet pass.
  2. Pause the press queue safely without shutting down UV lamps.
  3. Load the priority substrate, select the rush RIP file, and execute the rush run.
  4. Log the schedule change in Monday.com and resume the standard queue.
        `
      },
      {
        id: 'm6-l2',
        title: 'Lesson 6.2: Mandatory Kitting SOP, Standing Ergonomics & Shop Floor Safety',
        duration: '45 mins',
        summary: 'Master zero-idle kitting protocols, pallet staging rules, standing ergonomics, and shop floor PPE standards.',
        keyTakeaways: [
          'Mandatory Kitting SOP: During any machine downtime or maintenance hold, operators MUST kit display accessories.',
          'Pallet Staging Rule: Printed material MUST ALWAYS be stacked on pallets—NEVER on tables—for easy pallet jack/forklift transport.',
          'Standing Ergonomics: Shift work involves 8+ hours standing; shift weight regularly and maintain neutral posture.',
          'PPE Mandates: CSA-approved steel-toe boots, UV safety glasses, hearing protection, and chemical gloves are mandatory.'
        ],
        content: `
### 1. The Mandatory Kitting Protocol During Idle Periods

> **Zero Idle Time Rule**:
> If a press or CNC cutter is waiting for maintenance, ink warm-up, or substrate delivery:
> 1. **Notify Team Lead**: Report machine status immediately.
> 2. **Initiate Kitting**: Move to the kitting bench and assemble display accessory kits (e.g., bagging plastic hooks, attaching double-sided foam tape to header cards, folding shipping cartons).
> 3. **Rule**: *"There is NO time spent sitting or doing nothing on the shop floor."*

---

### 2. Material Staging & Substrate Housekeeping Rules
1. **Pallets Only Rule**: Printed boards, cut components, and raw substrates MUST be stacked neatly on wooden or plastic pallets. Stacking material directly on tables or floors restricts forklift access and creates safety trip hazards.
2. **Floor Sweeping & Shaving Removal**: CNC routers produce fine plastic and wood shavings. Operators must vacuum router beds and sweep floor areas daily to prevent dust accumulation near UV press air intake filters.
3. **Ergonomic Best Practices**:
   - Wear high-cushion anti-fatigue insoles inside safety boots.
   - Shift body weight from foot to foot every 15-20 minutes to reduce lower back pressure.
   - Use team lifting for any single object or board weighing over 50 lbs (22.6 kg).
        `
      }
    ]
  },
  {
    id: 'm7',
    title: 'Module 7: Interactive Day-1 Reference Hub & Simulators',
    category: 'Practical Tools',
    iconName: 'Tool',
    shortDesc: 'Access interactive press purge & CNC registration simulators, substrate feed/speed cheat sheet, and emergency troubleshooting finder.',
    estimatedHours: '2.0 Hours',
    difficulty: 'Mastery',
    lessons: [
      {
        id: 'm7-l1',
        title: 'Lesson 7.1: Interactive Equipment Simulators & Calibration Guidance',
        duration: '45 mins',
        summary: 'Interactive practice environment for UV press purging, nozzle diagnostic patterns, and CNC camera registration target alignment.',
        keyTakeaways: [
          'Simulated hands-on practice prepares you for physical machine controls on Day 1.',
          'Interactive feedback highlights common calibration mistakes before touching real production hardware.',
          'Mastering nozzle purging sequence and camera target locking builds operator confidence.'
        ],
        content: `
### Interactive Equipment Simulators Overview
Navigate to the **Simulators Tab** in the main navigation menu to launch the interactive software control panels:

1. **Press Purge & Nozzle Diagnostic Simulator**: Practice performing the 30-minute start-of-day purge, pressure valve flush, manual faceplate wipe, and nozzle check pattern inspection.
2. **CNC Camera Registration Alignment Simulator**: Practice manual laser pointer target positioning, camera auto-lock, 3D mesh warp compensation, and test cut depth verification.
        `
      },
      {
        id: 'm7-l2',
        title: 'Lesson 7.2: Day-1 Shift Survival Checklist & Emergency Troubleshooting Hub',
        duration: '35 mins',
        summary: 'Comprehensive quick-reference cheat sheet for your first day on the job.',
        keyTakeaways: [
          'Follow the Day-1 Shift Survival Checklist to ensure smooth integration with shop floor team leads.',
          'Keep the Emergency Troubleshooting Matrix bookmarked on your phone or mobile browser for instant answers.',
          'Always verify safety stop buttons and emergency power cut-offs before operating unfamiliar machinery.'
        ],
        content: `
### Day-1 Shift Survival Checklist

#### Morning Arrival (First 30 Minutes)
- [ ] Put on mandatory PPE: Steel-toe safety boots, UV safety glasses, hearing protection.
- [ ] Clock in and review the Monday.com Production Dashboard for assigned machine.
- [ ] Inspect machine area: Ensure floors are clean, free of clutter, and no chairs are in workstations.
- [ ] Perform start-of-day 30-minute press purge SOP and verify 100% nozzle jetting.

#### During Shift Operations
- [ ] Verify substrate specs against digital docket (stock brand, thickness, grain/flute direction).
- [ ] Measure substrate dyne level if printing non-porous plastics.
- [ ] Check OVERS inventory before starting new print runs.
- [ ] Ensure all printed output is stacked neatly on pallets—never on tables.
- [ ] Stagger lunch/rest breaks with partner operator so presses run continuously.

#### End-of-Shift Departure (Final 20 Minutes)
- [ ] Complete active print queue pass and log finished quantities in Monday.com.
- [ ] Perform end-of-day carriage wipe and secure printheads in capping station.
- [ ] Vacuum router shavings and sweep workstation floor completely clean.
- [ ] Hand over active docket notes to incoming shift operator.
        `
      }
    ]
  }
];
