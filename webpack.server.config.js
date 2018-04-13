const fs = require('fs')
const path = require('path')

function getExternals() {
  return fs.readdirSync('node_modules').reduce((acc, mod) => {
    if (mod !== '.bin') {
      acc[mod] = `commonjs ${mod}`
    }
    return acc
  }, {})
}

module.exports = {
  mode: 'production',
  entry: './app.js',
  target: 'node',
  externals: getExternals(),
  resolve: { extensions: ['*', '.js', '.json'] },
  output: {
    path: path.resolve(__dirname),
    filename: 'server.packed.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          babelrc: false, // leave .babelrc for browser use
          presets: [
            ['@babel/preset-env', { targets: { node: 'current' } }],
            '@babel/preset-stage-2'
          ],
          plugins: [
            '@babel/plugin-transform-modules-commonjs',
            '@babel/plugin-transform-runtime'
          ]
        }
      }
    ]
  }
}
