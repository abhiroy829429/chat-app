# Environment Variables Setup Guide

This file contains a template for your `.env.local` file. Copy this content and create a `.env.local` file in the root directory.

## Quick Start

1. Copy the template below
2. Create `.env.local` file in the root directory
3. Fill in all the values following the instructions
4. Never commit `.env.local` to Git (it's already in `.gitignore`)

## Template

```env
# ============================================
# NextAuth Configuration
# ============================================
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-using-openssl-rand-base64-32

# ============================================
# Google OAuth (for User Authentication)
# ============================================
# Get from: https://console.cloud.google.com/
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret

# ============================================
# MongoDB Database
# ============================================
# Get from: https://www.mongodb.com/cloud/atlas
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/diet_faq?retryWrites=true&w=majority

# ============================================
# LLM API Key (Choose ONE - Gemini is FREE!)
# ============================================
# RECOMMENDED: Google Gemini (FREE, no credit card needed)
# Get from: https://aistudio.google.com/app/apikey
GEMINI_API_KEY=your-gemini-api-key-here

# OR use OpenAI (requires payment method, $5 free credit)
# Get from: https://platform.openai.com/api-keys
# OPENAI_API_KEY=your-openai-api-key-here

# ============================================
# API Base URL (Optional)
# ============================================
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Detailed Instructions

### 1. NEXTAUTH_SECRET
Generate a random 32-character string:
```bash
openssl rand -base64 32
```

### 2. Google OAuth Credentials
- Visit: https://console.cloud.google.com/
- Create project → Enable Google+ API
- Create OAuth 2.0 Client ID
- Add redirect URI: `http://localhost:3000/api/auth/callback/google`

### 3. MongoDB URI
- Visit: https://www.mongodb.com/cloud/atlas
- Create free cluster
- Create database user
- Whitelist IP (0.0.0.0/0 for development)
- Get connection string and replace `<password>`

### 4. LLM API Key

**Option A: Google Gemini (FREE - Recommended)**
- Visit: https://aistudio.google.com/app/apikey
- Sign in with Google
- Click "Create API Key"
- Copy and paste as `GEMINI_API_KEY`

**Option B: OpenAI**
- Visit: https://platform.openai.com/api-keys
- Sign up and add payment method
- Create API key
- Copy and paste as `OPENAI_API_KEY`

**Note**: The app automatically uses Gemini if `GEMINI_API_KEY` is set, otherwise uses OpenAI.

## Verification

After setting up, verify your `.env.local` file:
- ✅ All required variables are set
- ✅ No placeholder values remain
- ✅ MongoDB URI has actual password (not `<password>`)
- ✅ At least one LLM API key is set (Gemini or OpenAI)

## Production Deployment

When deploying to Vercel:
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add all variables from `.env.local`
4. Update `NEXTAUTH_URL` to your Vercel URL
5. Update Google OAuth redirect URI to your Vercel URL


