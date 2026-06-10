import type { Metadata } from "next";
import Letter from "./letter";

export const metadata: Metadata = {
  title: "Para Letícia",
  description: "",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  openGraph: {
    title: "Para Letícia",
    description: "",
    images: [
      {
        url: "https://joaodadas.com/galleryIMGs/space/08.jpg",
        width: 736,
        height: 981,
      },
    ],
  },
};

export default function Page() {
  return <Letter />;
}
