import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Loader2, ClipboardPaste, Video, Music, ArrowRight } from 'lucide-react';

// --- Configuration ---
// This URL points to the local backend server you will be running.
const API_BASE_URL = 'http://localhost:4000';

// --- Animated Gradient Background ---
const AuroraBackground = () => (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute w-[200%] h-[200%] -left-1/2 -top-1/2 bg-gradient-to-tr from-gray-900 via-blue-900/50 to-purple-900/50 animate-aurora" />
    </div>
);

// --- API Function ---
// This now makes a real request to your backend server.
const fetchVideoInfo = async (url) => {
    console.log(`Fetching info from backend for: ${url}`);
    const response = await fetch(`${API_BASE_URL}/api/info?url=${encodeURIComponent(url)}`);
    
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Server responded with ${response.status}`);
    }
    
    const data = await response.json();
    return data;
};

// --- Main App Component ---
export default function App() {
    const [url, setUrl] = useState('');
    const [videoInfo, setVideoInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleDownload = async (e) => {
        e.preventDefault();
        if (!url || isLoading) return;
        setIsLoading(true);
        setError('');
        try {
            const data = await fetchVideoInfo(url);
            setVideoInfo(data);
        } catch (err) {
            setError(err.message || 'An unknown error occurred.');
            setVideoInfo(null);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            setUrl(text);
            inputRef.current?.focus();
        } catch (err) {
            console.error('Failed to read clipboard contents: ', err);
            setError('Could not paste from clipboard.');
        }
    };

    return (
        <div className="min-h-screen w-full bg-gray-900 text-gray-200 flex flex-col items-center justify-start pt-24 sm:pt-32 p-4 font-sans relative overflow-hidden">
            <AuroraBackground />
            
            <main className="w-full max-w-2xl mx-auto flex flex-col items-center text-center z-10">
                <Header />
                
                <motion.div 
                    layout
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="w-full mt-12 flex flex-col items-center"
                >
                    <form onSubmit={handleDownload} className="w-full flex flex-col items-center">
                         <motion.div 
                            className="relative w-full max-w-xl group"
                            layout
                         >
                            <motion.div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-2xl blur-lg opacity-40 group-hover:opacity-70 group-focus-within:opacity-80 transition duration-500" />
                            <input
                                ref={inputRef}
                                type="text"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder="Paste your video link here..."
                                className="w-full p-5 text-lg bg-gray-900/80 backdrop-blur-md border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300 relative"
                            />
                         </motion.div>
                         
                         <AnimatePresence>
                            {url && !isLoading && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                    transition={{ duration: 0.3, ease: 'easeOut' }}
                                    className="mt-6 relative"
                                >
                                    <motion.button
                                        type="submit"
                                        className="relative flex items-center justify-center gap-3 px-8 py-4 bg-cyan-500 text-black font-bold text-lg rounded-xl shadow-lg shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 overflow-hidden"
                                        whileHover={{ scale: 1.05, boxShadow: '0px 10px 30px rgba(34, 211, 238, 0.4)' }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <motion.div 
                                            className="absolute inset-0 bg-white/20"
                                            animate={{
                                                scale: [1, 1.2, 1],
                                                opacity: [0.5, 0.8, 0.5]
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: 'easeInOut'
                                            }}
                                        />
                                        <span className="relative">Download</span>
                                        <ArrowRight className="relative" size={22} />
                                    </motion.button>
                                </motion.div>
                            )}
                         </AnimatePresence>
                         
                         {isLoading && (
                            <div className="mt-8">
                                <Loader2 className="animate-spin text-cyan-400" size={32} />
                            </div>
                         )}

                    </form>
                    {!url && (
                        <motion.button 
                            onClick={handlePaste} 
                            className="mt-5 text-sm text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-2 mx-auto"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <ClipboardPaste size={16} />
                            <span>Paste from clipboard</span>
                        </motion.button>
                    )}
                </motion.div>

                <div className="w-full mt-8">
                    <AnimatePresence>
                        {error && <ErrorMessage message={error} />}
                    </AnimatePresence>

                    <AnimatePresence>
                        {videoInfo && <ResultsPanel videoInfo={videoInfo} />}
                    </AnimatePresence>
                </div>
            </main>
            <Footer />
        </div>
    );
}

// --- Sub-components ---

const Header = () => (
    <motion.div
        layout
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 15, stiffness: 100 }}
        className="flex flex-col items-center"
    >
        <motion.h1 
            className="text-6xl md:text-7xl font-black tracking-tighter text-white"
            style={{ textShadow: '0 0 20px rgba(255,255,255,0.3), 0 0 40px rgba(34, 211, 238, 0.3)'}}
        >
            Clip01
        </motion.h1>
        <p className="text-lg text-gray-400 mt-2 max-w-md">
            Download any video from the web with a single link.
        </p>
    </motion.div>
);

const ErrorMessage = ({ message }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="mt-4 p-3 bg-red-500/20 backdrop-blur-sm border border-red-500/30 text-red-400 rounded-xl text-center"
        role="alert"
    >
        {message}
    </motion.div>
);

const ResultsPanel = ({ videoInfo }) => (
    <motion.div
        layout
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full mt-8 p-2 bg-black/20 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl shadow-black/30"
    >
        <div className="flex flex-col md:flex-row gap-5 p-4">
            <motion.div className="md:w-1/3" layoutId="thumbnail">
                <img
                    src={videoInfo.thumbnail}
                    alt={videoInfo.title}
                    className="w-full h-auto rounded-xl shadow-lg border-2 border-white/10"
                />
            </motion.div>
            <div className="md:w-2/3 flex flex-col text-left">
                <motion.h2 layout="position" className="text-xl font-bold leading-tight text-white">{videoInfo.title}</motion.h2>
                <motion.p layout="position" className="text-gray-400 mt-1">Duration: {videoInfo.duration}</motion.p>
            </div>
        </div>
        <motion.div
            className="mt-2 space-y-2 p-2"
            variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
            initial="hidden"
            animate="visible"
        >
            {videoInfo.formats && videoInfo.formats.map((format, index) => (
                <DownloadLink key={format.format_id || index} format={format} />
            ))}
        </motion.div>
    </motion.div>
);

const DownloadLink = ({ format }) => {
    // Helper function to format file size
    const formatSize = (bytes) => {
        if (!bytes || bytes === 0) return 'N/A';
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
        if (i === 0) return `${bytes} ${sizes[i]}`;
        return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`;
    }

    return (
        <motion.a
            href={format.url}
            download
            target="_blank" // Open in new tab to start download
            rel="noopener noreferrer"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            transition={{ ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ 
                y: -3, 
                boxShadow: '0 10px 20px rgba(0,0,0,0.2), 0 0 15px rgba(34, 211, 238, 0.2)' 
            }}
            className="relative flex items-center justify-between p-4 bg-gray-900/50 rounded-lg cursor-pointer overflow-hidden border border-white/10"
        >
            <div className="flex items-center gap-4 z-10">
                {format.type === 'video' ? (
                    <Video className="text-cyan-400" size={22} />
                ) : (
                    <Music className="text-purple-400" size={22} />
                )}
                <div>
                    <span className="font-semibold text-white">{format.quality}</span>
                    <span className="text-sm text-gray-400"> .{format.format}</span>
                </div>
            </div>
            <div className="flex items-center gap-4 z-10">
                <span className="text-sm font-mono text-gray-500 hidden sm:block">{formatSize(format.size)}</span>
                <Download className="text-gray-400" size={20} />
            </div>
        </motion.a>
    );
}

const Footer = () => (
    <footer className="w-full max-w-3xl mx-auto text-center py-8 text-gray-500 text-sm z-10">
        <p>&copy; {new Date().getFullYear()} Clip01. A project for the open web. made by <a href="https://www.i3mr01.space" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors">i3mr01</a></p>
    </footer>
);
