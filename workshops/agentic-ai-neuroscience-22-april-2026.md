---
layout: default
title: Agentic AI for Neuroscience — Second Brain Workshop
permalink: /workshops/agentic-ai-neuroscience-22-april-2026/
---

<style>
  :root {
    --ink: #0b0f1a;
    --paper: #f6f5f1;
    --accent: #3b6bff;
    --accent-2: #7ea0ff;
    --line: rgba(11, 15, 26, 0.12);
  }

  html, body { background: var(--paper); }
  main#main-content {
    background:
      radial-gradient(65% 50% at 0% 0%, rgba(59, 107, 255, 0.14), transparent 60%),
      radial-gradient(55% 45% at 100% 10%, rgba(126, 160, 255, 0.18), transparent 60%),
      radial-gradient(70% 60% at 50% 100%, rgba(59, 107, 255, 0.10), transparent 65%),
      linear-gradient(180deg, #f6f5f1 0%, #edf0fb 60%, #e0e7ff 100%);
    min-height: 100vh;
  }
  .site-header { background: transparent !important; border-bottom-color: rgba(11, 15, 26, 0.08) !important; }

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
    background: linear-gradient(90deg, #3b6bff, #1d3fb3);
    -webkit-background-clip: text; background-clip: text; color: transparent;
  }
  .wx-title__date { font-family: "JetBrains Mono", ui-monospace, monospace; font-size: 0.95rem; letter-spacing: 0.05em; color: var(--ink); opacity: 0.7; }

  /* ---------- phase strip ---------- */
  .wx-phases {
    display: grid; grid-template-columns: repeat(6, 1fr); gap: 0;
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
  .wx-qr__card:hover { transform: translateY(-2px); box-shadow: 0 12px 28px -16px rgba(11, 15, 26, 0.25); }
  .wx-qr__card--accent {
    background: linear-gradient(180deg, rgba(59, 107, 255, 0.95), rgba(29, 63, 179, 0.95));
    color: #fff; border-color: rgba(59, 107, 255, 0.6);
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
  .wx-lead { font-size: 1.15rem; font-weight: 500; letter-spacing: -0.01em; margin: 0 0 1rem; line-height: 1.45; }
  .wx-task { margin: 0 0 1.25rem 1.25rem; padding: 0; }
  .wx-task li { margin: 0.35rem 0; }
  .wx-tip { background: rgba(59, 107, 255, 0.06); border-left: 3px solid var(--accent); padding: 0.75rem 1rem; border-radius: 4px; font-size: 0.92rem; }
  .wx-tip code { background: rgba(11,15,26,0.08); padding: 0.05rem 0.35rem; border-radius: 4px; font-size: 0.85em; }

  /* stretch grid */
  .wx-stretch { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 0.85rem; margin-top: 0.75rem; }
  .wx-stretch__card { background: #fff; border: 1px solid var(--line); border-radius: 12px; padding: 1rem 1.1rem; }
  .wx-stretch__card h4 { margin: 0 0 0.3rem; font-size: 1rem; font-weight: 700; }
  .wx-stretch__card p { margin: 0; font-size: 0.87rem; color: #555; }

  @media (max-width: 640px) { .wx-phase { border-right: none; border-bottom: 1px solid var(--line); } .wx-phase:last-child { border-bottom: none; } }
</style>

<div class="wx">

  <div class="wx-top">
    <section class="wx-title">
      <h1>Agentic AI for <em>Neuroscience</em> · Second Brain</h1>
      <span class="wx-title__date">22 April 2026</span>
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
        <div class="wx-qr__title">Workshop Slack</div>
        <div class="wx-qr__img">
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=400x400&margin=0&data=https%3A%2F%2Fjoin.slack.com%2Fshare%2FenQtMTA5NDY1MDgyNjkyMzItNDRlMGU0ODM1NTEzNGQ1NjA2Y2U3ZGMyZWYwYjQwYTczNjhkMmY1ODAzM2YxOGNjOTQzMzBhYmVlMTJmYjMzYQ&color=0b0f1a&bgcolor=f6f5f1" alt="QR code to Slack">
        </div>
        <span class="wx-qr__link">#agentic-ai-for-neuroscience-workshop</span>
      </a>

      <a class="wx-qr__card" href="https://join.slack.com/share/enQtMTA5MjI1MTA5Mjk2NjgtNzk5ZDQ3ODQyZDFjOWJlMWExOTQxNGM2Y2VkYjJlZTBhODZjOWIzNTc2MDE1NGQ4ZmEzNDk5ZDlmY2E4YjU1OQ">
        <span class="wx-qr__label">Slack</span>
        <div class="wx-qr__title">Agentic AI channel</div>
        <div class="wx-qr__img">
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=400x400&margin=0&data=https%3A%2F%2Fjoin.slack.com%2Fshare%2FenQtMTA5MjI1MTA5Mjk2NjgtNzk5ZDQ3ODQyZDFjOWJlMWExOTQxNGM2Y2VkYjJlZTBhODZjOWIzNTc2MDE1NGQ4ZmEzNDk5ZDlmY2E4YjU1OQ&color=0b0f1a&bgcolor=f6f5f1" alt="QR code to #lab-agentic-ai Slack channel">
        </div>
        <span class="wx-qr__link">#lab-agentic-ai</span>
      </a>

      <a class="wx-qr__card" href="https://forms.cloud.microsoft/e/mF0jqv9Xr1">
        <span class="wx-qr__label">Form</span>
        <div class="wx-qr__title">AI strategy</div>
        <div class="wx-qr__img">
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=400x400&margin=0&data=https%3A%2F%2Fforms.cloud.microsoft%2Fe%2FmF0jqv9Xr1&color=0b0f1a&bgcolor=f6f5f1" alt="QR code to form">
        </div>
        <span class="wx-qr__link">forms.cloud.microsoft/e/mF0jqv9Xr1</span>
      </a>

      <a class="wx-qr__card wx-qr__card--accent" href="{{ '/tutorials/09-second-brain' | relative_url }}">
        <span class="wx-qr__label">Today's tutorial</span>
        <div class="wx-qr__title">Second Brain walkthrough</div>
        <div class="wx-qr__img">
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=400x400&margin=0&data=https%3A%2F%2Fneurogenomics.github.io%2Fagentic-life-sciences-tutorial%2Ftutorials%2F09-second-brain&color=0b0f1a&bgcolor=f6f5f1" alt="QR to second brain tutorial">
        </div>
        <span class="wx-qr__link">tutorials/09-second-brain</span>
      </a>
    </div>
  </div>

  <section>
    <div class="wx-head"><h2>The plan</h2><span class="wx-head__count">90 min · 6 phases</span></div>

    <p class="wx-lead">
      Build a personal research wiki from a folder of your own papers.
      Agent ingests raw PDFs, compiles a wiki of summaries and concepts with backlinks,
      then you query across it and render the answer as markdown or slides.
      Follows <a href="https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f" target="_blank" rel="noopener">Karpathy's LLM Knowledge Bases</a> pattern.
      Process slides: <a href="{{ '/workshops/22-april-slides.html' | relative_url }}">22-april-slides.html</a>.
      OpenRouter API key is posted in Slack.
    </p>

    <div class="wx-phases">
      <div class="wx-phase">
        <div class="wx-phase__num">01 · <span class="wx-phase__time">5 min</span></div>
        <div class="wx-phase__title">Kickoff</div>
        <div class="wx-phase__body">Shared OpenRouter key via QR. Agent / provider / model layers recap.</div>
      </div>
      <div class="wx-phase">
        <div class="wx-phase__num">02 · <span class="wx-phase__time">20 min</span></div>
        <div class="wx-phase__title">Install</div>
        <div class="wx-phase__body">Obsidian + opencode + paste key + open empty vault folder.</div>
      </div>
      <div class="wx-phase">
        <div class="wx-phase__num">03 · <span class="wx-phase__time">10 min</span></div>
        <div class="wx-phase__title">Ingest</div>
        <div class="wx-phase__body">Drop 3–5 papers into <code>raw/</code>. Optionally clip one web article via Obsidian Web Clipper.</div>
      </div>
      <div class="wx-phase">
        <div class="wx-phase__num">04 · <span class="wx-phase__time">25 min</span></div>
        <div class="wx-phase__title">Compile</div>
        <div class="wx-phase__body">Agent writes <code>wiki/</code>: per-paper summaries, concept articles, backlinks.</div>
      </div>
      <div class="wx-phase">
        <div class="wx-phase__num">05 · <span class="wx-phase__time">20 min</span></div>
        <div class="wx-phase__title">Q&amp;A</div>
        <div class="wx-phase__body">Ask one cross-paper question; render the answer as a <code>.md</code> file or Marp deck.</div>
      </div>
      <div class="wx-phase">
        <div class="wx-phase__num">06 · <span class="wx-phase__time">10 min</span></div>
        <div class="wx-phase__title">Share</div>
        <div class="wx-phase__body">3–4 people share their wiki in Slack. Post one surprising connection the agent found.</div>
      </div>
    </div>
  </section>

  <section>
    <div class="wx-head"><h2>Bring this</h2></div>
    <div class="wx-panel">
      <ul class="wx-task">
        <li>Laptop with macOS, Windows, or Linux. Admin rights to install apps.</li>
        <li><strong>3–5 PDFs</strong> of papers you actually want to think about — review articles + primary research works best.</li>
      </ul>
      <p class="wx-tip">No need to install anything in advance — we will install <strong>Obsidian</strong> and <strong>opencode</strong> together during the install phase. If you want to get ahead, see <a href="{{ '/tutorials/01-setup' | relative_url }}">Setup</a> and <a href="{{ '/tutorials/get-opencode' | relative_url }}">Get OpenCode</a>.</p>
    </div>
  </section>

  <div class="wx-mark">
    <span>// UKDRI · Skene Lab · Imperial</span>
    <span>v1.0 · 2026-04-22</span>
  </div>

</div>
