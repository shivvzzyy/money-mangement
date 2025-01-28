import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

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

export default function CardPageVisits() {
  const [expensesData, setExpensesData] = useState([]);
  const [editExpense, setEditExpense] = useState(null);

  useEffect(() => {
    // Fetch expenses data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/expense/getExpenses",
          { withCredentials: true }
        );
        setExpensesData(response.data.expenses);
      } catch (error) {
        console.error("Error fetching expenses data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expense?")) {
      return;
    }
    try {
      const response = axios.delete(`http://localhost:5000/api/expense/${id}`, {
        withCredentials: true,
      });
      toast.promise(response, {
        loading: "Deleting...",
        success: () => {
          setExpensesData((prev) =>
            prev.filter((expense) => expense._id !== id)
          );
          return "Expense deleted successfully.";
        },
        error: "Error deleting expense.",
      });
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const handleUpdate = async (updatedExpense) => {
    try {
      const response = axios.put(
        `http://localhost:5000/api/expense/${updatedExpense._id}`,
        { expense: updatedExpense },
        { withCredentials: true }
      );
      toast.promise(response, {
        loading: "Updating...",
        success: () => {
          return "Expense updated successfully.";
        },
        error: "Error updating expense.",
      });
      setEditExpense(null); // Close the edit form
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  const handleEditClick = (expense) => {
    setEditExpense(expense);
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-base-100 w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-base-content">
                Latest Transactions
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-6 py-3 border text-base uppercase font-semibold text-left">
                  Month
                </th>
                <th className="px-6 py-3 border text-base uppercase font-semibold text-left">
                  Category
                </th>
                <th className="px-6 py-3 border text-base uppercase font-semibold text-left">
                  Description
                </th>
                <th className="px-6 py-3 border text-base uppercase font-semibold text-left">
                  Amount
                </th>
                <th className="px-6 py-3 border text-base uppercase font-semibold text-left">
                  Date
                </th>
                <th className="px-6 py-3 border text-base uppercase font-semibold text-left">
                  Update
                </th>
                <th className="px-6 py-3 border text-base uppercase font-semibold text-left">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {expensesData.map((expense) => (
                <tr key={expense._id}>
                  <td className="px-6 py-4 border text-base">
                    {expense.month}
                  </td>
                  <td className="px-6 py-4 border text-base">
                    {expense.category}
                  </td>
                  <td className="px-6 py-4 border text-base">
                    {expense.amount}
                  </td>
                  <td className="px-6 py-4 border text-base">
                    {expense.description}
                  </td>
                  <td className="px-6 py-4 border text-base">
                    {new Date(expense.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 border text-base">
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleEditClick(expense)}
                    >
                      Edit
                    </button>
                  </td>
                  <td className="px-6 py-4 border text-base">
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDelete(expense._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editExpense && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Edit Expense</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate(editExpense);
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={editExpense.category}
                  onChange={(e) => {
                    setEditExpense({
                      ...editExpense,
                      category: e.target.value,
                    });
                  }}
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
                  value={editExpense.month}
                  onChange={(e) => {
                    setEditExpense({ ...editExpense, month: e.target.value });
                  }}
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

              <div className="form-control">
                <label className="label">Amount</label>
                <input
                  type="number"
                  className="input input-bordered"
                  value={editExpense.amount}
                  onChange={(e) =>
                    setEditExpense({
                      ...editExpense,
                      amount: parseFloat(e.target.value),
                    })
                  }
                />
              </div>
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => setEditExpense(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
