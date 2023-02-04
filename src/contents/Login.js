import React, { useState } from "react";
import Register from "./Register";
import axios from 'axios';

import "./style.css";

function Login({ onLogin }) {
  const [isRegister, setIsRegister] = React.useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  if (isRegister) {
    return <Register />;
  }

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const res = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) {
        throw new Error("Incorrect email or password");
      }

      onLogin(email);
    } catch (error) {
      setError(error.message);
    }
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
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setIsRegister(true)}
        >
          Register
        </button>
        <button type="submit" className="btn btn-primary" onClick = {handleSubmit}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
