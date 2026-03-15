import { NextResponse } from "next/server";
import { extractVideoInfo, isValidInstagramUrl } from "@/lib/instagram";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    
    // 10 requests per minute limit
    if (!rateLimit(ip, 10, 60000)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { url } = body;

    if (!url || !isValidInstagramUrl(url)) {
      return NextResponse.json(
        { error: "Please provide a valid Instagram URL (Reel, Post, or TV)." },
        { status: 400 }
      );
    }

    const info = await extractVideoInfo(url);
    
    if (!info.formats || info.formats.length === 0) {
      return NextResponse.json(
        { error: "No video found for this URL. It might be private or removed." },
        { status: 404 }
      );
    }

    return NextResponse.json(info);
  } catch (error) {
    console.error("Extraction error:", error);
    return NextResponse.json(
      { error: "Failed to process the Instagram URL. Please ensure it is public." },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
      "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
      "Access-Control-Allow-Credentials": "true",
    },
  });
}
