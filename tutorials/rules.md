# Creating Your rules.md File

A rules.md file tells the AI how to work with your project. This tutorial shows you how to create one and use the automated setup.

## Quick Start: Use the Init Command

The fastest way to get started is letting the AI create your rules for you:

```bash
opencode init
```

This command:
1. Analyzes your project type (Python, R, web, etc.)
2. Creates a `.opencode/rules/` folder
3. Generates appropriate starter rules files
4. Sets up a tasks/todo.md template

## The 7-Step Workflow

Once you have your rules, follow this workflow for every task:

**1. Plan First**
- Think through the problem
- Read the codebase if needed
- Write a plan in `tasks/todo.md`

**2. Make it a Checklist**
```markdown
# Current Task

## Plan
- [ ] Step 1: Read the data loading code
- [ ] Step 2: Identify the bug in line 45
- [ ] Step 3: Write fix with test
- [ ] Step 4: Run tests to verify

## Notes
Bug appears when file has headers...
```

**3. Check In**
Show me the plan before starting. I'll verify it makes sense.

**4. Execute Step by Step**
Complete each todo item, marking them off as you go.

**5. Explain Changes**
At every step, give a high-level explanation of what changed.

**6. Keep it Simple**
Every change should be minimal. No big rewrites.

**7. Final Review**
Add a review section at the end of todo.md:
```markdown
## Review

Changes made:
- Fixed header parsing bug in load_data.py
- Added test case for header edge case
- Verified all existing tests pass
```

## Your rules.md Template

Here's a simple starter template. Put this in `.opencode/rules/rules.md`:

```markdown
# Project Rules

## Workflow

Always follow this 7-step process:

1. **Plan First**: Read codebase, write plan in tasks/todo.md
2. **Checklist**: Make the plan a checklist of todo items
3. **Check In**: Get approval before starting work
4. **Execute**: Complete todos one by one, marking them off
5. **Explain**: Give high-level explanation of each change
6. **Minimal**: Keep every change simple and small
7. **Review**: Add review section at end of todo.md

## Code Standards

- Follow existing code style in the project
- Write tests for new features
- Never commit secrets or API keys
- Keep functions small and focused

## Communication

- Be concise
- Ask clarifying questions when unsure
- Flag potential issues early
```

## Where to Put Rules

```
.opencode/
└── rules/
    └── rules.md          # Main rules file (required)
    └── coding-style.md   # Optional: detailed style guide
    └── security.md       # Optional: security requirements
```

## Tips

- **Start simple**: Use the template above, customize as you go
- **Version control**: Commit your rules with your project
- **Iterate**: Update rules when you find patterns that work
- **One project, one rules file**: Most projects only need `rules.md`

## Example Rules for Common Scenarios

**Data Science Projects:**
- Always validate input data shapes
- Save plots to `figures/` with descriptive names
- Never modify raw data files

**Web Development:**
- Test on mobile viewport sizes
- Validate all user inputs
- Use semantic HTML elements

**Research Code:**
- Document expected vs actual outputs
- Save intermediate results for reproducibility
- Comment complex algorithms

## Next Steps

1. Run `opencode init` in your project
2. Customize the generated `rules.md`
3. Create your first `tasks/todo.md`
4. Start using the 7-step workflow

See [EXAMPLE_RULES.md](../assets/EXAMPLE_RULES.md) for a complete, detailed example.
