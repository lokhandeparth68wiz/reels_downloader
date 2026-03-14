# Instagram Reels Downloader (ReelGetter)

A modern, fast, and high-quality Instagram Reels Downloader built with Next.js, Tailwind CSS v4, Framer Motion, and `yt-dlp`.

## Features
- **Original Quality:** Download reels in full 1080p/720p without watermarks
- **Fast Extraction:** Powered by `yt-dlp` working server-side
- **Modern UI:** Glassmorphism, animations, dark/light mode, and responsive design
- **Built-in Proxy:** Avoid CORS and instantly download the video to the user's device
- **Rate Limited:** Protects your backend from abuse
- **SEO Optimized:** Automatic Sitemaps, Open Graph tags, and Metadata

## Tech Stack
- Frontend: Next.js 15 (App Router), React, TailwindCSS v4, Framer Motion
- Backend: Next.js API Routes, `yt-dlp`

## Installation

### Prerequisites
- Node.js 18+
- Python 3+ and FFmpeg (required by yt-dlp)
- yt-dlp installed globally or downloaded to the project

### Local Setup
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   # Edit .env.local and make sure YT_DLP_PATH points to your yt-dlp executable
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Deployment

### Docker (Recommended)
This is the most reliable method as it bundles `yt-dlp` and its dependencies (Python/FFmpeg) with your Next.js app.
```bash
docker build -t reels-downloader .
docker run -p 3000:3000 reels-downloader
```

### Vercel
You can deploy to Vercel, however, since Vercel's serverless environment does not guarantee Python or yt-dlp, you must ensure the build command downloads `yt-dlp` (as configured in `vercel.json`). This works for low traffic but a VPS/Docker setup is recommended for scale.

## License
MIT
