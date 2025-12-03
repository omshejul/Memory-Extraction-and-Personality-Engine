# 🧠 Memory Extraction & Personality Engine

A Next.js 15 application featuring AI-powered memory extraction from conversations and personality-based response generation using Google Gemini.

![Next.js](https://img.shields.io/badge/Next.js-15.5.0-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=flat-square&logo=tailwind-css)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-2.5_Flash-4285F4?style=flat-square)

## ✨ Features

### Core Features
- 🧠 **Memory Extraction** - Extract user preferences, emotional patterns, and facts from conversations
- 🎭 **Personality Engine** - Three distinct AI personalities (Calm Mentor, Witty Friend, Therapist)
- 💬 **Conversation Analysis** - Analyze 30-message conversations for deep insights
- 🔄 **Before/After Comparison** - See how different personalities respond to the same query
- 📊 **Memory Visualization** - Beautiful UI to display extracted memories categorically

### Technical Features
- 🔐 **Google OAuth Authentication** - Secure sign-in with Google accounts
- 🎨 **Modern UI** - Built with shadcn/ui components
- 🌓 **Theme Switching** - Light, dark, and system theme support
- 📱 **Responsive Design** - Works on all devices
- ⚡ **Next.js 15** - Latest App Router with Turbopack
- 🔒 **Type Safety** - Full TypeScript support
- 🎯 **API Routes** - RESTful endpoints for memory extraction and response generation

## 🎯 What This App Does

This application demonstrates a companion AI system that:

1. **Extracts Memories**: Analyzes conversations to identify:
   - User preferences (hobbies, likes, dislikes, habits)
   - Emotional patterns (common emotions, stress triggers, joy sources, communication style)
   - Important facts (personal details, relationships, goals, values)

2. **Generates Personality Responses**: Creates responses in three distinct personalities:
   - **Calm Mentor** 🧘: Patient, wise, uses metaphors and guiding questions
   - **Witty Friend** 😄: Playful, humorous, casual with pop culture references
   - **Therapist** 💙: Empathetic, validating, reflective listening

3. **Demonstrates Memory Utilization**: Shows how each personality references extracted memories naturally in their responses

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm
- Google Gemini API key
- Google OAuth credentials (optional, for authentication features)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/omshejul/GUPPSHUPP.git
   cd GUPPSHUPP
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Copy the example environment file:

   ```bash
   cp .example.env .env.local
   ```

   Add your credentials to `.env.local`:

   ```env
   # NextAuth Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here
   
   # Google OAuth Credentials
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   
   # Google Gemini API
   GEMINI_API_KEY=your-gemini-api-key
   ```

   **Get your Gemini API key**: Visit [Google AI Studio](https://makersuite.google.com/app/apikey)

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open the demo**

   Navigate to [http://localhost:3000/demo](http://localhost:3000/demo)

## 📖 Usage Guide

### Step 1: Input Conversation
- Paste a conversation in the format: `User: message` and `AI: message`
- Or load one of the 3 pre-made sample conversations:
  - **Alex - Software Engineer**: Career-focused professional
  - **Jordan - Digital Artist**: Creative hobbyist
  - **Sam - University Student**: Student navigating academics

### Step 2: Extract Memories
- Click "Extract Memories" to analyze the conversation
- View categorized memories:
  - Preferences (hobbies, likes, dislikes, habits)
  - Emotional Patterns (emotions, triggers, joy sources, style)
  - Important Facts (personal details, relationships, goals, values)

### Step 3: Ask a Question
- Enter any question you want advice or perspective on
- Choose a specific personality or generate all three

### Step 4: Compare Responses
- See how each personality responds differently
- View which memories each personality referenced
- Notice the tone and style differences

## 🏗️ Project Structure

```
GUPPSHUPP/
├── app/
│   ├── api/
│   │   ├── auth/                 # NextAuth.js routes
│   │   ├── extract-memory/       # Memory extraction endpoint
│   │   │   └── route.ts
│   │   └── generate-response/    # Personality response endpoint
│   │       └── route.ts
│   ├── demo/                     # Main demo page
│   │   └── page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── memory/                   # Memory feature components
│   │   ├── chat-input.tsx        # Conversation input
│   │   ├── memory-display.tsx    # Memory visualization
│   │   ├── personality-selector.tsx
│   │   └── response-comparison.tsx
│   ├── auth/                     # Auth components
│   ├── providers/                # Context providers
│   └── ui/                       # shadcn/ui components
├── lib/
│   ├── gemini.ts                 # Gemini API client
│   ├── memory-extractor.ts       # Memory extraction logic
│   ├── personality-engine.ts     # Personality generation
│   ├── types.ts                  # TypeScript interfaces
│   └── utils.ts
├── prompts/
│   ├── memory-extraction.ts      # Extraction prompts
│   └── personalities.ts          # Personality system prompts
├── data/
│   └── sample-chats.ts          # Sample conversations
└── README.md
```

## 🧠 Architecture

### Memory Extraction Module

**Purpose**: Extract structured memories from conversations

**Approach**:
- Uses Google Gemini 1.5 Flash with JSON mode
- Analyzes patterns across all messages (not just one-off mentions)
- Extracts specific, actionable information
- Validates output with Zod schemas

**Output Structure**:
```typescript
{
  preferences: {
    hobbies: string[];
    likes: string[];
    dislikes: string[];
    habits: string[];
  },
  emotionalPatterns: {
    commonEmotions: string[];
    stressTriggers: string[];
    joySources: string[];
    communicationStyle: string;
  },
  facts: {
    personalDetails: string[];
    relationships: string[];
    goals: string[];
    values: string[];
  }
}
```

### Personality Engine

**Purpose**: Generate responses in distinct personality modes

**Personalities**:

1. **Calm Mentor** 🧘
   - Tone: Patient, wise, reflective
   - Style: Metaphors, guiding questions
   - Temperature: 0.7

2. **Witty Friend** 😄
   - Tone: Playful, humorous, casual
   - Style: Pop culture refs, friendly teasing
   - Temperature: 0.9

3. **Therapist** 💙
   - Tone: Empathetic, validating, gentle
   - Style: Reflective listening, validation
   - Temperature: 0.6

**Each personality**:
- References user memories naturally
- Maintains consistent character
- Provides unique perspective on the same question

## 🎨 Prompt Engineering

### Memory Extraction Prompt Design

Key principles:
- Focus on **patterns** (2+ mentions), not one-off statements
- Extract **specific** details, not vague generalizations
- Identify **actionable** information
- Analyze across all messages to find recurring themes

### Personality System Prompts

Each personality has:
- Clear communication style guidelines
- Tone characteristics
- Instructions for memory usage
- Example phrases
- Temperature settings for consistency

## 📊 API Endpoints

### POST `/api/extract-memory`

Extract memories from conversation messages.

**Request**:
```json
{
  "messages": [
    { "role": "user", "content": "..." },
    { "role": "ai", "content": "..." }
  ]
}
```

**Response**:
```json
{
  "success": true,
  "memories": {
    "preferences": { ... },
    "emotionalPatterns": { ... },
    "facts": { ... }
  }
}
```

### POST `/api/generate-response`

Generate personality-based response.

**Request**:
```json
{
  "query": "How should I handle work stress?",
  "memories": { ... },
  "personality": "calm_mentor",  // optional
  "generateAll": true            // optional
}
```

**Response** (single personality):
```json
{
  "success": true,
  "response": "...",
  "memoryReferences": ["Hobby: morning runs", "Stress Trigger: tight deadlines"]
}
```

**Response** (all personalities):
```json
{
  "success": true,
  "responses": [
    {
      "personality": "calm_mentor",
      "response": "...",
      "memoryReferences": [...],
      "generatedAt": "2025-12-02T..."
    },
    // ... other personalities
  ]
}
```

## 🛠️ Technologies Used

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[Google Gemini](https://ai.google.dev/)** - LLM for extraction and generation
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS](https://tailwindcss.com/)** - Styling
- **[shadcn/ui](https://ui.shadcn.com/)** - UI components
- **[Zod](https://zod.dev/)** - Schema validation
- **[NextAuth.js](https://next-auth.js.org/)** - Authentication
- **[Lucide Icons](https://lucide.dev/)** - Icons

## 🧪 Sample Conversations

The app includes 3 realistic sample conversations:

1. **Alex - Software Engineer**
   - Themes: Work stress, ambition, work-life balance
   - 30 messages revealing career goals, burnout patterns, and coping mechanisms

2. **Jordan - Digital Artist**
   - Themes: Creative blocks, self-doubt, finding community
   - 30 messages about artistic journey and social anxiety

3. **Sam - University Student**
   - Themes: Academic pressure, identity, future uncertainty
   - 30 messages navigating college life and career decisions

## 🎯 Use Cases

This technology demonstrates applications for:

- **Companion AI**: Long-term memory in chatbots
- **Therapy Bots**: Remembering patient history and patterns
- **Customer Service**: Personalized support based on interaction history
- **Education**: Adaptive tutoring that remembers learning style
- **Personal Assistants**: Context-aware assistance

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub

2. Connect to Vercel:
   ```bash
   vercel
   ```

3. Add environment variables in Vercel dashboard:
   - `GEMINI_API_KEY`
   - `NEXTAUTH_URL`
   - `NEXTAUTH_SECRET`
   - `GOOGLE_CLIENT_ID` (optional)
   - `GOOGLE_CLIENT_SECRET` (optional)

4. Deploy:
   ```bash
   vercel --prod
   ```

### Other Platforms

Compatible with:
- Netlify
- Railway
- Render
- DigitalOcean App Platform
- AWS Amplify

## 🧩 Adding Features

### Add a New Personality

1. Update `prompts/personalities.ts`:
   ```typescript
   export const PERSONALITIES = {
     // ... existing
     new_personality: {
       id: "new_personality",
       name: "New Personality",
       description: "...",
       systemPrompt: "...",
       temperature: 0.7,
       icon: "🎭",
       color: "green",
       characteristics: [...]
     }
   };
   ```

2. Update `lib/types.ts`:
   ```typescript
   export type PersonalityType = "calm_mentor" | "witty_friend" | "therapist" | "new_personality";
   ```

### Add More Memory Categories

1. Update `lib/types.ts` with new schema
2. Update extraction prompt in `prompts/memory-extraction.ts`
3. Update UI in `components/memory/memory-display.tsx`

## 📝 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **Assignment**: Built for companion AI assignment demonstrating memory extraction and personality engines
- **Google Gemini**: For powerful LLM capabilities
- **Next.js Team**: For the amazing framework
- **shadcn**: For beautiful UI components
- **Vercel**: For seamless deployment

## 📞 Support

For questions or issues:

1. Check the [Issues](../../issues) page
2. Create a new issue with details
3. Contact: [Your Contact Info]

---

Built with 🧠 using Next.js, Google Gemini, and TypeScript
