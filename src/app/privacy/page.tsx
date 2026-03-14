import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Instagram Reels Downloader",
  description: "Privacy policy for the Instagram Reels Downloader website.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 glass p-8 sm:p-12 rounded-3xl mt-8">
      <h1 className="text-4xl font-bold tracking-tight text-foreground">Privacy Policy</h1>
      
      <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-muted-foreground">
        <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>

        <p className="leading-relaxed">
          At ReelGetter ("we," "our," or "us"), your privacy is our priority. This Privacy Policy explains how we collect, use, and protect your information when you use our website.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-8">1. Information We Collect</h2>
        <p className="leading-relaxed">
          We designed our service to require minimal personal information.
        </p>
        <ul className="list-disc pl-5 space-y-2 mt-2">
          <li><strong>Log Data:</strong> Like most websites, our servers automatically record information your browser sends whenever you visit. This may include your IP address, browser type, and the pages you visit. This is used strictly to prevent abuse and rate-limit excessive requests.</li>
          <li><strong>Usage Data:</strong> We may use basic analytics to understand how our website is used. This data is anonymized.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-foreground mt-8">2. Downloaded Content</h2>
        <p className="leading-relaxed">
          We do <strong>not</strong> host, store, or cache the Instagram videos or images you download through our service. Our tool acts as a proxy to fetch publicly available data directly from Instagram's servers to your device. We do not keep logs of the specific URLs you process.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-8">3. Cookies</h2>
        <p className="leading-relaxed">
          We use minimal cookies necessary for the functioning of the website (for example, to remember your dark/light mode preference). You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-8">4. Third-Party Services</h2>
        <p className="leading-relaxed">
          Our service interacts with Instagram's public APIs to retrieve media. We are in no way affiliated with Instagram, Meta, or any of their partners.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-8">5. Changes to This Policy</h2>
        <p className="leading-relaxed">
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
        </p>

        <p className="mt-8">
          If you have any questions about this Privacy Policy, please contact us.
        </p>
      </div>
    </div>
  );
}
