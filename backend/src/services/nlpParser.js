import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";

const schema = z.object({
  type: z.enum(["income", "expense", "transfer"]),
  amount: z.number().nonnegative(),
  currency: z.string().optional().default("USD"),
  category: z.string(),
  description: z.string().optional().default(""),
  merchant: z.string().optional().default(""),
  date: z.string().optional(),
  confidence: z.number().min(0).max(1).optional().default(0.6)
});

const FALLBACK_CATEGORIES = {
  coffee: "Food", starbucks: "Food", lunch: "Food", dinner: "Food", uber: "Transport",
  gas: "Gas", shell: "Gas", grocery: "Groceries", amazon: "Shopping", netflix: "Subscriptions",
  salary: "Income", income: "Income"
};

function naiveFallback(text) {
  // Super lightweight regex fallback if LLM fails
  const amt = text.match(/(?:\$|₹)?\s?(\d+(?:\.\d+)?)/);
  const amount = amt ? Number(amt[1]) : 0;

  const lowered = text.toLowerCase();
  let category = "Uncategorized";
  for (const k of Object.keys(FALLBACK_CATEGORIES)) {
    if (lowered.includes(k)) { category = FALLBACK_CATEGORIES[k]; break; }
  }

  const type = lowered.includes("salary") || lowered.includes("paid") || lowered.includes("income")
    ? "income" : "expense";

  return {
    type, amount, category,
    description: text,
    merchant: "",
    date: new Date().toISOString(),
    confidence: 0.3
  };
}

export async function parseWithGemini(nlText) {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    return schema.parse(naiveFallback(nlText));
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `
You are a finance transaction parser.
Extract structured JSON with fields:
type: "income" | "expense" | "transfer"
amount: number
currency: 3-letter code if obvious, else "USD"
category: short category (Food, Groceries, Gas, Electronics, Transport, Shopping, Subscriptions, Income, etc.)
description: brief
merchant: short name if present
date: ISO8601 date if mentioned, else today's date
confidence: 0..1

ONLY return minified JSON.

Examples:
"Coffee at Starbucks $6.50" ->
{"type":"expense","amount":6.5,"currency":"USD","category":"Food","description":"Coffee","merchant":"Starbucks","date":"${new Date().toISOString()}","confidence":0.8}

"Monthly salary $4500" ->
{"type":"income","amount":4500,"currency":"USD","category":"Income","description":"Monthly salary","merchant":"","date":"${new Date().toISOString()}","confidence":0.9}

Now parse: """${nlText}"""
`;

  try {
    const resp = await model.generateContent(prompt);
    const raw = resp.response.text().trim();

    // Try robust JSON extraction
    const jsonStr = raw.match(/\{[\s\S]*\}/)?.[0] ?? raw;
    const parsed = JSON.parse(jsonStr);
    const safe = schema.parse(parsed);
    return safe;
  } catch (e) {
    // fallback
    return schema.parse(naiveFallback(nlText));
  }
}
