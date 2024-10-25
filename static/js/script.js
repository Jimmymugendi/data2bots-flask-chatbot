// Function to send message
function sendMessage() {
  const input = document.getElementById('chat-input');
  const chatLog = document.getElementById('chat-log');
  const message = input.value.trim();

  if (message === "") return;

  // Display user message
  chatLog.innerHTML += `<div class="user-message"><strong>You:</strong> ${message}</div>`;
  input.value = ''; // Clear the input field

  // Send message to backend
  fetch('/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
  })
  .then(response => response.json())
  .then(data => {
      // Display bot response
      chatLog.innerHTML += `<div class="bot-message"><strong>Bot:</strong> ${data.response}</div>`;
      chatLog.scrollTop = chatLog.scrollHeight; // Auto-scroll to the bottom
  });
}

// Trigger sendMessage on Enter key press
document.getElementById("chat-input").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
      sendMessage();
      event.preventDefault(); // Prevents the Enter key from submitting a form or reloading the page
  }
});
