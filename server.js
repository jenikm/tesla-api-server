"use strict";
exports.__esModule = true;
var WebSocket = require("ws");
var https = require("https");
var fs = require("fs");
var tesla = require('./tesla');
var server = https.createServer({
    cert: fs.readFileSync('/etc/letsencrypt/live/smuts.noip.me/fullchain.pem'),
    key: fs.readFileSync('/etc/letsencrypt/live/smuts.noip.me/privkey.pem')
});
var wss = new WebSocket.Server({ server: server });
wss.on('connection', function (ws) {
    tesla.teslaLogin(ws);
    ws.send('Hello');
});
server.listen(443);
