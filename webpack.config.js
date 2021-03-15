var path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: { index: "./packages/index.js", utils: "./packages/utils/index.js" },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    library: "set-components",
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, "packages"),
          path.resolve(__dirname, "packages/utils"),
          path.resolve(__dirname, "test")
        ],
        exclude: /(node_modules|bower_components|dist)/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: "[local]___[hash:base64:5]"
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: "[local]___[hash:base64:5]"
            }
          },
          {
            loader: "less-loader", // compiles Less to CSS
            options: {
              javascriptEnabled: true,
              modules: true,
              sourceMap: true
            }
          },
          {
            loader: "postcss-loader"
          }
        ]
      }
    ]
  },
  plugins: [new MiniCssExtractPlugin()],
  externals: {
    react: {
      commonjs: "react",
      commonjs2: "react"
    },
    antd: {
      commonjs: "antd",
      commonjs2: "antd",
      amd: "antd"
    },
    moment: {
      commonjs: "moment",
      commonjs2: "moment",
      amd: "moment"
    },
    lodash: {
      commonjs: "lodash",
      commonjs2: "lodash",
      amd: "lodash",
      root: "_"
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "packages")
    }
  }
};
