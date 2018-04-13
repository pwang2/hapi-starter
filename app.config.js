import bunyan from 'bunyan'

import { curEnv } from './env'
import webpackConfig from './webpack.config'
import bunyanLoggerConfig from './configs/bunyanLogger'
import bunyanLogger from './plugins/bunyanLogger'
import defaultRoutePlugin from './plugins/defaultRoute'
import hapiWebpackDevServerPlugin from './plugins/hapiWebpackDevServer'

const devServer = webpackConfig[0].devServer || {
  port: 3001,
  publicPath: '/static/'
}

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
        { plugin: 'h2o2' },
        { plugin: 'inert' },
        { plugin: 'vision' },
        { plugin: bunyanLogger, options: { logger, opsInterval: 15000 } },
        {
          plugin: hapiWebpackDevServerPlugin,
          options: {
            enviroment: curEnv,
            port: devServer.port,
            publicPath: devServer.publicPath
          }
        },
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
