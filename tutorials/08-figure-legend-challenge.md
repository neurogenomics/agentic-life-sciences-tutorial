---
layout: docs
title: "Challenge: Figure Legend Generator"
difficulty: intermediate
time_estimate: "45 min"
---

# Challenge: Who Can Build the Best Figure Legend Generator?

A workshop challenge. Build an agent that takes a figure (image or panel) and returns a publication-ready legend. Best generator wins.

## What you'll learn

- How to scope an agent to a narrow, useful task
- How to feed images and context into a coding agent
- How to evaluate agent outputs against real papers

## The brief

Build a tool that accepts:

- A figure image (PNG, JPG, or PDF page), and optionally
- A short methods blurb or the source paper

...and returns a **figure legend** in the style of a target journal (*Nature*, *Cell*, *eLife*, or *bioRxiv preprint*).

A good legend:

- Opens with a one-sentence title summarising the figure
- Describes each panel (A, B, C...) in order
- Names statistical tests, sample sizes, error bars, scale bars
- Defines every abbreviation and colour code
- Ends with data-availability or significance markers where relevant

## Suggested approach

1. **Start in `Plan` mode.** Ask the agent to sketch the pipeline before writing code.

2. **Pick a framework.** Any of these work:
   - Python script + Anthropic SDK (vision model)
   - OpenCode agent with a custom skill
   - Claude Code slash command (`/legend <image>`)

3. **Give the agent reference legends.** Paste 3–5 legends from real papers in your field into a `references/` folder. The agent should read these before drafting.

4. **Prompt template to start from:**

```
You are a figure-legend writer for {journal}.
Given this figure image and optional methods context, write a legend that:
- Opens with a bold one-sentence title
- Describes panels A-Z in order
- Names n, statistical tests, error bars, scale bars
- Defines every abbreviation on first use
- Matches the voice of the reference legends in references/

Figure: {attach}
Methods context: {paste or "none"}
Target journal: {Nature | Cell | eLife | bioRxiv}
```

5. **Iterate.** Run the agent on a figure, diff its legend against the published one, feed the diff back, and ask it to update its own prompt or reference set.

## Test set

Use these figures as a shared leaderboard:

| Figure | Source | Why it is hard |
|---|---|---|
| Siletti et al. 2023 Fig 1 | Science | 8 panels, UMAPs + sunburst |
| Skene & Grant 2016 Fig 2 | Front. Neurosci. | Cell-type enrichment, MAGMA |
| Palmer Penguins teaching fig | Horst 2020 | Simple baseline, everyone can run |

Score each legend out of 10 against the published original. Categories:

- Accuracy (are panel descriptions correct?)
- Completeness (stats, n, scale bars)
- Style match (does it sound like the journal?)
- Brevity

## Bonus objectives

- Make it work on a **multi-panel PDF page** by detecting sub-panels first
- Add a `--journal` flag that swaps in the right style guide
- Wrap it as an **APM module** so other agents can call `legend.generate(figure)`

## Submitting

Push your generator to a branch of this repo under `challenges/figure-legend/<your-name>/`. Include:

- `README.md` with run instructions
- `examples/` folder with 3 input figures and generated legends
- A `score.md` with your own scoring against the published originals

The agent that scores highest on the shared test set, averaged across three judges, wins the workshop prize.

## Why this task

Figure legends are the highest-signal text in a paper. They compress methods, results, and statistics into a few hundred words. A reliable legend generator saves every bench scientist hours and is a clean benchmark for agent quality: the ground truth is already published, and bad outputs are obvious.
