const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const config = {
    entry: path.resolve(__dirname, "src", "Demo.tsx"),
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
                loader: "ts-loader",
                options: {
                    transpileOnly: true
                }
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["react"]
                    }
                }
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
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
}

module.exports = config;
