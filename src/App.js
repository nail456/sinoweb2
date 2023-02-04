import React, { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';
import Register from './contents/Register';
import Login from './contents/Login';
import HomePage from './contents/Home';

function App() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);

  useEffect(() => {
    if (email) {
      fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password })
      })
        .then((res) => {
          res.json()
          setFirstName(res.firstName);
          setLastName(res.lastName);
        })
        .then((user) => {
          if (user.error) {
            <Login onLogin={email => setEmail(email)} />
          } else {
            setFirstName(user.firstName);
            setLastName(user.lastName);
          }
        });
    }
  }, [email]);

  return (
    <div className="app">
      {email ? (
        <HomePage email={email} firstName={firstName} lastName={lastName} />
      ) : (
        <Login onLogin={email => setEmail(email)} />
      )}
    </div>
  );
}

export default App;
