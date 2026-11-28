---
layout: docs
title: "Writing Skills and Custom Agents"
difficulty: intermediate
time_estimate: "25 min"
---

# Writing Skills and Custom Agents

In Claude Code (and compatible harnesses), **skills** and **custom agents** live as plain Markdown files inside `.claude/` in your project repository — so your lab's conventions travel with the code rather than staying on one laptop.

## Skills vs. agents

They solve different problems:

- **A skill (`.claude/skills/<name>/SKILL.md`)** is a reusable procedure that the main agent loads when a task needs it (e.g. `figure-standards`, `reproducible-analysis`, `literature-triage`). It changes *how* the agent uses its existing tools.
- **A custom agent (`.claude/agents/<name>.md`)** is a separate remit with its **own context window** and a **narrow tool list**. Write an agent when you want a distinct point of view — a statistician, a reproducibility auditor, or a data-governance reviewer — not just more instructions.

```text
.claude/
├── skills/
│   └── figure-standards/
│       └── SKILL.md
└── agents/
    ├── adversarial-statistician.md
    └── reproducibility-auditor.md
```

Swap `.claude/` for `~/.claude/` if you want a skill or agent available across all projects on your machine.

---

## Writing a skill (`SKILL.md`)

Frontmatter must be the first thing in the file. `name` matches the folder name, and `description` says **when** to trigger the skill (not just what it contains):

```markdown
---
name: reproducible-analysis
description: Use when writing or reviewing analysis scripts, notebooks, or pipelines that produce a number or figure.
---

# Reproducible analysis

## Pin inputs and random seeds
Record the exact input file path and set an explicit random seed at the top of the script.
Without a fixed seed, rerunning the script produces different numbers and breaks verification.

## Separate data cleaning from plotting
Write cleaned summary tables to disk before plotting. This lets a reviewer inspect the numbers
without re-running the whole pipeline.

## Stop conditions
If required metadata (units, group labels, or sample counts) is missing from the input, stop
and ask rather than guessing.
```

---

## Writing an adversarial agent (`.claude/agents/*.md`)

An agent that agrees with you is not doing the job. Give it a stated position and the narrowest `tools:` list it needs — a reviewer that only reads should not be given `Write` or `Bash`:

```markdown
---
name: adversarial-statistician
description: Reviews an analysis, figure, or claim for statistical soundness from the position that it is probably wrong. Use before sharing results or submitting a manuscript.
tools: Read, Grep, Glob
---

You are a sceptical biostatistician. Read the analysis from the position that there is a hidden
confounder, an inappropriate test, or an unstated multiple-testing problem.

Work through, in order:

1. **Sample size and independence.** Are technical replicates being treated as biological replicates?
2. **Missing data and zeros.** How were `NA`/`null` values handled, and were genuine zeros preserved?
3. **Multiple testing and effect sizes.** Are p-values corrected, and are effect sizes and confidence intervals reported?

Report each finding with the file, line number, what is wrong, and what would fix it. If no
issues are found, state explicitly which checks you ran and found clean.
```

---

## Testing and sharing

1. Save the file in `.claude/skills/<name>/SKILL.md` or `.claude/agents/<name>.md`.
2. Start a fresh Claude Code session (or ask: *"List the skills and agents you have loaded from `.claude/`."*).
3. Commit `.claude/` to your Git repository so collaborators get the same skills and reviewers automatically.
