---
layout: default
title: Rules & Guidelines
---

# Rules & Guidelines

Rules files help you customize AI behavior for your specific projects, coding standards, and workflows.

## What are Rules?

Rules are instruction files that tell the AI how to behave when working on your project. They can include:

- **Coding standards** (naming conventions, style guides)
- **Project-specific requirements** (file structure, dependencies)
- **Domain knowledge** (best practices for genomics, data analysis, etc.)
- **Workflow preferences** (testing requirements, commit message formats)
- **Security guidelines** (input validation, sensitive data handling)

## Where to Put Rules

Create a `.opencode/rules/` folder in your project or home directory:

```
.opencode/
├── rules/
│   ├── coding-standards.md
│   ├── project-guidelines.md
│   └── security-rules.md
```

## Example Rules File

Here is a complete example rules file for data science projects: [EXAMPLE_RULES.md](../assets/EXAMPLE_RULES.md)

You can also use this simplified template:

```markdown
# Project Rules for Neurogenomics Analysis

## Coding Standards

### Python
- Use PEP 8 style guide
- Maximum line length: 100 characters
- Use type hints for all function parameters and return values
- Docstrings required for all public functions (Google style)

### R
- Use tidyverse style guide
- Prefer %>% over |>
- Use meaningful variable names (snake_case)

## Project Structure

- Place analysis scripts in `scripts/`
- Place results in `results/` with date stamps
- Place raw data in `data/raw/` (never commit to git)
- Place processed data in `data/processed/`

## Testing Requirements

- All functions must have unit tests
- Minimum test coverage: 80%
- Use pytest for Python, testthat for R

## Dependencies

- Pin all dependency versions in `requirements.txt` or `renv.lock`
- Document installation steps in README

## Security

- Never hardcode API keys or passwords
- Use environment variables for secrets
- Validate all user inputs
- Sanitize file paths to prevent directory traversal

## Documentation

- Update README.md for each major feature
- Include examples in docstrings
- Document expected input/output formats
```

## Using Rules

1. Create your rules file(s) in `.opencode/rules/`
2. The AI will automatically read and follow these rules
3. You can reference specific rules in prompts: "Follow the testing standards in my rules file"

## Tips for Effective Rules

- Be specific and concrete
- Include examples where possible
- Keep rules concise (under 500 lines total is ideal)
- Update rules as your project evolves
- Separate different types of rules into different files

## Common Rule Categories

1. **Code Quality**: Linting, formatting, documentation
2. **Testing**: Coverage requirements, test frameworks
3. **Security**: Input validation, secrets management
4. **Project Structure**: File organization, naming conventions
5. **Domain-Specific**: Field-specific best practices

## Next Steps

Try creating a rules file for your project and see how it improves AI consistency!
