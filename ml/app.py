import json
import sys
from pathlib import Path

from flask import Flask, jsonify, request
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)

BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "model.pkl"
FEATURES = ["duration", "src_bytes", "dst_bytes"]

# Load model on startup
try:
    model = joblib.load(MODEL_PATH)
    print(f"Model loaded successfully from {MODEL_PATH}")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

@app.route('/')
def home():
    return jsonify({'service': 'Project Shield ML Service', 'status': 'operational', 'model_loaded': model is not None})

@app.route('/health')
def health():
    return jsonify({'status': 'healthy', 'model_loaded': model is not None})

@app.route('/predict', methods=['POST'])
def predict():
    if model is None:
        return jsonify({'error': 'Model not loaded'}), 503
    
    try:
        data = request.get_json()
        
        if not data or 'logs' not in data:
            return jsonify({'error': 'Missing logs data'}), 400
        
        logs = data['logs']
        if not isinstance(logs, list):
            return jsonify({'error': 'Logs must be an array'}), 400
        
        predictions = []
        for log in logs:
            try:
                features = [[log.get('duration', 0), log.get('src_bytes', 0), log.get('dst_bytes', 0)]]
                prediction = model.predict(features)[0]
                score = model.decision_function(features)[0]
                label = 'threat' if prediction == -1 else 'safe'
                predictions.append({
                    'prediction': label,
                    'anomalyScore': round(float(score), 4),
                    'features': features[0]
                })
            except Exception as e:
                predictions.append({'error': str(e), 'prediction': 'safe', 'anomalyScore': 0})
        
        return jsonify({'predictions': predictions})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/metrics')
def metrics():
    try:
        metrics_path = BASE_DIR / "metrics.json"
        if metrics_path.exists():
            with open(metrics_path, 'r') as f:
                return jsonify(json.load(f))
        return jsonify({'error': 'Metrics not available'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
