/* eslint no-console: 0 */
import glue from 'glue'
import handlebars from 'handlebars'
import handlebarsHelper from 'handlebars-helpers'

import appConfigRaw, { logger } from './app.config'
import resolve from './app.config.resolver'

handlebarsHelper(handlebars)

// last resort of the node process
// should use process manager/consul to re-spawn dead process
process.on('unhandledRejection', (err) => {
  logger.error({ err, unhandled: true })
})

process.on('uncaughtException', (err) => {
  logger.error({ err, unhandled: true })
})

async function main() {
  const { manifest, options, enviroment } = resolve(appConfigRaw)
  const server = await glue.compose(manifest, options)
  server.views({
    engines: { html: handlebars },
    layoutPath: 'handlebars/layout',
    partialsPath: 'handlebars/partials',
    helpersPath: 'handlebars/helpers',
    allowAbsolutePaths: true
  })

  await server.start()
  logger.info(`[${enviroment}] server running at: ${server.info.uri}`)
}

main()
