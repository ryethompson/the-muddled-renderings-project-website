# The Muddled Renderings Project

> **An exploratory art-science platform translating complex macroeconomic, socio-technical, and environmental datasets into living procedural digital landscapes.**

[![Live Web Application](https://img.shields.io/badge/Live%20App-Online-brightgreen)](https://ais-dev-izqtd3eyx62tvdpyveoioe-314342441459.europe-west2.run.app)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-blue)](https://nodejs.org/)
[![Python](https://img.shields.io/badge/Python-3.10%2B-blue)](https://www.python.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-lightgrey.svg)](LICENSE)

---

## 1. About the Project

**The Muddled Renderings Project** reimagines how we observe and understand institutional data. Rather than confining critical economic and technological realities to tabular spreadsheets, static reports, or flat charts, this platform renders statistics as an evolving procedural terrain.

Every rendering is a computational ecosystem where empirical indicators are directly mapped to physical and spatial visual attributes: geological bedrock volume, crystalline vertical spires, electric circuitry traces, and atmospheric particle drifts.

---

## 2. Architecture: Renderings & Respective Pipelines

In this repository, **every published rendering has one clearly associated pipeline** defined in its own dedicated subfolder under [`renderings/`](./renderings/). Each folder contains the end-to-end data lifecycle: raw extraction scripts, statistical normalization algorithms, procedural visual engines, and data schemas.

```
the-muddled-renderings-project-website/
├── README.md                                 # Root repository overview & project documentation
├── renderings/                               # Master directory for all renderings and their pipelines
│   ├── README.md                             # Architectural standard & template for future renderings
│   └── mar-a-techno-archipelago/             # Dedicated folder for Rendering #1
│       ├── README.md                         # Detailed rendering specification & artistic premise
│       ├── pipeline/                         # Data extraction & ETL (OECD SDMX REST API)
│       │   ├── oecd_database_etl.py
│       │   └── requirements.txt
│       ├── analytics/                        # Statistical normalization & harmonic resonance engine
│       │   └── analytics_engine.ts
│       ├── visualization/                    # Procedural HTML5 2D Canvas landscape renderer
│       │   └── landscape_canvas_renderer.ts
│       ├── workflow/                         # GitHub Actions automated monthly ingestion CI/CD
│       │   └── oecd_atlas_pipeline.yml
│       └── data/                             # Observation payloads & validation schemas
│           ├── canonical_sample.json
│           └── schema.json
├── src/                                      # Full-stack React web application
│   ├── components/                           # Canvas visualizers, navigation, metrics & code modal
│   ├── data/                                 # Project registries & pipeline viewer definitions
│   ├── lib/                                  # Project storage & state synchronization
│   └── server/                               # Ingestion engine & OECD dataset adapters
└── package.json
```

---

## 3. Published Renderings

### Rendering #1: Mar-a-Techno Archipelago

* **Status:** Published & Active
* **Research Inquiry:**
  > *"A visualisation of the relationship between median disposable income, national R&D expenditure, and digital integration in the OECD"*
* **Artistic Premise:**
  > *"In a disparate ocean, hotspots emerge. An archipelago develops; islands grow and contract in form, fed by the ever-violent outbursts of capital expenditure. Spires rise and shape the horizon, while volcanic sediment hardens into intricate circuitries. Ruffled by aura and the unknown, the islands expand and recede in size, competing for finite space in a volatile ecosystem."*
* **Target Subject:** 38 OECD Sovereign Member States
* **Dedicated Rendering Folder:** [`renderings/mar-a-techno-archipelago/`](./renderings/mar-a-techno-archipelago/)

#### Where to Find the Respective Pipeline Files:

| Pipeline Layer | File Path | Function & Technology |
| :--- | :--- | :--- |
| **Data Ingestion & ETL** | [`renderings/mar-a-techno-archipelago/pipeline/oecd_database_etl.py`](./renderings/mar-a-techno-archipelago/pipeline/oecd_database_etl.py) | Queries live OECD SDMX REST API endpoints, applies retry backoff, asserts statistical boundaries, and builds canonical datasets (Python). |
| **Statistical Analytics** | [`renderings/mar-a-techno-archipelago/analytics/analytics_engine.ts`](./renderings/mar-a-techno-archipelago/analytics/analytics_engine.ts) | Computes outlier-clipped robust normalizations (5th/95th percentiles) and cross-indicator harmonic resonance (TypeScript). |
| **Canvas Procedural Engine** | [`renderings/mar-a-techno-archipelago/visualization/landscape_canvas_renderer.ts`](./renderings/mar-a-techno-archipelago/visualization/landscape_canvas_renderer.ts) | 60 FPS HTML5 Canvas engine rendering wave equations, geological bedrock, crystalline spires, and particle flows (TypeScript / Canvas 2D). |
| **CI/CD Automation** | [`renderings/mar-a-techno-archipelago/workflow/oecd_atlas_pipeline.yml`](./renderings/mar-a-techno-archipelago/workflow/oecd_atlas_pipeline.yml) | Scheduled GitHub Actions workflow for autonomous monthly data extraction and build verification. |
| **Sample Dataset** | [`renderings/mar-a-techno-archipelago/data/canonical_sample.json`](./renderings/mar-a-techno-archipelago/data/canonical_sample.json) | Reference observation payload for 38 OECD nations with raw values and visual dimension mappings. |

#### Visual Grammar Encodings:
1. **Median Disposable Income (OECD WISE):** Governs **Geological Bedrock Mass & Footprint Radius** [28–73px]. Higher household income creates expansive, stratified rock foundations.
2. **R&D Expenditure as % of GDP (OECD STI MSTI):** Governs **Vertical Crystalline Obelisk Spires** [16–126px height] and photon luminescence.
3. **Enterprise Digital Intensity (OECD / Eurostat):** Governs **Branching Circuitry Traces** [3–12 rings] radiating through the bedrock and electrical pulse speed.
4. **Household Internet Access (OECD NAD):** Governs **Atmospheric Aura Radius** [25–100px] and ambient particle drift velocity.

---

## 4. Publishing Future Renderings

As new renderings are created, each must be published with its own self-contained pipeline folder:

1. Create a dedicated directory: `renderings/<rendering-slug>/`
2. Follow the standard subfolder structure (`pipeline/`, `analytics/`, `visualization/`, `workflow/`, `data/`).
3. Include a comprehensive `README.md` in the rendering folder detailing the inquiry, premise, and execution steps.
4. Register the new rendering in the website's project registry (`src/data/defaultProjects.ts`).
5. Update the table in [`renderings/README.md`](./renderings/README.md) and this root README.

Refer to [`renderings/README.md`](./renderings/README.md) for full architectural guidelines.

---

## 5. Local Development & Setup

### Prerequisites
* **Node.js**: v18.0.0 or higher (v20+ recommended)
* **Python**: v3.10 or higher (for running data pipelines)

### 1. Clone the Repository
```bash
git clone https://github.com/ryethompson/the-muddled-renderings-project-website.git
cd the-muddled-renderings-project-website
```

### 2. Install Web Dependencies
```bash
npm install
```

### 3. Start the Web Development Server
```bash
npm run dev
```
The application will be live at `http://localhost:3000`.

### 4. Run an Individual Rendering Pipeline
To run the automated data ingestion for **Mar-a-Techno Archipelago**:
```bash
# Navigate to the rendering's pipeline directory
cd renderings/mar-a-techno-archipelago/pipeline

# Install Python requirements
pip install -r requirements.txt

# Execute extraction & validation
python oecd_database_etl.py
```

### 5. Build for Production
```bash
npm run build
npm run lint
```

---

## 6. Website Features

* **Interactive Procedural Canvas**: Smooth 60 FPS continuous rendering with real-time pan, smooth zoom, and coordinate raycast hit-testing.
* **Country Node Inspection**: Click on any island in the archipelago to inspect its four raw statistical observations, OECD rank, and visual encoding parameters.
* **Project Parameters Drawer**: Live adjustment of simulation parameters (velocity speed, particle count, wave turbulence, node glow, field zoom).
* **In-App Pipeline Code Viewer**: An integrated, syntax-highlighted code inspector modal permitting users to view, copy, or download the exact Python ETL, TypeScript analytics, and Canvas rendering scripts directly in the browser.
* **Methodology & Quality Assurance**: Transparent documentation of source registries, observation reference periods, and data verification status.

---

## 7. Data Provenance & Citation

Data powering The Muddled Renderings Project is sourced from official open statistical databases:
* **OECD Data Portal & SDMX REST APIs**: National Accounts (`NAD`), Science & Technology (`MSTI`), Wellbeing & Income Distribution (`WISE`).
* **Eurostat**: Digital Economy and Society Index (DESI) & Harmonized Indicators (`DII`).

All data transformations are deterministic, versioned, and reproducible via the respective rendering pipelines.
