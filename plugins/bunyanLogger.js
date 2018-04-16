import assert from 'assert'
import Oppsy from 'oppsy'
import bunyan, { levelFromName } from 'bunyan'

const levelSortedHighToLow = Object.entries(levelFromName)
  .sort((a, b) => b[1] - a[1])
  .map((d) => d[0])

function flattenOpsData(obj, preKey = '', result = {}) {
  Object.entries(obj).forEach(([key, value]) => {
    const isComplexValue = typeof value === 'object' && Array.isArray(value) === false
    const flatedValues = isComplexValue
      ? flattenOpsData(value, key, result)
      : { [preKey ? `${preKey}.${key}` : key]: value.toString() }
    Object.assign(result, flatedValues)
  })
  return result
}

export default {
  name: 'bunyanLogger',
  register: (server, options) => {
    const { logger } = options

    assert(
      logger instanceof bunyan,
      '[bunyanLogger]: options.logger should be a valid bunyan logger instance'
    )

    server.expose('logger', logger)

    server.decorate('request', 'getLogger', () => logger)

    // handle ops events from oppsy
    server.events.on('start', () => {
      const oppsy = new Oppsy(server)
      oppsy.start(options.opsInterval || 15000)
      oppsy.on('ops', (data) => {
        const flatedOpsData = flattenOpsData(data)
        logger.info({ ops: true, ping: true, ...flatedOpsData }, '💗 ')
      })
    })

    server.events.on('stop', () => {
      logger.info('Server stopped')
    })

    // intercept built-in log method
    server.events.on('log', (event, tags) => {
      let level = 'info'
      for (let i = 0; i < levelSortedHighToLow.length; i += 1) {
        const l = levelSortedHighToLow[i]
        // log at highest level
        if (tags[l]) {
          level = l
          break
        }
      }

      // see https://hapijs.com/api#-log-event
      // error and data will not appear together
      const msg = event.error || event.data

      if (msg instanceof Error) {
        logger[level]({ err: msg, ...tags }) // when log error, error comes first
      } else {
        logger[level](tags, msg)
      }
    })

    server.events.on({ name: 'request', channels: ['error'] }, (request, event) => {
      logger.error(event.error, `Request ${event.request} failed`)
    })

    server.events.on('response', (request) => {
      const { method, path, payload, raw } = request
      const { statusCode } = raw.res
      const responseTime = request.info.responded - request.info.received

      logger.info(
        { response: true, healthy: /[23]0\d/.test(statusCode) },
        method,
        path,
        payload,
        statusCode,
        `${responseTime}ms`
      )
    })
  }
}
