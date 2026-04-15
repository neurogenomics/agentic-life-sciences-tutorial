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
    max-width: 1200px;
    margin: 0 auto;
    padding: 3rem 1.5rem 4rem;
    color: var(--ink);
    font-feature-settings: "ss01", "cv11";
  }

  /* ---------- hero ---------- */
  .wx-hero {
    position: relative;
    border: 1px solid var(--line);
    border-radius: 20px;
    padding: 3.5rem 2rem 3rem;
    overflow: hidden;
    background: var(--ink);
    color: #fff;
    isolation: isolate;
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
    font-size: clamp(2.4rem, 6vw, 4.8rem);
    line-height: 0.95;
    letter-spacing: -0.02em;
    margin: 1.5rem 0 0.75rem;
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
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1rem 2rem;
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(255,255,255,0.18);
    font-size: 0.95rem;
  }
  .wx-hero__meta dt {
    font-size: 0.7rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    opacity: 0.6;
    margin-bottom: 0.25rem;
  }
  .wx-hero__meta dd { margin: 0; font-weight: 500; }

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

  /* ---------- QR grid ---------- */
  .wx-qr {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.25rem;
    margin-top: 1rem;
  }
  .wx-qr__card {
    background: #fff;
    border: 1px solid var(--line);
    border-radius: 18px;
    padding: 1.75rem 1.5rem 1.25rem;
    position: relative;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    display: flex;
    flex-direction: column;
  }
  .wx-qr__card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px -20px rgba(11, 15, 26, 0.25);
  }
  .wx-qr__card::after {
    content: attr(data-index);
    position: absolute;
    top: 1rem; right: 1.25rem;
    font-family: "JetBrains Mono", ui-monospace, monospace;
    font-size: 0.7rem;
    color: #999;
    letter-spacing: 0.1em;
  }
  .wx-qr__label {
    font-size: 0.7rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--accent);
    font-weight: 600;
  }
  .wx-qr__title {
    font-size: 1.35rem;
    font-weight: 700;
    margin: 0.4rem 0 0.35rem;
    letter-spacing: -0.01em;
  }
  .wx-qr__desc {
    color: #555;
    font-size: 0.9rem;
    margin-bottom: 1rem;
    flex-grow: 1;
  }
  .wx-qr__img {
    background: var(--paper);
    border-radius: 12px;
    padding: 1rem;
    display: flex;
    justify-content: center;
  }
  .wx-qr__img img {
    width: 100%;
    max-width: 220px;
    height: auto;
    image-rendering: pixelated;
  }
  .wx-qr__link {
    margin-top: 1rem;
    font-family: "JetBrains Mono", ui-monospace, monospace;
    font-size: 0.75rem;
    color: var(--accent-2);
    word-break: break-all;
    text-decoration: none;
    display: inline-block;
    border-top: 1px dashed var(--line);
    padding-top: 0.75rem;
  }
  .wx-qr__link:hover { text-decoration: underline; }

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

  @media (max-width: 640px) {
    .wx-hero { padding: 2.5rem 1.5rem 2rem; }
    .wx-step { border-right: none; border-bottom: 1px solid var(--line); }
    .wx-step:last-child { border-bottom: none; }
  }
</style>

<div class="wx">

  <section class="wx-hero">
    <span class="wx-hero__tag">Workshop · Live today</span>
    <h1>Agentic AI<br>for <em>Neuroscience</em>.</h1>
    <dl class="wx-hero__meta">
      <div><dt>Date</dt><dd>15 April 2026</dd></div>
      <div><dt>Host</dt><dd>UK Dementia Research Institute</dd></div>
      <div><dt>Venue</dt><dd>Imperial College London</dd></div>
      <div><dt>Channel</dt><dd>#agentic-ai-for-neuroscience-workshop</dd></div>
    </dl>
  </section>

  <div class="wx-head">
    <h2>Start here</h2>
    <span class="wx-head__count">03 steps</span>
  </div>

  <ol class="wx-steps">
    <li class="wx-step">
      <div class="wx-step__num">01</div>
      <div class="wx-step__title">Join Slack</div>
      <div class="wx-step__body">Introduce yourself in the workshop channel.</div>
    </li>
    <li class="wx-step">
      <div class="wx-step__num">02</div>
      <div class="wx-step__title">Open the tutorials</div>
      <div class="wx-step__body">Start with Tutorial 01 — Setup on your laptop.</div>
    </li>
    <li class="wx-step">
      <div class="wx-step__num">03</div>
      <div class="wx-step__title">Submit the strategy form</div>
      <div class="wx-step__body">Share how you want agentic AI in your research.</div>
    </li>
  </ol>

  <div class="wx-head">
    <h2>Scan to join</h2>
    <span class="wx-head__count">03 codes</span>
  </div>

  <div class="wx-qr">

    <a class="wx-qr__card" data-index="01 · TUTORIALS" href="https://neurogenomics.github.io/agentic-life-sciences-tutorial/">
      <span class="wx-qr__label">Skills Cookbook</span>
      <div class="wx-qr__title">Tutorials</div>
      <p class="wx-qr__desc">Follow the Skills Cookbook at your own pace. Six tutorials, one challenge.</p>
      <div class="wx-qr__img">
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=400x400&margin=0&data=https%3A%2F%2Fneurogenomics.github.io%2Fagentic-life-sciences-tutorial%2F&color=0b0f1a&bgcolor=f6f5f1" alt="QR code to tutorials">
      </div>
      <span class="wx-qr__link">neurogenomics.github.io/agentic-life-sciences-tutorial</span>
    </a>

    <a class="wx-qr__card" data-index="02 · SLACK" href="https://join.slack.com/share/enQtMTA5NDY1MDgyNjkyMzItNDRlMGU0ODM1NTEzNGQ1NjA2Y2U3ZGMyZWYwYjQwYTczNjhkMmY1ODAzM2YxOGNjOTQzMzBhYmVlMTJmYjMzYQ">
      <span class="wx-qr__label">Community</span>
      <div class="wx-qr__title">Slack workspace</div>
      <p class="wx-qr__desc">#agentic-ai-for-neuroscience-workshop. Ask questions, share outputs, post screenshots.</p>
      <div class="wx-qr__img">
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=400x400&margin=0&data=https%3A%2F%2Fjoin.slack.com%2Fshare%2FenQtMTA5NDY1MDgyNjkyMzItNDRlMGU0ODM1NTEzNGQ1NjA2Y2U3ZGMyZWYwYjQwYTczNjhkMmY1ODAzM2YxOGNjOTQzMzBhYmVlMTJmYjMzYQ&color=0b0f1a&bgcolor=f6f5f1" alt="QR code to Slack">
      </div>
      <span class="wx-qr__link">join.slack.com/share/...</span>
    </a>

    <a class="wx-qr__card" data-index="03 · FORM" href="https://forms.cloud.microsoft/e/mF0jqv9Xr1">
      <span class="wx-qr__label">Tell us</span>
      <div class="wx-qr__title">AI strategy form</div>
      <p class="wx-qr__desc">Two minutes. How you want to use agentic AI in your research.</p>
      <div class="wx-qr__img">
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=400x400&margin=0&data=https%3A%2F%2Fforms.cloud.microsoft%2Fe%2FmF0jqv9Xr1&color=0b0f1a&bgcolor=f6f5f1" alt="QR code to form">
      </div>
      <span class="wx-qr__link">forms.cloud.microsoft/e/mF0jqv9Xr1</span>
    </a>

  </div>

  <div class="wx-mark">
    <span>// UKDRI · Skene Lab · Imperial</span>
    <span>v1.0 · 2026-04-15</span>
  </div>

</div>
