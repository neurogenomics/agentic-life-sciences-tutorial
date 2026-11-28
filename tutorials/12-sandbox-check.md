---
layout: docs
title: "Sandbox: Act, Fail, Check"
difficulty: beginner
time_estimate: "25 min"
---

# Sandbox: Act, Fail, Check

An agent can suggest a fix, run a fix, or produce a checked result. These are three different things. This exercise shows the difference on a small faulty script.

> **What you'll do:** run a script that gives a plausible wrong answer, have an agent repair it, and judge the repair with a checker that the agent did not write.

The data is synthetic. The exercise uses only Python's standard library and needs no API key to run by hand.

---

## Key terms

- **Model** — the language model that writes text and proposes actions.
- **Tool** — an action the model can request: read a file, run a command, search.
- **Harness** — the software around the model that manages tools, context, permissions and execution. OpenCode, Claude Code and GitHub Copilot are harnesses.
- **Sandbox** — a disposable environment that holds none of your files or credentials.

---

## Files

Download the five files into one empty folder:

| File | Purpose |
|---|---|
| [`samples.json`]({{ site.baseurl }}/assets/sandbox-demo/samples.json) | Six synthetic measurements in two groups; one value is missing |
| [`analyse.py`]({{ site.baseurl }}/assets/sandbox-demo/analyse.py) | The faulty script |
| [`check.py`]({{ site.baseurl }}/assets/sandbox-demo/check.py) | The checker |
| [`starter.py`]({{ site.baseurl }}/assets/sandbox-demo/starter.py) | A copy of the faulty script, for resetting |
| [`reference.py`]({{ site.baseurl }}/assets/sandbox-demo/reference.py) | A reference repair |

---

## Where to run it

Run the exercise in a place the agent cannot damage.

- **Simplest:** a new empty folder. Start your agent inside that folder only.
- **Stronger:** a disposable virtual machine. [Multipass](https://canonical.com/multipass/docs/latest/how-to-guides/install-multipass/) gives you an Ubuntu VM with one command.

```sh
multipass launch 24.04 --name physalia-sandbox --cpus 2 --memory 2G --disk 10G
multipass transfer --recursive sandbox-demo physalia-sandbox:/home/ubuntu/sandbox-demo
multipass shell physalia-sandbox
```

Copy the files in. Do not mount your home directory, and put no credentials or private data in the VM.

> **Limits:** a VM keeps the agent away from your host files. It does not block network access, and it does not make an analysis correct.

---

## 1. Run the faulty script

```sh
cat samples.json
python3 analyse.py
python3 check.py
```

The script writes `summary.json` and reports success. The checker fails: the script counted the missing control measurement as zero, so the control mean is 8 where it should be 12.

**Question:** does an output file prove success?

---

## 2. Ask the agent to repair it

Give your agent this prompt:

```text
Inspect samples.json and analyse.py in this directory. Repair analyse.py so that
missing measurements are excluded from both the total and the count. Write
summary.json with each group's mean and count of measured samples. Use only the
Python standard library. Preserve samples.json and check.py. Run check.py and
report its exit status and the files you changed. If the check fails, inspect
the feedback and repair the cause before claiming completion.
```

Watch the tool calls, and read each command before you approve it.

"Preserve check.py" is an instruction, and the agent can break it. Confirm afterwards that the checker is unchanged.

**Question:** which evidence justifies the repair?

Stuck? Apply the reference repair:

```sh
cp reference.py analyse.py
python3 analyse.py
python3 check.py
cat summary.json
```

Expected result: control mean 12 from 2 measured samples; treated mean 21 from 3.

---

## 3. Remove the deliverable

```sh
rm -- summary.json
python3 check.py
python3 analyse.py
python3 check.py
```

The first check fails because the file is missing. The second passes.

**Question:** can a confident answer replace a missing file?

---

## 4. Discuss

- What could the agent do in this folder?
- What could it have damaged?
- How did you check its work?
- The checker tests one known fixture. What would you need before trusting a result on real data?

---

## Reset

```sh
cp starter.py analyse.py
rm -f summary.json
```

If you used a VM, stop it from the host with `multipass stop physalia-sandbox`.

---

## Reading

[Harness-Bench (arXiv:2605.27922)](https://arxiv.org/abs/2605.27922) compares agent harnesses across models on realistic workflows. Read Table 2 of [version 1](https://arxiv.org/html/2605.27922v1) and separate three things: completed work, process quality and resource use.
