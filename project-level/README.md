# Project Level Skills

These skills are specific to individual genomics projects and should be placed in the project's `.opencode/skills/` directory. They define project-specific conventions, data structures, and analysis patterns.

## Installation

Copy these skills to your project's OpenCode skills directory:
```bash
mkdir -p .opencode/skills/
cp project-level/* .opencode/skills/
```

Or create symbolic links:
```bash
mkdir -p .opencode/skills/
ln -s $(pwd)/project-level/* .opencode/skills/
```

## Skills Included

### Project Structure & Workflow
- **project-structure.md** - Standard genomics project organization
- **analysis-workflow.md** - Standard analysis pipeline steps
- **development-tools.md** - Development environment setup and quality tools

### Data & Validation
- **data-validation.md** - Project-specific data validation rules
