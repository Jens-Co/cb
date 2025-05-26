import React from "react";
import { HashRouter as Router } from 'react-router-dom';
import AppRoutes from "./Route";
import "./main.css";
import Navbar from "./components/NavBar";

export default function App() {
  return (
    <Router>
      <Navbar />
      <main
        id="primary-app-container"
        tabIndex={-1}
        className="max-w-6xl mx-auto p-4"
      >
        <AppRoutes />
      </main>
    </Router>
  );
}
