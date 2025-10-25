import React, { useState, useRef, useEffect, useCallback } from 'react';
import './Draw.css';
import useCanvasHistory from '../hooks/useCanvasHistory';
import { Palette, Pencil, Eraser, Grid, Download, X, Settings, Minus, Plus, RotateCcw, RotateCw, Square, Circle } from 'lucide-react';
import Toolbar from '../components/Toolbar.jsx';
import GridOverlay from '../components/GridOverlay.jsx';
import SettingsModal from '../components/SettingsModal.jsx';

const Draw = () => {
  const [tool, setTool] = useState('pencil');
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(5);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [endPoint, setEndPoint] = useState({ x: 0, y: 0 });
  const [canvasWidth, setCanvasWidth] = useState(800);
  const [canvasHeight, setCanvasHeight] = useState(600);
  const [tempWidth, setTempWidth] = useState(800);
  const [tempHeight, setTempHeight] = useState(600);
  const [showSettings, setShowSettings] = useState(false);
  const [gridVisible, setGridVisible] = useState(true);

  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const snapshotRef = useRef(null);

  const { history, historyIndex, saveCanvasState, restoreCanvasState, handleUndo, handleRedo } =
    useCanvasHistory(canvasRef);

  /** Canvas setup and reinitialization **/
  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    contextRef.current = ctx;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    if (history.length === 0) saveCanvasState();
    else restoreCanvasState(history[historyIndex]);
  }, [canvasWidth, canvasHeight, history, historyIndex, saveCanvasState, restoreCanvasState]);

  useEffect(() => {
    setupCanvas();
  }, [setupCanvas]);

  /** Update context when tool/color changes **/
  useEffect(() => {
    const ctx = contextRef.current;
    if (!ctx) return;
    if (tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = lineWidth * 2;
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
    }
    // ensure subsequent strokes use the new styles
    try { ctx.beginPath(); } catch (e) { /* ignore if ctx not ready */ }
  }, [tool, color, lineWidth]);

  /** Drawing logic **/
  const getCoords = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    // Support mouse events, touch events, and React synthetic events
    let clientX = null;
    let clientY = null;

    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if (e.changedTouches && e.changedTouches.length > 0) {
      clientX = e.changedTouches[0].clientX;
      clientY = e.changedTouches[0].clientY;
    } else if (typeof e.clientX === 'number' && typeof e.clientY === 'number') {
      clientX = e.clientX;
      clientY = e.clientY;
    } else if (e.nativeEvent && e.nativeEvent.touches && e.nativeEvent.touches.length > 0) {
      clientX = e.nativeEvent.touches[0].clientX;
      clientY = e.nativeEvent.touches[0].clientY;
    }

    if (clientX == null || clientY == null) return { x: 0, y: 0 };

    const x = clientX - rect.left;
    const y = clientY - rect.top;
    return { x, y };
  };

  const startDrawing = (e) => {
    if (historyIndex < history.length - 1) restoreCanvasState(history[historyIndex]);
    const { x, y } = getCoords(e);
    setIsDrawing(true);
    setStartPoint({ x, y });
    setEndPoint({ x, y });

    const ctx = contextRef.current;
    if (!ctx) return;
    if (tool === 'pencil' || tool === 'eraser') {
      ctx.beginPath();
      ctx.moveTo(x, y);
    } else {
      snapshotRef.current = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    }
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const { x, y } = getCoords(e);
    const ctx = contextRef.current;
    setEndPoint({ x, y });

    if (tool === 'pencil' || tool === 'eraser') {
      ctx.lineTo(x, y);
      ctx.stroke();
    } else if (snapshotRef.current) {
      ctx.putImageData(snapshotRef.current, 0, 0);
      const w = x - startPoint.x;
      const h = y - startPoint.y;
      ctx.beginPath();
      if (tool === 'rectangle') ctx.strokeRect(startPoint.x, startPoint.y, w, h);
      else if (tool === 'circle') {
        ctx.ellipse(startPoint.x + w / 2, startPoint.y + h / 2, Math.abs(w / 2), Math.abs(h / 2), 0, 0, 2 * Math.PI);
        ctx.stroke();
      }
      ctx.closePath();
    }
  };

  const stopDrawing = (e) => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const ctx = contextRef.current;
    if (!ctx) return;

    if (tool !== 'pencil' && tool !== 'eraser' && snapshotRef.current) {
      const { x, y } = getCoords(e);
      ctx.putImageData(snapshotRef.current, 0, 0);
      const w = x - startPoint.x;
      const h = y - startPoint.y;
      ctx.beginPath();
      if (tool === 'rectangle') ctx.strokeRect(startPoint.x, startPoint.y, w, h);
      else if (tool === 'circle') {
        ctx.ellipse(startPoint.x + w / 2, startPoint.y + h / 2, Math.abs(w / 2), Math.abs(h / 2), 0, 0, 2 * Math.PI);
        ctx.stroke();
      }
      ctx.closePath();
      snapshotRef.current = null;
    }
    saveCanvasState();
  };

  /** Clear and save canvas **/
  const handleClear = () => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    saveCanvasState();
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    const temp = document.createElement('canvas');
    temp.width = canvas.width;
    temp.height = canvas.height;
    const ctx = temp.getContext('2d');
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, temp.width, temp.height);
    ctx.drawImage(canvas, 0, 0);
    const link = document.createElement('a');
    link.download = 'my-masterpiece.png';
    link.href = temp.toDataURL('image/png');
    link.click();
  };

  const handleShareToCommunity = (captionText = '') => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const temp = document.createElement('canvas');
    temp.width = canvas.width;
    temp.height = canvas.height;
    const ctx = temp.getContext('2d');
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, temp.width, temp.height);
    ctx.drawImage(canvas, 0, 0);
    const dataUrl = temp.toDataURL('image/png');

    // lazy import to avoid circular dependencies
    const { addPost } = require('../utils/communityStore');
    addPost({ image: dataUrl, caption: captionText });
    // optional: navigate to community page if using react-router
    try {
      const { useNavigate } = require('react-router-dom');
      const navigate = useNavigate();
      navigate('/community');
    } catch (e) {
      // ignore if not available in this scope
    }
  };

  return (
    <div className="draw-root">
      <h1 className="draw-title">My Drawspace</h1>

      <Toolbar
        tool={tool}
        setTool={setTool}
        color={color}
        setColor={setColor}
        lineWidth={lineWidth}
        setLineWidth={setLineWidth}
        handleUndo={handleUndo}
        handleRedo={handleRedo}
        handleClear={handleClear}
        handleSave={handleSave}
        gridVisible={gridVisible}
        setGridVisible={setGridVisible}
        showSettings={showSettings}
        setShowSettings={setShowSettings}
        historyIndex={historyIndex}
        historyLength={history.length}
        onShareToCommunity={handleShareToCommunity}
      />

      <div
        className="canvas-wrapper"
        style={{ width: canvasWidth, height: canvasHeight }}
      >
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseOut={() => setIsDrawing(false)}
          onTouchStart={startDrawing}
          onTouchMove={(e) => {
            e.preventDefault();
            draw(e);
          }}
          onTouchEnd={stopDrawing}
          className="draw-canvas"
        />
        {gridVisible && <GridOverlay width={canvasWidth} height={canvasHeight} />}
      </div>

      <p className="draw-footer">Canvas Size: {canvasWidth} × {canvasHeight}px</p>

      {showSettings && (
        <SettingsModal
          tempWidth={tempWidth}
          tempHeight={tempHeight}
          setTempWidth={setTempWidth}
          setTempHeight={setTempHeight}
          setShowSettings={setShowSettings}
          setCanvasWidth={setCanvasWidth}
          setCanvasHeight={setCanvasHeight}
        />
      )}
    </div>
  );
};

export default Draw;