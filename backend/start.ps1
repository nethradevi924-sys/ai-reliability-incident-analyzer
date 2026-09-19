$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot

$projectRoot = Split-Path $PSScriptRoot -Parent
$venvPython = Join-Path $projectRoot '.venv\Scripts\python.exe'

if (Test-Path $venvPython) {
    & $venvPython app.py
} elseif (Get-Command python -ErrorAction SilentlyContinue) {
    python app.py
} else {
    throw 'Python was not found. Create a virtual environment or install Python before starting the backend.'
}
