'use client'
import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { MdFastfood } from "react-icons/md";
import { FaCar } from "react-icons/fa";
import { IoGameController } from "react-icons/io5";
import { MdHealthAndSafety } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { FaMoneyBillAlt } from "react-icons/fa";
import { FaGift } from "react-icons/fa6";
import { MdCasino } from "react-icons/md";
import { MdVolunteerActivism } from "react-icons/md";
// import { FaEuroSign } from "react-icons/fa";

const List = ({ expensesAndIncomes, filtrirajAktivnosti }) => {
  const [selectedOption, setSelectedOption] = useState("all");
  const [selectedDate, setSelectedDate] = useState("");
  const [dateFlag, setDateFlag] = useState(false);

  const handleOptionChange = (option) => {
    setSelectedOption(option)
    const formattedDate = formatSelectedDate(selectedDate);
    filtrirajAktivnosti(formattedDate, option)
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const promeniDateFlag = () => {
    setDateFlag(!dateFlag);
  };

  const handleSearch = () => {
    const formattedDate = formatSelectedDate(selectedDate);
    //console.log("Izabrani formatiran datum:", formattedDate);
    filtrirajAktivnosti(formattedDate, selectedOption)
  };

  const formatSelectedDate = (selectedDate) => {
    const dateObject = new Date(selectedDate);
    const formattedDate =
      dateObject.getDate() +
      "." +
      (dateObject.getMonth() + 1) +
      "." +
      dateObject.getFullYear();
    return formattedDate;
  }

  return (
    <div>
      {/* RADIO BUTTONI */}
      <div className="radio-button-group">
        <label
          className={`radio-button ${selectedOption === "all" && "selected"}`}
        >
          <input
            type="radio"
            name="expenseType"
            value="all"
            checked={selectedOption === "all"}
            onChange={() => handleOptionChange("all")}
          />
          All
        </label>

        <label
          className={`radio-button ${selectedOption === "Food" && "selected"}`}
        >
          <input
            type="radio"
            name="expenseType"
            value="Food"
            checked={selectedOption === "Food"}
            onChange={() => handleOptionChange("Food")}
          />
          Food
        </label>

        <label
          className={`radio-button ${
            selectedOption === "Shopping" && "selected"
          }`}
        >
          <input
            type="radio"
            name="expenseType"
            value="Shopping"
            checked={selectedOption === "Shopping"}
            onChange={() => handleOptionChange("Shopping")}
          />
          Shopping
        </label>

        <label
          className={`radio-button ${
            selectedOption === "Transportation" && "selected"
          }`}
        >
          <input
            type="radio"
            name="expenseType"
            value="Transportation"
            checked={selectedOption === "Transportation"}
            onChange={() => handleOptionChange("Transportation")}
          />
          Transportation
        </label>

        <label
          className={`radio-button ${selectedOption === "Fun" && "selected"}`}
        >
          <input
            type="radio"
            name="expenseType"
            value="Fun"
            checked={selectedOption === "Fun"}
            onChange={() => handleOptionChange("Fun")}
          />
          Fun
        </label>

        <label
          className={`radio-button ${
            selectedOption === "Health" && "selected"
          }`}
        >
          <input
            type="radio"
            name="expenseType"
            value="Health"
            checked={selectedOption === "Health"}
            onChange={() => handleOptionChange("Health")}
          />
          Health
        </label>

        <label
          className={`radio-button ${
            selectedOption === "Salary" && "selected"
          }`}
        >
          <input
            type="radio"
            name="expenseType"
            value="Salary"
            checked={selectedOption === "Salary"}
            onChange={() => handleOptionChange("Salary")}
          />
          Salary
        </label>

        <label
          className={`radio-button ${selectedOption === "Gift" && "selected"}`}
        >
          <input
            type="radio"
            name="expenseType"
            value="Gift"
            checked={selectedOption === "Gift"}
            onChange={() => handleOptionChange("Gift")}
          />
          Gift
        </label>

        <label
          className={`radio-button ${selectedOption === "Loan" && "selected"}`}
        >
          <input
            type="radio"
            name="expenseType"
            value="Loan"
            checked={selectedOption === "Loan"}
            onChange={() => handleOptionChange("Loan")}
          />
          Loan
        </label>

        <label
          className={`radio-button ${
            selectedOption === "Gambling" && "selected"
          }`}
        >
          <input
            type="radio"
            name="expenseType"
            value="Gambling"
            checked={selectedOption === "Gambling"}
            onChange={() => handleOptionChange("Gambling")}
          />
          Gambling
        </label>
      </div>

      {/* DATE SEARCH */}
      <button className="buttonsearch" onClick={promeniDateFlag}>SEARCH BY DATE</button>
      {dateFlag && (
        <div className="date-search-container">
          <label htmlFor="datepicker">Choose a date:</label>
          <input
            type="date"
            id="datepicker"
            value={selectedDate}
            onChange={handleDateChange}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      )}
      {/* LISTA AKTIVNOSTI */}
      <div className="list">
        {expensesAndIncomes.slice().reverse().map((item, index) => (
          <div key={index} className="item">
            <div className={`itemicon ${item.kategorija}`}>
              {item.kategorija === "Shopping" && <FaShoppingCart />}
              {item.kategorija === "Transportation" && <FaCar />}
              {item.kategorija === "Fun" && <IoGameController />}
              {item.kategorija === "Health" && <MdHealthAndSafety />}
              {item.kategorija === "Other1" && <BsThreeDots />}
              {item.kategorija === "Other2" && <BsThreeDots />}
              {item.kategorija === "Salary" && <FaMoneyBillAlt />}
              {item.kategorija === "Loan" && <MdVolunteerActivism />}
              {item.kategorija === "Gift" && <FaGift />}
              {item.kategorija === "Gambling" && <MdCasino />}
              {item.kategorija === "Food" && <MdFastfood />}
            </div>
            <div className="itemright">
              <div className="itemright1">
                <p className="itemright2 naslov">{item.kategorija}</p>
                <p
                  className={
                    item.kategorija === "Salary" ||
                    item.kategorija === "Gift" ||
                    item.kategorija === "Loan" ||
                    item.kategorija === "Gambling" ||
                    item.kategorija === "Other2"
                      ? "itemright3 pareplus"
                      : "itemright3 pareminus"
                  }
                >
                  {item.kategorija === "Salary" ||
                  item.kategorija === "Gift" ||
                  item.kategorija === "Loan" ||
                  item.kategorija === "Gambling" ||
                  item.kategorija === "Other2"
                    ? "+"
                    : "-"}
                  €{item.iznos}
                </p>
              </div>
              <div className="itemright1">
                <p className="itemright2 opis">{item.opis}</p>
                <p className="itemright3 opis datumbrt">{`${item.datum} ${item.vreme}`}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;

