// No external imports needed for these interfaces

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
Core Question: Why did the print look perfect on the press, but get rejected by the client in their retail store?

When a client rejects a print job over color, the excuse "it matched under our shop lights" will never hold up. Color is not a permanent, physical ingredient inside an ink—it is an optical illusion created by light bouncing off a substrate and entering the human eye. If you change the light, you change the color.

By the end of this lesson, you will be able to:
- Explain how CMYK inks act as light subtractors across the visible spectrum (380–700nm).
- Identify when to evaluate prints under D50 versus D65 lighting standards.
- Diagnose and prevent metamerism before a client sign-off.
- Read and interpret CIELAB ($L^*a^*b^*$) instrument readings to verify color accuracy.

## 1. The Physics of Ink: Subtractive Light Filters
Visible light occupies a narrow band of the electromagnetic spectrum ranging from **380nm (violet)** to **700nm (red)**. Pure white light contains all these wavelengths combined.

When you print onto white media, you are not adding light; you are printing **filters** that absorb (subtract) specific wavelengths and bounce the rest back to the customer's eyes:
- **Cyan Ink**: Absorbs **Red** light ($600–700\\text{nm}$) $\\rightarrow$ reflects Green and Blue.
- **Magenta Ink**: Absorbs **Green** light ($500–600\\text{nm}$) $\\rightarrow$ reflects Red and Blue.
- **Yellow Ink**: Absorbs **Blue** light ($400–500\\text{nm}$) $\\rightarrow$ reflects Red and Green.
- **Black Ink (K)**: Absorbs **all** visible wavelengths $\\rightarrow$ provides deep optical density, shadow detail, and contrast.

> [!TIP]
> **Rule of Thumb**: White media is your light source; CMYK inks are your light blockers. If your substrate isn't neutral white to begin with, your ink filters will produce unexpected color shifts.

## 2. The Lighting Trap: D50 vs. D65
Because color depends entirely on the light hitting it, the printing industry relies on standardized color temperatures, measured in **Kelvin (K)**. Never evaluate color under standard ceiling tubes or ambient office windows.

| Illuminant | Color Temperature | Visual Quality | Industry Standard Application |
| :--- | :--- | :--- | :--- |
| **D50** | $5000\\text{K}$ | Warm Direct Daylight | **ISO 3664 Standard**: Graphic arts, pre-press proofing, packaging, and brand color matching. |
| **D65** | $6500\\text{K}$ | Cool Overcast Sky | Outdoor signage, vehicle wraps, automotive paints, and plastics evaluation. |
| **Store LED / CWF** | $3000\\text{K} - 4100\\text{K}$ | Warm to Cool Green/Yellow | Retail store displays, grocery aisles, and indoor commercial environments. |

### The Shop Floor Reality: Metamerism
**Metamerism** is the optical phenomenon where two color samples (like a paper proof and a printed corrugated board) look identical under one light source, but shift dramatically under another.

> [!WARNING]
> **CRITICAL QUALITY WARNING**
> A corporate brand red (e.g., Coca-Cola Red or Target Red) printed on vinyl may look 100% identical to a paper proof under your shop floor's $4100\\text{K}$ fluorescent ceiling lights. However, once installed under a retailer's $3000\\text{K}$ warm LEDs, the vinyl might turn distinctly orange while the paper stays red. **Never sign off on brand-critical colors under ceiling lights.**

## 3. Speaking the Instrument's Language: CIELAB ($L^*a^*b^*$)
Human eyes get tired, and two operators will often disagree on whether a red is "too orange" or "too dark." To remove guesswork, we use **CIELAB ($L^*a^*b^*$)**—a device-independent 3D color space that acts as a GPS coordinate system for human vision.

When you measure a swatch with a spectrophotometer (such as an **X-Rite i1Pro 3** or **Barbieri Spectro LFP**), it gives you three exact numbers:
- **$L^*$ (Lightness)**: Vertical axis ranging from **0** (Absolute Black) to **100** (Pure White).
- **$a^*$ (Green $\\leftrightarrow$ Red)**: Negative values shift **Green** ($-a^*$); positive values shift **Red** ($+a^*$).
- **$b^*$ (Blue $\\leftrightarrow$ Yellow)**: Negative values shift **Blue** ($-b^*$); positive values shift **Yellow** ($+b^*$).

Use this interactive coordinate space to see how adjusting $L^*$, $a^*$, and $b^*$ values changes visual perception:

{{cielab_explorer}}

## 4. Shop-Floor SOP: The 3-Step Color Verification Workflow
To prevent metameric failures and costly customer rejections, every press operator must follow this exact sequence before running production:

1. **Measure Instrumentally with a Spectrophotometer**: Eliminate subjective eye fatigue. Before checking with your eyes, take an instrumental reading of the color control bar using your spectrophotometer. Ensure the delta-E ($\\Delta E$) color difference between your target $L^*a^*b^*$ coordinates and the printed sample is within your shop's tolerance (typically $\\Delta E \\le 2.0$).
2. **Inspect Inside a Certified D50 Light Booth**: ISO 3664 standard viewing condition. Place both the physical client proof and your production sample inside a calibrated **D50 light booth**. Allow your eyes 5 to 10 seconds to adapt to the neutral grey surround before evaluating. Do not hold samples near windows or under shop floor ceiling lights.
3. **Perform the Secondary Illuminant Stress-Test**: Check for metamerism under end-use conditions. If the product is destined for an indoor retail store or outdoor sunlight, flip the light booth switch from D50 to **D65 (Outdoor)** or **Store LED / TL84 (Retail)**. If the samples match under D50 but suddenly split apart under the secondary light source, you have a metameric mismatch and must re-profile or adjust your ink limiting before running the job.

### Diagnostic Case Study: What Went Wrong?
**The Incident**: A national pharmacy chain ordered 2,000 retail display headers printed on rigid foam board with their corporate teal background. The press operator checked the print against the contract proof on the press layout table under the shop's $4100\\text{K}$ ceiling lights. Both looked like a perfect match. Two days after delivery, the client rejected the entire $15,000 run because inside their stores, the headers looked muddy green.

**Why did this happen?**
The press operator fell victim to **metamerism** caused by uncalibrated viewing conditions. The ink pigmentation on the foam board absorbed wavelengths differently than the inkjet proofing paper. While they shared an identical visual appearance under $4100\\text{K}$ fluorescent shop lights, their underlying spectral reflectance curves were completely different. When installed under the pharmacy's warm $3000\\text{K}$ store lighting, the optical match collapsed.

**The Fix**: Relying on instrumental $L^*a^*b^*$ measurements and verifying the proof inside a standardized **D50/Retail light booth** would have caught the shift before a single production board was printed.
        `
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
Core Question: Why is the print peeling off the plastic board like sunburned skin when it hits the CNC router?

You can mix the most accurate brand color in the world, but if your RIP parameters are incorrect, the physical print will fail structurally. Excessive ink prevents curing, and uncalibrated printheads result in muddy, unpredictable tones. 

By the end of this lesson, you will be able to:
- Interpret $\\Delta E_{00}$ color tolerances and know exactly when to reject a print.
- Understand how RIP linearization mathematically corrects mechanical dot gain.
- Execute TAC ink limiting to prevent UV curing failures and catastrophic ink flaking.

## 1. Delta E 2000 ($\\Delta E_{00}$) Tolerance Standards
Delta E quantifies the Euclidean mathematical distance between a target proof color ($L_1^*, a_1^*, b_1^*$) and your printed sample ($L_2^*, a_2^*, b_2^*$). It is the objective judge of color accuracy.

| $\\Delta E_{00}$ Score | Visual Perception | Shop Floor Status |
| :--- | :--- | :--- |
| **$< 1.0$** | Imperceptible to trained eye | **Pass**: ISO Master Match / Proof Standard |
| **$1.0 - 2.0$** | Very slight difference | **Pass**: Standard Brand Target (Strict Client QC) |
| **$2.0 - 3.5$** | Noticeable on side-by-side check | **Acceptable**: General Commercial Signage |
| **$> 3.5$** | Obvious color shift | **REJECT**: Immediate RIP Adjustment Required |

> [!WARNING]
> **REJECTION WARNING**
> Never ship a corporate logo (e.g., FedEx Purple or Home Depot Orange) that scans above $\\Delta E_{00} = 2.0$. The client's QC department will measure it upon delivery, and a score of 2.1 will result in a total rejection of the pallet.

## 2. RIP Linearization: Correcting Mechanical Dot Gain
**Linearization** is the absolute foundation of color management. If you don't linearize a press, no ICC color profile will ever work correctly.

### The Failure Mode: Dot Gain
When a printer sprays a dot of ink onto a plastic board, the liquid ink spreads out slightly before the UV lamp cures it. This spreading is called **Dot Gain**. 
If the file calls for a **50% Cyan** patch, the ink spreads out. When measured with a spectrophotometer, it might read as **68% Cyan** because the dots physically grew larger. If 50% prints as 68%, all mid-tones will look dark, heavy, and muddy.

### The Cause-and-Effect Solution: The Linearization LUT
Linearization fixes dot gain by doing the math backward:
1. **The Goal**: We want a 50% input to actually equal a 50% visual output on the board.
2. **The Test**: We print a raw, uncalibrated test chart of gradients (0% to 100%).
3. **The Scan**: We scan it with a spectrophotometer. The software realizes that requesting 50% resulted in a 68% density.
4. **The Fix**: The RIP creates a **Look-Up Table (LUT)** curve. It calculates: *"To get a true 50% output on this specific material, I need to only ask the printhead to spray 38% ink."*
5. **The Result**: Now, when the design file asks for 50%, the RIP intercepts it, sends 38% to the heads, the ink spreads out due to dot gain, and the final measured result on the board is exactly the 50% requested. 

## 3. Total Area Coverage (TAC / Ink Limiting)
**TAC** (Total Area Coverage) is the maximum combined percentage of Cyan, Magenta, Yellow, and Black ink laid down in dark shadow areas.

**$\\text{TAC (\\%)} = C\\% + M\\% + Y\\% + K\\%$**

- **Unrestricted Maximum**: $100\\% C + 100\\% M + 100\\% Y + 100\\% K = 400\\% \\text{ TAC}$.
- **UV Wide-Format Target**: You must set TAC between **$260\\% - 300\\%$** in the RIP Media Setup.

> [!IMPORTANT]
> **CRITICAL FAILURE AVOIDANCE: EXCESSIVE TAC**
> Laying down $>320\\%$ TAC on non-porous plastics (Sintra, Acrylic) acts as a physical barrier. The UV LED lamps cannot penetrate the thick top layer of ink to cure the bottom layer touching the plastic. The bottom ink remains liquid and tacky. It will emit a strong solvent odor, and the entire image will immediately flake off the board when the CNC router cutter slices through it. 

## Shop-Floor SOP: RIP Linearization Calibration
Whenever you load a new brand of rigid substrate, execute this mandatory sequence:
1. **Load Specific Media**: Linearization changes drastically based on surface tension. Do not use an Acrylic LUT on a Coroplast board.
2. **Print Linearization Target**: Output the uncalibrated density ramp directly from the RIP.
3. **Scan Patches**: Use the **X-Rite spectrophotometer** to scan all patches from 0% to 100%.
4. **Verify Curve**: Ensure the generated LUT curve shows a smooth, ascending line without jagged spikes.
5. **Save to Profile**: Save the LUT directly into the specific media profile before generating ICC color targets.
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
Core Question: How do you hit a brand’s exact Pantone Red when the standard CMYK mix looks distinctly orange?

Corporate clients pay thousands of dollars for brand consistency. When they specify **PMS 185 C Red**, close enough is not acceptable. However, standard CMYK printing is physically limited in what it can reproduce. When the machine falls short, the operator must manually intervene.

By the end of this lesson, you will be able to:
- Explain the physical limitations of CMYK vs. Extended Gamut (OGV) inks.
- Generate a Spot Color Swatch Grid to hunt down perfect color matches.
- Execute the Spot Color Override SOP to permanently save corrected values.

## 1. Spot Color Matching Mechanics & Physical Limitations
Clients specify exact Pantone Matching System (PMS) numbers. Digital presses do not have "Pantone Red" loaded in a tank; they must convert the spot color into a process ink combination using RIP lookup tables.

Standard 4-color CMYK printing can only reproduce roughly **$70\\%$** of the Pantone solid spot color library. Bright oranges, vibrant greens, and deep reflex blues are often physically impossible to hit using just Cyan, Magenta, Yellow, and Black.

## 2. Extended Gamut Inks (CMYK + OGV)
To solve the CMYK limitation, high-end industrial presses add **Orange, Green, and Violet (OGV)** inks to the carriage. 
This expands the printable color gamut volume dramatically, allowing direct reproduction of over **$92\\%$** of Pantone PMS colors. If your press is equipped with OGV, the RIP will automatically map difficult Pantone colors to include these extended inks.

## Shop-Floor SOP: Spot Color Swatch Patch Matching
When a printed Pantone color looks slightly yellow, dark, or washed out on a specific plastic stock, you must override the RIP's default math. Follow this exact shop floor procedure:

1. **Open RIP Spot Color Library**: Locate the target PMS color (e.g. PMS 185 C) in your RIP software (Onyx / Asanti).
2. **Generate Swatch Search Grid**: Select **Print Swatch Grid**. The RIP generates a $5 \\times 5$ or $7 \\times 7$ grid of micro-variations centered on the original target Lab/CMYK values. The grid will automatically alter Cyan by $\\pm 2\\%$ and Yellow by $\\pm 3\\%$ across the patches.
3. **Print Swatch Sheet**: Print the swatch grid on the **exact production substrate** using the **exact production pass counts**. (A match on paper means nothing if the job runs on Sintra).
4. **Visual & Spectro Evaluation**: Place the physical Pantone Solid Coated swatch book next to the printed grid inside a **D50 Light Booth**. 
   - Visually select the patch that matches best.
   - Verify the match by measuring the patch with a spectrophotometer, ensuring $\\Delta E < 1.0$.
5. **Save Override**: Type the selected patch CMYK/Lab values into the RIP's customer-specific spot library. 

> [!IMPORTANT]
> **CRITICAL WORKFLOW MANDATE**
> All future dockets for this customer will automatically use your corrected values. Failing to save the override means the next shift operator will print the wrong color and ruin the entire run.
        `
      }
    ]
  },
  {
    id: 'm2',
    title: 'Module 2: Substrate Engineering, Surface Chemistry & Yield',
    category: 'Materials & Production',
    iconName: 'Layers',
    shortDesc: 'Master rigid and flexible media properties, Corona Dyne testing, static charge suppression, grain orientation, and handling overages.',
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
Core Question: Why did the retail floor display buckle and collapse under the weight of the product?

Materials dictate the entire production workflow. If you select the wrong substrate, route a plastic with the wrong RPM, or fold a corrugated board against its grain, the product will catastrophically fail in the field—costing the company thousands in reprints and lost client trust.

By the end of this lesson, you will be able to:
- Identify the correct tooling and speeds for industrial substrates.
- Prevent edge-melting on acrylic and chip-welding on PVC.
- Engineer structural displays by aligning flute direction correctly.

## 1. Exhaustive Industrial Substrate Taxonomy
Different chemical compositions require entirely different mechanical cutting approaches. Never guess your spindle speeds.

| Material Name | Common Brands | Chemical Composition | Best Cutting Tool | Tool Speeds | Common Applications |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Expanded PVC Foam** | Sintra, Komatex | Closed-cell polyvinyl chloride | CNC Router / Single-flute Up-cut | 18,000 RPM / 220 IPM | Indoor/Outdoor Signage, Retail Fixtures |
| **Cast / Extruded Acrylic** | Plexiglas, Lucite | Polymethyl methacrylate (PMMA) | Single-flute Polished O-Flute | 18,000 RPM / 150 IPM | High-end retail displays, illuminated signs |
| **Aluminum Composite** | ACM, Dibond | Polyethylene core + 0.3mm aluminum skins | 90° V-Groove Router Bit | 16,000 RPM / 180 IPM | Architectural signage, exterior fascia |
| **Corrugated Plastic** | Coroplast | Fluted polypropylene plastic | High-Frequency Oscillating Knife | 12,000 Strokes/min / 300 IPM | Yard signs, temporary packaging |
| **Corrugated Paperboard** | E, B, C Flute | Recycled kraft paperliner | Oscillating Knife + Creasing Wheel | Wheel Press: 40kg / 400 IPM | Retail dump bins, shipping cartons |
| **Heavy Paper Foam** | Gatorfoam | Polystyrene core + clay coated facers | Heavy Carbide Oscillating Blade | 12,000 Strokes/min / 250 IPM | Exhibition panels, hanging signs |

## 2. Flute Direction & Structural Packaging Rules
Corrugated board strength is strictly directional. Internal flutes act as vertical structural columns.

- **E-Flute**: Caliper thickness $\\approx 1.5\\text{mm}$ (1/16"). High print smooth surface, used for small counter displays.
- **B-Flute**: Caliper thickness $\\approx 3.0\\text{mm}$ (1/8"). Excellent crush resistance, standard for retail POP floor displays.
- **C-Flute**: Caliper thickness $\\approx 4.0\\text{mm}$ (3/16"). Used for heavy shipping boxes.

> [!WARNING]
> **STRUCTURAL FAILURE ALERT**
> Always position main vertical support panels so the flutes run **vertically**. Placing flutes horizontally reduces display load capacity by over **$70\\%$**, causing retail floor displays to buckle instantly under product weight.

## Shop-Floor SOP: Substrate Verification
Before loading a pallet of material onto the press, verify:
1. **Material Match**: Ensure the physical substrate matches the docket exactly (e.g., Do not swap Cast Acrylic for Extruded Acrylic; they route differently).
2. **Caliper Check**: Measure board thickness with digital calipers to ensure CNC depth parameters will be accurate.
3. **Flute Orientation**: For 3D displays, verify the printed artwork orientation aligns with the vertical flutes of the board.
        `
      },
      {
        id: 'm2-l2',
        title: 'Lesson 2.2: Corona Dyne Testing, Static Suppression & Managing Overages',
        duration: '50 mins',
        summary: 'How to perform Corona Dyne testing, apply adhesion primers, eliminate static electricity, and manage print overages effectively.',
        keyTakeaways: [
          'UV inks require a substrate surface energy >= 44 dynes/cm for chemical adhesion.',
          'If Dyne pen ink beads up within 2 seconds, surface energy is too low. Apply chemical adhesion primer wipe or flame treatment.',
          'Static charge (>15,000V) deflects flying droplets, causing fuzzy text overspray. Use ionizing anti-static bars.',
          'Managing Overages: Always inspect existing overage inventory and deduct available stock components before starting new print runs to reduce waste.'
        ],
        content: `
Core Question: Why is the ink peeling off the board like tape, and why does the fine text look like it has a fuzzy shadow?

Ink does not stick to plastic by magic; it requires chemical adhesion driven by surface energy. Furthermore, the friction of loading plastic boards generates massive static electrical charges that physically pull ink droplets off course. You must control the physics of the board before you print.

By the end of this lesson, you will be able to:
- Test surface energy using Dyne pens to prevent adhesion failures.
- Eliminate static overspray using ionizing equipment.
- Manage production overages to drastically reduce material waste.

## 1. Dyne Level Surface Energy Testing
Non-porous plastics (Polypropylene, Polyethylene, Acrylic) naturally have low surface energy ($<30 \\text{ dynes/cm}$). Liquid UV ink cannot wet out or adhere to low-dyne surfaces; it will bead up and flake off.

### Shop-Floor SOP: Dyne Testing Procedure
1. **Select Dyne Pen**: Grab a **44 Dyne/cm Corona Test Pen** from the tool rack.
2. **Draw Test Stroke**: Draw a 3-inch liquid line across the corner of the raw plastic board.
3. **Observe Wetting Behavior**:
   - **PASS**: Liquid stays in a smooth continuous film for $\\ge 2 \\text{ seconds}$. Surface energy is $\\ge 44 \\text{ dynes/cm}$. Proceed directly to printing.
   - **FAIL**: Liquid breaks up into isolated beads within $2 \\text{ seconds}$. Surface energy is too low ($<44 \\text{ dynes/cm}$).

> [!IMPORTANT]
> **CORRECTIVE ACTION FOR LOW DYNE BOARDS**
> If the board fails the Dyne test, you must apply a liquid **Adhesion Promoter Primer** (e.g. AGFA Adhesion Primer) using a lint-free microfiber wipe across the board. Alternatively, activate the press **Corona Flame Treater** unit prior to the printing pass.

## 2. Static Electricity & Satellite Overspray
Friction during sheet unstacking generates static charges exceeding **$15,000\\text{ Volts}$**. Static electricity creates a magnetic force that pulls microscopic flying ink droplets off their trajectory.

- **The Symptom**: Fine text has a blurry outline or tiny ink dots scattered around the edges. This is known as "satellite overspray."
- **The Prevention**: You must turn on anti-static ionizing bars on the press carriage. For extreme static, wipe plastic sheets with a grounded anti-static tinsel or cloth before loading.

## 3. Shop-Floor SOP: Managing Production Overages ("Overs")
In display manufacturing, nesting multiple components on a standard-sized board frequently generates extra pieces ("Overs"). Managing these is critical for shop profitability.

1. **Record & Store**: When a job completes, any extra perfect pieces must be tagged with the job ID and stored in the overage racks.
2. **Check Before Printing**: Before starting a repeat job order, verify the inventory logs for any existing overages.
3. **Deduct & Save**: If 50 extra pieces exist in inventory for a 500-unit order, print only 450 new pieces. This minimizes material waste and optimizes production time.
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
Core Question: Why did the CNC router cut right through the middle of the logo, leaving a huge white margin on the edge?

A beautiful design is useless if it cannot be cut out mechanically. Pre-press is the bridge between digital artwork and physical CNC tooling. If your dielines are incorrectly named, or if you forget to apply overprint attributes, the RIP software will destroy the file, and the cutter will ruin the board.

By the end of this lesson, you will be able to:
- Engineer perfectly named Spot Color dielines for CNC routing.
- Prevent artwork drop-outs using Overprint Stroke attributes.
- Apply correct bleed and safe margins based on substrate thickness.

## 1. The Prepress-to-Production Workflow
Data moves through 4 distinct stages on the shop floor:
1. **Prepress (Adobe Illustrator)**: We add Bleeds (extra background color so white edges don't show when cut) and define exactly where the CNC blade will travel using special colored vector lines (Dielines).
2. **RIP Software**: The software translates the vector file into billions of CMYK ink droplet coordinates, applying Color Profiles and Linearization.
3. **Printing**: The physical press lays down the ink.
4. **Digital Finishing (CNC Cutter)**: The CNC cutter reads a barcode, opens the exact Dieline path created in Step 1, and cuts the board to shape.

## 2. Standard Dieline Spot Color Naming Matrix
To tell the RIP and the CNC cutter what is a graphic and what is a cut path, we use strict naming conventions.

| Operation | Stroke Swatch Name | Color Type | Color Representation | Stroke Weight | Required Attribute |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Full Cut (Thru-Cut)** | \`CutContour\` | Spot Color | 100% Magenta | 0.25 pt | **Overprint Stroke ENABLED** |
| **Vinyl Kiss-Cut** | \`KissCut\` | Spot Color | 100% Cyan | 0.25 pt | **Overprint Stroke ENABLED** |
| **Score / Crease Line** | \`Crease\` | Spot Color | 100% Green | 0.25 pt | **Overprint Stroke ENABLED** |
| **ACM V-Groove Fold** | \`VGroove\` | Spot Color | 100% Yellow | 0.50 pt | **Overprint Stroke ENABLED** |
| **i-cut Reg Marks** | \`i-cut\` | Spot Color | 100% Black | Solid 6mm Circle | Standard Fill |

### The Mechanics of Overprint Stroke
By default, if you draw a magenta line over a photograph in Illustrator, the software "knocks out" (erases) the photograph underneath the line so the magenta ink doesn't mix with the photo ink. 

> [!WARNING]
> **CRITICAL PRE-PRESS WARNING: OVERPRINT DROPOUTS**
> Our \`CutContour\` line isn't real ink; it's an invisible path for a knife. If you don't check the **"Overprint Stroke"** box, the RIP will erase a white line in your photograph where the cut path is. When the knife cuts it, you will see a glaring white unprinted margin on the edge of the finished display.

## Shop-Floor SOP: Pre-Press File Preparation
Before exporting a PDF to the RIP, execute this checklist:
1. **Convert Fonts to Outlines**: Select all text and press \`Ctrl+Shift+O\`. This prevents font-substitution errors on the RIP server.
2. **Check Bleeds**: 
   - **Thin Media (<1mm)**: Set exterior graphic bleed to **$0.125"$ ($3.175\\text{mm}$)** beyond the \`CutContour\` line.
   - **Thick Rigid Board (3mm - 16mm)**: Set exterior graphic bleed to **$0.25"$ ($6.35\\text{mm}$)**.
3. **Verify Safe Margins**: Keep critical logos and text at least **$0.25"$ ($6.35\\text{mm}$)** inside the cut path to survive mechanical shifting.
4. **Validate Overprint**: Open the Attributes Panel and ensure Overprint Stroke is checked for all dieline paths.
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
Core Question: How does the CNC cutter know exactly where to slice a printed graphic that has warped and stretched under the heat of UV lamps?

If a 4x8 foot board stretches by just 0.5% during printing, the graphic shifts by nearly half an inch. If the CNC cutter cuts the original rigid CAD file, it will slice right through the artwork. We rely on camera registration systems to warp the cut paths in real-time to match the physical print.

By the end of this lesson, you will be able to:
- Configure i-cut Vision camera targets for dynamic distortion compensation.
- Implement barcode automation to prevent file-loading errors.
- Maximize material yield using algorithmic auto-nesting.

## 1. i-cut Vision Camera Target Rules
To enable 3D distortion compensation, the Pre-Press department must place optical registration dots around the artwork.

1. **Target Dimensions**: Use exact **6mm solid black circles** defined with the \`i-cut\` spot color.
2. **Target Placement**: Place the dots around the outer perimeter of the nested sheet layout. Space them **$300\\text{mm} - 500\\text{mm}$ apart**. Keep them at least **$10\\text{mm}$ away** from any artwork edges.
3. **Corner Orientation Matrix**: Place 3 dots in an asymmetric L-shape in one corner. This asymmetric cluster allows the cutter camera to detect instantly if an operator loaded a board upside down or backwards!

## 2. Dynamic 3D Distortion Compensation
When paper or plastic boards pass through hot UV curing lamps, heat causes non-linear material shrinkage (typically $0.1\\% \\text{ to } 0.5\\%$).

- **Camera Scan**: The optical camera on the Kongsberg / MultiCam head scans the printed 6mm black dots.
- **Mesh Warping**: The cutter software compares the scanned physical dot coordinates against the original CAD vector coordinates. It then applies real-time non-linear mesh warping—stretching, scaling, and rotating the cut paths to perfectly map onto the distorted print.

## Shop-Floor SOP: Barcode Automation Workflow
Manual file loading causes expensive mistakes. If an operator accidentally opens version 1 of a cut file instead of version 2, the board is ruined.

1. **Pre-Press Generation**: Esko i-cut automatically generates a 1D Code-128 or 2D QR barcode at the leading edge of the printed sheet.
2. **Physical Scanning**: When the cutter operator lays the pallet on the table, they point the optical camera at the barcode.
3. **Automated Retrieval**: The cutter software queries the local network server, retrieves the exact job docket (e.g., \`JOB-8942.ACM\`), and loads the exact cutting tool paths instantly.
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
Core Question: Why is $30,000 worth of ink violently dripping out of the carriage onto the floor?

Industrial UV presses are not desktop printers. They rely on delicate pneumatic pressures to hold liters of liquid ink suspended upside down in the printheads. If a vacuum seal fails, or if an operator performs maintenance incorrectly, you will destroy $3,000 printheads instantly. 

By the end of this lesson, you will be able to:
- Explain meniscus vacuum pressure and diagnose hydraulic failures.
- Understand the physical requirements of white ink recirculation.
- Execute the strict 30-minute Start-of-Day Purge SOP to keep the press healthy.

## 1. Press Ink Hydraulics & Meniscus Pressure
Industrial UV inkjet presses (AGFA TAURO, Mimaki, Durst) use complex hydraulic ink delivery systems.

- **Meniscus Control**: Sub-tanks maintain a slight negative pressure (typically **$-3.0 \\text{ to } -4.5 \\text{ mbar}$**). This creates a concave meniscus (surface tension curve) at each nozzle tip, holding the ink upside down against gravity.
  - **Too Little Vacuum ($-1.0\\text{ mbar}$)**: Ink freely drips out of the printhead faceplate onto the substrate and floor.
  - **Too Much Vacuum ($-7.0\\text{ mbar}$)**: Air is sucked upward into the nozzle channels, causing complete jetting failure (air locks).
- **White Ink Recirculation**: White ink contains heavy Titanium Dioxide ($\\text{TiO}_2$) particles. If white ink sits idle for $>15$ minutes, the pigment settles out of suspension like sand in water, clogging the printheads. Presses must run continuous white ink agitator pumps 24/7.

## Shop-Floor SOP: The Start-of-Day Purge (30-Minute Limit)
Press operators must execute this exact protocol within the first 30 minutes of the shift.

1. **Inspect Gauges**: Verify sub-tank ink temperatures ($45^\\circ\\text{C}$ for correct ink viscosity), check waste ink bottle volume, and verify UV chiller coolant temp is at $20^\\circ\\text{C} \\pm 1^\\circ\\text{C}$.
2. **Execute Purge**: On the press control screen, trigger a **Positive Pressure Purge** for 3 seconds. Ink forcefully flushes out of all nozzle channels, purging dried crust and micro-bubbles.
3. **Faceplate Maintenance**:
   - Take a clean, lint-free poly-wipe cloth. Saturate it heavily with approved UV flush solution.
   - Wipe the underside of the printhead faceplate in **ONE smooth forward direction**.
   - **NEVER scrub back and forth**—scrubbing pushes dirt and dried ink scrapings back up into the delicate nozzle orifices.
4. **Nozzle Test Grid Inspection**: Print a nozzle diagnostic grid on roll paper or scrap board. Inspect every individual nozzle line under a magnifying eye loupe to verify 100% firing.
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
Core Question: How do you identify the root cause of banding on a print just by looking at a diagnostic grid?

When a print comes out with ugly horizontal lines (banding), the operator must instantly diagnose whether the issue is a physical clog, trapped air, or a dirty faceplate. Furthermore, letting a bowed board strike the moving carriage will cost the shop thousands of dollars and halt production for days.

By the end of this lesson, you will be able to:
- Diagnose nozzle failures using the visual diagnostic matrix.
- Calibrate gantry height to prevent catastrophic head strikes.
- Execute Zero-Downtime shift coverage to maximize press yield.

## 1. Nozzle Failure Diagnostic Matrix

| Visual Defect on Test Grid | Root Cause | Operator Corrective Action |
| :--- | :--- | :--- |
| **Missing Lines in Grid** | Clogged nozzle orifice or dry ink crust | Perform 3-sec pressure purge + poly-cloth wipe with flush solution. |
| **Blank Entire Color Channel** | Trapped air lock in sub-tank line | Open manual air release valve on sub-tank; execute high-volume flush. |
| **Fired Droplet Spitting / Deflection** | Hair, lint fiber, or ink drop clinging to nozzle edge | Inspect faceplate with mirror; gently remove lint with poly-wipe. |
| **Cross-Color Contamination (Cyan in Yellow)** | Leaking capping station seal or faceplate flooding | Clean rubber capping station seals; check negative pressure vacuum setting. |

## 2. Preventing Catastrophic Head Strikes
A **head strike** occurs when a bowed or warped board edge hits the bottom of the moving printhead carriage.

> [!WARNING]
> **EQUIPMENT DESTRUCTION HAZARD**
> A high-speed carriage impact can sheer the faceplates completely off the printheads. 

### Shop-Floor SOP: Gantry Clearance
1. **Inspect Media**: Always sight down the edge of rigid sheets to check for severe bow or curl before loading.
2. **Set Clearances**: Set the gantry carriage height to exactly **$1.5\\text{mm} - 2.0\\text{mm}$** above the measured substrate thickness.
3. **Enable Sensors**: Keep the **Carriage Anti-Crash Bumper Sensor Bar** enabled at all times. If the bumper touches an uneven board, the carriage halts instantly before the printheads contact the substrate.

## 3. Shop-Floor SOP: Zero-Downtime Shift Management
Allowing UV presses to sit idle with UV lamps warm causes heat migration into printhead nozzle plates, thickening the ink and causing severe nozzle clogging.

- **Staggered Break Coverage Protocol**: Operators must stagger lunch and rest breaks. When Operator A goes on lunch, Operator B steps over and covers Operator A's press—loading boards and unloading finished pallets. Presses must run 100% continuously throughout the shift to prevent thermal soaking and maximize daily yield.
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
Core Question: Why is the knife blade tearing the corrugated board instead of cutting it cleanly?

Digital finishing is where the final product is realized. Using a static blade to cut through a thick foam core will simply crush and rip the material. You must match the mechanical action of the cutting tool to the physical properties of the substrate.

By the end of this lesson, you will be able to:
- Select the correct knife tooling for specific substrates.
- Prevent board tearing by utilizing high-frequency oscillating blades.
- Configure creasing wheel pressures based on flute direction.

## 1. Kongsberg Knife Tooling System Mechanics
Understanding how a tool cuts is more important than knowing its name.

| Tool Type | Mechanical Action | Best Substrates | Operating Settings |
| :--- | :--- | :--- | :--- |
| **Standard Drag Knife** | Static blade dragged by carriage movement | Self-adhesive vinyl, paper, cardstock | Fast speed, low downward pressure |
| **Oscillating Knife** | Vertical reciprocating blade ($12,000 \\text{ strokes/min}$) | Corrugated plastic, Foam-Cor, Gatorfoam, Honeycomb board | High stroke frequency, medium feed rate |
| **Kiss-Cut Tool** | Spring-loaded precision depth blade | Sticker vinyl (cuts top film only, leaving liner intact) | Micro-depth adjustment ($0.05\\text{mm}$ precision) |
| **Creasing Wheel** | Rotating steel wheel ($15\\text{mm}-60\\text{mm}$ diameter) | Corrugated paperboard, folding carton box stock | High downward pressure (up to $50\\text{ kg}$) |
| **V-Notch Cut Tool** | Angled blades ($45^\\circ, 30^\\circ, 22.5^\\circ$) | Re-board, Heavy Honeycomb board for 90° box corners | Dual pass angled slicing |

## Shop-Floor SOP: Creasing Mechanics & Flute Direction
Creasing wheels press structural score lines into corrugated board to prepare for manual folding. Pressure must be adjusted based on the board's internal flutes:

1. **Creasing Parallel to Flutes**: The wheel runs smoothly between the structural ridges. Set downward pressure low ($20-30\\text{ kg}$).
2. **Creasing Perpendicular to Flutes**: The wheel must crush across the structural ridges. You must increase downward pressure ($40-50\\text{ kg}$) and use wider wheel profiles to prevent the surface linerboard from cracking or tearing.
3. **Table Protection**: Always ensure the porous felt underlay mat is installed. Cutting without the mat will drive the carbide blades directly into the aluminum vacuum table, destroying the blade and damaging the machine bed.
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
Core Question: Why did the router bit snap in half, and why is melted acrylic wrapped around the spindle?

CNC routing relies on exact physical mathematics. If you spin a bit too fast while moving too slowly, you aren't cutting—you are rubbing. Friction melts plastic instantly, destroying the bit and ruining the board. 

By the end of this lesson, you will be able to:
- Calculate and maintain optimal Chip Load to prevent heat build-up.
- Select the correct spindle RPM and feed rates for specific materials.
- Choose between up-cut, down-cut, and compression spiral geometries.

## 1. Heavy Routing Physics: Chip Load Calibration
Unlike knife cutting, CNC routing uses a high-speed rotating cutter bit (spindle speeds up to $24,000 \\text{ RPM}$) to carve away material. The most important metric in routing is **Chip Load**.

**$\\text{Chip Load (Inches Per Tooth)} = \\frac{\\text{Feed Rate (IPM)}}{\\text{Spindle Speed (RPM)} \\times \\text{Number of Cutting Flutes}}$**

### Why Incorrect Chip Load Destroys Materials:
- **Chip Load Too Small (RPM too high / IPM too slow)**: The bit rubs against the plastic instead of carving off chips. Friction generates extreme heat, melting the plastic and welding it around the bit (**chip welding**).
- **Chip Load Too Large (IPM too fast / RPM too slow)**: The bit is forced into the material faster than it can clear chips. Excessive physical force breaks the carbide bit or gouges rough chunks out of the substrate edges.

## 2. Recommended Routing Parameters Reference Table

| Substrate | Bit Type | Spindle Speed (RPM) | Feed Rate (IPM) | Pass Count / Depth |
| :--- | :--- | :--- | :--- | :--- |
| **Acrylic (0.25" / 6mm)** | Single-Flute Up-cut O-Flute | 18,000 RPM | 150 IPM | 2 Passes (Roughing + 0.5mm Finishing) |
| **Expanded PVC (0.50" / 12mm)** | Twin-Flute Straight / Up-cut | 20,000 RPM | 250 IPM | 1 Pass Single Depth |
| **Aluminum Composite (ACM)** | 90° V-Groove Router Bit | 16,000 RPM | 180 IPM | Score aluminum skin + core (leave 0.5mm skin) |
| **MDF / Wood (0.75" / 19mm)** | Compression Spiral Bit | 18,000 RPM | 300 IPM | 2 Passes with Dust Shroud Active |

## 3. Router Bit Flute Geometries
- **Up-Cut Spiral**: Pulls chips UP and out of the cut channel. Provides excellent chip clearance to prevent melting, but can physically lift the top facer of delicate laminates.
- **Down-Cut Spiral**: Pushes chips DOWN. Leaves an immaculate top surface edge without lifting, but requires high vacuum hold-down to prevent chip packing and heat build-up in the channel.
- **Compression Bit**: Combines Up-cut at the tip and Down-cut at the shank. Compresses both top and bottom edges inward—ideal for double-sided laminated wood and thick Gatorboard to prevent blowout on both sides.

## Shop-Floor SOP: Routing Acrylic & ACM
1. **Acrylic Routing**: Always use a polished, single-flute O-flute bit. Use a two-pass approach: route a rough pass leaving $0.5\\text{mm}$ of material, then route a fast finishing pass. This shaves off the heat-affected zone and leaves a glass-smooth edge.
2. **ACM V-Grooving**: When routing Aluminum Composite Material for structural 90° folds, use a 90° V-groove bit. Set the depth to route through the top aluminum skin and the polyethylene core, but **leave the bottom $0.5\\text{mm}$ aluminum skin completely intact**. This acts as a living hinge for manual folding.
        `
      }
    ]
  },
  {
    id: 'm6',
    title: 'Module 6: Shop Floor SOPs & Operations',
    category: 'Shop Floor & SOPs',
    iconName: 'ClipboardCheck',
    shortDesc: 'Master production MIS tracking, workflow optimization, material handling, and safety hazard controls.',
    estimatedHours: '3.0 Hours',
    difficulty: 'Intermediate',
    lessons: [
      {
        id: 'm6-l1',
        title: 'Lesson 6.1: Job Tracking, Schedule Shifts & Digital Dockets',
        duration: '45 mins',
        summary: 'Understand digital job dockets, real-time schedule adjustments, delivery priorities, and job tracking.',
        keyTakeaways: [
          'Production schedules constantly shift based on client rush orders and substrate delivery changes.',
          'Operators must review the Production MIS (Management Information System) or job board regularly.',
          'Job dockets contain critical specs: media substrate type, quantity, print quality pass count, finish cut paths, and pallet packing instructions.',
          'Always log completed quantity and waste counts into the tracking system immediately upon finishing a job run.'
        ],
        content: `
Core Question: If you print the job perfectly, but pack it on the wrong pallet configuration, did you actually succeed?

A shop floor runs on accurate data. If you print 500 boards but forget to log the 10 waste boards into the system, the shipping department will fall short, the client will be furious, and the company will lose money rushing a reprint. 

By the end of this lesson, you will be able to:
- Interpret digital job dockets accurately.
- Manage dynamic schedule interruptions safely.
- Maintain accurate production and waste tracking.

## 1. Digital Job Dockets
Modern print shops manage workflow using production MIS (Management Information System) platforms. Operators must interact with digital dockets containing all specifications. Never trust verbal instructions—if it is not on the docket, it does not exist.

Critical Docket Specs to verify before pressing print:
- **Substrate Brand & Thickness**
- **Required Quantity + Overage Allowance**
- **Print Quality / Pass Count Mode**
- **Finishing Cut Path Names**
- **Pallet Packing Instructions (e.g., Max 50 per pallet)**

## Shop-Floor SOP: Managing Dynamic Schedule Changes
Delivery dates and project priorities change dynamically throughout the shift. When a high-priority Rush Order interrupts your standard queue, follow this exact sequence:

1. **Complete the Current Board**: Do not abort a board mid-print. Let the current physical sheet finish to avoid material waste.
2. **Safe Pause**: Pause the press queue safely via the software. Do not shut down the UV lamps or power down the ink system.
3. **Switch & Execute**: Unload the standard pallet. Load the priority substrate, select the rush RIP file, and execute the rush run.
4. **Log the Shift**: Log the schedule change and quantities in the MIS.
5. **Resume**: Reload the standard pallet and resume the original queue precisely where you left off.
        `
      },
      {
        id: 'm6-l2',
        title: 'Lesson 6.2: Workflow Optimization, Ergonomics & Shop Floor Safety',
        duration: '50 mins',
        summary: 'Master workflow optimization during downtime, material handling, ergonomics, and shop floor PPE standards.',
        keyTakeaways: [
          'Workflow Optimization: Utilize machine downtime for prep work, maintenance, or reviewing upcoming job specifications.',
          'Material Handling: Stack printed material on pallets for efficient transport and to prevent damage or trip hazards.',
          'Ergonomics: Shift work involves prolonged standing; shift weight regularly, use anti-fatigue mats, and maintain neutral posture.',
          'PPE Standards: CSA-approved steel-toe boots, UV safety glasses, hearing protection, and chemical gloves are standard.'
        ],
        content: `
Core Question: When the machine is printing a 40-minute roll job, what should you be doing?

Standing idle while a machine runs is a waste of production potential. A master operator uses machine runtime to prepare for the next setup, perform maintenance, or optimize the physical workspace. 

By the end of this lesson, you will be able to:
- Maximize productivity during machine runtime.
- Prevent trip hazards and material damage through proper staging.
- Protect your physical health using strict ergonomic and PPE standards.

## 1. Workflow Optimization During Downtime

> [!TIP]
> **OPERATOR PRO TIP: THE LOOK-AHEAD**
> If a press or CNC cutter is occupied or waiting for substrate delivery, utilize the time efficiently:
> 1. **Prepare Upcoming Jobs**: Review the docket for the next job, locate the required substrates in the warehouse, and stage them on a pallet directly near the machine.
> 2. **Routine Maintenance**: Empty waste ink bins, clean the workstation, or perform RIP file checks.
> 3. **Assist Finishing**: Help the finishing department with manual assembly or packing if your machine is down for an extended period.

## Shop-Floor SOP: Material Staging & Safety
1. **Material Handling**: Printed boards, cut components, and raw substrates must be stacked neatly on wooden or plastic pallets. **Never stack boards directly on the floor**; this prevents forklift access and creates severe safety trip hazards.
2. **Shaving Removal**: CNC routers produce fine plastic and wood shavings. Operators must vacuum router beds and sweep floor areas daily to prevent airborne dust from clogging UV press air intake filters.
3. **Ergonomic Best Practices**:
   - Wear high-cushion anti-fatigue insoles inside CSA-approved steel-toe boots.
   - Shift body weight from foot to foot every 15-20 minutes to reduce lower back compression.
   - Use team lifting for any single object or board weighing over 50 lbs (22.6 kg).
4. **Mandatory PPE**: UV safety glasses (to prevent retinal damage from UV LED curing lamps), hearing protection near CNC routers, and nitrile chemical gloves when handling uncured UV ink flush.
        `
      }
    ]
  },
  {
    id: 'm7',
    title: 'Module 7: Interactive Workstations & Day-1 Reference',
    category: 'Practical Tools',
    iconName: 'Tool',
    shortDesc: 'Access interactive Prepress Dieline Inspector, RIP Console, Equipment Simulator, Substrate Cheat Sheet, and Troubleshooting Matrix.',
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
Core Question: How do you build muscle memory for complex software without risking a catastrophic mistake on a live production press?

A single typo in a RIP configuration can ruin a $5,000 run of acrylic boards. Simulators provide a zero-risk environment to build the exact muscle memory required to operate prepress software, RIP consoles, and physical machine control panels under pressure.

By the end of this lesson, you will be able to:
- Navigate the three core software simulators.
- Execute prepress verification, RIP configuration, and press maintenance in a simulated environment.

## Interactive Software Workstations Overview
Navigate to the **Equipment Simulators Tab** in the top menu bar to launch the 3 dedicated software workstations:

1. **Prepress Vector Dieline Inspector (Illustrator Style)**: Inspect client files, verify spot color names (\`CutContour\` / \`Crease\`), check Overprint Stroke attributes, and verify exact bleed dimensions.
2. **RIP Software Console (Agfa Asanti / Onyx Style)**: Configure job queues, select print modes (e.g., 4-pass vs 8-pass), set TAC ink limits ($280\\%$), inspect linearization curves, and generate spot color swatch patch overrides.
3. **Machine Control & Diagnostic Panel**: Execute 3-second positive pressure ink flushes, read nozzle test grid patterns, diagnose missing jets, set CNC camera registration targets, and adjust router feed speeds and RPMs.

## Shop-Floor SOP: Simulator Practice Protocol
Before operating physical machinery on your first day, you must successfully complete:
- 5 perfect dieline verifications in the Prepress Inspector.
- 3 successful Pantone overrides in the RIP Console.
- 1 complete Start-of-Day Purge sequence in the Machine Control Panel.
        `
      },
      {
        id: 'm7-l2',
        title: 'Lesson 7.2: Standard Operating Procedures (SOPs) & Troubleshooting Matrix',
        duration: '40 mins',
        summary: 'Comprehensive quick-reference checklists for standard daily operations.',
        keyTakeaways: [
          'Follow the Daily Operations Checklists to ensure consistent quality and safety.',
          'Refer to the Troubleshooting Matrix for immediate solutions to common print and finishing defects.',
          'Always verify safety stop buttons and emergency power cut-offs before operating unfamiliar machinery.'
        ],
        content: `
Core Question: When a crisis hits at 3:00 AM on the night shift, where do you find the answer?

Memory fails under pressure. Relying on standardized checklists prevents skipped steps, saves expensive hardware, and guarantees a consistent, repeatable product quality regardless of who is operating the press. 

By the end of this lesson, you will be able to:
- Execute the daily start-up, active shift, and end-of-day checklists.
- Access the troubleshooting matrix for rapid problem resolution.

## Daily Operations Checklists

### Morning Start-Up Sequence
- [ ] Put on mandatory PPE: Steel-toe safety boots, UV safety glasses, hearing protection.
- [ ] Clock in and review the daily production schedule for your assigned machine.
- [ ] Inspect machine area: Ensure floors are clean and free of clutter or trip hazards.
- [ ] Perform start-of-day press purge and verify 100% nozzle jetting on the diagnostic grid.

### Active Shift Checklist
- [ ] Verify substrate specs against digital docket (stock brand, thickness, grain/flute direction).
- [ ] Measure substrate dyne level ($\\ge 44 \\text{ dynes/cm}$) if printing non-porous plastics.
- [ ] Check existing overage inventory in the MIS before starting new print runs.
- [ ] Ensure all printed output is stacked neatly and squarely on appropriate pallets.
- [ ] Coordinate break times with team members to maintain continuous, zero-downtime production.

### End-of-Shift Departure
- [ ] Complete active print queue pass and log finished quantities and waste accurately in the MIS.
- [ ] Perform end-of-day carriage wipe and secure printheads in the capping station.
- [ ] Vacuum router shavings and sweep workstation floor completely clean.
- [ ] Hand over active docket notes, known issues, and priority changes to the incoming night shift operator.

> [!IMPORTANT]
> **EMERGENCY STOP PROTOCOL**
> Always visually verify the location of all red **Emergency Stop (E-Stop)** buttons and main power cut-offs before operating any unfamiliar machinery on the floor.
        `
      }
    ]
  }
];
