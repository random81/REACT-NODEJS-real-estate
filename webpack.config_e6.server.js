const path = require('path');
const nodeExternals = require('webpack-node-externals');

const CURRENT_WORKING_DIR = process.cwd();

const config = {
  name: 'server',
  entry: [path.join(CURRENT_WORKING_DIR, './backend/server.js')],
  target: 'node',
  output: {
    path: path.join(CURRENT_WORKING_DIR, '/buildServer/'),
    filename: 'server.generated.js',
    publicPath: '/buildServer/',
    libraryTarget: 'commonjs2',
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/env',
              '@babel/react',
            ],
          },
        }],
      },
    ],
  },

};
module.exports = config;
