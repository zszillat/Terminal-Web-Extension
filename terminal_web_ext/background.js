// background.js

// The WebSocket URL you want to connect to
const socketURL = "ws://localhost:8081";

// Create the WebSocket connection
const socket = new WebSocket(socketURL);

// When the WebSocket opens, log it to the console
socket.addEventListener('open', () => {
  console.log(`Connected to WebSocket server at ${socketURL}`);
});

// When a message is received from the WebSocket server, log it to the console
socket.addEventListener('message', (event) => {
  console.log('Received message:', event.data);
});

// Handle any WebSocket errors
socket.addEventListener('error', (error) => {
  console.error('WebSocket error:', error);
});

// Close the WebSocket gracefully on extension shutdown
socket.addEventListener('close', () => {
  console.log('WebSocket connection closed');
});
