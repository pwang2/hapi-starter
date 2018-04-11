const path = require('path')
const glob = require('glob')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')

const dev = (process.env.NODE_ENV || 'development') === 'development'
const pages = glob.sync(`./pages/*/`).map((d) => path.basename(d))
const resolve = (name, f) => path.resolve(__dirname, `pages/${name}/`, f)

const instrumentViewFiles = (name) =>
  glob.sync(`./pages/${name}/src/views/*`).reduce((arr, template) => {
    const filename = path.basename(template).replace(/\.pre/, '')
    return [
      ...arr,
      new HtmlWebpackPlugin({
        alwaysWriteToDisk: true,
        template,
        filename: `${name}/${filename}` // only namespace html file
      })
    ]
  }, [])

const makeConfig = (name) => ({
  name,
  mode: dev ? 'development' : 'production',
  entry: [
    ...(dev ? [`webpack-hot-middleware/client?name=${name}`] : []),
    resolve(name, 'src/client.js')
  ],
  output: {
    path: path.resolve(__dirname, 'static'),
    filename: dev ? '[name].js' : '[chunkhash].js'
  },
  resolve: { alias: { vue$: 'vue/dist/vue.esm.js' } },
  plugins: [
    ...(dev ? [new webpack.HotModuleReplacementPlugin()] : []),
    ...instrumentViewFiles(name),
    new HtmlWebpackHarddiskPlugin()
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: { test: /node_modules/, name: 'vendors', chunks: 'all' }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: 'vue-style-loader!css-loader!sass-loader' // <style lang="scss">
          }
        }
      }
    ]
  }
})

module.exports = pages.map(makeConfig)
