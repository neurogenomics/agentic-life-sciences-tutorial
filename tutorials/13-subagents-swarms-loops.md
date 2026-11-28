---
layout: docs
title: "Loops, Subagents and Swarms"
difficulty: intermediate
time_estimate: "30 min"
---

# Loops, Subagents and Swarms

One agent in one conversation is the starting point. This page covers three ways to extend it, what each one costs, and an exercise that uses all three to check a reference list.

> **What you'll do:** split a reference list across subagents, have each one check its references against PubMed, and loop until every reference is either confirmed or flagged.

---

## Loops

An agent is already a loop. The model requests a tool, the harness runs it, the model reads the result and decides the next step. The loop ends when the model stops requesting tools.

You can put a second loop around the agent: repeat a task until a check passes, or run a prompt on a schedule.

Every loop needs two things:

- **A stopping check that the agent did not write.** A test, a checker script or a database lookup. "The agent says it is finished" is not a check.
- **A limit.** A maximum number of rounds, after which the agent reports what is still unresolved.

Without the limit, a loop that cannot succeed keeps spending tokens.

---

## Subagents

A subagent is a second agent that the main agent starts for one task. It has its own context window. It sees only the brief it is given, and it sends back only a summary.

| | Effect |
|---|---|
| Gain | The main conversation stays short, because the subagent's file reads and searches never enter it |
| Gain | Several subagents can run at the same time |
| Cost | The brief is all the subagent knows; anything left out is lost |
| Cost | The summary is all you see; a mistake comes back in the same confident tone as a finding |
| Cost | Each subagent re-reads its own instructions and files, so tokens add up |

Use a subagent for work that is independent and whose answer is short: search these files, check this reference, summarise this paper. Keep work that depends on the whole conversation in the main agent.

Claude Code and OpenCode both support subagents. Ask your agent "what subagents can you start?" to see what your tool offers.

---

## Swarms

A swarm is many agents working in parallel on one job. One agent, the orchestrator, splits the job, hands out the pieces and collects the results.

A swarm fits a job that divides into pieces that do not depend on each other: forty papers to screen, two hundred references to check, twelve files to review.

Three rules keep a swarm honest:

- **Cost multiplies.** Twenty agents cost about twenty times one agent. Estimate before you start.
- **Agents must not share files.** Two agents editing the same file overwrite each other. Give each its own input and its own output.
- **Verify the results.** A second pass, by a different agent or by code, checks what the first pass claimed.

---

## Exercise: check a reference list

A 2026 audit of 2·5 million open-access biomedical papers reported 4,046 fabricated citations in 2,810 articles (Topaz et al., *Lancet*; see [Reading](#reading)). This exercise builds a small version of that check.

### Before you start

1. **Get a reference list.** Download the sample [references.txt]({{ site.baseurl }}/assets/pubmed-demo/references.txt) (15 entries: real papers, one with a title typo, one non-PubMed preprint, and one fabricated citation) into an empty folder — or use a 10 to 20 entry list from your own draft.
2. **Confirm PubMed access.** If you configured a PubMed MCP server in Part 5, test it with a single lookup (`Search PubMed for PMID 34265844`). If you do not have PubMed MCP configured, the agent can query the public NCBI E-utilities API (`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi` and `esummary.fcgi`) via Python or `curl` with no API key required.

### 1. One agent, no loop

```text
Read references.txt. For each reference, search PubMed and report whether a
matching record exists. Give the PMID and DOI for each match.
```

Note how long it takes and how much context it uses. Check `/context` if your tool has it.

### 2. Subagents

```text
Split references.txt into groups of five. Start one subagent per group. Each
subagent searches PubMed for its five references and writes one line per
reference to its own file, results_<group>.tsv, with the columns: reference
number, status (found, not found, ambiguous), PMID, DOI, and the title PubMed
returned. Do not edit references.txt.
```

Compare the main conversation's context use with step 1.

### 3. A loop with a limit

```text
Combine the results files. For every reference marked "not found" or
"ambiguous", try again with a different search: first author and year, then
title words. Stop after three rounds. List whatever is still unresolved, and
do not guess a PMID.
```

### 4. Verify

Pick three references marked "found" and open the PMIDs yourself. Compare the title that PubMed returned with the title in your list.

**Questions:**

- Did any reference come back "found" with the wrong paper?
- A reference missing from PubMed is not proof of fabrication. What else could explain it?
- Which step would you trust to run unattended?

---

## Reading

- Topaz M, Roguin N, Gupta P, Zhang Z, Peltonen L-M. Fabricated citations: an audit across 2·5 million biomedical papers. *Lancet* 2026; 407: 1779–81. [doi:10.1016/S0140-6736(26)00603-3](https://doi.org/10.1016/S0140-6736(26)00603-3). A correction was published in July 2026: [doi:10.1016/S0140-6736(26)01339-5](https://doi.org/10.1016/S0140-6736(26)01339-5).
- [University of Eastern Finland summary of the audit](https://www.uef.fi/en/article/international-ai-assisted-audit-finds-fabricated-references-in-nearly-3000-peer-reviewed-medical), the source of the figures quoted above.
