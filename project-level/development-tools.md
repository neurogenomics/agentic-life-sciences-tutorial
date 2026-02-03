# Development Tools and Workflow

## Modern Python Package Setup

### Using pyproject.toml (PEP 621)

Modern Python projects use `pyproject.toml` as the single source of truth for package metadata and tool configuration. This is the industry standard since 2021.

```toml
# pyproject.toml
[build-system]
requires = ["setuptools>=61.0", "wheel"]
build-backend = "setuptools.build_meta"

[project]
name = "genomics-pipeline"
version = "0.1.0"
description = "Genomics analysis pipeline"
authors = [{name = "Your Name", email = "you@example.com"}]
license = {text = "MIT"}
readme = "README.md"
requires-python = ">=3.9"

dependencies = [
    "numpy>=1.24.0",
    "pandas>=2.0.0",
    "biopython>=1.81",
]

[project.optional-dependencies]
dev = [
    "pytest>=7.4.0",
    "pytest-cov>=4.1.0",
    "black>=23.0.0",
    "ruff>=0.1.0",
    "mypy>=1.5.0",
    "pre-commit>=3.4.0",
]

[project.scripts]
genomics-pipeline = "genomics_pipeline.cli:main"

# Tool configurations below
[tool.black]
line-length = 88
target-version = ["py39", "py310", "py311"]

[tool.ruff]
line-length = 88
target-version = "py39"
select = ["E", "F", "W", "I", "N", "UP", "B", "A", "C4", "DTZ", "T10", "ISC"]

[tool.mypy]
python_version = "3.9"
warn_return_any = true
warn_unused_configs = true
disallow_untyped_defs = true

[tool.pytest.ini_options]
testpaths = ["tests"]
addopts = [
    "--cov=src",
    "--cov-report=term-missing",
    "--cov-report=html",
    "--cov-fail-under=80",
    "-v"
]

[tool.coverage.run]
source = ["src"]
omit = ["*/tests/*", "*/venv/*"]

[tool.coverage.report]
exclude_lines = [
    "pragma: no cover",
    "def __repr__",
    "raise AssertionError",
    "raise NotImplementedError",
    "if __name__ == .__main__.:",
    "if TYPE_CHECKING:",
]
```

### Development Setup Script

```bash
#!/bin/bash
# setup-dev.sh - Automated development environment setup

set -euo pipefail

echo "Setting up development environment..."

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Upgrade pip
pip install --upgrade pip

# Install package in editable mode with dev dependencies
pip install -e ".[dev]"

# Install pre-commit hooks
pre-commit install

echo "Development environment ready!"
echo "Activate with: source venv/bin/activate"
```

## Code Quality Tools

### Black (Code Formatter)

```bash
# Format all Python files
black src/ tests/

# Check without modifying
black src/ tests/ --check

# Show what would change
black src/ tests/ --diff
```

Configuration in `pyproject.toml`:
```toml
[tool.black]
line-length = 88
target-version = ["py39", "py310", "py311"]
exclude = '''
/(
    \.git
  | \.venv
  | build
  | dist
)/
'''
```

### Ruff (Fast Linter)

```bash
# Lint and auto-fix
ruff check src/ tests/ --fix

# Check without fixing
ruff check src/ tests/

# Show errors with context
ruff check src/ tests/ --show-source
```

Configuration in `pyproject.toml`:
```toml
[tool.ruff]
line-length = 88
target-version = "py39"

# Enable pycodestyle (E, W), Pyflakes (F), isort (I), etc.
select = [
    "E",   # pycodestyle errors
    "W",   # pycodestyle warnings
    "F",   # Pyflakes
    "I",   # isort
    "N",   # pep8-naming
    "UP",  # pyupgrade
    "B",   # flake8-bugbear
    "A",   # flake8-builtins
    "C4",  # flake8-comprehensions
    "DTZ", # flake8-datetimez
    "T10", # flake8-debugger
    "ISC", # flake8-implicit-str-concat
]

ignore = [
    "E501",  # line too long (handled by black)
]

[tool.ruff.per-file-ignores]
"tests/*" = ["S101"]  # Allow assert in tests
```

### isort (Import Sorting)

```bash
# Sort imports
isort src/ tests/

# Check without modifying
isort src/ tests/ --check-only

# Show diff
isort src/ tests/ --diff
```

Configuration in `pyproject.toml`:
```toml
[tool.isort]
profile = "black"
line_length = 88
multi_line_output = 3
include_trailing_comma = true
force_grid_wrap = 0
use_parentheses = true
ensure_newline_before_comments = true
```

### Mypy (Type Checking)

```bash
# Type check entire project
mypy src/

# Type check specific file
mypy src/analysis.py

# Generate coverage report
mypy src/ --html-report mypy-report
```

Configuration in `pyproject.toml`:
```toml
[tool.mypy]
python_version = "3.9"
warn_return_any = true
warn_unused_configs = true
disallow_untyped_defs = true
disallow_any_unimported = false
no_implicit_optional = true
warn_redundant_casts = true
warn_unused_ignores = true
warn_no_return = true
check_untyped_defs = true
strict_equality = true

[[tool.mypy.overrides]]
module = "tests.*"
disallow_untyped_defs = false
```

## Pre-commit Hooks

### Configuration

```yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.5.0
    hooks:
      - id: trailing-whitespace
      - id: end-of-file-fixer
      - id: check-yaml
      - id: check-added-large-files
        args: ['--maxkb=1000']
      - id: check-json
      - id: check-toml
      - id: check-merge-conflict

  - repo: https://github.com/psf/black
    rev: 23.11.0
    hooks:
      - id: black
        language_version: python3.9

  - repo: https://github.com/charliermarsh/ruff-pre-commit
    rev: v0.1.6
    hooks:
      - id: ruff
        args: [--fix, --exit-non-zero-on-fix]

  - repo: https://github.com/pycqa/isort
    rev: 5.12.0
    hooks:
      - id: isort

  - repo: https://github.com/pre-commit/mirrors-mypy
    rev: v1.7.1
    hooks:
      - id: mypy
        additional_dependencies: [types-all]
```

### Usage

```bash
# Install hooks (one time)
pre-commit install

# Run manually on all files
pre-commit run --all-files

# Run specific hook
pre-commit run black --all-files

# Update hook versions
pre-commit autoupdate

# Skip hooks for a commit (use sparingly)
git commit --no-verify
```

## Testing with pytest

### Running Tests

```bash
# Run all tests
pytest tests/

# Run with coverage
pytest tests/ --cov=src --cov-report=term-missing

# Run specific test file
pytest tests/unit/test_analysis.py

# Run specific test
pytest tests/unit/test_analysis.py::test_gc_content

# Run tests matching pattern
pytest tests/ -k "test_validate"

# Run with verbose output
pytest tests/ -v -s

# Run only failed tests from last run
pytest tests/ --lf

# Stop on first failure
pytest tests/ -x

# Run in parallel (requires pytest-xdist)
pytest tests/ -n auto
```

### Coverage Reports

```bash
# Terminal report with missing lines
pytest tests/ --cov=src --cov-report=term-missing

# HTML report
pytest tests/ --cov=src --cov-report=html
# Opens in htmlcov/index.html

# XML report (for CI)
pytest tests/ --cov=src --cov-report=xml

# Fail if coverage below threshold
pytest tests/ --cov=src --cov-fail-under=80
```

## Complete Quality Check Workflow

### Single Command for All Checks

```bash
# Create a script: check_code.sh
#!/bin/bash
set -e

echo "Running code quality checks..."

echo "1. Formatting with black..."
black src/ tests/

echo "2. Sorting imports..."
isort src/ tests/

echo "3. Linting with ruff..."
ruff check src/ tests/ --fix

echo "4. Type checking with mypy..."
mypy src/

echo "5. Running tests with coverage..."
pytest tests/ --cov=src --cov-report=term-missing --cov-fail-under=80

echo "All checks passed!"
```

Make it executable:
```bash
chmod +x check_code.sh
./check_code.sh
```

### Makefile for Common Tasks

```makefile
.PHONY: install format lint typecheck test coverage clean

install:
	pip install -e ".[dev]"
	pre-commit install

format:
	black src/ tests/
	isort src/ tests/

lint:
	ruff check src/ tests/ --fix

typecheck:
	mypy src/

test:
	pytest tests/ -v

coverage:
	pytest tests/ --cov=src --cov-report=html --cov-report=term-missing

all: format lint typecheck test

clean:
	rm -rf build/ dist/ *.egg-info
	rm -rf .pytest_cache .mypy_cache .ruff_cache
	rm -rf htmlcov/ .coverage
	find . -type d -name __pycache__ -exec rm -rf {} +
```

Usage:
```bash
make install    # Setup dev environment
make format     # Format code
make lint       # Lint code
make typecheck  # Check types
make test       # Run tests
make coverage   # Generate coverage report
make all        # Run all quality checks
make clean      # Clean generated files
```

## Development Workflow

### Daily Development Cycle

```bash
# 1. Create feature branch
git checkout -b feature/new-analysis

# 2. Write code with type hints and docstrings
# (Edit files in src/)

# 3. Format and lint
black src/analysis.py
ruff check src/analysis.py --fix

# 4. Type check
mypy src/analysis.py

# 5. Write tests
# (Edit files in tests/)

# 6. Run tests
pytest tests/unit/test_analysis.py -v

# 7. Check coverage
pytest tests/unit/test_analysis.py --cov=src.analysis

# 8. Run all quality checks
./check_code.sh

# 9. Commit (pre-commit hooks run automatically)
git add src/analysis.py tests/unit/test_analysis.py
git commit -m "feat: add GC content analysis"

# 10. Push
git push origin feature/new-analysis
```

### Before Committing

Always run these checks:
```bash
# Quick checks
black src/ tests/ && ruff check src/ tests/ && mypy src/

# Full checks with tests
make all

# Or use pre-commit
pre-commit run --all-files
```

## CI/CD Configuration

### GitHub Actions

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  quality:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        python-version: ["3.9", "3.10", "3.11"]
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Python ${{ matrix.python-version }}
      uses: actions/setup-python@v4
      with:
        python-version: ${{ matrix.python-version }}
    
    - name: Cache dependencies
      uses: actions/cache@v3
      with:
        path: ~/.cache/pip
        key: ${{ runner.os }}-pip-${{ hashFiles('pyproject.toml') }}
    
    - name: Install dependencies
      run: |
        python -m pip install --upgrade pip
        pip install -e ".[dev]"
    
    - name: Check formatting
      run: |
        black src/ tests/ --check
        isort src/ tests/ --check-only
    
    - name: Lint
      run: ruff check src/ tests/
    
    - name: Type check
      run: mypy src/
    
    - name: Run tests
      run: |
        pytest tests/ \
          --cov=src \
          --cov-report=xml \
          --cov-report=term-missing \
          --cov-fail-under=80
    
    - name: Upload coverage
      uses: codecov/codecov-action@v3
      with:
        files: ./coverage.xml
        fail_ci_if_error: true
```

## Quick Reference

```bash
# Setup
python -m venv venv && source venv/bin/activate
pip install -e ".[dev]"
pre-commit install

# Quality checks
black src/ tests/                    # Format
ruff check src/ tests/ --fix         # Lint
isort src/ tests/                    # Sort imports
mypy src/                            # Type check

# Testing
pytest tests/ -v                     # Run tests
pytest tests/ --cov=src              # With coverage
pytest tests/ -k test_validate       # Match pattern
pytest tests/ --lf                   # Last failed

# Combined
make all                             # All quality checks
pre-commit run --all-files           # Run hooks
./check_code.sh                      # Custom script
```

## Troubleshooting

### Common Issues

```bash
# Import errors after installing
pip install -e ".[dev]"              # Reinstall editable

# Pre-commit failing
pre-commit clean                     # Clear cache
pre-commit install --install-hooks   # Reinstall

# Type errors in tests
# Add to pyproject.toml:
# [[tool.mypy.overrides]]
# module = "tests.*"
# disallow_untyped_defs = false

# Coverage not working
pytest --cov=src --cov-config=pyproject.toml

# Black and ruff conflict
# Ensure ruff uses Black profile in pyproject.toml
```
