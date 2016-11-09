'use strict';

const server = require('live-server');

server.start({
  root: '.',
  port: process.env.PORT || 8080
});
