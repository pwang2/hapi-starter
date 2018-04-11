import path from 'path'
import controller from './controller'

// direction naming is used as namespacing here
const name = path.basename(path.resolve(__dirname, '..'))
const viewPath = path.resolve(__dirname, '../../../static', name)

export default {
  name,
  register: async (server, options) => {
    const opts = { path: viewPath, ...options }
    const routes = [
      { method: 'GET', path: '/', handler: controller.home(opts) },
      { method: 'GET', path: '/another', handler: controller.another(opts) }
    ]
    await server.route(routes)
  }
}
