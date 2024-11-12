// Example WebSocket connection in background.js

const socket = new WebSocket('ws://localhost:8081');

// Open connection
socket.onopen = () => {
  console.log('Connected to WebSocket server!');
};

// Handle incoming messages
socket.onmessage = (event) => {
  const message = event.data;

  if (message instanceof Blob) {
    // If the message is a Blob, read it as text
    const reader = new FileReader();

    reader.onloadend = () => {
      console.log('Received message: ', reader.result); // The message is now a string
    };

    reader.readAsText(message); // Read the Blob as a text string
  } else {
    // If the message is a string, log it directly
    console.log('Received message: ', message);
  }
};

// Handle errors
socket.onerror = (error) => {
  console.error('WebSocket Error:', error);
};

// Handle connection close
socket.onclose = () => {
  console.log('WebSocket connection closed');
};
