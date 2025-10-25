// Simple localStorage-backed community store
const STORAGE_KEY = 'community_posts_v1';

function read() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('communityStore read error', e);
    return [];
  }
}

function write(posts) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  } catch (e) {
    console.error('communityStore write error', e);
  }
}

export function getPosts() {
  return read();
}

export function addPost({ image, caption, author }) {
  const posts = read();
  const post = {
    id: Date.now().toString(),
    image,
    caption: caption || '',
    author: author || 'Anonymous',
    comments: [],
    createdAt: new Date().toISOString(),
  };
  posts.unshift(post);
  write(posts);
  return post;
}

export function addComment(postId, author, text, parentId = null) {
  const posts = read();
  const idx = posts.findIndex((p) => p.id === postId);
  if (idx === -1) return null;
  const comment = {
    id: Date.now().toString(),
    author: author || 'Anonymous',
    text,
    replies: [],
    createdAt: new Date().toISOString(),
  };

  if (!parentId) {
    posts[idx].comments.push(comment);
  } else {
    // find parent comment and append to its replies
    const parent = posts[idx].comments.find((c) => c.id === parentId);
    if (parent) {
      parent.replies = parent.replies || [];
      parent.replies.push(comment);
    } else {
      // if parent not found, append as top-level comment
      posts[idx].comments.push(comment);
    }
  }

  write(posts);
  return comment;
}

// Add delete helpers: delete a post or delete a comment/reply
export function deletePost(postId) {
  const posts = read();
  const next = posts.filter((p) => p.id !== postId);
  write(next);
  return true;
}

export function deleteComment(postId, commentId, parentId = null) {
  const posts = read();
  const idx = posts.findIndex((p) => p.id === postId);
  if (idx === -1) return false;
  if (!parentId) {
    posts[idx].comments = posts[idx].comments.filter((c) => c.id !== commentId);
  } else {
    const parent = posts[idx].comments.find((c) => c.id === parentId);
    if (parent && parent.replies) {
      parent.replies = parent.replies.filter((r) => r.id !== commentId);
    }
  }
  write(posts);
  return true;
}
