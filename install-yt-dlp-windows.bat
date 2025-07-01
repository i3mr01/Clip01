@echo off
echo Installing yt-dlp for Clip01 Video Downloader...
echo.

REM Create backend directory if it doesn't exist
if not exist "backend" mkdir backend

REM Download yt-dlp to backend folder
echo Downloading yt-dlp...
powershell -Command "Invoke-WebRequest -Uri 'https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe' -OutFile 'backend\yt-dlp.exe'"

if exist "backend\yt-dlp.exe" (
    echo.
    echo Success! yt-dlp has been downloaded to the backend folder.
    echo You can now run the Clip01 application.
    echo.
    echo Next steps:
    echo 1. Open a terminal in the backend folder
    echo 2. Run: npm install
    echo 3. Run: npm start
    echo 4. Open another terminal in the frontend folder
    echo 5. Run: npm install
    echo 6. Run: npm start
) else (
    echo.
    echo Error: Failed to download yt-dlp.
    echo Please download it manually from: https://github.com/yt-dlp/yt-dlp/releases/latest
    echo And place yt-dlp.exe in the backend folder.
)

pause 