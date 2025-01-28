import express from "express";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import ExpenseModel from "../models/expense.model.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
dotenv.config();

const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized. No token provided." });
  }

  try {
    var decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};

app.get("/dashboard", verifyToken, async (req, res) => {
  try {
    const expenses = await ExpenseModel.find({ userId: req.userId });

    const responseData = {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      expenditures: {},
    };

    const categories = [
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
    ];

    categories.forEach((category) => {
      responseData.expenditures[category] = new Array(12).fill(0);
    });

    expenses.forEach((expense) => {
      const monthIndex = new Date(expense.date).getMonth();
      if (responseData.expenditures[expense.category]) {
        responseData.expenditures[expense.category][monthIndex] +=
          expense.amount;
      }
    });

    return res.status(200).json(responseData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
});

app.get("/dashboardStats", verifyToken, async (req, res) => {
  try {
    const expenses = await ExpenseModel.find({ userId: req.userId });

    const responseData = {
      expenses: [],
    };
    const categories = [
      "Food and Groceries",
      "Rent/EMI",
      "Utilities",
      "Transportation",
      "Shopping",
      "Fitness & Health",
      "Travel",
      "Insurance Premiums",
      "Savings & Investments",
      "Taxes",
      "Education",
      "Gifts & Donations",
      "Unexpected Expenses",
    ];

    // Aggregate the expenses by category
    categories.forEach((category) => {
      const total = expenses
        .filter((expense) => expense.category === category)
        .reduce((sum, expense) => sum + expense.amount, 0);

      responseData.expenses.push({ category, total });
    });

    // Send the response
    return res.status(200).json(responseData);
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/addExpense", verifyToken, async (req, res) => {
  const { expense } = req.body;
  const expenseData = new ExpenseModel({
    userId: req.userId,
    ...expense,
  });
  try {
    await expenseData.save();
    return res.status(201).json({ message: "Expense added successfully." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error." });
  }
});

app.get("/getExpenses", verifyToken, async (req, res) => {
  try {
    const expenses = await ExpenseModel.find({ userId: req.userId });
    return res.status(200).json({ expenses });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error." });
  }
});

app.put("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { expense } = req.body;

  try {
    const updatedExpense = await ExpenseModel.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { ...expense },
      { new: true }
    );

    if (!updatedExpense) {
      return res
        .status(404)
        .json({ message: "Expense not found or unauthorized." });
    }

    return res.status(200).json({
      message: "Expense updated successfully.",
      expense: updatedExpense,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
});

app.delete("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedExpense = await ExpenseModel.findOneAndDelete({
      _id: id,
      userId: req.userId,
    });

    if (!deletedExpense) {
      return res
        .status(404)
        .json({ message: "Expense not found or unauthorized." });
    }

    return res.status(200).json({ message: "Expense deleted successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
});

export default app;
