# Statistical Testing for Genomics

## Overview

Statistical testing is critical in genomics for identifying significant results while controlling for false discoveries. This guide covers common statistical approaches.

## Multiple Testing Correction

### False Discovery Rate (FDR)

```r
# Benjamini-Hochberg procedure
adjusted_p <- p.adjust(p_values, method = "BH")

# Using qvalue package for q-values
library(qvalue)
q_obj <- qvalue(p_values)
significant <- q_obj$qvalues < 0.05
```

```python
# In Python using statsmodels
from statsmodels.stats.multitest import multipletests

rejected, adjusted_p, _, _ = multipletests(
    p_values, 
    alpha=0.05, 
    method='fdr_bh'
)
```

### Bonferroni Correction

```r
# Conservative correction for family-wise error rate
bonferroni_p <- p.adjust(p_values, method = "bonferroni")
significant <- bonferroni_p < 0.05
```

## Power Analysis

### Sample Size Calculation

```r
library(pwr)

# Power analysis for t-test
pwr.t.test(
    d = 0.5,           # Effect size (Cohen's d)
    sig.level = 0.05,  # Significance level
    power = 0.8,       # Desired power
    type = "two.sample"
)

# For RNA-seq with SSIZERRNA
library(RNASeqPower)
rnapower(
    depth = 10,        # Average depth
    n = 3,             # Samples per group
    cv = 0.5,          # Coefficient of variation
    effect = 2,        # Fold change
    alpha = 0.05
)
```

## Differential Expression Analysis

### DESeq2 Statistical Framework

```r
library(DESeq2)

# Set up the model
dds <- DESeqDataSetFromMatrix(
    countData = counts,
    colData = metadata,
    design = ~ batch + condition
)

# Run DESeq2
dds <- DESeq(dds)
res <- results(dds, contrast = c("condition", "treatment", "control"))

# Apply independent filtering and shrinkage
res <- lfcShrink(dds, coef = "condition_treatment_vs_control", type = "apeglm")

# Extract results with FDR < 0.05 and |log2FC| > 1
sig <- subset(res, padj < 0.05 & abs(log2FoldChange) > 1)
```

### Linear Models with limma

```r
library(limma)
library(edgeR)

# Create DGEList and normalize
dge <- DGEList(counts = counts)
dge <- calcNormFactors(dge)

# Design matrix
design <- model.matrix(~ 0 + condition + batch, data = metadata)

# Voom transformation for RNA-seq
v <- voom(dge, design, plot = TRUE)

# Fit linear model
fit <- lmFit(v, design)

# Define contrasts
contrast_matrix <- makeContrasts(
    TreatmentVsControl = conditionTreatment - conditionControl,
    levels = design
)

fit2 <- contrasts.fit(fit, contrast_matrix)
fit2 <- eBayes(fit2)

# Get results
results <- topTable(fit2, coef = "TreatmentVsControl", number = Inf)
```

## Enrichment Analysis

### Hypergeometric Test

```r
# Gene set enrichment using hypergeometric test
hypergeometric_test <- function(genes_of_interest, gene_set, universe) {
    k <- length(intersect(genes_of_interest, gene_set))  # Overlap
    m <- length(gene_set)                                 # Genes in set
    n <- length(universe) - m                            # Genes not in set
    q <- length(genes_of_interest)                       # Genes of interest
    
    p_value <- phyper(k - 1, m, n, q, lower.tail = FALSE)
    
    return(list(
        overlap = k,
        p_value = p_value,
        enrichment = (k / q) / (m / length(universe))
    ))
}
```

### Gene Set Enrichment Analysis (GSEA)

```r
library(fgsea)

# Prepare ranked gene list (e.g., by log2 fold change)
gene_ranks <- setNames(res$log2FoldChange, rownames(res))
gene_ranks <- sort(gene_ranks, decreasing = TRUE)

# Load gene sets (e.g., MSigDB)
pathways <- gmtPathways("path/to/gene_sets.gmt")

# Run GSEA
fgsea_results <- fgsea(
    pathways = pathways,
    stats = gene_ranks,
    minSize = 15,
    maxSize = 500,
    nperm = 10000
)

# Filter significant pathways
sig_pathways <- fgsea_results[padj < 0.05]
```

## Genomic Region Analysis

### Testing for Regional Enrichment

```r
library(GenomicRanges)

# Test for overlap enrichment
observed_overlaps <- countOverlaps(query_ranges, subject_ranges)

# Permutation test
n_permutations <- 1000
permuted_overlaps <- replicate(n_permutations, {
    shuffled <- shuffle(query_ranges, chromsizes)
    countOverlaps(shuffled, subject_ranges)
})

p_value <- mean(permuted_overlaps >= observed_overlaps)
```

### GAT (Genomic Association Tester)

```python
# Using GAT for genomic interval enrichment
import gat

# Run GAT analysis
results = gat.run(
    segments=query_intervals,
    annotations=annotation_intervals,
    workspace=accessible_genome,
    num_samples=10000
)
```

## Survival Analysis

```r
library(survival)
library(survminer)

# Fit survival model
surv_object <- Surv(time = patient_data$time, event = patient_data$status)
fit <- survfit(surv_object ~ patient_data$treatment)

# Plot Kaplan-Meier curve
ggsurvplot(fit, data = patient_data, pval = TRUE, conf.int = TRUE)

# Cox proportional hazards model
cox_model <- coxph(
    Surv(time, status) ~ treatment + age + gender,
    data = patient_data
)
summary(cox_model)
```

## Batch Effect Correction

### ComBat for Batch Correction

```r
library(sva)

# Detect and remove batch effects
batch <- metadata$batch
modcombat <- model.matrix(~ condition, data = metadata)
combat_data <- ComBat(
    dat = expression_matrix,
    batch = batch,
    mod = modcombat,
    par.prior = TRUE,
    prior.plots = FALSE
)
```

### SVA for Surrogate Variables

```r
# Estimate surrogate variables
mod <- model.matrix(~ condition, data = metadata)
mod0 <- model.matrix(~ 1, data = metadata)

svobj <- sva(expression_matrix, mod, mod0, n.sv = 2)

# Include SVs in model
modsv <- cbind(mod, svobj$sv)
```

## Effect Size Measures

### Cohen's d

```r
cohen_d <- function(group1, group2) {
    n1 <- length(group1)
    n2 <- length(group2)
    
    pooled_sd <- sqrt(((n1 - 1) * var(group1) + (n2 - 1) * var(group2)) / 
                      (n1 + n2 - 2))
    
    d <- (mean(group1) - mean(group2)) / pooled_sd
    return(d)
}
```

### Confidence Intervals

```r
# Bootstrap confidence intervals
library(boot)

mean_function <- function(data, indices) {
    mean(data[indices])
}

boot_results <- boot(data = expression_values, statistic = mean_function, R = 10000)
boot.ci(boot_results, type = "perc")
```

## Best Practices

1. **Always Correct for Multiple Testing**
   - Use FDR for discovery-based studies
   - Use Bonferroni for hypothesis-driven studies
   - Report both nominal and adjusted p-values

2. **Check Assumptions**
   - Test for normality (Shapiro-Wilk test)
   - Check variance homogeneity (Levene's test)
   - Validate model assumptions (residual plots)

3. **Report Effect Sizes**
   - Include fold changes, not just p-values
   - Report confidence intervals
   - Use standardized effect sizes (Cohen's d, Hedge's g)

4. **Power Analysis**
   - Perform a priori power calculations
   - Report post-hoc power for non-significant results
   - Consider practical significance vs statistical significance

5. **Reproducibility**
   - Set random seeds for resampling methods
   - Document all parameters and thresholds
   - Report software versions
   - Share analysis code

6. **Validation**
   - Use independent validation cohorts
   - Cross-validate with different methods
   - Perform sensitivity analyses
