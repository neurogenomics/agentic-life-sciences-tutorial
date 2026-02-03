# Nextflow Patterns

## Overview

Nextflow is a workflow management system for bioinformatics pipelines. This guide covers common patterns for genomics workflows.

## Basic Pipeline Structure

```nextflow
#!/usr/bin/env nextflow

nextflow.enable.dsl=2

// Parameters
params.reads = "data/reads/*_{R1,R2}.fastq.gz"
params.reference = "data/reference/genome.fa"
params.outdir = "results"

// Import modules
include { FASTQC } from './modules/fastqc'
include { TRIMMING } from './modules/trimming'
include { ALIGNMENT } from './modules/alignment'

workflow {
    // Create channels
    read_pairs_ch = Channel
        .fromFilePairs(params.reads, checkIfExists: true)
    
    // Run processes
    FASTQC(read_pairs_ch)
    TRIMMING(read_pairs_ch)
    ALIGNMENT(TRIMMING.out, params.reference)
}
```

## Process Patterns

### Basic Process Template

```nextflow
process FASTQC {
    tag "$sample_id"
    publishDir "${params.outdir}/fastqc", mode: 'copy'
    
    conda 'bioconda::fastqc=0.11.9'
    
    input:
    tuple val(sample_id), path(reads)
    
    output:
    path "*.html", emit: html
    path "*.zip", emit: zip
    
    script:
    """
    fastqc -t ${task.cpus} ${reads}
    """
}
```

### Process with Multiple Outputs

```nextflow
process VARIANT_CALLING {
    tag "$sample_id"
    publishDir "${params.outdir}/variants", mode: 'copy'
    
    input:
    tuple val(sample_id), path(bam), path(bai)
    path reference
    
    output:
    tuple val(sample_id), path("*.vcf.gz"), emit: vcf
    tuple val(sample_id), path("*.vcf.gz.tbi"), emit: index
    path "*.stats.txt", emit: stats
    
    script:
    """
    bcftools mpileup -f ${reference} ${bam} | \
    bcftools call -mv -Oz -o ${sample_id}.vcf.gz
    
    bcftools index -t ${sample_id}.vcf.gz
    bcftools stats ${sample_id}.vcf.gz > ${sample_id}.stats.txt
    """
}
```

### Conditional Execution

```nextflow
process TRIM_ADAPTERS {
    tag "$sample_id"
    
    input:
    tuple val(sample_id), path(reads)
    
    output:
    tuple val(sample_id), path("*_trimmed.fastq.gz")
    
    when:
    params.trim_adapters
    
    script:
    """
    trimmomatic PE -threads ${task.cpus} \
        ${reads[0]} ${reads[1]} \
        ${sample_id}_R1_trimmed.fastq.gz ${sample_id}_R1_unpaired.fastq.gz \
        ${sample_id}_R2_trimmed.fastq.gz ${sample_id}_R2_unpaired.fastq.gz \
        ILLUMINACLIP:adapters.fa:2:30:10
    """
}
```

## Channel Operations

### Combining Channels

```nextflow
// Join channels by key
bam_ch = Channel.fromPath("*.bam").map { [it.baseName, it] }
bai_ch = Channel.fromPath("*.bai").map { [it.baseName, it] }
bam_bai_ch = bam_ch.join(bai_ch)

// Combine with reference
bam_bai_ref_ch = bam_bai_ch.combine(reference_ch)

// Collect all outputs
all_results = result_ch.collect()
```

### Splitting and Grouping

```nextflow
// Split FASTQ into chunks
read_ch
    .splitFastq(by: 1000000, file: true)
    .set { chunks_ch }

// Group by metadata
samples_ch
    .map { [it.metadata.condition, it] }
    .groupTuple()
```

## Configuration Management

### nextflow.config

```groovy
params {
    // Input/output
    reads = "data/reads/*_{R1,R2}.fastq.gz"
    outdir = "results"
    
    // Reference files
    reference = "data/reference/genome.fa"
    gtf = "data/reference/genes.gtf"
    
    // Analysis parameters
    trim_adapters = true
    min_quality = 20
    
    // Resource defaults
    max_cpus = 16
    max_memory = '64.GB'
    max_time = '24.h'
}

process {
    // Error handling
    errorStrategy = 'retry'
    maxRetries = 3
    
    // Resource labels
    withLabel: 'low_memory' {
        cpus = 2
        memory = '8.GB'
    }
    
    withLabel: 'high_memory' {
        cpus = 8
        memory = '64.GB'
    }
    
    // Process-specific resources
    withName: 'ALIGNMENT' {
        cpus = 8
        memory = '32.GB'
        time = '12.h'
    }
}

// Executor configuration
executor {
    name = 'slurm'
    queueSize = 50
}

// Container options
singularity {
    enabled = true
    autoMounts = true
}
```

## Testing and Validation

### Unit Testing Processes

```nextflow
// test.nf
include { FASTQC } from './main.nf'

workflow test_fastqc {
    test_data = Channel.fromPath("test/data/*.fastq.gz")
        .map { ["test_sample", it] }
    
    FASTQC(test_data)
}
```

### Profile for Testing

```groovy
// nextflow.config
profiles {
    test {
        params.reads = "test/data/*_{R1,R2}.fastq.gz"
        params.outdir = "test/results"
        process.executor = 'local'
    }
    
    docker {
        docker.enabled = true
        singularity.enabled = false
    }
    
    singularity {
        singularity.enabled = true
        docker.enabled = false
    }
}
```

## Best Practices

1. **Modularization**
   - Separate processes into modules
   - Reuse processes across workflows
   - Use subworkflows for complex logic

2. **Reproducibility**
   - Pin software versions in containers
   - Document all parameters
   - Use conda/docker for dependencies

3. **Error Handling**
   - Set appropriate retry strategies
   - Validate inputs before processing
   - Use `errorStrategy` directives

4. **Resource Management**
   - Set resource labels for processes
   - Use dynamic resource allocation
   - Implement checkpointing for long processes

5. **Documentation**
   - Include parameter descriptions
   - Document expected inputs/outputs
   - Provide usage examples
   - Maintain changelog

6. **Monitoring**
   - Use `-with-report` for execution reports
   - Enable `-with-timeline` for timeline
   - Utilize `-with-trace` for detailed metrics
