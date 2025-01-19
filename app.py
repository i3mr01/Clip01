from flask import Flask, request, jsonify, send_file, render_template
import os
from yt_dlp import YoutubeDL
import logging

app = Flask(__name__)

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Path to save downloaded files
DOWNLOAD_FOLDER = 'downloads'
os.makedirs(DOWNLOAD_FOLDER, exist_ok=True)

# Helper function for yt_dlp
def download_with_yt_dlp(url, quality, format):
    ydl_opts = {
        'format': 'best' if quality == 'high' else 'worst' if quality == 'low' else 'medium',
        'outtmpl': os.path.join(DOWNLOAD_FOLDER, '%(title)s.%(ext)s'),
        'quiet': True,
        'http_headers': {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36'
        }
    }
    if format == 'mp3':
        ydl_opts.update({
            'format': 'bestaudio/best',
            'postprocessors': [{
                'key': 'FFmpegExtractAudio',
                'preferredcodec': 'mp3',
                'preferredquality': '192',
            }]
        })

    with YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=True)
        filename = ydl.prepare_filename(info)
        if format == 'mp3':
            filename = filename.rsplit('.', 1)[0] + '.mp3'
        return filename

# Route to serve the main page
@app.route('/')
def index():
    return render_template('index.html')

#i didn't know what i was looking for, 'till i found her

# Route to handle download requests
@app.route('/download', methods=['POST'])
def download():
    data = request.json
    logging.debug(f"Received data: {data}")
    
    platform = data.get('platform')
    format = data.get('format')
    quality = data.get('quality')
    url = data.get('url')

    if not url or not platform or not format or not quality:
        return jsonify({'success': False, 'message': 'Missing parameters'}), 400

    try:
        # Handle all downloads using yt_dlp
        filepath = download_with_yt_dlp(url, quality, format)
        logging.debug(f"File downloaded: {filepath}")
        
        return jsonify({'success': True, 'download_url': f'/file/{os.path.basename(filepath)}'})

    except Exception as e:
        logging.error(f"Error during download: {str(e)}")
        return jsonify({'success': False, 'message': str(e)}), 500

# Route to serve downloaded files
@app.route('/file/<filename>', methods=['GET'])
def serve_file(filename):
    filepath = os.path.join(DOWNLOAD_FOLDER, filename)
    logging.debug(f"Serving file from path: {filepath}")
    if os.path.exists(filepath):
        return send_file(filepath, as_attachment=True)
    else:
        logging.error(f"File not found: {filepath}")
        return jsonify({'success': False, 'message': 'File not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)