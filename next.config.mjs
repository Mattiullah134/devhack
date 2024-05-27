/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",

        hostname:
          "amplify-devhack-mattiulla-hackthondrivebucketef7be-ibwctywpfyc0.s3.ap-south-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
