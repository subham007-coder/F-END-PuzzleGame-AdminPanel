import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import AdminPanel from "./Components/AdminPanel";
import Navbar from "./Components/Navbar";
import Dashboard from "./Components/DashBorad";

function App() {
  return (
    <Router>
      <div className="flex bg-gray-900 w-full h-screen">
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
