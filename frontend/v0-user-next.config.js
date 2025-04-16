const { withSentryConfig } = require("@sentry/nextjs")

const moduleExports = {
  reactStrictMode: true,
  i18n: {
    locales: ["ru", "en"],
    defaultLocale: "ru",
  },
  images: {
    domains: ["example.com"], // Add your image domains here
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ]
  },
}

const sentryWebpackPluginOptions = {
  // Additional options for Sentry Webpack plugin
}

module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions)

