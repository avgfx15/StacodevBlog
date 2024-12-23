import { createAsyncThunk } from '@reduxjs/toolkit';

const baseUrl = 'http://localhost:3200/';

// + Upload PostImage
export const uploadPostImageAction = createAsyncThunk(
  'uploadPostImageAction',
  async (formData) => {
    try {
      console.log('Uplaod Post Image');

      const response = await fetch(baseUrl + 'upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log(data);

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
    console.log(newPostData);
    try {
      const response = await fetch('api/posts/createnewpost', {
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
        console.log('New Post Created');
        console.log(data);
        return data;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
);

// / Get All Posts
export const getAllPostsAction = createAsyncThunk(
  'getAllPostsAction',
  async () => {
    try {
      const response = await fetch('api/posts/getallposts', {
        method: 'GET',
      });
      const data = await response.json();

      // % Handle Error
      if (data.success === false) {
        return data.message;
      }
      // % Check if response is OK
      if (response.ok) {
        return data.AllPost;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
);

// / Get All Posts
export const postsByLoggedInUserAction = createAsyncThunk(
  'postsByLoggedInUser',
  async (currentUser) => {
    try {
      const response = await fetch(
        `api/posts/getallposts?author=${currentUser._id}`,
        {
          method: 'GET',
        }
      );
      const data = await response.json();

      // % Handle Error
      if (data.success === false) {
        return data.message;
      }
      // % Check if response is OK
      if (response.ok) {
        return data.AllPost;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
);

// - Delete Post By PostId and author

export const deletePostByPostIdByAuthorAction = createAsyncThunk(
  'deletePostByAuthor',
  async ({ postId, authorId }) => {
    try {
      const response = await fetch(
        `/api/posts/deletepost/${postId}/${authorId}`,
        {
          method: 'DELETE',
        }
      );

      const data = await response.json();

      // % Handle Error
      if (data.success === false) {
        return data.message;
      }
      if (response.ok) {
        return { data, postId };
      }
    } catch (error) {
      return error.message;
    }
  }
);
