import path from 'path'
import bunyan from 'bunyan'

import { curEnv } from './env'
import bunyanLoggerConfig from './configs/bunyanLogger'
import bunyanLogger from './plugins/bunyanLogger'
import defaultRoutePlugin from './plugins/defaultRoute'

const logger = bunyan.createLogger(bunyanLoggerConfig)

// export logger explicitly to use logger out of hapi
export { logger }

const config = {
  enviroment: curEnv,
  options: {},
  manifest: {
    server: {
      port: process.env.PORT || 3000,
      router: { stripTrailingSlash: true }
    },
    register: {
      plugins: [
        { plugin: 'h2o2' },
        { plugin: 'vision' },
        { plugin: bunyanLogger, options: { logger, opsInterval: 15000 } },
        { plugin: defaultRoutePlugin, options: { defaultRoute: '/page1' } },
        {
          plugin: path.resolve('./pages/xe-plugin-1/src'),
          options: { layout: 'default' },
          routes: { prefix: '/page1' }
        },
        {
          plugin: path.resolve('./pages/xe-plugin-2/src'),
          options: { layout: 'red' },
          routes: { prefix: '/page2' }
        }
      ]
    }
  }
}

export default config
