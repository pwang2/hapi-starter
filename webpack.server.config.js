const path = require('path')

const pkg = require('./package.json')

// specify babel environment
process.env.BABEL_ENV = 'hapi'

function getExternals() {
  return Object.entries(pkg.dependencies).reduce((acc, [key]) => {
    acc[key] = `commonjs ${key}`
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
    rules: [{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }]
  }
}
