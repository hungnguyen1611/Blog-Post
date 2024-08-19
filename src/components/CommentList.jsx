import React, { useState } from 'react';

function CommentItem({ comment, onEditComment, onDeleteComment }) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(comment.content);

  const handleEdit = () => {
    if (isEditing) {
      onEditComment(comment._id, { content });
    }
    setIsEditing(!isEditing);
  };

  return (
    <li className="list-group-item">
      {isEditing ? (
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="form-control"
        />
      ) : (
        <span>{comment.content}</span>
      )}
      <div className="btn-group float-end">
        <button onClick={handleEdit} className="btn btn-sm btn-secondary">
          {isEditing ? 'Save' : 'Edit'}
        </button>
        <button onClick={() => onDeleteComment(comment._id)} className="btn btn-sm btn-danger">
          Delete
        </button>
      </div>
    </li>
  );
}

export default CommentItem;
