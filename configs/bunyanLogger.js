import bunyan from 'bunyan'
import BunyanPrettystream from 'bunyan-prettystream'

const unifiedLogStream = new BunyanPrettystream()
unifiedLogStream.pipe(process.stdout)

export default {
  name: 'app',
  streams: [
    { level: 'trace', stream: unifiedLogStream },
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
