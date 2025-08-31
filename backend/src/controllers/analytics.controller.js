import Transaction from "../models/transaction.model.js";

function buildDateFilter(from, to) {
  if (!from && !to) return undefined;
  const f = {};
  if (from) f.$gte = new Date(from);
  if (to)   f.$lte = new Date(to);
  return f;
}

// GET /api/analytics/summary
export async function getSummary(req, res) {
  try {
    const userId = req.user.id;
    const { from, to } = req.query;

    const match = { userId };
    const dateFilter = buildDateFilter(from, to);
    if (dateFilter) match.date = dateFilter;

    const agg = await Transaction.aggregate([
      { $match: match },
      {
        $group: {
          _id: "$type",
          total: { $sum: "$amount" }
        }
      }
    ]);

    const totals = agg.reduce((acc, row) => ({ ...acc, [row._id]: row.total }), {});
    const income = totals.income || 0;
    const expenses = totals.expense || 0;
    const savings = income - expenses;

    return res.json({ income, expenses, savings, from, to });
  } catch (err) {
    return res.status(500).json({ error: "Summary failed" });
  }
}

// GET /api/analytics/categories
export async function getByCategory(req, res) {
  try {
    const userId = req.user.id;
    const { from, to, type = "expense", limit = 20 } = req.query;

    const match = { userId, type };
    const dateFilter = buildDateFilter(from, to);
    if (dateFilter) match.date = dateFilter;

    const agg = await Transaction.aggregate([
      { $match: match },
      { $group: { _id: "$category", total: { $sum: "$amount" }, count: { $sum: 1 } } },
      { $sort: { total: -1 } },
      { $limit: Number(limit) }
    ]);

    const data = agg.map(a => ({ category: a._id, total: a.total, count: a.count }));
    return res.json({ type, from, to, data });
  } catch (err) {
    return res.status(500).json({ error: "Categories failed" });
  }
}

// GET /api/analytics/trends
export async function getTrends(req, res) {
  try {
    const userId = req.user.id;
    const { from, to, granularity = "month" } = req.query;

    const match = { userId };
    const dateFilter = buildDateFilter(from, to);
    if (dateFilter) match.date = dateFilter;

    // Choose date bucket
    const dateFmt =
      granularity === "week" ? "%G-%V" :        // ISO Year-Week (e.g., 2025-35)
      granularity === "day"  ? "%Y-%m-%d" :
                               "%Y-%m";          // month

    const agg = await Transaction.aggregate([
      { $match: match },
      {
        $group: {
          _id: {
            bucket: { $dateToString: { date: "$date", format: dateFmt } },
            type: "$type"
          },
          total: { $sum: "$amount" }
        }
      },
      {
        $group: {
          _id: "$_id.bucket",
          items: {
            $push: { k: "$_id.type", v: "$total" }
          }
        }
      },
      {
        $project: {
          bucket: "$_id",
          income: {
            $ifNull: [
              { $toDouble: { $getField: { input: { $arrayToObject: "$items" }, field: "income" } } }, 0
            ]
          },
          expense: {
            $ifNull: [
              { $toDouble: { $getField: { input: { $arrayToObject: "$items" }, field: "expense" } } }, 0
            ]
          },
          _id: 0
        }
      },
      { $sort: { bucket: 1 } }
    ]);

    const data = agg.map(r => ({
      period: r.bucket,
      income: r.income,
      expenses: r.expense,
      net: r.income - r.expense
    }));

    return res.json({ granularity, from, to, data });
  } catch (err) {
    return res.status(500).json({ error: "Trends failed" });
  }
}
