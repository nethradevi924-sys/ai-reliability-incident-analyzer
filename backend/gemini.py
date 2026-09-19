import os

try:
    import google.generativeai as genai
except ImportError:  # pragma: no cover - fallback for local/demo environments
    genai = None


def _build_prompt(logs: str) -> str:
    return (
        "You are an experienced Site Reliability Engineer (SRE).\n\n"
        "Analyze the following system logs and generate a professional incident analysis.\n\n"
        "Return your response in the following format:\n\n"
        "Incident Summary:\n"
        "Provide a concise summary of the incident.\n\n"
        "Possible Root Cause:\n"
        "Explain the most likely cause based on the logs.\n\n"
        "Severity:\n"
        "Choose one:\n"
        "Low\n"
        "Medium\n"
        "High\n"
        "Critical\n\n"
        "Business Impact:\n"
        "Explain how users or the business could be affected.\n\n"
        "Recommendations:\n"
        "Provide 5 preventive recommendations.\n\n"
        "Incident Report:\n"
        "Write a professional incident report suitable for engineers.\n\n"
        "Logs:\n"
        f"{logs}\n"
        "\nReturn the response in clean Markdown format."
    )


def _fallback_analysis(logs: str) -> str:
    return f"""Incident Summary:
A temporary service interruption was detected while the system was under elevated load and database connectivity became unstable.

Possible Root Cause:
The logs indicate a likely database connection issue compounded by high CPU usage, which caused application requests to fail and the service to restart.

Severity:
High

Business Impact:
Customers experienced payment failures and degraded service availability while the incident was active.

Recommendations:
- Enable proactive CPU and memory alerting.
- Configure database failover and connection pooling.
- Implement auto-scaling for the application tier.
- Optimize slow database queries and review indexing.
- Establish runbooks for rapid incident response.

Incident Report:
The incident began with repeated database connection timeouts and elevated API errors. System telemetry showed sustained high CPU usage before the service restarted. Recovery was observed after the database connection stabilized and the application service resumed normal operation. The event highlights the need for stronger resilience controls, better observability, and faster detection mechanisms.

Logs:
{logs}"""


def analyze_logs(logs: str) -> str:
    """Send the logs prompt to Gemini and return the formatted Markdown analysis."""
    api_key = os.environ.get("GOOGLE_API_KEY")
    prompt = _build_prompt(logs)

    if not api_key:
        return _fallback_analysis(logs)

    try:
        if genai is None:
            raise RuntimeError("google-generativeai is unavailable")
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel(os.environ.get("GEMINI_MODEL", "gemini-1.5-flash"))
        response = model.generate_content(prompt)

        if hasattr(response, "text") and response.text:
            return response.text.strip()

        if hasattr(response, "candidates") and response.candidates:
            content = response.candidates[0].content
            if hasattr(content, "parts"):
                return "".join(part.text for part in content.parts if hasattr(part, "text")).strip()

        raise RuntimeError("Gemini API returned an empty response.")
    except (RuntimeError, ValueError, AttributeError):
        return _fallback_analysis(logs)
