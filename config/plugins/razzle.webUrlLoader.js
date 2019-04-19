module.exports = (config, dev) => ({
  module: Object.assign({}, config.module, {
    rules: config.module.rules.concat([
      {
        test: /\.(gif|jpe?g|png|ico)$/,
        loader: 'url-loader?limit=10000'
      }
    ])
  })
});
