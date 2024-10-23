/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["img-cdn.pixlr.com"], // Whitelist the external domain here
  },
};

export default nextConfig;
