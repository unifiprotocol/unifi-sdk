module.exports = {
  webpack: {
    configure: {
      entry: "./src/App.tsx",
      resolve: {
        fallback: {
          path: require.resolve("path-browserify"),
          crypto: require.resolve("crypto-browserify"),
          stream: require.resolve("stream-browserify"),
          querystring: require.resolve("querystring-es3"),
          buffer: require.resolve("buffer-browserify"),
        },
      },
    },
  },
};
