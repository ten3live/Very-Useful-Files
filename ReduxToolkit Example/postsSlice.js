import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = 'http://10.0.2.2:3000/api';
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get('http://10.0.2.2:3000/api/posts');
  return response.data;
});

export const addPost = createAsyncThunk('posts/addPost', async postData => {
  const response = await axios.post(
    'http://10.0.2.2:3000/api/posts',
    postData,
  );
  return response.data;
});

export const editPost = createAsyncThunk(
  'posts/editPost',
  async ({id, title, content}) => {
    const response = await axios.put(
      `http://10.0.2.2:3000/api/posts/${id}`,
      {title, content},
    );
    return response.data;
  },
);

export const deletePost = createAsyncThunk('posts/deletePost', async postId => {
  await axios.delete(`http://10.0.2.2:3000/api/posts/${postId}`);
  return postId;
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState: [],
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(editPost.fulfilled, (state, action) => {
        const {id, title, content} = action.payload;
        const index = state.findIndex(post => post._id === id);
        if (index !== -1) {
          state[index].title = title;
          state[index].content = content;
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const index = state.findIndex(post => post._id === action.payload);
        if (index !== -1) {
          state.splice(index, 1);
        }
      });
  },
});

export default postsSlice.reducer;
