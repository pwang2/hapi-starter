export default {
  home: (options) => (request, h) => {
    const context = {
      message: 'hello world from hapi!',
      pmessage: 'hello world from vue props from hapi handler!'
    }
    const log = request.getLogger()
    log.info('haha')
    request.server.log(['info', 'custom'], 'yeah')
    request.server.log(['info', 'error'], new Error('ERROR'))
    return h.view('index', context, options)
  },
  another: (options = { layout: 'default' }) => (request, h) =>
    h.view('another', {}, options)
}
