const path = require('path')
const glob = require('glob')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
const dev = require('./env').isDev

const pages = glob.sync(`./pages/*/`).map((d) => path.basename(d))
const resolve = (name, f) => path.resolve(__dirname, `pages/${name}/`, f)

const instrumentViewFiles = (page) => {
  const views = glob.sync(`./pages/${page}/src/views/*`)
  return views.reduce((arr, template) => {
    const filename = `${page}/${path.basename(template).replace(/\.pre/, '')}`
    const options = { alwaysWriteToDisk: true, template, filename }
    return [...arr, new HtmlWebpackPlugin(options)]
  }, [])
}

const makeConfig = (page) => ({
  name: page,
  mode: dev ? 'development' : 'production',
  entry: [resolve(page, 'src/client.js')],
  output: {
    path: path.resolve(__dirname, 'static'),
    publicPath: '/static/',
    filename: dev ? `${page}.[name].js` : '[chunkhash].js'
  },
  devServer: {
    noInfo: true,
    hot: true,
    port: 3001,
    publicPath: '/static/'
  },
  resolve: { alias: { vue$: 'vue/dist/vue.esm.js' } },
  plugins: [
    ...(dev ? [new webpack.HotModuleReplacementPlugin()] : []),
    ...instrumentViewFiles(page),
    new HtmlWebpackHarddiskPlugin()
  ],
  module: {
    rules: [{ test: /\.vue$/, loader: 'vue-loader' }]
  }
})

module.exports = pages.map(makeConfig)
