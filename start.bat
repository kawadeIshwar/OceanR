@echo off
echo ========================================
echo OceanR Enterprises - Starting Servers
echo ========================================
echo.

echo Checking .env file...
if not exist "server\.env" (
    echo ERROR: server\.env file not found!
    echo Please create server\.env file with your MongoDB URI
    echo See server\.env.example for template
    pause
    exit /b 1
)

echo Starting Backend Server...
start cmd /k "cd server && npm run dev"

timeout /t 3 /nobreak > nul

echo Starting Frontend Server...
start cmd /k "cd client && npm run dev"

echo.
echo ========================================
echo Servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo Admin: http://localhost:3000/admin/login
echo ========================================
echo.
echo Press any key to close this window...
pause > nul
