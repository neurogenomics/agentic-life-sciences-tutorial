#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.10"
# dependencies = ["matplotlib>=3.8"]
# ///
"""Rebuild three explanatory diagrams from the UK DRI workshop deck (13 Mar 2026)
as reproducible, on-brand tutorial assets:

  chatbot-vs-agent.png     (deck slide 2)
  agent-provider-model.png (deck slide 4)
  skills-comparison.png    (deck slide 13)

    uv run scripts/deck_diagrams.py
"""

from __future__ import annotations

from pathlib import Path

import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch, Circle, FancyArrowPatch

SURFACE = "#fcfcfb"
INK = "#0b0b0b"
MUTED = "#898781"
LINE = "#d7d6cf"
BLUE = "#2a78d6"
GREEN = "#008300"
NAVY = "#12395c"
CYAN = "#1c86c9"
RED = "#e34948"

ASSETS = Path(__file__).resolve().parent.parent / "assets" / "images"

plt.rcParams.update({
    "font.family": "sans-serif",
    "font.sans-serif": ["Helvetica Neue", "Helvetica", "Arial", "DejaVu Sans"],
    "figure.facecolor": SURFACE,
})


def _card(ax, x, y, w, h, accent):
    ax.add_patch(FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0,rounding_size=0.12",
                 facecolor="white", edgecolor=LINE, linewidth=1.2, zorder=2))
    ax.add_patch(FancyBboxPatch((x, y + h - 0.34), w, 0.34,
                 boxstyle="round,pad=0,rounding_size=0.12",
                 facecolor=accent, edgecolor="none", zorder=3, clip_on=False))


def _bullets(ax, x, y, lines, accent, dy=0.62):
    for i, text in enumerate(lines):
        yy = y - i * dy
        ax.add_patch(Circle((x, yy + 0.06), 0.05, facecolor=accent, edgecolor="none", zorder=4))
        ax.text(x + 0.22, yy, text, va="center", ha="left", fontsize=12.5, color=INK, zorder=4)


# ---------------------------------------------------------------- slide 2
def chatbot_vs_agent():
    fig, ax = plt.subplots(figsize=(11, 5.4), dpi=150)
    ax.set_xlim(0, 11); ax.set_ylim(0, 5.4); ax.axis("off")

    ax.text(0.3, 5.05, "Chatbots answer.  Agents act.", fontsize=17,
            fontweight="bold", color=INK, ha="left")

    _card(ax, 0.3, 1.15, 5.0, 3.45, BLUE)
    ax.text(0.55, 4.4, "CHATBOT", fontsize=12, fontweight="bold", color="white", va="center")
    ax.text(0.55, 3.85, "Provides answers", fontsize=14.5, fontweight="bold", color=BLUE)
    _bullets(ax, 0.6, 3.3, [
        "Replies to you in the chat window",
        "Can read from the web to answer",
        "You copy the results out by hand",
    ], BLUE)

    _card(ax, 5.7, 1.15, 5.0, 3.45, GREEN)
    ax.text(5.95, 4.4, "AGENT", fontsize=12, fontweight="bold", color="white", va="center")
    ax.text(5.95, 3.85, "Completes tasks", fontsize=14.5, fontweight="bold", color=GREEN)
    _bullets(ax, 6.0, 3.3, [
        "Reads and writes files for you",
        "Runs commands and calls APIs",
        "Takes action using tools, not just text",
    ], GREEN)

    ax.text(0.3, 0.55, "Both pull information from the web. Only an agent takes action — "
            "reading documents,\nwriting files, and calling APIs (Application Programming Interfaces).",
            fontsize=11.5, color=MUTED, ha="left", va="center")
    _save(fig, "chatbot-vs-agent.png")


# ---------------------------------------------------------------- slide 4
def agent_provider_model():
    fig, ax = plt.subplots(figsize=(11, 5.6), dpi=150)
    ax.set_xlim(0, 11); ax.set_ylim(0, 5.6); ax.axis("off")
    ax.text(0.3, 5.25, "Agent  ·  Provider  ·  Model", fontsize=17,
            fontweight="bold", color=INK, ha="left")

    cx = [2.0, 5.5, 9.0]
    icon_y = 3.9

    # monitor (agent)
    ax.add_patch(FancyBboxPatch((cx[0] - 0.85, icon_y - 0.5), 1.7, 1.05,
                 boxstyle="round,pad=0,rounding_size=0.08", facecolor="none",
                 edgecolor=NAVY, linewidth=2.4))
    ax.plot([cx[0], cx[0]], [icon_y - 0.5, icon_y - 0.75], color=NAVY, lw=2.4)
    ax.plot([cx[0] - 0.35, cx[0] + 0.35], [icon_y - 0.75, icon_y - 0.75], color=NAVY, lw=2.4)
    # cloud (provider)
    for dx, dy, r in [(-0.45, 0, 0.34), (0.0, 0.12, 0.42), (0.45, 0, 0.34), (0.15, -0.2, 0.3), (-0.2, -0.2, 0.3)]:
        ax.add_patch(Circle((cx[1] + dx, icon_y + dy), r, facecolor="white",
                     edgecolor=NAVY, linewidth=2.4, zorder=2))
    ax.add_patch(FancyBboxPatch((cx[1] - 0.6, icon_y - 0.22), 1.2, 0.34,
                 boxstyle="round,pad=0", facecolor="white", edgecolor="none", zorder=3))
    # server (model): two bars with a clear gap so the label doesn't collide with the dots
    for yy in (icon_y + 0.20, icon_y - 0.60):
        ax.add_patch(FancyBboxPatch((cx[2] - 0.8, yy), 1.6, 0.40,
                     boxstyle="round,pad=0,rounding_size=0.06", facecolor="white",
                     edgecolor=NAVY, linewidth=2.4, zorder=2))
        for k in range(3):
            ax.add_patch(Circle((cx[2] - 0.55 + k * 0.16, yy + 0.20), 0.045,
                         facecolor=NAVY, edgecolor="none", zorder=3))

    for x, label in zip(cx, ["Agent", "Provider", "Model"]):
        ax.text(x, icon_y, label, fontsize=15, fontweight="bold", color=CYAN,
                ha="center", va="center", zorder=5)

    # arrows: Model -> Provider -> Agent
    for x0, x1 in [(cx[2] - 1.0, cx[1] + 1.05), (cx[1] - 1.05, cx[0] + 1.0)]:
        ax.add_patch(FancyArrowPatch((x0, icon_y), (x1, icon_y), arrowstyle="-|>",
                     mutation_scale=22, color=NAVY, linewidth=2.4))

    descs = ["Where you type your\nprompts", "Manages model access,\nbilling, and your data",
             "Generates the output\nfrom your prompt"]
    for x, d in zip(cx, descs):
        ax.text(x, 2.55, d, fontsize=11.5, color=INK, ha="center", va="top")

    rows = [("Example 1", "Copilot", "GitHub Copilot", "Haiku 4.5"),
            ("Example 2", "Claude Code", "Anthropic", "Opus 4.8"),
            ("Example 3", "Codex", "OpenAI", "GPT-5.4"),
            ("Example 4", "OpenCode", "OpenRouter", "GLM 5.2")]
    ry = 1.55
    for r in rows:
        ax.text(0.55, ry, r[0], fontsize=10.5, color=MUTED, ha="left", va="center")
        for x, cell in zip(cx, r[1:]):
            ax.text(x, ry, cell, fontsize=11.5, color=INK, ha="center", va="center")
        ry -= 0.42
    _save(fig, "agent-provider-model.png")


# ---------------------------------------------------------------- slide 13
def skills_comparison():
    fig, ax = plt.subplots(figsize=(11, 5.4), dpi=150)
    ax.set_xlim(0, 11); ax.set_ylim(0, 5.4); ax.axis("off")
    ax.text(0.3, 5.05, "The same task, with and without a skill", fontsize=17,
            fontweight="bold", color=INK, ha="left")

    metrics = ["Setup", "Messages exchanged", "Failed API calls", "Tokens consumed"]
    without = ["Instructions every time", "15", "3", "12,000"]
    with_ = ["Automatic workflow", "2", "0", "6,000"]

    def col(x, w, title, accent, vals):
        _card(ax, x, 0.4, w, 4.1, accent)
        ax.text(x + 0.3, 4.28, title, fontsize=13, fontweight="bold", color="white", va="center")
        yy = 3.55
        for m, v in zip(metrics, vals):
            ax.text(x + 0.35, yy + 0.2, m.upper(), fontsize=9.5, color=MUTED, ha="left")
            ax.text(x + 0.35, yy - 0.22, v, fontsize=17, fontweight="bold", color=accent, ha="left")
            if yy > 1.2:
                ax.plot([x + 0.35, x + w - 0.35], [yy - 0.55, yy - 0.55], color=LINE, lw=0.9)
            yy -= 0.85

    col(0.3, 5.0, "WITHOUT A SKILL", RED, without)
    col(5.7, 5.0, "WITH A SKILL", GREEN, with_)

    ax.text(5.5, 0.14, "Half the tokens · zero failed calls · fewer round-trips",
            fontsize=11.5, color=MUTED, ha="center")
    _save(fig, "skills-comparison.png")


def _save(fig, name):
    fig.tight_layout()
    ASSETS.mkdir(parents=True, exist_ok=True)
    out = ASSETS / name
    fig.savefig(out, dpi=150, facecolor=SURFACE, bbox_inches="tight")
    plt.close(fig)
    print(f"wrote {out}")


if __name__ == "__main__":
    chatbot_vs_agent()
    agent_provider_model()
    skills_comparison()
