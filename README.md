# The Muddled Renderings Project

> **An exploratory research project translating complex socio-economic realities into living digital landscapes, with the goal of critically inquiring the ways data comes to represent reality.**

[![Live Web Application](https://img.shields.io/badge/Live%20App-Online-brightgreen)](https://ais-dev-izqtd3eyx62tvdpyveoioe-314342441459.europe-west2.run.app)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-blue)](https://nodejs.org/)
[![Python](https://img.shields.io/badge/Python-3.10%2B-blue)](https://www.python.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-lightgrey.svg)](LICENSE)

---

## 1. About the Project

**The Muddled Renderings Project** is an ongoing visual inquiry into the ways empirical data comes to represent economic inequalities as reality. Drawing on real-world datasets, analytical pipelines, and generative mechanisms, this open source project transforms statistical abstractions into living digital landscapes: shifting terrains where numbers acquire form, relationships become spatial, and patterns emerge and dissolve. In doing so, the project challenges not only what data reveals about economic inequalities, but also what is distorted, obscured, or lost when complex realities are rendered legible through measurement. 

---

## 2. Architecture: Renderings & Respective Pipelines

In this repository, **every published rendering has one clearly associated pipeline** defined in its own dedicated subfolder under [`renderings/`](./renderings/). Each folder contains the end-to-end data lifecycle: raw extraction scripts, statistical normalization algorithms, procedural visual engines, and data schemas.

```
the-muddled-renderings-project-website/
├── README.md                                 # Root repository overview & project documentation
├── renderings/                               # Master directory for all renderings and their pipelines
│   ├── README.md                             # Architectural standard & template for future renderings
│   └── mar-a-techno-archipelago/             # Dedicated folder for Rendering #1
│       ├── README.md                         # Detailed rendering specification & 2-year interpolation methodology
│       ├── pipeline/                         # Data extraction & ETL (OECD SDMX REST API, 2014–2024)
│       │   ├── oecd_database_etl.py
│       │   └── requirements.txt
│       ├── analytics/                        # Statistical normalization, harmonic resonance & temporal delta engine
│       │   └── analytics_engine.ts
│       ├── visualization/                    # Procedural HTML5 2D Canvas landscape renderer
│       │   └── landscape_canvas_renderer.ts
│       ├── workflow/                         # GitHub Actions automated monthly ingestion CI/CD
│       │   └── oecd_atlas_pipeline.yml
│       └── data/                             # Observation payloads & validation schemas
│           ├── canonical_sample.json
│           └── schema.json
├── src/                                      # Full-stack React web application
│   ├── components/                           # Canvas visualizers, year slider, navigation, metrics & code modal
│   ├── data/                                 # Project registries & pipeline viewer definitions
│   ├── lib/                                  # Project storage & state synchronization
│   └── server/                               # Ingestion engine, multi-year time series & OECD dataset adapters
└── package.json
```

---

## 3. Published Renderings

### Rendering #1: Mar-a-Techno Archipelago

* **Status:** Published & Active
* **Dedicated Rendering Folder:** [`renderings/mar-a-techno-archipelago/`](./renderings/mar-a-techno-archipelago/)

#### Multi-Year Time Series & Methodological Choices:
1. **Longitudinal Reach (2014–2024):** Incorporates an 11-year annual continuous time series. 2014 was selected as the earliest viable epoch due to the harmonization of the Eurostat Digital Intensity Index (DII) and modern OECD broadband surveys across all 38 member states.
2. **2-Year Maximum Interpolation Constraint:** To account for biennial or staggered reporting (common in the OECD Income Distribution Database), missing intermediate points are linearly interpolated **strictly if bounded by empirical anchor releases within $\le 2$ calendar years**.
3. **Strict Rejection Policy:** Any data gap exceeding 2 consecutive years without empirical grounding is rejected and marked as `Missing` (`null`). Speculative extrapolations are forbidden.
4. **Global Temporal Normalization Standard:** Min/max domain bounds are calculated across the entire 2014–2024 epoch. When dragging the year slider on the website, islands physically expand or shrink in real proportion to authentic macroeconomic growth.
5. **Interactive Year Slider & Playback:** The live application features an interactive year scrubber (2014–2024), autonomous 60 FPS parameter morphing, and an automated playback loop.

#### Where to Find the Respective Pipeline Files:

| Pipeline Layer | File Path | Function & Technology |
| :--- | :--- | :--- |
| **Data Ingestion & ETL** | [`renderings/mar-a-techno-archipelago/pipeline/oecd_database_etl.py`](./renderings/mar-a-techno-archipelago/pipeline/oecd_database_etl.py) | Harvests multi-year OECD SDMX REST API endpoints, applies retry backoff, executes 2-year bounded interpolation, and validates statistical ranges (Python). |
| **Statistical Analytics** | [`renderings/mar-a-techno-archipelago/analytics/analytics_engine.ts`](./renderings/mar-a-techno-archipelago/analytics/analytics_engine.ts) | Computes outlier-clipped robust normalizations (5th/95th percentiles), temporal growth velocity, and cross-indicator harmonic resonance (TypeScript). |
| **Canvas Procedural Engine** | [`renderings/mar-a-techno-archipelago/visualization/landscape_canvas_renderer.ts`](./renderings/mar-a-techno-archipelago/visualization/landscape_canvas_renderer.ts) | 60 FPS HTML5 Canvas engine rendering wave equations, geological bedrock, crystalline spires, and particle flows (TypeScript / Canvas 2D). |
| **CI/CD Automation** | [`renderings/mar-a-techno-archipelago/workflow/oecd_atlas_pipeline.yml`](./renderings/mar-a-techno-archipelago/workflow/oecd_atlas_pipeline.yml) | Scheduled GitHub Actions workflow for autonomous monthly data extraction and build verification. |
| **Sample Dataset** | [`renderings/mar-a-techno-archipelago/data/canonical_sample.json`](./renderings/mar-a-techno-archipelago/data/canonical_sample.json) | Reference multi-year observation payload for 38 OECD nations with raw values and visual dimension mappings. |

#### Visual Grammar Encodings:
1. **Median Disposable Income (OECD WISE):** Governs **Geological Bedrock Mass & Footprint Radius** [36–82px] and strata count [3–8 layers]. Higher household income creates expansive, stratified rock foundations.
2. **R&D Expenditure as % of GDP (OECD STI MSTI):** Governs **Vertical Crystalline Obelisk Spires** [16–126px height] and photon luminescence.
3. **Enterprise Digital Intensity (OECD / Eurostat):** Governs **Branching Circuitry Traces** [3–12 rings] radiating through the bedrock and electrical pulse speed.
4. **Household Internet Access (OECD NAD):** Governs **Atmospheric Aura Radius** [25–100px] and ambient particle drift velocity.

---

## 4. Publishing Future Renderings

As new renderings are created, each shall be published with its own self-contained pipeline folder:

# Note to Self #
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

### 4. Build for Production
```bash
npm run build
```
Production output will be generated in `dist/` and served via `server.ts`.
