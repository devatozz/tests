module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", "logos.covalenthq.com", "app.calamus.finance"],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
    },
};
