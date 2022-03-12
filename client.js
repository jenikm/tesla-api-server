"use strict";
exports.__esModule = true;
var WebSocket = require("ws");
var url = 'ws://localhost:8080';
var connection = new WebSocket(url);
connection.onopen = function () { };
connection.onerror = function (error) {
    console.log("WebSocket error: ".concat(error));
};
connection.onmessage = function (e) {
    console.log(e.data);
    if (e.data === 'Hello') {
        console.log('init');
        connection.send(JSON.stringify({ 'login': '', 'email': '', 'password': '' }));
    }
    else if (e.data === 'MFA') {
        console.log('mfa needed');
        connection.send(JSON.stringify({ 'mfa': '', 'passcode': '123456' }));
    }
    else {
        try {
            var msg = JSON.parse(e.data);
            if (typeof msg.access_token !== 'undefined' || typeof msg.refresh_token !== 'undefined') {
                console.log(msg);
            }
        }
        catch (e) {
            console.log(e);
        }
        connection.close();
    }
};
