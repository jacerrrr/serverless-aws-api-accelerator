const path = require('path');
const nodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

const slsw = require('serverless-webpack');

module.exports = {
  devtool: 'source-map',
  entry: slsw.lib.entries,
  externals: [nodeExternals({ whitelist: /^moment/ })],
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        use: [
          {
            loader: 'ts-loader?configFile=src/tsconfig.app.json',
          },
        ],
      },
    ],
  },
  optimization: {
    nodeEnv: false,
  },
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
  plugins: [new MomentLocalesPlugin()],
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: ['.js', '.json', '.ts'],
  },
  target: 'node',
};
