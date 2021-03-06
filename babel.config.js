module.exports = function(api) {
  api.cache(true);

  const presets = ["@babel/preset-react", "@babel/preset-env"];
  const plugins = [
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
    "@babel/plugin-syntax-class-properties",
    "@babel/plugin-transform-react-jsx",
    "@babel/plugin-proposal-optional-chaining",
    "@babel/plugin-proposal-do-expressions",
    "@babel/plugin-transform-runtime",
    "transform-class-properties",
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-proposal-export-namespace-from"
  ];

  return {
    presets,
    plugins
  };
};
