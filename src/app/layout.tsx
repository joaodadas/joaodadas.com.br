import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Sedan, Playfair_Display } from "next/font/google";
import Header from "~/components/Header";
import Providers from "~/components/providers";
import { ThemeProvider } from "~/components/ThemeProvider";
import { Toaster } from "sonner";
import "~/styles/globals.css";

const sedan = Sedan({
  subsets: ["latin"],
  variable: "--font-sedan",
  weight: "400",
  style: ["normal", "italic"],
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://joaodadas.com"),
  title: {
    default: "João Vitor Dadas",
    template: "%s - João Vitor Dadas",
  },
  description: "Brazilian software engineer",
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: "João Vitor Dadas",
    description: "Brazilian software engineer",
    type: "website",
    url: "https://joaodadas.com",
    siteName: "João Vitor Dadas",
    images: ["/api/og"],
  },
  twitter: {
    card: "summary_large_image",
    title: "João Vitor Dadas",
    description: "Brazilian software engineer",
    images: ["/api/og"],
  },
  icons: "/favicon.ico",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "João Vitor Dadas",
  url: "https://joaodadas.com",
  jobTitle: "Software Engineer",
  nationality: "Brazilian",
  sameAs: ["https://github.com/joaodadas"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sedan.variable} ${playfairDisplay.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider>
          <Providers>
            <Analytics />
            <Toaster />
            <main className="mx-auto max-w-[712px] px-4 md:py-10 min-h-[calc(100vh-50px-100px)] mb-10">
              <Header />
              {children}
            </main>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
