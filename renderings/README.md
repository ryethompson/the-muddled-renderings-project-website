## 1. List of Published Renderings

| # | Rendering Title | Folder Path | Research Inquiry / Dataset | Status |
| :- | :--- | :--- | :--- | :- |
| 1 | **Techno Archipelago** | [`renderings/techno-archipelago/`](./techno-archipelago/) | OECD median disposable income to R&D expenditure and enterprise digital integration | **Published & Active** |
| 2 | *(Future Rendering)* | `renderings/<rendering-slug>/` | Planned |

---

## 2. Rendering Architecture

Whenever a new rendering is published, it will follow the following standardised structure:

```
renderings/<rendering-slug>/
├── README.md                 # Required: Detailed specification, premise, visual grammar, and data sources
├── pipeline/                 # Required: Data extraction, API clients, and ETL scripts
│   ├── <name>_etl.py (or .ts)
│   └── requirements.txt
├── analytics/                # Required: Normalization algorithms, statistical bounds, mathematical transforms
│   └── <name>_analytics.ts
├── visualization/            # Required: Procedural visual engine (Canvas, WebGL, SVG, or Three.js)
│   └── <name>_renderer.ts
├── workflow/                 # Optional/Recommended: GitHub Actions automated extraction workflow
│   └── <name>_pipeline.yml
└── data/                     # Optional/Recommended: Sample observations and JSON validation schemas
    ├── canonical_sample.json
    └── schema.json
```

---

( Note to Self )
When adding a new rendering to this repository:
1. **Create Folder**: Create `renderings/<new-rendering-slug>/`.
2. **Implement Pipeline**: Provide an automated ETL pipeline under `pipeline/` capable of retrieving raw observations from authoritative public or scientific sources.
3. **Define Analytics & Visual Grammar**: Define how the raw metrics map to geometric, chromatic, or procedural visual parameters in `analytics/`.
4. **Build Visualization**: Implement the visual renderer in `visualization/`.
5. **Write Documentation**: Create `renderings/<new-rendering-slug>/README.md` detailing the premise, indicator mappings, and reproduction steps.
6. **Register in Web Application**:
   - Add the project metadata entry in `src/data/defaultProjects.ts`.
   - Ensure `githubPipelineUrl` points to `https://github.com/ryethompson/the-muddled-renderings-project-website/tree/main/renderings/<new-rendering-slug>`.
   - Register the visualizer component in `src/components/`.
