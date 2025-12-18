import { motion } from "framer-motion";
import fs from "fs";
import matter from "gray-matter";
import { useAtom } from "jotai";
import { CodeXml, PencilLine, ChartCandlestick } from "lucide-react";
import { type GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import path from "path";
import { useEffect } from "react";
import ContentWrapper from "~/components/ContentWrapper";
import LinkText from "~/components/md/LinkText";
import LinkTextFooter from "~/components/md/LinkTextFooter";
import PostPreview from "~/components/PostPreview";
import { animateAtom } from "~/utils/atoms";
import { type BlogPageProps, type PostMetadata } from "./blog";
// import GeneratedComponent from "~/components/RedCircle";

const Home: NextPage<BlogPageProps> = ({ postsMetadata }) => {
  const [shouldAnimate, setShouldAnimate] = useAtom(animateAtom);

  useEffect(() => {
    if (shouldAnimate) {
      setTimeout(() => {
        setShouldAnimate(false);
      }, 2000);
    }
  }, [shouldAnimate, setShouldAnimate]);

  const sortedPostsMetadata = postsMetadata
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <>
      <Head>
        <title>João Vitor Dadas</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Brazilian software engineer" />
        <meta property="og:title" content="João Vitor Dadas" />
        <meta property="og:description" content="Brazilian software engineer" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.joaodadas.com.br" />
        <meta property="og:site_name" content="João Vitor Dadas" />
        <meta
          property="og:image"
          content="https://www.joaodadas.com.br/api/og"
        />
      </Head>
      <ContentWrapper>
        {/* BIO */}
        <div className={`${shouldAnimate ? "animate-5" : ""}`}>
          <div className="flex items-center justify-between pt-10 sm:pb-2 sm:pt-24">
            <div className="relative inline-block">
              <h1 className={` font-display text-xl font-semibold `}>
                João Vitor Dadas
              </h1>
            </div>
          </div>

          <div>
            <p className="mt-4 pb-12 pt-2 text-sm text-neutral-400 sm:mt-0">
              Somewhere between finance and tech
            </p>
          </div>
        </div>

        {/* PROJECTS */}
        <div className={`${shouldAnimate ? "animate-7" : ""}`}>
          <div className="flex items-center gap-2 pb-6">
            <CodeXml className={`h-3.5 w-3.5 text-neutral-400`} />
            <h2 className={`text-sm text-neutral-400`}>
              Projects I&apos;ve worked on
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 pb-12">
            <div className="flex flex-col gap-2">
              <p>
                <LinkText href="https://clynea.ai/">Clynea</LinkText>{" "}
              </p>
              <p className="text-sm text-neutral-400">
                Co-founder <span className="italic">(healthtech)</span>.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p>
                <LinkText href="https://www.ebanx.com/en/">EBANX</LinkText>{" "}
              </p>
              <p className="text-sm text-neutral-400">
                Work as a Software Engineer{" "}
                <span className="italic">(fintech)</span>.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p>
                <LinkText href="https://cargon.com.br/esg/">CargOn</LinkText>{" "}
              </p>
              <p className="text-sm text-neutral-400">
                Work as a Software Engineer{" "}
                <span className="italic">(logtech)</span>.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p>
                <LinkText href="https://lu.ma/-ccc?k=c">CCC</LinkText>{" "}
              </p>
              <p className="text-sm text-neutral-400">
                Curitiba Code Club (Member){" "}
              </p>
            </div>
          </div>
        </div>

        {/* WRITING */}
        <div className={`${shouldAnimate ? "animate-10" : ""} pb-12`}>
          <div className="flex justify-between pb-6 align-middle">
            <div className="flex items-center gap-2">
              <PencilLine className={`h-3.5 w-3.5 text-neutral-400`} />
              <h2 className={`text-sm text-neutral-400`}>Blog</h2>
            </div>
            <Link
              href="/blog"
              className={`text-sm text-neutral-400 transition duration-200 ease-in-out hover:text-neutral-700`}
            >
              Full content...
            </Link>
          </div>
          <ul className="flex flex-col">
            {sortedPostsMetadata.map((postMetadata) => (
              <motion.li key={postMetadata.slug}>
                <PostPreview
                  title={postMetadata.title}
                  description={postMetadata.description}
                  date={postMetadata.date}
                  slug={postMetadata.slug}
                />
              </motion.li>
            ))}
          </ul>
        </div>

        {/* MUSIC */}
        <div className={`${shouldAnimate ? "animate-13" : ""}`}>
          <div className="flex justify-between pb-6 align-middle">
            <div className="flex items-center gap-2">
              <ChartCandlestick className={`h-4 w-4 text-neutral-500`} />
              <h2 className={`text-sm text-neutral-500`}>
                investment portfolio
              </h2>
            </div>
            <Link
              href="/"
              className={`text-sm text-neutral-400 transition duration-200 ease-in-out hover:text-neutral-700`}
            >
              Coming soon...
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-sm text-neutral-700">
              Here you will find my investment portfolio and some of my thoughts
              on the market.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 pb-12 pt-16 text-sm">
          <LinkTextFooter href="https://x.com/joaodadas">X</LinkTextFooter>
          <LinkTextFooter href="https://github.com/joaodadas">
            GitHub
          </LinkTextFooter>
          <LinkTextFooter href="https://www.linkedin.com/in/jo%C3%A3o-vitor-dadas/">
            LinkedIn
          </LinkTextFooter>
          <LinkTextFooter href="mailto:dadasjv@hotmail.com">
            Email
          </LinkTextFooter>
          <LinkTextFooter href="https://noon-peace-17b.notion.site/Jo-o-Vitor-Dadas-13723ef5b82580bbb164ced6a2b3633d?pvs=4">
            Resume
          </LinkTextFooter>
        </div>
      </ContentWrapper>
    </>
  );
};

export const getStaticProps: GetStaticProps<BlogPageProps> = () => {
  const postsDirectory = path.join(process.cwd(), "src", "posts");
  const fileNames = fs.readdirSync(postsDirectory);

  const mdxFiles = fileNames.filter(
    (fileName) => path.extname(fileName) === ".mdx"
  );

  const postsMetadata: PostMetadata[] = mdxFiles.map((fileName) => {
    const filePath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);
    return data as PostMetadata;
  });

  return {
    props: {
      postsMetadata,
    },
  };
};

export default Home;
