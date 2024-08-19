import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostItem from './PostItem';
import PostForm from './PostForm';
import CommentForm from './CommentForm'; 
const API_URL_POSTS = 'http://localhost:5000/api/posts';
const API_URL_COMMENTS = 'http://localhost:5000/api/comments';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedComment, setSelectedComment] = useState(null); 
  const [currentPostId, setCurrentPostId] = useState(null); 
  const [showPostForm, setShowPostForm] = useState(false); 

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(API_URL_POSTS);
      const postsWithComments = res.data.map(post => ({
        ...post,
        comments: Array.isArray(post.comments) ? post.comments : [] 
      }));
      setPosts(postsWithComments);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const addPost = async (post) => {
    try {
      const res = await axios.post(API_URL_POSTS, post);
      setPosts([...posts, res.data]);
      setShowPostForm(false); 
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  const editPost = async (id, updatedPost) => {
    try {
      const res = await axios.put(`${API_URL_POSTS}/${id}`, updatedPost);
      setPosts(posts.map(post => (post._id === id ? res.data : post)));
      setSelectedPost(null);
    } catch (error) {
      console.error('Error editing post:', error);
    }
  };

  const deletePost = async (id) => {
    try {
      await axios.delete(`${API_URL_POSTS}/${id}`);
      setPosts(posts.filter(post => post._id !== id));
      setCurrentPostId(null);
      setSelectedComment(null); 
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const fetchComments = async (postId) => {
    try {
      const res = await axios.get(`${API_URL_COMMENTS}/post/${postId}`);
      setPosts(posts.map(post => post._id === postId ? { ...post, comments: res.data } : post));
      setCurrentPostId(postId); 
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const addComment = async (postId, comment) => {
    try {
      const res = await axios.post(API_URL_COMMENTS, { ...comment, postId });
      setPosts(posts.map(post => 
        post._id === postId 
          ? { 
              ...post, 
              comments: Array.isArray(post.comments) ? [...post.comments, res.data] : [res.data] 
            } 
          : post
      ));
      setSelectedComment(null); 
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const editComment = async (postId, commentId, updatedComment) => {
    try {
      const res = await axios.put(`${API_URL_COMMENTS}/${commentId}`, updatedComment);
      setPosts(posts.map(post => post._id === postId ? { ...post, comments: post.comments.map(comment => comment._id === commentId ? res.data : comment) } : post));
      setSelectedComment(null); 
    } catch (error) {
      console.error('Error editing comment:', error);
    }
  };

  const deleteComment = async (postId, commentId) => {
    try {
      await axios.delete(`${API_URL_COMMENTS}/${commentId}`);
      setPosts(posts.map(post => post._id === postId ? { ...post, comments: post.comments.filter(comment => comment._id !== commentId) } : post));
      setSelectedComment(null); 
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleShowAddCommentForm = (postId) => {
    setCurrentPostId(postId);
    setSelectedComment(null); 
  };

  return (

  
    <div>

<h1 className='mb-4'> List of articles </h1>
    
      <button className="btn btn-primary mb-4" onClick={() => setShowPostForm(!showPostForm)}>
        {showPostForm ? 'Cancel' : 'Add New Post'}
      </button>

    
      {showPostForm && (
        <div className="mb-4">
          <h4>{selectedPost ? 'Edit Post' : 'Add New Post'}</h4>
          <PostForm
            onAddPost={addPost}
            onEditPost={editPost}
            selectedPost={selectedPost}
            setSelectedPost={setSelectedPost}
          />
        </div>
      )}

      
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post._id} className="mb-3">
            <PostItem
              post={post}
              onEditPost={() => setSelectedPost(post)}
              onDeletePost={() => deletePost(post._id)}
              onFetchComments={() => fetchComments(post._id)}
              onShowAddCommentForm={() => handleShowAddCommentForm(post._id)}
            />
           
            {currentPostId === post._id && (
              <div className="mt-4">
                <h5>{selectedComment ? 'Edit Comment' : 'Add Comment'}</h5>
                <CommentForm
                  onAddComment={(comment) => addComment(post._id, comment)}
                  onEditComment={(commentId, updatedComment) => editComment(post._id, commentId, updatedComment)}
                  selectedComment={selectedComment}
                  setSelectedComment={setSelectedComment}
                />
               
                <ul className="list-group mt-3">
                  {Array.isArray(post.comments) && post.comments.map(comment => (
                    <li key={comment._id} className="list-group-item d-flex justify-content-between align-items-center">
                      <span>{comment.content}</span>
                      <div>
                        <button
                          className="btn btn-sm btn-warning"
                          onClick={() => setSelectedComment(comment)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger ms-2"
                          onClick={() => deleteComment(post._id, comment._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))
      ) : (
        <div>No posts available.</div>
      )}
    </div>
  );
}

export default PostList;
