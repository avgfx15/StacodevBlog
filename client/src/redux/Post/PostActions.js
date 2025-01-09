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
      const response = await fetch('api/posts/createnewpost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPostData),
      });
      const data = await response.json();

      return data;
    } catch (error) {
      return error.message;
    }
  }
);

// / Get All Posts
export const getAllPostsAction = createAsyncThunk(
  'getAllPostsAction',
  async () => {
    try {
      const response = await fetch('/api/posts/getallposts', {
        method: 'GET',
      });
      const data = await response.json();

      return data; // Return the posts directly
    } catch (error) {
      throw new Error(error.message); // Throw error to trigger the `rejected` case
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
      return error.message;
    }
  }
);

// / Get All Post by post Slug
export const getPostByPostSlugAction = createAsyncThunk(
  'getPostBypostslug',
  async (postslug) => {
    try {
      const response = await fetch(`/api/posts/getallposts?slug=${postslug}`, {
        method: 'GET',
      });
      const data = await response.json();

      // % Handle Error
      if (data.success === false) {
        return data.message;
      }
      // % Check if response is OK
      if (response.ok) {
        return data;
      }
    } catch (error) {
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

// / Get Post By postId

export const getPostByPostIdAction = createAsyncThunk(
  'getPostByPostId',
  async (postId) => {
    try {
      const response = await fetch(`/api/posts/getpost/${postId}`, {
        method: 'GET',
      });
      const data = await response.json();

      // % Handle Error
      if (data.success === false) {
        return data.message;
      }
      // % Check if response is OK
      if (response.ok) {
        return data;
      }
    } catch (error) {
      return error.message;
    }
  }
);

// * Update Post By postId and author

export const updatePostByPostIdByAuthorAction = createAsyncThunk(
  'updatePostByPostIdByAuthor',
  async ({ postId, userId, updatedData }) => {
    console.log(postId);
    console.log(userId);
    console.log(updatedData);

    try {
      const response = await fetch(
        `/api/posts/updatepost/${postId}/${userId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        }
      );
      const data = await response.json();
      // % Handle Error
      if (data.success === false) {
        return data.message;
      }
      if (response.ok) {
        console.log('New Post Created');
        return data;
      }
    } catch (error) {
      return error.message;
    }
  }
);

// / Get All Post
export const getRecentPostAction = createAsyncThunk(
  'recentArticlePost',
  async () => {
    try {
      const response = await fetch(`/api/posts/recentpost`, {
        method: 'GET',
      });
      const data = await response.json();

      return data;
    } catch (error) {
      return error.message;
    }
  }
);
