import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Async action
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  return await response.json();
});

// Slice
const postsSlice = createSlice({
  name: 'posts',
  initialState: { entities: [], loading: 'idle' },
  reducers: {
    addPost: (state, action) => {
      state.entities.push(action.payload);
    },
    deletePost: (state, action) => {
      const index = state.entities.findIndex(
        (post) => post.id === action.payload
      );
      if (index !== -1) {
        state.entities.splice(index, 1);
      }
    },
    updatePost: (state, action) => {
      const index = state.entities.findIndex(
        (post) => post.id === action.payload.id
      );
      if (index !== -1) {
        state.entities[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.loading = 'loading';
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.loading = 'idle';
      state.entities = action.payload;
    });
    builder.addCase(fetchPosts.rejected, (state) => {
      state.loading = 'failed';
    });
  },
});

export const { addPost, deletePost, updatePost } = postsSlice.actions;

export default postsSlice.reducer;
