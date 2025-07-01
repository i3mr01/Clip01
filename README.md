# Clip01 Video Downloader

A modern, beautiful video downloader application built with React and Node.js that can download videos from various platforms using yt-dlp.

## Features

- 🎨 Beautiful, modern UI with Aurora background animation
- ⚡ Fast video information fetching
- 📱 Responsive design for all devices
- 🔒 Rate limiting and security features
- 🎯 Support for multiple video formats and qualities
- 📋 One-click clipboard paste functionality

## Prerequisites

Before running Clip01, make sure you have the following software installed:

### 1. Node.js and npm
- Download and install Node.js from [nodejs.org](https://nodejs.org/)
- npm comes bundled with Node.js

### 2. yt-dlp (Required for video downloading)

**Windows:**
1. Download `yt-dlp.exe` from the [latest release page](https://github.com/yt-dlp/yt-dlp/releases/latest)
2. Place it in a folder that's in your system's PATH, or in the `backend` folder

**macOS/Linux:**
```bash
sudo wget https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -O /usr/local/bin/yt-dlp
sudo chmod a+rx /usr/local/bin/yt-dlp
```

## Installation & Setup

### Step 1: Clone or Download the Project
Make sure you have the complete project structure:
```
clip01-downloader/
├── backend/
│   ├── server.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    ├── public/
    │   └── index.html
    ├── package.json
    ├── tailwind.config.js
    └── postcss.config.js
```

### Step 2: Set Up the Backend

1. **Navigate to the backend folder:**
   ```bash
   cd clip01-downloader/backend
   ```

2. **Install backend dependencies:**
   ```bash
   npm install
   ```

3. **Start the backend server:**
   ```bash
   npm start
   ```

   You should see: `Clip01 backend server is running on http://localhost:4000`

   **Keep this terminal window open!**

### Step 3: Set Up the Frontend

1. **Open a new terminal window and navigate to the frontend folder:**
   ```bash
   cd clip01-downloader/frontend
   ```

2. **Install frontend dependencies:**
   ```bash
   npm install
   ```

3. **Start the frontend application:**
   ```bash
   npm start
   ```

   This will open your browser to `http://localhost:3000`

## Usage

1. **Open your browser** and go to `http://localhost:3000`
2. **Paste a video URL** in the input field (YouTube, Vimeo, etc.)
3. **Click "Download"** to fetch video information
4. **Choose your preferred format** from the available options
5. **Click the download link** to start downloading

## Supported Platforms

Clip01 supports downloading from hundreds of platforms including:
- YouTube
- Vimeo
- Twitter
- Instagram
- TikTok
- Facebook
- And many more!

## Troubleshooting

### Common Issues:

1. **"yt-dlp not found" error:**
   - Make sure yt-dlp is installed and accessible in your PATH
   - For Windows, try placing `yt-dlp.exe` in the backend folder

2. **"Failed to fetch video information":**
   - Check if the video URL is valid and accessible
   - Some videos may be region-restricted or private

3. **Backend server won't start:**
   - Make sure port 4000 is not in use
   - Check that all dependencies are installed

4. **Frontend won't start:**
   - Make sure port 3000 is not in use
   - Check that all dependencies are installed

### Getting Help:

If you encounter any issues:
1. Check the console output in both terminal windows
2. Make sure both backend and frontend are running
3. Verify that yt-dlp is properly installed

## Development

### Backend Development:
- The backend runs on Express.js
- Main file: `backend/server.js`
- API endpoint: `GET /api/info?url=<video_url>`

### Frontend Development:
- Built with React and Framer Motion
- Styled with Tailwind CSS
- Main file: `frontend/src/App.js`

## License

This project is open source and available under the ISC License.

## Contributing

Feel free to submit issues and enhancement requests! 