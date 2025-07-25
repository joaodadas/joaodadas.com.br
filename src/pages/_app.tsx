/* eslint-disable @next/next/no-page-custom-font */
import { MDXProvider } from "@mdx-js/react";
import { type Components } from "@mdx-js/react/lib";
import { Analytics } from "@vercel/analytics/react";
import { type AppType } from "next/app";
import Head from "next/head";
import Code from "~/components/md/Code";
import CustomImage from "~/components/md/CustomImage";
import H1 from "~/components/md/H1";
import H2 from "~/components/md/H2";
import H3 from "~/components/md/H3";
import Hr from "~/components/md/Hr";
import Li from "~/components/md/Li";
import LinkText from "~/components/md/LinkText";
import OrderedList from "~/components/md/OrderedList";
import P from "~/components/md/P";
import Quote from "~/components/md/Quote";
import Strong from "~/components/md/Strong";
import UnorderedList from "~/components/md/UnorderedList";
import "~/styles/globals.css";
import "~/utils/suppressWarnings";

const MyApp: AppType = ({ Component, pageProps }) => {
  const components = {
    h1: H1,
    h2: H2,
    h3: H3,
    strong: Strong,
    li: Li,
    p: P,
    a: LinkText,
    blockquote: Quote,
    ul: UnorderedList,
    ol: OrderedList,
    img: CustomImage,
    pre: Code,
    hr: Hr,
  };

  return (
    <>
      <Analytics />
      <MDXProvider components={components as unknown as Components}>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
            rel="stylesheet"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Sedan:ital@0;1&display=swap"
            rel="stylesheet"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin=""
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
            rel="stylesheet"
          />
        </Head>
        <main className="firefox-scrollbar-fix min-h-screen bg-[#111112] text-neutral-200">
          {/* <Header /> */}
          <Component {...pageProps} />
        </main>
      </MDXProvider>
    </>
  );
};

export default MyApp;
