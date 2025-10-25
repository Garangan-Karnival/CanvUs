import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo">CanvUs</h2>
      <nav>
        <NavLink to="/" end className="nav-item">
            <span className="icon">🏠</span>
            Home
        </NavLink>
        <NavLink to="/about" className="nav-item">
            <span className="icon">ℹ️</span>
            About
        </NavLink>
        <NavLink to="/library" className="nav-item">
            <span className="icon">📚</span>
            Library
        </NavLink>
        <NavLink to="/draw" className="nav-item">
            <span className="icon">✏️</span>
            Draw
        </NavLink>
        <NavLink to="/community" className="nav-item">
            <span className="icon">👥</span>
            Community
        </NavLink>
      </nav>
      <p>©CanvUs</p>
    </div>
  );
}

export default Sidebar;
