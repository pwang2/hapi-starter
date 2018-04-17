# Introduction

A minimal boilerplate for a full-stack application using

* hapi v17 + glue + handlebars
* webpack 4 + webpack-dev-server
* vue\.js

### Get treated

```
yarn && yarn dev
```

### Get it run locally

```
yarn build && yarn serve
```

### Get it run with real super power

```
yarn && yarn build
docker-compose up                    # server runs at http://localhost:8888
```

### TODO

<ul style="background: #dcd75b">
  <li>log strategy</li>
  <li>plugin interface definition</li>
  <li>app shared assets</li>
  <li>Service Proxy</li>
  <li>Configurable Auth plugin</li>
  <li>Configurable Cache plugin</li>
  <li>env/rc support</li>
  <li>Jenkinsfile</li>
  <li>Joi option validation</li>
  <li>Test(component, unit, it)</li>
  <li>Pact</li>
  <li>set proper cache header for resource</li>
  <li>Looking forward to webpack 5 html entry</li>
</ul>

### Hightlights

* Require zero/minimal configuration for develop environment.
* Use ESM Module and babel-register to use ESM module directly
* Use glue to make hapi server configuration simple and clear
* Use webpack-dev-server with hapi to integrate client + server seamless development experience
* Pages are isolated as hapi plugin and configured via glue manifest
* Page views will be instrumented by html-webpack-plugin first and then used as handlebar templates. This solves the bundle injection gracefully.
* Minimal setup in both dev time and build time (see (./package.json)[./package.json])
* Static assets referenced in page plugin should be put in pluginName/assets data
*

### Notes:

* always proxy nodejs server to static server(webpack-dev-server, http-server, nginx)
* in development mode, js bundle is in memory. html files are always write to filesystem as handlebar views. in production mode, all asset including html files are output to static folder.
* Client script bundle are named as hash only to enable cross page caching. Possibly we should make each node_module module as a bundle to get the best cache result. webpack 4 splitChunk is like black magic still, need to watch the bundle generation for more complex case.
* Partials need to be put in a shareable place and configure before server start
* babel-register might have performance penalty at runtime. could be fixed by transpile later
* Nodemon NOT yet reloads the browser, not a priority for now.
* Need to define specification for page plugin.
  1.  possibly we only need one bundle for one plugin scope with multiple views(pages)
  1.  what if we do need pass the context when switching to other plugins. (POST from plugin1 and then redirect to other plugin's route)
  1.  frontend component sharing. We might find some front end component is reusable across multiple page. In current project structure with plugin included, it is possible to reference by filepath, in a standalone plugin development workflow. It is discouraged. genrate standalone library i better for this needs.

### run-s run-p

For script start watch/server which occupies stdout, to handle the exit code correctly, we use run-p to ensure all script are started, then between each child task, we use wait-on to setup the precedence. e.g.:
We are proxy back hapi server to webpack-dev-server, so before webpack-dev-server start, we need to ensure the hapi server is ready through(wait-port), then before we open the webpack-dev-server in browser, we will use handlebar views from webpack compilation, then we use another wait-wds-ready to ensure the view files are emited in webpack. This is done through `run-p dev:\*` and in each sub script, we have wait-on in between. see package.json for detail.
