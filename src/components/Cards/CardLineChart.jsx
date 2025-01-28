import React, { useEffect, useState, useRef } from "react";
import { Chart, registerables } from "chart.js";
import axios from "axios";

Chart.register(...registerables);

const expenditureCategories = [
  { name: "Food and Groceries", color: "#ecc94b" },
  { name: "Rent/EMI", color: "#4c51bf" },
  { name: "Utilities", color: "#805ad5" },
  { name: "Transportation", color: "#48bb78" },
  { name: "Entertainment", color: "#ed64a6" },
  { name: "Shopping", color: "#f56565" },
  { name: "Fitness & Health", color: "#38b2ac" },
  { name: "Travel", color: "#3182ce" },
  { name: "Insurance Premiums", color: "#d69e2e" },
  { name: "Savings & Investments", color: "#9f7aea" },
  { name: "Taxes", color: "#2f855a" },
  { name: "Education", color: "#dd6b20" },
  { name: "Gifts & Donations", color: "#e53e3e" },
  { name: "Unexpected Expenses", color: "#805ad5" },
];

export default function CardLineChart() {
  const [chartData, setChartData] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/expense/dashboard",
          {
            withCredentials: true,
          }
        );
        const data = response.data;
        setChartData(data);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (chartData.labels && chartData.expenditures) {
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      const datasets = expenditureCategories.map((category) => {
        console.log(
          `Category: ${category.name}, Data: `,
          chartData.expenditures[category.name]
        );
        return {
          label: category.name,
          backgroundColor: category.color,
          borderColor: category.color,
          data: chartData.expenditures[category.name] || [], // Fallback to zeros
          fill: false,
        };
      });

      const config = {
        type: "line",
        data: {
          labels: chartData.labels,
          datasets: datasets,
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          title: {
            display: false,
          },
          legend: {
            labels: {
              fontColor: "white",
            },
            align: "end",
            position: "bottom",
          },
          tooltips: {
            mode: "index",
            intersect: false,
          },
          hover: {
            mode: "nearest",
            intersect: true,
          },
          scales: {
            xAxes: [
              {
                ticks: {
                  fontColor: "rgba(255,255,255,.7)",
                },
                gridLines: {
                  display: false,
                  borderDash: [2],
                  borderDashOffset: [2],
                  color: "rgba(33, 37, 41, 0.3)",
                },
              },
            ],
            yAxes: [
              {
                ticks: {
                  fontColor: "rgba(255,255,255,.7)",
                },
                gridLines: {
                  borderDash: [3],
                  borderDashOffset: [3],
                  drawBorder: false,
                  color: "rgba(255, 255, 255, 0.15)",
                },
              },
            ],
          },
        },
      };

      const ctx = document.getElementById("line-chart").getContext("2d");
      chartRef.current = new Chart(ctx, config);
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [chartData]);

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-base-100">
      <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full max-w-full flex-grow flex-1">
            <h6 className="uppercase text-base-content mb-1 text-xs font-semibold">
              Overview
            </h6>
            <h2 className="text-base-content text-xl font-semibold">
              Expenditure Overview
            </h2>
          </div>
        </div>
      </div>
      <div className="p-4 flex-auto">
        <div className="relative h-350-px">
          <canvas id="line-chart"></canvas>
        </div>
      </div>
    </div>
  );
}
