export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Handle API endpoint for chat
    if (url.pathname === '/api/chat' && request.method === 'POST') {
      return handleChat(request, env);
    }

    // Serve static assets from public folder
    return env.ASSETS.fetch(request);
  },
};

async function handleChat(request, env) {
  try {
    const { sessionId, message } = await request.json();

    // Load chat history from KV (if available)
    const historyKey = `chat:${sessionId}`;
    let history = [];
    
    if (env.CHAT_HISTORY) {
      const historyJson = await env.CHAT_HISTORY.get(historyKey);
      history = historyJson ? JSON.parse(historyJson) : [];
    }

    // Build prompt with system message and history
    const systemPrompt = `You are an expert Cloudflare assistant that analyzes HTTP requests and suggests Cloudflare configurations. 
When a user provides request logs, curl commands, or performance issues, you suggest:
- Cache rules and TTL settings
- Page Rules or Redirect Rules
- Workers implementation ideas
- Security configurations (rate limiting, WAF rules)
- Performance optimizations

Be concise and practical.`;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...history,
      { role: 'user', content: message }
    ];

    // Call Workers AI with Llama 3.3
    const aiResponse = await env.AI.run('@cf/meta/llama-3.3-70b-instruct-fp8-fast', {
      messages: messages.slice(-10), // Keep last 10 messages for context
      max_tokens: 512,
      temperature: 0.7
    });

    const reply = aiResponse.response;

    // Update history
    history.push({ role: 'user', content: message });
    history.push({ role: 'assistant', content: reply });

    // Store updated history (keep last 20 messages) - only if KV is available
    if (env.CHAT_HISTORY) {
      await env.CHAT_HISTORY.put(
        historyKey,
        JSON.stringify(history.slice(-20)),
        { expirationTtl: 3600 } // Expire after 1 hour
      );
    }

    return new Response(JSON.stringify({ reply }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
