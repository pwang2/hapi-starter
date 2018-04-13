import path from 'path'

export default function resolve(config) {
  config.manifest.register.plugins
    .filter((p) => typeof p.plugin === 'string' && /^xe-plugin/.test(p.plugin))
    .forEach((p) => {
      const moduleName = p.plugin
      try {
        // eslint-disable-next-line
        p.plugin = require(moduleName)
      } catch (err) {
        try {
          const testPath = path.resolve('./pages', moduleName, 'src')
          // eslint-disable-next-line
          p.plugin = require(testPath).default // NOTE: in project page plugin is esModule
        } catch (err2) {
          throw new Error(
            `plugin ${moduleName} not found, path searched: node_modules, pages`
          )
        }
      }
    })

  return config
}
