// server.js
const WebSocket = require('ws');

// Create a WebSocket server on port 8081
const wss = new WebSocket.Server({ port: 8081 });

// When a client connects to the WebSocket server
wss.on('connection', (ws) => {
  console.log('Client connected');
  
  // Send a welcome message to the client
  ws.send('Hello from WebSocket server!');

  // Listen for messages from the client
  ws.on('message', (message) => {
    console.log(`Received message from client: ${message}`);
  });

  // Send a message to the client every 5 seconds
  const interval = setInterval(() => {
    const message = `Server time: ${new Date().toISOString()}`;
    console.log('Sending message to client:', message);
    ws.send(message);
  }, 5000);

  // Handle client disconnection
  ws.on('close', () => {
    clearInterval(interval);
    console.log('Client disconnected');
  });

  // Handle errors
  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

console.log('WebSocket server running on ws://localhost:8081');
