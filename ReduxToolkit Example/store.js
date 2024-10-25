import { configureStore } from '@reduxjs/toolkit';
import reducer from './postsSlice';

const store = configureStore({
  reducer: {
    posts: reducer,
  },
});

export default store;
