# Mar-a-Techno Archipelago

> **Research Inquiry:** *A visualisation of the relationship between median disposable income, national R&D expenditure, and digital integration in the OECD*

---

## 1. Overview & Artistic Premise

> *"In a disparate ocean, hotspots emerge. An archipelago develops; islands grow and contract in form, fed by the ever-violent outbursts of capital expenditure. Spires rise and shape the horizon, while volcanic sediment hardens into intricate circuitries. Ruffled by aura and the unknown, the islands expand and recede in size, competing for finite space in a volatile ecosystem."*

**Mar-a-Techno Archipelago** is the flagship generative rendering of **The Muddled Renderings Project**. It translates tabular, multi-dimensional macroeconomic and technological datasets from all 38 member states of the OECD into a living procedural island archipelago rendered on HTML5 2D Canvas.

Instead of static bar charts or multidimensional scatter plots, national economic performance is visualized as an organic topological territory where geological mass, towering obelisks, glowing circuitry veins, and atmospheric particle drifts reflect real-world empirical metrics.

---

## 2. Visual Grammar & Indicator Encodings

Every island represents one of the 38 OECD sovereign economies. Its generative geometry is computed directly from four harmonized statistical series:

| Visual Element | Statistical Indicator | Source Agency & Registry | Dimension & Transformation |
| :--- | :--- | :--- | :--- |
| **Geological Bedrock Mass** | Median Disposable Income | OECD Income Distribution Database (`OECD.WISE.INEQ`) | Base footprint radius [28–73px], strata elevation, and volumetric mass |
| **Crystalline Innovation Spire** | Gross Domestic Expenditure on R&D (% GDP) | OECD Main Science & Technology Indicators (`OECD.STI.MSTI`) | Vertical obelisk elevation [16–126px], photon luminescence, and tip beacon |
| **Branching Circuitry Traces** | Digital Intensity of Enterprises | OECD / Eurostat Business Digital Integration (`OECD.STI.IND`) | Micro-trace concentric density [3–12 rings], signal pulse velocity, and angle |
| **Atmospheric Coherence Aura** | Household Internet Access (% Connected) | OECD Telecommunications Database (`OECD.SDD.NAD`) | Halo radius [25–100px], outer wave pulse, and ambient particle drift speed |

---

## 3. Dedicated Pipeline Directory Structure

In accordance with The Muddled Renderings Project architecture, this rendering is completely self-contained within its own directory:

```
renderings/mar-a-techno-archipelago/
├── README.md                                 # This document: full rendering & pipeline specification
├── pipeline/
│   ├── oecd_database_etl.py                  # Python extraction & ETL pipeline (OECD SDMX REST API)
│   └── requirements.txt                      # Python dependencies (requests, pandas, numpy, pydantic)
├── analytics/
│   └── analytics_engine.ts                   # Statistical analytics, robust normalization & harmonic engine
├── visualization/
│   └── landscape_canvas_renderer.ts          # 60 FPS HTML5 Canvas procedural rendering engine
├── workflow/
│   └── oecd_atlas_pipeline.yml               # GitHub Actions autonomous monthly CI/CD ETL workflow
└── data/
    ├── canonical_sample.json                 # Sample payload of 38 OECD country observations
    └── schema.json                           # Observation and encoding validation schemas
```

---

## 4. Pipeline Execution & Reproduction

### Step 1: Install Python Dependencies
```bash
cd renderings/mar-a-techno-archipelago/pipeline
pip install -r requirements.txt
```

### Step 2: Run the Ingestion & ETL Script
```bash
python oecd_database_etl.py
```
This script queries the official OECD SDMX REST API for the latest observation periods, validates data distributions across the 38 member states, asserts statistical quality bounds, and outputs a canonical atlas JSON payload.

### Step 3: Run with the Live Web Application
From the root of the repository:
```bash
npm run dev
```
Navigate to `http://localhost:3000` to interact with the live procedural canvas, pan and zoom through the archipelago, and inspect individual country nodes.

---

## 5. Statistical Data Governance & Quality Gates

The pipeline enforces five automated validation gates before any dataset is permitted to update the visual canvas:
1. **Member State Invariant**: All 38 OECD member nations must be accounted for.
2. **Boundary Assertions**:
   - Internet access: $0\% \le x \le 100\%$
   - Digital intensity: $0\% \le x \le 100\%$
   - R&D expenditure: $0\% \le x \le 15\%$
   - Median income: $x > \$1,000 \text{ USD PPP}$
3. **Outlier Mitigation**: Robust normalization clips values at the 5th and 95th percentiles to prevent extreme single-nation outliers from compressing the visual spectrum of other members.
4. **Autonomous Fallbacks**: If OECD SDMX endpoints experience upstream rate limiting or maintenance downtime, the ETL falls back to verified authoritative baseline observations vetted by Eurostat and OECD publications.
