#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.10"
# dependencies = ["matplotlib>=3.8"]
# ///
"""Regenerate the "cost per message vs context size" chart.

Input-only cost scales linearly with context size: every message re-sends the
whole window, so cost per message = (input price per MTok) x (context / 1e6).

Prices are base input $/MTok, current as of 2026-11-28 (models.dev + vendor
pages). GLM 5.2 is the course model and is drawn highlighted.

    uv run scripts/plot_context_cost.py
"""

from __future__ import annotations

from pathlib import Path

import matplotlib.pyplot as plt
from matplotlib.ticker import FuncFormatter

# name, input $/MTok, is-course-model  (cheap -> premium)
MODELS = [
    ("DeepSeek V4.1 Flash", 0.05, False),
    ("Claude Haiku 5.5", 0.10, False),
    ("Gemini 3.5 Flash-Lite", 0.30, False),
    ("Gemini 3.8 Flash", 0.75, False),
    ("GPT-6.1 Terra", 1.00, False),
    ("GLM 5.2", 1.40, False),
    ("Claude Sonnet 5.5", 2.00, True),
    ("Gemini 4 Neon", 3.00, False),
    ("Claude Opus 5.5", 4.00, False),
    ("Claude Fable 5.2", 8.00, False),
]

# 10 models exceeds the dataviz 8-hue CVD-validated set; hues extended with cyan +
# brown. Adjacent / near-overlapping lines are kept on contrasting hues; identity is
# carried by the legend and slope, and the course model is drawn bold.  (cheap -> premium)
PALETTE = ["#eda100", "#1baf7a", "#8c564b", "#0e7c86", "#e87ba4",
           "#008300", "#eb6834", "#2a78d6", "#4a3aa7", "#e34948"]

SURFACE = "#fcfcfb"
INK = "#0b0b0b"
MUTED = "#898781"
GRID = "#e1e0d9"

MAX_TOKENS = 200_000
OUT = Path(__file__).resolve().parent.parent / "assets" / "images" / "context-cost-per-message.png"


def main() -> None:
    plt.rcParams.update({
        "font.family": "sans-serif",
        "font.sans-serif": ["Helvetica Neue", "Helvetica", "Arial", "DejaVu Sans"],
        "figure.facecolor": SURFACE,
        "axes.facecolor": SURFACE,
        "text.color": INK,
        "axes.edgecolor": MUTED,
        "axes.labelcolor": INK,
        "xtick.color": MUTED,
        "ytick.color": MUTED,
    })

    fig, ax = fig_ax = plt.subplots(figsize=(9.6, 6.0), dpi=150)

    x = [0, MAX_TOKENS]
    ymax = max(p for _, p, _ in MODELS) * MAX_TOKENS / 1e6

    # draw cheap->premium so premium lines sit on top; legend is reversed below
    handles = []
    for (name, price, course), colour in zip(MODELS, PALETTE):
        y = [0, price * MAX_TOKENS / 1e6]
        lw = 3.4 if course else 2.0
        z = 5 if course else 3
        label = f"{name}  ${price:.2f}  (course model)" if course else f"{name}  ${price:.2f}"
        (line,) = ax.plot(x, y, color=colour, linewidth=lw, solid_capstyle="round",
                          zorder=z, label=label)
        handles.append(line)

    ax.set_xlim(0, MAX_TOKENS)
    ax.set_ylim(0, ymax * 1.04)
    ax.set_title("Cost per message vs context size (input only)",
                 fontsize=15, fontweight="bold", color=INK, pad=14, loc="left")
    ax.set_xlabel("Context size (tokens)", fontsize=11)
    ax.set_ylabel("Cost per message  ($, input only)", fontsize=11)

    ax.xaxis.set_major_formatter(FuncFormatter(
        lambda v, _: "0" if v == 0 else f"{v/1000:.0f}k"))
    ax.yaxis.set_major_formatter(FuncFormatter(lambda v, _: f"${v:.2f}"))
    ax.set_xticks(range(0, MAX_TOKENS + 1, 25_000))
    ax.set_yticks([i * 0.25 for i in range(0, int(ymax // 0.25) + 2)])

    ax.grid(True, color=GRID, linewidth=0.8, zorder=0)
    ax.set_axisbelow(True)
    for side in ("top", "right"):
        ax.spines[side].set_visible(False)
    for side in ("left", "bottom"):
        ax.spines[side].set_color(GRID)

    # legend expensive -> cheap; bold the course model entry
    leg = ax.legend(handles=list(reversed(handles)), loc="upper left",
                    frameon=True, fontsize=10, labelcolor=INK,
                    borderpad=0.8, handlelength=1.6)
    leg.get_frame().set_edgecolor(GRID)
    leg.get_frame().set_facecolor(SURFACE)
    for text, (_, _, course) in zip(leg.get_texts(), reversed(MODELS)):
        if course:
            text.set_fontweight("bold")

    fig.tight_layout()
    OUT.parent.mkdir(parents=True, exist_ok=True)
    fig.savefig(OUT, dpi=150, facecolor=SURFACE, bbox_inches="tight")
    print(f"wrote {OUT}")


if __name__ == "__main__":
    main()
