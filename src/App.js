import React from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Register from './components/Register';
import LoginPage from './components/Login';
import HomePage from './components/Home';
import StorePage from './components/StorePage'
import { UserProvider } from './components/UserContext';

function App() {

  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/home" element={<HomePage/>} />
          <Route path="/store" element={<StorePage/>} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
