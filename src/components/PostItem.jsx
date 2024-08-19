import React from 'react';

function PostItem({ post, onEditPost, onDeletePost, onFetchComments, onShowAddCommentForm }) {
  return (
    <div className="post-item border p-3 mb-3">
      <h5>{post.title}</h5>
      <p>{post.content}</p>
      <button className="btn btn-warning me-2" onClick={onEditPost}>Edit</button>
      <button className="btn btn-danger" onClick={onDeletePost}>Delete</button>
      <button
        className="btn btn-primary "
        onClick={() => onShowAddCommentForm(post._id)}
      >
        Add Comment
      </button>
     
      <button
        className="btn btn-info"
        onClick={() => onFetchComments(post._id)}
      >
        Show Comments
      </button>
    </div>
  );
}

export default PostItem;
