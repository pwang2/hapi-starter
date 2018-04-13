import assert from 'assert'

export default {
  name: 'hapiWebpackDevServer',
  version: '0.0.1',
  dependencies: 'h2o2',
  register: async (server, options) => {
    const { port, publicPath, enviroment } = options
    assert(
      process.env.NODE_ENV === 'development' || enviroment === 'development',
      '[hapiWebpackDevServer] should ONLY be used in development mode'
    )
    server.route({
      method: 'GET',
      path: `${publicPath}{file}`,
      handler: {
        proxy: { uri: `http://localhost:${port}${publicPath}{file}` }
      }
    })
  }
}
