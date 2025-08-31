import Transaction from "../models/transaction.model.js";
import { parseWithGemini } from "../services/nlpParser.js";

export async function parseTransaction(req, res) {
  try {
    const { text } = req.body;
    if (!text || typeof text !== "string") {
      return res.status(400).json({ error: "text is required" });
    }
    const parsed = await parseWithGemini(text);
    return res.json({ parsed });
  } catch (err) {
    return res.status(500).json({ error: "Parse failed" });
  }
}

export async function createTransaction(req, res) {
  try {
    const userId = req.user.id;
    const payload = req.body;

    // Minimal validation
    if (!payload?.amount || !payload?.category || !payload?.type || !payload?.date) {
      return res.status(400).json({ error: "amount, category, type, date are required" });
    }

    const doc = await Transaction.create({
      ...payload,
      userId,
      source: payload.source || "manual"
    });
    return res.status(201).json(doc);
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: "Create failed" });
  }
}

export async function listTransactions(req, res) {
  try {
    const userId = req.user.id;
    const {
      from, to, category, type, q,
      sort = "-date",
      page = 1, limit = 20
    } = req.query;

    const filter = { userId };
    if (from || to) {
      filter.date = {};
      if (from) filter.date.$gte = new Date(from);
      if (to)   filter.date.$lte = new Date(to);
    }
    if (category) filter.category = category;
    if (type) filter.type = type;
    if (q) filter.$text = { $search: q };

    const skip = (Number(page) - 1) * Number(limit);
    const rows = await Transaction.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));

    const total = await Transaction.countDocuments(filter);
    return res.json({
      data: rows,
      page: Number(page),
      limit: Number(limit),
      total,
      hasMore: skip + rows.length < total
    });
  } catch (err) {
    return res.status(500).json({ error: "List failed" });
  }
}

export async function updateTransaction(req, res) {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const payload = req.body;

    const doc = await Transaction.findOneAndUpdate(
      { _id: id, userId }, { $set: payload }, { new: true }
    );
    if (!doc) return res.status(404).json({ error: "Not found" });
    return res.json(doc);
  } catch (err) {
    return res.status(500).json({ error: "Update failed" });
  }
}

export async function deleteTransaction(req, res) {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const doc = await Transaction.findOneAndDelete({ _id: id, userId });
    if (!doc) return res.status(404).json({ error: "Not found" });
    return res.status(200).json({ message: "transaction deleted" });
  } catch (err) {
    return res.status(500).json({ error: "Delete failed" });
  }
}
