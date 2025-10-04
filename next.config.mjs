/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },

  webpack(config) {
    // Allow importing .mdx files as raw strings (for parsing frontmatter)
    config.module.rules.push({
      test: /\.mdx?$/,
      resourceQuery: /raw/, // only when '?raw' is used in the import
      use: "raw-loader",
    });

    return config;
  },
};

export default nextConfig;


// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   images: {
//     unoptimized: true,
//   },
// }

// export default nextConfig
