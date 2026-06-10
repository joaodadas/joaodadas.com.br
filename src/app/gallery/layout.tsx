import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos and visual work.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
