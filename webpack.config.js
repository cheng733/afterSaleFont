const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: "./src/main.tsx",
  output: {
    filename: "bundle.js",
    path: __dirname + "/dist",
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
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
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
    }),
  ],
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:8081",
        pathRewrite: { "^/api": "" },
      },
    },
  },
};
