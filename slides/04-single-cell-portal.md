---
layout: slides
title: "Data Portal for Single Cell Sequencing — Slides"
---

<section class="title-slide">
  <h1>Interactive Data Portal</h1>
  <p>Data Portal for Single Cell Sequencing</p>
  <p style="margin-top: 1em;">
    <img src="{{ site.baseurl }}/assets/images/slides/github-logo.jpeg" alt="GitHub" style="height: 40px; border-radius: 50%;">
  </p>
</section>

<section>
  <h2>Plan</h2>
  <ul>
    <li>Organising and executing more complex projects</li>
    <li>Build an interactive data portal</li>
    <li>Hosting projects on GitHub</li>
  </ul>
</section>

<section>
  <h2>Steps</h2>
  <ol style="font-size: 0.72em;">
    <li>Browse the <a href="https://cellxgene.cziscience.com/">CELLxGENE collections</a> and find a dataset.<br>
        <em>Example: Allen Institute Adult Human Brain Atlas — midbrain (substantia nigra) snRNA-seq.</em></li>
    <li>Download the data (<code>.h5ad</code>) to your laptop.</li>
    <li>In <strong>Plan mode</strong>, type:
      <blockquote style="font-size: 0.9em; background: #f0f4f8; padding: 0.5em 1em; border-radius: 6px; border-left: 4px solid #0AC8FF;">
        Build an interactive viewer for my single-cell RNA data. The file is at [path/to/data.h5ad].
      </blockquote>
    </li>
    <li>Switch to <strong>Build mode</strong> and prompt it to begin.</li>
  </ol>
</section>

<section>
  <h2>Publishing to GitHub</h2>
  <ol style="font-size: 0.8em;">
    <li>Download <a href="https://cli.github.com/">GitHub CLI</a></li>
    <li>Authenticate: <code>gh auth login</code></li>
    <li>In chat mode, ask:
      <blockquote style="font-size: 0.9em; background: #f0f4f8; padding: 0.5em 1em; border-radius: 6px; border-left: 4px solid #0AC8FF;">
        Push my project to a new GitHub repository called [your-repo-name]
      </blockquote>
    </li>
  </ol>
</section>
