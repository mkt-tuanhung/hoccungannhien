/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-159ff655a39c4822894b745838607914.r2.dev",
      },
    ],
  },
};

export default nextConfig;
