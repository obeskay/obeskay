module.exports = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: [
      "localhost",
      "res.cloudinary.com",
      "stickycoverspayload.app.obeskay.com",
      "randomuser.me",
    ],
  },
  experimental: {
    urlImports: [
      "https://framer.com/m/",
      "https://framerusercontent.com/",
      "https://ga.jspm.io/",
      "https://jspm.dev/",
    ],
  },
  devIndicators: {
    autoPrerender: false,
  },
};
