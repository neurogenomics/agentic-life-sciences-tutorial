# Data Validation

## Input Data Validation

Always validate input data before analysis:

### FASTQ Files
```python
def validate_fastq(filepath):
    """Validate FASTQ file format and quality."""
    checks = {
        'file_exists': os.path.exists(filepath),
        'not_empty': os.path.getsize(filepath) > 0,
        'gzipped': filepath.endswith('.gz'),
        'valid_format': check_fastq_format(filepath)
    }
    assert all(checks.values()), f"FASTQ validation failed: {checks}"
```

### VCF Files
```python
def validate_vcf(filepath):
    """Validate VCF file format."""
    with open(filepath) as f:
        # Check for required header
        first_line = f.readline()
        assert first_line.startswith('##fileformat=VCF'), "Missing VCF header"
        
        # Check for required columns
        for line in f:
            if line.startswith('#CHROM'):
                columns = line.strip().split('\t')
                required = ['#CHROM', 'POS', 'ID', 'REF', 'ALT', 'QUAL', 'FILTER', 'INFO']
                assert all(col in columns for col in required), "Missing required columns"
                break
```

## Sample Metadata Validation

### Required Fields
- Sample ID (unique identifier)
- Batch/run information
- Experimental conditions
- Quality control status

### Example Validation
```r
validate_metadata <- function(metadata_df) {
  required_cols <- c("sample_id", "batch", "condition", "qc_pass")
  
  # Check required columns exist
  stopifnot(all(required_cols %in% colnames(metadata_df)))
  
  # Check no missing values in required columns
  stopifnot(!any(is.na(metadata_df[required_cols])))
  
  # Check sample IDs are unique
  stopifnot(!any(duplicated(metadata_df$sample_id)))
  
  # Check QC status is logical
  stopifnot(is.logical(metadata_df$qc_pass))
  
  return(TRUE)
}
```

## Quality Control Thresholds

Document and enforce project-specific QC thresholds:

### Sequencing Quality
- Minimum read count: 10M reads per sample
- Minimum Q30 percentage: 80%
- Maximum adapter content: 5%

### Alignment Quality
- Minimum mapping rate: 70%
- Maximum duplicate rate: 30%
- Minimum coverage (WGS): 30X

### Variant Calling
- Minimum variant quality (QUAL): 30
- Minimum genotype quality (GQ): 20
- Minimum read depth: 10X

## Data Type Checks

```python
def check_data_types(df, schema):
    """Validate DataFrame against expected schema.
    
    Args:
        df: pandas DataFrame
        schema: dict mapping column names to expected types
    """
    for col, expected_type in schema.items():
        assert col in df.columns, f"Missing column: {col}"
        actual_type = df[col].dtype
        assert actual_type == expected_type, \
            f"Column {col}: expected {expected_type}, got {actual_type}"
```

## Range Validation

```python
def validate_ranges(value, min_val=None, max_val=None, name="value"):
    """Validate numeric value is within expected range."""
    if min_val is not None:
        assert value >= min_val, f"{name} {value} below minimum {min_val}"
    if max_val is not None:
        assert value <= max_val, f"{name} {value} above maximum {max_val}"
```
