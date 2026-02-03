# Error Handling Best Practices

## Core Principles

- Catch specific exceptions, never use bare `except:` or broad `except Exception:`
- Provide context in error messages: what failed, why, how to fix
- Use custom exceptions for domain-specific errors
- Always log exceptions with `logger.exception()` in except blocks
- Chain exceptions with `raise ... from e` to preserve traceback

## Python Exception Handling

### Specific Exception Catching

```python
import logging

logger = logging.getLogger(__name__)

# ❌ BAD: Bare except
try:
    content = read_file(path)
except:
    pass

# ❌ BAD: Too broad
try:
    content = read_file(path)
except Exception as e:
    print(f"Error: {e}")

# ✅ GOOD: Specific exceptions with context
try:
    content = read_spec(spec_path)
except FileNotFoundError as e:
    logger.exception(f"Spec not found: {spec_path}")
    raise SpecParseError(f"Cannot find specification file: {spec_path}") from e
except PermissionError as e:
    logger.exception(f"Permission denied reading: {spec_path}")
    raise SpecParseError(f"Cannot access: {spec_path}. Check file permissions.") from e
except UnicodeDecodeError as e:
    logger.exception(f"Invalid encoding in: {spec_path}")
    raise SpecParseError(f"File {spec_path} contains invalid characters. Expected UTF-8.") from e
```

### Custom Exceptions

```python
class SpecParseError(Exception):
    """Raised when specification file cannot be parsed."""
    pass

class ValidationError(Exception):
    """Raised when input validation fails."""
    pass

class SecurityError(Exception):
    """Raised when security constraint is violated."""
    pass

class ToolExecutionError(Exception):
    """Raised when external tool execution fails."""
    pass
```

### Exception Chaining

```python
def process_file(filepath: str) -> dict:
    """Process a file and return parsed data.
    
    Args:
        filepath: Path to file to process
        
    Returns:
        Parsed data dictionary
        
    Raises:
        ProcessingError: If file cannot be processed
    """
    try:
        content = read_file(filepath)
        data = parse_content(content)
        return validate_data(data)
    except (FileNotFoundError, PermissionError) as e:
        logger.exception(f"Cannot access file: {filepath}")
        raise ProcessingError(f"Failed to read {filepath}") from e
    except ValueError as e:
        logger.exception(f"Invalid data in: {filepath}")
        raise ProcessingError(f"Data validation failed for {filepath}") from e
```

## R Error Handling

### Stop with Context

```r
# ✅ GOOD: Informative error messages
validate_input <- function(data, min_samples = 3) {
  if (!is.data.frame(data)) {
    stop("Input must be a data frame, got: ", class(data))
  }
  
  if (nrow(data) < min_samples) {
    stop(sprintf(
      "Insufficient samples: need %d, got %d",
      min_samples, nrow(data)
    ))
  }
}

# Using tryCatch
result <- tryCatch(
  {
    risky_operation(data)
  },
  error = function(e) {
    logger::log_error("Operation failed: {e$message}")
    stop("Cannot process data: ", e$message, call. = FALSE)
  },
  warning = function(w) {
    logger::log_warn("Warning during processing: {w$message}")
  }
)
```

## Genomics-Specific Error Handling

### File Format Validation

```python
def validate_fastq(filepath: str) -> None:
    """Validate FASTQ file format.
    
    Args:
        filepath: Path to FASTQ file
        
    Raises:
        ValidationError: If file format is invalid
    """
    try:
        with open(filepath, 'r') as f:
            # Check first record
            header = f.readline()
            if not header.startswith('@'):
                raise ValidationError(
                    f"Invalid FASTQ header in {filepath}. "
                    f"Expected '@', got: {header[:10]}"
                )
    except FileNotFoundError as e:
        logger.exception(f"FASTQ file not found: {filepath}")
        raise ValidationError(f"Cannot find FASTQ file: {filepath}") from e
    except UnicodeDecodeError as e:
        logger.exception(f"Invalid encoding in FASTQ: {filepath}")
        raise ValidationError(
            f"FASTQ file {filepath} is not text or has invalid encoding. "
            f"Expected gzipped FASTQ?"
        ) from e
```

### Data Range Validation

```python
def validate_quality_scores(scores: list[int], format: str = "phred33") -> None:
    """Validate quality score ranges.
    
    Args:
        scores: List of quality scores
        format: Quality score format (phred33 or phred64)
        
    Raises:
        ValidationError: If scores are out of valid range
    """
    valid_ranges = {
        "phred33": (0, 93),
        "phred64": (0, 62)
    }
    
    if format not in valid_ranges:
        raise ValidationError(f"Unknown quality format: {format}")
    
    min_val, max_val = valid_ranges[format]
    
    if any(s < min_val or s > max_val for s in scores):
        invalid = [s for s in scores if s < min_val or s > max_val]
        raise ValidationError(
            f"Quality scores out of range for {format}. "
            f"Expected [{min_val}, {max_val}], found: {invalid[:5]}"
        )
```

## Recovery Strategies

### Retry with Backoff

```python
import time
from typing import Callable, TypeVar

T = TypeVar('T')

def retry_with_backoff(
    func: Callable[[], T],
    max_attempts: int = 3,
    backoff_factor: float = 2.0
) -> T:
    """Retry function with exponential backoff.
    
    Args:
        func: Function to retry
        max_attempts: Maximum number of attempts
        backoff_factor: Multiplier for wait time between attempts
        
    Returns:
        Function result
        
    Raises:
        Last exception if all attempts fail
    """
    for attempt in range(max_attempts):
        try:
            return func()
        except (ConnectionError, TimeoutError) as e:
            if attempt == max_attempts - 1:
                logger.exception(f"All {max_attempts} attempts failed")
                raise
            
            wait_time = backoff_factor ** attempt
            logger.warning(
                f"Attempt {attempt + 1} failed: {e}. "
                f"Retrying in {wait_time}s..."
            )
            time.sleep(wait_time)
```

### Graceful Degradation

```python
def get_gene_annotation(gene_id: str) -> dict:
    """Get gene annotation with fallback.
    
    Args:
        gene_id: Gene identifier
        
    Returns:
        Annotation dictionary
    """
    try:
        # Try primary database
        return fetch_from_ensembl(gene_id)
    except ConnectionError as e:
        logger.warning(f"Ensembl unavailable: {e}. Trying NCBI...")
        try:
            return fetch_from_ncbi(gene_id)
        except ConnectionError as e2:
            logger.error(f"Both databases unavailable")
            # Return minimal annotation
            return {"gene_id": gene_id, "source": "none", "available": False}
```

## Error Message Guidelines

### Good Error Messages

```python
# ❌ BAD: Not helpful
raise ValueError("Invalid input")

# ✅ GOOD: Specific, actionable
raise ValueError(
    f"Sample ID '{sample_id}' contains invalid characters. "
    f"Only alphanumeric and underscore allowed. "
    f"Got: {sample_id}"
)

# ❌ BAD: Technical jargon only
raise RuntimeError("Assertion failed in line 42")

# ✅ GOOD: Context + suggestion
raise ValidationError(
    f"Quality control failed: {failed_count}/{total_count} samples "
    f"below minimum coverage threshold ({min_coverage}X). "
    f"Consider lowering threshold or removing low-quality samples."
)
```

## Testing Error Handling

```python
import pytest

def test_validate_fastq_when_invalid_header_then_raises():
    """Test FASTQ validation rejects invalid header."""
    # Arrange
    invalid_file = "test_invalid.fastq"
    with open(invalid_file, 'w') as f:
        f.write(">not_fastq_header\n")
    
    # Act & Assert
    with pytest.raises(ValidationError, match="Invalid FASTQ header"):
        validate_fastq(invalid_file)

def test_retry_when_all_attempts_fail_then_raises():
    """Test retry raises after max attempts."""
    # Arrange
    attempt_count = 0
    
    def failing_func():
        nonlocal attempt_count
        attempt_count += 1
        raise ConnectionError("Network error")
    
    # Act & Assert
    with pytest.raises(ConnectionError):
        retry_with_backoff(failing_func, max_attempts=3)
    
    assert attempt_count == 3
```
