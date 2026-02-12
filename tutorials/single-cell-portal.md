---
layout: default
title: Data Portal for Single Cell Sequencing
---

# Data Portal for Single Cell Sequencing

Build an interactive viewer for single-cell RNA sequencing data using public datasets from the [CZ CELLxGENE](https://cellxgene.cziscience.com/) data portal.

## What you'll learn

- How to download and work with `.h5ad` single-cell datasets
- How to prompt AI to build an interactive data viewer (UMAP, heatmaps)
- How to use public data portals like CELLxGENE for single-cell exploration

## Steps

1. Browse the [CELLxGENE collections](https://cellxgene.cziscience.com/) and find a dataset. For this example we use the [Allen Institute Adult Human Brain Atlas](https://cellxgene.cziscience.com/collections/283d65eb-dd53-496d-adb7-7570c7caa443) - specifically the [midbrain (substantia nigra) snRNA-seq dataset](https://datasets.cellxgene.cziscience.com/5cfe2ee0-d62a-487c-b0fe-124f39f4df21.h5ad).

2. Download the `.h5ad` file to your machine.

3. Prompt your AI assistant:

```
I have a single-cell RNA sequencing h5ad file at [your_path]. Build me an interactive
Streamlit app to explore this data. Include:
- A UMAP plot colored by cell type and cluster
- A heatmap of cell type vs cluster
- Controls for point size and opacity
Only read the metadata (obs and obsm), not the full expression matrix.
```

4. The dataset contains 59,505 cells x 58,232 genes with 11 cell types across 3 donors. Key metadata columns include `cell_type`, `cluster_id`, `supercluster_term`, `donor_id`, and UMAP coordinates in `obsm['X_UMAP']`.

5. Run the app with `streamlit run app.py` and explore the interactive plots.

## Result

![Single Cell Viewer](../assets/images/single_cell_viewer.png)

## Tips

- Always load h5ad files with `backed='r'` to avoid loading the full expression matrix into memory
- CELLxGENE datasets follow a standardised schema - `cell_type`, `tissue`, `assay`, `donor_id` are always available
- For large datasets, consider subsampling for faster plotting
