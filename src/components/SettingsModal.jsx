import React from 'react';
import { X } from 'lucide-react';
import './SettingsModal.css';

const SettingsModal = ({ tempWidth, tempHeight, setTempWidth, setTempHeight, setShowSettings, setCanvasWidth, setCanvasHeight }) => {
  const applySettings = (e) => {
    e.preventDefault();
    const w = parseInt(tempWidth, 10) || 0;
    const h = parseInt(tempHeight, 10) || 0;
    // clamp only on apply
    if (w > 0 && h > 0) {
      setCanvasWidth(Math.max(100, Math.min(4000, w)));
      setCanvasHeight(Math.max(100, Math.min(4000, h)));
      setShowSettings(false);
    }
  };

  return (
    <div className="settings-backdrop">
      <div className="settings-modal">
        <div className="settings-header">
          <h2 className="settings-title">Canvas Settings</h2>
          <button onClick={() => setShowSettings(false)} className="settings-close">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={applySettings} className="settings-form">
          <div className="settings-field">
            <label className="settings-label">Width (px)</label>
            <input type="number" min="100" max="4000" value={tempWidth}
              onChange={(e) => setTempWidth(e.target.value)}
              className="settings-input"
            />
          </div>
          <div className="settings-field">
            <label className="settings-label">Height (px)</label>
            <input type="number" min="100" max="4000" value={tempHeight}
              onChange={(e) => setTempHeight(e.target.value)}
              className="settings-input"
            />
          </div>
          <button type="submit" className="settings-apply">
            Apply Size
          </button>
        </form>
      </div>
    </div>
  );
};

export default SettingsModal;