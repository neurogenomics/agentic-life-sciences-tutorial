---
layout: default
title: Agentic AI for Neuroscience Workshop
permalink: /workshops/agentic-ai-neuroscience-2026/
---

<style>
  :root {
    --ink: #0b0f1a;
    --paper: #f6f5f1;
    --accent: #ff4d2e;
    --accent-2: #3b6bff;
    --line: rgba(11, 15, 26, 0.12);
  }

  main#main-content { background: var(--paper); }

  .wx {
    max-width: 1280px;
    margin: 0 auto;
    padding: 1.25rem 1.25rem 3rem;
    color: var(--ink);
    font-feature-settings: "ss01", "cv11";
  }

  /* ---------- compact hero + QR row (above the fold) ---------- */
  .wx-top {
    display: grid;
    grid-template-columns: minmax(260px, 1fr) minmax(0, 2fr);
    gap: 1rem;
    align-items: stretch;
  }
  @media (max-width: 900px) {
    .wx-top { grid-template-columns: 1fr; }
  }

  .wx-hero {
    position: relative;
    border: 1px solid var(--line);
    border-radius: 16px;
    padding: 1.5rem 1.5rem 1.25rem;
    overflow: hidden;
    background: var(--ink);
    color: #fff;
    isolation: isolate;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .wx-hero::before {
    content: "";
    position: absolute;
    inset: -40%;
    background:
      radial-gradient(40% 40% at 20% 30%, rgba(255, 77, 46, 0.55), transparent 60%),
      radial-gradient(45% 45% at 80% 70%, rgba(59, 107, 255, 0.55), transparent 60%),
      radial-gradient(30% 30% at 60% 20%, rgba(253, 187, 45, 0.35), transparent 60%);
    filter: blur(40px);
    z-index: -1;
    animation: drift 18s ease-in-out infinite alternate;
  }
  @keyframes drift {
    0%   { transform: translate(0, 0) rotate(0deg); }
    100% { transform: translate(3%, -4%) rotate(6deg); }
  }
  .wx-hero__tag {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.75rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    padding: 0.35rem 0.75rem;
    border: 1px solid rgba(255,255,255,0.35);
    border-radius: 999px;
    backdrop-filter: blur(6px);
  }
  .wx-hero__tag::before {
    content: "";
    width: 8px; height: 8px; border-radius: 50%;
    background: var(--accent);
    box-shadow: 0 0 12px var(--accent);
  }
  .wx-hero h1 {
    font-size: clamp(1.6rem, 2.4vw, 2.25rem);
    line-height: 1;
    letter-spacing: -0.02em;
    margin: 0.75rem 0 0.5rem;
    font-weight: 800;
  }
  .wx-hero h1 em {
    font-style: normal;
    background: linear-gradient(90deg, #ff4d2e, #fdbb2d);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  .wx-hero__meta {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem 1rem;
    margin-top: 0.75rem;
    padding-top: 0.75rem;
    border-top: 1px solid rgba(255,255,255,0.18);
    font-size: 0.8rem;
  }
  .wx-hero__meta dt {
    font-size: 0.6rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    opacity: 0.55;
    margin-bottom: 0.1rem;
  }
  .wx-hero__meta dd { margin: 0; font-weight: 500; font-size: 0.85rem; }

  /* ---------- step strip ---------- */
  .wx-steps {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 0;
    margin: 3rem 0 2rem;
    border: 1px solid var(--line);
    border-radius: 14px;
    overflow: hidden;
    background: #fff;
  }
  .wx-step {
    padding: 1.25rem 1.5rem;
    border-right: 1px solid var(--line);
    position: relative;
  }
  .wx-step:last-child { border-right: none; }
  .wx-step__num {
    font-family: "JetBrains Mono", ui-monospace, monospace;
    font-size: 0.75rem;
    color: var(--accent);
    letter-spacing: 0.1em;
  }
  .wx-step__title { font-weight: 700; margin-top: 0.15rem; }
  .wx-step__body { font-size: 0.9rem; color: #555; margin-top: 0.15rem; }

  /* ---------- QR row ---------- */
  .wx-qr {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
  }
  @media (max-width: 620px) {
    .wx-qr { grid-template-columns: 1fr; }
  }
  .wx-qr__card {
    background: #fff;
    border: 1px solid var(--line);
    border-radius: 14px;
    padding: 0.85rem 0.9rem 0.75rem;
    position: relative;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
    display: flex;
    flex-direction: column;
    text-decoration: none;
    color: inherit;
  }
  .wx-qr__card:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 28px -16px rgba(11, 15, 26, 0.25);
  }
  .wx-qr__label {
    font-size: 0.6rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--accent);
    font-weight: 700;
  }
  .wx-qr__title {
    font-size: 1rem;
    font-weight: 700;
    margin: 0.15rem 0 0.35rem;
    letter-spacing: -0.01em;
  }
  .wx-qr__img {
    background: var(--paper);
    border-radius: 8px;
    padding: 0.5rem;
    display: flex;
    justify-content: center;
    flex-grow: 1;
  }
  .wx-qr__img img {
    width: 100%;
    max-width: 160px;
    height: auto;
    image-rendering: pixelated;
  }
  .wx-qr__link {
    margin-top: 0.5rem;
    font-family: "JetBrains Mono", ui-monospace, monospace;
    font-size: 0.65rem;
    color: var(--accent-2);
    word-break: break-all;
    text-decoration: none;
    display: block;
    line-height: 1.2;
  }

  /* ---------- section heads ---------- */
  .wx-head {
    display: flex;
    align-items: baseline;
    gap: 1rem;
    margin: 3rem 0 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid var(--ink);
  }
  .wx-head h2 {
    margin: 0;
    font-size: 1.4rem;
    font-weight: 800;
    letter-spacing: -0.01em;
    border: none;
    padding: 0;
  }
  .wx-head__count {
    font-family: "JetBrains Mono", ui-monospace, monospace;
    font-size: 0.8rem;
    color: #999;
    margin-left: auto;
  }

  /* ---------- footer mark ---------- */
  .wx-mark {
    margin-top: 3rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--line);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    font-family: "JetBrains Mono", ui-monospace, monospace;
    font-size: 0.75rem;
    color: #888;
    letter-spacing: 0.05em;
  }

  /* ---------- challenge panel ---------- */
  .wx-panel {
    background: #fff;
    border: 1px solid var(--line);
    border-radius: 14px;
    padding: 1.75rem 2rem;
  }
  .wx-lead {
    font-size: 1.2rem;
    font-weight: 600;
    letter-spacing: -0.01em;
    margin: 0 0 1rem;
  }
  .wx-task {
    margin: 0 0 1.25rem 1.25rem;
    padding: 0;
  }
  .wx-task li { margin: 0.35rem 0; }
  .wx-tip {
    background: rgba(59, 107, 255, 0.06);
    border-left: 3px solid var(--accent-2);
    padding: 0.75rem 1rem;
    border-radius: 4px;
    font-size: 0.92rem;
  }
  .wx-tip code {
    background: rgba(11,15,26,0.08);
    padding: 0.05rem 0.35rem;
    border-radius: 4px;
    font-size: 0.85em;
  }

  /* ---------- tables ---------- */
  .wx-table {
    background: #fff;
    border: 1px solid var(--line);
    border-radius: 14px;
    overflow: hidden;
  }
  .wx-table table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.92rem;
  }
  .wx-table th, .wx-table td {
    text-align: left;
    padding: 0.85rem 1rem;
    border-bottom: 1px solid var(--line);
    vertical-align: top;
  }
  .wx-table tr:last-child td { border-bottom: none; }
  .wx-table th {
    background: var(--paper);
    font-size: 0.7rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #555;
    font-weight: 600;
  }
  .wx-table td a {
    color: var(--accent-2);
    font-family: "JetBrains Mono", ui-monospace, monospace;
    font-size: 0.85rem;
  }
  .wx-cite {
    display: block;
    font-size: 0.8rem;
    color: #888;
    font-style: italic;
    margin-top: 0.15rem;
  }
  .wx-note {
    padding: 0.75rem 1rem;
    font-size: 0.85rem;
    color: #666;
    background: var(--paper);
    margin: 0;
    border-top: 1px solid var(--line);
  }

  @media (max-width: 640px) {
    .wx-table { overflow-x: auto; }
    .wx-table table { min-width: 600px; }
    .wx-hero { padding: 2.5rem 1.5rem 2rem; }
    .wx-step { border-right: none; border-bottom: 1px solid var(--line); }
    .wx-step:last-child { border-bottom: none; }
  }
</style>

<div class="wx">

  <div class="wx-top">
    <section class="wx-hero">
      <div>
        <span class="wx-hero__tag">Workshop · 15 April 2026</span>
        <h1>Agentic AI for <em>Neuroscience</em>.</h1>
      </div>
      <dl class="wx-hero__meta">
        <div><dt>Host</dt><dd>UKDRI</dd></div>
        <div><dt>Venue</dt><dd>Imperial</dd></div>
        <div><dt>Channel</dt><dd>#agentic-ai-for-neuroscience-workshop</dd></div>
        <div><dt>Status</dt><dd>Live today</dd></div>
      </dl>
    </section>

    <div class="wx-qr">
      <a class="wx-qr__card" href="https://neurogenomics.github.io/agentic-life-sciences-tutorial/">
        <span class="wx-qr__label">Tutorials</span>
        <div class="wx-qr__title">Skills Cookbook</div>
        <div class="wx-qr__img">
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=400x400&margin=0&data=https%3A%2F%2Fneurogenomics.github.io%2Fagentic-life-sciences-tutorial%2F&color=0b0f1a&bgcolor=f6f5f1" alt="QR code to tutorials">
        </div>
        <span class="wx-qr__link">neurogenomics.github.io/agentic-life-sciences-tutorial</span>
      </a>

      <a class="wx-qr__card" href="https://join.slack.com/share/enQtMTA5NDY1MDgyNjkyMzItNDRlMGU0ODM1NTEzNGQ1NjA2Y2U3ZGMyZWYwYjQwYTczNjhkMmY1ODAzM2YxOGNjOTQzMzBhYmVlMTJmYjMzYQ">
        <span class="wx-qr__label">Slack</span>
        <div class="wx-qr__title">Join workspace</div>
        <div class="wx-qr__img">
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=400x400&margin=0&data=https%3A%2F%2Fjoin.slack.com%2Fshare%2FenQtMTA5NDY1MDgyNjkyMzItNDRlMGU0ODM1NTEzNGQ1NjA2Y2U3ZGMyZWYwYjQwYTczNjhkMmY1ODAzM2YxOGNjOTQzMzBhYmVlMTJmYjMzYQ&color=0b0f1a&bgcolor=f6f5f1" alt="QR code to Slack">
        </div>
        <span class="wx-qr__link">#agentic-ai-for-neuroscience-workshop</span>
      </a>

      <a class="wx-qr__card" href="https://forms.cloud.microsoft/e/mF0jqv9Xr1">
        <span class="wx-qr__label">Form</span>
        <div class="wx-qr__title">AI strategy</div>
        <div class="wx-qr__img">
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=400x400&margin=0&data=https%3A%2F%2Fforms.cloud.microsoft%2Fe%2FmF0jqv9Xr1&color=0b0f1a&bgcolor=f6f5f1" alt="QR code to form">
        </div>
        <span class="wx-qr__link">forms.cloud.microsoft/e/mF0jqv9Xr1</span>
      </a>
    </div>
  </div>

  <div class="wx-head">
    <h2>Challenge · Figure Legend Generator</h2>
    <span class="wx-head__count">hack today</span>
  </div>

  <div class="wx-panel">
    <p class="wx-lead">Can your agent write a figure legend as well as the authors did?</p>
    <ol class="wx-task">
      <li>Pick a figure from the tables below and download the image.</li>
      <li>Give it to your agent and ask for a publication-ready legend.</li>
      <li>Compare to the original in the paper.</li>
    </ol>
    <div class="wx-tip">
      <strong>Tips.</strong> Start in <code>Plan</code> mode so the agent asks what it needs before drafting. The <strong>PubMed MCP</strong> and the <strong>ClawBio</strong> life-sciences skills can pull the paper's methods for extra context. Share attempts in the Slack channel.
    </div>
  </div>

  <div class="wx-head">
    <h2>Warm-up figures</h2>
    <span class="wx-head__count">easy mode</span>
  </div>

  <div class="wx-table">
    <table>
      <thead>
        <tr><th>Figure</th><th>Why</th><th>Download</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Palmer Penguins — bill dimensions</td>
          <td>Teaching figure, clean 3-species layout</td>
          <td><a href="https://allisonhorst.github.io/palmerpenguins/reference/figures/culmen_depth.png">PNG</a></td>
        </tr>
        <tr>
          <td>Palmer Penguins — flipper vs body mass</td>
          <td>Scatter with legend, colour key</td>
          <td><a href="https://allisonhorst.github.io/palmerpenguins/articles/examples/mass_flipper.png">PNG</a></td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="wx-head">
    <h2>Neuroscience figures</h2>
    <span class="wx-head__count">snRNA-seq · GWAS</span>
  </div>

  <div class="wx-table">
    <table>
      <thead>
        <tr><th>Paper</th><th>Suggested figure</th><th>Why it is a good test</th><th>Source</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Agarwal et al. 2020 — <em>Nat Commun</em><br><span class="wx-cite">Human substantia nigra atlas</span></td>
          <td>Fig 1</td>
          <td>Clean UMAP + barplot. Good warm-up.</td>
          <td><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7463023/">PMC7463023</a></td>
        </tr>
        <tr>
          <td>Mathys et al. 2019 — <em>Nature</em><br><span class="wx-cite">snRNA-seq in Alzheimer's</span></td>
          <td>Fig 2</td>
          <td>Composition + DE gene panels.</td>
          <td><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6737283/">PMC6737283</a></td>
        </tr>
        <tr>
          <td>Skene et al. 2018 — <em>Nat Genet</em><br><span class="wx-cite">Cell types in schizophrenia</span></td>
          <td>Fig 3</td>
          <td>GWAS enrichment × cell ontology.</td>
          <td><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6546635/">PMC6546635</a></td>
        </tr>
        <tr>
          <td>Bryois et al. 2020 — <em>Nat Genet</em><br><span class="wx-cite">MAGMA cell-typing across traits</span></td>
          <td>Fig 2</td>
          <td>Trait × cell-type matrix. Many labels to name.</td>
          <td><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7610352/">PMC7610352</a></td>
        </tr>
        <tr>
          <td>Smajić et al. 2022 — <em>Brain</em><br><span class="wx-cite">PD midbrain single-cell</span></td>
          <td>Fig 1</td>
          <td>Atlas UMAP split by condition.</td>
          <td><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8864739/">PMC8864739</a></td>
        </tr>
        <tr>
          <td>Siletti et al. 2023 — <em>Science</em><br><span class="wx-cite">Human brain transcriptomic atlas</span></td>
          <td>Fig 1 or Fig 3</td>
          <td>461-cluster UMAP + sunburst hierarchy.</td>
          <td><a href="https://www.biorxiv.org/content/10.1101/2022.10.12.511898v1">bioRxiv preprint</a></td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="wx-head">
    <h2>Microscopy figures</h2>
    <span class="wx-head__count">hard mode</span>
  </div>

  <div class="wx-table">
    <table>
      <thead>
        <tr><th>Paper</th><th>Suggested figure</th><th>Why it is a good test</th><th>Source</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Kamath et al. 2022 — <em>Nat Neurosci</em><br><span class="wx-cite">PD-vulnerable dopamine neurons</span></td>
          <td>Fig 4</td>
          <td>smFISH / RNAscope of SOX6, CALB1. 3 channels.</td>
          <td><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9477726/">PMC9477726</a></td>
        </tr>
        <tr>
          <td>Keren-Shaul et al. 2017 — <em>Cell</em><br><span class="wx-cite">DAM microglia in AD</span></td>
          <td>Fig 4</td>
          <td>Iba1 / TREM2 / Clec7a triple-stain around plaques.</td>
          <td><a href="https://www.cell.com/cell/fulltext/S0092-8674(17)30578-0">Cell open</a></td>
        </tr>
        <tr>
          <td>Smajić et al. 2022 — <em>Brain</em><br><span class="wx-cite">PD midbrain IHC</span></td>
          <td>Fig 5</td>
          <td>Iba1 / GFAP staining, PD vs control.</td>
          <td><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8864739/">PMC8864739</a></td>
        </tr>
        <tr>
          <td>La Manno et al. 2021 — <em>Nature</em><br><span class="wx-cite">Developing mouse brain atlas</span></td>
          <td>Fig 5</td>
          <td>IHC + spatial transcriptomics overlays.</td>
          <td><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8209913/">PMC8209913</a></td>
        </tr>
        <tr>
          <td>Yao et al. 2023 — <em>Nature</em><br><span class="wx-cite">Mouse whole-brain MERFISH</span></td>
          <td>Fig 2</td>
          <td>MERFISH sections registered to CCF.</td>
          <td><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10700148/">PMC10700148</a></td>
        </tr>
      </tbody>
    </table>
    <p class="wx-note">To grab a PMC figure: open the article, click the figure thumbnail, then "Download image" → save the JPG/TIFF. Or right-click the hi-res preview.</p>
  </div>

  <div class="wx-mark">
    <span>// UKDRI · Skene Lab · Imperial</span>
    <span>v1.1 · 2026-04-15</span>
  </div>

</div>
