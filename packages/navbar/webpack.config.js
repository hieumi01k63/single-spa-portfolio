const path = require("path");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    entry: "./src/index.ts",
    experiments: {
      outputModule: true,
    },
    output: {
      filename: "portfolio-navbar.js",
      path: path.resolve(__dirname, "dist"),
      publicPath: isProduction ? "/" : "http://localhost:9001/",
      clean: true,
      library: {
        type: "module",
      },
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                ["@babel/preset-react", { runtime: "automatic" }],
                "@babel/preset-typescript",
              ],
            },
          },
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
      ],
    },
    externalsType: "module",
    externals: {
      react: "react",
      "react-dom": "react-dom",
      "react-dom/client": "react-dom/client",
      "react/jsx-runtime": "react/jsx-runtime",
      "react/jsx-dev-runtime": "react/jsx-dev-runtime",
      "single-spa": "single-spa",
      "single-spa-react": "single-spa-react",
      "framer-motion": "framer-motion",
      "lucide-react": "lucide-react",
      "@portfolio/shared": "@portfolio/shared",
    },
    devServer: {
      port: 9001,
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
