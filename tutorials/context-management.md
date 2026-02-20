---
layout: default
title: Managing Context, Reducing Hallucinations and Run Costs
---

# Managing Context: Reducing Hallucinations and Run Costs

Long AI coding sessions feel productive — until the model starts hallucinating file contents, forgetting earlier instructions, or quietly ignoring your coding style. This tutorial explains why that happens and how to prevent it.

---

## What is Context?

Every time you send a message to an LLM, the model does not remember previous conversations. Instead, everything the model can "see" in that moment is bundled together into a single **context window** — a fixed-size block of text measured in **tokens**.

A token is roughly 0.75 words. A typical paragraph is ~100 tokens; a 500-line Python file is ~3,000 tokens.

The context window contains:

- **System prompt** — your CLAUDE.md, rules files, and agent persona definitions
- **Conversation history** — every message you've sent and every reply received
- **Tool call results** — output from file reads, bash commands, web searches, test runs
- **Injected code** — files the agent reads or writes during the session

Think of it as a **whiteboard** that gets fuller with every message. The model can only work with what's on the whiteboard — and crucially, the entire whiteboard is re-sent to the API with every single message.

---

## How Context is Managed in LLMs and Agents

### Context window sizes

Current Claude models all support 200,000-token context windows:

| Model | Context Window | Approx. pages of text |
|---|---|---|
| claude-haiku-4-5 | 200,000 tokens | ~1,500 pages |
| claude-sonnet-4-6 | 200,000 tokens | ~1,500 pages |
| claude-opus-4-6 | 200,000 tokens | ~1,500 pages |

200k tokens sounds enormous, but a busy coding session fills it faster than you'd expect. A single long bash output, a pasted CSV, or a sequence of file reads can consume tens of thousands of tokens.

### Claude Code's context breakdown

Each component of your session occupies a slice of the 200k-token window. Here is how a typical long session fills up:

```
Context window (200,000 tokens = 100%)
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  FRESH SESSION (~5k tokens, 2.5%)                                   │
│  ░░░                                                                │
│  [System/CLAUDE.md ~4k][msg ~0.5k]                                  │
│                                                                     │
│  AFTER 1 HOUR (~80k tokens, 40%)                                    │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░                          │
│  [System ~4k][Chat ~40k][File reads ~20k][Bash ~15k]                │
│                                                                     │
│  LONG SESSION (~140k tokens, 70%)  ← quality degrades here         │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│  [System ~4k][Chat ~60k][File reads ~40k][Bash ~25k][Search ~10k]  │
│                                                                     │
│  AUTO-COMPACT TRIGGERS (~160k tokens, 80%)                          │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
│                                                                     │
│  REMAINING HEADROOM                                                 │
│  ░░░░░░░░░░░░░░░░░░░░░                                             │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

Legend:
  [System/CLAUDE.md]  Fixed overhead, loads every session     ~2k–10k tokens
  [Chat history]      Every message + every reply             grows ~1k/turn
  [File reads]        Each 500-line file ≈ 3k tokens          compounds fast
  [Bash/test output]  A single stack trace ≈ 5k–20k tokens   silent killer
  [Web search]        Each search result set ≈ 5k–10k tokens
```

### Every message re-sends the entire context

LLMs are **stateless** — there is no persistent memory between API calls. Claude Code works around this by re-sending the entire conversation history with every message. That means:

- **Cost scales with context size**, not just your new message
- A 100k-token context costs the same to send whether you typed 5 words or 500
- The longer your session, the more expensive each individual reply becomes

---

## What is Context Rot?

**Context rot** is the gradual degradation of model behaviour as the context window fills up.

### Why it happens

Transformer-based LLMs attend to tokens across the entire context, but attention is not uniform. As context grows:

- Early instructions ("always use tidyverse style") get buried under hundreds of subsequent messages
- The model's attention shifts toward recent, high-volume content (e.g., the last big test failure output)
- Important constraints and preferences become statistically less influential

### Symptoms to watch for

| Symptom | What it looks like |
|---|---|
| Forgetting instructions | Uses `pandas` after you said "R only", ignores naming conventions |
| Hallucinating file contents | Describes code that doesn't exist, or references stale versions of edited files |
| Regression in style | Stops following patterns it was applying correctly earlier in the session |
| Confused state | Refers to a task as "in progress" that you completed 20 messages ago |
| Verbose, circular answers | Repeats context back at you instead of acting |

### What fills context fastest

Tool outputs are the silent killer. A single `bash` command running tests can dump 5,000–20,000 tokens of stack traces into the context. Grep results, file reads, and search outputs compound quickly.

---

## Why It Matters: Hallucinations and Cost

### Hallucination risk

As signal-to-noise ratio drops, hallucination risk rises. The model is trying to synthesise an answer from an increasingly cluttered whiteboard. When key facts (file structure, current state, your constraints) are diluted by thousands of tokens of incidental tool output, the model fills gaps with plausible-sounding but incorrect information.

### Cost

API pricing is based on **input tokens** — the full context window — re-sent with every message. The larger the context, the more every single reply costs.

```
Cost per message ($) vs context size — input tokens only, per API

$2.00 ┤
      │
$1.50 ┤                                                    ╭── Opus 4.6  ($5/MTok)
      │                                                  ╭─╯
$1.00 ┤                                              ╭───╯
      │                                          ╭───╯
$0.75 ┤                                      ╭───╯
      │                                  ╭───╯
$0.50 ┤                          ╭───────╯·················· Sonnet 4.6 ($3/MTok)
      │                      ╭───╯ ╭─────────────────────── GPT-4o     ($2.5/MTok)
$0.25 ┤              ╭───────╯─────╯
      │       ╭──────╯╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌ Gemini 1.5 Pro ($1.25/MTok)
$0.10 ┤  ╭────╯- - - - - - - - - - - - - - - - - - - - - - Haiku 4.5  ($1/MTok)
      │──╯
$0.00 ┼──────────┬──────────┬──────────┬──────────┬─────────
     0k         50k       100k       150k       200k
                        Input tokens (context size)

  Model              Price/MTok   Cost @ 50k    Cost @ 150k   Cost @ 200k
  ─────────────────────────────────────────────────────────────────────────
  claude-haiku-4-5     $1.00        $0.05         $0.15         $0.20
  gemini-1.5-pro       $1.25        $0.06         $0.19         $0.25
  gpt-4o               $2.50        $0.13         $0.38         $0.50
  claude-sonnet-4-6    $3.00        $0.15         $0.45         $0.60
  claude-opus-4-6      $5.00        $0.25         $0.75         $1.00
  gpt-4o (mini)        $0.15        $0.01         $0.02         $0.03
```

In a long session with 50 messages at 150k tokens on Sonnet 4.6, that is **$22.50 in input costs alone** — before a single line of output. The same session on Opus would cost **$37.50**.

This is why context management is a billing issue, not just a quality issue.

---

## The Solution: `/compact`

Claude Code's `/compact` command collapses the entire conversation history into a concise structured summary, then replaces the full history with that summary.

### What `/compact` does

1. Asks the model to write a digest of: what was accomplished, key decisions made, current file states, and what remains to do
2. Replaces all conversation history with that digest
3. Preserves the system prompt (CLAUDE.md, rules) — those stay loaded

The result is a fresh, low-token starting point that retains all important state.

### A word of caution: auto-compact has real limits

Auto-compact (the automatic version that triggers at ~80% context usage) is tempting to rely on, but it has a critical weakness: **it only saves conversation titles and brief excerpts, not the full content of what happened**. Even if it did save everything, dumping a raw transcript back into the next session would just recreate the same noisy context you were trying to escape.

This is why the planning document approach in the next section is more reliable than auto-compact alone. Auto-compact is a safety net for when the window fills unexpectedly — not a substitute for deliberate session handoffs.

### Real example

Here is a real session before and after running `/compact`:

**Before compact** — 164,495 tokens, 25% of the context window used:

![Before compact](../assets/images/context-before-compact.png)

**After compact** — 5,228 tokens, 2% of the context window used:

![After compact](../assets/images/context-after-compact.png)

A **97% reduction** in context size. The model now has a clean whiteboard with a crisp summary of everything that happened, rather than 160,000 tokens of raw conversation history.

### How to run it

```
/compact
```

Type `/compact` in the Claude Code chat at any time. Claude Code will summarise the session and reset the context.

### When to run `/compact`

- After completing a self-contained task (a feature, a bug fix, a refactor)
- Before starting something unrelated to the current thread
- When you notice the model forgetting earlier instructions or style conventions
- When the context usage indicator climbs above ~50%
- Before any expensive multi-step operation (so you start with a clean, cheap context)

Claude Code also triggers **auto-compact** automatically when context usage approaches ~80% of the window limit.

---

## Best Practices: Keeping Context Lean

**Be selective with file reads.** Instead of reading entire files, use targeted reads with line ranges. Ask Claude Code to read only the function you need, not the whole module.

**Keep CLAUDE.md concise.** Your rules and memory files load into every session. A 5,000-token CLAUDE.md is 5,000 tokens of overhead on every single message. Keep it focused on stable patterns, not session-specific notes.

**Start new sessions for unrelated tasks.** There is no benefit to continuing a 50-turn data analysis session when you pivot to writing documentation. Open a new Claude Code session — clean context, no cost.

**Use Plan mode for exploration.** Plan mode contains exploratory searches and file reads within a structured planning phase. Approving a plan and moving to implementation gives you a clean handoff point where `/compact` is especially effective.

**Watch your context indicator.** Claude Code shows context usage in the UI. Make `/compact` a habit before it climbs past 40–50% rather than waiting until you notice problems.

**Use the right model for the right job.** Claude excels at programming, logic, and structured implementation — it has seen substantial improvement in code quality and reasoning. For creative and visual work (UI design, slide layouts, figure aesthetics, writing that needs flair), ChatGPT tends to produce better output. A practical split: have ChatGPT design visual instructions and creative specs, then hand those specs to Claude to implement them. Don't expect one model to be best at everything.

**Back up before any major restructuring.** Before asking Claude to do a large refactor, reorganise a project, or make sweeping changes to multiple files — run a git commit or copy the project directory. Claude is capable but not infallible, and a restructuring that goes wrong mid-session can be difficult to unwind without a clean restore point. This is especially important before running automated loops (GSD, Ralph) where the agent will make many changes without pausing for approval.

---

## Planning Documents as Persistent Context

The fundamental problem with context rot is that valuable information — your project goals, decisions, current state — lives inside the conversation history, which is volatile, expensive, and degrading.

The fix is to **move durable information out of the conversation and into files on disk**.

### The idea

An LLM session is ephemeral. A markdown file is permanent. Instead of relying on the model to remember what you decided three sessions ago, write it down in a structured file and load it fresh each session.

```
Without planning docs (fragile)
  Session 1 → decisions in chat history → /compact → summarised → lost detail
  Session 2 → "what were we doing again?" → starts from vague summary

With planning docs (robust)
  Session 1 → decisions written to PLAN.md → session ends
  Session 2 → "Claude, continue with PLAN.md" → full context from file, zero tokens wasted on history
```

### The PLAN.md workflow

The most practical approach is a **single living document** — `PLAN.md` — that Claude updates at the end of every session. One file, always current, always the entry point for a new session.

In your first session, ask Claude to create `PLAN.md` with this structure:

```markdown
# PLAN.md

## Project Goal
[One paragraph: what you are building and why]

## Architecture / Key Decisions
[Bullet points: tech stack, design choices, constraints]

## Work Plan by Stage
### Stage 1: [name] — ✅ Complete
- [x] Task A
- [x] Task B

### Stage 2: [name] — 🔄 In Progress
- [x] Task C
- [ ] Task D
- [ ] Task E

### Stage 3: [name] — ⏳ Pending
- [ ] Task F

## Progress: 40% complete

## Next Actions
1. [Most immediate next step]
2. [Step after that]
3. [Step after that]

## Notes / Decisions Made This Session
[Date] — [What was decided or discovered]
```

**Crucially**: instruct Claude to update this file at the end of every session before you close it.

```
Before we finish: update PLAN.md with what we completed today, update the
progress percentage, and write tomorrow's next actions.
```

### Starting each new session

Open a fresh Claude Code session with Plan mode on and begin with:

```
Claude, continue with PLAN.md
```

Claude reads the file, sees exactly where the project stands, and picks up where you left off — no recap needed, no context wasted on history. The entire handoff happens through the file.

> **Important:** Keep one PLAN.md, not many. Multiple files with the same content but different names (plan-v2.md, plan-final.md, plan-updated.md) create confusion about which is current. One file, always updated in place.

### When to use PLAN.md vs CLAUDE.md

These two files serve different purposes and should stay separate:

| File | Contains | Loads |
|---|---|---|
| `CLAUDE.md` | Permanent conventions: coding style, tools, how you communicate | Every session automatically |
| `PLAN.md` | Project-specific progress: what's done, what's next, decisions made | On demand: "continue with PLAN.md" |

Keep CLAUDE.md for stable preferences. Keep PLAN.md lean and task-focused — its job is to orient Claude quickly, not to document everything.

### What to write down (broader project structure)

For larger projects, you can expand beyond a single PLAN.md:

```
your-project/
├── CLAUDE.md          ← permanent rules, style, conventions (loads automatically)
├── PLAN.md            ← living project plan, updated every session
└── memory/
    ├── decisions.md   ← why specific choices were made (architecture decision log)
    └── progress.md    ← detailed session notes if PLAN.md gets too long
```

Keep it flat. The goal is files you can load quickly at session start — not a documentation system that becomes its own maintenance burden.

---

## Memory Documents

Memory documents (`.md` files) are the agent's long-term memory. They live on disk and persist across sessions, surviving `/compact`, restarts, and model updates.

### Two levels of memory

**Personal-level memory** lives at `~/.claude/` or your global config directory. This is for stable preferences that apply to all your projects:

```
~/.claude/
└── CLAUDE.md          ← your coding style, preferred tools, how you like to communicate
```

**Project-level memory** lives in the project repo. This is for knowledge specific to one project:

```
project/
├── CLAUDE.md          ← project conventions, file structure, tech stack
└── memory/
    ├── architecture.md   ← how the system is designed
    ├── decisions.md      ← ADRs (architecture decision records)
    └── progress.md       ← what's done, what's in progress
```

### Writing to memory

The key habit: **at the end of a session, write anything important into the right memory file before closing**. The agent can do this for you:

```
Before you close: summarise what we decided today and append it to memory/decisions.md
```

This turns your memory files into a living knowledge base that gets richer over time, rather than a history that decays with every `/compact`.

### What belongs in memory docs vs. CLAUDE.md

| File | What it contains | Changes how often |
|---|---|---|
| `~/.claude/CLAUDE.md` | Your permanent style & preferences | Rarely |
| `project/CLAUDE.md` | Project conventions, stack, file layout | Occasionally |
| `memory/decisions.md` | Why specific choices were made | Per decision |
| `memory/progress.md` | Current state, what's done | Per session |
| `tasks/current.md` | The active atomic task | Per task |

---

## Atomic Tasks: GSD and the Ralph Loop

The planning document pattern works best when tasks are **atomic** — small enough to complete in a single session with a clean context window.

### Why task size matters for context

A task that spans multiple sessions will either:
1. Force you to re-explain context every session (wasted tokens), or
2. Try to run in one giant session that fills with context rot

Atomic tasks sidestep both problems. One task, one session, clean context in, clean result out.

### GSD (Get Shit Done)

GSD is a spec-driven agentic workflow built around fresh context per task and structured validation:

```
Idea → Spec → Roadmap → Phase Plan → Atomic Tasks → Execute → Verify → Done
```

Key principles:
- **No task runs until a spec exists.** Write the goal before prompting.
- **Each task runs in a fresh context.** Never carry state from one task to the next via conversation history — use files.
- **Validation is built in.** A separate verifier agent checks whether the task is complete before marking it done. If it fails, a debugger agent diagnoses the issue and the loop repeats.
- **Context stays small.** Because each task starts fresh, context never accumulates across tasks.

The GSD loop for a single task looks like this:

```
1. Write task spec to tasks/current.md
2. Start fresh Claude Code session
3. Agent reads specs + current task
4. Agent implements
5. Verifier checks result
6. If pass → move task to done/, write next task
7. If fail → write failure notes to task file, loop from step 2
```

### The Ralph Loop

The Ralph Loop (Geoffrey Huntley) pushes this further: it automates the looping so the agent runs continuously until a task is done, with each iteration starting from a clean context.

The insight: **failed attempts are noise**. When an agent tries something, gets an error, and tries again in the same session, the error output fills the context. By the third attempt, the model is spending most of its attention budget processing its own failure history. Ralph breaks this by discarding the conversation after each attempt and reading only the persistent state files.

```
Loop iteration N:
  1. Read task.md (the goal)
  2. Read review-feedback.txt (what failed last time, if anything)
  3. Do the work
  4. Write work-summary.txt
  5. Exit (conversation ends, context discarded)

Review phase:
  A different model reads work-summary.txt
  If good → output "SHIP" → done
  If not  → write review-feedback.txt → start iteration N+1
```

The worker model and the reviewer model never share a context window. Each sees only the structured files, not each other's reasoning. This eliminates cross-contamination between attempts and keeps every iteration's context minimal.

### Sizing your atomic tasks

An atomic task should fit within a single session without needing `/compact`. A rough guide:

| Task size | Description | Context risk |
|---|---|---|
| Too large | "Build the whole analysis pipeline" | Guaranteed rot |
| Large | "Add differential expression analysis" | High — split it |
| Good | "Write the DESeq2 wrapper function with tests" | Low |
| Good | "Fix the NA-handling bug in normalise_counts()" | Very low |
| Too small | "Rename this variable" | Fine but inefficient |

If you can't describe what "done" looks like in two sentences, the task is probably too large.

---

## Prompt Caching

`/compact` cleans up a context you've already paid to build. Prompt caching prevents you paying to re-process the same content at all.

Every time you send a message, Claude processes the entire context from scratch — including your system prompt, CLAUDE.md, and rules files that haven't changed since the last message. **Prompt caching** saves the model's internal state for a prefix of your prompt so that subsequent calls can skip re-processing that prefix entirely.

### How it works

When you mark a content block with `cache_control`, the API stores the model's computed state up to that point. The next request that starts with the same prefix reads from cache instead of reprocessing — skipping the computation and charging you a fraction of normal input token cost.

```
Without caching (every message):
  System prompt (5,000 tokens) → full processing → $0.015
  + User message                → full processing

With caching (subsequent messages):
  System prompt (5,000 tokens) → cache read     → $0.0015  (90% cheaper)
  + User message                → full processing
```

### Pricing

| | Write to cache | Read from cache |
|---|---|---|
| Cost multiplier | 1.25× base input price | 0.10× base input price |
| When it applies | First call (cache miss) | All subsequent calls within TTL |

Cache entries expire after **5 minutes of inactivity** by default (a 1-hour TTL is available at 2× base input price). The cache refreshes for free each time it's hit.

**Minimum cacheable size:** 1,024 tokens for Sonnet models; 4,096 tokens for Haiku/Opus.

### When it matters for lab workflows

Prompt caching is most valuable when you are running **automated loops** — GSD, Ralph Loop, or any scripted agentic workflow where the same system prompt and CLAUDE.md loads at the start of every task iteration. Without caching, a 5,000-token CLAUDE.md is reprocessed (and re-billed) for every single task. With caching, it's processed once per 5-minute window.

For interactive single sessions (normal Claude Code use), auto-compact handles most of the cost management. Caching becomes essential when you're calling the API programmatically.

### Enabling it

Add `cache_control` to the last block of your static content:

```python
response = client.messages.create(
    model="claude-sonnet-4-6",
    system=[
        {
            "type": "text",
            "text": "...your full CLAUDE.md / system prompt...",
            "cache_control": {"type": "ephemeral"}   # cache everything up to here
        }
    ],
    messages=[
        {"role": "user", "content": "implement the next task in tasks/current.md"}
    ]
)
```

Or use **automatic caching** — add `cache_control` at the top level and the API manages cache breakpoints for you as the conversation grows:

```python
response = client.messages.create(
    model="claude-sonnet-4-6",
    cache_control={"type": "ephemeral"},   # automatic — no block-level config needed
    system="...your system prompt...",
    messages=[...]
)
```

Claude Code itself handles caching automatically for interactive sessions. The manual API approach matters when you're building your own agentic loops.

---

## Token Budgeting for Tool Outputs

`/compact` and prompt caching manage what's in the context window. Token budgeting controls what gets *admitted* in the first place.

Tool outputs are the fastest way to fill a context window. A single `bash` command can dump 20,000 tokens of stack traces. A file read of a large module loads 10,000 tokens whether you need all of it or not. Most of that noise then persists through every subsequent message.

### Instructing verbosity limits

The simplest approach: tell the agent explicitly what you want.

```
Read only the normalise_counts function from utils.R — not the whole file
Summarise the test output in 10 lines maximum, showing only failures
Run the linter but only report errors, not warnings
Search for the function definition — return just the file path and line number
```

These are **natural language token budgets**. They constrain what the tool call returns before it hits the context.

### Structuring tasks to minimise tool noise

Larger structural habits compound the effect:

| High-token habit | Low-token alternative |
|---|---|
| Read entire files | Read specific functions by line range |
| Run full test suite | Run only the test for the function you changed |
| Paste raw CSV/TSV data | Describe the data schema; ask agent to read only the header |
| Let bash errors dump full tracebacks | Ask for last 20 lines of error only |
| Use `grep` broadly | Use targeted `grep` with `-n -m 5` (first 5 matches with line numbers) |

### Hooks for automatic truncation

Claude Code hooks let you intercept tool outputs *after* they run and before they enter the context. A `PostToolUse` hook on `Bash` can truncate output automatically:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r '.tool_result.output // empty' | head -50"
          }
        ]
      }
    ]
  }
}
```

This caps every bash output at 50 lines — a blunt but effective ceiling on context growth from command-line noise.

---

## Multi-Agent Parallelism

Everything so far assumes one agent, one context window, working sequentially. **Multi-agent parallelism** is the architectural move that breaks that assumption.

### The core idea

Instead of one agent doing ten steps in one growing context window, ten agents each do one step in their own clean, minimal context windows, and write their results to shared files on disk.

```
Sequential (one context, grows with each step)
  Agent → Task 1 → Task 2 → Task 3 → ... → Task 10
         [context fills with history of all tasks]

Parallel (many contexts, each minimal)
  Agent A → Task 1 → writes result to results/task1.md
  Agent B → Task 2 → writes result to results/task2.md
  Agent C → Task 3 → writes result to results/task3.md
            ...runs in parallel...
  Coordinator reads results/ and synthesises
```

Each agent only sees:
1. The shared system prompt / CLAUDE.md
2. Its specific task description
3. The files it needs to read for that task

No history, no other agents' reasoning, no accumulated noise.

### When to use it

Multi-agent parallelism works well for tasks that are **independent** — where the output of one task doesn't need to feed immediately into the next:

- Running the same analysis on multiple datasets
- Reviewing multiple files for the same issue
- Generating multiple variants of a document or figure
- Running quality checks (linting, testing, validation) concurrently with implementation

It is overkill for tasks that are inherently sequential, like debugging a bug where each fix informs the next.

### Claude Code sub-agents

Claude Code supports spawning sub-agents natively. A parent agent can launch child agents with specific tasks, each operating in an isolated context. The parent coordinates, the children execute, results flow back through files.

This is the architecture described in detail in [Anthropic's guide to building effective agents](https://www.anthropic.com/engineering/building-effective-agents) — orchestrators decompose work, specialists execute, everything communicates through structured artifacts rather than shared conversation history.

---

## Spec-Driven Development: The BMAD Framework

GSD and Ralph Loop are approaches to *executing* atomic tasks with clean context. **BMAD** (Breakthrough Method for Agile AI-Driven Development) is the broader framework for *designing* the work before execution begins.

### The problem it solves

"Vibe coding" — describe a goal loosely and let the AI figure it out — produces unpredictable results, inconsistent quality, and sessions that meander because the AI is inferring intent rather than following a spec. The context fills with exploratory back-and-forth rather than purposeful execution.

BMAD's answer: **write the specification first, in enough detail that any competent agent can execute it without ambiguity**. The spec becomes the source of truth. The AI's job is execution, not interpretation.

### The BMAD process

```
1. Analyst agent      → clarifies requirements, defines the problem
2. PM agent           → writes a Product Requirements Document (PRD)
3. Architect agent    → designs technical approach, writes architecture doc
4. Scrum Master agent → breaks architecture into atomic development stories
5. Developer agent    → implements one story at a time, from spec
6. QA agent           → verifies implementation against spec
```

Each agent in this pipeline has a narrow, well-defined role. Each produces a structured artifact (a markdown document) that the next agent reads. No agent needs to understand the full history of how the spec was written — it just reads the document.

### Why this is a context management strategy

The BMAD pipeline externalises intent into files, so no context window needs to carry it. By the time a developer agent runs, it reads:
- The relevant story (one atomic task, ~1 page)
- The architecture doc (technical constraints, ~3–5 pages)
- The relevant source files (targeted, not the whole codebase)

That's a minimal, well-structured context — far smaller than the context you'd have if you'd been designing and building in the same long session.

### Applying BMAD principles without the full framework

You don't need to adopt BMAD wholesale. The principles transfer directly:

- **Write a spec before you prompt.** Even a half-page description of what done looks like is better than "build me an analysis pipeline."
- **Separate design sessions from build sessions.** Use one Claude Code session (or Plan mode) to design and document, then start a fresh session to build. The design session produces files; the build session reads them.
- **One story, one session.** When the BMAD Scrum Master breaks work into stories, each story is sized to be completed in a single focused session. That's an atomic task.

---

## Context Engineering

Everything in this tutorial — `/compact`, planning docs, atomic tasks, GSD, Ralph Loop, prompt caching, token budgeting, multi-agent parallelism, BMAD — falls under a single discipline: **context engineering**.

### Prompt engineering vs. context engineering

| | Prompt engineering | Context engineering |
|---|---|---|
| Question it answers | *What do I say to get a good response?* | *What information should be present in the window?* |
| Lever | Wording, framing, few-shot examples | Which files load, what history persists, what tool output is retained, what is summarised |
| When it matters | Single-turn, well-defined tasks | Multi-step, long-running, agentic workflows |
| Skill | Crafting clear instructions | Designing information architecture |

For simple tasks — "explain this function", "write a docstring" — prompt engineering is sufficient. For agentic workflows — "build this analysis pipeline over a week of sessions" — context engineering determines whether the work succeeds or degrades into hallucination and wasted cost.

### The context engineering mindset

Think of every session not as a conversation, but as an **information environment you are designing**. Before each session ask:

- What does the agent need to know? (Load it from files, not history)
- What will it produce? (Write it to files, not just reply)
- What noise will accumulate? (Constrain it upfront, compact proactively)
- What is stable across sessions? (Put it in CLAUDE.md or memory docs)
- What is task-specific? (Put it in tasks/current.md, discard after)

The model's quality is bounded by the quality of its context. Context rot is a context engineering failure. Hallucination on file contents is a context engineering failure. "The model keeps forgetting my conventions" is a context engineering failure.

Good context engineering means the model always has exactly what it needs, and nothing it doesn't.

---

## Automated Hooks

Hooks are shell commands that Claude Code runs automatically at specific lifecycle events. They are the infrastructure layer that lets you enforce context management rules rather than relying on yourself to remember them.

### Hook events

| Event | When it fires | Useful for |
|---|---|---|
| `SessionStart` | When a session begins or resumes | Injecting fresh context, loading task state |
| `SessionStart` (matcher: `compact`) | After auto-compact runs | Re-injecting critical context lost in compaction |
| `PreCompact` | Before compaction starts | Writing current state to memory files first |
| `Stop` | When Claude finishes responding | Checking task completeness, triggering next task |
| `PostToolUse` | After any tool call succeeds | Truncating verbose output, logging tool use |
| `PreToolUse` | Before a tool call executes | Blocking risky commands, enforcing constraints |
| `SessionEnd` | When the session terminates | Archiving session summary to memory docs |

### Re-injecting context after compaction

The most practical hook for context management: when `/compact` runs, it may lose specific details you care about. A `SessionStart` hook with `compact` matcher re-injects them automatically:

```json
{
  "hooks": {
    "SessionStart": [
      {
        "matcher": "compact",
        "hooks": [
          {
            "type": "command",
            "command": "cat tasks/current.md"
          }
        ]
      }
    ]
  }
}
```

Anything the hook writes to stdout is added to Claude's context. After every compact, the agent is reminded of the current task without you doing anything.

### Writing memory docs at session end

A `SessionEnd` hook can write a session summary to your memory files automatically:

```json
{
  "hooks": {
    "SessionEnd": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "echo \"Session ended: $(date)\" >> memory/progress.md"
          }
        ]
      }
    ]
  }
}
```

For a richer summary, use a `Stop` hook with an agent-type hook that reads the transcript and writes a structured summary to `memory/progress.md` before the session closes.

### A Ralph Loop hook: automated task cycling

A `Stop` hook can implement the core Ralph Loop mechanic — check if the task is done, and if not, keep going:

```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "prompt",
            "prompt": "Check tasks/current.md and the work done this session. Is the task complete? If not, respond with {\"ok\": false, \"reason\": \"what remains\"} to continue working."
          }
        ]
      }
    ]
  }
}
```

The model evaluates its own output. If the task isn't done, it returns `ok: false` with a reason, and Claude Code continues working toward completion automatically.

### Where to store hooks

| Location | Scope |
|---|---|
| `~/.claude/settings.json` | All projects (global) |
| `.claude/settings.json` | This project only (committable to repo) |
| `.claude/settings.local.json` | This project only (gitignored, personal) |

Configure hooks interactively with `/hooks` in Claude Code, or edit the JSON files directly.

---

## Summary

| Concept | Key point |
|---|---|
| Context window | Fixed-size working memory re-sent with every message |
| Token cost | Every message costs proportional to total context size |
| Context rot | Quality degrades as early instructions get buried |
| `/compact` | Collapses 160k tokens to 5k with a structured summary |
| Planning docs | Move durable state to files — not conversation history |
| Memory docs | Persistent `.md` files that survive sessions and `/compact` |
| Atomic tasks | One task per session, sized to fit in a clean context window |
| GSD | Fresh context per task + built-in validation loop |
| Ralph Loop | Automated looping with state persisted to files, conversation discarded each iteration |
| Context engineering | Designing what information is in the window, not just what you say |

Context management is not a power-user trick — it is basic hygiene for anyone running long agentic sessions. The progression from `/compact` → planning docs → atomic tasks → GSD/Ralph is a path from reactive cleanup to proactive architecture. Start with `/compact`, then build the habit of planning docs, and you will get better answers, fewer hallucinations, and significantly lower API bills.

---

## Further Reading

- [Everything is a Ralph Loop — Geoffrey Huntley](https://ghuntley.com/loop/)
- [Ralph Loop — Goose documentation](https://block.github.io/goose/docs/tutorials/ralph-loop/)
- [GSD and spec-driven development overview](https://pasqualepillitteri.it/en/news/158/framework-ai-spec-driven-development-guide-bmad-gsd-ralph-loop)
- [Anthropic: Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents)
