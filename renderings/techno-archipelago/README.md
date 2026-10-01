# Techno Archipelago

> *A visualisation of the relationship between median disposable income, national R&D expenditure, and digital integration in the OECD*

---

## 1. Annotation

> *"In a disparate ocean, hotspots emerge. An archipelago develops; islands grow and contract in form, fed by the ever-violent outbursts of capital expenditure. Spires rise and shape the horizon, while volcanic sediment hardens into intricate circuitries. Ruffled by aura and the unknown, the islands expand and recede in size, competing for finite space within a volatile ecosystem."*

---

## 2. Multi-Year Time Series & Methodological Choices (2014–2024)

Rather than rendering a static single-year snapshot, **Techno Archipelago** incorporates a continuous 11-year annual time series spanning **2014 to 2024**.

### 2.1 Why 2014 is the Earliest Scope Boundary
To maximize historical reach while maintaining scientific validity, the series goes back to **2014**. Prior to 2014:
- The **Digital Intensity Index (DII)** was not yet harmonized across European and OECD statistics (Eurostat formalized the 12-criterion DII framework in 2014/2015).
- Household broadband penetration methodologies were heterogeneous and lacked standardized fixed-versus-mobile definitions across non-European OECD states (e.g. Chile, Colombia, Mexico).
- 2014 corresponds with the OECD Frascati Manual 7th Edition revisions for R&D capital expenditure accounting.

### 2.2 The 2-Year Maximum Interpolation Protocol
Because national statistical bureaus publish surveys on staggered, biennial, or irregular reporting cadences (especially the OECD Income Distribution Database), the ingestion engine enforces a strict  interpolation rule:

1. All verified statistical releases are ingested directly and tagged with `qualityStatus: 'Verified'`.
2. If an observation is missing for year $t$, it may **only** be interpolated if empirical anchor observations exist within **$\le 2$ calendar years** ($|t - t_{\text{anchor}}| \le 2$).
3. Exact Linear Interpolation Formula:
   $$\hat{y}(t) = y(t_0) + \frac{t - t_0}{t_1 - t_0} \cdot \bigl(y(t_1) - y(t_0)\bigr)$$
   *Subject to:* $t_0 < t < t_1$, with $(t_1 - t_0) \le 3$ years and $\max(t - t_0, t_1 - t) \le 2$ years.
4. For edge years (such as preliminary lag in 2024 reporting), observations may be held or projected from the nearest anchor up to a maximum of $\le 2$ calendar years, flagged explicitly as `qualityStatus: 'Interpolated'`.
5. Any data gap exceeding 2 consecutive years without empirical grounding is **strictly categorized as `Missing`** (`null` value). Speculative curve fitting or multi-year extrapolations are prohibited.
6. Every single observation maintains an audit note (e.g., `Linear interpolation between 2018 (32,400) and 2020 (35,100) under 2-year boundary constraint`).

### 2.3 Visualisation explaination
To ensure visual integrity as the user scrubs through time:
- The min/max normalization domain is computed **globally across the entire 2014–2024 epoch** rather than recalculated per individual year.
- *Visual Significance:* As median incomes rise over the decade, islands visibly expand in landsize. As R&D investments climb in high-tech economies, spires become taller. If the Digital Intensity of Businesses increases, extra circuit nodes are added. If the percentage of Household internet access increases, aura particles are increasingly emitted. 

---

## 3. Indicators

Every island represents one of the 38 OECD national economies. Its generative geometry is computed directly from four harmonized statistical series:

| Visual Element | Statistical Indicator | Source Agency & Registry | Dimension & Transformation |
| :--- | :--- | :--- | :--- |
| **Geological Bedrock Mass** | Median Disposable Income | OECD Income Distribution Database (`OECD.WISE.INEQ`) | Base footprint radius [36–82px], stratified terrace depth [3–8 layers], and volumetric mass |
| **Crystalline Innovation Spire** | Gross Domestic Expenditure on R&D (% GDP) | OECD Main Science & Technology Indicators (`OECD.STI.MSTI`) | Vertical obelisk elevation [16–126px], photon luminescence, and tip beacon |
| **Branching Circuitry Traces** | Digital Intensity of Enterprises | OECD / Eurostat Business Digital Integration (`OECD.STI.IND`) | Micro-trace concentric density [3–12 nodes], electrical impulse velocity, and angle |
| **Atmospheric Coherence Aura** | Household Internet Access (% Connected) | OECD Telecommunications Database (`OECD.SDD.NAD`) | Halo radius [25–100px], outer wave pulse, and ambient particle drift speed |

---

## 4. Interactive Time Series Slider Tool 

On the live website, visitors can interact with the 2014–2024 dataset using:
- **Interactive Scrubber Slider:** Drag across years 2014 to 2024 to watch the archipelago morph organically in real time.
- **60 FPS Parameter Morphing:** The canvas smoothly lerps terrain footprint, spire height, and lattice densities between years without abrupt visual jumping.
- **Country Annotation Inspector:** Clicking any island reveals its exact empirical values for the active year, complete with `[Verified]` or `[Interpolated ≤2yr]` provenance badges.
- **Macro HUD Summary:** Real-time calculation of OECD-wide average median disposable income, R&D intensity, and digital intensity for the active year.

---

## 5. Pipeline Structure

```
renderings/techno-archipelago/
├── README.md                                 # Full rendering specification & 2-year interpolation methodology
├── pipeline/
│   ├── oecd_database_etl.py                  # Python extraction & ETL pipeline (OECD SDMX REST API)
│   └── requirements.txt                      # Python dependencies (requests, pandas, numpy, pydantic)
├── analytics/
│   └── analytics_engine.ts                   # Statistical analytics, robust normalization & temporal harmonic engine
├── visualization/
│   └── landscape_canvas_renderer.ts          # 60 FPS HTML5 Canvas procedural rendering engine
├── workflow/
│   └── oecd_atlas_pipeline.yml               # GitHub Actions autonomous monthly CI/CD ETL workflow
└── data/
    ├── canonical_sample.json                 # Sample multi-year observations for 38 OECD countries
    └── schema.json                           # Observation and encoding validation schemas
```

---

## 6. Pipeline Execution & Reproduction

### Step 1: Install Python Dependencies
```bash
cd renderings/techno-archipelago/pipeline
pip install -r requirements.txt
```

### Step 2: Run the Ingestion & Interpolation ETL
```bash
python oecd_database_etl.py --start-year 2014 --end-year 2024 --max-interpolation-gap 2
```

This will:
1. Query official SDMX REST endpoints for all 38 OECD countries.
2. Validate incoming values against plausible physical distributions.
3. Apply the 2-Year Maximum Interpolation Protocol for non-reporting intervals.
4. Output the canonical multi-year JSON matrix.
