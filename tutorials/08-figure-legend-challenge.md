---
layout: docs
title: "Challenge: Figure Legend Generator"
difficulty: beginner
time_estimate: "20 min"
---

# Challenge: Figure Legend Generator

Can your agent write a figure legend as well as the authors did?

## The task

1. Pick a figure below and download the image.
2. Give it to your agent and ask for a publication-ready legend.
3. Compare to the original in the paper.

## Tips

- Start in **Plan mode** so the agent asks you what it needs before drafting.
- The **PubMed MCP** and ClawBio's life-sciences skills can pull the paper's methods for extra context.
- Share attempts in the workshop Slack channel.

## Warm-up figures

| Figure | Why | Download |
|---|---|---|
| Palmer Penguins — bill dimensions | Teaching figure, clean 3-species layout | [PNG](https://allisonhorst.github.io/palmerpenguins/reference/figures/culmen_depth.png) |
| Palmer Penguins — flipper vs body mass | Scatter with legend, colour key | [PNG](https://allisonhorst.github.io/palmerpenguins/articles/examples/mass_flipper.png) |

## Neuroscience figures (snRNA-seq / GWAS)

| Paper | Suggested figure | Why it is a good test | Source |
|---|---|---|---|
| Agarwal et al. 2020, *Nat Commun* — human substantia nigra atlas | Fig 1 | Clean UMAP + barplot. Good warm-up. | [PMC7463023](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7463023/) |
| Mathys et al. 2019, *Nature* — snRNA-seq in AD | Fig 2 | Composition + DE gene panels. | [PMC6737283](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6737283/) |
| Skene et al. 2018, *Nat Genet* — cell types in schizophrenia | Fig 3 | GWAS enrichment × cell ontology. | [PMC6546635](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6546635/) |
| Bryois et al. 2020, *Nat Genet* — MAGMA cell-typing | Fig 2 | Trait × cell-type matrix; many labels. | [PMC7610352](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7610352/) |
| Smajić et al. 2022, *Brain* — PD midbrain | Fig 1 | Atlas UMAP split by condition. | [PMC8864739](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8864739/) |
| Siletti et al. 2023, *Science* — human brain atlas | Fig 1 or 3 | 461-cluster UMAP + sunburst hierarchy. | [bioRxiv preprint](https://www.biorxiv.org/content/10.1101/2022.10.12.511898v1) |

## Microscopy figures (hard mode)

| Paper | Suggested figure | Why it is a good test | Source |
|---|---|---|---|
| Kamath et al. 2022, *Nat Neurosci* — PD-vulnerable DA neurons | Fig 4 | smFISH / RNAscope of SOX6, CALB1. 3 channels. | [PMC9477726](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9477726/) |
| Keren-Shaul et al. 2017, *Cell* — DAM microglia in AD | Fig 4 | Iba1 / TREM2 / Clec7a triple-stain around plaques. | [Cell open](https://www.cell.com/cell/fulltext/S0092-8674(17)30578-0) |
| Smajić et al. 2022, *Brain* — PD midbrain IHC | Fig 5 | Iba1 / GFAP staining, PD vs control. | [PMC8864739](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8864739/) |
| La Manno et al. 2021, *Nature* — developing mouse brain atlas | Fig 5 | IHC + spatial transcriptomics overlays. | [PMC8209913](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8209913/) |
| Yao et al. 2023, *Nature* — mouse whole-brain MERFISH | Fig 2 | MERFISH sections registered to CCF. | [PMC10700148](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10700148/) |

**To grab a PMC figure**: open the article, click the figure thumbnail, then "Download image" → save the JPG/TIFF. Or right-click the hi-res preview.

## Why microscopy is the sharper test

Sequencing figures have a predictable grammar (UMAP + heatmap + barplot) and agents learn the template. Microscopy legends force the agent to read marker names, fluorophore colours, scale bars, and conditions off the image itself — that's where vision models most often miss.
