# Introduction
A minimal boilerplate for a full-stack application using
* hapi v17 + glue + handlebars
* webpack 4 + webpack dev/hot middleware
* vue\.js

### Hight alights
* Require zero/minimal configuration for develop environment
* Use ESM Module and babel-register to use ESM module directly
* Use glue to make hapi server configuration simple and clear
* Use webpack dev/hot middleware with hapi to integrate client + server seamless
  development experience
* Pages are isolated as hapi plugin and configured via glue manifest
* Page views will be instrumented by html-webpack-plugin first and then used
  as handlebar templates. This solves the bundle injection gracefully.
* Minimal setup in both dev time and build time (see (./package.json)[./package.json])

### Notes:
* partials need to be put in a shareable place and configure before server start
* babel-register might have performance penalty at runtime.
* nodemon NOT yet reloads the browser(WIP)

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


