const path = require('path')
const webpack = require('webpack')
//提取css插件
const ExtractTextPlugin = require('extract-text-webpack-plugin')
//引入打包html文件插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin')
//引入autodll-webpack-plugin 自动
const AutoDllPlugin = require('autodll-webpack-plugin')

module.exports = {
  //入口文件
  entry: {
    main: './js/main.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          fallback: {
            loader: 'style-loader'
          },
          use: [
            {
              loader: 'css-loader',
              options: {}
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: [
                  require('postcss-cssnext')(),
                  require('cssnano')(),
                  require('postcss-pxtorem')({
                    rootValue: 16,
                    unitPrecision: 5,
                    propWhiteList: []
                  }),
                  require('postcss-sprites')()
                ]
              }
            },
            {
              loader: 'stylus-loader',
              options: {}
            }
          ]
        })
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]'
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: path.resolve(__dirname, 'node_modules')
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json']
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    port: 8081,
    host: 'localhost',
    headers: {
      author: 'andy'
    },
    inline: true,
    overlay: true
    // stats:'errors-only'
  },
  mode: 'development',
  plugins: [
    //从JS文件中提取出来的，CSS文件的名称
    new ExtractTextPlugin({
      filename: 'main.css'
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
      filename: 'index.html',
      inject: true
    }),
    new AutoDllPlugin({
      inject: true,
      debug: true,
      filename: '[name]_[hash].js',
      entry: {
        vendor: ['jquery']
      }
    })
  ]
}
