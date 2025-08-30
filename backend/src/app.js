import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import "./config/passport.js";

const app = express();

// CORS config
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// Middlewares
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// Session middleware (required for passport-google-oauth20)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret123",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// import routes
import authRoutes from "./routes/auth.routes.js"

// load routes
app.use("/auth", authRoutes);

//Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Test route working fine!" });
});

export { app };
