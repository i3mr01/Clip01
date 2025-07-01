# Clip01 Setup Guide - Quick Reference

## 🚀 Quick Start (Windows)
1. Double-click `quick-start.bat`
2. Wait for setup to complete
3. Use Clip01 at http://localhost:3000

## 🚀 Quick Start (macOS/Linux)
1. Run: `sudo ./quick-start.sh`
2. Wait for setup to complete
3. Use Clip01 at http://localhost:3000

## 📋 Manual Setup

### Prerequisites
- **Node.js**: Download from [nodejs.org](https://nodejs.org/)
- **yt-dlp**: 
  - Windows: Run `install-yt-dlp-windows.bat`
  - macOS/Linux: Run `sudo ./install-yt-dlp-unix.sh`

### Backend Setup
```bash
cd clip01-downloader/backend
npm install
npm start
```

### Frontend Setup
```bash
cd clip01-downloader/frontend
npm install
npm start
```

## 📁 Project Structure
```
clip01-downloader/
├── backend/
│   ├── server.js          # Express server with yt-dlp integration
│   └── package.json       # Backend dependencies
├── frontend/
│   ├── src/
│   │   ├── App.js         # Main React component
│   │   ├── index.js       # React entry point
│   │   └── index.css      # Tailwind CSS + Aurora animation
│   ├── public/
│   │   └── index.html     # HTML template
│   ├── package.json       # Frontend dependencies
│   ├── tailwind.config.js # Tailwind configuration
│   └── postcss.config.js  # PostCSS configuration
├── README.md              # Complete documentation
├── SETUP-GUIDE.md         # This file
├── quick-start.bat        # Windows auto-setup
├── quick-start.sh         # macOS/Linux auto-setup
├── install-yt-dlp-windows.bat
└── install-yt-dlp-unix.sh
```

## 🔧 Troubleshooting

### Common Issues:
1. **"yt-dlp not found"**: Run the appropriate install script
2. **Port conflicts**: Close other applications using ports 3000/4000
3. **Node.js missing**: Install from nodejs.org

### Getting Help:
- Check terminal output for error messages
- Ensure both backend and frontend are running
- Verify yt-dlp is properly installed

## 🎯 Usage
1. Open http://localhost:3000
2. Paste a video URL
3. Click "Download"
4. Choose your preferred format
5. Click the download link

## ✨ Features
- Beautiful Aurora background animation
- Support for 100+ video platforms
- Multiple format and quality options
- Rate limiting and security
- Responsive design 