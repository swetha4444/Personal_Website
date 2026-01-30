# Free API Keys for Chatbot Setup

The chatbot currently works with keyword-based responses by default, but you can enhance it with free AI APIs. Here are the best free options:

## 🆓 Free API Options

### 1. **Google Gemini API** (Recommended - Easiest)
- **Free Tier**: 60 requests per minute
- **Get API Key**: https://makersuite.google.com/app/apikey
- **Setup**:
  1. Visit the link above and sign in with Google
  2. Click "Create API Key"
  3. Copy the API key
  4. Add to your `.env` file:
     ```
     REACT_APP_GEMINI_API_KEY=your_api_key_here
     ```

### 2. **OpenAI API** (Free Credits for New Users)
- **Free Tier**: $5 free credits for new users
- **Get API Key**: https://platform.openai.com/api-keys
- **Setup**:
  1. Sign up at OpenAI
  2. Go to API Keys section
  3. Create a new API key
  4. Add to your `.env` file:
     ```
     REACT_APP_OPENAI_API_KEY=your_api_key_here
     ```

### 3. **Hugging Face Inference API** (Completely Free)
- **Free Tier**: Unlimited requests (with rate limits)
- **No API Key Required**: Works out of the box!
- **Note**: Currently using a basic model, but it's completely free

### 4. **Other Free Options** (Can be added)

#### **Groq API** (Very Fast, Free Tier)
- Get key: https://console.groq.com/
- Add: `REACT_APP_GROQ_API_KEY=your_key`

#### **Together AI** (Free Tier)
- Get key: https://api.together.xyz/
- Add: `REACT_APP_TOGETHER_API_KEY=your_key`

#### **Cohere** (Free Tier)
- Get key: https://dashboard.cohere.com/
- Add: `REACT_APP_COHERE_API_KEY=your_key`

## 📝 Setup Instructions

1. **Create a `.env` file** in the root directory (if it doesn't exist)
2. **Add your API key**:
   ```
   REACT_APP_GEMINI_API_KEY=your_google_gemini_api_key_here
   ```
3. **Restart your development server**:
   ```bash
   npm start
   ```

## 🔒 Security Note

- **Never commit your `.env` file** to Git (it's already in `.gitignore`)
- API keys are only used client-side for this chatbot
- For production, consider using a backend proxy to hide API keys

## ✅ Current Status

The chatbot works without any API keys using intelligent keyword matching. Adding an API key will provide more natural, conversational responses.


