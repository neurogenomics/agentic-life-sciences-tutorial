---
layout: slides
title: "Getting Started with AI Coding Tools — Slides"
---

<section class="title-slide">
  <h1>Agentic AI for Life Sciences Workshop</h1>
  <p>Bytes and Bites Café follow-up · Informatics Theme</p>
  <p style="margin-top: 2em;">
    <img src="{{ site.baseurl }}/assets/images/slides/imperial-logo.png" alt="Imperial College London" style="height: 40px; margin: 0 15px;">
    <img src="{{ site.baseurl }}/assets/images/slides/ukdri-logo.png" alt="UK Dementia Research Institute" style="height: 40px; margin: 0 15px;">
    <img src="{{ site.baseurl }}/assets/images/slides/ukri-mrc.png" alt="UKRI MRC" style="height: 40px; margin: 0 15px;">
  </p>
</section>

<section>
  <h2>Chatbots vs Agents</h2>
  <div style="display: flex; gap: 2em; align-items: flex-start;">
    <div style="flex: 1;">
      <h3>Chatbots provide answers</h3>
      <p><strong>OpenAI ChatGPT:</strong></p>
      <img src="{{ site.baseurl }}/assets/images/slides/chatgpt-input.png" alt="ChatGPT interface" style="max-width: 90%; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.15);">
      <p><strong>Anthropic Claude:</strong></p>
      <img src="{{ site.baseurl }}/assets/images/slides/claude-chatbot-input.png" alt="Claude chatbot interface" style="max-width: 90%; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.15);">
    </div>
    <div style="flex: 1;">
      <h3>Agents complete tasks</h3>
      <p><strong>OpenAI Codex:</strong></p>
      <img src="{{ site.baseurl }}/assets/images/slides/codex-input.png" alt="Codex interface" style="max-width: 90%; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.15);">
      <p><strong>Anthropic Claude Code:</strong></p>
      <img src="{{ site.baseurl }}/assets/images/slides/claude-code-input.png" alt="Claude Code interface" style="max-width: 90%; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.15);">
    </div>
  </div>
  <p style="font-size: 0.7em; margin-top: 1em;">Chatbots and Agents both collect information from the web.<br>Agents take action by using "tools": reading documents, writing files, and calling APIs.</p>
</section>

<section>
  <h2>Landscape of Model Providers</h2>
  <table style="font-size: 0.7em;">
    <thead>
      <tr><th>Provider</th><th>Model(s)</th><th>Data Retention</th><th>Train on Prompts</th></tr>
    </thead>
    <tbody>
      <tr><td><a href="https://docs.github.com/en/copilot/reference/ai-models/model-hosting">GitHub Copilot</a></td><td>Claude, GPT, Gemini</td><td>Zero retention</td><td>✓ Does not train</td></tr>
      <tr><td>Anthropic</td><td>Opus, Sonnet, Haiku</td><td>Retained for 30 days</td><td>✓ Does not train</td></tr>
      <tr><td>Moonshot AI</td><td>Kimi</td><td>Zero retention</td><td>✓ Does not train</td></tr>
      <tr><td>OpenAI</td><td>Codex</td><td>Retained for unknown period</td><td>✓ Does not train</td></tr>
      <tr><td>xAI</td><td>Grok</td><td>Retained for 30 days</td><td>✓ Does not train</td></tr>
    </tbody>
  </table>
  <p style="font-size: 0.65em; margin-top: 1em;">This tutorial uses Moonshot AI's Kimi K2.5 — an open-source model with <strong>Zero Data Retention</strong>.</p>
  <p style="font-size: 0.6em; color: #666;">ZDR means the provider will not store your data for any period of time.<br>Some providers who do not train on your data still retain it (e.g. to scan for abuse or for legal reasons).</p>
</section>

<section>
  <h2>Terminology</h2>
  <div style="display: flex; justify-content: center; gap: 3em; margin: 1em 0;">
    <div style="text-align: center;">
      <img src="{{ site.baseurl }}/assets/images/slides/icon-monitor.svg" alt="Agent" style="height: 64px;">
      <p><strong>Agent</strong></p>
    </div>
    <div style="text-align: center;">
      <img src="{{ site.baseurl }}/assets/images/slides/icon-cloud.svg" alt="Provider" style="height: 64px;">
      <p><strong>Provider</strong></p>
    </div>
    <div style="text-align: center;">
      <img src="{{ site.baseurl }}/assets/images/slides/icon-server.svg" alt="Model" style="height: 64px;">
      <p><strong>Model</strong></p>
    </div>
  </div>
  <table style="font-size: 0.65em;">
    <thead>
      <tr><th>Purpose</th><th>Chat box for user to write prompts</th><th>Manages access to models, billing, and data</th><th>Generates output based on prompt</th></tr>
    </thead>
    <tbody>
      <tr><td><strong>Example #1</strong></td><td>Claude Code</td><td>Anthropic</td><td>Sonnet 4.6</td></tr>
      <tr><td><strong>Example #2</strong></td><td>OpenCode</td><td>GitHub Co-Pilot</td><td>Sonnet 4.6</td></tr>
      <tr><td><strong>Example #3</strong></td><td>OpenCode</td><td>OpenRouter</td><td>Kimi K2.5</td></tr>
    </tbody>
  </table>
</section>

<section>
  <h2>Setting Up an Agent</h2>
  <div style="display: flex; justify-content: center; gap: 3em; margin: 1em 0;">
    <div style="text-align: center;">
      <img src="{{ site.baseurl }}/assets/images/slides/icon-monitor.svg" alt="Agent" style="height: 48px;">
      <p style="font-size: 0.7em;"><strong>Agent</strong></p>
    </div>
    <div style="text-align: center;">
      <img src="{{ site.baseurl }}/assets/images/slides/icon-cloud.svg" alt="Provider" style="height: 48px;">
      <p style="font-size: 0.7em;"><strong>Provider</strong></p>
    </div>
    <div style="text-align: center;">
      <img src="{{ site.baseurl }}/assets/images/slides/icon-server.svg" alt="Model" style="height: 48px;">
      <p style="font-size: 0.7em;"><strong>Model</strong></p>
    </div>
  </div>
  <div style="display: flex; gap: 2em; font-size: 0.75em;">
    <div style="flex: 1; background: #f0f4f8; padding: 1em; border-radius: 8px;">
      <h3 style="font-size: 1em;">Current setup</h3>
      <ul>
        <li><strong>OpenCode</strong> agent</li>
        <li><strong>OpenRouter:</strong> Moonshot AI as provider</li>
        <li><strong>Kimi K2.5</strong> — strong open-source model</li>
      </ul>
    </div>
    <div style="flex: 1; background: #f0f4f8; padding: 1em; border-radius: 8px;">
      <h3 style="font-size: 1em;">For Anthropic models</h3>
      <ul>
        <li><strong>OpenCode</strong> agent</li>
        <li><strong>GitHub Copilot</strong> as provider (via GitHub Education)</li>
        <li><strong>Opus 4.5</strong> or other available models</li>
      </ul>
    </div>
  </div>
</section>
