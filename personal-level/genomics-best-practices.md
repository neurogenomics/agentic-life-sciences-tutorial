# Genomics Best Practices

## Data Quality Control

- Always validate input data format and integrity
- Perform quality control checks on sequencing data (FastQC, MultiQC)
- Document quality metrics and thresholds used

## File Formats

- Use standard formats: FASTQ for reads, BAM/SAM for alignments, VCF for variants
- Always include headers and metadata
- Compress large files (gzip for FASTQ, BAM for alignments)

## Version Control

- Track analysis scripts and workflows in Git
- Document software versions used in analysis
- Use environment management tools (conda, docker) for reproducibility

## Data Analysis

- Use reference genomes from trusted sources (NCBI, Ensembl, UCSC)
- Document genome build and version used
- Validate key results with independent methods
- Include proper statistical controls

## Documentation

- Clearly document analysis parameters
- Keep README files with data descriptions
- Log computational resources used
- Note any manual interventions or filtering steps
