const webpack = require("webpack");
const Path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = () => {
  return {
    context: Path.join(__dirname, "src"),
    entry: "./index.js",
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          loader: "babel-loader",
          options: { presets: ["@babel/env"] }
        },
        {
          test: /\.(jpe?g|png|gif|svg)(\?[a-z0-9=.]+)?$/,
          use: [
            {
              loader: "url-loader"
            }
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)(\?[a-z0-9=.]+)?$/,
          use: {
            loader: "file-loader"
          }
        },
        {
          test: /\.(scss|css)$/,
          loaders: ["style-loader", "css-loader", "sass-loader"]
        }
      ]
    },
    devServer: {
      open: true
    },
    output: {
      publicPath: "/",
      path: __dirname + "/dist/",
      filename: "bundle.js"
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "../html_templates/index.html",
        files: {
          css: ["style.css"],
          js: ["bundle.js"]
        }
        // favicon: "../public/favicon.ico"
      })
    ]
  };
};
