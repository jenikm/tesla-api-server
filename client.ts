import * as WebSocket from 'ws';
const url = 'ws://localhost:8080';
const connection = new WebSocket(url);
 
connection.onopen = () => {}
 
connection.onerror = (error) => {
  console.log(`WebSocket error: ${error}`);
}
 
connection.onmessage = (e) => {
  console.log(e.data);
  if (e.data === 'Hello') {
    console.log('init');
    connection.send(JSON.stringify({'login': '', 'email': '', 'password': ''}));
  } else if (e.data === 'MFA') {
    console.log('mfa needed');
    connection.send(JSON.stringify({'mfa': '', 'passcode': '123456'}));
  } else {
    try {
      var msg = JSON.parse(e.data);
      if (typeof msg.access_token !== 'undefined' || typeof msg.refresh_token !== 'undefined') {
        console.log(msg);
      }
    } catch (e) {
      console.log(e);
    }
    connection.close();
  }
}