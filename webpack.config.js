// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ShebangPlugin = require("webpack-shebang-plugin");

const dev = process.env.NODE_ENV !== "production";

const stylesHandler = !dev ? MiniCssExtractPlugin.loader : "style-loader";

const config = {
  entry: {
    main: ["./src/index.ts"],
    server: ["./src/server/index.ts"],
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    clean: !dev,
  },
  devtool: "inline-source-map",
  devServer: {
    open: true,
    host: "localhost",
  },
  target: "node12",
  plugins: [
    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    new FaviconsWebpackPlugin({
      logo: "./public/favicon.svg",
      mode: "auto",
      favicons: {
        background: "#fff",
        theme_color: "#fff",
      },
      dev,
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new ShebangPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: "/node_modules/",
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};

module.exports = () => {
  if (!dev) {
    config.mode = "production";

    config.plugins.push(new MiniCssExtractPlugin());
  } else {
    config.mode = "development";
  }
  return config;
};
