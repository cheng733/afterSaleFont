const HtmlWebPackPlugin = require("html-webpack-plugin");
const  MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");

process.env.NODE_ENV = 'production';
const commonCssLoader = [MiniCssExtractPlugin.loader, "css-loader"]

module.exports = {
  entry: "./src/main.tsx",
  output: {
    filename: "js/bundle.js",
    path: __dirname + "/build",
  },

  devtool: "source-map",

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },

  module: {
    rules: [
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
              '@babel/preset-env',
              {
              useBuiltIns: 'usage',
              corejs: {
              version: 3
              },
              targets: {
              chrome: '60',
              firefox: '60',
              ie: '9',
              safari: '10',
              edge: '17'
              }
              }
              ]
              ]
            }
        },
      },
      {
        test: /\.html$/,
        use: {
          loader: "html-loader",
        },
      },
      {
        test: /\.css$/,
        use: [...commonCssLoader],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8 * 1024,
              name: '[hash:10].[ext]',
              outputPath: 'imgs',
              esModule: false,
              publicPath:"../imgs"
              }
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          ...commonCssLoader,
          {
            loader: "resolve-url-loader",
          },
          {
            loader: "sass-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      titel: "react app",
      filename: "index.html",
      template: "./src/index.html",
      minify: {
        collapseWhitespace: true,
        removeComments: true
  }
    }),
    new MiniCssExtractPlugin({
      filename:"css/bundle.css"
    }),
    new OptimizeCssAssetsWebpackPlugin()
  ],
  mode:"production",
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:8081",
        pathRewrite: { "^/api": "" },
      },
    },
  },
};
