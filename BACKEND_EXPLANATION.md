# Backend Code Location & Architecture

## 🏗️ Architecture Overview

**This is a Next.js Full-Stack Application** - There is NO separate backend to install!

- **Frontend**: React components in `app/` folder
- **Backend**: API routes in `app/api/` folder
- **Everything runs together**: One `npm install` installs everything

## 📍 Where is the Backend Code?

All backend code is located in the **`app/api/`** folder:

```
app/api/
├── auth/[...nextauth]/route.ts    # Google Authentication API
├── faqs/route.ts                   # GET /api/faqs - Fetch all FAQs
├── query/route.ts                  # POST /api/query - Chat with AI
└── seed/route.ts                   # POST /api/seed - Seed database
```

## 🔧 Backend API Endpoints

### 1. Authentication API
**Location**: `app/api/auth/[...nextauth]/route.ts`
- Handles Google OAuth login
- Endpoint: `/api/auth/*` (handled by NextAuth)

### 2. FAQs API
**Location**: `app/api/faqs/route.ts`
- **GET** `/api/faqs`
- Returns all FAQ questions from MongoDB

### 3. Query API (Main Chat Backend)
**Location**: `app/api/query/route.ts`
- **POST** `/api/query`
- Accepts user questions
- Finds matching FAQ from database
- Calls LLM (Gemini or OpenAI)
- Returns AI response with FAQ reference

### 4. Seed API
**Location**: `app/api/seed/route.ts`
- **POST** `/api/seed`
- Seeds MongoDB with 50 FAQ questions

## 📚 Supporting Backend Libraries

Located in `lib/` folder:

- `lib/mongodb.ts` - MongoDB database connection
- `lib/llm.ts` - LLM integration (Gemini/OpenAI)
- `lib/faqs.ts` - FAQ data (50 questions)
- `lib/api.ts` - Frontend API client

## 🚀 Installation

**There is only ONE installation command for everything:**

```bash
npm install
```

This installs:
- ✅ Frontend dependencies (React, Next.js)
- ✅ Backend dependencies (MongoDB, OpenAI, Gemini)
- ✅ Everything needed to run the full-stack app

## 🏃 Running the Application

**One command runs both frontend AND backend:**

```bash
npm run dev
```

This starts:
- ✅ Frontend on: http://localhost:3000
- ✅ Backend API on: http://localhost:3000/api/*

**No separate backend server needed!**

## 📝 Environment Variables

All configuration goes in **`.env.local`** file (create it from `env.template`):

```bash
# Copy template
cp env.template .env.local

# Then edit .env.local with your actual values
```

## 🎯 Key Points

1. **No separate backend** - It's all Next.js API routes
2. **One installation** - `npm install` installs everything
3. **One server** - `npm run dev` runs frontend + backend
4. **Backend code** - All in `app/api/` folder
5. **Database code** - All in `lib/` folder

## 📂 Complete File Structure

```
Chat_App/
├── app/
│   ├── api/              ← BACKEND CODE HERE
│   │   ├── auth/         ← Authentication API
│   │   ├── faqs/         ← FAQs API
│   │   ├── query/        ← Chat Query API (Main Backend)
│   │   └── seed/         ← Database Seeding API
│   ├── chat/             ← Frontend Chat Page
│   └── page.tsx          ← Frontend Login Page
├── lib/                  ← Backend Utilities
│   ├── mongodb.ts        ← Database Connection
│   ├── llm.ts            ← AI/LLM Integration
│   └── faqs.ts           ← FAQ Data
├── .env.local            ← Configuration (CREATE THIS)
└── package.json          ← All Dependencies (Frontend + Backend)
```

## ✅ Summary

- **Backend Location**: `app/api/` folder
- **Installation**: `npm install` (one command for everything)
- **Running**: `npm run dev` (runs frontend + backend together)
- **Configuration**: `.env.local` file (copy from `env.template`)

No separate backend installation needed! Everything is included in the Next.js app.


