---
layout: docs
title: Creating Rules and Memory
---

# Creating rules and memory

Your coding agent can use `.md` files to save information and follow standing instructions across sessions.

## Making a rule file

Common rule file names are `AGENTS.md` (OpenCode and cross-tool standard), `CLAUDE.md` (Claude Code), and `.github/copilot-instructions.md` (GitHub Copilot).

Best practice is to create a `.md` file containing your desired rules in the root of your project folder.

Here is text for you to start with. Copy and paste it into the `AGENTS.md` file you make in the next step:

```
1. First, think through the problem. Read the codebase and write a plan in tasks/todo.md.
2. The plan should be a checklist of todo items.
3. Check in with me before starting work — I'll verify the plan.
4. Then, complete the todos one by one, marking them off as you go.
5. At every step, give me a high-level explanation of what you changed.
6. Keep every change simple and minimal. Avoid big rewrites.
7. At the end, add a review section in todo.md summarizing the changes.
8. Make a memory.md file and todo.md file to store information during the session.
```

Choose one:

1. Open RStudio > `File` > `New File` > `Markdown File` > paste text and save as `AGENTS.md`
2. Open a text editor (Notepad, TextEdit, Visual Studio Code) > paste text and save as `AGENTS.md`
3. In Terminal/Console make a file in your project directory (`touch path/to/folder/AGENTS.md`)

## Start using your rules

Let your agent know that the file exists by running `/init` in `Build` mode (or starting a fresh session).

Now the agent will use `AGENTS.md` as a living document that you can update as your project evolves, and maintain `memory.md` and `todo.md` to preserve context between sessions.
