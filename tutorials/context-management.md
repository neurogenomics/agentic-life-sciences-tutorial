---
layout: default
title: Managing Context, Reducing Hallucinations and Run Costs
---

# Managing Context: Reducing Hallucinations and Run Costs

Long sessions fill the context window, burying your instructions under noise. The model forgets your conventions, hallucinates file contents, and every reply costs more.

---

## What is Context?

Every message re-sends the **entire conversation** to the API — your rules, all previous messages, every tool output. This bundle is the **context window**, measured in tokens (~0.75 words each). All Claude models support 200,000 tokens (~1,500 pages).

**What fills it:**
- System prompt / CLAUDE.md — fixed overhead every session
- Chat history — grows ~1k tokens per turn
- File reads — one 500-line file ≈ 3k tokens
- Bash/test output — a single stack trace ≈ 5k–20k tokens ← *silent killer*
- Web search results — 5k–10k per search

---

## Context Rot and Cost

**Context rot** happens past ~70%: early instructions get buried, the model attends to recent noise over old rules, hallucinations increase.

**Cost** scales linearly — every message re-sends the full window. 50 messages at 150k tokens on Sonnet = **$22.50 in input costs alone**.

![Cost per message vs context size](../assets/images/context-cost-per-message.png)

| Model | $/MTok input | Context window | @ 50k | @ 150k | @ max |
|---|---|---|---|---|---|
| GPT-4o mini | $0.15 | 128k | $0.01 | $0.02 | $0.02 |
| **Kimi K2.5 ★** | **$0.60** | **256k** | **$0.03** | **$0.09** | **$0.15** |
| Claude Haiku 4.5 | $1.00 | 200k | $0.05 | $0.15 | $0.20 |
| Gemini 1.5 Pro | $1.25 | 2M | $0.06 | $0.19 | $2.50 |
| GPT-4o | $2.50 | 128k | $0.13 | $0.38 | $0.32 |
| Claude Sonnet 4.6 | $3.00 | 200k | $0.15 | $0.45 | $0.60 |
| Claude Opus 4.6 | $5.00 | 200k | $0.25 | $0.75 | $1.00 |

★ Kimi K2.5 is the model used in this course (via OpenRouter). Even so, 50 messages × 150k tokens = **$4.50**. Context management is a billing issue, not just a quality issue.

For up-to-date pricing and context window specs across all models, see [models.dev](https://models.dev/).

**Check your context at any time** with `/context`. Here's real output from the session used to write this tutorial (reading files, running web searches, generating charts):

```
❯ /context

  Context Usage
  claude-sonnet-4-6 · 56k/200k tokens (28%)

  Estimated usage by category
  System prompt:   3.5k tokens  (1.7%)
  System tools:     21k tokens (10.5%)
  MCP tools:       4.7k tokens  (2.3%)
  Skills:           <1k tokens  (0.0%)
  Messages:        28.2k tokens (14.1%)
  Compact buffer:    3k tokens  (1.5%)
  ─────────────────────────────────────
  Free space:       140k tokens (69.8%)
```

A few things stand out here: **system tools (10.5%)** — Claude Code's built-in tool definitions are re-sent every message even when unused. **MCP tools** add another 2.3% just for being registered, regardless of use. Both are fixed overhead you can't compress away — only `/compact` or a fresh session resets them.

---

## The Solution: `/compact`

Type `/compact` in Claude Code at any time. It summarises the entire conversation into a structured digest (~5k tokens) and discards the raw history — typically a **97% reduction**.

Run it after completing a task, before starting something new, or when context hits ~50%.

> **Auto-compact warning:** The automatic trigger at 80% only saves titles and brief excerpts — not full content. Don't rely on it. Use `/compact` manually and use PLAN.md (below) for real continuity.

---

## PLAN.md — Your Session Handoff File

The real fix for context rot is keeping durable state in **files, not history**. One file — `PLAN.md` — updated every session, is all you need.

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

**At the end of every session:**
```
Update PLAN.md — mark completed tasks, update progress %, write next actions.
```

**To start the next session:**
```
Claude, continue with PLAN.md
```

Claude reads the file, picks up exactly where you left off, no recap needed. Keep **one** PLAN.md — never plan-v2.md, plan-final.md, etc.

| File | Purpose | Loads |
|---|---|---|
| `CLAUDE.md` | Permanent style & conventions | Automatically, every session |
| `PLAN.md` | Current project progress | On demand: "continue with PLAN.md" |
| `memory/decisions.md` | Why choices were made | When you need the history |

---

## Atomic Tasks and the Ralph Loop

The core idea behind good context management is keeping tasks **atomic** — each completable in one session with a clean context. State lives in files, not history.

**GSD workflow:**
```
Spec → Roadmap → Atomic Tasks → Fresh Session → Implement → Verify → Done
                                     ↑ loop if fails ↑
```

| Size | Example | Risk |
|---|---|---|
| Too large | "Build the analysis pipeline" | Guaranteed rot |
| Good | "Write the DESeq2 wrapper with tests" | Low |
| Good | "Fix the NA bug in normalise_counts()" | Very low |

If you can't describe "done" in two sentences, split the task.

---

## The Ralph Loop

The **Ralph Loop** (coined by [Geoffrey Huntley](https://ghuntley.com/ralph/)) automates atomic task execution: each iteration spawns a fresh context, reads its task from a file, does the work, then exits. A reviewer checks the output and either ships it or writes feedback for the next iteration. Failed attempts never pollute the context.

> *"Cost of a $50k USD contract, delivered, MVP, tested + reviewed: $297 USD."* — Geoffrey Huntley

The simplest version is one line:

```bash
while :; do cat PROMPT.md | claude --dangerously-skip-permissions; done
```

In practice you want checkpoints and a completion signal. Here are two scripts from [aihero.dev](https://www.aihero.dev/getting-started-with-ralph):

**`ralph-once.sh`** — one task, human reviews before next:
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

**`afk-ralph.sh`** — fully autonomous, loops until done:
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

**How it works:**
1. `PRD.md` holds your full spec — what to build and why
2. `progress.txt` tracks what's done — Claude updates it after each task
3. Each loop iteration has a **clean context window** — no accumulated rot
4. The reviewer (you, or a second model) checks output before the next loop

**Further reading:**
- [ghuntley.com/ralph](https://ghuntley.com/ralph/) — the original technique
- [Getting started with Ralph — aihero.dev](https://www.aihero.dev/getting-started-with-ralph)
- [Video walkthrough](https://www.youtube.com/watch?v=_IK18goX4X8)

---

## Advanced Techniques

**Prompt caching** — when running automated loops, your CLAUDE.md is re-processed every iteration. Add `cache_control` to cache it at 10% of normal price:

```python
system=[{"type": "text", "text": "...CLAUDE.md...", "cache_control": {"type": "ephemeral"}}]
```

**Token budgeting** — tell the agent exactly what to return:
```
Read only the normalise_counts function — not the whole file
Summarise test output in 10 lines, failures only
```

**Multi-agent parallelism** — split independent tasks across separate agents, each with a clean context window. They write results to shared files; a coordinator synthesises.

**Automated hooks** — key hooks for context management:

| Hook | Use |
|---|---|
| `SessionStart` (matcher: `compact`) | Re-inject `PLAN.md` after auto-compact |
| `PreCompact` | Write state to memory files before compaction |
| `Stop` | Check task completion, keep looping if not done |

---

## Summary

| Concept | What to do |
|---|---|
| Context rot | `/compact` before hitting 70%, not after |
| Session handoff | Keep `PLAN.md` updated — "continue with PLAN.md" |
| Task sizing | One task per session, describable in two sentences |
| Cost | 50 messages × 150k tokens = $4.50 (Kimi) to $22.50 (Sonnet) |
| Automation | Prompt caching + hooks for repeated agentic loops |

---

## Further Reading

- [GSD + BMAD overview](https://pasqualepillitteri.it/en/news/158/framework-ai-spec-driven-development-guide-bmad-gsd-ralph-loop)
- [Ralph Loop — Goose docs](https://block.github.io/goose/docs/tutorials/ralph-loop/)
- [Anthropic: Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents)
