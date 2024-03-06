"use client"

import React from "react";
import "./style.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getMoneyValues, loginUser } from "../mongoAPI";
import { useRef } from "react";
import { sha256 } from "../sha256";

const Login = () => {
  const router = useRouter();

  const userRef = useRef(null);
  const passRef = useRef(null);


  const handleLogin = async (e) => 
  {
    e.preventDefault()
    if (
      userRef.current.value !== null &&
      userRef.current.value.trim() !== "" &&
      passRef.current.value !== null &&
      passRef.current.value.trim() !== ""
    ) 
    {
      let ans = await loginUser(userRef.current.value.trim(), sha256(passRef.current.value.trim()))
      if(ans.length === 1)
      {  
        localStorage.setItem("korisnik", ans[0].username)
        //getMoneyValues() //!!!!!!!!!!!!!!!!!
        router.push(`/homepage`)
      }
      else
      {
        alert("Login failed.")
      }
    }
    else
    {
      alert("All fields are required.")
    }
  }


  return (
    <div className="bodyloginregister">
      <div className="login-page">
        <div className="form">
          <div className="login">
            <div className="login-header">
              <h3>LOGIN</h3>
              <p>Please enter your credentials to login.</p>
            </div>
          </div>
          <form className="login-form">
            <input type="text" placeholder="username" ref={userRef} />
            <input type="password" placeholder="password" ref={passRef} />
            <button onClick={(e) => handleLogin(e)}>login</button>
            <p className="message">
              Not registered? <Link href="/register">Create an account</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
