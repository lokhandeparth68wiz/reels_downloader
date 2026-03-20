"use client";

import { useState } from "react";
import { Download, RefreshCcw, Play, CheckCircle2, Loader2 } from "lucide-react";
import { VideoInfo, VideoFormat } from "@/lib/instagram";
import { toast } from "sonner";

interface VideoPreviewProps {
  video: VideoInfo;
  onReset: () => void;
}

export default function VideoPreview({ video, onReset }: VideoPreviewProps) {
  const [isDownloading, setIsDownloading] = useState<string | null>(null);

  const bestFormat = video.formats[0];
  const allFormats = video.formats;
  
  // Format duration
  const formatTime = (seconds: number) => {
    if (!seconds) return "Unknown";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const handleDownload = async (format: VideoFormat) => {
    setIsDownloading(format.format_id);
    toast.info("Preparing download...", { id: "download" });

    try {
      // Use the proxy to avoid CORS and get proper Content-Disposition
      const response = await fetch(`/api/download?url=${encodeURIComponent(format.url)}`);
      
      if (!response.ok) {
        throw new Error("Download failed");
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `instagram-reel-${format.resolution}.mp4`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast.success("Download started!", { id: "download" });
    } catch (error) {
      toast.error("Failed to download video. It may be protected.", { id: "download" });
    } finally {
      setIsDownloading(null);
    }
  };

  return (
    <div className="glass rounded-3xl p-6 sm:p-8 border border-border/50 shadow-2xl relative overflow-hidden group">
      <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
        
        {/* Thumbnail/Player Section */}
        <div className="w-full md:w-5/12 aspect-9/16 max-h-[500px] bg-black/10 rounded-2xl overflow-hidden relative shadow-inner shrink-0">
          {video.thumbnail ? (
            <img 
              src={video.thumbnail} 
              alt="Video thumbnail"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted/50">
              <Play className="w-12 h-12 text-muted-foreground/30" />
            </div>
          )}
          
          <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-black/60 backdrop-blur text-white text-xs font-medium rounded-lg">
            {formatTime(video.duration)}
          </div>
        </div>

        {/* Info & Download Section */}
        <div className="w-full md:w-7/12 flex flex-col justify-start h-full">
          <div className="flex items-start justify-between mb-2">
            <h2 className="text-xl sm:text-2xl font-bold line-clamp-2 text-foreground pr-8">
              {video.title}
            </h2>
            <button 
              onClick={onReset}
              className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-foreground absolute right-0 top-0 sm:relative"
              title="Download another reel"
            >
              <RefreshCcw className="w-5 h-5" />
            </button>
          </div>
          
          <p className="text-sm text-muted-foreground mb-8 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            Extracted from {video.extractor}
          </p>

          <div className="space-y-4 w-full flex-1 flex flex-col justify-end">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              Available Qualities
            </h3>
            
            <div className="flex flex-col gap-3">
              {allFormats.slice(0, 3).map((f, i) => (
                <button
                  key={f.format_id}
                  onClick={() => handleDownload(f)}
                  disabled={isDownloading !== null}
                  className={`
                    flex items-center justify-between p-4 rounded-xl border transition-all
                    ${i === 0 
                      ? 'bg-primary/5 border-primary/30 hover:bg-primary/10 hover:border-primary/50' 
                      : 'bg-card border-border/80 hover:border-border hover:shadow-md'
                    }
                    ${isDownloading !== null && isDownloading !== f.format_id ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${i === 0 ? 'bg-primary text-white' : 'bg-muted text-foreground'}`}>
                      <Download className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-foreground">
                        {f.resolution} {f.vcodec !== "unknown" && `(${f.vcodec})`}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {f.ext.toUpperCase()} &bull; No Watermark
                      </div>
                    </div>
                  </div>
                  
                  {i === 0 && (
                    <span className="hidden sm:inline-block text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-md">
                      BEST QUALITY
                    </span>
                  )}
                  
                  {isDownloading === f.format_id && (
                    <Loader2 className="w-5 h-5 animate-spin text-primary" />
                  )}
                </button>
              ))}
            </div>
            
            <button
              onClick={onReset}
              className="w-full mt-2 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Cancel and download another reel
            </button>
          </div>
        </div>
      </div>
      
      {/* Decorative gradient bleed */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 blur-[80px] -z-10 rounded-full mix-blend-multiply pointer-events-none" />
    </div>
  );
}
