import React from 'react';
import './GridOverlay.css';

const GridOverlay = ({ width, height }) => {
  const gridSize = 20;
  const rows = Math.floor(height / gridSize);
  const cols = Math.floor(width / gridSize);
  const lines = [];

  for (let i = 1; i < rows; i++) {
    lines.push(<line key={`h${i}`} x1="0" y1={i * gridSize} x2={width} y2={i * gridSize} stroke="#e0e0e0" />);
  }
  for (let j = 1; j < cols; j++) {
    lines.push(<line key={`v${j}`} x1={j * gridSize} y1="0" x2={j * gridSize} y2={height} stroke="#e0e0e0" />);
  }

  return (
    <svg className="grid-overlay" width={width} height={height}>
      {lines}
    </svg>
  );
};

export default GridOverlay;