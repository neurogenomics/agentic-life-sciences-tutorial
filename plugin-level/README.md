# Plugin Level Skills

These skills are activated only when specific OpenCode plugins are enabled. They provide specialized genomics functionality and integrate with specific tools or frameworks.

## Installation

Copy these skills to your OpenCode plugin skills directory:
```bash
cp -r plugin-level/* ~/.opencode/plugins/skills/
```

Or for project-specific plugin skills:
```bash
mkdir -p .opencode/plugins/skills/
cp plugin-level/* .opencode/plugins/skills/
```

## Skills Included

- **bioconductor-integration.md** - Bioconductor package usage patterns
- **nextflow-patterns.md** - Nextflow workflow development
- **statistical-testing.md** - Statistical analysis for genomics
