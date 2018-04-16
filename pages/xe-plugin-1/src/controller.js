module.exports = {
  home: (options) => (request, h) => {
    const context = {
      message: 'hello world from hapi!',
      pmessage: 'hello world from vue props from hapi handler!'
    }
    const log = request.getLogger()
    log.debug('about to test log interface')
    log.info('haha')
    log.warn('be aware')
    log.error('this is not a good news')
    log.fatal('nnnnnnnoooooooooooooooooooooooo')
    request.server.log(['info', 'custom'], 'yeah')
    // request.server.log(['info', 'error'], new Error('MY ERROR THROW BRUTALLY'))
    return h.view('index', context, options)
  },
  another: (options = { layout: 'default' }) => (request, h) => h.view('another', {}, options)
}
