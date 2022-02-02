module.exports = {
    webpack: {
        configure: {
            resolve: {
                fallback: {
                    path: require.resolve("path-browserify"),
                    crypto: require.resolve("crypto-browserify"),
                    stream: require.resolve("stream-browserify"),
                },
            },
        },
    },
};