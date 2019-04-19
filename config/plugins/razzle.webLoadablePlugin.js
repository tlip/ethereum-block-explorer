const { ReactLoadablePlugin } = require('react-loadable/webpack');

module.exports = (config) => ({
  plugins: config.plugins.concat([
    new ReactLoadablePlugin({ filename: './build/react-loadable.json' })
  ])
});
