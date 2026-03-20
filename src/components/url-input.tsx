"use client";

import { useState } from "react";
import { Copy, Link2, Loader2, Download as DownloadIcon } from "lucide-react";
import { toast } from "sonner";
import { VideoInfo } from "@/lib/instagram";

interface UrlInputProps {
  onExtractionSuccess: (data: VideoInfo) => void;
}

export default function UrlInput({ onExtractionSuccess }: UrlInputProps) {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      validateAndFetch(text);
    } catch (err) {
      toast.error("Failed to read clipboard");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validateAndFetch(url);
  };

  const validateAndFetch = async (inputUrl: string) => {
    if (!inputUrl) {
      toast.error("Please enter a URL first");
      return;
    }

    const regex = /^(https?:\/\/)?(www\.)?instagram\.com\/(p|reel|tv)\/[a-zA-Z0-9_-]+\/?(\?.*)?$/;
    if (!regex.test(inputUrl)) {
      toast.error("Invalid Instagram URL. Make sure it's a Reel, Post, or TV link.");
      return;
    }

    setIsLoading(true);
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL 
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/extract` 
        : "/api/extract";

      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: inputUrl }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to extract video");
      }

      onExtractionSuccess(data);
      toast.success("Video extracted successfully!");
      setUrl(""); // Clear input on success
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto relative group">
      <div className="absolute -inset-1 bg-linear-to-r from-primary to-rose-400 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
      
      <div className="relative flex items-center bg-card rounded-2xl p-2 border border-border shadow-xl glass transition-all duration-300">
        <div className="pl-4 text-muted-foreground">
          <Link2 className="w-5 h-5" />
        </div>
        
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste Instagram URL here..."
          className="flex-1 bg-transparent border-none outline-none px-4 py-3 text-foreground placeholder-muted-foreground focus:ring-0"
          disabled={isLoading}
        />

        <div className="flex items-center gap-2 pr-1">
          {url.length === 0 && (
            <button
              type="button"
              onClick={handlePaste}
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground bg-muted hover:bg-muted/80 rounded-xl transition-colors"
            >
              <Copy className="w-4 h-4" />
              Paste
            </button>
          )}
          
          <button
            type="submit"
            disabled={isLoading || !url}
            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="hidden sm:inline">Extracting</span>
              </>
            ) : (
              <>
                <DownloadIcon className="w-5 h-5" />
                <span className="hidden sm:inline">Download</span>
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
