import React from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const handleRegister = () => {
    navigate("/login"); // ili bilo koju drugu rutu na koju želite da preusmerite korisnika
  };

  return (
    <div className="bodyloginregister">
      <div className="login-page">
        <div className="form">
          <div className="login">
            <div className="login-header">
              <h3>REGISTER</h3>
              <p>Enter your information to create an account.</p>
            </div>
          </div>
          <form className="login-form">
            <input type="text" placeholder="username" />
            <input type="password" placeholder="password" />
            <button onClick={handleRegister}>register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
