# Project Structure

## Standard Genomics Project Layout

```
project-name/
├── README.md              # Project overview and documentation
├── data/                  # Raw and processed data (not in version control)
│   ├── raw/              # Original, immutable data
│   ├── processed/        # Cleaned and processed data
│   └── metadata/         # Sample information and metadata
├── results/              # Analysis outputs
│   ├── figures/          # Publication-quality figures
│   ├── tables/           # Result tables and summaries
│   └── reports/          # Analysis reports and notebooks
├── scripts/              # Analysis scripts
│   ├── preprocessing/    # Data cleaning and QC
│   ├── analysis/         # Main analysis scripts
│   └── visualization/    # Plotting and figure generation
├── workflows/            # Pipeline definitions (Snakemake, Nextflow, etc.)
├── notebooks/            # Jupyter/R Markdown notebooks for exploration
├── tests/                # Unit tests for custom functions
├── docs/                 # Additional documentation
├── environment.yml       # Conda environment specification
├── requirements.txt      # Python dependencies
├── renv.lock            # R package dependencies (if using renv)
└── .gitignore           # Files to exclude from version control
```

## Data Directory Organization

- Keep raw data immutable (read-only permissions)
- Use clear, descriptive filenames with dates: `YYYYMMDD_description.ext`
- Include sample manifests linking sample IDs to data files
- Store metadata in standardized formats (CSV, TSV, JSON)

## Results Directory Best Practices

- Use versioned output directories: `results/v1/`, `results/v2/`
- Include timestamp in output filenames
- Generate reproducible figures with scripts (not manual editing)
- Keep track of which scripts generated which results

## Script Organization

- Number scripts in execution order: `01_download_data.sh`, `02_quality_control.R`
- Keep scripts modular and focused on single tasks
- Include usage examples in script headers
- Log script execution with timestamps

## Documentation Requirements

- README.md must include:
  - Project description and objectives
  - Data sources and access instructions
  - Software requirements and installation
  - How to reproduce the analysis
  - Contact information
