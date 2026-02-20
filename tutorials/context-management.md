---
layout: default
title: Managing Context, Reducing Hallucinations and Run Costs
---

# Managing Context: Reducing Hallucinations and Run Costs

Long sessions fill the context window, burying your instructions under noise. The model forgets your conventions, hallucinates file contents, and every reply costs more. This tutorial explains why and how to fix it.

---

## What is Context?

Every message re-sends the **entire conversation** to the API — your rules, all previous messages, every tool output. This bundle is the **context window**, measured in tokens (~0.75 words each). All Claude models support 200,000 tokens (~1,500 pages).

**What fills it:**
- System prompt / CLAUDE.md — fixed overhead every session
- Chat history — grows ~1k tokens per turn
- File reads — one 500-line file ≈ 3k tokens
- Bash/test output — a single stack trace ≈ 5k–20k tokens ← *silent killer*
- Web search results — 5k–10k per search

**How a session fills up:**

<svg viewBox="0 0 640 370" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto;font-family:system-ui,sans-serif">
  <rect width="640" height="370" fill="white" rx="8" stroke="#E5E7EB" stroke-width="1"/>
  <text x="320" y="22" text-anchor="middle" font-size="13" font-weight="600" fill="#111827">Context Window Fill — 200,000 Token Limit</text>
  <text x="320" y="37" text-anchor="middle" font-size="10" fill="#6B7280">How a typical coding session consumes the available context</text>
  <line x1="218" y1="50" x2="218" y2="292" stroke="#F3F4F6" stroke-width="1"/>
  <line x1="325" y1="50" x2="325" y2="292" stroke="#F3F4F6" stroke-width="1"/>
  <line x1="433" y1="50" x2="433" y2="292" stroke="#F3F4F6" stroke-width="1"/>
  <line x1="411" y1="48" x2="411" y2="292" stroke="#F59E0B" stroke-width="1.5" stroke-dasharray="3,3"/>
  <text x="411" y="46" text-anchor="middle" font-size="9" fill="#D97706">70%</text>
  <line x1="454" y1="48" x2="454" y2="292" stroke="#EF4444" stroke-width="1.5" stroke-dasharray="3,3"/>
  <text x="454" y="46" text-anchor="middle" font-size="9" fill="#DC2626">80%</text>
  <rect x="110" y="60"  width="430" height="38" fill="#F9FAFB" rx="4" stroke="#E5E7EB" stroke-width="1"/>
  <rect x="110" y="118" width="430" height="38" fill="#F9FAFB" rx="4" stroke="#E5E7EB" stroke-width="1"/>
  <rect x="110" y="176" width="430" height="38" fill="#F9FAFB" rx="4" stroke="#E5E7EB" stroke-width="1"/>
  <rect x="110" y="234" width="430" height="38" fill="#F9FAFB" rx="4" stroke="#E5E7EB" stroke-width="1"/>
  <clipPath id="c1"><rect x="110" y="60"  width="430" height="38" rx="4"/></clipPath>
  <clipPath id="c2"><rect x="110" y="118" width="430" height="38" rx="4"/></clipPath>
  <clipPath id="c3"><rect x="110" y="176" width="430" height="38" rx="4"/></clipPath>
  <clipPath id="c4"><rect x="110" y="234" width="430" height="38" rx="4"/></clipPath>
  <g clip-path="url(#c1)">
    <rect x="110" y="60" width="9" height="38" fill="#3B82F6"/>
    <rect x="119" y="60" width="2" height="38" fill="#F97316"/>
  </g>
  <g clip-path="url(#c2)">
    <rect x="110" y="118" width="9"  height="38" fill="#3B82F6"/>
    <rect x="119" y="118" width="86" height="38" fill="#F97316"/>
    <rect x="205" y="118" width="43" height="38" fill="#10B981"/>
    <rect x="248" y="118" width="32" height="38" fill="#EF4444"/>
  </g>
  <g clip-path="url(#c3)">
    <rect x="110" y="176" width="9"   height="38" fill="#3B82F6"/>
    <rect x="119" y="176" width="129" height="38" fill="#F97316"/>
    <rect x="248" y="176" width="86"  height="38" fill="#10B981"/>
    <rect x="334" y="176" width="54"  height="38" fill="#EF4444"/>
    <rect x="388" y="176" width="22"  height="38" fill="#8B5CF6"/>
  </g>
  <g clip-path="url(#c4)">
    <rect x="110" y="234" width="9"   height="38" fill="#3B82F6"/>
    <rect x="119" y="234" width="172" height="38" fill="#F97316"/>
    <rect x="291" y="234" width="97"  height="38" fill="#10B981"/>
    <rect x="388" y="234" width="54"  height="38" fill="#EF4444"/>
    <rect x="442" y="234" width="22"  height="38" fill="#8B5CF6"/>
  </g>
  <text x="105" y="83"  text-anchor="end" font-size="11" font-weight="600" fill="#374151">Fresh</text>
  <text x="105" y="141" text-anchor="end" font-size="11" font-weight="600" fill="#374151">1 Hour</text>
  <text x="105" y="199" text-anchor="end" font-size="11" font-weight="600" fill="#374151">Long</text>
  <text x="105" y="257" text-anchor="end" font-size="11" font-weight="600" fill="#374151">Critical</text>
  <text x="128" y="83"  font-size="10" fill="#6B7280">~4.5k</text>
  <text x="162" y="141" font-size="10" fill="white" font-weight="500">~79k tokens</text>
  <text x="280" y="199" font-size="10" fill="white" font-weight="500">~139k tokens</text>
  <text x="312" y="257" font-size="10" fill="white" font-weight="500">~164k tokens</text>
  <text x="548" y="83"  font-size="11" fill="#9CA3AF">2%</text>
  <text x="548" y="141" font-size="11" fill="#F59E0B" font-weight="500">40%</text>
  <text x="548" y="199" font-size="11" fill="#EF4444" font-weight="600">70% ⚠</text>
  <text x="548" y="257" font-size="11" fill="#EF4444" font-weight="600">82% ⚡</text>
  <line x1="110" y1="292" x2="540" y2="292" stroke="#D1D5DB" stroke-width="1"/>
  <line x1="110" y1="292" x2="110" y2="297" stroke="#9CA3AF" stroke-width="1"/>
  <line x1="218" y1="292" x2="218" y2="297" stroke="#9CA3AF" stroke-width="1"/>
  <line x1="325" y1="292" x2="325" y2="297" stroke="#9CA3AF" stroke-width="1"/>
  <line x1="433" y1="292" x2="433" y2="297" stroke="#9CA3AF" stroke-width="1"/>
  <line x1="540" y1="292" x2="540" y2="297" stroke="#9CA3AF" stroke-width="1"/>
  <text x="110" y="309" text-anchor="middle" font-size="10" fill="#6B7280">0</text>
  <text x="218" y="309" text-anchor="middle" font-size="10" fill="#6B7280">50k</text>
  <text x="325" y="309" text-anchor="middle" font-size="10" fill="#6B7280">100k</text>
  <text x="433" y="309" text-anchor="middle" font-size="10" fill="#6B7280">150k</text>
  <text x="540" y="309" text-anchor="middle" font-size="10" fill="#6B7280">200k tokens</text>
  <rect x="55"  y="325" width="10" height="10" fill="#3B82F6" rx="2"/><text x="69"  y="334" font-size="10" fill="#374151">System/CLAUDE.md</text>
  <rect x="180" y="325" width="10" height="10" fill="#F97316" rx="2"/><text x="194" y="334" font-size="10" fill="#374151">Chat history</text>
  <rect x="268" y="325" width="10" height="10" fill="#10B981" rx="2"/><text x="282" y="334" font-size="10" fill="#374151">File reads</text>
  <rect x="345" y="325" width="10" height="10" fill="#EF4444" rx="2"/><text x="359" y="334" font-size="10" fill="#374151">Bash/test output</text>
  <rect x="453" y="325" width="10" height="10" fill="#8B5CF6" rx="2"/><text x="467" y="334" font-size="10" fill="#374151">Web search</text>
  <text x="55" y="353" font-size="9" fill="#D97706">— — 70% = quality degradation risk</text>
  <text x="270" y="353" font-size="9" fill="#DC2626">— — 80% = auto-compact triggers</text>
</svg>

---

## Context Rot and Cost

**Context rot** is what happens past ~70%: early instructions get buried, the model attends to recent noise over old rules, hallucinations increase.

**Cost** scales linearly — every message re-sends the full window. 50 messages at 150k tokens on Sonnet = **$22.50 in input costs alone**.

<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto;font-family:system-ui,sans-serif">
  <rect width="640" height="400" fill="white" rx="8" stroke="#E5E7EB" stroke-width="1"/>
  <text x="320" y="22" text-anchor="middle" font-size="13" font-weight="600" fill="#111827">Cost per Message vs Context Size</text>
  <text x="320" y="37" text-anchor="middle" font-size="10" fill="#6B7280">Input token cost only — re-sent with every message</text>
  <line x1="65" y1="325" x2="495" y2="325" stroke="#D1D5DB" stroke-width="1"/>
  <line x1="65" y1="255" x2="495" y2="255" stroke="#F3F4F6" stroke-width="1"/>
  <line x1="65" y1="185" x2="495" y2="185" stroke="#F3F4F6" stroke-width="1"/>
  <line x1="65" y1="115" x2="495" y2="115" stroke="#F3F4F6" stroke-width="1"/>
  <line x1="65" y1="45"  x2="495" y2="45"  stroke="#F3F4F6" stroke-width="1"/>
  <text x="60" y="328" text-anchor="end" font-size="10" fill="#6B7280">$0</text>
  <text x="60" y="258" text-anchor="end" font-size="10" fill="#6B7280">$0.25</text>
  <text x="60" y="188" text-anchor="end" font-size="10" fill="#6B7280">$0.50</text>
  <text x="60" y="118" text-anchor="end" font-size="10" fill="#6B7280">$0.75</text>
  <text x="60" y="48"  text-anchor="end" font-size="10" fill="#6B7280">$1.00</text>
  <line x1="173" y1="45" x2="173" y2="325" stroke="#F3F4F6" stroke-width="1"/>
  <line x1="280" y1="45" x2="280" y2="325" stroke="#F3F4F6" stroke-width="1"/>
  <line x1="388" y1="45" x2="388" y2="325" stroke="#F3F4F6" stroke-width="1"/>
  <rect x="383" y="45" width="10" height="280" fill="#FEF3C7" opacity="0.6"/>
  <text x="388" y="42" text-anchor="middle" font-size="8" fill="#D97706">150k</text>
  <text x="65"  y="340" text-anchor="middle" font-size="10" fill="#6B7280">0</text>
  <text x="173" y="340" text-anchor="middle" font-size="10" fill="#6B7280">50k</text>
  <text x="280" y="340" text-anchor="middle" font-size="10" fill="#6B7280">100k</text>
  <text x="388" y="340" text-anchor="middle" font-size="10" fill="#6B7280">150k</text>
  <text x="495" y="340" text-anchor="middle" font-size="10" fill="#6B7280">200k tokens</text>
  <line x1="65" y1="45" x2="65" y2="325" stroke="#D1D5DB" stroke-width="1"/>
  <line x1="65" y1="325" x2="495" y2="317" stroke="#9CA3AF" stroke-width="1.5"/>
  <line x1="65" y1="325" x2="495" y2="291" stroke="#F59E0B" stroke-width="3"/>
  <line x1="65" y1="325" x2="495" y2="269" stroke="#3B82F6" stroke-width="1.5"/>
  <line x1="65" y1="325" x2="495" y2="255" stroke="#06B6D4" stroke-width="1.5"/>
  <line x1="65" y1="325" x2="495" y2="185" stroke="#10B981" stroke-width="1.5"/>
  <line x1="65" y1="325" x2="495" y2="157" stroke="#8B5CF6" stroke-width="1.5"/>
  <line x1="65" y1="325" x2="495" y2="45"  stroke="#EF4444" stroke-width="1.5"/>
  <circle cx="495" cy="317" r="3" fill="#9CA3AF"/>
  <circle cx="495" cy="291" r="4" fill="#F59E0B"/>
  <circle cx="495" cy="269" r="3" fill="#3B82F6"/>
  <circle cx="495" cy="255" r="3" fill="#06B6D4"/>
  <circle cx="495" cy="185" r="3" fill="#10B981"/>
  <circle cx="495" cy="157" r="3" fill="#8B5CF6"/>
  <circle cx="495" cy="45"  r="3" fill="#EF4444"/>
  <text x="500" y="320" font-size="9" fill="#9CA3AF">$0.03  GPT-4o mini</text>
  <text x="500" y="294" font-size="9" fill="#B45309" font-weight="600">$0.12  Kimi K2.5 ★</text>
  <text x="500" y="272" font-size="9" fill="#3B82F6">$0.20  Haiku 4.5</text>
  <text x="500" y="258" font-size="9" fill="#06B6D4">$0.25  Gemini 1.5 Pro</text>
  <text x="500" y="188" font-size="9" fill="#10B981">$0.50  GPT-4o</text>
  <text x="500" y="160" font-size="9" fill="#8B5CF6">$0.60  Sonnet 4.6</text>
  <text x="500" y="48"  font-size="9" fill="#EF4444">$1.00  Opus 4.6</text>
  <text x="65" y="365" font-size="9" fill="#F59E0B" font-weight="600">★ Kimi K2.5 is the model used in this course (via OpenRouter)</text>
  <text x="65" y="378" font-size="9" fill="#6B7280">Shaded band = 150k danger zone. Costs are input tokens only.</text>
</svg>

| Model | $/MTok | @ 50k | @ 150k | @ 200k |
|---|---|---|---|---|
| GPT-4o mini | $0.15 | $0.01 | $0.02 | $0.03 |
| **Kimi K2.5 ★** | **$0.60** | **$0.03** | **$0.09** | **$0.12** |
| Claude Haiku 4.5 | $1.00 | $0.05 | $0.15 | $0.20 |
| Gemini 1.5 Pro | $1.25 | $0.06 | $0.19 | $0.25 |
| GPT-4o | $2.50 | $0.13 | $0.38 | $0.50 |
| Claude Sonnet 4.6 | $3.00 | $0.15 | $0.45 | $0.60 |
| Claude Opus 4.6 | $5.00 | $0.25 | $0.75 | $1.00 |

Even on the cheap Kimi model, 50 messages at 150k tokens = **$4.50**. On Sonnet = **$22.50**. Context management is a billing issue, not just a quality issue.

---

## The Solution: `/compact`

Type `/compact` in Claude Code at any time. It summarises the entire conversation into a structured digest (~5k tokens) and discards the raw history.

**Before:** 164,495 tokens — 25% used
![Before compact](../assets/images/context-before-compact.png)

**After:** 5,228 tokens — 2% used
![After compact](../assets/images/context-after-compact.png)

**97% reduction.** Run it after completing a task, before starting something new, or when context hits ~50%.

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

## Atomic Tasks: GSD and the Ralph Loop

Planning docs work best when tasks are **atomic** — completable in one session with a clean context.

**GSD workflow:**
```
Spec → Roadmap → Atomic Tasks → Fresh Session → Implement → Verify → Done
                                     ↑ loop if fails ↑
```
Each task gets its own fresh session. State lives in files, not history.

**Ralph Loop** (Geoffrey Huntley) automates this: each iteration spawns a clean context, reads from `task.md` and `review-feedback.txt`, does the work, then exits. A separate reviewer model checks the output and either ships it or writes feedback for the next iteration. Failed attempts never pollute the context.

**Task sizing guide:**

| Size | Example | Risk |
|---|---|---|
| Too large | "Build the analysis pipeline" | Guaranteed rot |
| Good | "Write the DESeq2 wrapper with tests" | Low |
| Good | "Fix the NA bug in normalise_counts()" | Very low |

If you can't describe "done" in two sentences, split the task.

---

## Advanced Techniques

### Prompt Caching
When running automated loops, your CLAUDE.md is re-processed every iteration. Add `cache_control` to cache it — subsequent reads cost **10% of normal price** (write costs 125%, reads 10%, 5-min TTL by default).

```python
system=[{"type": "text", "text": "...CLAUDE.md...", "cache_control": {"type": "ephemeral"}}]
```

### Token Budgeting
Tell the agent exactly what to return:
```
Read only the normalise_counts function — not the whole file
Summarise test output in 10 lines, failures only
```

A `PostToolUse` hook can auto-truncate bash output:
```json
{"hooks": {"PostToolUse": [{"matcher": "Bash", "hooks": [{"type": "command", "command": "jq -r '.tool_result.output // empty' | head -50"}]}]}}
```

### Multi-Agent Parallelism
Split independent tasks across separate agents, each with a clean context window. They write results to shared files; a coordinator synthesises. Use for: running the same analysis on multiple datasets, reviewing multiple files, generating variants.

### BMAD Spec-Driven Development
Write full specs before any code runs: Analyst → PM (PRD) → Architect → Scrum Master (stories) → Developer → QA. Each agent reads a file, not history. Context stays small because intent is externalised.

### Automated Hooks
Key hooks for context management:

| Hook | Use |
|---|---|
| `SessionStart` (matcher: `compact`) | Re-inject `PLAN.md` after auto-compact |
| `PreCompact` | Write state to memory files before compaction |
| `Stop` | Check task completion, keep looping if not done |
| `SessionEnd` | Append session summary to `memory/progress.md` |

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

- [Everything is a Ralph Loop — Geoffrey Huntley](https://ghuntley.com/loop/)
- [Ralph Loop — Goose docs](https://block.github.io/goose/docs/tutorials/ralph-loop/)
- [GSD + BMAD overview](https://pasqualepillitteri.it/en/news/158/framework-ai-spec-driven-development-guide-bmad-gsd-ralph-loop)
- [Anthropic: Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents)
