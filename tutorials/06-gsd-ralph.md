---
layout: docs
title: GSD and the Ralph Loop
difficulty: advanced
time_estimate: "25 min"
---

# GSD and the Ralph Loop

The root cause of context rot isn't long sessions — it's keeping state in conversation history instead of files. Once your decisions, progress, and task definitions live in files that Claude reads fresh each time, context management becomes trivial.

---

## PLAN.md — Your Session Handoff File

One file — `PLAN.md` — updated every session, gives Claude everything it needs to pick up where you left off with no recap.

**In your first session, ask Claude to create:**

```markdown
# PLAN.md

## Goal
[What you are building and why — one paragraph]

## Key Decisions
[Tech stack, design choices, constraints]

## Stages
### Stage 1 — ✅ Complete
- [x] Task A

### Stage 2 — 🔄 In Progress
- [x] Task B
- [ ] Task C

## Progress: 40%

## Next Actions
1. First next step
2. Second next step

## Session Notes
[Date] — [What was decided]
```

**End of every session:**
```
Update PLAN.md — mark completed tasks, update progress %, write next actions.
```

**Start of next session:**
```
Claude, continue with PLAN.md
```

Claude reads the file, picks up exactly where you left off. Keep **one** PLAN.md — never plan-v2.md, plan-final.md, etc.

| File | Purpose | Loads |
|---|---|---|
| `CLAUDE.md` | Permanent style & conventions | Automatically, every session |
| `PLAN.md` | Current project progress | On demand: "continue with PLAN.md" |
| `memory/decisions.md` | Why choices were made | When you need the history |

---

## Atomic Tasks: GSD

**GSD (Get Shit Done)** makes the file-based approach systematic: every task must be atomic — completable in a single fresh session.

```
Spec → Roadmap → Atomic Tasks → Fresh Session → Implement → Verify → Done
                                     ↑ loop if fails ↑
```

Each session reads `PLAN.md`, does one thing, writes back, and exits clean. The next session finds exactly where things stand.

| Size | Example | Risk |
|---|---|---|
| Too large | "Build the analysis pipeline" | Guaranteed context rot |
| Good | "Write the DESeq2 wrapper with tests" | Low |
| Good | "Fix the NA bug in normalise_counts()" | Very low |

If you can't describe "done" in two sentences, split the task.

---

## The Ralph Loop

The **Ralph Loop** (coined by [Geoffrey Huntley](https://ghuntley.com/ralph/)) automates GSD entirely: each iteration spawns a fresh context, reads its task from a file, implements it, commits, updates progress, and exits. A reviewer checks the output and either ships it or writes feedback for the next iteration. Failed attempts never pollute the context.

> *"Cost of a $50k USD contract, delivered, MVP, tested + reviewed: $297 USD."* — Geoffrey Huntley

**When to use it:**
- **Overnight runs** — set a task list before you sleep, review finished commits in the morning
- **Repetitive operations** — running the same analysis on 20 datasets, reformatting 50 files, migrating a codebase from one API to another
- **Long multi-step projects** — building a pipeline stage by stage where each stage needs its own focused context
- **Quality loops** — have one Claude implement, a second review and write feedback, repeat until it passes
- **Anything where you'd otherwise babysit a long session** — if you find yourself watching Claude work and not doing anything, that's a Ralph job

The key difference from just running a long session: every iteration starts fresh with no accumulated history, no recency bias from earlier failed attempts, and no cost from re-sending a bloated context. The work accumulates in files and git; the context stays clean.

The simplest version is one line:

```bash
while :; do cat PROMPT.md | claude --dangerously-skip-permissions; done
```

In practice you want a progress file and a completion signal.

**`ralph-once.sh`** — one task at a time, you review before the next run:

```bash
#!/bin/bash
claude --permission-mode acceptEdits \
  "@PRD.md @progress.txt
  1. Read the PRD and progress file.
  2. Find the next incomplete task and implement it.
  3. Commit your changes.
  4. Update progress.txt with what you did.
  ONLY DO ONE TASK AT A TIME."
```

**`afk-ralph.sh`** — fully autonomous, loops until complete:

```bash
#!/bin/bash
MAX_ITERATIONS=${1:-10}
for i in $(seq 1 $MAX_ITERATIONS); do
  echo "=== Iteration $i ==="
  output=$(claude --dangerously-skip-permissions \
    "@PRD.md @progress.txt
    Find the next incomplete task, implement it, commit, and update progress.txt.
    When ALL tasks are complete, output exactly: <promise>COMPLETE</promise>
    ONLY DO ONE TASK AT A TIME.")
  if echo "$output" | grep -q "<promise>COMPLETE</promise>"; then
    echo "All tasks complete."
    break
  fi
done
```

**How the files work:**
- **`PRD.md`** — your full spec: what to build, acceptance criteria, constraints. This is the Ralph equivalent of `PLAN.md`.
- **`progress.txt`** — running log of completed tasks; Claude updates it after each iteration, giving you a full audit trail
- Each loop starts with a **clean context window** — no accumulated rot, no recency bias from earlier failed attempts

`--dangerously-skip-permissions` in an isolated repo lets Claude commit and move on without pausing for approvals. Scope it with `--allowedTools "Edit,Bash(git commit *)"` if you want tighter control.

---

## Further Reading

- [ghuntley.com/ralph](https://ghuntley.com/ralph/) — the original technique
- [Getting started with Ralph — aihero.dev](https://www.aihero.dev/getting-started-with-ralph)
- [Video walkthrough](https://www.youtube.com/watch?v=_IK18goX4X8)
- [Ralph Loop — Goose docs](https://block.github.io/goose/docs/tutorials/ralph-loop/)
- [GSD + BMAD overview](https://pasqualepillitteri.it/en/news/158/framework-ai-spec-driven-development-guide-bmad-gsd-ralph-loop)
