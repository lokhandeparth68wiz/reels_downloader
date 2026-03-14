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

  try {
    // Using a reliable public API that handles Instagram proxying to avoid 403 blocks
    const encodedUrl = encodeURIComponent(url);
    const apiRes = await fetch(`https://vkrdownloader.vercel.app/server?vkr=${encodedUrl}`);
    
    if (!apiRes.ok) {
       throw new Error("Instagram blocked the extraction request.");
    }
    
    // Some public APIs return HTML instead of JSON if they fail. Protect against this.
    const textRes = await apiRes.text();
    let data;
    try {
      data = JSON.parse(textRes);
    } catch (e) {
      throw new Error("Instagram blocked the extraction request. Please try again later.");
    }

    if (!data.data || !data.data.downloads || data.data.downloads.length === 0) {
      throw new Error("No video found for this URL. It might be private or removed.");
    }

    const formats = data.data.downloads.map((d: any, index: number) => ({
      url: d.url,
      format_id: `format-${index}`,
      ext: "mp4",
      resolution: "HD",
      width: 1080,
      height: 1920,
      vcodec: "h264",
      acodec: "aac"
    }));

    return {
      id: data.data.id || String(Date.now()),
      title: data.data.title || "Instagram Reel",
      thumbnail: data.data.thumbnail || "",
      duration: 0,
      extractor: "Instagram (Web)",
      formats,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to extract video: ${error.message}`);
    }
    throw new Error("Failed to extract video: Unknown error");
  }
}
