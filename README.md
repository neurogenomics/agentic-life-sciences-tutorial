# Skills Cookbook

Lab guide for adopting agentic work and coding assistants.

**[Click here to view tutorials](https://neurogenomics.github.io/skills-cookbook/)**

## Tutorials

1. [Setup](./tutorials/setup.md) - Get started with OpenCode, OpenRouter, and Kimi K2.5
2. [Iris Dataset Analysis](./tutorials/iris-analysis.md) - Data analysis example with AI
3. [Journal Club Slides](./tutorials/journal-club-slides.md) - Create presentations from papers
4. [Rules & Guidelines](./tutorials/rules.md) - Customize AI behavior with rules files
5. [Making Custom Agents](./tutorials/making-agents.md) - Build specialized agents
6. [Multiple Sessions with tmux](./tutorials/tmux-sessions.md) - Run parallel Claude sessions

## Agents

Pre-built agent configurations for specific tasks:

- [Prototyping Agent](./agents/prototyping-agent.yaml) - Quick data prototyping with sampled datasets

---

[View on GitHub](https://github.com/neurogenomics/skills-cookbook)

## FAQ

### What security is in place about my data?

**OpenRouter** (the service we use) has the following privacy protections:

**Never logs by default:**
- Your prompts and responses are never logged
- Only metadata is stored (token counts, latency, performance metrics)
- Generation activity remains accessible to you

**You control your data:**
- Paid requests never route to providers that train on your data
- Configure privacy settings per request or account-wide
- Enable Zero Data Retention (ZDR) for enterprise-grade privacy
- Opt-in to prompt logging for a 1% discount (your choice entirely)

**Provider policies:**
- Each provider has their own data retention policies
- Check OpenRouter's privacy dashboard for details on each provider

Learn more: [OpenRouter Privacy Settings](https://openrouter.ai/settings/privacy)

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

## Motivation

> "Nothing we do as we know it will be the same in three months"
>
> "Code is over"
>
> "We should be burning through a data centre's worth of credits"
