---
layout: default
title: Agentic AI for Neuroscience Workshop
permalink: /workshops/agentic-ai-neuroscience-2026/
---

<style>
  :root {
    --ink: #1a0f08;
    --paper: #fff7ee;
    --accent: #ff5a1f;
    --accent-2: #ffb547;
    --line: rgba(26, 15, 8, 0.12);
  }

  html, body { background: var(--paper); }
  main#main-content {
    background:
      radial-gradient(65% 50% at 0% 0%, rgba(255, 90, 31, 0.22), transparent 60%),
      radial-gradient(55% 45% at 100% 10%, rgba(255, 181, 71, 0.28), transparent 60%),
      radial-gradient(70% 60% at 50% 100%, rgba(255, 120, 60, 0.18), transparent 65%),
      linear-gradient(180deg, #fff3e1 0%, #ffe6c9 50%, #ffd3a2 100%);
    min-height: 100vh;
  }
  .site-header { background: transparent !important; border-bottom-color: rgba(26, 15, 8, 0.08) !important; }

  .wx {
    max-width: 1320px;
    margin: 0 auto;
    padding: 1.5rem 2rem;
    color: var(--ink);
    font-feature-settings: "ss01", "cv11";
  }
  @media (max-width: 700px) {
    .wx { padding: 1rem 1rem 2rem; }
  }

  /* ---------- hero + QR row (single viewport) ---------- */
  .wx-top {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }

  .wx-title {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 1.5rem;
    padding: 0.25rem 0.5rem 1rem;
    border-bottom: 2px solid var(--ink);
    flex-wrap: wrap;
  }
  .wx-title h1 {
    margin: 0;
    font-size: clamp(1.8rem, 4.5vw, 3.4rem);
    line-height: 1;
    letter-spacing: -0.025em;
    font-weight: 800;
  }
  .wx-title h1 em {
    font-style: normal;
    background: linear-gradient(90deg, #ff5a1f, #c2410c);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  .wx-title__date {
    font-family: "JetBrains Mono", ui-monospace, monospace;
    font-size: 0.95rem;
    letter-spacing: 0.05em;
    color: var(--ink);
    opacity: 0.7;
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
    font-size: 0.7rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    padding: 0.3rem 0.7rem;
    border: 1px solid rgba(255,255,255,0.35);
    border-radius: 999px;
    backdrop-filter: blur(6px);
    color: #ffd3a2;
  }
  .wx-hero__tag::before {
    content: "";
    width: 8px; height: 8px; border-radius: 50%;
    background: var(--accent);
    box-shadow: 0 0 12px var(--accent);
  }
  .wx-hero h1 {
    font-size: clamp(1.6rem, 2.6vw, 2.4rem);
    line-height: 1;
    letter-spacing: -0.02em;
    margin: 0;
    font-weight: 800;
  }
  .wx-hero h1 em {
    font-style: normal;
    background: linear-gradient(90deg, #ff5a1f, #ffd3a2);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  .wx-hero__meta {
    display: flex;
    gap: 1.5rem;
    margin: 0;
    padding-left: 1.5rem;
    border-left: 1px solid rgba(255,255,255,0.18);
  }
  .wx-hero__meta > div { min-width: 0; }
  .wx-hero__meta dt {
    font-size: 0.6rem;
    letter-spacing: 0.13em;
    text-transform: uppercase;
    opacity: 0.55;
    margin-bottom: 0.2rem;
  }
  .wx-hero__meta dd { margin: 0; font-weight: 500; font-size: 0.85rem; }
  @media (max-width: 760px) {
    .wx-hero__meta { padding-left: 0; border-left: none; border-top: 1px solid rgba(255,255,255,0.18); padding-top: 0.75rem; flex-wrap: wrap; }
  }

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
    grid-template-columns: repeat(5, 1fr);
    gap: 0.85rem;
  }
  @media (max-width: 900px) {
    .wx-qr { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 520px) {
    .wx-qr { grid-template-columns: 1fr; }
  }
  .wx-qr__card {
    background: rgba(255, 255, 255, 0.82);
    backdrop-filter: blur(8px);
    border: 1px solid var(--line);
    border-radius: 18px;
    padding: 1.5rem 1.5rem 1.25rem;
    position: relative;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
    display: flex;
    flex-direction: column;
    text-decoration: none;
    color: inherit;
    gap: 0.4rem;
  }
  .wx-qr__card:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 28px -16px rgba(11, 15, 26, 0.25);
  }
  .wx-qr__card--accent {
    background: linear-gradient(180deg, rgba(255, 90, 31, 0.95), rgba(255, 120, 60, 0.95));
    color: #fff;
    border-color: rgba(255, 90, 31, 0.6);
  }
  .wx-qr__card--accent .wx-qr__label { color: #fff; opacity: 0.9; }
  .wx-qr__card--accent .wx-qr__title { color: #fff; }
  .wx-qr__card--accent .wx-qr__link { color: rgba(255,255,255,0.9); }
  .wx-qr__card--accent .wx-qr__img { background: rgba(255, 255, 255, 0.9); }
  .wx-qr__label {
    font-size: 0.65rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--accent);
    font-weight: 700;
  }
  .wx-qr__title {
    font-size: 1.2rem;
    font-weight: 700;
    margin: 0;
    letter-spacing: -0.01em;
  }
  .wx-qr__img {
    background: var(--paper);
    border-radius: 10px;
    padding: 0.75rem;
    display: flex;
    justify-content: center;
    margin-top: 0.25rem;
  }
  .wx-qr__img img {
    width: 100%;
    max-width: 280px;
    height: auto;
    image-rendering: pixelated;
  }
  .wx-qr__link {
    margin-top: 0.75rem;
    font-family: "JetBrains Mono", ui-monospace, monospace;
    font-size: 0.85rem;
    color: var(--ink);
    word-break: break-all;
    text-decoration: none;
    display: block;
    line-height: 1.35;
    font-weight: 500;
  }
  .wx-qr__card--accent .wx-qr__link { color: #fff; opacity: 0.95; }

  /* ---------- section heads ---------- */
  .wx-head {
    display: flex;
    align-items: baseline;
    gap: 1rem;
    margin: 1.5rem 0 0.75rem;
    padding-bottom: 0.4rem;
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
    margin-top: 1.25rem;
    padding-top: 0.75rem;
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
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(8px);
    border: 1px solid var(--line);
    border-radius: 14px;
    padding: 1.25rem 1.5rem;
  }

  /* ---------- figure block ---------- */
  .wx-figure {
    margin-top: 1rem;
    background: #fff;
    border: 1px solid var(--line);
    border-radius: 14px;
    overflow: hidden;
    display: grid;
    grid-template-columns: minmax(0, 2.2fr) minmax(220px, 1fr);
    box-shadow: 0 20px 40px -24px rgba(26, 15, 8, 0.25);
  }
  @media (max-width: 780px) { .wx-figure { grid-template-columns: 1fr; } }
  .wx-figure img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    background: var(--paper);
    max-height: 420px;
    padding: 1rem;
  }
  .wx-figure__meta {
    padding: 1.25rem 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
    font-size: 0.9rem;
    border-left: 1px solid var(--line);
  }
  @media (max-width: 780px) { .wx-figure__meta { border-left: none; border-top: 1px solid var(--line); } }
  .wx-figure__actions { display: flex; gap: 0.5rem; flex-wrap: wrap; }
  .wx-figure__actions a {
    display: inline-block;
    padding: 0.55rem 1rem;
    background: var(--ink);
    color: #fff;
    border-radius: 999px;
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    text-decoration: none;
  }
  .wx-figure__actions a:first-child {
    background: var(--accent);
  }
  .wx-figure__actions a:hover { transform: translateY(-1px); }
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
    <section class="wx-title">
      <h1>Agentic AI for <em>Neuroscience</em></h1>
      <span class="wx-title__date">15 April 2026</span>
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

      <a class="wx-qr__card wx-qr__card--accent" href="{{ '/tutorials/08-figure-legend-challenge' | relative_url }}">
        <span class="wx-qr__label">Challenge</span>
        <div class="wx-qr__title">Generate figure legends</div>
        <div class="wx-qr__img">
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=400x400&margin=0&data=https%3A%2F%2Fneurogenomics.github.io%2Fagentic-life-sciences-tutorial%2Ftutorials%2F08-figure-legend-challenge&color=0b0f1a&bgcolor=f6f5f1" alt="QR code to challenge">
        </div>
        <span class="wx-qr__link">tutorials/08-figure-legend-challenge</span>
      </a>
    </div>
  </div>

  <div class="wx-mark">
    <span>// UKDRI · Skene Lab · Imperial</span>
    <span>v1.2 · 2026-04-15</span>
  </div>

</div>
