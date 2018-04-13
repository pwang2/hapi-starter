import bunyan from 'bunyan'

import { curEnv, isDev } from './env'
import webpackConfig from './webpack.config'
import bunyanLoggerConfig from './configs/bunyanLogger'
import bunyanLogger from './plugins/bunyanLogger'
import hapiWebpackPlugin from './plugins/hapiWebpack'
import defaultRoutePlugin from './plugins/defaultRoute'

const logger = bunyan.createLogger(bunyanLoggerConfig)

// export logger explicitly to use logger out of hapi
export { logger }

export default {
  enviroment: curEnv,
  options: {},
  manifest: {
    server: { port: 3000, router: { stripTrailingSlash: true } },
    register: {
      plugins: [
        { plugin: 'inert' },
        { plugin: 'vision' },
        { plugin: bunyanLogger, options: { logger, opsInterval: 10000 } },
        { plugin: hapiWebpackPlugin, options: { webpackConfig, isDev } },
        { plugin: defaultRoutePlugin, options: { defaultRoute: '/page1' } },
        {
          plugin: 'xe-plugin-1',
          options: { layout: 'default' },
          routes: { prefix: '/page1' }
        },
        {
          plugin: 'xe-plugin-2',
          options: { layout: 'red' },
          routes: { prefix: '/page2' }
        }
      ]
    }
  }
}
