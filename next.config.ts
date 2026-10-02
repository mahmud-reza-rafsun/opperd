import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },

      // Dribbble
      {
        protocol: "https",
        hostname: "dribbble.com",
      },
      {
        protocol: "https",
        hostname: "cdn.dribbble.com",
      },

      // iBB
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
      {
        protocol: "https",
        hostname: "ibb.co",
      },

      // Stripe
      {
        protocol: "https",
        hostname: "stripe.com",
      },

      // Linear
      {
        protocol: "https",
        hostname: "linear.app",
      },

      // Harvest
      {
        protocol: "https",
        hostname: "getharvest.com",
      },

      // HubSpot
      {
        protocol: "https",
        hostname: "hubspot.com",
      },

      // PandaDoc
      {
        protocol: "https",
        hostname: "pandadoc.com",
      },

      // Zapier
      {
        protocol: "https",
        hostname: "zapier.com",
      },
      {
        protocol: "https",
        hostname: "www.stripe.com",
      },
      {
        protocol: "https",
        hostname: "www.hubspot.com",
      },
      {
        protocol: "https",
        hostname: "www.pandadoc.com",
      },
      {
        protocol: "https",
        hostname: "www.getharvest.com",
      },
    ],
  },
};

export default nextConfig;
