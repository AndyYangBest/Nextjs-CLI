/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  // 添加重写规则
  async rewrites() {
    return [
      {
        source: "/dashboard/:path*",
        destination: "/dashboard",
      },
    ];
  },
};
export default config;
