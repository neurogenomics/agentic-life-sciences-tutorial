---
name: explore-codebase
description: Systematically explore and understand any codebase structure, architecture, and key components. Use this skill when you need to understand a new codebase, find specific implementations, or map project dependencies.
version: 1.0.0
tags: [exploration, codebase, architecture, discovery]
---

# Explore Codebase Skill

This skill provides a systematic approach to exploring and understanding any codebase efficiently and comprehensively.

## When to Use This Skill

Use `explore-codebase` when:
- Starting work on a new codebase
- Looking for specific implementations without knowing exact locations
- Understanding project architecture and dependencies
- Finding examples of patterns or abstractions
- Tracing data flow or control flow
- Identifying configuration systems

## Exploration Strategy

### Phase 1: Project Structure Discovery

First, identify the **project type** and **root structure**:

```bash
# Check for common project files
ls -la
find . -maxdepth 2 -name "*.toml" -o -name "*.cfg" -o -name "*.ini" -o -name "requirements*.txt" -o -name "package.json" -o -name "Makefile" -o -name "README*" -o -name "AGENTS.md" | head -20
```

**Identify the project type:**
- **Python Package:** `pyproject.toml`, `setup.py`, `requirements.txt`
- **Node.js:** `package.json`, `package-lock.json`
- **Rust:** `Cargo.toml`
- **Go:** `go.mod`
- **Java:** `pom.xml`, `build.gradle`
- **ML/AI:** `model.py`, `train*.py`, `*.ipynb`, `configs/`

### Phase 2: Directory Structure Mapping

Map the key directories:

```
Root Level:
├── src/ or lib/ or <package_name>/    → Source code
├── tests/ or test/                     → Test files
├── examples/ or demos/                 → Usage examples
├── docs/                               → Documentation
├── scripts/                            → Utility scripts
├── configs/ or config/                 → Configuration
├── data/                               → Data files (if present)
└── notebooks/                          → Jupyter notebooks (ML projects)
```

**Special patterns for common frameworks:**

**Machine Learning Projects:**
- Look for: `model*.py`, `dataset*.py`, `train*.py`, `loss*.py`
- Config systems: `configs/`, `*.yaml`, `*.json`, hydra/omegaconf
- Data: `data/`, `datasets/`, `folds/`, `*.h5`, `*.tfrecord`

**Web Applications:**
- Frontend: `src/components/`, `src/pages/`, `public/`
- Backend: `routes/`, `controllers/`, `models/`, `views/`
- API: `api/`, `endpoints/`, `openapi.yaml`

**CLI Tools:**
- Entry points: `cli.py`, `main.py`, `__main__.py`, `bin/`
- Commands: `commands/`, `cmd/`

### Phase 3: Key Files Identification

**Always check these files first:**
1. `README.md` - Project overview and getting started
2. `AGENTS.md` - Agent-specific instructions (if exists)
3. `pyproject.toml` / `package.json` - Dependencies and metadata
4. `Makefile` or `tasks.py` - Common commands and workflows
5. `.gitignore` - Reveals tools and file types used

**Configuration discovery:**
```bash
# Find config files
grep -r "class.*Config\|@dataclass\|BaseSettings\|pydantic" --include="*.py" | head -10

# Find environment variables
grep -r "os.environ\|os.getenv" --include="*.py" | head -10
```

### Phase 4: Implementation Discovery

**Finding specific patterns:**

```bash
# Classes and functions
grep -rn "class\|def " --include="*.py" | head -30

# Inheritance hierarchies
grep -rn "class.*(" --include="*.py" | grep -E "\([A-Z]" | head -20

# Entry points
grep -rn "if __name__.*__main__\|def main(" --include="*.py"

# Model definitions (ML)
grep -rn "class.*Model\|nn.Module\|tf.keras\|sklearn" --include="*.py" | head -20

# Dataset classes
grep -rn "class.*Dataset\|torch.utils.data\|tf.data" --include="*.py" | head -10

# Loss functions
grep -rn "class.*Loss\|def.*loss\|nn\.[A-Z].*Loss" --include="*.py" | head -10
```

**Smart searching by concept:**
- **Training loop:** `trainer`, `train_epoch`, `fit`, `TrainingArguments`
- **Data loading:** `DataLoader`, `Collator`, `Preprocessor`, `Transform`
- **API endpoints:** `router`, `endpoint`, `@app.route`, `@router.get`
- **Database:** `Model`, `Table`, `migration`, `schema`

### Phase 5: Dependency Mapping

**External dependencies:**
- Check `requirements.txt`, `pyproject.toml`, `package.json`, `Cargo.toml`
- Identify key frameworks: Django, Flask, FastAPI, PyTorch, TensorFlow, etc.

**Internal dependencies:**
- Map import statements to understand module relationships
- Find shared utilities and common code
- Identify circular dependencies (if any)

## Common Codebase Patterns

### Machine Learning Projects

**Typical structure:**
```
project/
├── src/
│   ├── models/              # Model architectures
│   ├── datasets/            # Data loading and preprocessing
│   ├── losses/              # Loss functions
│   ├── metrics/             # Evaluation metrics
│   └── utils/               # Utility functions
├── configs/                 # Configuration files
├── scripts/                 # Training/inference scripts
├── notebooks/              # Exploratory notebooks
└── tests/                  # Unit tests
```

**Key files to find:**
- `model.py` or `models/*.py` - Model definitions
- `dataset.py` or `data.py` - Data loading
- `train.py` or `trainer.py` - Training logic
- `config.py` or `configs/*.yaml` - Configuration
- `loss.py` or `criterion.py` - Loss computation

**Exploration queries:**
```
# Find model architectures
rg "class.*Model\|class.*Net\|nn\.Sequential\|nn\.Module" --type py

# Find training entry points
rg "def train\|class.*Trainer\|TrainingArguments" --type py

# Find data loading
rg "class.*Dataset\|DataLoader\|__getitem__\|__len__" --type py

# Find loss functions
rg "class.*Loss\|nn\.[A-Z].*Loss\|def.*loss" --type py
```

### Web Applications

**Typical structure:**
```
project/
├── src/
│   ├── components/          # UI components
│   ├── pages/              # Page components
│   ├── api/                # API client
│   └── utils/              # Utilities
├── server/ or backend/     # Backend code
│   ├── routes/            # API routes
│   ├── models/            # Data models
│   └── controllers/       # Business logic
└── config/              # Configuration
```

**Exploration queries:**
```
# Find routes/endpoints
rg "@app\.\|@router\.\|@Get\|@Post" --type py --type ts --type js

# Find data models
rg "class.*Model\|interface\|type.*=" --type py --type ts

# Find API clients
rg "fetch\|axios\|requests\." --type ts --type js --type py
```

### CLI Tools

**Typical structure:**
```
project/
├── src/
│   ├── commands/           # CLI subcommands
│   ├── core/              # Core logic
│   └── utils/             # Utilities
├── cli.py or main.py     # Entry point
└── tests/                # Tests
```

**Exploration queries:**
```
# Find CLI commands
rg "argparse\|click\|typer\|@click\." --type py

# Find main entry point
rg "if __name__.*__main__\|def main(" --type py
```

## Exploration Checklist

When exploring a new codebase, systematically gather:

- [ ] **Project metadata**: Name, version, description, author
- [ ] **Tech stack**: Languages, frameworks, key dependencies
- [ ] **Entry points**: How to run the application/tests
- [ ] **Architecture**: High-level component relationships
- [ ] **Data flow**: How data moves through the system
- [ ] **Configuration**: How the system is configured
- [ ] **Testing**: Test structure and how to run them
- [ ] **Documentation**: README, docs/, inline comments
- [ ] **Key abstractions**: Domain-specific classes/functions
- [ ] **Examples**: How to use the codebase (examples/, tests/)

## Best Practices

**DO:**
- Read the README first
- Check for AGENTS.md or similar agent instructions
- Start with high-level structure before diving into details
- Use multiple search strategies (filename, content, patterns)
- Cross-reference between related files
- Check examples/ directory for usage patterns
- Look at tests to understand expected behavior
- Note naming conventions and code style

**DON'T:**
- Assume file locations without checking
- Ignore configuration files (they reveal architecture)
- Skip the examples/ directory
- Make changes before understanding the testing setup
- Overlook hidden files (., _, __ prefixed)

## Quick Start Template

```markdown
## Codebase Overview
- **Project Type**: [ML/Web/CLI/Library]
- **Language**: [Python/JS/Rust/etc.]
- **Framework**: [PyTorch/Django/React/etc.]
- **Entry Point**: [file or command]

## Key Components
- **Models**: [location and pattern]
- **Data**: [location and format]
- **Training**: [scripts/entry points]
- **Config**: [configuration system]

## Architecture Notes
- [Important architectural decisions]
- [Key abstractions]
- [Data flow patterns]

## Common Tasks
- Run training: [command]
- Run tests: [command]
- Configuration: [how to modify]

## Gotchas
- [Things to watch out for]
```

## Integration with Agent Workflow

When using this skill:
1. **Announce**: "I'm using the explore-codebase skill to understand this project"
2. **Be thorough**: Check all phases before making assumptions
3. **Document**: Create a summary of findings in conversation
4. **Ask**: Clarify ambiguous patterns with the user
5. **Iterate**: Re-explore if implementation doesn't match expectations

## Example Usage

**Scenario**: Starting work on an unfamiliar ML project

```
User: "Help me understand how to add a new loss function to this codebase"

Agent (using explore-codebase):
1. Phase 1: Python package, has pyproject.toml, ML project structure
2. Phase 2: Found src/ with models/, losses/, datasets/
3. Phase 3: README explains architecture, AGENTS.md has guidelines
4. Phase 4: Found losses/ directory with PoissonMultinomialLoss
5. Phase 5: Depends on torch, borzoi-pytorch package

Response: "I found the loss functions in src/losses/. Based on the existing 
PoissonMultinomialLoss pattern, here's how to add a new loss..."
```

---

**Remember**: The goal is to build a mental model of the codebase quickly and accurately, enabling you to make informed decisions and provide contextually appropriate suggestions.