import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  parseTransaction, createTransaction, listTransactions,
  updateTransaction, deleteTransaction
} from "../controllers/transaction.controller.js";

const router = Router();

router.post("/parse", verifyJWT, parseTransaction);        // POST /api/transactions/parse
router.post("/", verifyJWT, createTransaction);            // POST /api/transactions
router.get("/", verifyJWT, listTransactions);              // GET  /api/transactions
router.put("/:id", verifyJWT, updateTransaction);          // PUT  /api/transactions/:id
router.delete("/:id", verifyJWT, deleteTransaction);       // DEL  /api/transactions/:id

export default router;
