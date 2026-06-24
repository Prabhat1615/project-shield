@echo off
echo Starting Project Shield Development Environment...
echo.

echo [1/3] Starting ML Service on port 8000...
start "ML Service" cmd /k "cd /d %~dp0ml && python app.py"
timeout /t 3 /nobreak >nul

echo [2/3] Starting Backend on port 5000...
start "Backend" cmd /k "cd /d %~dp0backend && npm run dev"
timeout /t 3 /nobreak >nul

echo [3/3] Starting Frontend on port 5173...
start "Frontend" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo All services started!
echo - Frontend: http://localhost:5173
echo - Backend: http://localhost:5000
echo - ML Service: http://localhost:8000
echo.
echo Press any key to close this window (services will continue running)...
pause >nul
