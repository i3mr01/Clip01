@echo off
echo ========================================
echo Clip01 Video Downloader - Quick Start
echo ========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed!
    echo Please download and install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js is installed. Proceeding with setup...
echo.

REM Check if yt-dlp exists in backend folder
if not exist "backend\yt-dlp.exe" (
    echo yt-dlp not found. Downloading...
    call install-yt-dlp-windows.bat
    if not exist "backend\yt-dlp.exe" (
        echo Failed to download yt-dlp. Please run install-yt-dlp-windows.bat manually.
        pause
        exit /b 1
    )
)

echo Installing backend dependencies...
cd backend
npm install
if %errorlevel% neq 0 (
    echo Failed to install backend dependencies.
    pause
    exit /b 1
)

echo Installing frontend dependencies...
cd ..\frontend
npm install
if %errorlevel% neq 0 (
    echo Failed to install frontend dependencies.
    pause
    exit /b 1
)

echo.
echo ========================================
echo Setup complete! Starting Clip01...
echo ========================================
echo.
echo Starting backend server...
start "Clip01 Backend" cmd /k "cd /d %cd%\..\backend && npm start"

echo Waiting for backend to start...
timeout /t 3 /nobreak >nul

echo Starting frontend...
start "Clip01 Frontend" cmd /k "cd /d %cd% && npm start"

echo.
echo Clip01 is starting up!
echo - Backend will be available at: http://localhost:4000
echo - Frontend will open at: http://localhost:3000
echo.
echo Keep both terminal windows open while using Clip01.
echo.
pause 