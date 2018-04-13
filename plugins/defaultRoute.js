export default {
  name: 'defaultRoute',
  version: '0.0.1',
  register: (server, options) => {
    server.ext('onRequest', (request, h) => {
      const { method, path } = request
      if (method === 'get' && path === '/') {
        request.setUrl(options.defaultRoute)
      }
      return h.continue
    })
  }
}
