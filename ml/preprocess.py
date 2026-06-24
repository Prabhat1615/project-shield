import argparse
from pathlib import Path

import numpy as np
import pandas as pd

BASE_DIR = Path(__file__).resolve().parent
DATASET_DIR = BASE_DIR / "datasets"
RAW_DATASET = DATASET_DIR / "security_logs.csv"
PROCESSED_DATASET = DATASET_DIR / "processed_logs.csv"


def generate_demo_dataset(path: Path, rows: int = 600) -> None:
    """Create a deterministic network-flow dataset for local training evidence."""
    rng = np.random.default_rng(42)
    safe_rows = int(rows * 0.82)
    threat_rows = rows - safe_rows

    safe = pd.DataFrame({
        "duration": rng.normal(18, 8, safe_rows).clip(1, 65).round(2),
        "src_bytes": rng.normal(1600, 600, safe_rows).clip(80, 4200).round(0),
        "dst_bytes": rng.normal(1300, 520, safe_rows).clip(80, 3800).round(0),
        "protocol": rng.choice(["TCP", "UDP"], safe_rows, p=[0.72, 0.28]),
        "label": 0,
    })

    threats = pd.DataFrame({
        "duration": rng.normal(110, 42, threat_rows).clip(35, 260).round(2),
        "src_bytes": rng.normal(10500, 2600, threat_rows).clip(5200, 19000).round(0),
        "dst_bytes": rng.normal(8800, 2400, threat_rows).clip(4300, 17000).round(0),
        "protocol": rng.choice(["TCP", "UDP", "ICMP"], threat_rows, p=[0.22, 0.18, 0.60]),
        "label": 1,
    })

    dataset = pd.concat([safe, threats], ignore_index=True).sample(frac=1, random_state=42)
    path.parent.mkdir(parents=True, exist_ok=True)
    dataset.to_csv(path, index=False)


def preprocess(input_path: Path = RAW_DATASET, output_path: Path = PROCESSED_DATASET) -> pd.DataFrame:
    if not input_path.exists():
        generate_demo_dataset(input_path)

    data = pd.read_csv(input_path)
    required = {"duration", "src_bytes", "dst_bytes", "label"}
    missing = required - set(data.columns)
    if missing:
        raise ValueError(f"Missing required dataset columns: {', '.join(sorted(missing))}")

    data = data.drop_duplicates().copy()
    for column in ["duration", "src_bytes", "dst_bytes"]:
        data[column] = pd.to_numeric(data[column], errors="coerce")
        data[column] = data[column].fillna(data[column].median()).clip(lower=0)

    data["label"] = pd.to_numeric(data["label"], errors="coerce").fillna(0).astype(int).clip(0, 1)
    if "protocol" in data.columns:
        data["protocol"] = data["protocol"].fillna("UNKNOWN").astype(str).str.upper().str.strip()

    output_path.parent.mkdir(parents=True, exist_ok=True)
    data.to_csv(output_path, index=False)
    return data


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Clean and prepare Project Shield security logs.")
    parser.add_argument("--input", default=str(RAW_DATASET))
    parser.add_argument("--output", default=str(PROCESSED_DATASET))
    args = parser.parse_args()
    processed = preprocess(Path(args.input), Path(args.output))
    print(f"Preprocessed {len(processed)} rows -> {args.output}")
