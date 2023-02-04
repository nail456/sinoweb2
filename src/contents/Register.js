import React, { useState } from "react";
import Login from "./Login";
import "./style.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    if (!email) {
      setError("Email is required");
    } else if (!firstname){
      setError("Firstname is required");
    } else if (!lastname) {
      setError("Lastname is required");
    } else if (!password) {
      setError("Password is required");
    } else if (!confirmPassword){
      setError("Please confirm password");
    } else if (confirmPassword !== password){
      setError("Password doesn't match");
    } else if (firstname && lastname && email && confirmPassword === password) {
      setError("");
      // Post the registration data to the API
      fetch("http://localhost:4000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, firstname, lastname }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            // Redirect to the Login page
            setShowPopup(true);
          }
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  };

  const [isLogin, setIsLogin] = React.useState(false);

  if (isLogin) {
    return <Login />;
  }

  const handleClosePopup = () => {
    setShowPopup(false);
    // Redirect to the Login page
    setIsLogin(true);
  };

  return (
    <div className="register-container">
      <form className="register-form">
        <h2 className="title">Register</h2>
        {error && <div className="error">{error}</div>}
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="firstname"
            className="form-control"
            placeholder="First Name"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="lastname"
            className="form-control"
            placeholder="Last Name"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="button"
          className="btn btn-secondary"
          onClick={() => setIsLogin(true)}>
          Back
        </button>
        <button className="btn btn-primary" onClick={handleRegister}>
          Register
        </button>
      </form>
      {showPopup && (
        <div className="popup-content">
          <div className="popup">
            <h3 className="popup-title">Registration Successful!</h3>
            <p className="popup-message">Your account has been created successfully.</p>
            <button className="btn btn-secondary" onClick={handleClosePopup}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;

