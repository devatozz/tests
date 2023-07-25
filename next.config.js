require("dotenv").config();
module.exports = {
  reactStrictMode: true,
  env: {
    mongodburl: process.env.DATABASE_URL,
  },
  images: {
    domains: ['localhost', 'logos.covalenthq.com', "app.calamus.finance"],
  },
};