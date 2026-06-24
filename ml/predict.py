import json
import subprocess
import sys
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent

duration = float(sys.argv[1])
src_bytes = float(sys.argv[2])
dst_bytes = float(sys.argv[3])

payload = json.dumps([{
    "duration": duration,
    "src_bytes": src_bytes,
    "dst_bytes": dst_bytes,
}])

result = subprocess.run(
    [sys.executable, str(BASE_DIR / "predict_batch.py")],
    input=payload,
    capture_output=True,
    text=True,
    check=True,
)

prediction = json.loads(result.stdout)[0]
print(prediction["prediction"])
