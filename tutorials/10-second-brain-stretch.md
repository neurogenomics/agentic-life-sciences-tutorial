---
layout: docs
title: Second Brain — Stretch Goals
difficulty: advanced
time_estimate: "30 min"
---

# 🧠 Second Brain — Stretch Goals

Finished the [main Second Brain tutorial](./09-second-brain) early? Pick any of these.

---

## 1 · Linting pass

Ask the agent to do a health check on the wiki you just built.

Paste into opencode:

```
You are auditing the wiki/ directory. Produce a short markdown report at
wiki/_lint-report.md listing:

1. Files missing required frontmatter fields (title, tags, sources).
2. Wiki-links that point to non-existent files.
3. Paper summaries that are noticeably shorter or longer than average.
4. Concept articles that link to fewer than 2 papers (probably too thin).
5. Themes that appear across 3+ papers but have no concept article yet.
6. For each issue, a one-line fix suggestion.

Do not change any files yet. Just write the report.
```

Read the report, agree or disagree with each finding, then ask the agent to apply the fixes you approve.

---

## 2 · Claude-Obsidian plugin

The [claude-obsidian plugin](https://github.com/AgriciDaniel/claude-obsidian) lets Claude chat directly **inside** Obsidian, alongside opencode. Use opencode for long-running compile/edit jobs, and the plugin for quick conversational lookups without leaving the vault.

1. In Obsidian: `Settings → Community plugins → Browse`, search "Claude".
2. Install and enable the plugin.
3. Paste an Anthropic API key (different from your OpenRouter key — ask Jay for one if you don't have your own).
4. Open the plugin's side panel and ask: *"Summarise the concept article on [topic] in two sentences."*

The plugin reads the current note as context. Handy for "what did I write about this again?" questions.

---

## 3 · Matplotlib figure from the wiki

Have the agent write a small Python script that reads wiki metadata and renders a figure.

```
Write scripts/citation_timeline.py that:

1. Walks wiki/papers/*.md and parses the YAML frontmatter.
2. Extracts the publication year from each paper.
3. Renders a histogram of papers by year using matplotlib.
4. Saves the PNG to wiki/figures/citation_timeline.png.

Then run it and show me the result.
```

Other figure ideas:

- **Concept co-occurrence matrix** — which concept articles share paper references?
- **Tag cloud** — frequency of tags across `wiki/papers/*.md`.
- **Backlink graph** — Obsidian has a native graph view; you can also export via the agent.

Drop the figure back into Obsidian and `[[link]]` it from `INDEX.md`.

---

## 4 · Marp slide deck

Turn your cross-paper Q&A answer into a slide deck you could present.

```
Read wiki/questions/<your-answer>.md. Convert it into a Marp slide deck
at wiki/slides/<your-answer>.md with:

- Title slide
- One slide per main point
- Quote slides for direct evidence
- A "further questions" slide
- Speaker notes under each slide

Use Marp's front-matter format so it renders in the Marp for Obsidian
plugin or Marp CLI.
```

Install [Marp for Obsidian](https://github.com/DMeechan/Obsidian-Marp-Slides-Plugin) or [Marp CLI](https://github.com/marp-team/marp-cli) to preview and export to PDF / HTML.

---

## 5 · Hook up a search engine

Karpathy's original post mentions building a naive search engine over the wiki as a tool. This is a 30-min job with an agent.

```
Build scripts/search.py that:

1. Walks wiki/**.md and builds a simple TF-IDF index in memory.
2. Exposes a CLI: `python scripts/search.py "query terms"` prints
   the top 5 matching files with a 1-line snippet.
3. Also writes an HTML interface at wiki/_search.html that I can
   open in a browser.

Then test it with 3 example queries.
```

Once this exists, you can give the agent CLI access to your search — "use scripts/search.py to find all papers mentioning X, then write a concept article on them" — and queries become much cheaper than re-reading every file.

---

## 6 · Incremental growth loop

Set up the routine so the vault grows without you managing it.

Create `scripts/add-paper.sh`:

```bash
#!/usr/bin/env bash
set -euo pipefail
paper="$1"
cp "$paper" raw/
echo "Added $paper to raw/. Now run the compile prompt in opencode."
```

Or just tell the agent: *"Every time I drop a new PDF in `raw/`, do the following without asking: write its summary, update the index, and update any concept article that touches it. Wait for my approval before merging concept changes."*

---

## Credits

- [Andrej Karpathy — LLM Knowledge Bases](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)
- [claude-obsidian](https://github.com/AgriciDaniel/claude-obsidian)
- [Marp](https://marp.app/)
