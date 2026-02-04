# Spec-to-Code Agent - Development Context

## Project Overview

LLM-powered agentic coding system that converts markdown specifications into working software packages.

**Current Phase:** Implementation
<!-- possible values include Planning | Implementation | Testing | Documentation) -->

**Time Constraint:** ~4 hours. Prioritize code quality standards below.

**Key Documents:**
- `docs/ARCHITECTURE.md` - Technical design (READ FIRST)
- `docs/DECISIONS.md` - Design rationale
- `docs/IMPLEMENTATION_PLAN.md` - Plan that should be followed during implementation
- `docs/EXTENSIONS.md` - How the system could be extended in the future (but these items are not in scope)
- `EXERCISE.md` - Requirements

---

## Code Quality Standards (Non-Negotiable)
got
### 1. Documentation

**Required:**
- Type hints on all parameters/returns (Python 3.9+ syntax: `list[str]`, `dict[str, int]`)
- Docstrings (Google style): summary, args, returns, raises
- Module-level docstrings

```python
def validate_path(path: str, work_dir: str) -> str:
    """Validate path is within work directory.
    
    Args:
        path: Path to validate (relative or absolute)
        work_dir: Base working directory for sandboxing
        
    Returns:
        Absolute path if valid
        
    Raises:
        SecurityError: If path escapes work_dir
    """
```

### 2. Function Design

- **Single responsibility** - one clear purpose per function
- **Max 50 lines** - extract helpers if longer
- **Pure functions preferred** - minimize side effects
- **Naming**: verb_noun pattern (`parse_spec`, `validate_path`)

### 3. Error Handling

**Rules:**
- ❌ No bare `except:` or broad `except Exception:`
- ✅ Catch specific exceptions (`FileNotFoundError`, `ValueError`)
- ✅ Custom exceptions for domain errors
- ✅ Log with `logger.exception()` in except blocks
- ✅ Context in messages: what failed, why, how to fix

```python
try:
    content = read_spec(spec_path)
except FileNotFoundError as e:
    logger.exception(f"Spec not found: {spec_path}")
    raise SpecParseError(f"Cannot find: {spec_path}") from e
```

### 4. Logging

**Setup:** `logger = logging.getLogger(__name__)`

**Levels:** DEBUG (diagnostics) | INFO (operations) | WARNING (degraded) | ERROR (failures)

**Rules:**
- ❌ No `print()` statements
- ✅ Use `logger.exception()` in except blocks
- ✅ Include context (file names, IDs, operation)

### 5. Code Organization

**Imports (PEP 8):**
```python
# Standard library
import logging
from pathlib import Path

# Third-party
import anthropic

# Local
from src.config import MAX_ITERATIONS
```

**Naming:** `PascalCase` (classes) | `snake_case` (functions) | `UPPER_SNAKE` (constants) | `_private`

### 6. Security (Critical)

- ✅ Validate all input
- ✅ Sanitize paths: `os.path.abspath()` + boundary check
- ✅ Timeouts on subprocess/network calls
- ✅ File size limits before reading
- ✅ Context managers (`with`) for resources

### 7. Testing

**Requirements:**
- **Coverage target: ≥80%**
- Unit tests (all tools + edge cases)
- Integration tests (mocked LLM)
- Security tests (path validation, command execution)

**Structure (Arrange-Act-Assert):**
```python
def test_validate_path_when_outside_workdir_then_raises():
    """Test validate_path rejects paths outside work_dir."""
    # Arrange
    work_dir, malicious_path = "/safe", "/safe/../etc/passwd"
    # Act & Assert
    with pytest.raises(SecurityError):
        validate_path(malicious_path, work_dir)
```

---

## Code Quality Tools (Required)

**Pre-commit (auto-run on commit):**
```bash
# Install once
pip install pre-commit
pre-commit install

# Manual run
pre-commit run --all-files
```

**Formatting & Linting:**
```bash
black src/ tests/        # Auto-format (required)
ruff check src/ tests/   # Linting (fix issues)
isort src/ tests/        # Sort imports
mypy src/                # Type checking (required)
```

**Testing:**
```bash
pytest tests/ --cov=src --cov-report=term-missing --cov-fail-under=80
```

---

## Anti-Patterns (Forbidden)

- ❌ Bare `except:` blocks
- ❌ Print statements
- ❌ Magic numbers (use config)
- ❌ Hard-coded paths
- ❌ Mutable default arguments (`def func(items=[]):`)
- ❌ Global state

---

## Development Workflow

**Per module:**
1. Write implementation with type hints + docstrings
2. Run: `black`, `ruff`, `isort`, `mypy`
3. Write tests (target ≥80% coverage)
4. Run: `pytest --cov`
5. Update `docs/DECISIONS.md` (key decisions only)

---

## Package Setup (Modern Standard)

**Uses `pyproject.toml` (PEP 621) - industry standard since 2021:**
```bash
# Development setup (run once)
./setup-dev.sh  # Automated setup

# Manual setup
python -m venv venv
source venv/bin/activate
pip install -e ".[dev]"      # Editable install with dev dependencies
pre-commit install           # Install git hooks
```

**Why pyproject.toml?**
- ✅ Single source of truth (metadata + tool configs)
- ✅ Declarative (not executable code)
- ✅ Industry standard (Google, Meta, FastAPI, Pydantic)
- ✅ Required by modern tools (Poetry, PDM, Ruff)

---

## Quick Reference Commands

```bash
# Quality checks (run before committing)
black src/ tests/ && ruff check src/ tests/ && isort src/ tests/ && mypy src/

# Testing
pytest tests/ --cov=src --cov-report=term-missing --cov-fail-under=80  # Full
pytest tests/unit/test_tools.py -v                                      # Specific file
pytest tests/ -v -s                                                     # Verbose

# Run agent (after pip install -e .)
spec-agent examples/spec.md work_dir/          # Installed command
python -m src.agent examples/spec.md work_dir/ # Module mode
```

---
