import { createAsyncThunk } from '@reduxjs/toolkit';

export const createNewCommentAction = createAsyncThunk(
  'createNewComment',
  async ({ content, postId, userId }) => {
    try {
      const response = await fetch('/api/comments/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content, postId, userId }),
      });
      const data = await response.json();

      if (!data.successStatus) {
        return data.message;
      } else {
        return data;
      }
    } catch (error) {
      return error.message;
    }
  }
);
