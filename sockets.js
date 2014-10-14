/*
* This file is for combining Express 4 with Socket.io
*/
var routes = require('./routes/index');

module.exports = function(io) {
    io.sockets.on('connection', routes.vote);
};