import React from 'react';
import ToolButton from './ToolButton.jsx';
import './Toolbar.css';

const Toolbar = ({
  tool, setTool, color, setColor, lineWidth, setLineWidth,
  handleUndo, handleRedo, handleClear, handleSave,
  gridVisible, setGridVisible, showSettings, setShowSettings,
  historyIndex, historyLength
}) => (
  <div className="toolbar">
  <ToolButton iconName="undo" onClick={handleUndo} label="Undo" disabled={historyIndex <= 0} />
  <ToolButton iconName="redo" onClick={handleRedo} label="Redo" disabled={historyIndex >= historyLength - 1} />

  <ToolButton iconName="edit" onClick={() => setTool('pencil')} label="Pencil" active={tool === 'pencil'} />
  {/* Use 'close' (X) as the eraser icon per request */}
  <ToolButton iconName="close" onClick={() => setTool('eraser')} label="Eraser" active={tool === 'eraser'} />
  <ToolButton iconName="crop_square" onClick={() => setTool('rectangle')} label="Rectangle" active={tool === 'rectangle'} />
  <ToolButton iconName="circle" onClick={() => setTool('circle')} label="Circle" active={tool === 'circle'} />

    <div className="color-picker" title="Select Color">
      <input
        type="color"
        value={color}
        onChange={(e) => { setColor(e.target.value); setTool('pencil'); }}
        className="color-input"
      />
  <span className="material-icons" style={{ color, fontSize: 20 }}>palette</span>
    </div>

    <div className="stroke-control">
  <ToolButton iconName="remove" onClick={() => setLineWidth(p => Math.max(1, p - 1))} label="Decrease stroke" />
      <span className="stroke-value">{lineWidth}px</span>
  <ToolButton iconName="add" onClick={() => setLineWidth(p => Math.min(50, p + 1))} label="Increase stroke" />
    </div>

  <ToolButton iconName="grid_view" onClick={() => setGridVisible(!gridVisible)} label="Grid" active={gridVisible} />
  <ToolButton iconName="settings" onClick={() => setShowSettings(true)} label="Settings" active={showSettings} />
  {/* Use trashcan for Clear action */}
  <ToolButton iconName="delete" onClick={handleClear} label="Clear" />
  <ToolButton iconName="download" onClick={handleSave} label="Save" />
  </div>
);

export default Toolbar;