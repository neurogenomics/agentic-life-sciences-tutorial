# Code Style Conventions

## General Principles

- Write self-documenting code with clear variable names
- Follow DRY (Don't Repeat Yourself) principle
- Keep functions focused and modular
- Use meaningful commit messages

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
