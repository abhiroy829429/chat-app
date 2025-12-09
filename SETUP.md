# Quick Setup Guide

## 1. Install Dependencies
```bash
npm install
```

## 2. Create `.env.local` File
Copy the example and fill in your credentials:
```bash
cp .env.local.example .env.local
```

Required environment variables:
- `NEXTAUTH_URL` - Your app URL (http://localhost:3000 for dev)
- `NEXTAUTH_SECRET` - Generate with: `openssl rand -base64 32`
- `GOOGLE_CLIENT_ID` - From Google Cloud Console
- `GOOGLE_CLIENT_SECRET` - From Google Cloud Console
- `MONGODB_URI` - Your MongoDB connection string
- **LLM API Key (Choose ONE):**
  - `GEMINI_API_KEY` - **RECOMMENDED (FREE!)** - Get from: https://aistudio.google.com/app/apikey
  - `OPENAI_API_KEY` - Alternative (paid after free tier) - Get from: https://platform.openai.com/api-keys

## 3. Seed the Database
```bash
npm run seed
```
Or use the API endpoint:
```bash
curl -X POST http://localhost:3000/api/seed
```

## 4. Run Development Server
```bash
npm run dev
```

Visit http://localhost:3000

## 5. Deploy to Vercel
1. Push to GitHub
2. Import in Vercel
3. Add all environment variables
4. Deploy!

## Troubleshooting

**Database not seeding?**
- Check MongoDB connection string
- Ensure MongoDB Atlas allows connections from your IP
- Verify database user has read/write permissions

**Authentication not working?**
- Verify Google OAuth credentials
- Check redirect URI matches: `http://localhost:3000/api/auth/callback/google`
- Ensure `NEXTAUTH_URL` matches your deployment URL

**API errors?**
- Check OpenAI API key is valid
- Verify all environment variables are set
- Check browser console for errors

