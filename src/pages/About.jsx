import React from 'react';
import './About.css';

export default function About() {
  return (
    <main className="about-root">
      <section className="about-hero">
        <h1>About CanvUs</h1>
        <p className="lead">A lightweight collaborative sketching playground built for creativity and community.</p>
      </section>

      <section className="about-mission">
        <h2>Our Mission</h2>
        <p>
          We aim to make digital drawing simple, approachable, and social. CanvUs provides an easy canvas
          editor and a friendly community where creators can share work, get feedback, and collaborate.
        </p>
      </section>

      <section className="about-features">
        <h2>Features</h2>
        <ul>
          <li>Simple drawing tools: pencil, eraser, shapes, undo/redo.</li>
          <li>Save or share your work to the community feed.</li>
          <li>Lightweight, local-first storage — no account required.</li>
        </ul>
      </section>

      <section className="about-team">
        <h2>Team</h2>
        <p>Small group of hobbyist developers and designers passionate about creative tools.</p>
        <div className="team-grid">
          <div className="team-card">
            <div className="avatar">WFM</div>
            <div className="info">
              <strong>Weshley-FM</strong>
              <span>Frontend</span>
            </div>
          </div>
          <div className="team-card">
            <div className="avatar">TAN</div>
            <div className="info">
              <strong>The Amazing Nichi</strong>
              <span>Backend</span>
            </div>
          </div>
        </div>
      </section>

      <section className="about-contact">
        <h2>Contact</h2>
        <p>If you have feedback or want to contribute, open an issue or drop a message at info@canvus.example</p>
      </section>
    </main>
  );
}