import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Instagram Reels Downloader",
  description: "Learn more about our free, fast, and high-quality Instagram Reels Downloader tool.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 glass p-8 sm:p-12 rounded-3xl mt-8">
      <h1 className="text-4xl font-bold tracking-tight text-foreground">About ReelGetter</h1>
      
      <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
        <p className="text-lg text-muted-foreground leading-relaxed">
          Welcome to ReelGetter, the ultimate high-quality Instagram Reels Downloader designed to help you save your favorite moments instantly and effortlessly.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-8">Our Mission</h2>
        <p className="text-muted-foreground leading-relaxed">
          Our mission is to provide creators, marketers, and everyday users with a fast, secure, and user-friendly tool to download Instagram Reels, Videos, and Posts in their original, uncompressed quality. No watermarks, no limits, no hidden fees.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-8">Why Choose Us?</h2>
        <ul className="space-y-3 mt-4 text-muted-foreground list-disc pl-5">
          <li><strong>Original Quality:</strong> We never compress your videos. You get the exact resolution and bitrate from Instagram.</li>
          <li><strong>Blazing Fast:</strong> Our optimized backend extracts and delivers videos in seconds.</li>
          <li><strong>Free & Unlimited:</strong> Download as many reels as you want without any restrictions.</li>
          <li><strong>No Watermarks:</strong> Keep the original video clean without any intrusive logos.</li>
          <li><strong>Private & Secure:</strong> We don't log your downloads or store any of your personal information.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-foreground mt-8">How It Works</h2>
        <p className="text-muted-foreground leading-relaxed">
          It's simple! Just copy the link of the Instagram Reel or Video you want to save, paste it into our search bar, and click <strong>Download</strong>. Our system will instantly fetch the available qualities, allowing you to choose the best one.
        </p>
      </div>
    </div>
  );
}
