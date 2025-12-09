# 🚀 START HERE - Quick Setup Guide

## ⚡ 3-Step Setup

### Step 1: Install Everything (Frontend + Backend)
```bash
npm install
```
**Note**: This installs everything. There is NO separate backend to install!

### Step 2: Create .env.local File
```bash
# Copy the template
cp env.template .env.local

# Then edit .env.local and add your API keys
```

### Step 3: Run the App
```bash
npm run dev
```
Visit: http://localhost:3000

---

## 📍 Where is the Backend Code?

**Backend is in**: `app/api/` folder

- `app/api/query/route.ts` - Main chat backend (calls AI)
- `app/api/faqs/route.ts` - Fetch FAQs from database
- `app/api/auth/[...nextauth]/route.ts` - Google login
- `app/api/seed/route.ts` - Seed database with FAQs

**No separate backend server needed!** It's all Next.js API routes.

---

## 🔑 Get Your API Keys

### 1. NextAuth Secret
```bash
openssl rand -base64 32
```
Copy output to `NEXTAUTH_SECRET` in `.env.local`

### 2. Google OAuth (for login)
- Go to: https://console.cloud.google.com/
- Create project → Enable Google+ API
- Create OAuth 2.0 Client ID
- Add redirect: `http://localhost:3000/api/auth/callback/google`
- Copy Client ID and Secret

### 3. MongoDB (database)
- Go to: https://www.mongodb.com/cloud/atlas
- Create free cluster
- Create database user
- Whitelist IP: `0.0.0.0/0`
- Get connection string → Replace `<password>`

### 4. Google Gemini API (LLM - FREE!)
- Go to: https://aistudio.google.com/app/apikey
- Sign in → Click "Create API Key"
- Copy the key (starts with `AIza...`)
- Paste as `GEMINI_API_KEY` in `.env.local`

---

## 📝 .env.local File Structure

After copying `env.template` to `.env.local`, fill in:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-generated-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
MONGODB_URI=your-mongodb-connection-string
GEMINI_API_KEY=your-gemini-api-key
```

---

## 🎯 Key Points

✅ **One installation**: `npm install` (installs frontend + backend)  
✅ **One server**: `npm run dev` (runs frontend + backend together)  
✅ **Backend location**: `app/api/` folder  
✅ **No separate backend**: Everything is Next.js  
✅ **Free LLM**: Use Google Gemini (no credit card needed)

---

## 📚 More Help

- **Detailed Setup**: See `README.md`
- **Backend Explanation**: See `BACKEND_EXPLANATION.md`
- **Environment Setup**: See `CREATE_ENV_FILE.md`
- **Quick Start**: See `QUICK_START.md`

---

## ✅ Checklist

- [ ] Run `npm install`
- [ ] Create `.env.local` from `env.template`
- [ ] Get NextAuth secret
- [ ] Get Google OAuth credentials
- [ ] Get MongoDB connection string
- [ ] Get Gemini API key
- [ ] Run `npm run seed` (or POST to `/api/seed`)
- [ ] Run `npm run dev`
- [ ] Visit http://localhost:3000

You're ready! 🎉


