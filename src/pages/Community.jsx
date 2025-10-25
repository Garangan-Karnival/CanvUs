import React, { useEffect, useState } from 'react'
import './Community.css'
import { getPosts, addPost, addComment, deletePost, deleteComment } from '../utils/communityStore'

const USER_KEY = 'community_current_user'

export default function Community() {
  const [posts, setPosts] = useState([])
  const [caption, setCaption] = useState('')
  const [preview, setPreview] = useState(null)
  const [commentText, setCommentText] = useState({})
  const [replyTarget, setReplyTarget] = useState(null)
  const [currentUser, setCurrentUser] = useState(() => localStorage.getItem(USER_KEY) || 'Anonymous')

  useEffect(() => {
    setPosts(getPosts())
  }, [])

  useEffect(() => {
    localStorage.setItem(USER_KEY, currentUser)
  }, [currentUser])

  const handleImageUpload = (e) => {
    const file = e.target.files && e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setPreview(reader.result)
    reader.readAsDataURL(file)
  }

  const handleShare = () => {
    // allow posts with either an image or a caption (or both)
    if (!preview && (!caption || caption.trim() === '')) return alert('Please provide an image or a caption to share')
    const newPost = addPost({ image: preview || null, caption, author: currentUser })
    setPosts((p) => [newPost, ...p])
    setCaption('')
    setPreview(null)
  }

  const handleAddComment = (postId, parentId = null) => {
    const text = commentText[parentId || postId]
    if (!text || text.trim() === '') return
    const c = addComment(postId, currentUser, text.trim(), parentId)
    setPosts(getPosts())
    setCommentText((s) => ({ ...s, [parentId || postId]: '' }))
    setReplyTarget(null)
  }

  const handleDeletePost = (postId) => {
    if (!window.confirm('Delete this post?')) return
    deletePost(postId)
    setPosts(getPosts())
  }

  const handleDeleteComment = (postId, commentId, parentId = null) => {
    if (!window.confirm('Delete this comment?')) return
    deleteComment(postId, commentId, parentId)
    setPosts(getPosts())
  }

  const renderComments = (post) => {
    return post.comments.map((c) => (
      <div key={c.id} className="comment-block">
        <div className="comment-row">
          <b>{c.author === currentUser ? 'You' : c.author}</b>
          {c.author === post.author && <span className="badge">author</span>}
          {c.author === currentUser && <span className="badge you">you</span>}
          <div className="comment-text">{c.text}</div>
        </div>
        <div className="comment-actions">
          <button className="reply-link" onClick={() => setReplyTarget({ postId: post.id, commentId: c.id })}>Reply</button>
          <button className="delete-link" onClick={() => handleDeleteComment(post.id, c.id)}>Delete</button>
        </div>
        <div className="replies">
          {(c.replies || []).map((r) => (
            <div key={r.id} className="reply-row">
              <b>{r.author === currentUser ? 'You' : r.author}</b>
              {r.author === post.author && <span className="badge">author</span>}
              {r.author === currentUser && <span className="badge you">you</span>}
              <div className="comment-text">{r.text}</div>
              <button className="delete-link" onClick={() => handleDeleteComment(post.id, r.id, c.id)}>Delete</button>
            </div>
          ))}
        </div>
        {replyTarget && replyTarget.commentId === c.id && (
          <div className="reply-box">
            <input value={commentText[c.id] || ''} onChange={(e) => setCommentText((s) => ({ ...s, [c.id]: e.target.value }))} placeholder="Write a reply..." />
            <button onClick={() => handleAddComment(post.id, c.id)}>Reply</button>
            <button onClick={() => setReplyTarget(null)}>Cancel</button>
          </div>
        )}
      </div>
    ))
  }

  return (
    <div className="community-root">
      <h1>Welcome to the CanvUs Community!</h1>
      <h3>Make sure to follow the community guidelines!</h3>

      <section className="share-box">
        <h2>Post your image</h2>
        <label className="user-label">Your name: <input value={currentUser} onChange={(e) => setCurrentUser(e.target.value)} /></label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <textarea placeholder="Add a caption..." value={caption} onChange={(e) => setCaption(e.target.value)} />
        {preview && <img src={preview} alt="preview" className="preview" />}
        <button onClick={handleShare} className="share-btn">Share</button>
      </section>

      <section className="posts">
        {posts.length === 0 && <p>No posts yet.</p>}
        {posts.map((post) => (
          <article key={post.id} className="post">
            {post.image && <img src={post.image} alt={post.caption || 'post image'} className="post-image" />}
            <div className="post-body">
              {post.caption && <p className="post-caption">{post.caption}</p>}
              <p className="post-meta">by <b>{post.author}</b></p>
              <div className="comments">
                {renderComments(post)}
                <div className="add-comment">
                  <input value={commentText[post.id] || ''} onChange={(e) => setCommentText((s) => ({ ...s, [post.id]: e.target.value }))} placeholder="Write a comment..." />
                  <button onClick={() => handleAddComment(post.id)}>Comment</button>
                </div>
              </div>
              <div className="post-actions">
                <button className="delete-post" onClick={() => handleDeletePost(post.id)}>Delete Post</button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}