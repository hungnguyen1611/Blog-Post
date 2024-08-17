import React, { useState } from 'react';
import axios from 'axios';

const CommentItem = ({ comment, fetchComments }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(comment.content);

  const handleEdit = async () => {
    await axios.put(`http://localhost:5000/api/comments/${comment._id}`, { content });
    setIsEditing(false);
    fetchComments(); // Refresh the comments after editing
  };

  const handleDelete = async () => {
    await axios.delete(`http://localhost:5000/api/comments/${comment._id}`);
    fetchComments(); // Refresh the comments after deletion
  };

  return (
    <div className="comment-item">
      {isEditing ? (
        <>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button onClick={handleEdit}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <p>{comment.content}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
};

export default CommentItem;
