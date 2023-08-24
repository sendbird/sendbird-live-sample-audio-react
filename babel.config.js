module.exports = {
  "exclude": "node_modules/**",
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": "> 0.25% and not op_mini all and not dead" ,
        "corejs": 3,
        "useBuiltIns": "usage"
      }
    ],
    "@babel/preset-react",
    "@babel/preset-typescript",
  ],
}