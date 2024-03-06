"use client"
import React, { useState } from "react";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { useRouter } from "next/navigation";

const Header = () => {
  const [flag, setFlag] = useState(false);

  const dropdownLogOut = () => {
    setFlag(!flag);
  };

  const router = useRouter();

  const logOut = () => {
    localStorage.clear()
    router.push("/login");
  };

  return (
    <header>
      <h1>Expense Tracker</h1>

      <div className="welcome" onClick={dropdownLogOut}>
        Welcome, {localStorage.getItem("korisnik")}
        <div className="reacticon">
          <IoIosArrowDropdownCircle />
        </div>
      </div>

      <div>
        {flag && (
          <div className="logout" onClick={logOut}>
            Logout
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
