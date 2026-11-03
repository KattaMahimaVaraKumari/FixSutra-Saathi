@echo off
echo ========================================================
echo       FixSutra Saathi - Sarvam AI Hackathon
echo ========================================================
echo.
echo [1/3] Checking environment & database...
if not exist backend\data\fixsutra.db (
    echo Seeding database...
    python backend\seed.py
)
echo.
echo [2/3] Starting FastAPI Backend on http://localhost:8000...
start "FixSutra Backend" cmd /k "python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload"
echo.
echo [3/3] Starting React Vite Frontend on http://localhost:5173...
cd frontend
start "FixSutra Frontend" cmd /k "npm run dev"
echo.
echo ========================================================
echo FixSutra Saathi is launching!
echo Frontend: http://localhost:5173
echo Backend API Docs: http://localhost:8000/docs
echo ========================================================
pause
