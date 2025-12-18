import { motion } from "framer-motion";
import fs from "fs";
import matter from "gray-matter";
import { type GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import path from "path";
import BackButton from "~/components/BackButton";
import ContentWrapper from "~/components/ContentWrapper";
import PostPreview from "~/components/PostPreview";

export interface BlogPageProps {
  postsMetadata: PostMetadata[];
}

export interface PostMetadata {
  title: string;
  slug: string;
  description: string;
  date: string;
  emoji: string;
}

const Blog: NextPage<BlogPageProps> = ({ postsMetadata }) => {
  // Sort the postsMetadata array by date in descending order
  const sortedPostsMetadata = postsMetadata.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  console.log(" testeeeeesaasdasd", sortedPostsMetadata);
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
        <BackButton href="/" />
        <motion.ul className="flex flex-col">
          {sortedPostsMetadata.map((post) => {
            return (
              <motion.li key={post.slug}>
                <PostPreview
                  title={post.title}
                  description={post.description}
                  date={post.date}
                  slug={post.slug}
                />
              </motion.li>
            );
          })}
        </motion.ul>
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

export default Blog;
