module.exports = function(api) {
  api.cache(true);

  const presets = ["@babel/preset-env", "@babel/preset-react"];
  const plugins = [
    ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }],
    [
      "@babel/plugin-proposal-decorators",
      {
        legacy: true
      }
    ],
    [
      "@babel/plugin-proposal-class-properties",
      {
        loose: true
      }
    ],
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-syntax-class-properties",
    "@babel/plugin-transform-react-jsx",
    "transform-class-properties"
  ];

  return {
    presets,
    plugins
  };
};
