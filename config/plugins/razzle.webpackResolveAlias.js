const path = require('path');

module.exports = (config) => ({
  resolve: Object.assign({}, config.resolve, {
    alias: {
      '@src': path.resolve(__dirname, '..', '..', 'src')
    }
  })
});
