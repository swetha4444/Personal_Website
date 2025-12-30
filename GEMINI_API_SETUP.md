# Gemini API Setup Guide

## Issue: 404 Error - Models Not Found

If you're getting "models/gemini-pro is not found" errors, you need to enable the Generative AI API in Google Cloud Console.

## Steps to Fix:

### 1. Enable Generative AI API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project (or create a new one)
3. Go to **APIs & Services** > **Library**
4. Search for "**Generative Language API**" or "**Vertex AI API**"
5. Click on it and click **Enable**

### 2. Verify API Key Permissions

1. Go to **APIs & Services** > **Credentials**
2. Find your API key
3. Make sure it has access to the Generative Language API
4. If needed, restrict the key to only the Generative Language API for security

### 3. Alternative: Use AI Studio (Easier)

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key there (this automatically enables the API)
3. Use that key instead

### 4. Test Your API Key

After enabling, test with:
```bash
curl "https://generativelanguage.googleapis.com/v1beta/models?key=YOUR_API_KEY"
```

You should see a list of available models.

## Current Status

The chatbot will work with keyword-based responses until the API is properly configured. The keyword matching is quite intelligent and should handle most questions about your portfolio!

