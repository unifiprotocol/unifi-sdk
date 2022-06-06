const webpack = require("webpack");

module.exports = {
  webpack: {
    plugins: [
      new webpack.ProvidePlugin({
        process: "process/browser",
        Buffer: ["buffer", "Buffer"],
      }),
    ],
    configure: {
      entry: "./src/App.tsx",
      resolve: {
        alias: {
          process: "process/browser",
        },
        fallback: {
          path: require.resolve("path-browserify"),
          crypto: require.resolve("crypto-browserify"),
          stream: require.resolve("stream-browserify"),
          querystring: require.resolve("querystring-es3"),
          buffer: require.resolve("buffer-browserify"),
          os: require.resolve(`os-browserify/browser`),
          https: require.resolve(`https-browserify`),
          http: require.resolve(`stream-http`),
          util: require.resolve(`util/`),
          url: require.resolve(`url/`),
          assert: require.resolve(`assert/`),
        },
      },
    },
  },
};
