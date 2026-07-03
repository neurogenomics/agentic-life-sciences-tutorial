---
layout: docs
title: Getting Started with AI Coding Tools
difficulty: beginner
time_estimate: "20 min"
---

# 🚀 Getting Started with AI Coding Tools

## Watch the full walkthrough

The **YouTube series** is the complete guide: it covers this page and builds your first working agent. Follow the video. The notes below are reference.

<div class="video-embed">
  <iframe
    width="100%"
    height="420"
    src="https://www.youtube.com/embed/videoseries?list=PL4pSvJm1oWAuleZiQf6DMJmhnjGI_mh-l"
    title="Agentic AI in Life Science — full playlist"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen>
  </iframe>
</div>

<p><a href="https://www.youtube.com/playlist?list=PL4pSvJm1oWAuleZiQf6DMJmhnjGI_mh-l" target="_blank" rel="noopener">▶ Open the <strong>Agentic AI in Life Science</strong> playlist on YouTube</a></p>

> Prefer to read? Keep scrolling. Stuck on installation? Jump to [Get OpenCode](./get-opencode) for the illustrated walkthrough.

## Overview

This repo helps the lab adopt agentic work: it shares lessons and optimisations.

Coding agents differ from chatbots: they read and write files on your computer.

---

## Tools

A coding agent runs on your computer: it reads and writes files, runs commands, and works on your project.

- **[GitHub Copilot](https://github.com/features/copilot)** (recommended) — GitHub; CLI or desktop. Follow the [GitHub Education signup guide](github-education) to get Copilot Pro free and install the CLI.
- **[OpenAI Codex](https://github.com/openai/codex)** — OpenAI; CLI and cloud agent.
- **[Claude Code](https://docs.anthropic.com/en/docs/claude-code)** — Anthropic; CLI. Paid.
- **[OpenCode](https://opencode.ai/) + [OpenRouter](https://openrouter.ai)** — open-source; desktop app, many providers.

---

## How AI Coding Tools Work

A coding agent is a stack of three layers:

![Agent → Provider → Model]({{ site.baseurl }}/assets/images/stack-of-agents.svg)

- **Agent** — the program on your computer (or in the cloud) that reads your files, runs commands, and writes code. Examples: GitHub Copilot, Claude Code, OpenCode.
- **Provider** — the service that hosts the model. Examples: GitHub, Anthropic, OpenRouter.
- **Model** — the large language model that generates the code. Examples: Claude Opus 4.5, GPT-4.1, Kimi K2.5.

You choose an agent, connect it to a provider, pick a model. Combinations differ in privacy and cost (see [OpenRouter's privacy and model safety settings](https://openrouter.ai/docs/guides/features/zdr)):

![Privacy comparison across providers]({{ site.baseurl }}/assets/images/table-of-privacy.svg)

> **Note:** Free models on OpenRouter may train on your data. To avoid this, use a paid model or check the model's training policy first.

