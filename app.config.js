import good from 'good'
import inert from 'inert'
import vision from 'vision'
import goodConfig from './configs/good'
import hapiWebpack from './plugins/hapiWebpack'
import webpackConfig from './webpack.config'
import page1 from './pages/xe-plugin-1/src/index'
import page1Config from './configs/page1'
import page2 from './pages/xe-plugin-2/src/index'
import page2Config from './configs/page2'

const dev = (process.env.NODE_ENV || 'development') === 'development'

const plugins = [
  { plugin: inert },
  { plugin: vision },
  { plugin: good, options: goodConfig },
  { plugin: hapiWebpack, options: { webpackConfig, dev } },
  { plugin: page1, options: page1Config, routes: { prefix: '/page1' } },
  { plugin: page2, options: page2Config, routes: { prefix: '/page2' } }
]

const manifest = {
  server: { port: 3000, router: { stripTrailingSlash: true } },
  register: { plugins }
}

export default { manifest, options: {} }
