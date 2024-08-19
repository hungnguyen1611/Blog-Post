import React, { useState, useEffect } from 'react';

function PostForm({ onAddPost, onEditPost, selectedPost }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (selectedPost) {
      setTitle(selectedPost.title);
      setContent(selectedPost.content);
    }
  }, [selectedPost]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedPost) {
      onEditPost(selectedPost._id, { title, content });
    } else {
      onAddPost({ title, content });
    }

    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Content</label>
        <textarea
          className="form-control"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {selectedPost ? 'Update Post' : 'Add Post'}
      </button>
    </form>
  );
}

export default PostForm;
