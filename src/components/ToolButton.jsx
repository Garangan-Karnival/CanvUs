import React from 'react';
import './ToolButton.css';

const ToolButton = ({ icon: Icon, onClick, label, active = false, disabled = false }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`tool-button ${disabled ? 'disabled' : active ? 'active' : 'idle'}`}
    title={label}
    type="button"
  >
    <Icon size={24} color="currentColor" />
  </button>
);

export default ToolButton;