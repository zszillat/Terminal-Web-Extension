document.getElementById('connectButton').addEventListener('click', function() {
  // Optionally, you can have the popup initiate the WebSocket connection.
  chrome.runtime.getBackgroundPage(function(backgroundPage) {
    backgroundPage.startWebSocket();
  });
});