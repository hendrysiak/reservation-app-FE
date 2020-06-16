const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {
    CleanWebpackPlugin
} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const autoprefixer = require("autoprefixer");
const webpack = require("webpack");
const dotenv = require('dotenv');


module.exports = () => {
 
      // call dotenv and it will return an Object with a parsed key 
  const env = dotenv.config().parsed;
  
  // reduce it to a nice object, the same as before
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});


    return {
    entry: "./src/index.ts",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[contenthash].bundle.js"
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        port: 9000,
        watchContentBase: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].[hash].css"
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/
        }),
        new BrowserSyncPlugin({
            host: "10.1.3.27",
            port: 9100,
            proxy: "http://localhost:9000",
        }, {
            reload: true
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    autoprefixer()
                ]
            }
        }),
        new webpack.DefinePlugin(envKeys)
    ],
    module: {
        rules: [{
                test: /\.scss$/,
                use: [
                    // { loader: "style-loader/url" },
                    // {
                    //     loader: "file-loader",
                    //     options: { name: "[name].[ext]" }
                    // }

                    // "style-loader",
                    // "css-loader",
                    // "sass-loader"

                    // "style-loader",
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                    "postcss-loader"
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]"
                    }
                }
            },
            {
                test: /\.(html)$/,
                use: ["html-loader"]
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
    }
};