import React, { useState } from "react";
import { Link } from "react-router-dom";
// import Register from "./Register";
// import axios from 'axios';

import "./style.css";

const LoginPage = () => {
  // const [isRegister, setIsRegister] = React.useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // if (isRegister) {
  //   return <Link to="/home" />;
  // }

  const handleClosePopup = () => {

    setShowPopup(false);
    localStorage.setItem("email", email);
    // Redirect to the Login page
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const res = await fetch("http://172.20.10.5:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) {
        throw new Error("Incorrect email or password");
      } else {
        // setUserEmail(email);
        // alert(`Login Successfully User : ${email}`);
        // window.location.href = "/home";
        setShowPopup(true);
      }


    } catch (error) {
      setError(error.message);
    }
    // try {
    //   await firebase.auth().signInWithEmailAndPassword(email, password);
    // } catch (error) {
    //   setError(error.message);
    // }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            className="form-control"
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            className="form-control"
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        {error && <div className="error">{error}</div>}
        <p className="register-button">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
        <button type="submit" className="btn" onClick={handleSubmit}>
          Login
        </button>
      </form>
      {showPopup && (
        <div className="popup">
          <div className="content">
            <h3 className="popup-title">Login Successful!</h3>
            <p className="popup-message">Welcome back</p>
            <p className="popup-message">{email}</p>
            <Link to="/home">
              <button type="submit" className="btn btn-secondary" onClick={handleClosePopup}>
                OK
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
