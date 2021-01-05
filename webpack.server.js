const path = require('path');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpackConfig = require('./webpack.config');
const ESLintPlugin = require('eslint-webpack-plugin');
module.exports = (env, argv) => {
  const modeEnv = argv.mode || 'development';
  const config = webpackConfig(modeEnv);

  const optimizations = {
    minimizer: [
      // new UglifyJsPlugin(),
    ],
  };

  return {
    plugins: [new ESLintPlugin(), new CleanWebpackPlugin(), new MiniCssExtractPlugin()],
    resolve: config.resolve,
    module: {
      rules: [config.modules.js, config.modules.sassIsomorph /* , config.modules.img */],
    },
    entry: {
      main: './src/Server.tsx',
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'server'),
    },
    performance: {
      hints: false,
    },
    optimization: optimizations,
    target: 'node',
    externals: [nodeExternals()],
  };
};
