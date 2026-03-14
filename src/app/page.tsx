"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UrlInput from "@/components/url-input";
import VideoPreview from "@/components/video-preview";
import { VideoInfo } from "@/lib/instagram";

export default function Home() {
  const [videoData, setVideoData] = useState<VideoInfo | null>(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)] w-full max-w-4xl mx-auto space-y-12">
      
      <motion.div 
        className="text-center space-y-6 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-block mb-2 px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20 backdrop-blur-sm">
          Original Quality &bull; No Watermark
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground" style={{ textWrap: "balance" }}>
          Download Instagram <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-rose-400">Reels</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground" style={{ textWrap: "balance" }}>
          Fast, free and high-quality Instagram reel downloader. Just paste the link below and save it instantly.
        </p>
      </motion.div>

      <motion.div 
        className="w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <UrlInput onExtractionSuccess={setVideoData} />
      </motion.div>

      <AnimatePresence mode="wait">
        {videoData && (
          <motion.div
            key={videoData.id}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full"
          >
            <VideoPreview video={videoData} onReset={() => setVideoData(null)} />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
