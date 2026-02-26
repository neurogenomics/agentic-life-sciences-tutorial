---
layout: default
title: Automated Presentations - From Papers to PowerPoint
---

# 🎓 Automated Presentations: From Papers to PowerPoint

This tutorial shows how to use OpenCode to create a PowerPoint presentation from a scientific paper.

## What you'll learn

- How to summarize scientific papers into presentations
- How to include figures and key takeaways
- How to format slides for journal club

## Skills

Claude Code supports **skills** — reusable, community-contributed prompt templates that extend Claude's capabilities for specific tasks.

- [Browse all Anthropic skills](https://github.com/anthropics/skills)
- [pptx skill](https://github.com/anthropics/skills/tree/main/skills/pptx) — generates PowerPoint files directly from a prompt

The `pptx` skill is particularly useful here: instead of asking Claude to write Python/`python-pptx` code, you can invoke the skill directly with `/pptx` and Claude will handle the presentation creation end-to-end.

## Steps

You can run this in `Plan` mode to optimise the output. Here is a prompt for the paper [Integration of variant annotations using deep set networks boosts rare variant association testing](https://www.nature.com/articles/s41588-024-01919-z):

```
Make me 5-10 slide presentation for Journal club for this paper: https://www.nature.com/articles/s41588-024-01919-z
* Keep word usage low
* Include main figures
* summarise key take aways from paper
* output it as a powerpoint
```

## Results

Here's what it made: [DeepRVAT_JournalClub.pptx](https://github.com/user-attachments/files/25078447/DeepRVAT_JournalClub.pptx)

Example slide:

![Journal club presentation slide](../assets/images/journal_club_slide.png)

## Observations

The formatting is a bit funky and it is not too in-depth. 

## Challenge

What changes in the prompt or in `Plan` mode would you add to make a better output?

Some ideas:
- Ask for specific slide templates or layouts
- Request speaker notes for each slide
- Specify the audience level (beginner, advanced, etc.)
- Ask for a consistent color scheme or theme
- Request more detailed figure annotations
