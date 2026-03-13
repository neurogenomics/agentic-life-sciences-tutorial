---
layout: slides
title: "Data Analysis with AI — Slides"
---

<section class="title-slide">
  <h1>Data Analysis with Agents</h1>
  <p>From Dataset to Publication Figures</p>
  <p style="margin-top: 1em;">
    <img src="{{ site.baseurl }}/assets/images/slides/github-logo.jpeg" alt="GitHub" style="height: 40px; border-radius: 50%;">
  </p>
</section>

<section>
  <h2>Plan</h2>
  <ul>
    <li>Introduction to <strong>"Plan" mode</strong> to guide work</li>
    <li>Discussing task with agent</li>
    <li>Generating figures and outputs</li>
  </ul>
</section>

<section>
  <h2>Steps</h2>
  <ol style="font-size: 0.75em;">
    <li>Download the <a href="https://allisonhorst.github.io/palmerpenguins/">"Palmer Penguins dataset"</a> to your folder.</li>
    <li>Switch to <strong>Plan mode</strong> — the agent won't start building yet. It will ask questions to guide your progress.</li>
    <li>Prompt the agent:
      <blockquote style="font-size: 0.9em; background: #f0f4f8; padding: 0.5em 1em; border-radius: 6px; border-left: 4px solid #0AC8FF;">
        Make me some figures of the Palmer Penguins dataset attached. Output the figure in an Excel file.
      </blockquote>
    </li>
    <li>Interact with Plan mode — answer questions or update your request.</li>
    <li>Change from <strong>Plan mode → Build mode</strong> and prompt it to begin (i.e. "go").</li>
    <li>If it gets stuck, prompt <em>"complete analysis"</em> and it will continue.</li>
  </ol>
</section>
