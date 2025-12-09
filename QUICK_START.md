# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Create `.env.local` File

Create a file named `.env.local` in the root directory and add:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
MONGODB_URI=your-mongodb-uri
GEMINI_API_KEY=your-gemini-api-key
```

### 3. Get API Keys (All FREE!)

#### 🔑 NextAuth Secret
```bash
openssl rand -base64 32
```
Copy the output to `NEXTAUTH_SECRET`

#### 🔑 Google OAuth (for login)
1. Go to: https://console.cloud.google.com/
2. Create project → Enable Google+ API
3. Create OAuth 2.0 Client ID
4. Add redirect: `http://localhost:3000/api/auth/callback/google`
5. Copy Client ID and Secret

#### 🔑 MongoDB (Database)
1. Go to: https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Create database user
4. Whitelist IP: `0.0.0.0/0`
5. Get connection string → Replace `<password>`

#### 🔑 Google Gemini API (LLM - FREE!)
1. Go to: https://aistudio.google.com/app/apikey
2. Sign in with Google
3. Click "Create API Key"
4. Copy the key (starts with `AIza...`)

**That's it! No credit card needed for Gemini!**

### 4. Seed Database
```bash
npm run seed
```

### 5. Run App
```bash
npm run dev
```

Visit: http://localhost:3000

## 📝 Which LLM to Use?

### ✅ **Google Gemini (RECOMMENDED)**
- **Cost**: FREE (generous free tier)
- **Quality**: Excellent
- **Setup**: 2 minutes, no credit card
- **Get Key**: https://aistudio.google.com/app/apikey

### ⚠️ **OpenAI**
- **Cost**: $5 free credit, then pay-as-you-go
- **Quality**: Excellent
- **Setup**: Requires payment method
- **Get Key**: https://platform.openai.com/api-keys

**Recommendation**: Start with Gemini! It's completely free and works great.

## 🎯 What Goes Where?

All your API keys and secrets go in the **`.env.local`** file in the root directory.

**Never commit `.env.local` to Git!** (It's already in `.gitignore`)

## 📚 Need More Help?

- **Detailed Setup**: See `README.md`
- **Environment Variables**: See `ENV_SETUP.md`
- **Troubleshooting**: Check README.md troubleshooting section


