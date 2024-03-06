import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";

const BarChart = () => {
  const [selectedData, setSelectedData] = useState("expenses");

  useEffect(() => {
    let chart;

    const fetchDataAndCreateChart = () => {
      if (chart) {
        // Uništavanje prethodnog grafikona ako postoji
        chart.destroy();
      }

      const ctx = document.getElementById("myChart").getContext("2d");

      const data = {
        labels:
          selectedData === "expenses"
            ? ["Food", "Transportation", "Shopping", "Fun", "Health", "Other"]
            : ["Salary", "Loan", "Gift", "Gambling"],
        expensesValues: [50, 30, 70, 40, 60, 20],
        incomesValues: [80, 20, 40, 60],
        label: selectedData === "expenses" ? "Expenses" : "Incomes",
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

    // Čišćenje grafikona kad se komponenta unmount-uje
    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [selectedData]);

  const handleRadioChange = (value) => {
    setSelectedData(value);
  };

  return (
    <div className="barchart">
      <div className="chartchoice">
         <div
        className={`radiochart ${
          selectedData === "expenses" ? "selected1" : ""
        }`}
        onClick={() => handleRadioChange("expenses")}
      >
        <div className="chartlabel">Expenses</div>
      </div>
      <div
        className={`radiochart ${selectedData === "incomes" ? "selected1" : ""}`}
        onClick={() => handleRadioChange("incomes")}
      >
        <div className="chartlabel">Incomes</div>
      </div>
      </div>
     
      <canvas id="myChart" width="400" height="400"></canvas>
    </div>
  );
};

export default BarChart;
