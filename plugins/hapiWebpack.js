import assert from 'assert'
import webpack, { MultiCompiler, HotModuleReplacementPlugin } from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

const env = process.env.NODE_ENV || 'development'

async function wrapMiddleware(middleware, request) {
  const { req, res } = request.raw
  await new Promise((resolve, reject) => {
    middleware(req, res, (error) => {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  })
}

function checkHMRPlugin(compiler) {
  const hasHMRPlugin = (c) =>
    (c.plugins || []).some((p) => p instanceof HotModuleReplacementPlugin)
  const compilers =
    compiler instanceof MultiCompiler ? compiler.compilers : [compiler]
  const ok = compilers.every((c) => hasHMRPlugin(c.options || {}))
  assert(ok, 'HMR plugin need to be added in webpack config file')
}

export default {
  name: 'hapiWebpack',
  version: '0.0.1',
  dependencies: 'inert',
  register: async (server, options) => {
    if (env === 'development') {
      const compiler = webpack(options)

      checkHMRPlugin(compiler)

      const devMiddleware = webpackDevMiddleware(compiler)
      const hotMiddleware = webpackHotMiddleware(compiler)

      server.ext('onRequest', async (request, h) => {
        await wrapMiddleware(devMiddleware, request)
        await wrapMiddleware(hotMiddleware, request)
        return h.continue
      })
      server.expose({ compiler })
    } else {
      server.route({
        method: 'GET',
        path: '/pages/{pagename}/dist/{filename}',
        handler: (request, h) => {
          const { pagename, filename } = request.params
          return h.file(`pages/${pagename}/dist/${filename}`)
        }
      })
    }
  }
}