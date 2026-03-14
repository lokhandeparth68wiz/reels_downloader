import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    
    // 20 downloads per minute
    if (!rateLimit(ip, 20, 60000)) {
      return new NextResponse("Too many requests", { status: 429 });
    }

    const { searchParams } = new URL(req.url);
    const videoUrl = searchParams.get("url");

    if (!videoUrl) {
      return new NextResponse("Missing video URL", { status: 400 });
    }

    // Fetch the video from Instagram's CDN
    const response = await fetch(videoUrl);

    if (!response.ok) {
      return new NextResponse("Failed to fetch video from Instagram", { status: response.status });
    }

    // Proxy the stream
    const headers = new Headers(response.headers);
    headers.set("Content-Disposition", 'attachment; filename="instagram-reel.mp4"');
    headers.set("Access-Control-Allow-Origin", "*");

    return new NextResponse(response.body, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Download proxy error:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
