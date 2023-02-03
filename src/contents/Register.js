import React, { useState } from "react";
import Login from "./Login";
import "./style.css";

function Register() {
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    console.log("Email:", email);
    console.log("Firstname:", firstname);
    console.log("Lastname:", lastname);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);
  };

  const [isLogin, setIsLogin] = React.useState(false);

  if (isLogin) {
    return <Login />;
  }

  return (
    <div className="register-container">
      <h2 className="register-title">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email"
            id="email"
            value={email}
            onChange={event => setEmail(event.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstname">First Name:</label>
          <input type="firstname"
            id="firstname"
            value={firstname}
            onChange={event => setFirstname(event.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastname">Last Name:</label>
          <input type="lastname"
            id="lastname"
            value={lastname}
            onChange={event => setLastname(event.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={event => setConfirmPassword(event.target.value)}
            className="form-control"
          />
        </div>
        <button type="button"
          className="btn btn-secondary"
          onClick={() => setIsLogin(true)}>
          Back
        </button>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;

