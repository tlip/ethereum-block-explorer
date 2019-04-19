module.exports = config => ({
  output: Object.assign({}, config.output, {
    filename: 'static/js/[name].bundle.js'
  }),
  entry: {
    app: './src/client/app/client.app.tsx',
  }
});
