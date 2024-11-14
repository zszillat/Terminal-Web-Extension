// Example WebSocket connection in background.js

const socket = new WebSocket('ws://localhost:8081');

// Open connection
socket.onopen = () => {
};

// Handle incoming messages
socket.onmessage = (event) => {
  const message = event.data;

  if (message instanceof Blob) {
    // If the message is a Blob, read it as text
    const reader = new FileReader();

    reader.onloadend = () => {
      terminalLogic(reader.result); // The message is now a string
    };

    reader.readAsText(message); // Read the Blob as a text string
  } else {
    // If the message is a string, log it directly
    terminalLogic(message);
  }
};

// Handle errors
socket.onerror = (error) => {
  terminalLogic('WebSocket Error: ' + error);
};

// Handle connection close
socket.onclose = () => {
  terminalLogic('WebSocket connection closed');
};

function terminalLogic(term) {
  const termStr = String(term).trim();  // Ensure term is a string and remove extra whitespace

  switch (termStr) {
    case 'youtube':
      chrome.tabs.create({ url: "https://www.youtube.com" });
      break;
    default:
      console.log('Default case: ', termStr);
      break;
  }
}
