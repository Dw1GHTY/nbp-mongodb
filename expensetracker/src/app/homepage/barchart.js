'use client'
import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";

const BarChart = ({chartInfo}) => {
  const [selectedData, setSelectedData] = useState("expenses");

  const handleRadioChange = (value) => {
    setSelectedData(value);
  };

  useEffect(() => {
    let chart;

    const fetchDataAndCreateChart = () => {
      if (chart) {
        chart.destroy();
      }

      const ctx = document.getElementById("myChart").getContext("2d");

      const data = { 
        labels:
          selectedData === "expenses"
            ? ["Food", "Transportation", "Shopping", "Fun", "Health", "Other"]
            : ["Salary", "Loan", "Gift", "Gambling"],
        expensesValues: chartInfo.expensesValues,
        incomesValues: chartInfo.incomesValues
      };

      const values =
        selectedData === "expenses" ? data.expensesValues : data.incomesValues;

      const colors = [
        "rgba(255, 99, 132, 0.6)",
        "rgba(54, 162, 235, 0.6)",
        "rgba(255, 206, 86, 0.6)",
        "rgba(75, 192, 192, 0.6)",
        "rgba(153, 102, 255, 0.6)",
        "rgba(255, 159, 64, 0.6)",
      ];

      const datasets = data.labels.map((label, index) => ({
        label,
        data: [values[index]],
        backgroundColor: colors[index],
        borderColor: colors[index],
        borderWidth: 1,
      }));

      chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: [""],
          datasets,
        },
        options: {
          scales: {
            x: {
              beginAtZero: true,
            },
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    };

    fetchDataAndCreateChart();

    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [chartInfo, selectedData])


  return (
    <div className="barchart">
      <div className="chartchoice">
         <div
        className={`radiochart ${
          selectedData === "expenses" ? "selected1" : ""
        }`}
        onClick={() => handleRadioChange("expenses")}
      >
        <div className="chartlabel1">Expenses</div>
      </div>
      <div
        className={`radiochart ${selectedData === "incomes" ? "selected1" : ""}`}
        onClick={() => handleRadioChange("incomes")}
      >
        <div className="chartlabel2">Incomes</div>
      </div>
      </div>
     
      <canvas id="myChart" width="400" height="400"></canvas>
    </div>
  );
};

export default BarChart;
