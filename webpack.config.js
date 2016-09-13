var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var CleanWebpackPlugin = require('clean-webpack-plugin');

var nodeModules = {};

fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
    context: path.join(__dirname),

    entry: [
      'webpack/hot/poll?1000',
      './src'
    ],

    output: {
        path: path.join(__dirname, 'builds'),
        filename: 'bundle.js',
        publicPath: '/'
        // hotUpdateChunkFilename: 'hot/hot-update.js',
        // hotUpdateMainFilename: 'hot/hot-update.json'
    },

    plugins: [
      new CleanWebpackPlugin(['builds']),
      new webpack.HotModuleReplacementPlugin()
    ],

    target: 'node',

    node: {
      __dirname: true,
      __filename: true,
    },

    module: {
        loaders: [
            {
                test:   /\.js/,
                loader: 'babel',
                include: __dirname + '/src',
                exclude: __dirname + '/builds'
            }
        ],
    },

    // devtool: 'eval-source-map'
    externals: nodeModules,

    resolve: {
      root: [
        path.resolve(__dirname),
      ],
      modulesDirectories: ['node_modules'],
      extensions: ['', '.js'],
    },
};
