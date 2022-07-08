import React, { useState } from "react";
import "./App.css";

import Welcome from "./pages/Welcome";
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Team from "./pages/Team";

import { Routes, Route } from "react-router-dom";

function App() {
  const [user, setUser] = useState({ loggedIn: "false", username: "" });
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Welcome user={user} />} />
        <Route path="/welcome" element={<Welcome user={user} />} />
        <Route path="/dashboard" element={<Dashboard setUser={setUser} user={user} />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/log-in" element={<LogIn setUser={setUser} user={user} />} />
        <Route path="/teams/:team_id" element={<Team user={user} />} />
      </Routes>
    </div>
  );
}

export default App;
