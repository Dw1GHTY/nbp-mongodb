"use client";
import React from "react";
import { FaEuroSign } from "react-icons/fa";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useState, useEffect } from "react";

const Balance = ({ balance, expense, income, last_reset, resetLastDate }) => {
  return (
    <div>
      <div className="balances">
        <div className="totalbalance">
          Total Balance
          <div className="amount">
            <div className="euro">
              <FaEuroSign />
            </div>
            {balance}
          </div>
        </div>
        <div className="expenseincome">
          <div className="expense">
            Expense
            <div className="amountexpense">
              <div className="euroexpinc">
                <FaMinus />
                <FaEuroSign />
              </div>
              {expense}
            </div>
          </div>
          <div className="stagod">
            <div className="income">
              Income
              <div className="amountincome">
                <div className="euroexpinc">
                  <FaPlus />
                  <FaEuroSign />
                </div>
                {income}
              </div>
            </div>
            <div className="stagod2">
              <button onClick={resetLastDate}>Reset values</button>
              <div>
                <p>Last changed: {last_reset}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Balance;
