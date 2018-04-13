import bunyan from 'bunyan'
import BunyanPrettystream from 'bunyan-prettystream'
import pkg from '../package.json'

const unifiedLogStream = new BunyanPrettystream()
unifiedLogStream.pipe(process.stdout)

export default {
  name: pkg.name,
  streams: [
    { level: 'info', stream: unifiedLogStream },
    {
      level: 'error',
      type: 'rotating-file',
      path: 'logs/error.log',
      period: '1d',
      count: 5
    }
  ],
  serializers: bunyan.stdSerializers
}
