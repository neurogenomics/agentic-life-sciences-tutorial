# Bioconductor Integration

## Overview

Bioconductor provides tools for analysis and comprehension of high-throughput genomic data. This skill guide covers common patterns and best practices.

## Installation and Setup

```r
# Install BiocManager
if (!require("BiocManager", quietly = TRUE))
    install.packages("BiocManager")

# Install core packages
BiocManager::install(c("GenomicRanges", "SummarizedExperiment", "DESeq2"))
```

## Working with Genomic Ranges

### Creating GenomicRanges Objects

```r
library(GenomicRanges)

# Create a GRanges object
gr <- GRanges(
    seqnames = Rle(c("chr1", "chr2", "chr1"), c(1, 3, 2)),
    ranges = IRanges(start = 101:106, end = 111:116),
    strand = Rle(strand(c("-", "+", "*")), c(1, 2, 3)),
    score = 1:6,
    GC = seq(1, 0, length = 6)
)

# Operations on ranges
overlaps <- findOverlaps(gr1, gr2)
nearest_genes <- nearest(snps, genes)
```

## SummarizedExperiment Objects

### Creating and Manipulating

```r
library(SummarizedExperiment)

# Create SummarizedExperiment
counts_matrix <- matrix(rpois(1000, lambda = 10), ncol = 10)
col_data <- DataFrame(condition = rep(c("treated", "control"), each = 5))
row_data <- DataFrame(gene_id = paste0("gene", 1:100))

se <- SummarizedExperiment(
    assays = list(counts = counts_matrix),
    colData = col_data,
    rowData = row_data
)

# Access data
counts <- assay(se, "counts")
metadata <- colData(se)
features <- rowData(se)
```

## DESeq2 for Differential Expression

### Standard DESeq2 Workflow

```r
library(DESeq2)

# Create DESeqDataSet
dds <- DESeqDataSetFromMatrix(
    countData = counts_matrix,
    colData = sample_info,
    design = ~ condition
)

# Filter low-count genes
keep <- rowSums(counts(dds)) >= 10
dds <- dds[keep, ]

# Run DESeq2
dds <- DESeq(dds)
res <- results(dds, contrast = c("condition", "treated", "control"))

# Multiple testing correction
res <- res[order(res$padj), ]

# Extract significant genes
sig_genes <- subset(res, padj < 0.05 & abs(log2FoldChange) > 1)
```

### Quality Control and Normalization

```r
# Variance stabilizing transformation
vsd <- vst(dds, blind = FALSE)

# PCA plot
plotPCA(vsd, intgroup = "condition")

# Sample distance heatmap
library(pheatmap)
sample_dists <- dist(t(assay(vsd)))
pheatmap(as.matrix(sample_dists))
```

## GenomicAlignments for BAM Files

```r
library(GenomicAlignments)
library(Rsamtools)

# Read BAM file
bam_file <- BamFile("path/to/file.bam")
param <- ScanBamParam(what = c("qname", "flag", "mapq"))
aln <- readGAlignments(bam_file, param = param)

# Count reads overlapping features
counts <- summarizeOverlaps(
    features = genes,
    reads = bam_file,
    mode = "Union",
    singleEnd = TRUE
)
```

## AnnotationHub for Reference Data

```r
library(AnnotationHub)

# Access annotation resources
ah <- AnnotationHub()

# Query for specific organism
human_resources <- subset(ah, species == "Homo sapiens")

# Get specific annotation
orgdb <- ah[["AH95744"]]  # Human OrgDb
```

## Best Practices

1. **Use Bioconductor Data Structures**
   - GRanges for genomic coordinates
   - SummarizedExperiment for assay data
   - Maintain metadata with objects

2. **Version Tracking**
   ```r
   # Document package versions
   sessionInfo()
   
   # Or specific package versions
   packageVersion("DESeq2")
   ```

3. **Reproducibility**
   - Set random seeds for stochastic processes
   - Use BiocParallel for parallelization
   - Document all parameters

4. **Memory Efficiency**
   - Use DelayedArray for large datasets
   - Process data in chunks when needed
   - Clear unused objects

5. **Documentation**
   - Access vignettes: `browseVignettes("DESeq2")`
   - Check method documentation: `?DESeq`
   - Follow Bioconductor workflows
