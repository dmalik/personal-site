var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack           = require('webpack');
var autoprefixer      = require('autoprefixer');
var precss            = require('precss');
var postcssImport     = require('postcss-import');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var CompressionPlugin = require("compression-webpack-plugin");

var path = require('path');

module.exports = {

  degug: true,

  entry: {
    homepage: './src',
    css: './src/style.css'
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/html/'),
    publicPath: './html'
  },
  resolve: {
    extensions: ['', '.jsx', '.js', '.json'],
    modulesDirectories: ['node_modules']
  },
  module: {
    loaders: [
      { test: /\.js[x]?$/, exclude: /node_modules/, loader: 'babel-loader',  query: { presets: ['es2015']} },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader') },
      { test: /\.(jpe?g|png|gif|svg)$/i, loaders: ['file?hash=sha512&digest=hex&name=[hash].[ext]', 'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false']},
      { test: /\.woff$/, loader: 'file-loader?name=fonts/[name].[ext]' }
    ]
  },
  postcss: function () {
    return [postcssImport({ addDependencyTo: webpack }), precss, autoprefixer];
  },
  imageWebpackLoader: {
    pngquant: {
      quality: "65-90",
      speed: 4
    },
    svgo: {
      plugins: [
        {
          removeViewBox: true
        },
        {
          removeEmptyAttrs: true
        }
      ]
    }
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new BrowserSyncPlugin({
      // browse to http://localhost:3000/ during development,
      // ./public directory is being served
      host: 'localhost',
      port: 3000,
      server: { baseDir: ['html'] }
    }),
    new CopyWebpackPlugin([
      // {output}/to/file.txt
      { from: 'src/index.html', to: 'index.html' }
    ]),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ]
};