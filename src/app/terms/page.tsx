import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Instagram Reels Downloader",
  description: "Terms of Service for the Instagram Reels Downloader website.",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 glass p-8 sm:p-12 rounded-3xl mt-8">
      <h1 className="text-4xl font-bold tracking-tight text-foreground">Terms of Service</h1>
      
      <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-muted-foreground">
        <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>

        <p className="leading-relaxed">
          Please read these Terms of Service ("Terms") carefully before using the ReelGetter website operated by us.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-8">1. Acceptance of Terms</h2>
        <p className="leading-relaxed">
          By accessing or using our website, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the service.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-8">2. Use of Service</h2>
        <p className="leading-relaxed">
          Our service is provided to allow users to download public content from Instagram for personal offline viewing or fair use purposes. You agree not to use the service to download copyrighted material without permission from the copyright owner.
        </p>
        <p className="leading-relaxed mt-2 text-foreground font-medium">
          You are solely responsible for the media you download and how you use it. We do not grant any rights to the intellectual property of the downloaded content.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-8">3. Restrictions</h2>
        <p className="leading-relaxed">You agree not to:</p>
        <ul className="list-disc pl-5 space-y-2 mt-2">
          <li>Use the service for any illegal or unauthorized purpose.</li>
          <li>Attempt to bypass or break any security mechanism on the website.</li>
          <li>Use automated bots, scrapers, or scripts to access our API without written permission.</li>
          <li>Spam or overload our servers with excessive requests.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-foreground mt-8">4. Disclaimer of Warranties</h2>
        <p className="leading-relaxed">
          The service is provided on an "AS IS" and "AS AVAILABLE" basis. We make no warranties that the service will be uninterrupted, secure, or error-free. We do not guarantee that every Instagram link will be successfully processed.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-8">5. Limitation of Liability</h2>
        <p className="leading-relaxed">
          In no event shall ReelGetter be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-8">6. Changes to Terms</h2>
        <p className="leading-relaxed">
          We reserve the right to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion.
        </p>
      </div>
    </div>
  );
}
