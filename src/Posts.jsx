import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchPosts,
  addPost,
  updatePost,
  deletePost,
} from './redux/features/postsSlice.js';

function Posts() {
  const dispatch = useDispatch();
  const { entities: posts, loading } = useSelector((state) => state.posts);

  /* useEffect(() => {
    if (loading === 'idle') {
      dispatch(fetchPosts());
    }
  }, [loading, dispatch]); */

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  const handleAddPost = () => {
    const newPost = {
      id: Math.random(),
      title: 'New Post',
      body: 'This is a new post.',
    };
    dispatch(addPost(newPost));
  };

  const handleUpdatePost = (id) => {
    const updatedPost = {
      id,
      title: 'Updated Post',
      body: 'This is an updated post.',
    };
    dispatch(updatePost(updatedPost));
  };

  const handleDeletePost = (id) => {
    dispatch(deletePost(id));
  };

  if (loading === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button onClick={handleAddPost}>Add Post</button>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <button onClick={() => handleUpdatePost(post.id)}>Update</button>
          <button onClick={() => handleDeletePost(post.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Posts;
