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

// Function that clicks the play button on YouTube
function clickPlayButton() {
  const playButton = document.querySelector('.ytp-play-button');
  if (playButton) {
      playButton.click();
  } else {
      console.error('Play button not found');
  }
}

function terminalLogic(term) {
  const termStr = String(term).trim();  // Ensure term is a string and remove extra whitespace


  switch (termStr.split(' ')[0].trim()) {
    case 'newtab':
      chrome.tabs.create({ url: termStr.split(' ')[1].trim() });
      break;
    case 'link':
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        // Get the active tab in the current window
        const currentTab = tabs[0];
        
        // Update the URL of the active tab
        chrome.tabs.update(currentTab.id, { url: termStr.split(' ')[1].trim() });
      });

      break;

    case 'toggle':
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const currentTab = tabs[0];
    
        // Execute a script to click the play button
        chrome.scripting.executeScript({
            target: { tabId: currentTab.id },
            func: clickPlayButton
        });
    });

      break;
    default:
      console.log('Default case: ', termStr.split(" ")[0]);
      break;
  }
}
