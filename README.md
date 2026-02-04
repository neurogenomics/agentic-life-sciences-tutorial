

## Overview

This repo is designed to aid the adoption of agentic work in the lab, along with shared lessons and optimisations. 

Coding agents are distinct from chatbots because they can read and write files on your computer.

Here are the current tools we are using:

* [OpenCode](https://opencode.ai/) agent interface is an open source alternative to Claude Code
* [OpenRouter](openrouter.ai) as provider (single subscription to access many models)
* [Kimi K2.5](https://www.kimi.com/en) is a current strong coding model

To access Anthropic's Opus 4.5, we are accessing through [GitHub Education](https://github.com/education):
* Using [OpenCode](https://opencode.ai/) as the interface to run the models
* Selecting [GitHub Copilot](https://github.com/features/copilot) as provider: `Connect provider`
* Select Opus 4.5 or other models available through GitHub Copilot

## Setup

Download [OpenCode Desktop App](https://opencode.ai/download)

Make a new folder to begin. Example create a `testing AI` folder in your `Documents`. To use these models, it needs to be given a project folder to work in.

Open OpenCode App on your computer
* Click ⚙️ `Settings` 
* Navigate to `Providers`
* Select to `OpenRouter`
* Enter API key (supplied separately via email)
* At bottom select `Kimi K2.5` - this will listed under OpenRouter
* Click ＋ button on the left to make a new project. Then choose your folder for the project, example here being your `testing AI` folder.

Example interactions you can begin with

## Example data analysis

1. Download an example "Iris dataset" to your folder. This will be an example dataset to use: https://archive.ics.uci.edu/static/public/53/iris.zip. Open the zip folder.

2. Swith to `Plan` mode. This is a mode that won't start to make things. It will ask you questions to help guide your progress.

Prompt: 
```
Make me some figures of the Iris dataset attached. 
Output the figure in an Excel file.
```

3. Interact with the `Plan`. For this example I replied that I want scatter plots. This is where you can influence what the model does. This is the major advantage over other chatbots.

4. Change from `Plan` mode to `Build` mode and begin planned tasks by prompting it to begin (i.e. "yes").

For me, it got stick with an error. I prompted `complete analysis` and it continued working until the end.

Here is my output from this interaction [iris_pairwise_scatter_plots.xlsx](https://github.com/user-attachments/files/25074321/iris_pairwise_scatter_plots.xlsx)

This is one of the figures it made: 

<img width="500" height="500" alt="image" src="https://github.com/user-attachments/assets/2872ea3d-6b51-4ff2-8cf4-afa5d353f971" />

## Example making slides for Journal Club

You can run this in `Plan` mode to optimise the output, but here is a prompt for paper [Integration of variant annotations using deep set networks boosts rare variant association testing](https://www.nature.com/articles/s41588-024-01919-z):

```
Make me 5-10 slide presentation for Journal club for this paper: https://www.nature.com/articles/s41588-024-01919-z
* Keep word usage low
* Include main figures
* summarise key take aways from paper
* output it as a powerpoint
```

Here's what it made:

[DeepRVAT_JournalClub.pptx](https://github.com/user-attachments/files/25078447/DeepRVAT_JournalClub.pptx)

Example slide:

<img width="1029" height="581" alt="Screenshot 2026-02-04 at 17 37 21" src="https://github.com/user-attachments/assets/da9504a6-659d-4eb1-aa9e-39823e88cc49" />

The formatting is a bit funky and it is not too in-depth. What changes in the prompt or in `Plan` mode would you add to make a better output?

# Extra information

Kimi K2.5 is available as a chatbot: https://openrouter.ai/chat

# Motivation

> "Nothing we do as we know it will be the same in three months"

> "Code is over"

> "The number of copilot requests we have today is irrelevant. We should be burning through a data centres worth of credits"

