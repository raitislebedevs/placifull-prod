const withImages = require('next-images');
const path = require('path');
const { nextI18NextRewrites } = require('next-i18next/rewrites');

module.exports = withImages({
  env: {
    API_ENDPOINT: process.env.API_ENDPOINT,
    API_SUFFIX: process.env.API_SUFFIX,
    STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
    EMAIL_ADDRESS: process.env.EMAIL_ADDRESS,
    EMAIL_ADDRESS: process.env.EMAIL_ADDRESS,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['placifull-static.s3.eu-central-1.amazonaws.com'],
  },
  rewrites: async () =>
    nextI18NextRewrites({
      de: 'de',
      fr: 'fr',
      lv: 'lv',
      se: 'se',
      ee: 'ee',
      lt: 'lt',
      cn: 'cn',
      in: 'in',
      es: 'es',
      sa: 'sa',
      ru: 'ru',
      pt: 'pt',
      it: 'it',
      cs: 'cz',
      no: 'no',
      fi: 'fi',
      dk: 'dk',
      ro: 'ro',
      jp: 'jp',
      id: 'id',
    }),
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  saassLoaderOptions: {
    outputStyle: 'compressed',
  },
  webpack: (config) => {
    return config;
  },
});
