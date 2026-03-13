# Skills Cookbook

Lab guide for adopting agentic work and coding assistants.

**View tutorials:** [GitHub Pages](https://neurogenomics.github.io/agentic-life-sciences-tutorial/) · [Browse in GitHub](./tutorials)

## Tutorials

1. [Setup](./tutorials/01-setup.md) - Get started with OpenCode, OpenRouter, and Kimi K2.5
2. [Penguins Dataset Analysis](./tutorials/02-penguins-analysis.md) - Data analysis example with AI
3. [Journal Club Slides](./tutorials/03-journal-club-slides.md) - Create presentations from papers
4. [Data Portal for Single Cell Sequencing](./tutorials/04-single-cell-portal.md) - Interactive viewer for scRNA-seq data
5. [Managing Context: Reducing Hallucinations and Run Costs](./tutorials/05-context-management.md) - Understand context windows, context rot, PLAN.md workflow, and how to use /compact
6. [APM](./tutorials/07-apm.md) - Dependency manager for AI context — declare, version, and inject context modules automatically

## Prerequisites

- [GitHub Education — Free Copilot Access](./tutorials/github-education.md) - Apply for GitHub Education benefits and activate Copilot Pro with Claude

## Agents

Pre-built agent configurations for specific tasks:

- [Prototyping Agent](./agents/prototyping-agent.yaml) - Quick data prototyping with sampled datasets

---

[View on GitHub](https://github.com/neurogenomics/agentic-life-sciences-tutorial)

## FAQ

### What security is in place about my data?

**OpenRouter** won't log data and has other security measures in place: [OpenRouter Privacy Settings](https://openrouter.ai/settings/privacy)

## Useful Commands

| Command | Description |
|---------|-------------|
| `/init` | Generates a `CLAUDE.md` file with project context and conventions |
| `/rewind` | Reverts the conversation to a previous point, undoing recent actions |
| `/resume` | Resumes a previous conversation session where you left off |

## Extra Resources

- [Anthropic's Guide to Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents)
- [claude-mem: Memory System](https://github.com/thedotmack/claude-mem)
- [Claude Code: A Highly Agentic Coding Assistant (DeepLearning.AI)](https://learn.deeplearning.ai/courses/claude-code-a-highly-agentic-coding-assistant)
- [OpenCode Retention Policy](https://openrouter.ai/docs/guides/features/zdr#openrouters-retention-policy)

## Motivation

> "Nothing we do as we know it will be the same in three months"
>
> "Code is over"
>
> "We should be burning through a data centre's worth of credits"
> - Nathan
