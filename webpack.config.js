var HTMLWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
    template: __dirname + '/project/index.html',
    filename: 'index.html',
    inject: 'body'
});

module.exports = {
    entry: __dirname + '/project/index.js',
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.scss$/,
          loaders: ['style', 'css', 'sass']
        }
      ]
    },
    output: {
      filename: 'transformed.js',
      path: __dirname + '/build'
    },
    plugins: [HTMLWebpackPluginConfig]
};