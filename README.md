# 🔧 Cloudflare AI Request Copilot

An AI-powered Cloudflare configuration assistant that analyzes HTTP requests and provides intelligent recommendations for optimizing your Cloudflare setup.

**Live Demo:** https://aipoweredapplication.sujanreddy298.workers.dev/

## 📋 Overview

This application is a smart assistant built on Cloudflare Workers that helps developers and DevOps engineers optimize their Cloudflare configurations. It uses **Llama 3.3 (70B)** via Cloudflare Workers AI to analyze HTTP logs, curl commands, and performance issues, then suggests specific Cloudflare configurations to solve those problems.

## ✨ Features

- **🤖 AI-Powered Analysis**: Uses Meta's Llama 3.3 70B model for intelligent configuration recommendations
- **⚡ Edge Computing**: Runs entirely on Cloudflare's global edge network for ultra-low latency
- **💬 Interactive Chat Interface**: Clean, responsive UI for easy interaction
- **📝 Context-Aware**: Maintains conversation history for follow-up questions
- **🎨 Modern Design**: Beautiful gradient UI with smooth animations
- **🚀 Instant Responses**: Fast AI inference powered by Workers AI

## 🏗️ Architecture

The application consists of three main components:

### 1. **LLM Integration**
- **Model**: `@cf/meta/llama-3.3-70b-instruct-fp8-fast`
- **Platform**: Cloudflare Workers AI
- **Purpose**: Analyzes user queries and generates configuration recommendations

### 2. **Workflow Coordination**
- **Backend**: Cloudflare Workers (src/worker.js)
- **API Endpoint**: `/api/chat` (POST)
- **Function**: Handles chat requests, manages AI interactions, and maintains session state

### 3. **User Input**
- **Frontend**: HTML/CSS/JavaScript (public/ folder)
- **Interface**: Chat-based interaction
- **Features**: Message history, typing indicators, responsive design

### 4. **Memory/State Management**
- **Storage**: Cloudflare KV (optional - gracefully degrades without it)
- **Purpose**: Persists chat history across sessions
- **TTL**: 1 hour expiration

## 📁 Repository Structure

```
cf_ai_edge_request_copilot/
├── src/
│   └── worker.js           # Cloudflare Worker backend
├── public/
│   ├── index.html          # Main UI
│   ├── app.js              # Frontend JavaScript
│   └── styles.css          # Styling and animations
├── wrangler.toml           # Cloudflare Workers configuration
├── PROMPTS.md              # System prompts and AI instructions
└── README.md               # This file
```

## 🚀 Deployment

The application is automatically deployed to Cloudflare Workers via GitHub integration.

### Prerequisites
- Cloudflare account
- Workers AI enabled
- GitHub repository connected to Cloudflare

### Deployment Steps

1. **Fork/Clone this repository**
   ```bash
   git clone https://github.com/ayyagarisujanreddy123/cf_ai_edge_request_copilot.git
   ```

2. **Connect to Cloudflare**
   - Go to Cloudflare Dashboard → Workers & Pages
   - Connect your GitHub repository
   - Enable automatic deployments

3. **Configure Bindings**
   - Workers AI binding is automatically configured as `AI`
   - KV namespace is optional (app works without it)

4. **Deploy**
   - Push to main branch
   - Cloudflare automatically builds and deploys
   - Your app will be live at `your-worker.your-subdomain.workers.dev`

## 💻 Local Development

```bash
# Install dependencies
npm install

# Run locally with Wrangler
npx wrangler dev

# Deploy to Cloudflare
npx wrangler deploy
```

## 🎯 Use Cases

The AI Copilot can help with:

- **Rate Limiting**: Configure rate limits for specific endpoints
- **Caching**: Set up cache rules and TTLs for static assets
- **Performance**: Optimize page rules and edge caching
- **Security**: Configure WAF rules, API Shield, and DDoS protection
- **Redirects**: Set up redirect and page rules
- **Workers**: Get suggestions for Workers implementation patterns

## 📝 Example Interactions

**User**: My API at /api/users is getting rate limited. What should I do?

**AI Copilot**: Provides specific rate limiting rules, API Shield configurations, and zone-level rate limiting suggestions with exact configuration examples.

**User**: How do I cache static assets?

**AI Copilot**: Recommends Cache Everything rules, Edge Cache settings, browser cache configurations, and provides example cache rules with TTL settings.

## 🛠️ Technical Details

### Backend (worker.js)
- Handles HTTP requests and routes
- Integrates with Workers AI for LLM inference
- Manages chat history (with optional KV storage)
- Implements error handling and graceful degradation

### Frontend
- **HTML**: Semantic structure with accessibility features
- **CSS**: Modern gradient design, smooth animations, responsive layout
- **JavaScript**: Fetch API for backend communication, DOM manipulation for chat UI

### AI Configuration
- **Temperature**: 0.7 (balanced creativity and consistency)
- **Max Tokens**: 512 (concise but complete responses)
- **Context Window**: Last 10 messages (efficient memory usage)

## 🔧 Configuration Options

### wrangler.toml
```toml
name = "aipoweredapplication"
main = "src/worker.js"
compatibility_date = "2024-11-14"
assets = { directory = "public" }

[[ai]]
binding = "AI"

# KV namespace (optional)
# [[kv_namespaces]]
# binding = "CHAT_HISTORY"
# id = "your_kv_namespace_id"
```

## 📊 Performance

- **Response Time**: Sub-second AI responses
- **Global Availability**: Deployed to 300+ Cloudflare edge locations
- **Scalability**: Handles concurrent requests via Workers platform
- **Cost**: Pay-as-you-go Workers AI pricing

## 🔒 Security

- No authentication required (public demo)
- No sensitive data stored
- Session IDs are randomly generated
- Chat history expires after 1 hour

## 📚 Documentation

For detailed information about the AI prompts and system messages, see [PROMPTS.md](./PROMPTS.md).

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

## 📄 License

MIT License - feel free to use this project for your own applications.

## 👨‍💻 Author

**Sujan Ayyagari**
- GitHub: [@ayyagarisujanreddy123](https://github.com/ayyagarisujanreddy123)

## 🙏 Acknowledgments

- Cloudflare Workers AI for the inference platform
- Meta for the Llama 3.3 model
- Cloudflare Workers team for the amazing edge computing platform

---

**Built with ❤️ on Cloudflare Workers**
