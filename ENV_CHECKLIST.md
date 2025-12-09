# ✅ .env.local File Created!

The `.env.local` file has been created in the root directory.

## Current Status

✅ **NEXTAUTH_SECRET** - Already generated and set!

## What You Need to Fill In

### 1. Google OAuth Credentials (for user login)
- **GOOGLE_CLIENT_ID**: Get from https://console.cloud.google.com/
- **GOOGLE_CLIENT_SECRET**: Get from https://console.cloud.google.com/

**Steps:**
1. Go to Google Cloud Console
2. Create/select project
3. Enable Google+ API
4. Create OAuth 2.0 Client ID
5. Add redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Secret

### 2. MongoDB Connection String
- **MONGODB_URI**: Get from https://www.mongodb.com/cloud/atlas

**Steps:**
1. Create free MongoDB Atlas account
2. Create free cluster
3. Create database user
4. Whitelist IP: `0.0.0.0/0` (for development)
5. Get connection string
6. Replace `<password>` with your actual password
7. Replace `<dbname>` with `diet_faq` (optional)

### 3. LLM API Key (Choose ONE)

**Option A: Google Gemini (RECOMMENDED - FREE!)**
- **GEMINI_API_KEY**: Get from https://aistudio.google.com/app/apikey
- No credit card required
- Completely free

**Option B: OpenAI**
- **OPENAI_API_KEY**: Get from https://platform.openai.com/api-keys
- Requires payment method
- $5 free credit, then pay-as-you-go

## File Location

The `.env.local` file is located at:
```
/Users/abhimanyukumar/Desktop/Chat_App/.env.local
```

## Next Steps

1. ✅ .env.local file created
2. ⏳ Fill in Google OAuth credentials
3. ⏳ Fill in MongoDB URI
4. ⏳ Fill in Gemini API key (recommended)
5. ⏳ Run `npm install` (if not done)
6. ⏳ Run `npm run seed` to seed database
7. ⏳ Run `npm run dev` to start app

## Important Notes

- ⚠️ Never commit `.env.local` to Git (it's in `.gitignore`)
- ⚠️ Keep your API keys secret
- ⚠️ Don't share your `.env.local` file

## Quick Links

- Google Cloud Console: https://console.cloud.google.com/
- MongoDB Atlas: https://www.mongodb.com/cloud/atlas
- Google AI Studio (Gemini): https://aistudio.google.com/app/apikey
- OpenAI: https://platform.openai.com/api-keys


