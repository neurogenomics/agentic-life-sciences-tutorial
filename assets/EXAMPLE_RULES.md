# Example Rules File for Data Science Projects
# Copy this to .opencode/rules/your-project-rules.md

## Project Overview

This is a template rules file for data science/genomics projects using AI coding assistants.

## Coding Standards

### Python
- Follow PEP 8 style guide with these modifications:
  - Max line length: 100 characters (not 80)
  - Use double quotes for strings
- Type hints are required for all function parameters and return values
- Use Google-style docstrings
- Import order: stdlib, third-party, local (alphabetical within groups)

### R
- Follow tidyverse style guide
- Use snake_case for all variable and function names
- Use explicit package calls (e.g., `dplyr::filter()`) when mixing packages with conflicting function names
- Comment complex data transformations

## File Organization

```
project/
├── data/
│   ├── raw/          # Original, immutable data
│   ├── processed/    # Cleaned/transformed data
│   └── external/     # Data from third-party sources
├── scripts/
│   ├── 01_download.R    # Data acquisition
│   ├── 02_clean.R       # Data cleaning
│   ├── 03_analysis.R    # Main analysis
│   └── 04_visualize.R   # Figure generation
├── results/
│   ├── figures/      # Generated plots
│   ├── tables/       # Summary tables
│   └── reports/      # Generated reports
├── tests/            # Unit tests
├── docs/             # Documentation
└── README.md
```

## Naming Conventions

- **Files**: `lowercase_with_underscores.R` or `lowercase-with-hyphens.py`
- **Variables**: `snake_case`
- **Functions**: `snake_case` with verbs (e.g., `load_data()`, `plot_distribution()`)
- **Constants**: `UPPER_SNAKE_CASE`
- **Classes**: `PascalCase`

## Data Handling

- Never commit raw data to git (add to .gitignore)
- Document data sources in README
- Include data dictionaries for processed datasets
- Use descriptive column names (no single-letter variables except in loops)
- Handle missing values explicitly (don't silently drop)

## Visualization Standards

- Use consistent color schemes across all figures
- Include proper axis labels and units
- Titles should be descriptive but concise
- Export figures in both PNG (for viewing) and PDF (for publication)
- Figure size: 8x6 inches for standard plots, adjust for multi-panel
- Resolution: 300 DPI for publication

## Testing Requirements

- Write tests for all data transformation functions
- Test edge cases (empty data, all NAs, large datasets)
- Minimum 80% code coverage
- Run tests before committing: `pytest` (Python) or `devtools::test()` (R)

## Git Workflow

- Commit messages: Use present tense, be specific (e.g., "Add normalization function")
- Branch naming: `feature/description` or `fix/description`
- Pull requests required for main branch
- Never commit secrets, passwords, or API keys

## Dependencies

- Pin exact versions in `requirements.txt` or `renv.lock`
- Document system dependencies in README
- Prefer well-maintained packages with >1000 GitHub stars
- Avoid packages that haven't been updated in 2+ years

## Reproducibility

- Set random seeds for all stochastic operations
- Document R/Python versions in README
- Use Docker or renv/conda for environment management
- Include a `make reproduce` command or similar

## Performance

- Use vectorized operations (avoid for-loops where possible)
- Profile slow code with `profvis` (R) or `cProfile` (Python)
- Cache intermediate results for expensive computations
- Load only necessary columns from large files

## Error Handling

- Use specific exception types, never bare `except:`
- Log errors with context (input data shape, parameters used)
- Fail fast: validate inputs at function start
- Provide helpful error messages with suggested fixes

## Documentation

- README must include: purpose, installation, usage example, data description
- Docstrings must include: description, parameters, returns, examples
- Complex algorithms need inline comments explaining the "why"
- Update docs when changing functionality

## Security Best Practices

- Validate all file paths (prevent directory traversal)
- Sanitize user inputs (SQL injection, XSS)
- Use parameterized queries for database access
- Never log sensitive data (PII, health data)
- Store secrets in environment variables or key vaults

## Genomics-Specific Rules

- Always check genome build/version (hg19, hg38, etc.)
- Document reference datasets used
- Include p-value thresholds in analysis (e.g., genome-wide significance: 5e-8)
- Account for population stratification in GWAS
- Report effect sizes with confidence intervals
- Use appropriate multiple testing correction

## AI Interaction Guidelines

When I say "analyze this data", you should:
1. First explore the data structure and report basic statistics
2. Check for missing values, outliers, and data quality issues
3. Ask me what specific questions I want answered
4. Suggest appropriate analysis methods
5. Show intermediate results for validation
6. Generate publication-ready figures

Before writing code, always:
- Check if similar functions already exist in the codebase
- Consider edge cases and error handling
- Think about testing requirements
- Estimate memory/time complexity for large datasets
