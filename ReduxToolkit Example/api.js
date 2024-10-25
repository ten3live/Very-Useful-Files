const BASE_URL = 'http://10.0.2.2:3000/api';

export const getPosts = async () => {
  const response = await fetch(`${BASE_URL}/posts`);
  return await response.json();
};

export const addPost = async post => {
  const response = await fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  });
  return await response.json();
};

export const editPost = async (id, post) => {
  const response = await fetch(`${BASE_URL}/posts/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  });
  return await response.json();
};

export const deletePost = async id => {
  const response = await fetch(`${BASE_URL}/posts/${id}`, {
    method: 'DELETE',
  });
  return await response.json();
};
