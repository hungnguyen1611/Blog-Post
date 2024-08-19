// CommentForm.jsx
import React, { useState, useEffect } from 'react';

function CommentForm({ onAddComment, onEditComment, selectedComment, setSelectedComment }) {
  const [content, setContent] = useState('');

  useEffect(() => {
    if (selectedComment) {
      setContent(selectedComment.content);
    } else {
      setContent('');
    }
  }, [selectedComment]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedComment) {
      onEditComment(selectedComment._id, { content });
    } else {
      onAddComment({ content });
    }
    setContent(''); // Clear content after submit
  };

 

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <textarea
          className="form-control"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="3"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {selectedComment ? 'Update Comment' : 'Add Comment'}
      </button>
  
    </form>
  );
}

export default CommentForm;
