/* eslint no-console: 0 */
import glue from 'glue'
import handlebars from 'handlebars'
import handlebarsHelper from 'handlebars-helpers'
import appConfig from './app.config'

const env = process.env.NODE_ENV || 'development'

async function main() {
  const { manifest, options } = appConfig
  const server = await glue.compose(manifest, options)
  handlebarsHelper(handlebars)
  server.views({
    engines: { html: handlebars },
    layoutPath: 'handlebars/layout',
    partialsPath: 'handlebars/partials',
    helpersPath: 'handlebars/helpers',
    allowAbsolutePaths: true
  })

  // default route
  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => h.redirect('/page1')
  })
  await server.start()
  console.log(`[${env}] server running at: ${server.info.uri}`)
}

main()

process.on('unhandledRejection', (err) => {
  console.error('error', err)
  process.exit(1)
})
