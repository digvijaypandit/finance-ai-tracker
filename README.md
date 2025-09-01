# Finance AI Tracker

An intelligent finance tracker with **Google OAuth authentication**, **AI-powered natural language transaction input**, and a **beautiful, responsive dashboard** to analyze spending patterns and provide financial insights.

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Project Structure](#project-structure)  
- [Setup Instructions](#setup-instructions)  
  - [Frontend](#frontend)  
  - [Backend](#backend)  
- [Available Scripts](#available-scripts)  
- [Demo Flow](#demo-flow)  
- [Test Data](#test-data)  
- [Notes](#notes)

---

## Features

### Core Features
- **Google OAuth Authentication**: Sign in/up with Google, secure sessions, and per-user data isolation.  
- **Smart Transaction Entry**: Natural language transaction input parsed by AI to detect amount, category, and description.  
- **Dashboard & Transaction History**: Interactive charts (pie & line), summary cards, filtering, and transaction management (edit/delete).  

### Bonus Features
- Dark/light mode toggle  
- Smooth animations & micro-interactions  
- Responsive mobile-first design  
- AI learning for category suggestions  

---

## Tech Stack

**Frontend**  
- React  
- Tailwind CSS  
- React Router DOM  
- Redux Toolkit  
- Chart.js / react-chartjs-2  
- Framer Motion  
- Google OAuth Client  

**Backend**  
- Node.js & Express  
- MongoDB (or PostgreSQL alternative)  
- Google OAuth server-side verification + JWT  
- OpenAI GPT-4 / Google Gemini for AI transaction parsing  
- Validation: Zod & express-validator  

**Development Tools**  
- Vite (Frontend bundler)  
- Nodemon (Backend auto-reload)  
- Prettier & ESLint  

---

## Project Structure

finance-ai-tracker/
├── frontend/ # React application
│       ├── src/
│       ├── public/
│       ├── package.json
│       └── ...
├── backend/ # Express server
│     ├── src/
│     ├── package.json
│     └── ...
├── docs/ # Documentation + screenshots
├── README.md # Complete setup guide
└── .env.example # Environment template



---

## Setup Instructions

### Frontend

```bash
cd frontend
npm install
npm run dev         # Start development server
npm run build       # Build production bundle
npm run preview     # Preview production build
npm run lint        # Run ESLint
```
### Backend
```bash
cd backend
npm install
cp .env.example .env   # Create .env file and fill with credentials
npm run dev            # Start development server
npm run format         # Format code using Prettier
npm run lint           # Check code formatting
```

## Available Scripts

### Frontend

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build production bundle |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

### Backend

| Command | Description |
|---------|-------------|
| `npm run dev` | Start server with nodemon |
| `npm run format` | Format code using Prettier |
| `npm run lint` | Check code formatting |

---

## Demo Flow

1. Open the app → Landing page with **Sign in with Google**.  
2. Authenticate → Redirect to dashboard.  
3. Enter a transaction in natural language, e.g.,  
   > "Bought Samsung watch $250"  
   → AI parses amount, category, description → User confirms → Transaction saved.  
4. Dashboard updates with interactive charts and summary cards.  
5. Edit/delete any transaction, filter by category, or switch monthly/weekly views.  

---

## Test Data

Use these sample inputs to test AI parsing:

- "Coffee at Starbucks $6.50"  
- "Gas station $40"  
- "Amazon purchase $89.99"  
- "Monthly salary $4500"  
- "Dinner at Italian restaurant $65"  
- "Netflix subscription $15.99"  
- "Grocery shopping at Whole Foods $120"  
- "Uber ride to airport $28"  

---

## Notes

- Ensure Google OAuth credentials are correctly set in `.env` for both frontend and backend.  
- AI integration uses Google Gemini API keys.  
- Recommended to view on both mobile and desktop for responsive design testing.
