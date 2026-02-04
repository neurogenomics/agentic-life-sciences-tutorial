# Dead Coders Society

Markdown Skills for AI agents - A collection of genomics-focused coding skills compatible with OpenCode.

> "Programming is dead"

> "Nothing we do as we know it will be the same in three months"

> "Code is over"

> "The number of copilot requests we have today is irrelevant. We should be burning through a data centres worth of credits"

## Overview

This repo is designed to aid the adoption of agentic work in the lab, along with shared lessons and optimisations.

## Setup

Coding agents are distinct from chatbots in that they are interacted through a terminal-like interface instead of a text box.

Here are the current tools we are using:

* [OpenCode](https://opencode.ai/) agent interface is an open source alternative to Claude Code
* [OpenRouter](openrouter.ai) as provider (single subscription to access many models)
* [Kimi K2.5](https://www.kimi.com/en) is a current strong coding model

To access Anthropic's Opus 4.5, we are accessing through [GitHub Education](https://github.com/education):
* Using [OpenCode](https://opencode.ai/) as the interface to run the models
* Selecting [GitHub Copilot](https://github.com/features/copilot) as provider: `Connect provider`
* Select Opus 4.5 or other models available through GitHub Copilot

## Skill Levels

### 1. Personal Level Skills (`personal-level/`)

**Scope**: User-wide skills that apply to all your projects

**Location**: `~/.opencode/skills/`

**Use Case**: Your personal coding conventions, general genomics best practices, and reproducibility guidelines that you want to apply consistently across all work.

**Installation**:
```bash
# Copy to your home directory OpenCode skills folder
mkdir -p ~/.opencode/skills/
cp -r personal-level/* ~/.opencode/skills/
```

**Included Skills**:

*Code Quality & Standards:*
- `code-style-conventions.md` - Language-specific style guides, function design, naming conventions
- `error-handling.md` - Exception handling patterns, custom exceptions, recovery strategies
- `logging-practices.md` - Structured logging, log levels, performance tracking
- `testing-standards.md` - Unit/integration testing, fixtures, mocking, coverage (≥80%)
- `security-practices.md` - Input validation, path sanitization, command safety, resource limits

*Genomics & Science:*
- `genomics-best-practices.md` - Data quality control, file formats, version control, documentation
- `scientific-reproducibility.md` - Random seeds, environment management, data provenance

### 2. Project Level Skills (`project-level/`)

**Scope**: Project-specific skills for individual genomics projects

**Location**: `<project-directory>/.opencode/skills/`

**Use Case**: Project-specific conventions, data structures, validation rules, and analysis workflows that are unique to a particular research project.

**Installation**:
```bash
# Navigate to your project directory
cd /path/to/your/genomics/project

# Create project-specific OpenCode skills directory
mkdir -p .opencode/skills/

# Copy project-level skills
cp -r /path/to/dead-coders-society/project-level/* .opencode/skills/

# Or create symbolic links for easier updates
ln -s /path/to/dead-coders-society/project-level/* .opencode/skills/
```

**Included Skills**:

*Project Structure & Workflow:*
- `project-structure.md` - Standard genomics project directory organization
- `analysis-workflow.md` - Standard genomics analysis pipeline phases
- `development-tools.md` - Modern Python setup (pyproject.toml), pre-commit, black, ruff, mypy, pytest

*Data & Validation:*
- `data-validation.md` - Input validation, QC thresholds, and data type checks

### 3. Plugin Level Skills (`plugin-level/`)

**Scope**: Skills activated when specific OpenCode plugins are enabled

**Location**: `~/.opencode/plugins/skills/` or `.opencode/plugins/skills/`

**Use Case**: Specialized functionality for specific tools and frameworks (Bioconductor, Nextflow, statistical testing).

**Installation**:
```bash
# For user-wide plugin skills
mkdir -p ~/.opencode/plugins/skills/
cp -r plugin-level/* ~/.opencode/plugins/skills/

# For project-specific plugin skills
mkdir -p .opencode/plugins/skills/
cp -r plugin-level/* .opencode/plugins/skills/
```

**Included Skills**:
- `bioconductor-integration.md` - Bioconductor package usage patterns and best practices
- `nextflow-patterns.md` - Nextflow workflow development for genomics pipelines
- `statistical-testing.md` - Statistical analysis methods for genomics data

## OpenCode Integration

### What is OpenCode?

OpenCode is a coding assistant that uses markdown-formatted skills to guide AI agents in writing code that follows your conventions and best practices.

### How Skills Work with OpenCode

1. **Skill Discovery**: OpenCode automatically discovers skills in the configured directories
2. **Context Awareness**: Skills are loaded based on the current context (user, project, or plugin)
3. **Code Generation**: When you request code, OpenCode uses relevant skills to ensure the generated code follows your guidelines
4. **Consistency**: Skills ensure consistent coding patterns across your entire project and organization

### Skill Hierarchy

OpenCode applies skills in this order of priority:

1. **Plugin Level** - Most specific, applies when plugin is active
2. **Project Level** - Applies to the current project
3. **Personal Level** - Applies to all your work

More specific skills override more general ones when there are conflicts.

## Genomics Lab Focus

These skills are specifically designed for genomics research with emphasis on:

### Scientific Accuracy and Depth
- Validation of genomic data formats (FASTQ, BAM, VCF)
- Quality control thresholds based on field standards
- Reference genome version tracking
- Annotation and functional enrichment best practices

### Reproducibility
- Random seed management
- Environment specification (conda, Docker)
- Workflow management systems (Nextflow, Snakemake)
- Data provenance and audit trails
- Comprehensive parameter documentation

### Testing and Validation
- Input data validation functions
- QC threshold enforcement
- Statistical test assumptions checking
- Cross-validation with independent methods
- Unit tests for custom analysis functions

### Coding Conventions
- Language-specific style guides (Python PEP 8, R tidyverse)
- Documentation standards (docstrings, roxygen2)
- Error handling patterns
- Logging and checkpointing
- Version control best practices

## Usage Examples

### Example 1: Setting Up a New Genomics Project

```bash
# Create project structure
mkdir my-rnaseq-analysis
cd my-rnaseq-analysis

# Install project-level skills
mkdir -p .opencode/skills/
ln -s ~/dead-coders-society/project-level/* .opencode/skills/

# OpenCode will now use these skills when helping you code
# Request: "Create a directory structure for RNA-seq analysis"
# OpenCode will follow the patterns in project-structure.md
```

### Example 2: Using Bioconductor Plugin Skills

```bash
# Install plugin skills
mkdir -p ~/.opencode/plugins/skills/
cp ~/dead-coders-society/plugin-level/bioconductor-integration.md ~/.opencode/plugins/skills/

# Enable Bioconductor plugin in OpenCode
# When you request Bioconductor code, it will follow the patterns in the skill
# Request: "Create a DESeq2 analysis for differential expression"
# OpenCode will generate code following the patterns in bioconductor-integration.md
```

### Example 3: Personal Coding Conventions

```bash
# Install personal skills once
mkdir -p ~/.opencode/skills/
cp ~/dead-coders-society/personal-level/* ~/.opencode/skills/

# These skills now apply to all your projects
# Request: "Write a Python function to calculate GC content"
# OpenCode will follow your personal style guide from code-style-conventions.md
```

## Customization

All skills are written in Markdown and can be easily customized:

1. **Clone or fork this repository**
2. **Edit the skill files** to match your lab's specific requirements
3. **Add new skills** as needed for your workflows
4. **Share with your team** by having everyone use the same skill repository

## Contributing

To add or improve skills:

1. Follow the existing Markdown format
2. Include practical code examples
3. Focus on genomics-specific use cases
4. Ensure scientific accuracy
5. Test skills with OpenCode to verify compatibility

## Best Practices for Skill Maintenance

1. **Version Control**: Keep skills in a Git repository
2. **Team Alignment**: Have the team review and agree on skill content
3. **Regular Updates**: Update skills as standards evolve
4. **Documentation**: Keep examples current and well-documented
5. **Testing**: Verify skills work as expected with OpenCode

## License

See [LICENSE](LICENSE) file for details.

## Support

For issues or questions:
- Open an issue in this repository
- Consult the OpenCode documentation
- Review the skill README files in each directory

## Contact

### [Neurogenomics Lab](https://www.neurogenomics.co.uk)

UK Dementia Research Institute  
Department of Brain Sciences  
Faculty of Medicine  
Imperial College London  
[GitHub](https://github.com/neurogenomics)

## Acknowledgments

Title credit: @jaymoore-research.

These skills are designed to promote best practices in genomics research, incorporating standards from:
- Bioconductor project
- ENCODE consortium guidelines
- NIH data sharing policies
- Community-established bioinformatics best practices
