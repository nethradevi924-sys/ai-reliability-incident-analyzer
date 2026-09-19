import os

from flask import Flask, jsonify, request
from flask_cors import CORS
from gemini import analyze_logs

app = Flask(__name__)
CORS(app)

@app.route("/analyze", methods=["POST"])
def analyze_incident():
    """Analyze incident logs sent from the frontend."""
    data = request.get_json(force=True, silent=True)
    if not data or "logs" not in data:
        return jsonify({"error": "Missing 'logs' in request body."}), 400

    logs = data.get("logs", "").strip()
    if not logs:
        return jsonify({"error": "Please provide incident logs to analyze."}), 400

    try:
        response_text = analyze_logs(logs)
        return jsonify({"analysis": response_text}), 200
    except RuntimeError as exc:
        return jsonify({"error": str(exc)}), 500

@app.route("/", methods=["GET"])
def health_check():
    return jsonify({"status": "AI Reliability Incident & Root Cause Analyzer backend is running."})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", "5000"))
    debug = os.environ.get("FLASK_DEBUG", "0") == "1"
    app.run(host="0.0.0.0", port=port, debug=debug)
