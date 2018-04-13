# Introduction
A minimal boilerplate for a full-stack application using
* hapi v17 + glue + handlebars
* webpack 4 + webpack-dev-server
* vue\.js

### TODO
<ul style="background: #dcd75b">
  <li>sourcemap </li>
</ul>

### Hightlights
* Require zero/minimal configuration for develop environment
* Use ESM Module and babel-register to use ESM module directly
* Use glue to make hapi server configuration simple and clear
* Use webpack dev/hot middleware with hapi to integrate client + server seamless development experience
* Pages are isolated as hapi plugin and configured via glue manifest
* Page views will be instrumented by html-webpack-plugin first and then used as handlebar templates. This solves the bundle injection gracefully.
* Minimal setup in both dev time and build time (see (./package.json)[./package.json])

### Notes:
* in development mode, js bundle is in memory. html files are always write to filesystem as handlebar views. in production mode, all asset including html files are output to static folder.
* Client script bundle are named as hash only to enable cross page caching. Possibly we should make each node\_module module as a bundle to get the best cache result. webpack 4 splitChunk is like black magic still, need to watch the bundle generation for more complex case. 
* Partials need to be put in a shareable place and configure before server start
* babel-register might have performance penalty at runtime. could be fixed by transpile later
* Nodemon NOT yet reloads the browser, not a priority for now.
* Need to define specification for page plugin.
    1. possibly we only need one bundle for one plugin scope with multiple views(pages)
    1. what if we do need pass the context when switching to other plugins. (POST from plugin1 and then redirect to other plugin's route)
    1. frontend component sharing. We might find some front end component is reusable across multiple page. In current project structure with plugin included, it is possible to reference by filepath, in a standalone plugin development workflow. It is discouraged. genrate standalone library i  better for this needs.

### Get Started
```
yarn
yarn dev
```

### Get for Prod
```
NODE_ENV=production yarn build
NODE_ENV=production node server.js
```


