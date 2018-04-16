/* eslint import/no-extraneous-dependencies:0 */
process.env.BABEL_ENV = 'hapi'

require('@babel/register')()

require('./app.js')
