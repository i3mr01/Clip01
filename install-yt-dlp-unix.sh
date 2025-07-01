#!/bin/bash

echo "Installing yt-dlp for Clip01 Video Downloader..."
echo

# Check if running as root (needed for system-wide installation)
if [ "$EUID" -ne 0 ]; then
    echo "This script needs to run with sudo to install yt-dlp system-wide."
    echo "Please run: sudo ./install-yt-dlp-unix.sh"
    exit 1
fi

# Download and install yt-dlp
echo "Downloading yt-dlp..."
wget https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -O /usr/local/bin/yt-dlp

if [ $? -eq 0 ]; then
    echo "Setting executable permissions..."
    chmod a+rx /usr/local/bin/yt-dlp
    
    echo
    echo "Success! yt-dlp has been installed system-wide."
    echo "You can now run the Clip01 application."
    echo
    echo "Next steps:"
    echo "1. Open a terminal in the backend folder"
    echo "2. Run: npm install"
    echo "3. Run: npm start"
    echo "4. Open another terminal in the frontend folder"
    echo "5. Run: npm install"
    echo "6. Run: npm start"
else
    echo
    echo "Error: Failed to download yt-dlp."
    echo "Please install it manually:"
    echo "sudo wget https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -O /usr/local/bin/yt-dlp"
    echo "sudo chmod a+rx /usr/local/bin/yt-dlp"
fi 