---
layout: slides
title: "Managing Context — Slides"
---

<section class="title-slide">
  <h1>Managing Context</h1>
  <p>Reducing Hallucinations and Run Costs</p>
</section>

<section>
  <h2>Agent Context Window</h2>
  <div style="font-size: 0.7em;">
    <p>Every agent has a <strong>context window</strong> — the total amount of text it can "see" at once.</p>
    <div style="background: linear-gradient(to right, #00326E 12.3%, #0AC8FF 12.3%, #0AC8FF 14.6%, #4a90d9 14.6%, #4a90d9 55%, #e8e8e8 55%, #e8e8e8 98.5%, #ff6b6b 98.5%); height: 40px; border-radius: 6px; margin: 1em 0;"></div>
    <div style="display: flex; justify-content: space-between; font-size: 0.85em;">
      <span>System (12.3%)</span>
      <span>MCP tools (2.3%)</span>
      <span>Messages (40.4%)</span>
      <span>Free (43.4%)</span>
      <span style="color: #ff6b6b;">Buffer (1.5%)</span>
    </div>
    <p style="margin-top: 1em;">As context fills up, the model gets slower, more expensive, and more likely to hallucinate.</p>
  </div>
</section>

<section>
  <h2>Context and Cost</h2>
  <img src="{{ site.baseurl }}/assets/images/slides/cost-chart.png" alt="Cost per message vs context size" style="max-height: 340px;">
  <table style="font-size: 0.55em; margin-top: 0.5em;">
    <thead>
      <tr><th>Model</th><th>$/MTok input</th><th>Context</th><th>/50k</th><th>/150k</th><th>/max</th></tr>
    </thead>
    <tbody>
      <tr><td>GPT-4o mini</td><td>$0.15</td><td>128k</td><td>$0.01</td><td>$0.02</td><td>$0.02</td></tr>
      <tr><td>Kimi K2.5</td><td>$0.60</td><td>256k</td><td>$0.03</td><td>$0.09</td><td>$0.15</td></tr>
      <tr><td>Claude Haiku 4.5</td><td>$1.00</td><td>200k</td><td>$0.05</td><td>$0.15</td><td>$0.20</td></tr>
      <tr><td>Claude Sonnet 4.6</td><td>$3.00</td><td>200k</td><td>$0.15</td><td>$0.45</td><td>$0.60</td></tr>
      <tr><td>Claude Opus 4.6</td><td>$5.00</td><td>200k</td><td>$0.25</td><td>$0.75</td><td>$1.00</td></tr>
    </tbody>
  </table>
</section>

<section>
  <h2>Context Commands</h2>
  <div style="font-size: 0.8em;">
    <table>
      <tbody>
        <tr><td><code>/context</code></td><td>See how much context is being used</td></tr>
        <tr><td><code>/compact</code></td><td>Compress the conversation to free up context</td></tr>
        <tr><td><code>/clear</code></td><td>Reset the conversation entirely</td></tr>
        <tr><td><code>/statusline</code></td><td>Show live context and cost: <code>[ctx: 50%] $49.05</code></td></tr>
      </tbody>
    </table>
  </div>
</section>

<section>
  <h2>Skills</h2>
  <div style="display: flex; gap: 2em; font-size: 0.7em;">
    <div style="flex: 1; background: #fff0f0; padding: 1em; border-radius: 8px;">
      <h3 style="font-size: 1.1em;">Without skill</h3>
      <ul>
        <li>User provides instructions each time</li>
        <li>15 back-and-forth messages</li>
        <li>3 failed API calls requiring retry</li>
        <li><strong>12,000 tokens consumed</strong></li>
      </ul>
    </div>
    <div style="flex: 1; background: #f0fff0; padding: 1em; border-radius: 8px;">
      <h3 style="font-size: 1.1em;">With skill</h3>
      <ul>
        <li>Automatic workflow execution</li>
        <li>2 clarifying questions only</li>
        <li>0 failed API calls</li>
        <li><strong>6,000 tokens consumed</strong></li>
      </ul>
    </div>
  </div>
</section>
