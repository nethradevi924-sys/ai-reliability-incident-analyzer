# AI Reliability Incident & Root Cause Analyzer

AI-assisted incident triage for reliability teams. Paste production logs or upload a log file, generate a structured incident analysis, review the likely root cause and severity, and export a professional report.

## Product Overview

The application combines a React operations console with a Flask analysis API. It is designed for fast incident review and demonstration workflows:

- Structured incident summary, root cause, severity, business impact, and recommendations
- Local incident history with JSON export
- PDF report export
- Sample logs for quick evaluation
- Gemini-powered analysis when `GOOGLE_API_KEY` is configured
- Deterministic fallback analysis for local demos without an API key
- Responsive dashboard, analyzer, history, reports, settings, profile, and about views

> **Demo authentication:** The current sign-in screen is a local UI flow, not production identity management. Credentials are validated in the browser and session data is stored in local storage. Add a real identity provider before using this application with sensitive data.

## Architecture

```text
frontend/  React + Vite + Tailwind CSS + React Router + Recharts
backend/   Flask + Flask-CORS + Google Generative AI SDK

Browser -> POST /analyze -> Flask API -> Gemini (optional) -> structured Markdown response
```

## Requirements

- Node.js 18 or newer
- Python 3.10 or newer
- A Gemini API key for live AI analysis (optional; the backend has a local fallback)

## Quick Start

### 1. Start the backend

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
python app.py
```

The API runs at `http://localhost:5000`.

Set `GOOGLE_API_KEY` in `backend/.env` to enable Gemini. `GEMINI_MODEL` defaults to `gemini-1.5-flash`.

### 2. Start the frontend

In a second terminal:

```powershell
cd frontend
npm install
Copy-Item .env.example .env
npm run dev
```

Open `http://localhost:3000` and sign in with any valid email address and a password of at least six characters.

## Configuration

### Backend: `backend/.env`

| Variable | Default | Purpose |
| --- | --- | --- |
| `GOOGLE_API_KEY` | unset | Enables live Gemini analysis |
| `GEMINI_MODEL` | `gemini-1.5-flash` | Gemini model name |
| `PORT` | `5000` | Flask port |
| `FLASK_DEBUG` | `0` | Enables Flask debug mode when set to `1` |
| `CORS_ORIGINS` | localhost frontend origins | Comma-separated allowed browser origins |
| `MAX_LOG_REQUEST_BYTES` | `1048576` | Maximum request body size |

### Frontend: `frontend/.env`

| Variable | Default | Purpose |
| --- | --- | --- |
| `VITE_API_BASE_URL` | `http://localhost:5000` | Backend API base URL |

Never commit `.env` files or API keys. The repository includes `.env.example` templates and ignores local secrets.

## API

### `GET /`

Returns a health response from the backend.

### `POST /analyze`

Request:

```json
{
  "logs": "2026-07-16 10:10:02 Database Connection Timeout"
}
```

Successful response:

```json
{
  "analysis": "Incident Summary: ..."
}
```

The endpoint returns `400` for missing or invalid logs, `413` for oversized payloads, and `500` for analysis failures.

## Development Commands

```powershell
# Frontend production build
npm --prefix frontend run build

# Frontend local development server
npm --prefix frontend run dev

# Backend syntax check
python -m py_compile backend\app.py backend\gemini.py
```

## Security and Production Notes

This repository is a functional demo and starting point, not a production deployment. Before handling real incident data:

- Replace the local demo login with OAuth, SSO, or another managed identity provider.
- Add authentication and authorization to the Flask API.
- Use HTTPS and a production WSGI server such as Gunicorn or Waitress.
- Store history server-side with access controls instead of browser local storage.
- Review log retention, redaction, and provider data-processing requirements.
- Pin and regularly audit dependencies.
- Configure `CORS_ORIGINS` to the exact deployed frontend origin.

## Repository Layout

```text
backend/
  app.py                 Flask API
  gemini.py              Gemini integration and fallback analysis
  requirements.txt       Python dependencies
  start.ps1              Windows startup helper
frontend/
  src/                   React application source
  index.html             Vite entry document
  package.json           Frontend scripts and dependencies
  .env.example           Frontend configuration template
backend/.env.example     Backend configuration template
```

## License

No license has been selected yet. Add a license before distributing this project publicly.
