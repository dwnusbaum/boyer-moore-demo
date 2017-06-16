const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const config = {
    entry: path.resolve(__dirname, "src", "Demo.tsx"),
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "docs"),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: "ts-loader",
                options: {
                    transpileOnly: true
                }
            },
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: "html" },
            { from: "styles", to: "styles" }
        ])
    ],
    resolve: {
        extensions: ["*", ".js", ".jsx", ".ts", ".tsx"]
    },
}

module.exports = config;
