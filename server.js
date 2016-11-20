'use strict';

const server = require('live-server');

server.start({
  open: false,
  root: '.',
  port: process.env.PORT || 8080
});
