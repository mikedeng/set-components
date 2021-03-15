var path = require("path");
const autoprefixer = require("autoprefixer");

const alertLessConfig = rules => {
  rules.forEach(rule => {
    if (rule.loader && rule.loader.includes("less-loader")) {
      rule.options = rules.options || {};
      rule.options.javascriptEnabled = true;
      rule.options.sourceMap = true;
    } else if (rule.use) {
      alertLessConfig(rule.use);
    }
  });
};
const filePath = "/set-components";

module.exports = {
  history: "hash",
  port: 8092,
  source: {
    guide: ["./guide"],
    packages: "./packages",
    utils: "./packages/utils"
  },
  output: "./docs",
  theme: "./site",
  entiryName: "index",
  themeConfig: {
    siteKey: "set-components",
    home: "/guide/introduce",
    root: filePath,
    combineChangelog: false,
    compSorterType: "native",
    title: "常用的组件",
    github: "https://github.com/mikedeng",
    friendLinks: [
      { name: "mikedeng", link: "https://mikedeng.github.io" },
      { name: "antd", link: "https://ant-design.gitee.io/index-cn" },
      {
        name: "react",
        link: "https://react.docschina.org/tutorial/tutorial.html"
      },
      { name: "BiSheng", link: "https://github.com/benjycui/bisheng" }
    ]
  },
  devServerConfig: {},
  webpackConfig(config) {
    config.devtool = "source-map";
    config.resolve.alias = {
      "@": path.resolve(__dirname, "packages")
    };

    alertLessConfig(config.module.rules);
    return config;
  },

  // postcssConfig: {
  //   default: {
  //     plugins: [
  //       autoprefixer({
  //         overrideBrowserslist: ["> 1%", "last 2 versions", "not ie <= 10"]
  //       })
  //     ]
  //   }
  // },
  root: `${filePath}/`
};
