// @ts-ignore
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (config) => ({
  module: Object.assign({}, config.module, {
    rules: config.module.rules.concat([
      {
        test: /\.(sa|sc)ss$/,
        use: 'css-loader'
      }
    ])
  })
});
