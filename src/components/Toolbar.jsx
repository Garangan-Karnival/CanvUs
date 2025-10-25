import React from 'react';
import { Palette, Pencil, Eraser, Grid, Download, X, Settings, Minus, Plus, RotateCcw, RotateCw, Square, Circle } from 'lucide-react';
import ToolButton from './ToolButton.jsx';
import './Toolbar.css';

const Toolbar = ({
  tool, setTool, color, setColor, lineWidth, setLineWidth,
  handleUndo, handleRedo, handleClear, handleSave,
  gridVisible, setGridVisible, showSettings, setShowSettings,
  historyIndex, historyLength
}) => (
  <div className="toolbar">
    <ToolButton icon={RotateCcw} onClick={handleUndo} label="Undo" disabled={historyIndex <= 0} />
    <ToolButton icon={RotateCw} onClick={handleRedo} label="Redo" disabled={historyIndex >= historyLength - 1} />

    <ToolButton icon={Pencil} onClick={() => setTool('pencil')} label="Pencil" active={tool === 'pencil'} />
    <ToolButton icon={Eraser} onClick={() => setTool('eraser')} label="Eraser" active={tool === 'eraser'} />
    <ToolButton icon={Square} onClick={() => setTool('rectangle')} label="Rectangle" active={tool === 'rectangle'} />
    <ToolButton icon={Circle} onClick={() => setTool('circle')} label="Circle" active={tool === 'circle'} />

    <div className="color-picker" title="Select Color">
      <input
        type="color"
        value={color}
        onChange={(e) => { setColor(e.target.value); setTool('pencil'); }}
        className="color-input"
      />
      <Palette size={24} style={{ color }} />
    </div>

    <div className="stroke-control">
      <button onClick={() => setLineWidth(p => Math.max(1, p - 1))} className="stroke-btn">-</button>
      <span className="stroke-value">{lineWidth}px</span>
      <button onClick={() => setLineWidth(p => Math.min(50, p + 1))} className="stroke-btn">+</button>
    </div>

    <ToolButton icon={Grid} onClick={() => setGridVisible(!gridVisible)} label="Grid" active={gridVisible} />
    <ToolButton icon={Settings} onClick={() => setShowSettings(true)} label="Settings" active={showSettings} />
    <ToolButton icon={X} onClick={handleClear} label="Clear" />
    <ToolButton icon={Download} onClick={handleSave} label="Save" />
  </div>
);

export default Toolbar;