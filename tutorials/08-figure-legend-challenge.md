---
layout: docs
title: "Challenge: Figure Legend Generator"
difficulty: beginner
time_estimate: "20 min"
---

# Challenge: Figure Legend Generator

Can your agent write a figure legend as well as the authors did?

## The task

1. Download the figure below.
2. Give it to your agent and ask for a publication-ready legend.
3. Compare to the original legend in the paper.

## The figure

**Karczewski et al. 2020**, *The mutational constraint spectrum quantified from variation in 141,456 humans.* Nature.
[Paper](https://www.nature.com/articles/s41586-020-2308-7) · Fig 1.

![gnomAD Karczewski 2020 Figure 1]({{ '/assets/images/gnomad-karczewski-2020-fig1.webp' | relative_url }})

[**Download figure**]({{ '/assets/images/gnomad-karczewski-2020-fig1.webp' | relative_url }})

## Tips

- Start in **Plan mode** so the agent asks you what it needs before drafting.
- The [**PubMed MCP**](https://modelcontextprotocol.io/) and [**Anthropic's life-sciences skills**](https://www.anthropic.com/solutions/life-sciences) can pull the paper's methods for extra context.
- Share attempts in the workshop Slack channel.

## Impossible mode

For when you've nailed the gnomAD legend and want to break your agent.

**[Cell Metabolism, Figure S1](https://www.sciencedirect.com/science/article/pii/S1550413117306745)**

![Impossible mode figure]({{ '/assets/images/impossible-mode.jpeg' | relative_url }})

[**Download figure**]({{ '/assets/images/impossible-mode.jpeg' | relative_url }})

~30 panels in one figure: IHC, western blots, bar charts, karyograms, micrographs, FISH. Mixed conditions, mixed genotypes, mixed timepoints. No agent writes this legend in one shot.
