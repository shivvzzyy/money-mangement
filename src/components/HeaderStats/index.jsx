import React, { useEffect, useState } from "react";
import CardStats from "../Cards/CardStats";
import { useUser } from "../../context/userContext";
import axios from "axios";

export default function HeaderStats() {
  const [expenses, setExpenses] = useState([]);

  // Predefined categories with default icons and colors
  const predefinedCategories = [
    {
      category: "Food and Groceries",
      icon: "fas fa-utensils",
      color: "bg-error",
    },
    { category: "Rent/EMI", icon: "fas fa-home", color: "bg-primary" },
    { category: "Utilities", icon: "fas fa-bolt", color: "bg-secondary" },
    { category: "Transportation", icon: "fas fa-car", color: "bg-success" },
    { category: "Entertainment", icon: "fas fa-film", color: "bg-pink-500" },
    {
      category: "Shopping",
      icon: "fas fa-heartbeat",
      color: "bg-purple-500",
    },
    { category: "Savings", icon: "fas fa-piggy-bank", color: "bg-orange-500" },
    {
      category: "Miscellaneous",
      icon: "fas fa-ellipsis-h",
      color: "bg-gray-500",
    },
  ];

  useEffect(() => {
    async function fetchExpenses() {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/expense/dashboardStats",
          { withCredentials: true }
        );
        console.log(response.data);
        const data = response.data.expenses;
        setExpenses(data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    }

    fetchExpenses();
  }, []);

  const mergedCategories = predefinedCategories.map((category) => {
    const matchedExpense = expenses.find(
      (expense) => expense.category === category.category
    );
    return {
      ...category,
      total: matchedExpense ? matchedExpense.total : 0,
    };
  });
  const { user } = useUser();
  if (!user) return null;

  return (
    <>
      {/* Header */}
      <div className="relative bg-base-300 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <h1 className="text-3xl text-base-content text-center relative z-20 mb-5">
            Welcome, {user.name}
          </h1>
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              {mergedCategories.map((item, index) => (
                <div key={index} className="w-full lg:w-6/12 xl:w-3/12 px-4">
                  <CardStats
                    statSubtitle={item.category.toUpperCase()}
                    statTitle={`₹${item.total.toLocaleString()}`}
                    statArrow={item.total > 0 ? "up" : "down"}
                    statPercent={item.total > 0 ? "100" : "0"}
                    statPercentColor={
                      item.total > 0 ? "text-emerald-500" : "text-red-500"
                    }
                    statDescripiron={
                      item.total > 0 ? "Tracked this month" : "No data yet"
                    }
                    statIconName={item.icon}
                    statIconColor={item.color}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
