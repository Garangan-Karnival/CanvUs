import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import About from "./pages/About";
import Library from "./pages/Library";
import Draw from "./pages/Draw";
import Community from "./pages/Community";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/library" element={<Library />} />
          <Route path="/draw" element={<Draw />} />
          <Route path="/community" element={<Community />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
