---
layout: docs
title: Second Brain — Build a Research Wiki With Your Agent
difficulty: intermediate
time_estimate: "70 min"
---

# 🧠 Second Brain — Build a Research Wiki With Your Agent

## Inspiration for this workshop

This workshop builds directly on the following prior work — read these to go deeper:

- [Andrej Karpathy — **LLM Knowledge Bases** gist](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) — the `raw/` → `wiki/` → Q&A pattern this tutorial implements
- [AgriciDaniel — **claude-obsidian** plugin](https://github.com/AgriciDaniel/claude-obsidian) — Claude chatting directly inside Obsidian
- [**Obsidian Web Clipper**](https://obsidian.md/clipper) — one-click web article → markdown for your `raw/` folder

## Overview

A **second brain** is a folder of markdown files that an agent reads, writes, and queries for you.
You drop raw sources into a `raw/` directory, the agent compiles a wiki of summaries and concepts with backlinks, and you ask it questions across the whole thing.

This tutorial follows the pattern Andrej Karpathy describes in [LLM Knowledge Bases](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f):

> raw data from a given number of sources is collected, then compiled by an LLM into a .md wiki, then operated on by various CLIs by the LLM to do Q&A and to incrementally enhance the wiki, and all of it viewable in Obsidian. You rarely ever write or edit the wiki manually, it's the domain of the LLM.

You end up with a personal research wiki that grows every time you read a paper or answer a question.

---

## What you'll build

```
second-brain/
├── raw/                      ← PDFs, clipped web articles, images
├── wiki/
│   ├── papers/               ← one .md summary per paper
│   ├── concepts/             ← articles the agent writes by grouping raw/
│   ├── questions/            ← rendered answers to your Q&A
│   └── INDEX.md              ← auto-maintained table of contents
└── AGENT.md                  ← the agent's working instructions
```

By the end you will have:

- 3–5 papers in `raw/`
- A compiled `wiki/` with summaries, a few concept articles, and backlinks
- One cross-paper question answered as a markdown file or Marp slide deck
- A vault that is ready to keep growing after the workshop

---

## Prerequisites

- [Obsidian](https://obsidian.md) installed (free)
- [opencode](https://opencode.ai) installed — see [Get OpenCode](./get-opencode)
- An API key (we hand out a shared [OpenRouter](https://openrouter.ai) key for the workshop)

---

## Step 1 — Create the vault folder

Make an empty folder somewhere on your laptop. Call it `second-brain`.

```bash
mkdir -p ~/Documents/second-brain/raw
cd ~/Documents/second-brain
```

In **Obsidian**: `Open another vault → Open folder as vault → pick second-brain/`.

In **opencode**: open the same folder as your project.

Both tools are now pointed at the same directory. Obsidian is your viewer, opencode is your editor.

---

## Step 2 — Drop in your raw sources

Copy 3–5 PDFs into `raw/`. Any papers you actually want to think about — review articles and primary research work best for first-time use.

Optional: install the [Obsidian Web Clipper](https://obsidian.md/clipper) browser extension and clip one web article directly into `raw/` as a `.md` file.

> **Tip.** Keep filenames readable. `2024-karpathy-llm-kb.pdf` is better than `s41588-024-01919-z.pdf`.

---

## Step 3 — Give the agent its instructions

Create a file called `AGENT.md` at the top of the vault. The agent will read this first every session.

```markdown
# Agent instructions

You are maintaining a personal research wiki in this folder.

## Layout
- `raw/` holds source PDFs, clipped articles, and images. I put things here. You read them.
- `wiki/` is yours. You write and maintain it. I rarely edit it directly.
  - `wiki/papers/` — one markdown file per source in raw/
  - `wiki/concepts/` — articles you write by grouping themes across papers
  - `wiki/questions/` — rendered answers to questions I ask
  - `wiki/INDEX.md` — table of contents; keep updated after every change

## Rules
- Every wiki file must have a YAML frontmatter with `title`, `tags`, `sources`.
- Use Obsidian wiki-links `[[like this]]` for backlinks between concepts and papers.
- Cite the source filename for every claim. If unsure, say "unclear from source".
- When I add a new paper, update concept articles that touch it.
- Never invent citations or facts not in raw/.
```

---

## Step 4 — Compile the wiki

In **opencode**, paste this prompt:

```
Read AGENT.md. Then:

1. Scan raw/ and list every source you find.
2. For each source, write wiki/papers/<filename>.md with:
   - frontmatter (title, authors, year, tags, source: raw/<filename>)
   - a 5-sentence summary
   - 3-5 key findings as bullets
   - a "Connections" section with [[wiki-links]] to concept articles
3. Identify 3-5 themes that connect multiple papers. Write one
   wiki/concepts/<theme>.md article per theme, linking back to
   the papers/.
4. Write wiki/INDEX.md listing every paper and concept, grouped by tag.

Ask before running if anything is unclear. Otherwise, go.
```

Watch the agent in opencode. It will:

- Read each PDF in `raw/`
- Write paper summaries one by one
- Propose concept clusters, then write concept articles
- Maintain `INDEX.md`

In Obsidian, switch to the vault and watch the files appear. Click any `[[wiki-link]]` to jump between papers and concepts.

> **Takes too long?** Tell the agent to process 2 papers now and the rest in a second pass. Iterative is fine.

---

## Step 5 — Ask a cross-paper question

Now query across your wiki. Pick a question that no single paper answers on its own.

Good questions for a neuroscience second brain:

- *"Which papers cite the same upstream method or dataset, and where do they disagree?"*
- *"What are the three most-repeated limitations across my review articles?"*
- *"If I was writing an introduction to this topic, what would the 5 key references be and why?"*

Paste into opencode:

```
Using only the wiki/ and raw/ directories, answer this question:

<YOUR QUESTION>

Write the answer to wiki/questions/<short-slug>.md with:
- frontmatter (question, date, sources)
- a 2-3 paragraph answer
- a "Supporting evidence" section with direct quotes and [[wiki-links]]
- a "Further questions" section suggesting 3 follow-ups
```

Open the result in Obsidian and read it. Click the backlinks to verify the evidence against the original papers.

---

## Step 6 — Share what surprised you

Post in Slack: one connection the agent found that you didn't expect. A shared citation, a hidden thematic overlap, a contradicting finding. The "why did you group these?" reveal is often the best part.

---

## Why this works

The agent does three things humans are bad at:

1. **Reading every paper in the folder, every time.** You'd skim. It doesn't.
2. **Maintaining a consistent structure.** Frontmatter, backlinks, index — boring but useful.
3. **Re-compiling when new material arrives.** Drop a paper in `raw/`, re-run the compile prompt, and the concept articles update themselves.

You stay in the loop via **Obsidian as the viewer**. You read, critique, and ask follow-up questions. The agent does the filing.

Over weeks, the wiki becomes specific to your research. After ~100 articles, Karpathy writes, you can ask genuinely hard questions and the agent will "go off, research the answers, etc." — the context window holds enough of the wiki to reason across it without needing RAG.

---

## Keep growing it

After the workshop, the loop is:

1. Drop a new paper in `raw/` → ask the agent to update the wiki.
2. Have a new question → ask the agent to write the answer into `wiki/questions/`.
3. Periodically ask the agent to **lint** the wiki — find inconsistencies, suggest new concept articles, propose merges.

The [stretch-goals tutorial](./10-second-brain-stretch) covers linting, the claude-obsidian plugin, and matplotlib-figure outputs.
