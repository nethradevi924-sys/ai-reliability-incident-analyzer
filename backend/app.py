import os

from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
from gemini import analyze_logs

load_dotenv()

app = Flask(__name__)
app.config["MAX_CONTENT_LENGTH"] = int(os.environ.get("MAX_LOG_REQUEST_BYTES", "1048576"))

allowed_origins = os.environ.get("CORS_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000")
CORS(app, origins=[origin.strip() for origin in allowed_origins.split(",") if origin.strip()])

@app.route("/analyze", methods=["POST"])
def analyze_incident():
    """Analyze incident logs sent from the frontend."""
    data = request.get_json(silent=True)
    if not data or "logs" not in data:
        return jsonify({"error": "Missing 'logs' in request body."}), 400

    logs = data.get("logs")
    if not isinstance(logs, str):
        return jsonify({"error": "'logs' must be a string."}), 400

    logs = logs.strip()
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


@app.errorhandler(413)
def request_too_large(_error):
    return jsonify({"error": "The log payload is too large. Please keep it under 1 MB."}), 413

if __name__ == "__main__":
    port = int(os.environ.get("PORT", "5000"))
    debug = os.environ.get("FLASK_DEBUG", "0") == "1"
    app.run(host="0.0.0.0", port=port, debug=debug)
