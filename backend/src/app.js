import express from "express";
import cors from "cors";
import passport from "passport";
import "./config/passport.js";
import session from "express-session";

const app = express();

// CORS config
app.use(
  cors({
    origin: "https://finance-ai-tracker-alpha.vercel.app",
    credentials: true,
  })
);

// Middlewares
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

if (process.env.NODE_ENV === "production") {
  app.set('trust proxy', 1);
}

// Session middleware (needed for OAuth strategies like passport-google-oauth20)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret123",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: 'none',
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Import routes
import authRoutes from "./routes/auth.route.js";
import transactionRoutes from "./routes/transaction.route.js";
import analyticRoutes from "./routes/analytics.route.js";

// Load routes
app.use("/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/analytics", analyticRoutes);

// Test route
app.get("/health", (req, res) => {
  res.json({ ok: true });
});

export { app };
