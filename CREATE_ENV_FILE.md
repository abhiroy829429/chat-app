# How to Create .env.local File

## Quick Method

```bash
# Copy the template file
cp env.template .env.local

# Then edit .env.local with your actual API keys
```

## Manual Method

1. **Create a new file** named `.env.local` in the root directory
2. **Copy the content below** into the file
3. **Replace all placeholder values** with your actual API keys

## Template Content

Copy this into your `.env.local` file:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-using-openssl-rand-base64-32

# Google OAuth (for User Login)
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret

# MongoDB Database
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/diet_faq?retryWrites=true&w=majority

# LLM API Key (Choose ONE - Gemini is FREE!)
GEMINI_API_KEY=your-gemini-api-key-here

# API Base URL (Optional)
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Fill in the Values

1. **NEXTAUTH_SECRET**: Run `openssl rand -base64 32` and copy the output
2. **GOOGLE_CLIENT_ID & SECRET**: Get from https://console.cloud.google.com/
3. **MONGODB_URI**: Get from https://www.mongodb.com/cloud/atlas
4. **GEMINI_API_KEY**: Get from https://aistudio.google.com/app/apikey

## Verify

After creating `.env.local`, verify:
- ✅ File exists in root directory (same level as `package.json`)
- ✅ File name is exactly `.env.local` (with the dot at the start)
- ✅ All placeholder values are replaced with real values

## Important Notes

- ⚠️ Never commit `.env.local` to Git (it's in `.gitignore`)
- ⚠️ File must be named exactly `.env.local` (not `.env` or `env.local`)
- ⚠️ No spaces around the `=` sign in environment variables


