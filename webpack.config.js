const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const config = {
    entry: [
        "babel-polyfill",
        path.resolve(__dirname, "src", "Demo.tsx")
    ],
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "build"),
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                "react",
                                [
                                    "es2015",
                                    {
                                        "modules": false
                                    }
                                ],
                            ]
                        }
                    },
                    {
                        loader: "ts-loader",
                    },
                ],
            },
            { enforce: "pre", test: /\.js$/, use: { loader: "source-map-loader" } }
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
