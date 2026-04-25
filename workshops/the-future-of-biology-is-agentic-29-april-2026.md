---
layout: default
title: The Future of Biology Is Agentic — ClawBio Workshop
permalink: /workshops/the-future-of-biology-is-agentic-29-april-2026/
---

<style>
  :root {
    --ink: #0b1a14;
    --paper: #f1f7f3;
    --accent: #1f9d6e;
    --accent-2: #4ec39a;
    --line: rgba(11, 26, 20, 0.12);
  }

  html, body { background: var(--paper); }
  main#main-content {
    background:
      radial-gradient(65% 50% at 0% 0%, rgba(31, 157, 110, 0.16), transparent 60%),
      radial-gradient(55% 45% at 100% 10%, rgba(78, 195, 154, 0.20), transparent 60%),
      radial-gradient(70% 60% at 50% 100%, rgba(31, 157, 110, 0.12), transparent 65%),
      linear-gradient(180deg, #f1f7f3 0%, #e3f1ea 60%, #cfe7da 100%);
    min-height: 100vh;
  }
  .site-header { background: transparent !important; border-bottom-color: rgba(11, 26, 20, 0.08) !important; }

  .wx { max-width: 1320px; margin: 0 auto; padding: 1.5rem 2rem; color: var(--ink); font-feature-settings: "ss01", "cv11"; }
  @media (max-width: 700px) { .wx { padding: 1rem 1rem 2rem; } }

  .wx-top { display: grid; grid-template-columns: 1fr; gap: 1.25rem; }

  .wx-title {
    display: flex; align-items: baseline; justify-content: space-between; gap: 1.5rem;
    padding: 0.25rem 0.5rem 1rem; border-bottom: 2px solid var(--ink); flex-wrap: wrap;
  }
  .wx-title h1 { margin: 0; font-size: clamp(1.8rem, 4.5vw, 3.4rem); line-height: 1; letter-spacing: -0.025em; font-weight: 800; }
  .wx-title h1 em {
    font-style: normal;
    background: linear-gradient(90deg, #1f9d6e, #0f6b4a);
    -webkit-background-clip: text; background-clip: text; color: transparent;
  }
  .wx-title__date { font-family: "JetBrains Mono", ui-monospace, monospace; font-size: 0.95rem; letter-spacing: 0.05em; color: var(--ink); opacity: 0.7; }

  .wx-cohost {
    margin-top: 0.5rem;
    font-size: 0.95rem;
    color: #2c4a3c;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
  }
  .wx-cohost a { color: var(--accent); text-decoration: none; font-weight: 600; }
  .wx-cohost a:hover { text-decoration: underline; }

  /* ---------- phase strip ---------- */
  .wx-phases {
    display: grid; grid-template-columns: repeat(5, 1fr); gap: 0;
    margin: 1rem 0 1.5rem; border: 1px solid var(--line); border-radius: 14px;
    overflow: hidden; background: #fff;
  }
  @media (max-width: 900px) { .wx-phases { grid-template-columns: repeat(3, 1fr); } }
  @media (max-width: 520px) { .wx-phases { grid-template-columns: repeat(2, 1fr); } }
  .wx-phase { padding: 1rem 1.1rem; border-right: 1px solid var(--line); position: relative; }
  .wx-phase:last-child { border-right: none; }
  .wx-phase__num { font-family: "JetBrains Mono", ui-monospace, monospace; font-size: 0.7rem; color: var(--accent); letter-spacing: 0.1em; }
  .wx-phase__title { font-weight: 700; margin-top: 0.15rem; font-size: 1rem; }
  .wx-phase__time { font-size: 0.75rem; color: var(--accent); font-weight: 600; letter-spacing: 0.05em; }
  .wx-phase__body { font-size: 0.85rem; color: #555; margin-top: 0.35rem; line-height: 1.4; }

  /* ---------- QR row ---------- */
  .wx-qr { display: grid; grid-template-columns: repeat(5, 1fr); gap: 0.85rem; }
  @media (max-width: 900px) { .wx-qr { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 520px) { .wx-qr { grid-template-columns: 1fr; } }
  .wx-qr__card {
    background: rgba(255, 255, 255, 0.82); backdrop-filter: blur(8px);
    border: 1px solid var(--line); border-radius: 18px; padding: 1.5rem 1.5rem 1.25rem;
    position: relative; transition: transform 0.15s ease, box-shadow 0.15s ease;
    display: flex; flex-direction: column; text-decoration: none; color: inherit; gap: 0.4rem;
  }
  .wx-qr__card:hover { transform: translateY(-2px); box-shadow: 0 12px 28px -16px rgba(11, 26, 20, 0.25); }
  .wx-qr__card--accent {
    background: linear-gradient(180deg, rgba(31, 157, 110, 0.95), rgba(15, 107, 74, 0.95));
    color: #fff; border-color: rgba(31, 157, 110, 0.6);
  }
  .wx-qr__card--accent .wx-qr__label { color: #fff; opacity: 0.9; }
  .wx-qr__card--accent .wx-qr__title { color: #fff; }
  .wx-qr__card--accent .wx-qr__link { color: rgba(255,255,255,0.9); }
  .wx-qr__card--accent .wx-qr__img { background: rgba(255, 255, 255, 0.9); }
  .wx-qr__label { font-size: 0.65rem; letter-spacing: 0.16em; text-transform: uppercase; color: var(--accent); font-weight: 700; }
  .wx-qr__title { font-size: 1.2rem; font-weight: 700; margin: 0; letter-spacing: -0.01em; }
  .wx-qr__img { background: var(--paper); border-radius: 10px; padding: 0.75rem; display: flex; justify-content: center; margin-top: 0.25rem; }
  .wx-qr__img img { width: 100%; max-width: 280px; height: auto; image-rendering: pixelated; }
  .wx-qr__link { margin-top: 0.75rem; font-family: "JetBrains Mono", ui-monospace, monospace; font-size: 0.85rem; color: var(--ink); word-break: break-all; text-decoration: none; display: block; line-height: 1.35; font-weight: 500; }
  .wx-qr__card--accent .wx-qr__link { color: #fff; opacity: 0.95; }

  /* ---------- section heads ---------- */
  .wx-head { display: flex; align-items: baseline; gap: 1rem; margin: 1.5rem 0 0.75rem; padding-bottom: 0.4rem; border-bottom: 2px solid var(--ink); }
  .wx-head h2 { margin: 0; font-size: 1.4rem; font-weight: 800; letter-spacing: -0.01em; border: none; padding: 0; }
  .wx-head__count { font-family: "JetBrains Mono", ui-monospace, monospace; font-size: 0.8rem; color: #999; margin-left: auto; }

  .wx-mark { margin-top: 1.25rem; padding-top: 0.75rem; border-top: 1px solid var(--line); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; font-family: "JetBrains Mono", ui-monospace, monospace; font-size: 0.75rem; color: #888; letter-spacing: 0.05em; }

  .wx-panel { background: rgba(255, 255, 255, 0.82); backdrop-filter: blur(8px); border: 1px solid var(--line); border-radius: 14px; padding: 1.25rem 1.5rem; }
  .wx-lead { font-size: 1.15rem; font-weight: 500; letter-spacing: -0.01em; margin: 0 0 1rem; line-height: 1.5; }
  .wx-task { margin: 0 0 1.25rem 1.25rem; padding: 0; }
  .wx-task li { margin: 0.35rem 0; }
  .wx-tip { background: rgba(31, 157, 110, 0.08); border-left: 3px solid var(--accent); padding: 0.75rem 1rem; border-radius: 4px; font-size: 0.92rem; }
  .wx-tip code { background: rgba(11,26,20,0.08); padding: 0.05rem 0.35rem; border-radius: 4px; font-size: 0.85em; }

  .wx-codeblock {
    background: #0b1a14; color: #d8f0e5; border-radius: 10px;
    padding: 0.9rem 1.1rem; font-family: "JetBrains Mono", ui-monospace, monospace;
    font-size: 0.85rem; line-height: 1.55; overflow-x: auto; margin: 0.75rem 0;
  }
  .wx-codeblock .c { color: #6f9b89; }
  .wx-codeblock .k { color: #4ec39a; }

  @media (max-width: 640px) { .wx-phase { border-right: none; border-bottom: 1px solid var(--line); } .wx-phase:last-child { border-bottom: none; } }
</style>

<div class="wx">

  <div class="wx-top">
    <section class="wx-title">
      <div>
        <h1>The Future of Biology Is <em>Agentic</em></h1>
        <p class="wx-cohost">Hosted with <a href="https://clawbio.ai" target="_blank" rel="noopener">ClawBio</a> — bioinformatics-native AI agent skills.</p>
      </div>
      <span class="wx-title__date">29 April 2026</span>
    </section>

    <div class="wx-qr">
      <a class="wx-qr__card" href="https://neurogenomics.github.io/agentic-life-sciences-tutorial/">
        <span class="wx-qr__label">Tutorials</span>
        <div class="wx-qr__title">Skills Cookbook</div>
        <div class="wx-qr__img">
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=400x400&margin=0&data=https%3A%2F%2Fneurogenomics.github.io%2Fagentic-life-sciences-tutorial%2F&color=0b1a14&bgcolor=f1f7f3" alt="QR code to tutorials">
        </div>
        <span class="wx-qr__link">neurogenomics.github.io/agentic-life-sciences-tutorial</span>
      </a>

      <a class="wx-qr__card" href="https://clawbio.ai">
        <span class="wx-qr__label">Co-host</span>
        <div class="wx-qr__title">ClawBio</div>
        <div class="wx-qr__img">
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=400x400&margin=0&data=https%3A%2F%2Fclawbio.ai&color=0b1a14&bgcolor=f1f7f3" alt="QR code to clawbio.ai">
        </div>
        <span class="wx-qr__link">clawbio.ai</span>
      </a>

      <a class="wx-qr__card" href="https://join.slack.com/share/enQtMTA5NDY1MDgyNjkyMzItNDRlMGU0ODM1NTEzNGQ1NjA2Y2U3ZGMyZWYwYjQwYTczNjhkMmY1ODAzM2YxOGNjOTQzMzBhYmVlMTJmYjMzYQ">
        <span class="wx-qr__label">Slack</span>
        <div class="wx-qr__title">Workshop Slack</div>
        <div class="wx-qr__img">
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=400x400&margin=0&data=https%3A%2F%2Fjoin.slack.com%2Fshare%2FenQtMTA5NDY1MDgyNjkyMzItNDRlMGU0ODM1NTEzNGQ1NjA2Y2U3ZGMyZWYwYjQwYTczNjhkMmY1ODAzM2YxOGNjOTQzMzBhYmVlMTJmYjMzYQ&color=0b1a14&bgcolor=f1f7f3" alt="QR code to Slack">
        </div>
        <span class="wx-qr__link">#agentic-ai-for-neuroscience-workshop</span>
      </a>

      <a class="wx-qr__card" href="https://github.com/ClawBio/ClawBio">
        <span class="wx-qr__label">Code</span>
        <div class="wx-qr__title">ClawBio repo</div>
        <div class="wx-qr__img">
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=400x400&margin=0&data=https%3A%2F%2Fgithub.com%2FClawBio%2FClawBio&color=0b1a14&bgcolor=f1f7f3" alt="QR code to ClawBio GitHub">
        </div>
        <span class="wx-qr__link">github.com/ClawBio/ClawBio</span>
      </a>

      <a class="wx-qr__card wx-qr__card--accent" href="{{ '/tutorials/11-pharmacogenomics' | relative_url }}">
        <span class="wx-qr__label">Today's tutorial</span>
        <div class="wx-qr__title">Pharmacogenomics with ClawBio</div>
        <div class="wx-qr__img">
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=400x400&margin=0&data=https%3A%2F%2Fneurogenomics.github.io%2Fagentic-life-sciences-tutorial%2Ftutorials%2F11-pharmacogenomics&color=0b1a14&bgcolor=f1f7f3" alt="QR code to pharmacogenomics tutorial">
        </div>
        <span class="wx-qr__link">tutorials/11-pharmacogenomics</span>
      </a>
    </div>
  </div>

  <section>
    <div class="wx-head"><h2>The pitch</h2></div>
    <div class="wx-panel">
      <p class="wx-lead">
        Bioinformatics is moving from scripts you babysit to <strong>skills your agent calls</strong>.
        ClawBio packages reproducible bioinformatics workflows — pharmacogenomics, drug-photo lookup, ClinPGx queries — as agent-callable skills that run locally and never leak your data.
        In this session we'll install ClawBio, run a real pharmacogenomics report end-to-end on demo genetic data, and watch an agent interpret CYP2D6 metabolizer status against CPIC drug guidelines.
      </p>
      <p class="wx-tip">
        Core idea: a <strong>VCF (or 23andMe / AncestryDNA file) goes in</strong>, a <strong>publication-grade pharmacogenomics report comes out</strong> — calls star alleles, assigns metabolizer phenotypes, and lists CPIC-backed dosage recommendations for 51 drugs across 12 genes. All in under a second, on your laptop.
      </p>
    </div>
  </section>

  <section>
    <div class="wx-head"><h2>The plan</h2><span class="wx-head__count">60 min · 5 phases</span></div>

    <div class="wx-phases">
      <div class="wx-phase">
        <div class="wx-phase__num">01 · <span class="wx-phase__time">10 min</span></div>
        <div class="wx-phase__title">Why agentic bio</div>
        <div class="wx-phase__body">Lightning intro: skills as the unit of reuse, why local-first matters for clinical data, where ClawBio fits.</div>
      </div>
      <div class="wx-phase">
        <div class="wx-phase__num">02 · <span class="wx-phase__time">10 min</span></div>
        <div class="wx-phase__title">Install</div>
        <div class="wx-phase__body">Add ClawBio as a Claude Code plugin <em>or</em> <code>git clone</code> + <code>pip install</code>. Both routes work.</div>
      </div>
      <div class="wx-phase">
        <div class="wx-phase__num">03 · <span class="wx-phase__time">15 min</span></div>
        <div class="wx-phase__title">Demo run</div>
        <div class="wx-phase__body">Run <code>pharmgx --demo</code>. Inspect the generated report, figures, and reproducibility bundle.</div>
      </div>
      <div class="wx-phase">
        <div class="wx-phase__num">04 · <span class="wx-phase__time">15 min</span></div>
        <div class="wx-phase__title">Interpret</div>
        <div class="wx-phase__body">Hand the report to your agent. Ask: "Which drugs would this patient need a dose adjustment for, and why?"</div>
      </div>
      <div class="wx-phase">
        <div class="wx-phase__num">05 · <span class="wx-phase__time">10 min</span></div>
        <div class="wx-phase__title">Extend</div>
        <div class="wx-phase__body">Wire <code>pharmgx</code> into a multi-step skill: ingest patient file → call ClawBio → render a clinician-friendly summary card.</div>
      </div>
    </div>

    <p>Full walkthrough: <a href="{{ '/tutorials/11-pharmacogenomics' | relative_url }}"><strong>tutorials/11-pharmacogenomics</strong></a>.</p>
  </section>

  <section>
    <div class="wx-head"><h2>30-second taste</h2></div>
    <div class="wx-panel">
      <p>If you want to try it before the workshop, this is the whole demo:</p>
      <pre class="wx-codeblock"><span class="c"># Option A — Claude Code plugin</span>
<span class="k">/plugin</span> marketplace add ClawBio/ClawBio
<span class="k">/plugin</span> install clawbio

<span class="c"># Option B — local install</span>
git clone https://github.com/ClawBio/ClawBio.git && cd ClawBio
pip install -r requirements.txt
python clawbio.py run pharmgx --demo</pre>
      <p class="wx-tip">The <code>--demo</code> flag ships with synthetic genotypes so you can see the full report without bringing your own data. Bring a 23andMe or AncestryDNA file if you want to run it on yourself — <strong>your data stays on your laptop</strong>.</p>
    </div>
  </section>

  <section>
    <div class="wx-head"><h2>Bring this</h2></div>
    <div class="wx-panel">
      <ul class="wx-task">
        <li>Laptop with macOS, Windows, or Linux. Admin rights to install Python packages.</li>
        <li><strong>Python 3.10+</strong> (or Claude Code with the plugin marketplace enabled — either works).</li>
        <li><em>Optional:</em> a 23andMe <code>.txt</code>, AncestryDNA <code>.csv</code>, or VCF file you'd like to analyse on yourself.</li>
      </ul>
      <p class="wx-tip">No prior bioinformatics experience needed. If you've never written a VCF parser, that's the point — the skill does it for you. See <a href="{{ '/tutorials/01-setup' | relative_url }}">Setup</a> if you haven't installed an agent yet.</p>
    </div>
  </section>

  <div class="wx-mark">
    <span>// UKDRI · Skene Lab · Imperial × ClawBio</span>
    <span>v1.0 · 2026-04-29</span>
  </div>

</div>
