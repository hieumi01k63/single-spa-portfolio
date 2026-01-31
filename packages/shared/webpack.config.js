const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    entry: "./src/index.ts",
    experiments: {
      outputModule: true,
    },
    output: {
      filename: "portfolio-shared.js",
      path: path.resolve(__dirname, "dist"),
      publicPath: isProduction ? "/" : "http://localhost:9003/",
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
          use: [
            isProduction ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
            "postcss-loader",
          ],
        },
      ],
    },
    plugins: [
      ...(isProduction
        ? [
            new MiniCssExtractPlugin({
              filename: "styles.css",
            }),
          ]
        : []),
    ],
    externalsType: "module",
    externals: {
      react: "react",
      "react-dom": "react-dom",
      "react-dom/client": "react-dom/client",
      "react/jsx-runtime": "react/jsx-runtime",
      "react/jsx-dev-runtime": "react/jsx-dev-runtime",
      zustand: "zustand",
      "framer-motion": "framer-motion",
      "lucide-react": "lucide-react",
      clsx: "clsx",
      "class-variance-authority": "class-variance-authority",
      "tailwind-merge": "tailwind-merge",
    },
    devServer: {
      port: 9003,
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
