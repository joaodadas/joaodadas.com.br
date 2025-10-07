import { motion } from "framer-motion";
import fs from "fs";
import matter from "gray-matter";
import { useAtom } from "jotai";
import {
  CodeXml,
  FileText,
  Github,
  Linkedin,
  Mail,
  PencilLine,
  User,
  Library,
} from "lucide-react";
import { type GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import path from "path";
import { useEffect } from "react";
import ContentWrapper from "~/components/ContentWrapper";
import LinkText from "~/components/md/LinkText";
import PostPreview from "~/components/PostPreview";
import { animateAtom } from "~/utils/atoms";
import { type BlogPageProps, type PostMetadata } from "./blog";
import X from "~/components/x";
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
          <div className="flex items-center justify-between sm:pb-4 sm:pt-24">
            <div className="relative inline-block">
              <h1 className={` font-display text-2xl font-semibold `}>
                João Vitor Dadas
              </h1>
              <svg
                className=" bottom-0 left-0 z-0 h-3 w-full"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,5 C20,10 80,0 100,5"
                  stroke="red"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="flex items-center justify-center gap-4">
              <Link
                href="https://x.com/joaodadas"
                target="_blank"
                rel="noopener noreferrer"
              >
                <X
                  className={`h-4 w-4 transition-opacity duration-200 hover:opacity-80`}
                />
              </Link>
            </div>
          </div>

          <div>
            <p className="mt-4 pb-12 pt-2 text-base text-neutral-500 sm:mt-0">
              This place is a fragment of my personality
            </p>
          </div>
        </div>

        {/* PROJECTS */}
        <div className={`${shouldAnimate ? "animate-7" : ""}`}>
          <div className="flex items-center gap-2 pb-6">
            <CodeXml className={`h-3.5 w-3.5 text-neutral-200`} />
            <h2 className={`text-sm text-neutral-500`}>
              Projects I&apos;ve worked on
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 pb-12">
            <div className="flex flex-col gap-2">
              <p>
                <LinkText href="https://clynea.ai/">Clynea</LinkText>{" "}
              </p>
              <p className="text-sm text-neutral-500">
                Co-founder <span className="italic">(healthtech)</span>.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p>
                <LinkText href="https://www.uex.io/">UEX</LinkText>{" "}
              </p>
              <p className="text-sm text-neutral-500">
                Work as a Software Engineer{" "}
                <span className="italic">(Startup Studio)</span>.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p>
                <LinkText href="https://www.ebanx.com/en/">EBANX</LinkText>{" "}
              </p>
              <p className="text-sm text-neutral-500">
                Work as a Software Engineer{" "}
                <span className="italic">(fintech)</span>.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p>
                <LinkText href="https://cargon.com.br/esg/">CargOn</LinkText>{" "}
              </p>
              <p className="text-sm text-neutral-500">
                Work as a Software Engineer{" "}
                <span className="italic">(logtech)</span>.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p>
                <LinkText href="https://lu.ma/-ccc?k=c">CCC</LinkText>{" "}
              </p>
              <p className="text-sm text-neutral-500">
                Curitiba Code Club (Member){" "}
              </p>
            </div>
          </div>
        </div>

        {/* WRITING */}
        <div className={`${shouldAnimate ? "animate-10" : ""}`}>
          <div className="flex justify-between pb-6 align-middle">
            <div className="flex items-center gap-2">
              <PencilLine className={`h-3.5 w-3.5 text-neutral-200`} />
              <h2 className={`text-sm text-neutral-500`}>Blog</h2>
            </div>
            <Link
              href="/blog"
              className={`text-sm text-neutral-200 underline decoration-neutral-500 transition duration-200 ease-in-out hover:decoration-[red]`}
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
              <Library className={`h-3.5 w-3.5 text-neutral-200`} />
              <h2 className={`text-sm text-neutral-500`}>Music</h2>
            </div>
            <Link
              href="https://open.spotify.com/user/12159908355?si=c71c739a37fd4113"
              className={`text-sm text-neutral-200 underline decoration-neutral-500 transition duration-200 ease-in-out hover:decoration-[red]`}
            >
              Ver todas...
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            <iframe
              style={{ borderRadius: "12px" }}
              src="https://open.spotify.com/embed/playlist/0TVRJEfG61DO1qJDXQMHOZ?utm_source=generator&theme=0"
              width="100%"
              height="152"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* CONNECT */}
        <div className={`${shouldAnimate ? "animate-15" : ""}`}>
          <div className="flex items-center gap-2 pb-6 pt-8 ">
            <User className={`h-3.5 w-3.5 text-neutral-200`} />
            <h2 className={`text-sm text-neutral-500`}>Connect</h2>
          </div>
          <div className="flex gap-8">
            <motion.div className="flex items-center gap-2 transition duration-200 ease-in-out">
              <Github
                className={`h-4 w-4 text-neutral-500 transition-colors duration-200`}
              />
              <LinkText href="https://github.com/joaodadas">
                <p className="text-sm">GitHub</p>
              </LinkText>
            </motion.div>
            <motion.div className="flex items-center gap-2 transition duration-200 ease-in-out">
              <Linkedin
                className={`h-4 w-4 text-neutral-500 transition-colors duration-200`}
              />
              <LinkText href="https://www.linkedin.com/in/jo%C3%A3o-vitor-dadas/">
                <p className="text-sm">LinkedIn</p>
              </LinkText>
            </motion.div>
            <motion.div className="flex items-center gap-2 transition duration-200 ease-in-out">
              <Mail
                className={`h-4 w-4 text-neutral-500 transition-colors duration-200`}
              />
              <LinkText href="mailto:dadasjv@hotmail.com">
                <p className="text-sm">Email</p>
              </LinkText>
            </motion.div>
            <motion.div className="flex items-center gap-2 transition duration-200 ease-in-out">
              <FileText
                className={`h-4 w-4 text-neutral-500 transition-colors duration-200`}
              />
              <LinkText href="https://noon-peace-17b.notion.site/Jo-o-Vitor-Dadas-13723ef5b82580bbb164ced6a2b3633d?pvs=4">
                <p className="text-sm">CV</p>
              </LinkText>
            </motion.div>
          </div>
        </div>

        {/* <GeneratedComponent></GeneratedComponent> */}
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
