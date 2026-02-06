# Creating rules and memory

Your program can use files marked as `.md` to save information. You can also supply it your own files to provide rules and guidance to customise its behaviour.

## Making a rule file

The file name needs to be one of: AGENTS, CONTRIBUTING, README, DEVELOPER, STYLEGUIDE

Best practice is the make a `.md` file containing your desired rules. Save the file in your project folder you selected in OpenCode/ClaudeCode.

Here is text for you to start with. Copy and paste it into the Agents.md file you will make in the next step:

```
1. First, think through the problem. Read the codebase and write a plan in tasks/todo
2. The plan should be a checklist of todo items.
3. Check in with me before starting work-I'll verify the plan.
4. Then, complete the todos one by one, marking them off as you go.
5. At every step, give me a high-level explanation of what you changed.
6. Keep every change simple and minimal. Avoid big rewrites.
7. At the end, add a review section in todo.md summarizing the changes.
8. Make a memory file and todo file to store information during the session
```

Choose one:

1. Open Rstudio > `File` > `New File` > `Markdown File` > paste text and save as `AGENTS.md`
2. Open a text editor (Notepad, TextEdit, Virtual Stusio Code) > paste text and save as `AGENTS.md`
3. In Terminal/Console make a file in your project directory  (`touch path/to/folder/AGENTS.md`)

Variations:
* Name the rules it `copilot-instructions.md`

## Start using your rules

Let your model now that the file exists by running `/init` in `Build` mode. 

Now the program will use `AGENTS.md` a living document that should be updated manually. It will make a `memory.md` and `todo.md` which it will update. These will provide information for the project between
