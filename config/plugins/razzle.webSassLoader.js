const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (config, dev) => ({
  module: Object.assign({}, config.module, {
    rules: config.module.rules.concat([
      { // Add SCSS loader rule
        test: /\.(sa|sc)ss$/,
        use: [
          dev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ])
  })
});
