/* eslint import/no-extraneous-dependencies:0 */
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const cheerio = require('cheerio')

const md5 = (data) =>
  crypto
    .createHash('md5')
    .update(data)
    .digest('hex')

module.exports = class PrecompileHandlebarsWebpackPlugin {
  constructor(options) {
    this.options = options || {}
  }

  apply(compiler) {
    compiler.hooks.compilation.tap('HandlebarsResourceReplacement', (compilation) => {
      compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync(
        'HandlebarsResourceReplacement',
        (data, cb) => {
          const htmlPath = data.plugin.options.template.split('!')[1]
          const source = data.html
          const $ = cheerio.load(source)
          $('[src]').each((index, el) => {
            const absPath = path.resolve(path.dirname(htmlPath), el.attribs.src)
            if (fs.existsSync(absPath)) {
              const chunkhash = md5(fs.readFileSync(absPath))
              const ext = path.extname(absPath).substr(1)
              const name = path.basename(absPath, `.${ext}`)
              const segments = { chunkhash, ext, name }
              let { publicPath } = compilation.options.output
              let filename =
                this.options.filename ||
                `${path.basename(compilation.options.output.filename, '.js')}.${ext}`
              Object.entries(segments).forEach(([k, v]) => {
                filename = filename.replace(`[${k}]`, v)
              })
              if (!publicPath.endsWith('/')) {
                publicPath += '/'
              }
              $(el).attr('src', publicPath + filename)

              // restore handlebar partial syntax
              const html = $('body')
                .html()
                .replace(/\{\{\s*&gt;/, '{{>')
              data.html =html// eslint-disable-line
            }
          })
          cb()
        }
      )
    })
  }
}
