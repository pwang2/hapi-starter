import controller from './controller'

export default {
  name: 'page-1',
  register: async (server, options) => {
    const routes = [
      { method: 'GET', path: '/', handler: controller.home(options) },
      { method: 'GET', path: '/another', handler: controller.another(options) }
    ]
    await server.route(routes)
  }
}
