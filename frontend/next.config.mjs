// frontend/next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable polling for file changes (critical for Docker on Windows)
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000,    // Check for changes every 1 second
        aggregateTimeout: 300,
      };
    }
    return config;
  },
  // Optional: disable telemetry
  telemetry: false,
};

export default nextConfig;