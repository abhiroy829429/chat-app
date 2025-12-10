# Smart Diet Insights

A full-stack AI-powered chat application for diet and nutrition FAQs, built with Next.js, MongoDB, and Google Gemini.

![Smart Diet Insights](Images/Dashboard.png.png)

##  Features

- **Google Authentication** - Secure login using NextAuth.js
- **AI-Powered Chat** - Get instant answers using Google Gemini (FREE) or OpenAI
- **FAQ Database** - 50 pre-loaded diet and nutrition questions and answers
- **Beautiful UI** - Modern, responsive design with Tailwind CSS
- **Real-time Chat** - Smooth chat experience with message history
- **Reference System** - Answers include references to FAQ question numbers

##  Technologies Used

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **NextAuth.js** - Authentication library

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **MongoDB** - NoSQL database for FAQ storage
- **LLM Integration** - Supports both Google Gemini (FREE) and OpenAI GPT-3.5-turbo

##  Project Structure

**Note**: This is a Next.js full-stack app. The backend code is in `app/api/` folder. There is NO separate backend to install!

```
Chat_App/
├── app/
│   ├── api/                        # 🔧 BACKEND CODE HERE (API Routes)
│   │   ├── auth/[...nextauth]/     # Google Authentication API
│   │   ├── faqs/route.ts           # GET /api/faqs - Fetch all FAQs
│   │   ├── query/route.ts          # POST /api/query - Chat with AI (Main Backend)
│   │   └── seed/route.ts           # POST /api/seed - Seed database
│   ├── chat/page.tsx               # Frontend: Chat page (protected)
│   ├── page.tsx                    # Frontend: Login page
│   ├── layout.tsx                  # Root layout
│   └── globals.css                 # Global styles
├── lib/                            # Backend Utilities
│   ├── mongodb.ts                  # MongoDB database connection
│   ├── llm.ts                      # LLM integration (Gemini/OpenAI)
│   ├── faqs.ts                     # FAQ data (50 questions)
│   └── api.ts                      # Frontend API client
├── .env.local                      # ⚠️ CREATE THIS FILE (see env.template)
├── env.template                    # Template for .env.local
├── package.json                    # All dependencies (frontend + backend)
└── README.md
```

**Backend Location**: All backend API code is in `app/api/` folder
- No separate backend installation needed
- One `npm install` installs everything
- One `npm run dev` runs frontend + backend together

##  Setup Instructions

### Prerequisites

- Node.js 18+ installed
- MongoDB account (MongoDB Atlas recommended) - FREE
- Google OAuth credentials - FREE
- LLM API key:
  - **Google Gemini** (RECOMMENDED - FREE, no credit card) OR
  - OpenAI API key (requires payment method, $5 free credit)

### Step 1: Install Dependencies (Frontend + Backend)

**Important**: This is a Next.js full-stack app. There is NO separate backend to install!

```bash
# This ONE command installs everything (frontend + backend)
npm install
```

**What gets installed:**
- ✅ Frontend: React, Next.js, Tailwind CSS
- ✅ Backend: MongoDB driver, OpenAI SDK, Google Gemini SDK
- ✅ Authentication: NextAuth.js
- ✅ Everything runs together in one Next.js app

### Step 2: Create Environment Variables File

**Create `.env.local` file in the root directory:**

```bash
# Option 1: Copy the template
cp env.template .env.local

# Option 2: Create manually
touch .env.local
```

Create a `.env.local` file in the root directory. You can copy from `.env.local.example` if it exists, or create it manually with the following structure:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-here
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
MONGODB_URI=your-mongodb-connection-string

# LLM API Key (Choose ONE - Gemini is FREE!)
GEMINI_API_KEY=your-gemini-api-key-here
# OR use OpenAI (paid after free tier):
# OPENAI_API_KEY=your-openai-api-key-here

# API Base URL (for production)
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Step 3: Get NextAuth Secret

Generate a secure random secret:

**Option 1: Using OpenSSL (Recommended)**
```bash
openssl rand -base64 32
```

**Option 2: Online Generator**
Visit: https://generate-secret.vercel.app/32

Copy the generated string and paste it as `NEXTAUTH_SECRET` in `.env.local`

### Step 4: Google OAuth Setup (for User Login)

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Create a new project** (or select existing):
   - Click "Select a project" → "New Project"
   - Enter project name (e.g., "Diet FAQ Chat")
   - Click "Create"
3. **Enable Google+ API**:
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API"
   - Click "Enable"
4. **Create OAuth 2.0 Credentials**:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth 2.0 Client ID"
   - If prompted, configure OAuth consent screen:
     - User Type: External
     - App name: "Diet FAQ Chat"
     - User support email: Your email
     - Developer contact: Your email
     - Click "Save and Continue" through the steps
   - Application type: "Web application"
   - Name: "Diet FAQ Chat Web Client"
   - **Authorized redirect URIs**: 
     - For development: `http://localhost:3000/api/auth/callback/google`
     - For production: `https://your-app.vercel.app/api/auth/callback/google`
   - Click "Create"
5. **Copy Credentials**:
   - Copy the "Client ID" → paste as `GOOGLE_CLIENT_ID` in `.env.local`
   - Copy the "Client Secret" → paste as `GOOGLE_CLIENT_SECRET` in `.env.local`

### Step 5: MongoDB Setup

1. **Create Free Account**: https://www.mongodb.com/cloud/atlas
2. **Create a Free Cluster**:
   - Click "Build a Database"
   - Choose "M0 FREE" (Free tier)
   - Select a cloud provider and region (choose closest to you)
   - Click "Create"
3. **Create Database User**:
   - Go to "Database Access" → "Add New Database User"
   - Authentication Method: Password
   - Username: `dietfaquser` (or your choice)
   - Password: Generate secure password (save it!)
   - Database User Privileges: "Atlas admin"
   - Click "Add User"
4. **Whitelist IP Address**:
   - Go to "Network Access" → "Add IP Address"
   - For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
   - For production: Add your Vercel deployment IPs
   - Click "Confirm"
5. **Get Connection String**:
   - Go to "Database" → Click "Connect" on your cluster
   - Choose "Connect your application"
   - Driver: Node.js, Version: 5.5 or later
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `diet_faq` (or keep default)
   - Example: `mongodb+srv://dietfaquser:YourPassword@cluster0.xxxxx.mongodb.net/diet_faq?retryWrites=true&w=majority`
   - Paste as `MONGODB_URI` in `.env.local`

### Step 6: Get LLM API Key (Choose ONE)

#### **Option A: Google Gemini (RECOMMENDED - FREE!)**

**Why Gemini?**
- ✅ Completely FREE (generous free tier)
- ✅ No credit card required
- ✅ Good quality responses
- ✅ Fast and reliable

**How to Get Gemini API Key:**

1. **Go to Google AI Studio**: https://aistudio.google.com/app/apikey
2. **Sign in** with your Google account
3. **Click "Create API Key"**
4. **Select or create a Google Cloud project** (can use same as OAuth)
5. **Copy the API key** (starts with `AIza...`)
6. **Paste as `GEMINI_API_KEY`** in `.env.local`

**That's it!** No payment method needed.

#### **Option B: OpenAI (Paid after free tier)**

**Why OpenAI?**
- ✅ Very high quality responses
- ✅ Free $5 credit to start (expires after 3 months)
- ❌ Requires payment method
- ❌ Pay-as-you-go after free credit

**How to Get OpenAI API Key:**

1. **Sign up**: https://platform.openai.com/signup
2. **Add payment method** (required even for free tier)
3. **Go to API Keys**: https://platform.openai.com/api-keys
4. **Click "Create new secret key"**
5. **Name it** (e.g., "Diet FAQ Chat")
6. **Copy the key** (starts with `sk-...`)
7. **Paste as `OPENAI_API_KEY`** in `.env.local`

**Note**: The app will automatically use Gemini if `GEMINI_API_KEY` is set, otherwise it will use OpenAI if `OPENAI_API_KEY` is set.

### Step 7: Seed Database

Start the development server:

```bash
npm run dev
```

Then, in a new terminal, seed the database:

```bash
curl -X POST http://localhost:3000/api/seed
```

Or use any HTTP client (Postman, Thunder Client, etc.) to POST to `http://localhost:3000/api/seed`

### Step 8: Run the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

##  API Routes

### GET `/api/faqs`
Returns all FAQ questions and answers from the database.

**Response:**
```json
{
  "faqs": [
    {
      "questionNumber": 1,
      "question": "What is the ideal diet for weight loss?",
      "answer": "A calorie-deficit diet with high protein..."
    }
  ]
}
```

### POST `/api/query`
Accepts a user question and returns an AI-generated answer with FAQ reference.

**Request:**
```json
{
  "question": "How much water should I drink daily?"
}
```

**Response:**
```json
{
  "answer": "You should drink 2-3 liters per day, more if you sweat. (Ref: Question #6)",
  "reference": 6
}
```

### POST `/api/seed`
Seeds the database with 50 FAQ questions and answers. Run this once after setting up MongoDB.

##  Deployment

### Frontend Deployment (Vercel)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add all environment variables in Vercel dashboard
4. Deploy

**Vercel Environment Variables:**
- `NEXTAUTH_URL` - Your Vercel deployment URL
- `NEXTAUTH_SECRET` - Same secret as local
- `GOOGLE_CLIENT_ID` - Your Google OAuth Client ID
- `GOOGLE_CLIENT_SECRET` - Your Google OAuth Client Secret
- `MONGODB_URI` - Your MongoDB connection string
- `OPENAI_API_KEY` - Your OpenAI API key
- `NEXT_PUBLIC_API_URL` - Your Vercel deployment URL (or backend URL if separated)

**Important:** Update Google OAuth redirect URI to: `https://your-app.vercel.app/api/auth/callback/google`

### Backend Deployment (Optional - Bonus)

If you want to separate backend:

1. Deploy backend API to Render/Railway
2. Update `NEXT_PUBLIC_API_URL` to point to backend URL
3. Ensure CORS is configured on backend

##  Features Overview

### Authentication
- Google OAuth integration
- Protected routes
- User profile display (name and photo)

### Chat Interface
- Clean, modern UI
- Message bubbles with timestamps
- Responsive design (mobile-friendly)
- Real-time message history
- Loading states

### AI Integration
- Context-aware responses using FAQ database
- Automatic FAQ matching
- Reference citations in format: `(Ref: Question #X)`

##  Notes

- The application uses MongoDB to store 50 FAQ questions
- OpenAI GPT-3.5-turbo is used for generating responses
- FAQ matching uses keyword-based similarity search
- All responses include references to the FAQ database

## 🔧 Troubleshooting

### Database Connection Issues
- Verify MongoDB URI is correct
- Check network access in MongoDB Atlas (whitelist IP)
- Ensure database user has read/write permissions

### Authentication Issues
- Verify Google OAuth credentials
- Check redirect URI matches exactly
- Ensure `NEXTAUTH_URL` matches your deployment URL

### API Errors
- Verify OpenAI API key is valid
- Check API rate limits
- Ensure environment variables are set correctly


