import http = require('http');

import App from './app';

const port = process.env.PORT || 3000;
App.set('port', port);

const server = http.createServer(App);
server.listen(port);