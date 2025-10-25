import React from 'react';
import './ToolButton.css';

const ToolButton = ({ icon: Icon, iconName, onClick, label, active = false, disabled = false }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`tool-button ${disabled ? 'disabled' : active ? 'active' : 'idle'}`}
    title={label}
    type="button"
  >
    {/* If iconName is provided, render a font icon (Material Icons); otherwise render component */}
    {iconName ? (
      <span className="material-icons tool-icon" aria-hidden="true">{iconName}</span>
    ) : Icon ? (
      <Icon className="tool-icon" size={20} aria-hidden="true" />
    ) : null}
  </button>
);

export default ToolButton;