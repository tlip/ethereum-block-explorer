module.exports = (config, dev) => {
  const modifiedEntry = [...config.entry.client];
  modifiedEntry.pop();
  return {
    output: Object.assign({}, config.output, {
      filename: `static/js/[name].${dev ? '' : '[chunkhash:8].'}bundle.js`,
    }),
    entry: {
      app: [...modifiedEntry, './src/client/app/client.app.tsx'],
      riskWidget: [...modifiedEntry, './src/client/riskWidget/client.riskWidget.tsx'],
    },
  };
};

