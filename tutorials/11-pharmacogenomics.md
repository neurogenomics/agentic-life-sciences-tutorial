---
layout: docs
title: "Pharmacogenomics with ClawBio"
difficulty: intermediate
time_estimate: "30 min"
---

# Pharmacogenomics with ClawBio

A short hands-on walkthrough: install [ClawBio](https://clawbio.ai), run a real pharmacogenomics report on demo data, then have your agent interpret the result against [CPIC](https://cpicpgx.org/) drug-dosing guidelines.

> **What you'll build:** a workflow where a 23andMe / AncestryDNA / VCF file goes in and a clinician-readable dosage card comes out — calling 31 SNPs across 12 pharmacogenomic genes (CYP2C19, CYP2D6, CYP2C9, VKORC1, SLCO1B1, DPYD, TPMT, UGT1A1, CYP3A5, CYP2B6, NUDT15, CYP1A2) and matching them against CPIC recommendations for 51 drugs.

This is the hands-on tutorial for the [**The Future of Biology Is Agentic**]({{ '/workshops/the-future-of-biology-is-agentic-29-april-2026/' | relative_url }}) workshop on 29 April 2026, hosted with [ClawBio](https://clawbio.ai).

---

## Why pharmacogenomics?

Drug response varies hugely between people, and a lot of that variation is genetic. ~7% of FDA-approved drugs have pharmacogenomic prescribing guidance — codeine, clopidogrel, warfarin, SSRIs, statins, thiopurines. The clinical bottleneck has never been the science; it's the workflow. Reading a VCF, calling star alleles, mapping phenotypes to dosage rules, and writing it up as a report is hours of manual work.

ClawBio turns that workflow into a single agent-callable skill that runs **locally** in under a second and ships with a reproducibility bundle (commands, conda env, SHA-256 checksums).

---

## Prerequisites

- Python **3.10+** *or* [Claude Code](https://claude.com/claude-code) with plugin marketplaces enabled
- An agent of your choice ([opencode](https://opencode.ai), Claude Code, Cursor — anything that runs shell commands)
- *Optional:* your own 23andMe `.txt`, AncestryDNA `.csv`, or VCF file (the demo data works fine if you don't have one)

---

## Step 1 — Install ClawBio

Pick whichever route matches the agent you already use.

### Route A — Claude Code plugin (fastest)

Inside a Claude Code session:

```text
/plugin marketplace add ClawBio/ClawBio
/plugin install clawbio
```

That's it. The skills are now callable by name (`pharmgx`, `clinpgx`, `drug-photo`, …) from inside Claude Code.

### Route B — Local install (works with any agent)

```bash
git clone https://github.com/ClawBio/ClawBio.git
cd ClawBio
pip install -r requirements.txt
```

Verify the install:

```bash
python clawbio.py --help
```

You should see `pharmgx` listed under available skills.

> **Tip:** If `pip install` is slow or noisy, do it inside a fresh `conda` or `venv`. ClawBio pins its dependencies, so isolation matters.

---

## Step 2 — Run the demo

ClawBio ships with a synthetic genotype so you can see the full report without bringing your own data:

```bash
python clawbio.py run pharmgx --demo
```

This finishes in **under 2 seconds**. When it completes, you'll find a new directory containing:

| File | What it is |
|---|---|
| `report.md` | Human-readable pharmacogenomics report — gene-by-gene calls, metabolizer phenotype, drug recommendations |
| `figures/` | Publication-quality plots (allele frequency, phenotype distribution, drug-class summary) |
| `reproducibility/` | Exact command, conda env snapshot, and SHA-256 checksums of every input/output |

Open `report.md`. Skim the **Phenotypes** table and the **Drug recommendations** table. Notice how each call is tagged with one of: *standard dosing*, *caution*, *avoid*, or *insufficient data*.

---

## Step 3 — Have your agent interpret the report

This is where the agent loop starts to feel useful. The report is plain markdown — point your agent at it and ask a real clinical question.

In opencode, Claude Code, or whichever agent you use, try:

> "Read `report.md` from the latest pharmgx run. List every drug where this patient would need a dose adjustment or alternative, grouped by therapeutic area, and explain *why* in one sentence each (which gene, which phenotype, which CPIC rule). Flag the three highest-risk findings at the top."

You should get back a tidy clinician-style summary. The interesting part: **the agent didn't read the VCF**. ClawBio did the heavy lifting; the agent is reasoning over a structured intermediate. That separation — skill does the bioinformatics, agent does the synthesis — is the pattern this workshop is selling.

---

## Step 4 — (Optional) Run it on yourself

If you brought a real 23andMe or AncestryDNA file:

```bash
python clawbio.py run pharmgx \
  --input ~/Downloads/genome_yourname.txt \
  --output ~/pharmgx-me/
```

ClawBio auto-detects the format (23andMe `.txt`, AncestryDNA `.csv`, VCF, or raw — gzipped or plain). The output structure is identical to the demo.

> **Privacy note:** ClawBio is *local-first by design*. Your genotype file never leaves your laptop — no cloud upload, no telemetry. That's the whole reason it can be used on real patient data.

---

## Step 5 — Wrap it as your own skill

The pattern that makes this stick is composition. Drop a tiny skill file in your agent that chains: *take a patient file → call `pharmgx` → render a one-page clinician card → save it next to the report*.

A minimal `SKILL.md` for this might look like:

```markdown
---
name: patient-pgx-card
description: Run ClawBio pharmgx on a patient file and render a one-page dosage card.
inputs:
  - file: patient genotype (23andMe / AncestryDNA / VCF)
---

1. Run `python clawbio.py run pharmgx --input {file} --output ./out/`.
2. Read `./out/report.md`.
3. Render a one-page markdown card with: top 3 high-risk drugs, full table of dose-adjusted drugs, and a one-line "everything else looks standard" summary.
4. Save as `./out/clinician-card.md`.
```

Now any agent in your lab can call `patient-pgx-card` and get the same artefact, every time. That's the unit of reuse this whole series is about.

---

## Going further

- [**ClawBio docs**](https://docs.clawbio.ai) — full skill catalogue (PharmGx, ClinPGx, Drug Photo, …)
- [**ClawBio repo**](https://github.com/ClawBio/ClawBio) — source, contribution guide, benchmark suite
- [**CPIC guidelines**](https://cpicpgx.org/guidelines/) — the clinical rules ClawBio's recommendations are grounded in
- [**PharmGKB**](https://www.pharmgkb.org/) — broader pharmacogenomics knowledge base (gene–drug associations, dosing guidelines, drug labels)
- [**RoboTerri** (live agent)](https://t.me/RoboTerri_bot) — Telegram bot that uses ClawBio skills end-to-end; useful as a reference for what "production agent" looks like

If you build something with this — a new skill, a different report layout, a Shiny dashboard on top — share it in the [workshop Slack channel](#) so the rest of the lab can copy from you.
