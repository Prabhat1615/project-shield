import json
from pathlib import Path

import joblib
import numpy as np
from sklearn.ensemble import IsolationForest
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix
from sklearn.model_selection import train_test_split

from preprocess import PROCESSED_DATASET, preprocess

BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "model.pkl"
METRICS_PATH = BASE_DIR / "metrics.json"
FEATURES = ["duration", "src_bytes", "dst_bytes"]


def train_model():
    data = preprocess(output_path=PROCESSED_DATASET)
    train, test = train_test_split(
        data,
        test_size=0.25,
        random_state=42,
        stratify=data["label"],
    )

    model = IsolationForest(
        contamination=float(data["label"].mean()),
        n_estimators=160,
        max_samples="auto",
        random_state=42,
    )
    model.fit(train[FEATURES])

    predicted = model.predict(test[FEATURES])
    predicted_labels = np.where(predicted == -1, 1, 0)
    actual_labels = test["label"].to_numpy()
    matrix = confusion_matrix(actual_labels, predicted_labels, labels=[0, 1])

    metrics = {
        "model": "IsolationForest",
        "features": FEATURES,
        "datasetRows": int(len(data)),
        "trainingRows": int(len(train)),
        "testingRows": int(len(test)),
        "accuracy": round(float(accuracy_score(actual_labels, predicted_labels)), 4),
        "precision": round(float(precision_score(actual_labels, predicted_labels, zero_division=0)), 4),
        "recall": round(float(recall_score(actual_labels, predicted_labels, zero_division=0)), 4),
        "f1Score": round(float(f1_score(actual_labels, predicted_labels, zero_division=0)), 4),
        "confusionMatrix": {
            "trueNegative": int(matrix[0][0]),
            "falsePositive": int(matrix[0][1]),
            "falseNegative": int(matrix[1][0]),
            "truePositive": int(matrix[1][1]),
        },
    }

    joblib.dump(model, MODEL_PATH)
    METRICS_PATH.write_text(json.dumps(metrics, indent=2), encoding="utf-8")
    return metrics


if __name__ == "__main__":
    result = train_model()
    print(json.dumps(result, indent=2))
