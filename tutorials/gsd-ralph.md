---
layout: default
title: GSD and the Ralph Loop
---

# GSD and the Ralph Loop

Manual sessions accumulate history, decisions get buried, and eventually you're spending more time managing the AI than building. GSD and the Ralph Loop solve this by treating each task as a self-contained unit with state living in files, not conversation history.

---

## Atomic Tasks: GSD

**GSD (Get Shit Done)** is a workflow discipline built around one rule: every task must be atomic — completable in a single fresh session.

```
Spec → Roadmap → Atomic Tasks → Fresh Session → Implement → Verify → Done
                                     ↑ loop if fails ↑
```

State lives in files (`PLAN.md`, `progress.txt`), not history. Each session reads the files, does one thing, writes back, and exits clean.

| Size | Example | Risk |
|---|---|---|
| Too large | "Build the analysis pipeline" | Guaranteed context rot |
| Good | "Write the DESeq2 wrapper with tests" | Low |
| Good | "Fix the NA bug in normalise_counts()" | Very low |

If you can't describe "done" in two sentences, split the task.

---

## The Ralph Loop

The **Ralph Loop** (coined by [Geoffrey Huntley](https://ghuntley.com/ralph/)) automates GSD: each iteration spawns a fresh context, reads its task from a file, does the work, commits, and exits. A reviewer checks the output and either ships it or writes feedback for the next iteration. Failed attempts never pollute the context.

> *"Cost of a $50k USD contract, delivered, MVP, tested + reviewed: $297 USD."* — Geoffrey Huntley

The simplest version is one line:

```bash
while :; do cat PROMPT.md | claude --dangerously-skip-permissions; done
```

In practice you want checkpoints and a completion signal.

---

## Scripts

**`ralph-once.sh`** — one task at a time, human reviews before the next run:

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

---

## How it works

1. **`PRD.md`** — your full spec: what to build, acceptance criteria, constraints
2. **`progress.txt`** — running log of completed tasks; Claude updates it after each iteration
3. Each loop starts with a **clean context window** — no accumulated rot
4. The reviewer (you, or a second model) checks output before triggering the next loop

The key insight is that `--dangerously-skip-permissions` in an isolated repo lets Claude commit and move on without pausing for approvals, while `progress.txt` gives you a full audit trail.

---

## Further Reading

- [ghuntley.com/ralph](https://ghuntley.com/ralph/) — the original technique
- [Getting started with Ralph — aihero.dev](https://www.aihero.dev/getting-started-with-ralph)
- [Video walkthrough](https://www.youtube.com/watch?v=_IK18goX4X8)
- [Ralph Loop — Goose docs](https://block.github.io/goose/docs/tutorials/ralph-loop/)
- [GSD + BMAD overview](https://pasqualepillitteri.it/en/news/158/framework-ai-spec-driven-development-guide-bmad-gsd-ralph-loop)
