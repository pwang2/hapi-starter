export default {
  reporters: {
    myConsoleReporter: [
      {
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{ log: '*', response: '*' }]
      },
      {
        module: 'good-console',
        args: [{ format: 'YYYY-MM-DD/HH:mm:ss.SSS' }]
      },
      'stdout'
    ]
  }
}
