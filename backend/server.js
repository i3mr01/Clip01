// Clip01 - Backend Server
// File: /backend/server.js
// Description: A Node.js + Express server to fetch video info using yt-dlp.

// --- Dependencies ---
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const YtDlpWrap = require('yt-dlp-wrap').default;
const path = require('path');

// --- Initialization ---
const app = express();
const PORT = process.env.PORT || 4000;

// IMPORTANT: Initialize yt-dlp-wrap. 
// This requires yt-dlp to be installed and accessible in your system's PATH.
// See the setup guide for installation instructions.
const ytDlpWrap = new YtDlpWrap();

// --- Middleware ---

// 1. CORS: Allow requests from your frontend's origin
// For local development, 'http://localhost:3000' is the default for create-react-app.
app.use(cors({ origin: 'http://localhost:3000' })); 

// 2. Rate Limiting: Protect against abuse
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per windowMs
	standardHeaders: true,
	legacyHeaders: false,
    message: 'Too many requests from this IP, please try again after 15 minutes',
});
app.use('/api', limiter);

// 3. JSON Body Parser
app.use(express.json());

// --- API Endpoints ---

/**
 * @route   GET /api/info
 * @desc    Fetch video information (title, thumbnail, formats)
 * @access  Public
 * @query   url - The URL of the video to fetch info for.
 */
app.get('/api/info', async (req, res) => {
    const videoURL = req.query.url;

    // Basic URL validation
    if (!videoURL || !/^(https?:\/\/)?(www\.)?[\w\-\.]+\.[a-z]{2,}(\/.*)?$/i.test(videoURL)) {
        return res.status(400).json({ error: 'Invalid or missing URL parameter.' });
    }

    console.log(`[INFO] Fetching info for: ${videoURL}`);

    try {
        // Fetch metadata using yt-dlp
        const metadata = await ytDlpWrap.getVideoInfo(videoURL);
        
        // --- Data Processing ---
        // We select and simplify the data to send to the frontend.
        const simplifiedFormats = metadata.formats
            // Filter for formats that are useful for downloading
            .filter(f => f.url && ((f.vcodec !== 'none' && f.acodec !== 'none') || f.vcodec === 'none'))
            .map(f => ({
                format_id: f.format_id,
                quality: f.height ? `${f.height}p` : (f.format_note || 'Audio'),
                format: f.ext,
                size: f.filesize || f.filesize_approx,
                url: f.url, // The direct download URL
                type: f.vcodec !== 'none' ? 'video' : 'audio',
            }));

        const responsePayload = {
            title: metadata.title,
            thumbnail: metadata.thumbnail,
            duration: metadata.duration_string,
            formats: simplifiedFormats,
        };

        console.log(`[SUCCESS] Sent info for: ${metadata.title}`);
        res.json(responsePayload);

    } catch (error) {
        console.error(`[ERROR] Failed to fetch info for ${videoURL}:`, error.message);
        res.status(500).json({ error: 'Failed to fetch video information. The URL might be unsupported or invalid.' });
    }
});

// --- Server Start ---
app.listen(PORT, () => {
    console.log(`Clip01 backend server is running on http://localhost:${PORT}`);
});
