import path from 'path'

const viewPath = path.resolve(__dirname, '../dist')

export default {
  home: (options = { layout: 'default' }) => (request, h) => {
    const context = {
      message: 'hello world from hapi! wtf',
      pmessage: 'hello world from vue props from hapi handler!'
    }
    return h.view('index', context, { path: viewPath, ...options })
  },
  another: (options = { layout: 'default' }) => (request, h) =>
    h.view('another', {}, { path: viewPath, ...options })
}
