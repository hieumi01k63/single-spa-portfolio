const path = require("path");
const { CssExtractRspackPlugin } = require("@rspack/core");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    entry: "./src/index.ts",
    experiments: {
      outputModule: true,
    },
    output: {
      filename: "portfolio-navbar.js",
      cssFilename: "portfolio-navbar.css",
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
    plugins: isProduction
      ? [
          new CssExtractRspackPlugin({
            filename: "portfolio-navbar.css",
          }),
        ]
      : [],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            isProduction ? CssExtractRspackPlugin.loader : "style-loader",
            "css-loader",
            "postcss-loader",
          ],
        },
        {
          test: /\.ts$/,
          exclude: [/node_modules/],
          loader: 'builtin:swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'typescript',
              },
            },
          },
          type: 'javascript/auto',
        },
        {
          test: /\.jsx$/,
          exclude: [/node_modules/],
          use: {
            loader: 'builtin:swc-loader',
            options: {
              jsc: {
                parser: {
                  syntax: 'ecmascript',
                  jsx: true,
                },
              },
            },
          },
          type: 'javascript/auto',
        },
        {
          test: /\.tsx$/,
          exclude: [/node_modules/],
          use: {
            loader: 'builtin:swc-loader',
            options: {
              jsc: {
                parser: {
                  syntax: 'typescript',
                  tsx: true,
                },
              },
            },
          },
          type: 'javascript/auto',
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
      liveReload: true,
      allowedHosts: "all",
      // Enable HMR when page is loaded from different origin (e.g., teofe.dev)
      client: {
        webSocketURL: "ws://localhost:9001/ws",
      },
    },
    devtool: isProduction ? "source-map" : "eval-source-map",
  };
};
