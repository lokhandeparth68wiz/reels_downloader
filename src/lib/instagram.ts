import axios from "axios";

export interface VideoFormat {
  url: string;
  format_id: string;
  ext: string;
  resolution: string;
  width: number | null;
  height: number | null;
  vcodec: string;
  acodec: string;
  filesize?: number;
}

export interface VideoInfo {
  id: string;
  title: string;
  thumbnail: string;
  duration: number;
  extractor: string;
  formats: VideoFormat[];
}

export function isValidInstagramUrl(url: string): boolean {
  const regex = /^(https?:\/\/)?(www\.)?instagram\.com\/(p|reel|tv)\/[a-zA-Z0-9_-]+\/?(\?.*)?$/;
  return regex.test(url);
}

export async function extractVideoInfo(url: string): Promise<VideoInfo> {
  if (!isValidInstagramUrl(url)) {
    throw new Error("Invalid Instagram URL");
  }

  const apiKey = process.env.RAPIDAPI_KEY;
  const apiHost = process.env.RAPIDAPI_HOST || "instagram-scraper-api2.p.rapidapi.com";
  
  if (!apiKey) {
    throw new Error("API Key is missing. Please add RAPIDAPI_KEY to your environment variables.");
  }

  try {
    // We are using the "Instagram Scraper API" from RapidAPI
    // which bypasses Instagram login walls to reliably fetch media.
    const options = {
      method: "GET",
      url: `https://${apiHost}/v1.2/info`,
      params: { url_embed: url },
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": apiHost,
      },
    };

    const response = await axios.request(options);
    const data = response.data.data;
    
    if (!data || !data.items || data.items.length === 0) {
       throw new Error("Instagram private video or blocked URL.");
    }
    
    // Most reels/videos are the first item
    const item = data.items[0];
    
    // Extract video versions (resolutions)
    const formats = (item.video_versions || []).map((v: any, index: number) => ({
        url: v.url,
        format_id: v.id || `format-${index}`,
        ext: "mp4",
        resolution: `${v.width}x${v.height}`,
        width: v.width,
        height: v.height,
        vcodec: "h264",
        acodec: "aac"
    }));

    // Sort formats to have the highest resolution first
    formats.sort((a: VideoFormat, b: VideoFormat) => {
      if (a.width && b.width) return b.width - a.width;
      return 0;
    });

    return {
      id: item.id || String(Date.now()),
      title: item.caption?.text || "Instagram Reel",
      thumbnail: item.image_versions2?.candidates?.[0]?.url || "",
      duration: item.video_duration || 0,
      extractor: "Instagram API",
      formats,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
        if (error.response?.status === 401 || error.response?.status === 403) {
            throw new Error("Unauthorized RapidAPI key. Please check your RAPIDAPI_KEY.");
        }
        if (error.response?.status === 429) {
             throw new Error("API Rate limit exceeded. Please upgrade your RapidAPI plan.");
        }
    }
    
    if (error instanceof Error) {
      throw new Error(`Failed to extract video: ${error.message}`);
    }
    throw new Error("Failed to extract video: Unknown error");
  }
}
