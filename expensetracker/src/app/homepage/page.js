'use client'
import React, { useState, useEffect } from "react";
import "./style.css";
import Header from "./header"
import Balance from "./balance";
import List from './list'
import BarChart from './barchart'
import Buttons from './buttons'
import { useRouter } from "next/navigation"
import { getAllAktivnosti, getMoneyValues, resetMoneyValues, filterAktivnosti, getChartInfo } from "../mongoAPI";


const Glavna = () => {

  const router = useRouter();
  
  const [listOfExpInc, setlistOfExpInc] = useState([])
  const [balance, setBalance] = useState(0.0)
  const [expense, setExpense] = useState(0.0)
  const [income, setIncome] = useState(0.0)
  const [last_reset, setLast_reset] = useState("")
  const [chartInfo, setChartInfo] = useState({
    labelExp: ["Food", "Transportation", "Shopping", "Fun", "Health", "Other"],
    labelInc: ["Salary", "Loan", "Gift", "Gambling"],
    expensesValues: [0, 0, 0, 0, 0, 0],
    incomesValues: [0, 0, 0, 0]
  })

  let pok = 0

  const setValues = async () =>
  {
    let ans = await getMoneyValues(localStorage.getItem("korisnik"))
    if(ans.length === 1)
    {
      setBalance(ans[0].balance.toFixed(2))
      setExpense(ans[0].expense.toFixed(2))
      setIncome(ans[0].income.toFixed(2))
      setLast_reset(ans[0].last_reset)
    }
  }

  const resetLastDate = async () =>
  {
    await resetMoneyValues(localStorage.getItem("korisnik"))
    await setValues()
  } 

  const handleAddExpense = async (newExpense) => {
    await setValues()
    await pribaviAktivnosti()
    await postaviChart()
  };

  const handleAddIncome = async (newIncome) => {
    await setValues()
    await pribaviAktivnosti()
    await postaviChart()
  };

  const pribaviAktivnosti = async () =>
  {
    let ans = await getAllAktivnosti(localStorage.getItem("korisnik"))
    setlistOfExpInc(ans)
  }

  const filtrirajAktivnosti = async (datum, tip) =>
  {
    let ans = await filterAktivnosti(localStorage.getItem("korisnik"), datum, tip)
    setlistOfExpInc(ans)
  }

  const postaviChart = async () =>
  {
    let ans = await getChartInfo(localStorage.getItem("korisnik"))
    setChartInfo(ans)
  }

  useEffect(() => 
  {
    let kor = localStorage.getItem('korisnik')
    if(kor === "" || kor === undefined || kor === null)
    {
      alert("Morate se ulogovati na sajt!")
      router.push(`/login`)
    }
    setValues()
  }, [])

  useEffect(() => {
    if (pok === 0)
    {
      pribaviAktivnosti()
      postaviChart()
    }
    pok++
  }, [])

  return (
    <div className="wrapper">
      <div className="mejn">
        <Header/>
        <Balance balance={balance} expense={expense} income={income} last_reset={last_reset} resetLastDate={resetLastDate}/>
        <Buttons
          onAddExpense={handleAddExpense}
          onAddIncome={handleAddIncome}
        />
        <div className="glavnideo">
          <List expensesAndIncomes={listOfExpInc} filtrirajAktivnosti={filtrirajAktivnosti}/>
          <BarChart chartInfo={chartInfo}/>
        </div>
      </div>
    </div>
  );
};

export default Glavna;
