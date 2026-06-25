const { build } = require("velite");

class VeliteWebpackPlugin {
  static started = false;
  apply(compiler) {
    compiler.hooks.beforeCompile.tapPromise("VeliteWebpackPlugin", async () => {
      if (VeliteWebpackPlugin.started) return;
      VeliteWebpackPlugin.started = true;
      const dev = compiler.options.mode === "development";
      await build({ watch: dev, clean: !dev });
    });
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async headers() {
    return [
      {
        // CORS para o metadata JSON do NFT — o Metaplex Core UI faz fetch disso
        // no browser pra renderizar o preview.
        source: "/nft/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET, OPTIONS" },
        ],
      },
      {
        // CORS para as imagens da galeria referenciadas pelo metadata.
        source: "/galleryIMGs/:path*",
        headers: [{ key: "Access-Control-Allow-Origin", value: "*" }],
      },
    ];
  },
  webpack: (config) => {
    config.plugins.push(new VeliteWebpackPlugin());
    return config;
  },
};

module.exports = nextConfig;
