import React from "react";
import Register from "./Register";
import axios from 'axios';

import "./style.css";

function Login() {
  const [isRegister, setIsRegister] = React.useState(false);

  if (isRegister) {
    return <Register />;
  }

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
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            className="form-control"
          />
        </div>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setIsRegister(true)}
        >
          Register
        </button>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
