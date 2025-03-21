import React from "react";
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './Components/AdminLogin';
import AdminPanel from './Components/AdminPanel';
import Navbar from "./Components/Navbar";
import Dashboard from "./Components/DashBorad";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const isAuthenticated = !!localStorage.getItem('adminToken');

  return (
    <Router>
      <ToastContainer />
      <div className="flex bg-gray-900 w-full h-screen">
        {isAuthenticated && <Navbar />}
        <main className="flex-1">
          <Routes>
            <Route path="/login" element={
              !isAuthenticated ? <AdminLogin /> : <Navigate to="/dashboard" />
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/add-song" element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            } />
            <Route path="/" element={
              !isAuthenticated ? <Navigate to="/login" /> : <Navigate to="/dashboard" />
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function ProtectedRoute({ children }) {
  const adminToken = localStorage.getItem('adminToken');
  
  if (!adminToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default App;
