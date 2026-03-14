"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function AnimatedBackground() {
  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? resolvedTheme : theme;
  const isDark = currentTheme === "dark";

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div 
        className={`absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob ${
          isDark ? "bg-rose-900/30" : "bg-rose-200/60"
        }`}
      />
      <div 
        className={`absolute top-[20%] right-[-10%] w-[50%] h-[50%] rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob ${
          isDark ? "bg-purple-900/30" : "bg-purple-200/60"
        }`}
        style={{ animationDelay: "2s" }}
      />
      <div 
        className={`absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob ${
          isDark ? "bg-blue-900/30" : "bg-blue-200/60"
        }`}
        style={{ animationDelay: "4s" }}
      />
      
      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015]" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
