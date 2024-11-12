// server.js
const WebSocket = require('ws');

// Create a WebSocket server on port 8081
const wss = new WebSocket.Server({ port: 8081 });

// Keep track of connected WebSocket clients
let clients = [];

// When a client connects to the WebSocket server
wss.on('connection', (ws) => {
  console.log('Client connected');
  
  // Add the client to the list of clients
  clients.push(ws);

  // Send a welcome message to the client
  ws.send('Hello from WebSocket server!');

  // Listen for messages from the client
  ws.on('message', (message) => {
    console.log(`Received message from client: ${message}`);

    // Forward the message to all other connected clients
    clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // Handle client disconnection
  ws.on('close', () => {
    // Remove the client from the list
    clients = clients.filter(client => client !== ws);
    console.log('Client disconnected');
  });

  // Handle errors
  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

console.log('WebSocket server running on ws://localhost:8081');
