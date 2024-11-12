// sendMessage.js

const WebSocket = require('ws');

// Connect to the WebSocket server
const socket = new WebSocket('ws://localhost:8081');

// Wait until the connection is established
socket.on('open', () => {
  console.log('Connected to the WebSocket server!');
  
  // Send a message to the server
  const message = 'Hello from the external script!';
  console.log(`Sending message: ${message}`);
  socket.send(message);
  
  // Close the connection
  socket.close();
});

// Handle error
socket.on('error', (err) => {
  console.error('Error connecting to WebSocket server:', err);
});
