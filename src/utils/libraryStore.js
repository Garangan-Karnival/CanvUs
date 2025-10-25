// Simple localStorage-backed library for saved images
const LIB_KEY = 'canvus_library_v1';

function read() {
  try {
    const raw = localStorage.getItem(LIB_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('libraryStore read error', e);
    return [];
  }
}

function write(items) {
  try {
    localStorage.setItem(LIB_KEY, JSON.stringify(items));
  } catch (e) {
    console.error('libraryStore write error', e);
  }
}

export function getLibrary() {
  return read();
}

export function addImage({ image, caption }) {
  const items = read();
  const entry = {
    id: Date.now().toString(),
    image,
    caption: caption || '',
    createdAt: new Date().toISOString(),
  };
  items.unshift(entry);
  write(items);
  return entry;
}

export function deleteImage(id) {
  const items = read().filter((i) => i.id !== id);
  write(items);
  return true;
}
