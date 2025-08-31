import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getSummary, getByCategory, getTrends } from "../controllers/analytics.controller.js";

const router = Router();

router.get("/summary", verifyJWT, getSummary);       // GET /api/analytics/summary
router.get("/categories", verifyJWT, getByCategory); // GET /api/analytics/categories
router.get("/trends", verifyJWT, getTrends);         // GET /api/analytics/trends

export default router;
