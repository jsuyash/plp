const debug = process.env.NODE_ENV !== "production";

const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const cssnano = require("cssnano");
const MinifyPlugin = require("babel-minify-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env = "development", argv) => {
  const processEnvConfig = {};

  return {
    context: path.join(__dirname, "/src"),
    stats: {
      colors: true,
      hash: true,
      timings: true,
      assets: true,
      chunks: true,
      chunkModules: true,
      modules: true,
      children: false
    },
    entry: {
      index: "./index.js"
    },
    output: {
      publicPath: "/",
      path: path.join(__dirname, "dist"),
      filename: "[chunkhash].js",
      chunkFilename: "[chunkhash].js"
    },
    resolve: {
      extensions: ["*", ".js", ".jsx"]
    },
    devServer: {
      historyApiFallback: true
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/env"]
            }
          }
        },
        {
          test: /\.(jpe?g|png|gif|svg)(\?[a-z0-9=.]+)?$/,
          use: {
            loader: "url-loader"
          }
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)(\?[a-z0-9=.]+)?$/,
          use: {
            loader: "file-loader"
          }
        },
        {
          test: /\.scss$/,
          use: [MiniCssExtractPlugin.loader, { loader: "css-loader" }, { loader: "sass-loader" }]
        },
        {
          test: /\.css$/,
          use: [
            { loader: "style-loader" },
            {
              loader: "css-loader"
            },
            { loader: "sass-loader" }
          ]
        }
      ]
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          default: false,
          vendors: false,
          // vendor chunk
          vendor: {
            // sync + async chunks
            chunks: "all",
            // import file path containing node_modules
            test: /node_modules/,

            // priority
            priority: 20
          },
          // common chunk
          common: {
            name: "common",
            minChunks: 2,
            chunks: "async",
            priority: 10,
            reuseExistingChunk: true,
            enforce: true
          }
        }
      }
    },
    plugins: [
      new CleanWebpackPlugin(),
      new webpack.DefinePlugin({
        "process.env": processEnvConfig
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessor: cssnano,
        cssProcessorOptions: {
          discardComments: {
            removeAll: true
          },
          // Run cssnano in safe mode to avoid
          // potentially unsafe transformations.
          safe: true
        },
        canPrint: false
      }),
      new MinifyPlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new MiniCssExtractPlugin({
        filename: "style.css",
        chunkFilename: "[chunkhash].css"
      }),
      new HtmlWebpackPlugin({
        template: "../html_templates/index.html",
        files: {
          css: ["style.css"],
          js: ["bundle.js"]
        },
        // favicon: "../public/favicon.ico",
        minify: {
          html5: true,
          collapseWhitespace: true,
          minifyCSS: true,
          minifyJS: true,
          minifyURLs: false,
          removeAttributeQuotes: true,
          removeComments: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributese: true,
          useShortDoctype: true
        }
      })
    ]
  };
};
