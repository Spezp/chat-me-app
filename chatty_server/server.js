
const express = require('express');
const SocketServer = require('ws').Server;

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));

// Create the WebSockets server
const wss = new SocketServer({ server });
let numberOfClients = 0;

function updateClientCount(connecting) {
  if (connecting){
    numberOfClients++;
  } else if (!connecting){
    numberOfClients--;
  }
  console.log(numberOfClients);
  
  let messageObj = {type: 'client', content: numberOfClients};
  wss.clients.forEach(function each(client) {
    client.send(JSON.stringify(messageObj));
  })
}

wss.on('connection', (ws) => {
  console.log('Client Connected');
  updateClientCount(true);
  ws.on('message', (data) => {
    wss.clients.forEach(function each(client) {
      client.send(data);
    });
  });
  ws.on('error', () => {});
  ws.on('close', () => {
    updateClientCount(false);
    console.log('client disconnected');
  });
});
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.