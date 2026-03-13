---
layout: slides
title: "Automated Presentations — Slides"
---

<section class="title-slide">
  <h1>Generated Presentations</h1>
  <p>From Papers to PowerPoint</p>
  <p style="margin-top: 1em;">
    <img src="{{ site.baseurl }}/assets/images/slides/github-logo.jpeg" alt="GitHub" style="height: 40px; border-radius: 50%;">
  </p>
</section>

<section>
  <h2>Plan</h2>
  <ul>
    <li>Agent retrieval augmented generation</li>
    <li>Complex generation task</li>
    <li>Iteration to improve output</li>
  </ul>
</section>

<section>
  <h2>Steps</h2>
  <ol style="font-size: 0.75em;">
    <li>You can run this in <strong>Plan mode</strong> to optimise the output.</li>
    <li>Prompt the agent:
      <blockquote style="font-size: 0.9em; background: #f0f4f8; padding: 0.5em 1em; border-radius: 6px; border-left: 4px solid #0AC8FF;">
        Make me 5-10 slide presentation for Journal club for this paper: https://www.nature.com/articles/s41588-024-01919-z<br>
        • Keep word usage low<br>
        • Include main figures<br>
        • Summarise key take aways from paper<br>
        • Output it as a powerpoint
      </blockquote>
    </li>
    <li>Interact with Plan mode — answer questions or update your request.</li>
    <li>Change from <strong>Plan mode → Build mode</strong> and prompt it to begin (i.e. "go").</li>
    <li>If it gets stuck, prompt <em>"complete analysis"</em> and it will continue.</li>
  </ol>
</section>
