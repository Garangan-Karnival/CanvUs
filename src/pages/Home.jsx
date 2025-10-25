import React from "react";
import { NavLink } from "react-router-dom";
import "./Home.css";
import top_image_1 from '../images/image_1.jpg'
import top_image_2 from '../images/image_2.jpg'
import top_image_3 from '../images/image_3.png'

export default function Home() {
  return (
    <div className="wrapper">
      <div className="welcomeTitle">
        <h1>Welcome to CanvUs!</h1>
        <h3>A place where every idea finds its canvas</h3>
      </div>
      <div className="buttons">
        <NavLink to="/draw" className="home-button">
            <p>✏️ Start drawing!</p>
        </NavLink>
        <NavLink to="/community" className="home-button">
            <p>👥 Take a look at our community?</p>
        </NavLink>
      </div>
      <div className="showcase">
        <h2>Our Top & Best Community-rated Drawing</h2>
        <div className="card-wrap">
        <div className="showcase-card">
          <img src={top_image_1} alt="showcase 1" />
          <p>"Labubu" by AlexJoker123</p>
        </div>
        <div className="showcase-card">
          <img src={top_image_2} alt="showcase 2" />
          <p>"Tralalero Tralala" by DrTirtaGanteng</p>
        </div>
        <div className="showcase-card">
          <img src={top_image_3} alt="showcase 3" />
          <p>"Alakabumbum" by MrBrrBrrPatapim</p>
        </div>
        </div>
      </div>
    </div>
  );
}
