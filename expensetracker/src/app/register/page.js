"use client";

import React from "react";
import { checkUser, registerUser, makeChartInfo } from "../mongoAPI";
import { useRef } from "react";
import "./style.css";
import { useRouter } from "next/navigation";
import { sha256 } from "../sha256";

const Register = () => {
  const userRef = useRef(null);
  const passRef = useRef(null);

  const router = useRouter();

  const handleRegister = async (e) => 
  {
    e.preventDefault();
    if (
      userRef.current.value !== null && userRef.current.value.trim() !== "" &&
      passRef.current.value !== null && passRef.current.value.trim() !== "" ) 
    {
      let ans = await checkUser(userRef.current.value.trim())
      if (ans.length === 0)
      {
        await registerUser(userRef.current.value.trim(), sha256(passRef.current.value.trim()))
        await makeChartInfo(userRef.current.value.trim())
        alert("Uspesno ste se registrovali!")    
        router.push("/login");
      }
      else
        alert("Korisnik vec postoji u bazi!")
    }
    else
      alert("Morate da uneste sva polja!")
  }


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
            <input type="text" placeholder="username" ref={userRef} />
            <input type="password" placeholder="password" ref={passRef} />
            <button onClick={(e) => handleRegister(e)}>register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
