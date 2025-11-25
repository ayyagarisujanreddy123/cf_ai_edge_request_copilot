// Generate or get session ID
let sessionId = localStorage.getItem('sessionId');
if (!sessionId) {
  sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  localStorage.setItem('sessionId', sessionId);
}

const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

// Handle Enter key
messageInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

async function sendMessage() {
  const message = messageInput.value.trim();
  if (!message) return;
  
  // Add user message to chat
  addMessage('user', message);
  messageInput.value = '';
  
  // Disable input during API call
  sendButton.disabled = true;
  messageInput.disabled = true;
  
  try {
    // Show typing indicator
    const typingId = addMessage('assistant', 'Analyzing...');
    
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, message })
    });
    
    const data = await response.json();
    
    // Remove typing indicator and add real response
    document.getElementById(typingId).remove();
    addMessage('assistant', data.reply || data.error || 'No response');
  } catch (error) {
    addMessage('assistant', 'Error: ' + error.message);
  } finally {
    sendButton.disabled = false;
    messageInput.disabled = false;
    messageInput.focus();
  }
}

function addMessage(role, content) {
  const messageId = 'msg_' + Date.now();
  const div = document.createElement('div');
  div.id = messageId;
  div.className = `message ${role}`;
  div.innerHTML = `
    <div class="message-role">${role === 'user' ? 'You' : 'AI Copilot'}</div>
    <div class="message-content">${escapeHtml(content).replace(/\n/g, '<br>')}</div>
  `;
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
  return messageId;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
