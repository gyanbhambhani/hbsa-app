import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ↓ Add this block
  async headers() {
    return [
      {
        source: "/(.*)",          // every route
        headers: [
          // 1) Allow the page to live inside <iframe> tags
          { key: "X-Frame-Options", value: "ALLOWALL" },
          // 2) If you already send a CSP header, loosen just the frame-ancestors bit
          //    so specific sites (or *) are allowed to embed you:
          // { key: "Content-Security-Policy",
          //   value: "frame-ancestors https://your-parent-site.com;" },
        ],
      },
    ];
  },
};

export default nextConfig;
