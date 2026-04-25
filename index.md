---
layout: default
---

<section class="hero">
  <h1 class="hero__title">Skills Cookbook</h1>
  <p class="hero__subtitle">Lab guide for adopting agentic work and coding assistants.</p>
</section>

<style>
  .workshop-banner {
    background: linear-gradient(135deg, #0b1a4a 0%, #1d3fb3 45%, #3b6bff 100%);
    color: #fff;
    border-radius: 14px;
    padding: 2rem 2rem 1.75rem;
    margin: 2rem 0 2.5rem;
    box-shadow: 0 6px 24px rgba(11, 15, 26, 0.18);
  }
  .workshop-banner__eyebrow {
    font-size: 0.8rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    opacity: 0.85;
    margin: 0 0 0.4rem;
  }
  .workshop-banner h2 {
    margin: 0 0 0.5rem;
    font-size: 1.8rem;
    color: #fff;
    border: none;
  }
  .workshop-banner p { margin: 0 0 1.25rem; opacity: 0.95; }
  .workshop-banner__cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1rem;
  }
  .workshop-banner__card {
    display: block;
    background: rgba(255,255,255,0.12);
    backdrop-filter: blur(4px);
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 10px;
    padding: 1rem 1.1rem;
    color: #fff;
    text-decoration: none;
    transition: transform 0.15s ease, background 0.15s ease;
  }
  .workshop-banner__card:hover {
    background: rgba(255,255,255,0.22);
    transform: translateY(-2px);
  }
  .workshop-banner__card strong { display: block; font-size: 1.05rem; margin-bottom: 0.2rem; }
  .workshop-banner__card span { font-size: 0.9rem; opacity: 0.9; }
  .workshop-banner__featured {
    display: inline-block;
    background: #7ea0ff;
    color: #0b1a4a;
    font-weight: 700;
    font-size: 0.75rem;
    letter-spacing: 0.08em;
    padding: 0.15rem 0.5rem;
    border-radius: 4px;
    margin-bottom: 0.4rem;
  }
</style>

<section class="workshop-banner" style="background: linear-gradient(135deg, #0a3a26 0%, #0f6b4a 45%, #1f9d6e 100%);">
  <p class="workshop-banner__eyebrow">Agentic AI Workshop Series · Session 3 · with ClawBio</p>
  <h2>The Future of Biology Is Agentic · 29 April 2026</h2>
  <p>Co-hosted with <a href="https://clawbio.ai" target="_blank" rel="noopener" style="color: #cfe7da; text-decoration: underline;">ClawBio</a>. A 60 min hands-on session: install ClawBio, run a real pharmacogenomics report on demo (or your own) genetic data, and have your agent interpret CYP2D6 metabolizer status against CPIC drug guidelines — all locally, in under a second.</p>

  <div class="workshop-banner__cards">
    <a class="workshop-banner__card" href="./workshops/the-future-of-biology-is-agentic-29-april-2026/">
      <span class="workshop-banner__featured" style="background: #4ec39a; color: #0a3a26;">Next Workshop</span>
      <strong>Workshop Landing Page · 29 April</strong>
      <span>Plan, QR codes, install routes, prerequisites.</span>
    </a>
    <a class="workshop-banner__card" href="./tutorials/11-pharmacogenomics">
      <strong>Pharmacogenomics tutorial</strong>
      <span>VCF / 23andMe in → CPIC dose-adjustment card out, via ClawBio.</span>
    </a>
    <a class="workshop-banner__card" href="https://clawbio.ai" target="_blank" rel="noopener">
      <strong>ClawBio</strong>
      <span>Bioinformatics-native AI agent skill library. Local-first, reproducible.</span>
    </a>
  </div>
</section>

<details style="margin: 1.5rem 0 1rem; padding: 0.75rem 1rem; background: rgba(11,15,26,0.03); border-radius: 8px;">
  <summary style="cursor: pointer; font-weight: 600; color: #555;">Previous: 22 April 2026 · Second Brain</summary>
  <div style="margin-top: 0.75rem; padding-left: 0.5rem;">
    <p><a href="./workshops/agentic-ai-neuroscience-22-april-2026/">22 April landing page</a> · <a href="./tutorials/09-second-brain">Second Brain walkthrough</a> · <a href="./workshops/22-april-slides.html">Process slides</a></p>
  </div>
</details>

<details style="margin: 0 0 2.5rem; padding: 0.75rem 1rem; background: rgba(11,15,26,0.03); border-radius: 8px;">
  <summary style="cursor: pointer; font-weight: 600; color: #555;">Previous: 15 April 2026 · Figure Legend Challenge</summary>
  <div style="margin-top: 0.75rem; padding-left: 0.5rem;">
    <p><a href="./workshops/agentic-ai-neuroscience-2026/">15 April landing page</a> · <a href="./tutorials/08-figure-legend-challenge">Figure Legend Generator challenge</a></p>
  </div>
</details>

## Tutorials

<div class="tutorial-cards">

  <a class="tutorial-card" href="./tutorials/01-setup">
    <div class="tutorial-card__header">
      <span class="tutorial-card__number">01</span>
      <span class="difficulty-badge difficulty-badge--beginner badge-beginner">Beginner</span>
      <span class="time-estimate">20 min</span>
    </div>
    <h3 class="tutorial-card__title">Setup</h3>
    <p class="tutorial-card__desc">Get started with AI coding tools — install OpenCode, connect to OpenRouter, and run your first Kimi K2.5 prompt.</p>
  </a>

  <a class="tutorial-card" href="./tutorials/02-penguins-analysis">
    <div class="tutorial-card__header">
      <span class="tutorial-card__number">02</span>
      <span class="difficulty-badge difficulty-badge--beginner badge-beginner">Beginner</span>
      <span class="time-estimate">30 min</span>
    </div>
    <h3 class="tutorial-card__title">Penguins Analysis</h3>
    <p class="tutorial-card__desc">Data analysis with AI assistants — explore a real dataset, write code with suggestions, and produce publication-ready plots.</p>
  </a>

  <a class="tutorial-card" href="./tutorials/03-journal-club-slides">
    <div class="tutorial-card__header">
      <span class="tutorial-card__number">03</span>
      <span class="difficulty-badge difficulty-badge--intermediate badge-intermediate">Intermediate</span>
      <span class="time-estimate">25 min</span>
    </div>
    <h3 class="tutorial-card__title">Journal Club Slides</h3>
    <p class="tutorial-card__desc">Create presentations from papers — feed a PDF to an agent and receive a structured Reveal.js slide deck ready to present.</p>
  </a>

  <a class="tutorial-card" href="./tutorials/04-single-cell-portal">
    <div class="tutorial-card__header">
      <span class="tutorial-card__number">04</span>
      <span class="difficulty-badge difficulty-badge--intermediate badge-intermediate">Intermediate</span>
      <span class="time-estimate">30 min</span>
    </div>
    <h3 class="tutorial-card__title">Single Cell Portal</h3>
    <p class="tutorial-card__desc">Build an interactive scRNA-seq viewer — scaffold a Shiny/web app that lets users explore dimensionality-reduction plots.</p>
  </a>

  <a class="tutorial-card" href="./tutorials/05-context-management">
    <div class="tutorial-card__header">
      <span class="tutorial-card__number">05</span>
      <span class="difficulty-badge difficulty-badge--advanced badge-advanced">Advanced</span>
      <span class="time-estimate">20 min</span>
    </div>
    <h3 class="tutorial-card__title">Context Management</h3>
    <p class="tutorial-card__desc">Understand context windows and costs — learn how context rot develops and how to use <code>/compact</code> to keep runs cheap and accurate.</p>
  </a>

  <a class="tutorial-card" href="./tutorials/08-figure-legend-challenge">
    <div class="tutorial-card__header">
      <span class="tutorial-card__number">07</span>
      <span class="difficulty-badge difficulty-badge--intermediate badge-intermediate">Challenge</span>
      <span class="time-estimate">45 min</span>
    </div>
    <h3 class="tutorial-card__title">Figure Legend Generator</h3>
    <p class="tutorial-card__desc">Workshop challenge — build an agent that writes publication-ready figure legends. Best generator wins.</p>
  </a>

  <a class="tutorial-card" href="./tutorials/07-apm">
    <div class="tutorial-card__header">
      <span class="tutorial-card__number">08</span>
      <span class="difficulty-badge difficulty-badge--advanced badge-advanced">Advanced</span>
      <span class="time-estimate">30 min</span>
    </div>
    <h3 class="tutorial-card__title">APM</h3>
    <p class="tutorial-card__desc">Dependency manager for AI context — use the Agent Package Manager to declare, version, and inject context modules automatically.</p>
  </a>

  <a class="tutorial-card" href="./tutorials/09-second-brain">
    <div class="tutorial-card__header">
      <span class="tutorial-card__number">09</span>
      <span class="difficulty-badge difficulty-badge--intermediate badge-intermediate">Intermediate</span>
      <span class="time-estimate">70 min</span>
    </div>
    <h3 class="tutorial-card__title">Second Brain</h3>
    <p class="tutorial-card__desc">Build a personal research wiki from your own papers — drop PDFs in <code>raw/</code>, have the agent compile summaries, concept articles and backlinks, then query across it.</p>
  </a>

  <a class="tutorial-card" href="./tutorials/10-second-brain-stretch">
    <div class="tutorial-card__header">
      <span class="tutorial-card__number">10</span>
      <span class="difficulty-badge difficulty-badge--advanced badge-advanced">Advanced</span>
      <span class="time-estimate">30 min</span>
    </div>
    <h3 class="tutorial-card__title">Second Brain — Stretch Goals</h3>
    <p class="tutorial-card__desc">Once your wiki works — run a linting pass, add the claude-obsidian plugin, render matplotlib figures from frontmatter, turn answers into Marp decks, vibe-code a search engine.</p>
  </a>

  <a class="tutorial-card" href="./tutorials/11-pharmacogenomics">
    <div class="tutorial-card__header">
      <span class="tutorial-card__number">11</span>
      <span class="difficulty-badge difficulty-badge--intermediate badge-intermediate">Intermediate</span>
      <span class="time-estimate">30 min</span>
    </div>
    <h3 class="tutorial-card__title">Pharmacogenomics with ClawBio</h3>
    <p class="tutorial-card__desc">Install ClawBio, run a pharmacogenomics report on demo (or your own) genetic data, and have your agent translate CYP2D6 metabolizer status into CPIC dose-adjustment recommendations.</p>
  </a>

</div>

## Prerequisites

- [GitHub Education — Free Copilot Access](./tutorials/github-education) — Apply for GitHub Education benefits and activate Copilot Pro with Claude
- [Get OpenCode — Download and Connect to Copilot](./tutorials/get-opencode) — Install OpenCode, sign in with GitHub, and pick Claude Opus 4.5

## Extra Resources

- [Anthropic's Guide to Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents)
- [claude-mem: Memory System](https://github.com/thedotmack/claude-mem)
- [Claude Code: A Highly Agentic Coding Assistant (DeepLearning.AI)](https://learn.deeplearning.ai/courses/claude-code-a-highly-agentic-coding-assistant)

## Motivation

> "Nothing we do as we know it will be the same in three months"
>
> "Code is over"
>
> "We should be burning through a data centre's worth of credits"
> — Nathan
