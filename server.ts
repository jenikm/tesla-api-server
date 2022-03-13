import * as WebSocket from 'ws';
import * as https from 'https';
import * as fs from 'fs';
const tesla = require('./tesla');

const server = https.createServer({
  cert: fs.readFileSync('/etc/letsencrypt/live/smuts.noip.me/fullchain.pem'),
  key: fs.readFileSync('/etc/letsencrypt/live/smuts.noip.me/privkey.pem')
});

const wss = new WebSocket.Server({ server })
 
wss.on('connection', ws => {
  tesla.teslaLogin(ws);
  ws.send('Hello');
});

server.listen(443);
