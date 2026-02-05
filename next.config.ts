import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/CV_DanielBascur.pdf",
        headers: [
          { key: "Content-Type", value: "application/pdf" },
          {
            key: "Content-Disposition",
            value: 'attachment; filename="CV_DanielBascur.pdf"',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
