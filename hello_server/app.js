var msg = 'Hello World';
console.log(msg);
const express = require('express');
var app = express();
var server = app.listen(3000);
app.use(express.static("public"));

var socket = require('socket.io');
var io = socket(server);
io.sockets.on('connection', newConnection);

function newConnection(socket){
    console.log("new connection: "+ socket.id)
}

//const OSC = require('osc-js')

//const config = { udpClient: { port: 9129 } }
//const osc = new OSC({ plugin: new OSC.BridgePlugin(config) })

//osc.open() // start a WebSocket server on port 8080