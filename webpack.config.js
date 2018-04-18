process.env.BABEL_ENV = 'static' // specify babel environment

const path = require('path')
const glob = require('glob')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')

const HandlebarsResourceReplacementPlugin = require('./HandlebarsResourceReplacementPlugin.js')
const dev = require('./env').isDev

const proxy = { '/': `http://localhost:${process.env.PORT || 3000}` }
const pages = glob.sync(`./pages/*/`).map((d) => path.basename(d))
const instrumentViewFiles = (page) => {
  const views = glob.sync(`./pages/${page}/src/views/*`)
  return views.reduce((arr, template) => {
    const filename = `${page}/${path.basename(template).replace(/\.pre/, '')}`
    const options = { alwaysWriteToDisk: true, template, filename }
    return [...arr, new HtmlWebpackPlugin(options)]
  }, [])
}

const makeConfig = (page) => ({
  mode: dev ? 'development' : 'production',
  devtool: dev ? '#eval-source-map' : '#source-map',
  entry: path.resolve(`pages/${page}/src/client.js`),
  output: {
    path: path.resolve(__dirname, 'static'),
    publicPath: '/static/',
    filename: dev ? `${page}.[name].js` : '[chunkhash].js',
    chunkFilename: dev ? `${page}.[id].js` : '[chunkhash].js'
  },
  devServer: { hot: true, noInfo: true, port: 8888, publicPath: '/static/', proxy },
  resolve: { alias: { vue$: 'vue/dist/vue.esm.js' } },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve(`pages/${page}/src/assets/**/*`),
        to: dev ? `${page}.[name].[ext]` : '[hash].[ext]', // need to be same as output.filename
        toType: 'template',
        flatten: true
      }
    ]),
    ...(dev ? [new webpack.HotModuleReplacementPlugin()] : []),
    ...instrumentViewFiles(page),
    new HandlebarsResourceReplacementPlugin(),
    new HtmlWebpackHarddiskPlugin()
  ],
  module: {
    rules: [
      { test: /\.vue$/, exclude: /node_modules/, loader: 'vue-loader' },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'url-loader',
        options: { limit: 8192, publicPath: '/static/' }
      }
    ]
  }
})

module.exports = pages.map(makeConfig)
