/*
 * This module is used in webpack.config.js
 * need to be written in CommonJS module
 */
const defaults = 'development'
const curEnv = process.env.NODE_ENV || defaults

module.exports = {
  curEnv,
  isDev: curEnv === 'development'
}
