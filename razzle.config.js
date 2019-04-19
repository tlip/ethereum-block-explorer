const nodeSassLoader = require('./config/plugins/razzle.nodeSassLoader');
const webSassLoader = require('./config/plugins/razzle.webSassLoader');
const webpackResolveAlias = require('./config/plugins/razzle.webpackResolveAlias');
const webLoadablePlugin = require('./config/plugins/razzle.webLoadablePlugin');

module.exports = {
  plugins: [
    { name: 'typescript', options: { useBabel: true } },
    { name: 'scss', options: { postcss: { dev: { sourceMap: false } } } },
  ],

  modify: (config, { target, dev }) => {
    const modifications = [];

    modifications.push(webpackResolveAlias(config));
    
    if (target === 'web') {
      modifications.push(webLoadablePlugin(config));
      // modifications.push(webSassLoader(config, dev));
    } else {
      // modifications.push(nodeSassLoader(config));
    }

    return Object.assign({}, config, ...modifications);
  },
};
