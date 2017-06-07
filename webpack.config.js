const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const config = {
    entry: path.resolve(__dirname, "src", "Demo.jsx"),
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "build"),
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["react"]
                    }
                }
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: "html" },
            { from: "styles", to: "styles" }
        ])
    ],
    resolve: {
        extensions: ["*", ".js", ".jsx"]
    }
}

module.exports = config;