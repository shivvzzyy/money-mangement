import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  income: {
    type: Number,
    required: true,
  },
  budgets: [
    {
      category: {
        type: String,
        required: true,
      },
      allocatedAmount: {
        type: Number,
        required: true,
      },
      spentAmount: {
        type: Number,
        default: 0,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Budget", budgetSchema);
