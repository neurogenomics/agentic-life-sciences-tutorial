---
layout: docs
title: "Agentic AI for Life Sciences — Physalia, 3–4 December 2026"
permalink: /workshops/agentic-ai-for-life-sciences-physalia-3-4-december-2026/
---

# Agentic AI for Life Sciences

**Physalia Courses · online · 3–4 December 2026 · 3:00–6:00 PM CET both days**

Instructor: Jay Moore, Imperial College London / UK Dementia Research Institute. Course listing: [physalia-courses.org](https://www.physalia-courses.org/courses-workshops/agentic-ai/).

---

## Before the course

Finish setup before Thursday, so that course time goes on the material.

1. Install **Claude Code** (the course default). If you already use OpenCode or GitHub Copilot, you can keep it.
2. Follow [Setup]({{ site.baseurl }}/tutorials/01-setup) (or the [Claude Code docs](https://docs.anthropic.com/en/docs/claude-code)).
3. Send the agent one prompt and confirm that it replies.
4. Install Python 3.
5. Download the three [sandbox files]({{ site.baseurl }}/tutorials/12-sandbox-check#files) into an empty folder for the Day 1 exercise.

Optional reading, both short:

- Table 2 of [Harness-Bench v1](https://arxiv.org/html/2605.27922v1).
- Topaz et al., [Fabricated citations: an audit across 2·5 million biomedical papers](https://doi.org/10.1016/S0140-6736(26)00603-3), *Lancet* 2026.

---

## Terms used in the course

| Term | Meaning |
|---|---|
| Model | The language model that writes text and proposes actions |
| Provider | The service that hosts the model |
| Agent | A model that works in a loop: it requests a tool, reads the result and decides the next step |
| Tool | An action the model can request: read a file, run a command, search |
| Harness | The software around the model that manages tools, context, permissions and execution |
| Context | Everything sent to the model on each turn: instructions, files, history and tool output |
| Subagent | A second agent started by the main agent for one task, with its own context; it returns a summary |
| Swarm | Many agents working in parallel on one job, coordinated by an orchestrator |
| Loop | Repeating a task until a check passes or a limit is reached |
| Skill | A reusable written procedure that the agent loads when a task needs it |
| Rule file | Standing instructions loaded every session, such as `AGENTS.md` or `CLAUDE.md` |
| Memory | Notes the harness saves to disk and reloads; the model itself keeps nothing between sessions |
| RAG | Retrieval-augmented generation: fetch relevant documents first, then answer from them |
| MCP | Model Context Protocol: a standard way to connect an agent to outside tools and data |

---

## Day 1 — How one agent works (and how it fails) · Thursday 3 December

Each day runs as three 50-minute blocks with 10-minute breaks, led by lectures and live demos, with **one focused hands-on exercise** per day followed by a group debrief.

| Time (CET) | Part | Material |
|---|---|---|
| 3:00–3:50 | 1. Introduction to agentic AI | **Lecture & discussion:** opening poll · the agent–provider–model stack · chat assistants vs agents · failure modes and data privacy · the fabricated-citations audit (Topaz et al.) · Harness-Bench reading |
| 3:50–4:00 | *Break* | |
| 4:00–4:50 | 2. Context engineering, cost and skills | **Lecture & live demo:** prompt structure · plan mode · the context window and context rot · model pricing and token economics ([Managing Context]({{ site.baseurl }}/tutorials/05-context-management)) · skills ([Journal Club Slides]({{ site.baseurl }}/tutorials/03-journal-club-slides) demo) |
| 4:50–5:00 | *Break* | |
| 5:00–6:00 | 3. Acting, failing and verifying | **Live demo:** [Penguins Analysis]({{ site.baseurl }}/tutorials/02-penguins-analysis) (`Plan` → `Build`) · **Hands-on exercise (20 min):** [Sandbox: Act, Fail, Check]({{ site.baseurl }}/tutorials/12-sandbox-check) · **Debrief (15 min):** what failed and what verification caught |

## Day 2 — From one agent to a research system · Friday 4 December

| Time (CET) | Part | Material |
|---|---|---|
| 3:00–3:50 | 4. Tools, MCP and interactive data portals | **Lecture & live demo:** RAG and MCP · PubMed connection · agent-built research tools and data privacy with human/clinical datasets · live demo of [Single Cell Portal]({{ site.baseurl }}/tutorials/04-single-cell-portal) and publishing to GitHub |
| 3:50–4:00 | *Break* | |
| 4:00–4:50 | 5. Loops, subagents and swarms | **Lecture (15 min):** loops, subagents and swarms — when to use each, failure modes, token cost · **Hands-on exercise (25 min):** [Loops, Subagents and Swarms]({{ site.baseurl }}/tutorials/13-subagents-swarms-loops) (checking references against PubMed) · **Debrief (10 min)** |
| 4:50–5:00 | *Break* | |
| 5:00–6:00 | 6. Research workflows, governance and second brain | **Lecture, demo & discussion:** rule files (`AGENTS.md`, `CLAUDE.md`) · end-to-end research workflows · live demo of [Second Brain]({{ site.baseurl }}/tutorials/09-second-brain) · designing a lab AI use policy · closing poll and Q&A |

---

## Loops, subagents and swarms

Part 5 moves from one agent to several.

- **Loop** — repeat until a check passes, with a limit on rounds.
- **Subagent** — hand one independent task to a second agent and get a summary back.
- **Swarm** — split a job across many agents and verify what returns.

The [exercise]({{ site.baseurl }}/tutorials/13-subagents-swarms-loops) uses all three to check a reference list against PubMed.

---

## Course paper: fabricated citations

Topaz M, Roguin N, Gupta P, Zhang Z, Peltonen L-M. Fabricated citations: an audit across 2·5 million biomedical papers. *Lancet* 2026; 407: 1779–81. [doi:10.1016/S0140-6736(26)00603-3](https://doi.org/10.1016/S0140-6736(26)00603-3).

| Measure | Reported figure |
|---|---|
| Papers scanned | 2·5 million, PubMed Central Open Access, 1 January 2023 to 18 February 2026 |
| References verified | 97·1 million |
| Fabricated citations | 4,046, in 2,810 articles |
| Change since 2023 | More than 12-fold, with the sharpest rise from mid-2024 |
| Affected articles with no publisher action | 98·4% at the time of the audit |

Source: [University of Eastern Finland summary](https://www.uef.fi/en/article/international-ai-assisted-audit-finds-fabricated-references-in-nearly-3000-peer-reviewed-medical), 8 May 2026. The *Lancet* published a [correction](https://doi.org/10.1016/S0140-6736(26)01339-5) to the letter in July 2026.

Questions for Part 1:

- How would you check one reference?
- How would you check two hundred?
- What does a missing database record prove, and what does it not prove?

---

## The two polls

The course opens and closes with the same two questions, answered anonymously on a 1–5 scale.

- How much could AI help you do your work over the next 12 months?
- How much risk could AI create for you in your work over the next 12 months?

The two answers are kept separate. There is no preferred answer.

---

## After the course

Self-paced tutorials for the demos and stretch topics:

- [Penguins Analysis]({{ site.baseurl }}/tutorials/02-penguins-analysis)
- [Journal Club Slides]({{ site.baseurl }}/tutorials/03-journal-club-slides)
- [Single Cell Portal]({{ site.baseurl }}/tutorials/04-single-cell-portal)
- [Second Brain]({{ site.baseurl }}/tutorials/09-second-brain) and [Stretch Goals]({{ site.baseurl }}/tutorials/10-second-brain-stretch)
- [Making Custom Agents]({{ site.baseurl }}/tutorials/making-agents)
- [Agent Package Manager]({{ site.baseurl }}/tutorials/07-apm)
- [Pharmacogenomics with ClawBio]({{ site.baseurl }}/tutorials/11-pharmacogenomics)
