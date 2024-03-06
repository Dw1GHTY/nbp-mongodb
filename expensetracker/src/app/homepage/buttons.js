'use client'
import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { insertExpInc, updateMoneyValues, updateChartInfo } from "../mongoAPI";

const Buttons = ({ onAddExpense, onAddIncome }) => {
  const [incomeFlag, setIncomeFlag] = useState(false);
  const [expenseFlag, setExpenseFlag] = useState(false);

  const promeniIncomeFlag = () => {
    setIncomeFlag(!incomeFlag);
    setExpenseFlag(false);
  };

  const promeniExpenseFlag = () => {
    setExpenseFlag(!expenseFlag);
    setIncomeFlag(false);
  };

  const [expenseData, setExpenseData] = useState({
    naziv: "",
    kategorija: "Food",
    iznos: "",
    vreme: "",
  });

  const [incomeData, setIncomeData] = useState({
    naziv: "",
    kategorija: "Salary",
    iznos: "",
    vreme: "",
  });

  const handleSubmit = async (e) => 
  {
    e.preventDefault();
    let dt_vr = new Date()
    let _datum = `${dt_vr.getDate()}.${dt_vr.getMonth()+1}.${dt_vr.getFullYear()}`

    if (incomeFlag) {
      const newIncome = { ...incomeData, datum: _datum};
      setIncomeData({
        naziv: "",
        kategorija: "Salary",
        iznos: "",
        vreme: "",
      })
      await server_insert(newIncome, "inc")
      await updateMoneyValues(localStorage.getItem("korisnik"), "inc", parseFloat(newIncome.iznos))
      await updateChartInfo(localStorage.getItem("korisnik"), newIncome.kategorija, newIncome.iznos)
      await onAddIncome(newIncome);
      promeniIncomeFlag()
    } 
    else if (expenseFlag) {

      const newExpense = { ...expenseData,  datum: _datum};
      setExpenseData({
        naziv: "",
        kategorija: "Food",
        iznos: "",
        vreme: "",
      })
      await server_insert(newExpense, "exp")
      await updateMoneyValues(localStorage.getItem("korisnik"), "exp", parseFloat(newExpense.iznos))
      await updateChartInfo(localStorage.getItem("korisnik"), newExpense.kategorija, newExpense.iznos)
      await onAddExpense(newExpense);
      promeniExpenseFlag()
    }
  };

  const server_insert = (obj, type) =>
  {
    let dt_vr = new Date()
    let _vreme = `${obj.vreme}`
    let _datum = `${dt_vr.getDate()}.${dt_vr.getMonth()+1}.${dt_vr.getFullYear()}`

    let objekat = {username: localStorage.getItem("korisnik"), opis: obj.naziv, kategorija: obj.kategorija, 
                   iznos: parseFloat(obj.iznos), vreme: _vreme, datum: _datum, tip: type}
    insertExpInc(objekat)
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (incomeFlag) {
      setIncomeData({
        ...incomeData,
        [name]: value,
      });
    } else if (expenseFlag) {
      setExpenseData({
        ...expenseData,
        [name]: value,
      });
    }
  };

  return (
    <div>
      <div className="balancebuttons">
        <button className="buttonb" onClick={promeniExpenseFlag}>
          <FaPlus className="plusincex"></FaPlus>Add Expense
        </button>
        <button className="buttonb" onClick={promeniIncomeFlag}>
          <FaPlus className="plusincex"></FaPlus>Add Income
        </button>
      </div>
      {incomeFlag && (
        <div className="expense-form-container">
          <form onSubmit={handleSubmit} className="income-form">
            <label htmlFor="naziv">Description of income:</label>
            <input
              type="text"
              id="naziv"
              name="naziv"
              value={incomeData.naziv}
              onChange={handleChange}
              required
            />

            <label htmlFor="kategorija">Category:</label>
            <select
              id="kategorija"
              name="kategorija"
              value={incomeData.kategorija}
              onChange={handleChange}
              required
            >
              <option value="Salary">Salary</option>
              <option value="Gift">Gift</option>
              <option value="Loan">Loan</option>
              <option value="Gambling">Gambling</option>
              <option value="Other2">Other</option>
            </select>

            <label htmlFor="iznos">Amount:</label>
            <input
              type="number"
              id="iznos"
              name="iznos"
              value={incomeData.iznos}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />

            <label htmlFor="vreme">Time:</label>
            <input
              type="time"
              id="vreme"
              name="vreme"
              value={incomeData.vreme}
              onChange={handleChange}
              required
            />

            <button type="submit">Add income</button>
          </form>
        </div>
      )}
      {expenseFlag && (
        <div className="expense-form-container">
          <form onSubmit={handleSubmit} className="expense-form">
            <label htmlFor="naziv">Description of expense:</label>
            <input
              type="text"
              id="naziv"
              name="naziv"
              value={expenseData.naziv}
              onChange={handleChange}
              required
            />

            <label htmlFor="kategorija">Category:</label>
            <select
              id="kategorija"
              name="kategorija"
              value={expenseData.kategorija}
              onChange={handleChange}
              required
            >
              <option value="Food">Food</option>
              {/* <option value="stan">Rental</option> */}
              <option value="Shopping">Shopping</option>
              <option value="Transportation">Transportation</option>
              <option value="Fun">Fun</option>
              <option value="Health">Health</option>
              <option value="Other1">Other</option>
            </select>

            <label htmlFor="iznos">Amount:</label>
            <input
              type="number"
              id="iznos"
              name="iznos"
              value={expenseData.iznos}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />

            <label htmlFor="vreme">Time:</label>
            <input
              type="time"
              id="vreme"
              name="vreme"
              value={expenseData.vreme}
              onChange={handleChange}
              required
            />

            <button type="submit">Add expense</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Buttons;
