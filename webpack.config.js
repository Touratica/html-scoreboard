// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ShebangPlugin = require("webpack-shebang-plugin");

const dev = process.env.NODE_ENV !== "production";

const stylesHandler = !dev ? MiniCssExtractPlugin.loader : "style-loader";

const outputPath = path.resolve(__dirname, "dist");

/**
 * Compiles TypeScript with the given project's settings. The tsconfigs are
 * composite, type-check-only projects for `tsc -b`, so emitting is switched
 * back on here.
 */
function typescriptRule(configFile) {
  return {
    test: /\.tsx?$/,
    loader: "ts-loader",
    exclude: /node_modules/,
    options: {
      configFile,
      compilerOptions: { composite: false, noEmit: false },
    },
  };
}

const shared = {
  mode: dev ? "development" : "production",
  devtool: "inline-source-map",
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};

/** The scoreboard page, run in evergreen browsers. */
const browser = {
  ...shared,
  name: "browser",
  target: "web",
  entry: {
    main: ["./src/index.ts"],
  },
  output: {
    path: outputPath,
    // Runs first, so it alone may clear out the previous build.
    clean: !dev,
  },
  devServer: {
    open: true,
    host: "localhost",
  },
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
    ...(dev ? [] : [new MiniCssExtractPlugin()]),
  ],
  module: {
    rules: [
      typescriptRule("tsconfig.browser.json"),
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
};

/** The `html-scoreboard` executable that serves the built page. */
const server = {
  ...shared,
  name: "server",
  target: "node22",
  dependencies: ["browser"],
  entry: {
    server: ["./src/server/index.ts"],
  },
  output: {
    path: outputPath,
  },
  plugins: [new ShebangPlugin()],
  module: {
    rules: [typescriptRule("tsconfig.server.json")],
  },
};

module.exports = [browser, server];
