---
layout: docs
title: Getting Started with AI Coding Tools
difficulty: beginner
time_estimate: "20 min"
---

# 🚀 Getting Started with AI Coding Tools

## Overview

This repo is designed to aid the adoption of agentic work in the lab, along with shared lessons and optimisations.

Coding agents are distinct from chatbots because they can read and write files on your computer.

---

## Tools

A coding agent is a program on your computer that reads and writes files, runs commands, and operates on your project — not just a chatbot.

- **[GitHub Copilot](https://github.com/features/copilot)** (recommended) — GitHub; CLI or desktop. Follow the [GitHub Education signup guide](github-education) to get Copilot Pro free and install the CLI.
- **[OpenAI Codex](https://github.com/openai/codex)** — OpenAI; CLI and cloud agent.
- **[Claude Code](https://docs.anthropic.com/en/docs/claude-code)** — Anthropic; CLI. Paid.
- **[OpenCode](https://opencode.ai/) + [OpenRouter](https://openrouter.ai)** — open-source; desktop app, many providers.

---

## How AI Coding Tools Work

A coding agent is not a single thing — it is a stack of three layers:

![Agent → Provider → Model]({{ site.baseurl }}/assets/images/stack-of-agents.svg)

- **Agent** — the program on your computer (or in the cloud) that reads your files, runs commands, and writes code. Examples: GitHub Copilot, Claude Code, OpenCode.
- **Provider** — the service that hosts and serves the AI model. Examples: GitHub, Anthropic, OpenRouter.
- **Model** — the large language model that actually generates the code. Examples: Claude Opus 4.5, GPT-4.1, Kimi K2.5.

You choose an agent, connect it to a provider, and pick a model. Different combinations have different privacy and cost implications (see [OpenRouter's privacy and model safety settings](https://openrouter.ai/docs/guides/features/zdr)):

![Privacy comparison across providers]({{ site.baseurl }}/assets/images/table-of-privacy.svg)

> **Note:** Free models on OpenRouter may train on your interactions. If data privacy is important, use a paid model or check the model's training policy on OpenRouter before use.

