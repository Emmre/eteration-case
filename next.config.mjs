/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
    emotion: true,
  },
  images: {
    domains: ["loremflickr.com"],
  },
};

export default nextConfig;
