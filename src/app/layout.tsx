import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import Header from "@/components/header";
import Footer from "@/components/footer";
import AnimatedBackground from "@/components/animated-background";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#020817" },
  ],
};

export const metadata: Metadata = {
  title: "Instagram Reels Downloader | High Quality & Free",
  description: "Download Instagram Reels, Videos, and Posts in original high quality. Fast, free, and no watermark.",
  keywords: "instagram reels downloader, download instagram video, ig downloader, instagram to mp4",
  openGraph: {
    title: "Instagram Reels Downloader | High Quality & Free",
    description: "Download Instagram Reels, Videos, and Posts in original high quality. Fast, free, and no watermark.",
    type: "website",
    siteName: "IG Reels Downloader",
  },
  twitter: {
    card: "summary_large_image",
    title: "Instagram Reels Downloader | High Quality & Free",
    description: "Download Instagram Reels, Videos, and Posts in original high quality. Fast, free, and no watermark.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased min-h-screen flex flex-col relative overflow-x-hidden text-foreground bg-background`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AnimatedBackground />
          <Header />
          <main className="flex-1 flex flex-col relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
            {children}
          </main>
          <Footer />
          <Toaster position="bottom-center" toastOptions={{ className: "glass" }} />
        </ThemeProvider>
      </body>
    </html>
  );
}
