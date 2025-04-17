import { type GetStaticProps, type NextPage } from "next";
import path from "path";
import fs from "fs";
import Head from "next/head";
import BackButton from "~/components/BackButton";
import ContentWrapper from "~/components/ContentWrapper";
import Image from "next/image";

export interface GalleryProps {
  images: { name: string; src: string }[];
}

const Galery: NextPage<GalleryProps> = ({ images }) => {
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
        <h1 className={`mb-6 text-sm text-neutral-500`}>Gallery</h1>
        <div className="gallery">
          {images.map((image: { name: string; src: string }) => (
            <div key={image.name} className="image">
              <Image
                src={image.src}
                alt={image.name}
                width={300} // Set desired width
                height={200} // Set desired height
              />
              <p>{image.name}</p>
            </div>
          ))}
        </div>
      </ContentWrapper>
    </>
  );
};

export const getStaticProps: GetStaticProps<GalleryProps> = () => {
  const imagesDirectory = path.join(process.cwd(), "src", "images");

  const fileNames = fs.readdirSync(imagesDirectory);

  const imageFiles = fileNames.filter((fileName) =>
    /\.(jpg|jpeg|png|gif|webp)$/i.test(fileName)
  );

  const images = imageFiles.map((fileName) => ({
    name: path.parse(fileName).name,
    src: `/images/${fileName}`,
  }));

  return {
    props: {
      images,
    },
  };
};

export default Galery;
