import json
import sys
from pathlib import Path

import joblib
import pandas as pd

BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "model.pkl"
FEATURES = ["duration", "src_bytes", "dst_bytes"]


def normalize_rows(rows):
    normalized = []
    for row in rows:
        normalized.append({
            "duration": float(row.get("duration", 0) or 0),
            "src_bytes": float(row.get("src_bytes", row.get("srcBytes", 0)) or 0),
            "dst_bytes": float(row.get("dst_bytes", row.get("dstBytes", 0)) or 0),
        })
    return pd.DataFrame(normalized, columns=FEATURES)


def main():
    payload = sys.stdin.read()
    rows = json.loads(payload or "[]")
    if not isinstance(rows, list):
        raise ValueError("Input payload must be a JSON array")

    model = joblib.load(MODEL_PATH)
    features = normalize_rows(rows)
    predictions = model.predict(features)
    scores = model.decision_function(features)

    output = []
    for prediction, score in zip(predictions, scores):
        output.append({
            "prediction": "threat" if prediction == -1 else "safe",
            "anomalyScore": round(float(score), 4),
        })

    print(json.dumps(output))


if __name__ == "__main__":
    main()
