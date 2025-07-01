#!/bin/bash

echo "========================================"
echo "Clip01 Video Downloader - Quick Start"
echo "========================================"
echo

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed!"
    echo "Please download and install Node.js from https://nodejs.org/"
    exit 1
fi

echo "Node.js is installed. Proceeding with setup..."
echo

# Check if yt-dlp is installed
if ! command -v yt-dlp &> /dev/null; then
    echo "yt-dlp not found. Installing..."
    if [ "$EUID" -eq 0 ]; then
        wget https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -O /usr/local/bin/yt-dlp
        chmod a+rx /usr/local/bin/yt-dlp
    else
        echo "Please run this script with sudo to install yt-dlp:"
        echo "sudo ./quick-start.sh"
        exit 1
    fi
fi

echo "Installing backend dependencies..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "Failed to install backend dependencies."
    exit 1
fi

echo "Installing frontend dependencies..."
cd ../frontend
npm install
if [ $? -ne 0 ]; then
    echo "Failed to install frontend dependencies."
    exit 1
fi

echo
echo "========================================"
echo "Setup complete! Starting Clip01..."
echo "========================================"
echo

# Function to start backend
start_backend() {
    cd backend
    npm start
}

# Function to start frontend
start_frontend() {
    cd frontend
    npm start
}

# Start backend in background
echo "Starting backend server..."
start_backend &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start frontend
echo "Starting frontend..."
start_frontend &
FRONTEND_PID=$!

echo
echo "Clip01 is starting up!"
echo "- Backend will be available at: http://localhost:4000"
echo "- Frontend will open at: http://localhost:3000"
echo
echo "Press Ctrl+C to stop both servers."

# Wait for user to stop
trap "echo 'Stopping Clip01...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT
wait 