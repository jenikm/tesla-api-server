import * as WebSocket from 'ws';
const tesla = require('./tesla');

const wss = new WebSocket.Server({ port: 8080 })
 
wss.on('connection', ws => {
  tesla.teslaLogin(ws);
  ws.send('Hello');
});





