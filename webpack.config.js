var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');

module.exports = {
    context: __dirname,
    devtool: debug ? "inline-sourcemap" : null,
    // This needs some changes.
    entry: "./public/mRemoteHost.jsx",
    module: {
    loaders: [
        {
            test: /\.jsx?$/,
            exclude: /(node_modules)/,
            loader: "babel-loader",
            query: {
                presets: ["react", "es2015", "stage-0"],
                plugins: ["react-html-attrs", "transform-class-properties", "transform-decorators-legacy"]
            }
        }
    ]
    },
    output: {
        path: __dirname,
        filename: "./public/mRemoteHostBundle.js"
    },
    plugins: debug ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    ]
};
