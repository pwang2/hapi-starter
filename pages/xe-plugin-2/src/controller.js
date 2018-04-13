module.exports = {
  home: (options) => (request, h) => {
    const context = {
      message: 'hello world from hapi!',
      pmessage: 'hello world from vue props from hapi handler!'
    }
    return h.view('index', context, options)
  },
  another: (options = { layout: 'default' }) => (request, h) =>
    h.view('another', {}, options)
}
