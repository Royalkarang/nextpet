/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["admin.nextpetapp.com", "frontend.nextpetapp.com"], // Add the allowed domain here
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
