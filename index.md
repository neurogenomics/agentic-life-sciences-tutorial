---
layout: default
---

<section class="hero">
  <h1 class="hero__title">Skills Cookbook</h1>
  <p class="hero__subtitle">Lab guide for adopting agentic work and coding assistants.</p>
</section>

<style>
  .workshop-banner {
    background: linear-gradient(135deg, #1a2a6c 0%, #b21f1f 50%, #fdbb2d 100%);
    color: #fff;
    border-radius: 14px;
    padding: 2rem 2rem 1.75rem;
    margin: 2rem 0 2.5rem;
    box-shadow: 0 6px 24px rgba(0,0,0,0.12);
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
    background: #fdbb2d;
    color: #1a2a6c;
    font-weight: 700;
    font-size: 0.75rem;
    letter-spacing: 0.08em;
    padding: 0.15rem 0.5rem;
    border-radius: 4px;
    margin-bottom: 0.4rem;
  }
</style>

<section class="workshop-banner">
  <p class="workshop-banner__eyebrow">Agentic AI Workshop Series</p>
  <h2>Agentic AI for Neuroscience · 15 April 2026</h2>
  <p>UKDRI workshop series on agentic AI tooling for neuroscience labs. Landing page has QR codes for tutorials, Slack, and the AI strategy form.</p>

  <div class="workshop-banner__cards">
    <a class="workshop-banner__card" href="./tutorials/08-figure-legend-challenge">
      <span class="workshop-banner__featured">Featured Challenge</span>
      <strong>Figure Legend Generator</strong>
      <span>Build the best agent for publication-ready legends. Leaderboard + prize.</span>
    </a>
    <a class="workshop-banner__card" href="./workshops/agentic-ai-neuroscience-2026/">
      <strong>Workshop Landing Page</strong>
      <span>QR codes: tutorials, Slack, AI strategy form.</span>
    </a>
  </div>
</section>

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

</div>

## Prerequisites

- [GitHub Education — Free Copilot Access](./tutorials/github-education) — Apply for GitHub Education benefits and activate Copilot Pro with Claude

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
