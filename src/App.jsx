import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminPanel from "./Components/AdminPanel";
import Navbar from "./Components/Navbar";
import Dashboard from "./Components/DashBorad";

function App() {
  return (
    <Router>
      <div className="flex">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/new-project" element={<AdminPanel />} />
            {/* Add more routes as needed */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;