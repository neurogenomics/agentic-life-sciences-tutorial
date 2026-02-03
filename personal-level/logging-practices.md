# Logging Best Practices

## Core Principles

- Use Python's `logging` module, never `print()` statements
- Create logger per module: `logger = logging.getLogger(__name__)`
- Use appropriate log levels: DEBUG, INFO, WARNING, ERROR, CRITICAL
- Include context in log messages (file names, IDs, operations)
- Use `logger.exception()` in except blocks to capture tracebacks

## Python Logging Setup

### Module-Level Logger

```python
import logging

# At module level
logger = logging.getLogger(__name__)

def process_sample(sample_id: str, data_path: str) -> dict:
    """Process a biological sample.
    
    Args:
        sample_id: Unique sample identifier
        data_path: Path to sample data
        
    Returns:
        Processing results
    """
    logger.info(f"Processing sample: {sample_id} from {data_path}")
    
    try:
        data = load_data(data_path)
        logger.debug(f"Loaded {len(data)} records for {sample_id}")
        
        results = analyze_data(data)
        logger.info(f"Analysis complete for {sample_id}: {results['summary']}")
        
        return results
        
    except FileNotFoundError as e:
        logger.exception(f"Data file not found for sample {sample_id}: {data_path}")
        raise
    except Exception as e:
        logger.exception(f"Unexpected error processing {sample_id}")
        raise
```

### Application-Level Configuration

```python
import logging
import sys
from pathlib import Path

def setup_logging(
    level: str = "INFO",
    log_file: Path | None = None,
    format_str: str | None = None
) -> None:
    """Configure logging for the application.
    
    Args:
        level: Logging level (DEBUG, INFO, WARNING, ERROR, CRITICAL)
        log_file: Optional file path for log output
        format_str: Optional custom format string
    """
    if format_str is None:
        format_str = (
            "%(asctime)s - %(name)s - %(levelname)s - "
            "%(funcName)s:%(lineno)d - %(message)s"
        )
    
    handlers = [logging.StreamHandler(sys.stdout)]
    
    if log_file:
        handlers.append(logging.FileHandler(log_file))
    
    logging.basicConfig(
        level=getattr(logging, level.upper()),
        format=format_str,
        handlers=handlers,
        datefmt="%Y-%m-%d %H:%M:%S"
    )
    
    logger = logging.getLogger(__name__)
    logger.info(f"Logging initialized at {level} level")
```

## Log Levels

### When to Use Each Level

```python
logger = logging.getLogger(__name__)

# DEBUG: Detailed diagnostic information
logger.debug(f"Read {len(sequences)} sequences from {filepath}")
logger.debug(f"Quality scores range: {min_qual}-{max_qual}")

# INFO: General operational events
logger.info(f"Starting alignment of {sample_count} samples")
logger.info(f"Analysis complete: {passed}/{total} samples passed QC")

# WARNING: Potentially problematic situations
logger.warning(f"Low coverage for sample {sample_id}: {coverage}X (expected ≥30X)")
logger.warning(f"Missing metadata for {missing_count} samples, using defaults")

# ERROR: Error events that might still allow the application to continue
logger.error(f"Failed to process sample {sample_id}: {error_msg}")
logger.error(f"Cannot connect to annotation database, using cache")

# CRITICAL: Severe errors that may cause the application to abort
logger.critical(f"Reference genome not found: {ref_path}")
logger.critical(f"Out of disk space: {available_gb}GB remaining")
```

## Context-Rich Logging

### Include Relevant Information

```python
def align_reads(
    sample_id: str,
    fastq_path: str,
    reference: str,
    threads: int = 4
) -> str:
    """Align sequencing reads to reference genome.
    
    Args:
        sample_id: Sample identifier
        fastq_path: Path to FASTQ file
        reference: Path to reference genome
        threads: Number of threads to use
        
    Returns:
        Path to output BAM file
    """
    logger.info(
        f"Aligning reads for {sample_id}: "
        f"input={fastq_path}, ref={reference}, threads={threads}"
    )
    
    start_time = time.time()
    
    try:
        # Alignment logic
        bam_path = run_alignment(fastq_path, reference, threads)
        
        elapsed = time.time() - start_time
        logger.info(
            f"Alignment complete for {sample_id}: "
            f"output={bam_path}, time={elapsed:.1f}s"
        )
        
        return bam_path
        
    except Exception as e:
        logger.exception(
            f"Alignment failed for {sample_id} after {time.time() - start_time:.1f}s"
        )
        raise
```

### Structured Logging

```python
import logging
import json

class JsonFormatter(logging.Formatter):
    """Format log records as JSON."""
    
    def format(self, record: logging.LogRecord) -> str:
        """Format record as JSON string."""
        log_data = {
            "timestamp": self.formatTime(record),
            "level": record.levelname,
            "logger": record.name,
            "function": record.funcName,
            "line": record.lineno,
            "message": record.getMessage(),
        }
        
        if record.exc_info:
            log_data["exception"] = self.formatException(record.exc_info)
        
        # Include any extra fields
        for key, value in record.__dict__.items():
            if key not in ["name", "msg", "args", "created", "filename", "funcName",
                          "levelname", "levelno", "lineno", "module", "msecs",
                          "message", "pathname", "process", "processName",
                          "relativeCreated", "thread", "threadName", "exc_info",
                          "exc_text", "stack_info"]:
                log_data[key] = value
        
        return json.dumps(log_data)

# Use structured logging
handler = logging.StreamHandler()
handler.setFormatter(JsonFormatter())

logger = logging.getLogger(__name__)
logger.addHandler(handler)

logger.info("Sample processed", extra={
    "sample_id": "SAMPLE001",
    "reads_count": 15000000,
    "mapping_rate": 0.95
})
```

## Exception Logging

### Always Use logger.exception()

```python
def process_vcf(vcf_path: str) -> dict:
    """Process VCF file and extract variants.
    
    Args:
        vcf_path: Path to VCF file
        
    Returns:
        Variant statistics
    """
    logger.info(f"Processing VCF: {vcf_path}")
    
    try:
        variants = parse_vcf(vcf_path)
        stats = calculate_stats(variants)
        
        logger.info(
            f"VCF processing complete: {vcf_path} - "
            f"{stats['variant_count']} variants, "
            f"{stats['snp_count']} SNPs, "
            f"{stats['indel_count']} indels"
        )
        
        return stats
        
    except FileNotFoundError:
        logger.exception(f"VCF file not found: {vcf_path}")
        raise
    except ValueError as e:
        logger.exception(f"Invalid VCF format in {vcf_path}")
        raise
    except Exception:
        logger.exception(f"Unexpected error processing VCF: {vcf_path}")
        raise
```

## Performance Logging

### Log Resource Usage

```python
import psutil
import time

def log_resource_usage(operation: str) -> None:
    """Log current resource usage.
    
    Args:
        operation: Description of current operation
    """
    process = psutil.Process()
    memory_mb = process.memory_info().rss / 1024 / 1024
    cpu_percent = process.cpu_percent(interval=0.1)
    
    logger.debug(
        f"Resource usage during {operation}: "
        f"memory={memory_mb:.1f}MB, cpu={cpu_percent:.1f}%"
    )

def analyze_large_dataset(data_path: str) -> dict:
    """Analyze large genomics dataset with performance logging."""
    logger.info(f"Starting analysis of {data_path}")
    log_resource_usage("startup")
    
    start_time = time.time()
    
    # Load data
    data = load_large_file(data_path)
    logger.debug(f"Data loaded in {time.time() - start_time:.2f}s")
    log_resource_usage("data loading")
    
    # Process data
    results = process_data(data)
    logger.debug(f"Processing complete in {time.time() - start_time:.2f}s")
    log_resource_usage("processing")
    
    total_time = time.time() - start_time
    logger.info(f"Analysis complete in {total_time:.2f}s")
    
    return results
```

## R Logging

### Using logger Package

```r
library(logger)

# Configure logging
log_threshold(INFO)
log_appender(appender_file("analysis.log"))

# Log at different levels
process_sample <- function(sample_id, data_path) {
  log_info("Processing sample: {sample_id} from {data_path}")
  
  tryCatch({
    data <- read_data(data_path)
    log_debug("Loaded {nrow(data)} records for {sample_id}")
    
    results <- analyze_data(data)
    log_info("Analysis complete for {sample_id}")
    
    results
  }, error = function(e) {
    log_error("Error processing {sample_id}: {e$message}")
    stop(e)
  })
}

# Performance logging
log_performance <- function(operation, expr) {
  start_time <- Sys.time()
  result <- expr
  elapsed <- difftime(Sys.time(), start_time, units = "secs")
  
  log_info("{operation} completed in {round(elapsed, 2)} seconds")
  result
}

# Usage
results <- log_performance(
  "Differential expression analysis",
  run_deseq2(counts, metadata)
)
```

## Anti-Patterns to Avoid

```python
# ❌ BAD: Using print statements
print(f"Processing {sample_id}")

# ✅ GOOD: Using logger
logger.info(f"Processing {sample_id}")

# ❌ BAD: No context
logger.error("Processing failed")

# ✅ GOOD: Rich context
logger.error(f"Processing failed for sample {sample_id} at step {step_name}: {error_msg}")

# ❌ BAD: Logging in tight loops
for record in million_records:
    logger.debug(f"Processing record {record.id}")

# ✅ GOOD: Log summaries
chunk_size = 10000
for i, chunk in enumerate(chunks(million_records, chunk_size)):
    process_chunk(chunk)
    logger.debug(f"Processed chunk {i+1}: {len(chunk)} records")

# ❌ BAD: Not using exception logging
except Exception as e:
    logger.error(f"Error: {e}")

# ✅ GOOD: Capture full traceback
except Exception as e:
    logger.exception(f"Unexpected error processing {sample_id}")
    raise
```

## Log File Management

### Rotating Logs

```python
from logging.handlers import RotatingFileHandler, TimedRotatingFileHandler

def setup_rotating_logs(log_file: str, max_bytes: int = 10_000_000) -> None:
    """Setup rotating file handler.
    
    Args:
        log_file: Path to log file
        max_bytes: Maximum size before rotation (default: 10MB)
    """
    handler = RotatingFileHandler(
        log_file,
        maxBytes=max_bytes,
        backupCount=5  # Keep 5 backup files
    )
    
    formatter = logging.Formatter(
        "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
    )
    handler.setFormatter(formatter)
    
    logger = logging.getLogger()
    logger.addHandler(handler)

def setup_daily_logs(log_dir: str) -> None:
    """Setup daily rotating logs.
    
    Args:
        log_dir: Directory for log files
    """
    log_file = f"{log_dir}/analysis.log"
    
    handler = TimedRotatingFileHandler(
        log_file,
        when='midnight',
        interval=1,
        backupCount=30  # Keep 30 days
    )
    
    formatter = logging.Formatter(
        "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
    )
    handler.setFormatter(formatter)
    
    logger = logging.getLogger()
    logger.addHandler(handler)
```

## Testing Logging

```python
import pytest
from unittest.mock import patch
import logging

def test_logging_info_message(caplog):
    """Test that info message is logged."""
    with caplog.at_level(logging.INFO):
        process_sample("SAMPLE001", "/path/to/data")
    
    assert "Processing sample: SAMPLE001" in caplog.text

def test_logging_exception_on_error(caplog):
    """Test that exceptions are logged."""
    with caplog.at_level(logging.ERROR):
        with pytest.raises(FileNotFoundError):
            process_sample("SAMPLE001", "/nonexistent/path")
    
    assert "Data file not found" in caplog.text
```
