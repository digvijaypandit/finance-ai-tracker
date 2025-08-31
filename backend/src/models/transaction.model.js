import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    userId: { type: String, index: true, required: true },
    type: { type: String, enum: ["income", "expense", "transfer"], required: true },
    amount: { type: Number, required: true, min: 0 },
    currency: { type: String, default: "USD" },
    category: { type: String, required: true },
    description: { type: String },
    merchant: { type: String },
    date: { type: Date, required: true },
    tags: [{ type: String }],
    source: { type: String, enum: ["manual", "nlp"], default: "manual" },
    parseConfidence: { type: Number, min: 0, max: 1 }
  },
  { timestamps: true }
);

TransactionSchema.index({ userId: 1, date: -1 });
TransactionSchema.index({ userId: 1, category: 1, date: -1 });
TransactionSchema.index({ userId: 1, description: "text", merchant: "text", category: "text" });

export default mongoose.model("Transaction", TransactionSchema);
