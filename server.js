"use strict";
exports.__esModule = true;
var WebSocket = require("ws");
var tesla = require('./tesla');
var wss = new WebSocket.Server({ port: 8080 });
wss.on('connection', function (ws) {
    tesla.teslaLogin(ws);
    ws.send('Hello');
});
