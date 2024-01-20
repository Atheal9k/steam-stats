/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "cdn.discordapp.com",
      "avatars.akamai.steamstatic.com",
      "media.steampowered.com",
      "avatars.steamstatic.com",
    ],
  },
};

module.exports = nextConfig;
