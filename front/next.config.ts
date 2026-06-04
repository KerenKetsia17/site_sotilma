// ============================================================
// FICHIER : next.config.ts
// RÔLE    : Configuration de Next.js
//
// Important : next/image vérifie que les images viennent
// d'un domaine autorisé. Si on utilise des URLs externes
// (Wix CDN ici), on doit les déclarer ici sinon Next.js
// les bloque pour des raisons de sécurité.
// ============================================================

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.wixstatic.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.the-land.bzh",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "media.istockphoto.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "previews.123rf.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "aesie.net",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
