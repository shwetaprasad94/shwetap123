const dust = require('dustjs-linkedin');
const Hapi = require('hapi');
const inert = require('inert');
const vision = require('vision');

const libApi = require('./src/api');
const libSlides = require('./src/slides');
const utils = require('./src/js/utils');

const server = new Hapi.Server();
server.connection({ port: 8080 });
dust.config.whitespace = true;
const plugins = [
  inert,
  vision,
  { register: libApi, routes: { prefix: '/api' } },
  { register: libSlides, routes: { prefix: '/slides' } }
];

function registerCallback() {
  server.views({
    engines: {
      dust: {
        compileMode: 'async',
        module: {
          compile: (template, compileOptions, callback) => {
            const compiled = dust.compileFn(template, compileOptions && compileOptions.name);

            callback(null, (context, options, cb) => {
              compiled(context, cb);
            });
          },
          registerPartial: (name, data) => {
            dust.compileFn(data, name);
          },
          registerHelper: (name, helper) => {
            if (helper.length > 1) {
              dust.helpers[name] = helper;
            } else {
              dust.filters[name] = helper;
            }
          }
        }
      }
    },
    relativeTo: __dirname,
    path: 'src/views',
    partialsPath: 'src/views',
    layoutPath: 'src/views'
  });
}

server.register(plugins, registerCallback);

// Register route for static assets
server.route({
  method: 'GET',
  path: '/{path*}',
  config: {
    description: 'Serve static content',
    tags: ['starter']
  },
  handler: {
    directory: {
      path: 'public',
      listing: true,
      index: false
    }
  }
});

server.route({
  method: 'GET',
  path: '/',
  handler: (request, reply) => reply.view('home'),
  config: { tags: ['starter'] }
});

server.start(() => {
  utils.print('Server running at:', server.info.uri);
});
