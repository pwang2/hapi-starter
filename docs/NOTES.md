1. use webpack dev/hot middleware to run dev.
2. in prod mode, all static resource need to be prebundled. This could be
   achieve through a cli-cmd publish
3. the plugin need to do following things
    * provide individual route with sub routes
    * static resource 



handlerbar helper, layout, partial shared stay in project roots folder.
partials is not overridable

// TOOD: nodemon browser reload

// TODO: npm run build should generate all plugin assets to /dist/pluginname dir

// TODO: would be better injected script via webpack to handle multi chunk
// in dev, index is served via dev-mdw, possible but too complicated
// in prod, we want this file to be overrided, which sound dirty
