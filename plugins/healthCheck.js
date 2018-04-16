const defaultOptions = {
  endpoint: '/health',
  message: 'I am okay'
}

export default {
  name: 'healthCheck',
  version: '0.0.1',
  register: (server, options) => {
    const { endpoint, message } = { ...defaultOptions, options }
    const route = {
      method: 'GET',
      path: endpoint,
      handler: (request, h) => h.response(message).type('text/plain')
    }
    server.route(route)
  }
}
