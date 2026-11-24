---
layout: docs
title: Managing Context
difficulty: advanced
time_estimate: "20 min"
---

# Managing Context: Reducing Hallucinations and Run Costs

Long sessions fill the context window, burying your instructions under noise. The model forgets your conventions, hallucinates file contents, and every reply costs more.

---

## What is Context?

Every message re-sends the **entire conversation** to the API — your rules, all previous messages, every tool output. This bundle is the **context window**, measured in tokens (~0.75 words each). Current Claude models support up to 1,000,000 tokens (~7,500 pages); Haiku 4.5 is 200,000.

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

| Model | $/MTok input | Context window | @ 50k | @ 150k | @ 200k |
|---|---|---|---|---|---|
| DeepSeek V4 Flash | $0.14 | 1M | $0.01 | $0.02 | $0.03 |
| Gemini 3 Flash | $0.50 | ~1M | $0.03 | $0.08 | $0.10 |
| Kimi K2.5 | $0.60 | 262k | $0.03 | $0.09 | $0.12 |
| Claude Haiku 4.5 | $1.00 | 200k | $0.05 | $0.15 | $0.20 |
| GPT-5 | $1.25 | 400k | $0.06 | $0.19 | $0.25 |
| **GLM 5.2 ★** | **$1.40** | **~1M** | **$0.07** | **$0.21** | **$0.28** |
| Gemini 3 Pro | $2.00 | ~1M | $0.10 | $0.30 | $0.40 |
| Claude Sonnet 5 | $3.00 | 1M | $0.15 | $0.45 | $0.60 |
| Claude Opus 4.8 | $5.00 | 1M | $0.25 | $0.75 | $1.00 |
| Claude Fable 5 | $10.00 | 1M | $0.50 | $1.50 | $2.00 |

★ GLM 5.2 is the model used in this course (via OpenRouter). Even so, 50 messages × 150k tokens = **$10.50**. The same session on Fable 5 would be **$75**; on DeepSeek V4 Flash, **$1.05**. Context management is a billing issue, not just a quality issue.

Prices are input-only base rates, current as of July 2026. For up-to-date pricing and context window specs across all models, see [models.dev](https://models.dev/).

Think of the window as a fixed grid of cells — every cell you fill with system overhead, tools, or history is a cell the model can't use for your task:

![Agent context window broken down by category: system, MCP tools, skills, and messages fill roughly a third; the rest is free, with a small reserved compact buffer](../assets/images/context-breakdown.png)

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

## The Solutions: `/clear` and `/compact`

**`/clear`** resets the conversation entirely — zero history, zero tool outputs, back to just the system prompt. Use it between unrelated tasks or when the session has gone off track. It's instant and free.

**`/compact`** summarises the entire conversation into a structured digest (~5k tokens) and discards the raw history — typically a **97% reduction**. Unlike `/clear` it preserves continuity: decisions, file states, and completed work survive in the summary. Use it when you want to keep going on the same task with a lighter context.

| | `/clear` | `/compact` |
|---|---|---|
| History after | Gone | Summarised (~5k tokens) |
| When to use | Between tasks, fresh start | Mid-task, keep continuity |
| Cost | Free | One summary call |

> **Auto-compact warning:** The automatic trigger at 80% only saves titles and brief excerpts — not full content. Don't rely on it. Use `/compact` manually.

---

## Further Reading

- [Anthropic: Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents)
