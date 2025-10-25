import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import { Home, Info, Library, Pencil, Users } from "lucide-react";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo">CanvUs</h2>
      <nav>
        <NavLink to="/" end className="nav-item">
            <Home className="icon" />
            Home
        </NavLink>
        <NavLink to="/about" className="nav-item">
            <Info className="icon" />
            About
        </NavLink>
        <NavLink to="/library" className="nav-item">
            <Library className="icon" />
            Library
        </NavLink>
        <NavLink to="/draw" className="nav-item">
            <Pencil className="icon" />
            Draw
        </NavLink>
        <NavLink to="/community" className="nav-item">
            <Users className="icon" />
            Community
        </NavLink>
      </nav>
      <div className="footer">
      <p>Insta: @canvusisus</p>
      <p>X: @CanvUs</p>
      <p>Email us at: canvUs@gmail.com</p>
      </div>
      <p>Copyright ©CanvUs</p>
    </div>
  );
}

export default Sidebar;
