import React, { useEffect, useState } from 'react';
import './Library.css';
import { getLibrary, deleteImage } from '../utils/libraryStore';

export default function Library() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getLibrary());
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm('Delete this image from library?')) return;
    deleteImage(id);
    setItems(getLibrary());
  };

  return (
    <div className="library-root">
      <h1>Your Library</h1>
      <h3>Look at your masterpiece(s) here!</h3>
      {items.length === 0 && <p>No saved images.</p>}
      <div className="library-grid">
        {items.map((it) => (
          <div className="library-item" key={it.id}>
            <img src={it.image} alt={it.caption || 'library image'} />
            <div className="caption">{it.caption}</div>
            <button className="delete-img" onClick={() => handleDelete(it.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}