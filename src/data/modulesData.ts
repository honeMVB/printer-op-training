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
    title: 'Module 1: Color Science, Management & RIP Calibration',
    category: 'Color & Physics',
    iconName: 'Printer',
    shortDesc: 'Master optics, D50 illuminants, CIELAB 3D color space, Delta E 2000 calculations, RIP linearization curves, TAC ink limits, and Pantone spot color matching.',
    estimatedHours: '4.5 Hours',
    difficulty: 'Foundation',
    lessons: [
      {
        id: 'm1-l1',
        title: 'Lesson 1.1: Applied Color Science, Vision & Illuminants (D50 vs D65)',
        duration: '50 mins',
        summary: 'Understand the physics of light reflection, human eye rod/cone perception, D50/D65 illuminants, and metamerism on the shop floor.',
        keyTakeaways: [
          'Visible light ranges from 380nm (violet) to 700nm (red). Inks work by absorbing specific wavelengths and reflecting others to the eye.',
          'D50 (5000K daylight) is the standard ISO 3664 viewing condition for graphic arts printing; D65 (6500K) is for outdoor signage.',
          'Metamerism occurs when two color samples match under factory fluorescent lights but shift dramatically under retail LED or natural sunlight.',
          'Always evaluate color proofs and test swatches inside a certified D50 viewing light booth before client sign-off.'
        ],
        content: `
## 1. The Physics of Color & Subtractive Primaries
Color is not an inherent property of a material; it is light reflected off a surface and perceived by the human eye. Visible light occupies a narrow band of the electromagnetic spectrum between **380nm (violet)** and **700nm (red)**.

In digital wide-format printing, inks operate on the **subtractive color model**:
- **Cyan Ink**: Absorbs Red light ($600-700\\text{nm}$), reflects Green + Blue.
- **Magenta Ink**: Absorbs Green light ($500-600\\text{nm}$), reflects Red + Blue.
- **Yellow Ink**: Absorbs Blue light ($400-500\\text{nm}$), reflects Red + Green.
- **Black Ink (K)**: Absorbs all visible wavelengths, providing deep optical density and black point contrast.

---

## 2. Standard Illuminants: D50 vs. D65
Light sources emit different color temperatures. The spectral power distribution of your shop floor lighting dictates how colors look.

| Illuminant | Color Temp (Kelvin) | Industry Standard Application |
| :--- | :--- | :--- |
| **D50** | $5000\\text{K}$ (Direct Daylight) | **ISO 3664 Standard** for Graphic Arts, Pre-Press, Proofing & Brand Matching |
| **D65** | $6500\\text{K}$ (Overcast Sky) | Outdoor Signage, Automotive Paints, Plastics Evaluation |
| **Store LED / CWF** | $3000\\text{K} - 4100\\text{K}$ | Retail Store Displays (Cool White Fluorescent / Store LED) |

### Shop Floor Reality: Metamerism
> [!WARNING]
> **Metamerism Warning**: A corporate brand red (e.g. Coca-Cola Red) printed on corrugated plastic may look 100% identical to a paper proof under your shop floor's $4100\\text{K}$ fluorescent ceiling lights, but look distinctly orange when installed under $3000\\text{K}$ warm retail LEDs. Always evaluate brand critical prints inside a standard **D50 Light Booth**.

---

## 3. CIELAB 3D Color Space ($L^*a^*b^*$)
CIELAB is a device-independent 3D color model designed to mimic human visual perception:

- **$L^*$ (Lightness)**: Scale from $0$ (Absolute Black) to $100$ (Pure White).
- **$+a^*$**: Represents Red shift; **$-a^*$**: Represents Green shift.
- **$+b^*$**: Represents Yellow shift; **$-b^*$**: Represents Blue shift.

When you measure a printed swatch using a spectrophotometer (e.g. **X-Rite i1Pro 3** or **Barbieri Spectro LFP**), the instrument outputs exact $L^*a^*b^*$ coordinates (e.g., $L^*=47.2, a^*=68.1, b^*=48.4$).
        `,
        caseStudy: {
          title: 'Metameric Color Shift Dispute',
          description: 'A national pharmacy chain rejected 2,000 retail display headers because the corporate teal background looked green inside retail stores despite passing shop floor inspection.',
          keyLesson: 'The press operator evaluated color under uncalibrated shop ceiling lights. Operators must measure $L^*a^*b^*$ values with a spectrophotometer and verify under $D50$ light booths before running production.'
        }
      },
      {
        id: 'm1-l2',
        title: 'Lesson 1.2: Delta E Calculations, Linearization & TAC Ink Limits',
        duration: '60 mins',
        summary: 'Step-by-step procedures for calculating Delta E 2000, performing RIP linearization, and setting Total Area Coverage ink limits.',
        keyTakeaways: [
          'Delta E 2000 (ΔE00) is the international standard for quantifying color difference. ΔE < 2.0 is the target for brand matching.',
          'Linearization adjusts RIP lookup curves to ensure linear ink density steps (0% to 100%) and correct dot gain.',
          'Total Area Coverage (TAC / Ink Limit) sets maximum combined ink volume (typically 260% to 300% for UV printing).',
          'Exceeding TAC limits causes wet ink pooling, UV lamp under-curing, ink odor, and flaking during CNC routing.'
        ],
        content: `
## 1. Delta E 2000 ($\\Delta E_{00}$) Standards
Delta E quantifies the Euclidean distance between a target proof color ($L_1^*, a_1^*, b_1^*$) and a printed sample ($L_2^*, a_2^*, b_2^*$).

### Industry Acceptance Tolerances ($\\Delta E_{00}$)

| $\\Delta E_{00}$ Score | Visual Perception | Shop Floor Status |
| :--- | :--- | :--- |
| **$< 1.0$** | Imperceptible to trained eye | **Pass**: ISO Master Match / Proof Standard |
| **$1.0 - 2.0$** | Very slight difference | **Pass**: Standard Brand Target (Strict Client QC) |
| **$2.0 - 3.5$** | Noticeable on side-by-side check | **Acceptable**: General Commercial Signage |
| **$> 3.5$** | Obvious color shift | **REJECT**: Immediate RIP Adjustment Required |

---

## 2. Step-by-Step RIP Linearization SOP
**Linearization** compensates for dot gain (ink spreading outward on media) by mapping requested input percentages to true measured output densities.

### Operator Step-by-Step Procedure (Onyx / Agfa Asanti / Caldera):
1. **Load Media**: Mount target substrate (e.g. 3mm Expanded PVC) onto the press.
2. **Print Linearization Chart**: In RIP Media Manager, select **Print Linearization Target**. The press prints single-channel tint strips ($0\\%, 10\\%, 20\\%, \\dots, 100\\%$) for Cyan, Magenta, Yellow, and Black.
3. **Scan Target**: Place the spectrophotometer (X-Rite i1Pro) on the calibration track and scan each color strip.
4. **Build Curve**: The RIP calculates dot gain density shifts and generates a inverse Look-Up Table (LUT) curve. For example, if $50\\%$ Cyan input produces $68\\%$ density, the LUT pulls input back to $38\\%$ so the printed result measures true $50\\%$.

---

## 3. Total Area Coverage (TAC / Ink Limiting)
**TAC** (Total Area Coverage) is the maximum combined percentage of $C + M + Y + K$ ink laid down in dark shadow areas.

$$\\text{TAC (\\%)} = C\\% + M\\% + Y\\% + K\\%$$

- **Unrestricted Maximum**: $100\\% C + 100\\% M + 100\\% Y + 100\\% K = 400\\% \\text{ TAC}$.
- **UV Wide-Format Target**: Set TAC between **$260\\% - 300\\%$** in RIP Media Setup.

> [!IMPORTANT]
> **Why Excessive TAC Causes Failure**:
> Laying down $>320\\%$ TAC on non-porous plastics (Sintra, Acrylic) prevents UV LED lamps from curing bottom ink layers. Ink remains tacky, emits solvent odor, and immediately flakes off when the CNC router cutter slices through the board.
        `
      },
      {
        id: 'm1-l3',
        title: 'Lesson 1.3: Spot Color Matching & Pantone Swatch Patch Troubleshooting',
        duration: '55 mins',
        summary: 'How to match brand Pantone colors using RIP spot color libraries, extended gamut inks (OGV), and swatch grid search charts.',
        keyTakeaways: [
          'RIP spot color libraries automatically map Pantone PMS numbers to Lab coordinates or extended gamut ink combinations.',
          'Extended Gamut (OGV: Orange, Green, Violet) expands CMYK gamut coverage from 70% to over 90% of Pantone PMS colors.',
          'When a spot color prints off-target, operators print a Spot Color Swatch Grid of nearby CMYK/Lab variations.',
          'Always save visually matched spot color overrides into the client-specific RIP spot library.'
        ],
        content: `
## 1. Spot Color Matching Mechanics
Corporate clients specify exact Pantone Matching System (PMS) numbers (e.g. **PMS 185 C Red**). Digital presses convert spot colors into process ink combinations using RIP lookup tables.

---

## 2. Extended Gamut Inks (CMYK + OGV)
Standard 4-color CMYK printing can only reproduce roughly **$70\\%$** of the Pantone solid spot color library. High-end industrial presses add **Orange, Green, and Violet (OGV)** inks to expand the color gamut volume, allowing direct reproduction of over **$92\\%$** of Pantone PMS colors.

---

## 3. Shop Floor SOP: Spot Color Swatch Patch Matching
When a printed Pantone red looks slightly yellow or dark on a specific plastic stock, follow this exact shop floor override procedure:

1. **Open RIP Spot Color Library**: Locate the target PMS color (e.g. PMS 185 C) in Onyx / Asanti.
2. **Generate Swatch Search Grid**: Select **Print Swatch Grid**. The RIP generates a $5 \\times 5$ or $7 \\times 7$ grid of micro-variations centered on the target Lab/CMYK values, altering Cyan by $\\pm 2\\%$ and Yellow by $\\pm 3\\%$.
3. **Print Swatch Sheet**: Print the swatch grid on the exact production substrate using production pass counts.
4. **Visual & Spectro Evaluation**: Place the physical Pantone Solid Coated swatch book next to the printed grid inside a **D50 Light Booth**. Select the patch that matches visually (or measure with spectrophotometer for $\\Delta E < 1.0$).
5. **Save Override**: Type the selected patch CMYK values into the RIP customer spot library. All future dockets for this customer will automatically use the corrected values.
        `
      }
    ]
  },
  {
    id: 'm2',
    title: 'Module 2: Substrate Engineering, Surface Chemistry & Yield',
    category: 'Materials & Production',
    iconName: 'Layers',
    shortDesc: 'Master rigid and flexible media properties, Corona Dyne testing, static charge suppression, grain orientation, and the OVERS depletion rule.',
    estimatedHours: '4.0 Hours',
    difficulty: 'Foundation',
    lessons: [
      {
        id: 'm2-l1',
        title: 'Lesson 2.1: Substrate Taxonomy & Mechanical Cutting Parameters',
        duration: '60 mins',
        summary: 'Exhaustive taxonomy of rigid plastics, corrugated paper/plastics, composite boards, aluminum composite (ACM), and roll media.',
        keyTakeaways: [
          'Expanded PVC (Sintra) is rigid, lightweight, and cuts cleanly with single-flute CNC router bits or heavy drag knives.',
          'Acrylic (PMMA) requires polished single-flute O-flute bits and 2-pass routing (roughing + 0.5mm finishing) to prevent edge melting.',
          'Corrugated flutes (E, B, C) dictate structural folding strength. Folds must run parallel to internal flutes.',
          'Aluminum Composite Material (ACM/Dibond) requires 90° V-groove routing through top aluminum skin + core for 90° hand folding.'
        ],
        content: `
## 1. Exhaustive Industrial Substrate Taxonomy

| Material Name | Common Brand Names | Chemical Composition | Best Cutting Tool | Tool Speeds (RPM / IPM) | Common Applications |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Expanded PVC Foam** | Sintra, Komatex, Celtec | Closed-cell polyvinyl chloride | CNC Router / Single-flute Up-cut | 18,000 RPM / 220 IPM | Indoor/Outdoor Signage, Retail Fixtures, POP Displays |
| **Cast / Extruded Acrylic** | Plexiglas, Perspex, Lucite | Polymethyl methacrylate (PMMA) | Single-flute Polished O-Flute | 18,000 RPM / 150 IPM | High-end retail displays, illuminated signs, cosmetics |
| **Aluminum Composite** | ACM, Dibond, Alupanel | Polyethylene core + 0.3mm aluminum skins | 90° V-Groove Router Bit | 16,000 RPM / 180 IPM | Architectural signage, exterior building fascia, rigid displays |
| **Corrugated Plastic** | Coroplast, IntePlast | Fluted polypropylene plastic | High-Frequency Oscillating Knife | 12,000 Strokes/min / 300 IPM | Yard signs, temporary packaging, pallet wraps |
| **Corrugated Paperboard** | E, B, C, EB Flute Linerboard | Recycled kraft paperliner | Oscillating Knife + Creasing Wheel | Wheel Press: 40kg / 400 IPM | Retail dump bins, counter displays, shipping cartons |
| **Heavy Paper Foam** | Gatorfoam, Foam-Cor | Polystyrene core + clay coated facers | Heavy Carbide Oscillating Blade | 12,000 Strokes/min / 250 IPM | Photo mounting, exhibition panels, hanging signs |

---

## 2. Flute Direction & Structural Packaging Rules
Corrugated board strength is directional. Internal flutes act as structural columns:

- **E-Flute**: Caliper thickness $\\approx 1.5\\text{mm}$ (1/16"). High print smooth surface, used for small counter displays.
- **B-Flute**: Caliper thickness $\\approx 3.0\\text{mm}$ (1/8"). Excellent crush resistance, standard for retail POP floor displays.
- **C-Flute**: Caliper thickness $\\approx 4.0\\text{mm}$ (3/16"). Used for heavy shipping boxes.

> [!IMPORTANT]
> **Grain Alignment Mandate**: Always position main vertical support panels so flutes run **vertically**. Placing flutes horizontally reduces display load capacity by over $70\\%$, causing retail floor displays to buckle under product weight.
        `
      },
      {
        id: 'm2-l2',
        title: 'Lesson 2.2: Corona Dyne Testing, Static Suppression & OVERS Policies',
        duration: '50 mins',
        summary: 'How to perform Corona Dyne testing, apply adhesion primers, eliminate static electricity, and enforce the OVERS depletion mandate.',
        keyTakeaways: [
          'UV inks require a substrate surface energy >= 44 dynes/cm for chemical adhesion.',
          'If Dyne pen ink beads up within 2 seconds, surface energy is too low. Apply chemical adhesion primer wipe or flame treatment.',
          'Static charge (>15,000V) deflects flying droplets, causing fuzzy text overspray. Use ionizing anti-static bars.',
          'The OVERS Mandate: Always inspect OVERS inventory and deduct existing stock components before starting new print runs.'
        ],
        content: `
## 1. Dyne Level Surface Energy Testing SOP
Non-porous plastics (Polypropylene, Polyethylene, Acrylic) naturally have low surface energy ($<30 \\text{ dynes/cm}$). Liquid UV ink cannot wet out on low-dyne surfaces.

### Operator Dyne Testing Procedure:
1. **Select Dyne Pen**: Grab a **44 Dyne/cm Corona Test Pen** from the tool rack.
2. **Draw Test Stroke**: Draw a 3-inch liquid line across the corner of the raw plastic board.
3. **Observe Wetting Behavior**:
   - **PASS**: Liquid stays in a smooth continuous film for $\\ge 2 \\text{ seconds}$. Surface energy is $\\ge 44 \\text{ dynes/cm}$. Proceed directly to printing.
   - **FAIL**: Liquid breaks up into isolated beads within $2 \\text{ seconds}$. Surface energy is too low ($<44 \\text{ dynes/cm}$).

### Corrective Action for Low Dyne Boards:
- Apply liquid **Adhesion Promoter Primer** (e.g. AGFA Adhesion Primer) using a lint-free microfiber wipe across the board.
- Alternatively, activate the press **Corona Flame Treater** unit prior to the printing pass.

---

## 2. Static Electricity & Overspray Suppression
Friction during sheet unstacking generates static charges exceeding **$15,000\\text{ Volts}$**. Static electricity creates a magnetic force that pulls microscopic flying ink droplets off their trajectory.

- **Symptom**: Fine text has a blurry outline or tiny ink dots scattered around edges ("satellite overspray").
- **Prevention**: Turn on anti-static ionizing bars on the press carriage and wipe plastic sheets with an anti-static cloth before loading.

---

## 3. The "OVERS" Depletion Mandate
In display manufacturing, minimum sheet nest setups frequently generate extra components ("OVERS").

> [!IMPORTANT]
> **Mandatory OVERS Rule**:
> 1. **Record & Store**: When a job completes, any extra header cards or side panels must be tagged with the docket number and placed in assigned inventory racks.
> 2. **Check Before Printing**: Before starting a repeat job order, check Monday.com OVERS inventory logs.
> 3. **Deduct**: If 50 extra headers exist in OVERS inventory for a 500-unit order, deduct 50 units and print only 450 new headers. Printing full sheets "just because it is easier" is strictly forbidden.
        `
      }
    ]
  },
  {
    id: 'm3',
    title: 'Module 3: Pre-Press Vector Engineering & Esko i-cut Suite',
    category: 'Pre-Press & Software',
    iconName: 'FileCode',
    shortDesc: 'Master Adobe Illustrator prepress, spot color dieline naming, overprint attributes, bleeds, Esko i-cut structural design, and camera targets.',
    estimatedHours: '4.5 Hours',
    difficulty: 'Intermediate',
    lessons: [
      {
        id: 'm3-l1',
        title: 'Lesson 3.1: Adobe Illustrator Pre-Press, Dielines & Overprint Attributes',
        duration: '60 mins',
        summary: 'Detailed procedures for creating spot color vector dielines, setting Overprint Stroke, bleeds, and converting text to outlines.',
        keyTakeaways: [
          'Cut contour lines MUST be vector strokes defined as 100% Spot Colors with exact names (CutContour, KissCut, Crease).',
          'Overprint Stroke MUST be enabled in Illustrator Attributes panel to prevent RIP software from knocking out underlying artwork.',
          'Bleed allowance is 0.125" (3mm) for thin materials and 0.25" (6mm) for thick rigid boards.',
          'All text fonts MUST be converted to vector outlines (Ctrl+Shift+O) before sending files to pre-press RIPs.'
        ],
        content: `
## 1. Multi-Layer Illustrator File Structure
Commercial print pre-press requires isolating artwork, vector cut lines, registration marks, and notes into separate layers inside Adobe Illustrator.

---

## 2. Standard Dieline Spot Color Naming Matrix

| Operation | Stroke Swatch Name | Color Type | Color Representation | Stroke Weight | Required Attribute |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Full Cut (Thru-Cut)** | \`CutContour\` | Spot Color | 100% Magenta | 0.25 pt | **Overprint Stroke ENABLED** |
| **Vinyl Kiss-Cut** | \`KissCut\` | Spot Color | 100% Cyan | 0.25 pt | **Overprint Stroke ENABLED** |
| **Score / Crease Line** | \`Crease\` | Spot Color | 100% Green | 0.25 pt | **Overprint Stroke ENABLED** |
| **ACM V-Groove Fold** | \`VGroove\` | Spot Color | 100% Yellow | 0.50 pt | **Overprint Stroke ENABLED** |
| **i-cut Reg Marks** | \`i-cut\` | Spot Color | 100% Black | Solid 6mm Circle | Standard Fill |

### How to Set Overprint Stroke in Illustrator:
1. Select the vector stroke path.
2. Open Attributes Panel: \`Window > Attributes\`.
3. Check the box for **Overprint Stroke**.

> [!IMPORTANT]
> **Why Overprint Stroke is Non-Negotiable**: If Overprint Stroke is UNCHECKED, the RIP software treats the cut line as a graphic path and erases (knocks out) a white line in the background image underneath the stroke. When the CNC knife cuts the board, a thin white unprinted margin will show along the edge of the finished display.

---

## 3. Bleed & Safe Margin Setup
- **Thin Media (<1mm)**: Set exterior graphic bleed to **$0.125"$ ($3.175\\text{mm}$)** beyond the \`CutContour\` line using \`Object > Path > Offset Path\`.
- **Thick Rigid Board (3mm - 16mm)**: Set exterior graphic bleed to **$0.25"$ ($6.35\\text{mm}$)**.
- **Safe Margin**: Keep critical logos, text, and barcodes at least **$0.25"$ ($6.35\\text{mm}$)** inside the \`CutContour\` path.
        `
      },
      {
        id: 'm3-l2',
        title: 'Lesson 3.2: Esko i-cut Suite Structural Packaging & Camera Targets',
        duration: '55 mins',
        summary: 'How to import CAD dielines, calculate creasing allowances, auto-nest layouts, and configure i-cut Vision camera targets.',
        keyTakeaways: [
          'Esko i-cut Layout calculates optimal nested sheet arrangements to maximize substrate yield (>90%).',
          'i-cut Vision camera dots (6mm solid black circles) must be placed around sheet perimeters to guide cutter cameras.',
          'Automated barcodes printed on sheets allow cutter operators to scan boards and open matching cut files instantly.',
          'Crease allowances must account for board caliper thickness to prevent facer cracking during 90° box folding.'
        ],
        content: `
## 1. Esko i-cut Layout & Auto-Nesting Workflow
**Esko i-cut Suite** connects pre-press artwork files with digital flatbed cutters (Kongsberg, MultiCam, Zünd).

---

## 2. i-cut Vision Camera Target Rules
1. **Target Placement**: Place solid 6mm black circles (\`i-cut\` spot color) around the outer perimeter of the nested sheet layout.
2. **Spacing**: Place registration dots at least $10\\text{mm}$ away from artwork edges and space them $300\\text{mm} - 500\\text{mm}$ apart.
3. **Corner Orientation**: Place 3 dots in an asymmetric L-shape in one corner to allow the cutter camera to detect if a board was loaded upside down or backwards!

---

## 3. Barcode Automation Workflow
i-cut automatically prints a 1D Code-128 or 2D QR barcode at the leading edge of the printed sheet.
- When the cutter operator lays the pallet on the Kongsberg/MultiCam table, the optical camera scans the barcode.
- The cutter software queries the local network server, retrieves job docket \`WWD-8942.ACM\`, and loads the exact cutting tool paths automatically—eliminating manual file opening mistakes!
        `
      }
    ]
  },
  {
    id: 'm4',
    title: 'Module 4: Industrial Press Mechanics & Maintenance SOPs',
    category: 'Equipment Operations',
    iconName: 'Cpu',
    shortDesc: 'Master AGFA TAURO & Mimaki press architecture, sub-tank meniscus negative pressure, 30-min start-of-day purge SOPs, and nozzle diagnostics.',
    estimatedHours: '5.0 Hours',
    difficulty: 'Advanced',
    lessons: [
      {
        id: 'm4-l1',
        title: 'Lesson 4.1: Press Ink Systems, Meniscus Control & Start-of-Day Purge SOP',
        duration: '65 mins',
        summary: 'Deep dive into UV press ink hydraulics, sub-tank meniscus pressure, white ink recirculation, and the 30-minute start-of-day purge protocol.',
        keyTakeaways: [
          'Sub-tanks maintain negative pressure (-3.0 to -4.5 mbar) to keep ink at the nozzle plate without leaking or sucking air.',
          'White ink uses Titanium Dioxide (TiO2) which settles quickly; white lines require continuous agitation/recirculation.',
          'Start-of-day purge MUST be completed within 30 minutes: warmup check, pressure purge, poly-cloth wipe, nozzle test grid.',
          'Never scrub printhead faceplates back and forth; wipe in a single forward direction using solvent-saturated poly-cloth wipes.'
        ],
        content: `
## 1. Press Ink Hydraulics & Meniscus Pressure
Industrial UV inkjet presses (AGFA TAURO, Mimaki, Durst) use complex hydraulic ink delivery systems:

- **Meniscus Control**: Sub-tanks maintain a slight negative pressure (typically **$-3.0 \\text{ to } -4.5 \\text{ mbar}$**). This creates a concave meniscus (surface tension curve) at each nozzle tip, holding the ink in place.
  - **Too Little Vacuum ($-1.0\\text{ mbar}$)**: Ink drips continuously off the printhead faceplate.
  - **Too Much Vacuum ($-7.0\\text{ mbar}$)**: Air is sucked into nozzle channels, causing complete jetting failure.
- **White Ink Recirculation**: White ink contains heavy Titanium Dioxide ($\\text{TiO}_2$) particles. If white ink sits idle for $>15$ minutes, pigment settles out of suspension, clogging $3,000 printheads. Presses run continuous white ink pumps 24/7.

---

## 2. Exhaustive Start-of-Day Purge SOP (30-Minute Limit)

### Detailed Operator Step-by-Step Execution:
1. **Inspect Gauges**: Verify sub-tank ink temperatures ($45^\\circ\\text{C}$ for correct ink viscosity), waste ink bottle volume, and UV chiller coolant temp ($20^\\circ\\text{C} \\pm 1^\\circ\\text{C}$).
2. **Execute Purge**: On the press control screen, press **Positive Pressure Purge** for 3 seconds. Ink flushes out of all nozzle channels, purging micro-bubbles.
3. **Faceplate Maintenance**:
   - Take a clean, lint-free poly-wipe cloth. Saturate it with approved UV flush solution.
   - Wipe the underside of the printhead in **ONE smooth forward direction**.
   - **NEVER scrub back and forth**—scrubbing pushes dirt and dried ink scrapings back into delicate nozzle orifices!
4. **Nozzle Test Grid Inspection**: Print a nozzle diagnostic grid on roll paper or scrap board. Inspect every individual nozzle line under a magnifying eye loupe.
        `
      },
      {
        id: 'm4-l2',
        title: 'Lesson 4.2: Nozzle Diagnostics, Head Strike Prevention & Zero Downtime',
        duration: '55 mins',
        summary: 'How to diagnose missing nozzles vs air locks vs cross-contamination, prevent head strikes, and execute continuous shift coverage.',
        keyTakeaways: [
          'Deflected nozzles fire ink at an angle, causing banding; missing nozzles indicate clogged jets or trapped air bubbles.',
          'Head strikes occur when bowed boards catch the moving carriage, causing thousands of dollars in printhead damage.',
          'Set carriage gantry clearance to 1.5mm - 2.0mm above media and keep anti-crash bumper sensors enabled.',
          'Zero-Downtime SOP: Stagger operator lunch breaks to keep presses running continuously and prevent head heat-soaking.'
        ],
        content: `
## 1. Nozzle Failure Diagnostic Matrix

| Visual Defect | Root Cause | Operator Corrective Action |
| :--- | :--- | :--- |
| **Missing Lines in Grid** | Clogged nozzle orifice or dry ink crust | Perform 3-sec pressure purge + poly-cloth wipe with flush solution. |
| **Blank Entire Color Channel** | Trapped air lock in sub-tank line | Open manual air release valve on sub-tank; execute high-volume flush. |
| **Fired Droplet Spitting / Deflection** | Hair, lint fiber, or ink drop clinging to nozzle edge | Inspect faceplate with mirror; remove lint with poly-wipe. |
| **Cross-Color Contamination (Cyan in Yellow)** | Leaking capping station seal or faceplate flooding | Clean rubber capping station seals; check negative pressure vacuum setting. |

---

## 2. Preventing Head Strikes
A **head strike** occurs when a bowed or warped board edge hits the bottom of the moving printhead carriage.

- **Prevention Rules**:
  - Always inspect rigid sheets for edge curl before loading.
  - Set gantry height to **$1.5\\text{mm} - 2.0\\text{mm}$** above measured substrate thickness.
  - Keep the **Carriage Anti-Crash Bumper Sensor Bar** enabled at all times. If the bumper touches an uneven board, the carriage halts instantly before printheads contact the substrate.

---

## 3. Zero-Downtime Shift Management
Allowing UV presses to sit idle with UV lamps warm causes heat migration into printhead nozzle plates, thickening ink and causing severe nozzle clogging.

> [!IMPORTANT]
> **Staggered Break Coverage Protocol**:
> Operators stagger lunch and rest breaks. When Operator A goes on lunch, Operator B steps over and covers Operator A's TAURO press—loading boards and unloading finished pallets. Presses run 100% continuously throughout the shift.
        `
      }
    ]
  },
  {
    id: 'm5',
    title: 'Module 5: CNC Digital Finishing & Heavy Routing Physics',
    category: 'Finishing & CNC',
    iconName: 'Scissors',
    shortDesc: 'Master Kongsberg knife mechanics, MultiCam CNC routing physics, Chip Load formulas, router bit geometries, and 3D camera warp compensation.',
    estimatedHours: '5.0 Hours',
    difficulty: 'Advanced',
    lessons: [
      {
        id: 'm5-l1',
        title: 'Lesson 5.1: Kongsberg Knife Tooling Taxonomy & Creasing Mechanics',
        duration: '55 mins',
        summary: 'Detailed operating mechanics of drag knives, high-frequency oscillating blades, kiss-cut depth tools, and creasing wheels.',
        keyTakeaways: [
          'Drag knives cut thin vinyl and paper; Oscillating knives use 12,000 strokes/min vertical vibration to slice thick board.',
          'Oscillating blades cut corrugated paper and foam without crushing internal flutes.',
          'Creasing wheels require specific width and depth profiles matched to board flute orientation (E, B, C flute).',
          'Felt underlay mats protect aluminum vacuum table surfaces from knife blade penetration.'
        ],
        content: `
## 1. Kongsberg Knife Tooling System Mechanics

| Tool Type | Mechanical Action | Best Substrates | Operating Settings |
| :--- | :--- | :--- | :--- |
| **Standard Drag Knife** | Static blade dragged by carriage movement | Self-adhesive vinyl, paper, cardstock | Fast speed, low downward pressure |
| **Oscillating Knife (MPOR/HPU)** | Vertical reciprocating blade ($12,000 \\text{ strokes/min}$) | Corrugated plastic, Foam-Cor, Gatorfoam, Honeycomb board | High stroke frequency, medium feed rate |
| **Kiss-Cut Tool** | Spring-loaded precision depth blade | Sticker vinyl (cuts top film only, leaving liner intact) | Micro-depth adjustment ($0.05\\text{mm}$ precision) |
| **Creasing Wheel** | Rotating steel wheel ($15\\text{mm}-60\\text{mm}$ diameter) | Corrugated paperboard, folding carton box stock | High downward pressure (up to $50\\text{ kg}$) |
| **V-Notch Cut Tool** | Angled blades ($45^\\circ, 30^\\circ, 22.5^\\circ$) | Re-board, Heavy Honeycomb board for 90° box corners | Dual pass angled slicing |

---

## 2. Creasing Mechanics & Flute Direction
Creasing wheels press structural score lines into corrugated board to prepare for folding:
- **Creasing Parallel to Flutes**: Requires less downward pressure ($20-30\\text{ kg}$).
- **Creasing Perpendicular to Flutes**: Requires higher pressure ($40-50\\text{ kg}$) and wider wheel profiles to prevent linerboard tearing.
        `
      },
      {
        id: 'm5-l2',
        title: 'Lesson 5.2: MultiCam CNC Routing Physics, Chip Load & Flute Geometries',
        duration: '65 mins',
        summary: 'Master heavy CNC routing for Acrylic and ACM; calculate Chip Load, Spindle RPM, Feed Rate IPM, and select router bit geometries.',
        keyTakeaways: [
          'Chip Load is the thickness of material removed by a single cutting edge fluting during one revolution.',
          'Chip Load Formula: Chip Load = Feed Rate (IPM) / (Spindle RPM x Number of Flutes).',
          'Low Chip Load causes bit rubbing, friction heat, plastic melting, and chip welding.',
          'Single-flute polished O-flute spiral bits are mandatory for Acrylic to evacuate chips quickly.',
          'ACM V-groove routing leaves bottom 0.5mm aluminum skin intact for 90° hand folding.'
        ],
        content: `
## 1. Heavy Routing Physics: Chip Load Calibration
Unlike knife cutting, CNC routing uses a high-speed rotating cutter bit (spindle speeds up to $24,000 \\text{ RPM}$) to carve away material.

$$\\text{Chip Load (Inches Per Tooth)} = \\frac{\\text{Feed Rate (IPM)}}{\\text{Spindle Speed (RPM)} \\times \\text{Number of Cutting Flutes}}$$

### Why Incorrect Chip Load Destroys Materials:
- **Chip Load Too Small (RPM too high / IPM too slow)**: The bit rubs against the plastic instead of cutting chips. Friction generates extreme heat, melting the plastic and welding it around the bit (**chip welding**).
- **Chip Load Too Large (IPM too fast / RPM too slow)**: Excessive physical force breaks the bit or gouges rough chips out of acrylic edges.

---

## 2. Recommended Routing Parameters Reference Table

| Substrate | Bit Type | Spindle Speed (RPM) | Feed Rate (IPM) | Pass Count / Depth |
| :--- | :--- | :--- | :--- | :--- |
| **Acrylic (0.25" / 6mm)** | Single-Flute Up-cut O-Flute | 18,000 RPM | 150 IPM | 2 Passes (Roughing + 0.5mm Finishing) |
| **Expanded PVC (0.50" / 12mm)** | Twin-Flute Straight / Up-cut | 20,000 RPM | 250 IPM | 1 Pass Single Depth |
| **Aluminum Composite (ACM)** | 90° V-Groove Router Bit | 16,000 RPM | 180 IPM | Score aluminum skin + core (leave 0.5mm skin) |
| **MDF / Wood (0.75" / 19mm)** | Compression Spiral Bit | 18,000 RPM | 300 IPM | 2 Passes with Dust Shroud Active |

---

## 3. Router Bit Flute Geometries
- **Up-Cut Spiral**: Pulls chips UP and out of the cut channel. Excellent chip clearance, but can lift top facer of delicate laminates.
- **Down-Cut Spiral**: Pushes chips DOWN. Leaves an immaculate top surface edge, but requires high vacuum hold-down to prevent chip packing in the channel.
- **Compression Bit**: Combines Up-cut at the tip and Down-cut at the shank. Compresses both top and bottom edges inward—ideal for double-sided laminated wood and thick Gatorboard!

---

## 4. Camera Vision & 3D Distortion Compensation
When paper or plastic boards pass through UV curing lamps, heat causes non-linear material shrinkage ($0.1\\% \\text{ to } 0.5\\%$).

- **Camera Scan**: The optical camera mounted on the Kongsberg / MultiCam head scans the printed 6mm black dots around the board perimeter.
- **3D Mesh Warping**: The cutter software compares scanned physical dot coordinates against original CAD vector coordinates and applies real-time non-linear mesh warping—stretching, scaling, and rotating cut paths to match distorted prints perfectly!
        `
      }
    ]
  },
  {
    id: 'm6',
    title: 'Module 6: Shop Floor SOPs, Work OS & Operations',
    category: 'Shop Floor & SOPs',
    iconName: 'ClipboardCheck',
    shortDesc: 'Master Monday.com work OS tracking, mandatory kitting protocols, standing ergonomics, and safety hazard controls.',
    estimatedHours: '3.0 Hours',
    difficulty: 'Intermediate',
    lessons: [
      {
        id: 'm6-l1',
        title: 'Lesson 6.1: Work OS Tracking, Schedule Shifts & Monday.com Dockets',
        duration: '45 mins',
        summary: 'Understand digital job dockets, real-time schedule adjustments, delivery priorities, and job tracking.',
        keyTakeaways: [
          'Production schedules constantly shift based on client rush orders and substrate delivery changes.',
          'Operators must review the Monday.com Production Dashboard at the beginning and middle of every shift.',
          'Job dockets contain critical specs: media substrate type, quantity, print quality pass count, finish cut paths, and pallet packing instructions.',
          'Always log completed quantity and waste counts into the Work OS immediately upon finishing a job run.'
        ],
        content: `
## 1. Digital Work OS & Job Docket Anatomy
Modern print shops manage workflow using cloud-based Work OS platforms (e.g., **Monday.com**). Operators interact with digital dockets containing all job specifications.

---

## 2. Managing Dynamic Schedule Changes
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
        duration: '50 mins',
        summary: 'Master zero-idle kitting protocols, pallet staging rules, standing ergonomics, and shop floor PPE standards.',
        keyTakeaways: [
          'Mandatory Kitting SOP: During any machine downtime or maintenance hold, operators MUST kit display accessories.',
          'Pallet Staging Rule: Printed material MUST ALWAYS be stacked on pallets—NEVER on tables—for easy pallet jack/forklift transport.',
          'Standing Ergonomics: Shift work involves prolonged standing; shift weight regularly and maintain neutral posture.',
          'PPE Mandates: CSA-approved steel-toe boots, UV safety glasses, hearing protection, and chemical gloves are mandatory.'
        ],
        content: `
## 1. Mandatory Kitting Protocol During Idle Periods

> [!IMPORTANT]
> **Zero Idle Time Rule**:
> If a press or CNC cutter is waiting for maintenance, ink warm-up, or substrate delivery:
> 1. **Notify Team Lead**: Report machine status immediately.
> 2. **Initiate Kitting**: Move to the kitting bench and assemble display accessory kits (bagging plastic hooks, attaching double-sided foam tape, folding shipping cartons).
> 3. **Rule**: *"There is NO time spent sitting or doing nothing on the shop floor."*

---

## 2. Material Staging & Substrate Housekeeping Rules
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
    title: 'Module 7: Interactive Workstations & Day-1 Reference',
    category: 'Practical Tools',
    iconName: 'Tool',
    shortDesc: 'Access interactive Prepress Dieline Inspector, RIP Console, Equipment Simulator, Substrate Cheat Sheet, and Emergency Troubleshooting Hub.',
    estimatedHours: '3.0 Hours',
    difficulty: 'Mastery',
    lessons: [
      {
        id: 'm7-l1',
        title: 'Lesson 7.1: Interactive Software Workstations & Machine Simulators Guide',
        duration: '50 mins',
        summary: 'Guide to operating the Prepress Inspector, RIP Console, and Machine Control Panel simulators.',
        keyTakeaways: [
          'Practice dieline verification in the Prepress Inspector before sending files to RIPs.',
          'Configure pass counts, TAC ink limits, and spot color patch overrides in the RIP Console.',
          'Execute positive pressure ink purges, read nozzle test grids, and align CNC camera targets in the Machine Simulator.'
        ],
        content: `
## Interactive Software Workstations Overview
Navigate to the **Equipment Simulators Tab** in the top menu bar to launch the 3 dedicated software workstations:

1. **Prepress Vector Dieline Inspector (Illustrator Style)**: Inspect client files, verify spot color names (\`CutContour\` / \`Crease\`), check Overprint Stroke attributes, and verify bleeds.
2. **RIP Software Console (Agfa Asanti / Onyx Style)**: Configure job queues, select 4-pass vs 8-pass modes, set TAC ink limits ($280\\%$), inspect linearization curves, and generate spot color swatch patch overrides.
3. **Machine Control & Diagnostic Panel**: Execute 3-second positive pressure ink flushes, read nozzle test grid patterns, diagnose missing jets, set CNC camera registration targets, and adjust router feed speeds / RPMs.
        `
      },
      {
        id: 'm7-l2',
        title: 'Lesson 7.2: Day-1 Survival Checklist & Emergency Troubleshooting Hub',
        duration: '40 mins',
        summary: 'Comprehensive quick-reference cheat sheet for your first day on the job.',
        keyTakeaways: [
          'Follow the Day-1 Survival Checklist to ensure smooth integration with shop floor team leads.',
          'Keep the Emergency Troubleshooting Matrix bookmarked on your phone or mobile browser for instant answers.',
          'Always verify safety stop buttons and emergency power cut-offs before operating unfamiliar machinery.'
        ],
        content: `
## Day-1 Shift Survival Checklist

### Morning Start-Up Sequence
- [ ] Put on mandatory PPE: Steel-toe safety boots, UV safety glasses, hearing protection.
- [ ] Clock in and review the Monday.com Production Dashboard for assigned machine.
- [ ] Inspect machine area: Ensure floors are clean, free of clutter, and no chairs are in workstations.
- [ ] Perform start-of-day 30-minute press purge SOP and verify 100% nozzle jetting.

### Shift Operations Checklist
- [ ] Verify substrate specs against digital docket (stock brand, thickness, grain/flute direction).
- [ ] Measure substrate dyne level ($\\ge 44 \\text{ dynes/cm}$) if printing non-porous plastics.
- [ ] Check OVERS inventory before starting new print runs.
- [ ] Ensure all printed output is stacked neatly on pallets—never on tables.
- [ ] Stagger lunch/rest breaks with partner operator so presses run continuously.

### End-of-Shift Departure
- [ ] Complete active print queue pass and log finished quantities in Monday.com.
- [ ] Perform end-of-day carriage wipe and secure printheads in capping station.
- [ ] Vacuum router shavings and sweep workstation floor completely clean.
- [ ] Hand over active docket notes to incoming shift operator.
        `
      }
    ]
  }
];
