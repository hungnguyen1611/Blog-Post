import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostItem from './PostItem';
import PostModal from './PostModal';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState({ title: '', content: '' });
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/posts');
      if (Array.isArray(response.data)) {
        setPosts(response.data);
      } else {
        console.error('Unexpected response format:', response.data);
        setPosts([]); // Đặt posts là mảng rỗng nếu dữ liệu không đúng
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      setPosts([]); // Đặt posts là mảng rỗng nếu có lỗi
    }
  };
  
  const openModal = (post = { title: '', content: '' }) => {
    setCurrentPost(post);
    setIsEditing(!!post._id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentPost({ title: '', content: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentPost((prev) => ({ ...prev, [name]: value }));
  };

  const savePost = async () => {
    if (isEditing) {
      await axios.put(`http://localhost:5000/api/posts/${currentPost._id}`, currentPost);
    } else {
      await axios.post('http://localhost:5000/api/posts', currentPost);
    }
    closeModal();
    fetchPosts();
  };

  const deletePost = async (id) => {
    await axios.delete(`http://localhost:5000/api/posts/${id}`);
    fetchPosts();
  };

  return (
    <div className="container my-4">
      <h1 className='mb-5'>Blog Posts</h1>
      <div className="d-flex justify-content-start mb-3">
    <button className="btn btn-primary" onClick={() => openModal()}>
      Add New Post
    </button>
  </div>

      <div className="row">
        {posts.map((post) => (
          <div key={post._id} className="mb-5">
            <PostItem post={post} onEdit={() => openModal(post)} onDelete={() => deletePost(post._id)} />
          </div>
        ))}
      </div>

      <PostModal
        show={showModal}
        handleClose={closeModal}
        handleSave={savePost}
        post={currentPost}
        handleChange={handleInputChange}
        isEditing={isEditing}
      />
    </div>
  );
};

export default PostList;
