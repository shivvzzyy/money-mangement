import React, { useState } from "react";
import Admin from "../../Layout/Admin";
import axios from "axios";
import toast from "react-hot-toast";

const Component = () => {
  const [expense, setExpense] = useState({
    category: "",
    amount: "",
    date: "",
    description: "",
    month: "",
  });

  const months = [
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
  ];

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const response = axios.post(
      "http://localhost:5000/api/expense/addExpense",
      { expense },
      { withCredentials: true }
    );
    toast.promise(response, {
      loading: "Adding Expense...",
      success: "Expense Added Successfully",
      error: "Failed to add Expense",
    });
  };

  return (
    <div className="p-6 bg-base-100 shadow-md rounded-md relative max-w-screen-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4 text-center">
        Expense Tracker
      </h1>
      <form onSubmit={handleSubmit}>
        {/* Category */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Category</label>
          <select
            name="category"
            value={expense.category}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Month */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Month</label>
          <select
            name="month"
            value={expense.month}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          >
            <option value="" disabled>
              Select a month
            </option>
            {months.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Amount */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Amount</label>
          <input
            type="number"
            name="amount"
            value={expense.amount}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Enter amount"
            required
          />
        </div>

        {/* Date */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Date</label>
          <input
            type="date"
            name="date"
            value={expense.date}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            name="description"
            value={expense.description}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            placeholder="Enter a brief description"
            rows="3"
            required
          />
        </div>

        {/* Submit Button */}
        <div>
          <button type="submit" className="btn btn-primary w-full">
            Add Expense
          </button>
        </div>
      </form>
    </div>
  );
};

const ExpenseTrack = () => {
  return (
    <Admin>
      <Component />
    </Admin>
  );
};

export default ExpenseTrack;
