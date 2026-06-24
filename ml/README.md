# Project Shield ML Pipeline

This folder contains the anomaly-detection pipeline used by the backend.

Run locally:

```bash
python preprocess.py
python train.py
python predict.py 35 9000 8500
```

Outputs:

- `datasets/security_logs.csv` - deterministic demo network-flow dataset.
- `datasets/processed_logs.csv` - cleaned dataset used for model training.
- `model.pkl` - trained Isolation Forest model.
- `metrics.json` - accuracy, precision, recall, F1, and confusion matrix.
