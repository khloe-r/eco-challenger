import React from "react";
import "./App.css";

import Welcome from "./pages/Welcome";
import SignUp from "./pages/SignUp";
import Team from "./pages/Team";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/teams/:team_id" element={<Team />} />
      </Routes>
    </div>
  );
}

export default App;
