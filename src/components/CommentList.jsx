import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentItem from './CommentItem';

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    const response = await axios.get(`http://localhost:5000/api/comments/${postId}`);
    setComments(response.data);
  };

  const addComment = async () => {
    await axios.post('http://localhost:5000/api/comments', { postId, content: newComment });
    setNewComment('');
    fetchComments(); // Refresh the comments after adding
  };

  return (
    <div className="comment-list">
      <h4>Comments</h4>
      <div className="new-comment">
        <textarea
          placeholder="Add a comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={addComment}>Add Comment</button>
      </div>
      <div className="comments">
        {comments.map((comment) => (
          <CommentItem
            key={comment._id}
            comment={comment}
            fetchComments={fetchComments}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentList;
