# Code Style Conventions

## General Principles

- Write self-documenting code with clear variable names
- Follow DRY (Don't Repeat Yourself) principle
- Keep functions focused and modular
- Use meaningful commit messages

## Function Design

### Single Responsibility Principle

Each function should do one thing and do it well:

```python
# ❌ BAD: Function does too much
def process_sample(sample_id, data_path):
    data = load_data(data_path)
    cleaned = clean_data(data)
    normalized = normalize(cleaned)
    results = analyze(normalized)
    save_results(results)
    plot_results(results)
    send_email(results)

# ✅ GOOD: Separate concerns
def load_and_clean_data(data_path):
    """Load and clean sample data."""
    data = load_data(data_path)
    return clean_data(data)

def analyze_sample(data):
    """Normalize and analyze sample data."""
    normalized = normalize(data)
    return analyze(normalized)

def save_and_report_results(results, sample_id):
    """Save results and generate report."""
    save_results(results, sample_id)
    plot_results(results, sample_id)
```

### Maximum Function Length

- **Max 50 lines per function** - If longer, extract helper functions
- Prefer multiple small functions over one large function
- Each function should fit on one screen

```python
# ✅ GOOD: Break down long functions
def process_vcf_file(vcf_path: str) -> dict:
    """Process VCF file and return variant statistics."""
    variants = _parse_vcf(vcf_path)
    filtered = _filter_variants(variants)
    annotated = _annotate_variants(filtered)
    return _calculate_statistics(annotated)

def _parse_vcf(vcf_path: str) -> list[dict]:
    """Parse VCF file into variant records."""
    # Implementation...
    pass

def _filter_variants(variants: list[dict]) -> list[dict]:
    """Filter variants by quality."""
    # Implementation...
    pass
```

### Pure Functions

Prefer pure functions (no side effects) when possible:

```python
# ❌ BAD: Modifies global state
total_reads = 0

def count_reads(fastq_path):
    global total_reads
    count = parse_fastq(fastq_path)
    total_reads += count
    return count

# ✅ GOOD: Pure function
def count_reads(fastq_path: str) -> int:
    """Count reads in FASTQ file."""
    return parse_fastq(fastq_path)

# Caller manages state
total_reads = sum(count_reads(f) for f in fastq_files)
```

### Naming Convention

Use verb_noun pattern for function names:

```python
# ✅ GOOD: Clear action verbs
parse_vcf()
validate_path()
calculate_gc_content()
filter_variants()
normalize_counts()

# ❌ BAD: Vague or noun-only
vcf()
path()
gc()
variants()
counts()
```

## Code Organization

### Import Order (PEP 8)

```python
# 1. Standard library imports
import logging
import os
from pathlib import Path
from typing import Any, Dict, List

# 2. Third-party imports
import numpy as np
import pandas as pd
from Bio import SeqIO

# 3. Local/application imports
from genomics.analysis import run_pipeline
from genomics.config import MAX_ITERATIONS
from genomics.utils import validate_path
```

### Naming Conventions

```python
# Classes: PascalCase
class SequenceAnalyzer:
    pass

class VCFParser:
    pass

# Functions and variables: snake_case
def calculate_gc_content(sequence: str) -> float:
    total_bases = len(sequence)
    gc_count = sequence.count('G') + sequence.count('C')
    return gc_count / total_bases

# Constants: UPPER_SNAKE_CASE
MAX_READ_LENGTH = 300
DEFAULT_QUALITY_THRESHOLD = 20
REFERENCE_GENOME_PATH = "/data/reference.fa"

# Private functions/variables: leading underscore
def _internal_helper():
    pass

_cached_results = {}
```

## Python

- Follow PEP 8 style guide
- Use type hints for function signatures
- Maximum line length: 88 characters (Black formatter)
- Use docstrings for all functions and classes
- Example:
  ```python
  def calculate_gc_content(sequence: str) -> float:
      """Calculate GC content of DNA sequence.
      
      Args:
          sequence: DNA sequence string
          
      Returns:
          GC content as proportion (0-1)
      """
      gc_count = sequence.upper().count('G') + sequence.upper().count('C')
      return gc_count / len(sequence)
  ```

## R

- Follow tidyverse style guide
- Use snake_case for variable and function names
- Maximum line length: 80 characters
- Use roxygen2 for function documentation
- Example:
  ```r
  #' Calculate GC content
  #'
  #' @param sequence Character vector of DNA sequence
  #' @return Numeric GC content proportion
  calculate_gc_content <- function(sequence) {
    gc_count <- str_count(toupper(sequence), "[GC]")
    gc_count / nchar(sequence)
  }
  ```

## Shell Scripts

- Use bash strict mode: `set -euo pipefail`
- Quote all variable expansions
- Use long-form flags for readability
- Include usage documentation

## Comments

- Explain WHY, not WHAT (code should be self-explanatory)
- Document assumptions and limitations
- Add TODO comments for known improvements
- Include references to papers/methods when applicable
