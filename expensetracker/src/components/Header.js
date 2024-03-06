import React, { useState } from "react";
// import { TiArrowSortedDown } from "react-icons/ti";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [flag, setFlag] = useState(false);

  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/login");
  };

  const dropdownLogOut = () => {
    setFlag(!flag);
  };



  return (
    <header>
      <h1>Expense tracker</h1>

      <div className="welcome" onClick={dropdownLogOut}>
        Welcome, Ime{" "}
        <div className="reacticon">
          <IoIosArrowDropdownCircle />
        </div>
      </div>

      <div>
        {flag && (
          <div className="logout" onClick={handleLogout}>
            Logout
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
