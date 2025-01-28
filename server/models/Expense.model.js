import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: [
      "Food and Groceries",
      "Rent/EMI",
      "Utilities",
      "Transportation",
      "Entertainment",
      "Shopping",
      "Fitness & Health",
      "Travel",
      "Insurance Premiums",
      "Savings & Investments",
      "Taxes",
      "Education",
      "Gifts & Donations",
      "Unexpected Expenses",
    ],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
  },
});

export default mongoose.model("Expense", expenseSchema);
