import React from "react";
import { FaEuroSign } from "react-icons/fa";
import { FaMinus, FaPlus } from "react-icons/fa";

const Balance = () => {
  return (
    <div>
        <div className="balances">
          <div className="totalbalance">
            Total Balance
            <div className="amount">
              <div className="euro">
                <FaEuroSign />
              </div>
              147.32
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
                247.42
              </div>
            </div>
            <div className="income">
              Income
              <div className="amountincome">
                <div className="euroexpinc">
                  <FaPlus />
                  <FaEuroSign />
                </div>
                647.62
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Balance;
