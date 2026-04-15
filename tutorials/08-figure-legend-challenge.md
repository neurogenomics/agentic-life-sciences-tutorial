---
layout: docs
title: "Challenge: Figure Legend Generator"
difficulty: intermediate
time_estimate: "45 min"
---

# Challenge: Build a Figure Legend Generator

A workshop challenge. Take a published figure, strip its legend, and see if an agent can write it back. No scoring, no leaderboard — just a tight task to practise scoping an agent, feeding it images, and iterating on prompts.

## The brief

Build a tool that takes a **figure image** and returns a **publication-ready legend** for it. Once you have something working, download one of the reference figures below, feed it in, and compare your agent's output to the published legend.

## Start in Plan mode

Do not jump straight to code. Switch to `Plan` mode first and let the agent question you about:

- Which journal style to target
- Whether it should read the methods section
- How to handle multi-panel figures (A, B, C...)
- What file formats to accept (PNG, JPG, PDF page)

Only exit Plan mode once the pipeline is clear.

## Reference figures

Pick one. Download the image, note the published legend, then hide the legend from the agent.

| Figure | Source | Direct download |
|---|---|---|
| Palmer Penguins bill length by species | Horst 2020 (teaching) | [PNG](https://allisonhorst.github.io/palmerpenguins/reference/figures/culmen_depth.png) |
| Palmer Penguins flipper vs body mass | Horst 2020 (teaching) | [PNG](https://allisonhorst.github.io/palmerpenguins/articles/examples/mass_flipper.png) |

For real paper figures, pull an open-access paper from PubMed Central. Any PMC article has figures available as direct JPG or TIFF at URLs like `https://www.ncbi.nlm.nih.gov/pmc/articles/PMC{ID}/figure/F1/`. Right-click → Save Image.

## Hints

- **Agentic Life Sciences skills for life sciences.** The ClawBio skill library ships with skills like `pubmed-summariser`, `lit-synthesizer`, and `protocols-io`. The PubMed MCP can fetch a paper's methods in one call — useful context for the legend.
- **Feed it references.** A legend generator is only as good as its reference corpus. Save 3–5 legends from your field into a folder and point the agent at them before it drafts.
- **Iterate with diffs.** After the agent writes a legend, paste the real published legend next to it. Ask the agent what it missed and to propose one change to its own prompt.
- **Multi-panel is the hard bit.** Most journal figures have panels A–F. A naive vision prompt blurs them. Ask the agent in Plan mode how it will segment panels before describing them.

## What a good legend contains

- A one-sentence title at the top
- Panel-by-panel description in order
- Sample sizes, statistical tests, error bars, scale bars
- Every abbreviation defined on first use
- Colour keys for any grouping

## Deliverable

A working pipeline that takes a figure image and returns a legend. Run it on one of the reference figures, upload both the original image and the agent's legend to the workshop Slack channel, and paste the published legend underneath. Compare by eye.

No prizes. No scoring rubric. The win is noticing where the agent is strong, where it hallucinates, and what the smallest fix is that closes the gap.
