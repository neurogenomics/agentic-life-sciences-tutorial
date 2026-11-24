#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.10"
# dependencies = ["matplotlib>=3.8"]
# ///
"""Regenerate the "agent context" waffle grid.

A 10x10 grid = 100 cells = 100% of the context window. Cells are filled by
category (used space first, then free), so the picture matches the `/context`
breakdown shown in the tutorial. Adapted from the UK DRI workshop deck
(13 Mar 2026).

    uv run scripts/plot_context_breakdown.py
"""

from __future__ import annotations

from pathlib import Path

import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch

# category, cells (of 100), colour, is-free   (used first, top-down; buffer last)
CATS = [
    ("System",         12, "#2a78d6", False),   # system prompt + built-in tools
    ("MCP tools",       2, "#1baf7a", False),
    ("Skills",          1, "#4a3aa7", False),
    ("Messages",       14, "#008300", False),
    ("Free",           69, "#e6e5df", True),
    ("Compact buffer",  2, "#7f8c9a", False),
]

SURFACE = "#fcfcfb"
INK = "#0b0b0b"
MUTED = "#898781"
GAP = 0.14  # surface gap between cells

OUT = Path(__file__).resolve().parent.parent / "assets" / "images" / "context-breakdown.png"


def main() -> None:
    plt.rcParams.update({
        "font.family": "sans-serif",
        "font.sans-serif": ["Helvetica Neue", "Helvetica", "Arial", "DejaVu Sans"],
        "figure.facecolor": SURFACE,
    })

    # expand categories into a flat list of (colour, is_free) per cell, filling top-down
    cells: list[tuple[str, bool]] = []
    for _, n, colour, is_free in CATS:
        cells.extend([(colour, is_free)] * n)

    fig, ax = plt.subplots(figsize=(10.4, 5.6), dpi=150)
    ax.set_xlim(-4.6, 13.6)
    ax.set_ylim(-0.6, 10.4)
    ax.axis("off")
    ax.set_aspect("equal")

    used_cells = sum(n for _, n, _, free in CATS if not free)

    # draw grid: row 0 at top, row-major
    for idx, (colour, is_free) in enumerate(cells):
        row, col = divmod(idx, 10)
        y = 9 - row
        edge = "#d7d6cf" if is_free else "none"
        ax.add_patch(FancyBboxPatch(
            (col + GAP / 2, y + GAP / 2), 1 - GAP, 1 - GAP,
            boxstyle="round,pad=0,rounding_size=0.16",
            facecolor=colour, edgecolor=edge, linewidth=0.8, zorder=2))

    # left legend: swatch + label + percent, ordered as CATS
    ly = 9.4
    for name, n, colour, is_free in CATS:
        ax.add_patch(FancyBboxPatch(
            (-4.4, ly - 0.34), 0.62, 0.62,
            boxstyle="round,pad=0,rounding_size=0.12",
            facecolor=colour, edgecolor="#d7d6cf" if is_free else "none",
            linewidth=0.8, zorder=3))
        ax.text(-3.55, ly, f"{name}", va="center", ha="left",
                fontsize=12, color=INK)
        ax.text(-3.55, ly - 0.42, f"{n}%", va="center", ha="left",
                fontsize=10, color=MUTED)
        ly -= 1.5

    # right-side brackets: used space (top) / free space (bottom)
    used_rows = used_cells / 10          # boundary measured from the top
    y_split = 10 - used_rows
    bx = 10.45
    for (y0, y1, label) in [(y_split, 10, f"Used  ({used_cells}%)"),
                            (0, y_split, f"Free  ({100 - used_cells}%)")]:
        ax.plot([bx, bx], [y0 + 0.06, y1 - 0.06], color=MUTED, linewidth=1.2, zorder=1)
        ax.plot([bx, bx + 0.18], [y0 + 0.06, y0 + 0.06], color=MUTED, linewidth=1.2)
        ax.plot([bx, bx + 0.18], [y1 - 0.06, y1 - 0.06], color=MUTED, linewidth=1.2)
        ax.text(bx + 0.4, (y0 + y1) / 2, label, va="center", ha="left",
                fontsize=11, color=INK)

    ax.text(0, 10.15, "Agent context  ·  share of the context window",
            fontsize=13, fontweight="bold", color=INK, ha="left", va="bottom")

    fig.tight_layout()
    OUT.parent.mkdir(parents=True, exist_ok=True)
    fig.savefig(OUT, dpi=150, facecolor=SURFACE, bbox_inches="tight")
    print(f"wrote {OUT}")


if __name__ == "__main__":
    main()
