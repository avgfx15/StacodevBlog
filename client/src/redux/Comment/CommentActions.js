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
      return data;
    } catch (error) {
      return error.message;
    }
  }
);

// / Get All Comment By PostId

export const getAllCommentsByPostIdAction = createAsyncThunk(
  'getAllCommentsByPostId',
  async (postId) => {
    try {
      const response = await fetch(
        `/api/comments/allcommentsbypost/${postId}`,
        {
          method: 'GET',
        }
      );
      const data = await response.json();
      if (response.status === 404) {
        return { message: data.message, successStatus: false };
      } else if (!data.successStatus) {
        return data.message;
      } else {
        return data;
      }
    } catch (error) {
      return error.message;
    }
  }
);

// * Like DisLike Comment Action
export const likeDisLikeCommentAction = createAsyncThunk(
  'likeDisLikeCommentAction',
  async (commentId) => {
    try {
      const response = await fetch(`/api/comments/likecomment/${commentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (!data.successStatus) {
        return data.message;
      } else {
        return { data, commentId };
      }
    } catch (error) {
      return error.message;
    }
  }
);

// / Edit Or Update Comment By Owner By Comment Id
export const editCommentByCommentIdByOwnerAction = createAsyncThunk(
  'editCommentById',
  async ({ commentId, editedComment }) => {
    try {
      const response = await fetch(`/api/comments/editcomment/${commentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ commentText: editedComment }),
      });
      const data = await response.json();
      console.log(data);

      if (!data.successStatus) {
        return data.message;
      } else {
        return { data, commentId };
      }
    } catch (error) {
      return error.message;
    }
  }
);

// - Delete Comment By Owner Or Admin By comment Id
export const deleteCommentByCommentIdAction = createAsyncThunk(
  'deleteComment',
  async (commentId) => {
    console.log(commentId);

    try {
      const response = await fetch(`/api/comments/deletecomment/${commentId}`, {
        method: 'DELETE',
      });
      const data = await response.json();

      return { data, commentId };
    } catch (error) {
      return error.message;
    }
  }
);

// / Get All Comments
export const getAllCommentsAction = createAsyncThunk(
  'getAllComments',
  async () => {
    try {
      const response = await fetch('/api/comments/allcomments', {
        method: 'GET',
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return error.message;
    }
  }
);
