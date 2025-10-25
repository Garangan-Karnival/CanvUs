import { useState, useCallback, useRef } from 'react';

// Robust history hook for canvas using data URLs and refs for sync
export default function useCanvasHistory(canvasRef) {
  const historyRef = useRef([]);
  const indexRef = useRef(-1);

  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const pushUrl = useCallback((url) => {
    const next = historyRef.current.slice(0, indexRef.current + 1);
    next.push(url);
    historyRef.current = next;
    indexRef.current = next.length - 1;
    setHistory(next);
    setHistoryIndex(indexRef.current);
  }, []);

  const saveCanvasState = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      const url = canvas.toDataURL();
      pushUrl(url);
    } catch (err) {
      // toDataURL can fail on tainted canvases; fail gracefully
      // eslint-disable-next-line no-console
      console.error('saveCanvasState error:', err);
    }
  }, [canvasRef, pushUrl]);

  const restoreCanvasState = useCallback((dataUrl) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!dataUrl) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }
    const img = new Image();
    img.onload = () => {
      try {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('restoreCanvasState draw error:', err);
      }
    };
    img.src = dataUrl;
  }, []);

  const handleUndo = useCallback(() => {
    if (indexRef.current <= 0) return;
    indexRef.current -= 1;
    setHistoryIndex(indexRef.current);
    const url = historyRef.current[indexRef.current];
    restoreCanvasState(url);
  }, [restoreCanvasState]);

  const handleRedo = useCallback(() => {
    if (indexRef.current >= historyRef.current.length - 1) return;
    indexRef.current += 1;
    setHistoryIndex(indexRef.current);
    const url = historyRef.current[indexRef.current];
    restoreCanvasState(url);
  }, [restoreCanvasState]);

  return { history, historyIndex, saveCanvasState, restoreCanvasState, handleUndo, handleRedo };
}
