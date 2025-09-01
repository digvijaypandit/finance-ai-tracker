# Documentation Index

- **README.md**: Architecture overview and high-level explanation of the system.
- **/docs/api.md**: API endpoint documentation (authentication, transactions, analytics).
- **/docs/setup.md**: Setup and installation instructions for local development.
- **/docs/ai-parser.md**: Details on AI parser integration and expected input/output.
- **/docs/database.md**: Database schema and data model descriptions.

---

# Architecture Overview

[React Frontend] 
       |
       | HTTP/REST API calls
       v
[Node.js + Express Backend]
       |            \
       |             \---> [AI Parser (GPT-4 / Gemini)]
       v
     [MongoDB / PostgreSQL]

Explanation:

Frontend (React + Tailwind + Charts)

Handles UI, routing, state management, and Google OAuth login.

Sends requests to backend API for authentication, transaction CRUD, and analytics.

Backend (Node.js + Express)

Validates requests, manages authentication (Google OAuth + JWT), and handles business logic.

Exposes RESTful API endpoints: /auth/*, /api/transactions/*, /api/analytics/*.

Calls the AI parser to process natural language transactions.

AI Parser  Gemini

Receives text input like "Bought Starbucks coffee $6.50"

Returns structured data: {amount: 6.5, category: "Food", description: "Coffee at Starbucks"}

Database MongoDB

Stores user accounts, transactions, and analytics data.

Ensures per-user isolation and secure storage.


API Flow
User (Frontend) --> POST /auth/google --> Backend validates token --> Creates/updates user
User (Frontend) --> POST /api/transactions/parse --> Backend calls AI Parser --> Returns structured transaction
User (Frontend) --> POST /api/transactions --> Backend saves to database
User (Frontend) --> GET /api/transactions --> Backend fetches transactions from database
User (Frontend) --> GET /api/analytics/summary --> Backend computes and returns summary

---

# API Endpoints

## Auth
- `GET /auth/google` — Start Google OAuth login
- `GET /auth/google/callback` — Google OAuth callback
- `POST /auth/refresh` — Refresh JWT access token
- `POST /auth/logout` — Logout user
- `GET /auth/profile` — Get current user profile (JWT required)

## Transactions
- `POST /api/transactions/parse` — Parse natural language transaction (JWT required)
- `POST /api/transactions` — Create a new transaction (JWT required)
- `GET /api/transactions` — List all transactions (JWT required)
- `PUT /api/transactions/:id` — Update a transaction (JWT required)
- `DELETE /api/transactions/:id` — Delete a transaction (JWT required)

## Analytics
- `GET /api/analytics/summary` — Get analytics summary (JWT required)
- `GET /api/analytics/categories` — Get analytics by category (JWT required)
- `GET /api/analytics/trends` — Get spending trends (JWT required)
