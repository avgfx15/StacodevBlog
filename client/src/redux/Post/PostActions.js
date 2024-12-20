import { createAsyncThunk } from '@reduxjs/toolkit';

const baseUrl = 'http://localhost:3200/';

// + Upload PostImage
export const uploadPostImageAction = createAsyncThunk(
  'uploadPostImageAction',
  async (formData) => {
    try {
      const response = await fetch(baseUrl + 'upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      // % Handle Error
      if (data.success === false) {
        return data.message;
      }
      if (response.ok) {
        return data;
      }
    } catch (error) {
      return error.message;
    }
  }
);

// + Create New Post
export const createNewPostAction = createAsyncThunk(
  'createNewPostAction',
  async (newPostData) => {
    try {
      const response = await fetch('api/post/createnewpost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPostData),
      });
      const data = await response.json();

      // % Handle Error
      if (data.success === false) {
        return data.message;
      }

      if (response.ok) {
        return data;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
);
