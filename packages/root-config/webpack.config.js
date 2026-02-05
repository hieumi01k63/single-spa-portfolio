const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  // Read from environment variable (set in GitHub Actions), fallback for local
  const cdnBaseUrl = process.env.CDN_BASE_URL || "https://assets.teofe.dev";

  const mfeUrls = {
    navbar: isProduction
      ? `${cdnBaseUrl}/navbar/portfolio-navbar.js`
      : "http://localhost:9001/portfolio-navbar.js",
    mainContent: isProduction
      ? `${cdnBaseUrl}/main-content/portfolio-main-content.js`
      : "http://localhost:9002/portfolio-main-content.js",
    shared: isProduction
      ? `${cdnBaseUrl}/shared/portfolio-shared.js`
      : "http://localhost:9003/portfolio-shared.js",
    notFound: isProduction
      ? `${cdnBaseUrl}/not-found/portfolio-not-found.js`
      : "http://localhost:9004/portfolio-not-found.js",
    sharedStyles: isProduction ? `${cdnBaseUrl}/shared/styles.css` : null, // In development, styles are injected via style-loader at runtime
    notFoundStyles: isProduction ? `${cdnBaseUrl}/not-found/styles.css` : null,
    rootConfig: isProduction
      ? "/portfolio-root-config.js"
      : "http://localhost:9000/portfolio-root-config.js",
  };

  return {
    entry: "./src/index.ts",
    experiments: {
      outputModule: true,
    },
    output: {
      filename: "portfolio-root-config.js",
      path: path.resolve(__dirname, "dist"),
      publicPath: isProduction ? "/" : "http://localhost:9000/",
      clean: true,
      library: {
        type: "module",
      },
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-typescript"],
            },
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.ejs",
        inject: false,
        templateParameters: {
          isProduction,
          mfeUrls,
          cdnBaseUrl,
        },
      }),
      new CopyWebpackPlugin({
        patterns: [{ from: "public", to: "" }],
      }),
    ],
    externalsType: "module",
    externals: {
      "single-spa": "single-spa",
      "@portfolio/navbar": "@portfolio/navbar",
      "@portfolio/main-content": "@portfolio/main-content",
      "@portfolio/not-found": "@portfolio/not-found",
    },
    devServer: {
      port: 9000,
      historyApiFallback: true,
      static: {
        directory: path.join(__dirname, "public"),
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers":
          "X-Requested-With, content-type, Authorization",
      },
      hot: true,
      allowedHosts: "all",
    },
    devtool: isProduction ? "source-map" : "eval-source-map",
  };
};
