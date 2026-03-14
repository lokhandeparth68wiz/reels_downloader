import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs";
import path from "path";

const execAsync = promisify(exec);

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

  const ytDlpPath = process.env.YT_DLP_PATH || "yt-dlp";
  
  // Check if cookies.txt exists in the root directory
  const rootDir = process.cwd();
  const cookiesPath = path.join(rootDir, "cookies.txt");
  let cookieArg = "";
  if (fs.existsSync(cookiesPath)) {
    cookieArg = `--cookies "${cookiesPath}"`;
  }
  
  try {
    // -j outputs the JSON info dictionary
    const { stdout } = await execAsync(`"${ytDlpPath}" ${cookieArg} -j "${url}"`);
    const data = JSON.parse(stdout);

    const formats = (data.formats || [])
      .filter((f: any) => f.ext === "mp4" && f.vcodec !== "none")
      .map((f: any) => ({
        url: f.url,
        format_id: f.format_id,
        ext: f.ext,
        resolution: f.resolution || `${f.width}x${f.height}`,
        width: f.width || null,
        height: f.height || null,
        vcodec: f.vcodec || "unknown",
        acodec: f.acodec || "unknown",
        filesize: f.filesize || f.filesize_approx || undefined,
      }));

    // Sort formats by highest resolution width
    formats.sort((a: VideoFormat, b: VideoFormat) => {
      if (a.width && b.width) return b.width - a.width;
      return 0;
    });

    return {
      id: data.id,
      title: data.title || "Instagram Reel",
      thumbnail: data.thumbnail || "",
      duration: data.duration || 0,
      extractor: data.extractor,
      formats,
    };
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes("Instagram API is not granting access") || error.message.includes("Instagram sent an empty media")) {
        throw new Error("Instagram is blocking access. You must provide a valid cookies.txt file to authenticate.");
      }
      throw new Error(`Failed to extract video: ${error.message}`);
    }
    throw new Error("Failed to extract video: Unknown error");
  }
}
