import React from 'react';

const PostItem = ({ post, onEdit, onDelete }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text">{post.content}</p>
        <button className="btn btn-warning me-2" onClick={onEdit}>
          Edit
        </button>
        <button className="btn btn-danger" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default PostItem;
