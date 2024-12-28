import { createSlice } from '@reduxjs/toolkit';
import { createNewCommentAction } from './CommentActions';

const initial_State = {
  commentContent: null,
  allComments: [],
  commentsByPost: [],
  isLoading: false,
  commentError: null,
  commentSuccess: null,
};

const commentSlice = createSlice({
  name: 'comment',
  initialState: initial_State,
  reducers: {},
  extraReducers: (builder) => {
    // + Create New Comment

    // & Create New Comment pending
    builder.addCase(createNewCommentAction.pending, (state) => {
      state.isLoading = true;
      state.commentError = null;
      state.commentSuccess = null;
    });

    // $ Create New Comment Fullfilled
    builder.addCase(createNewCommentAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.commentSuccess = action.payload.message;
      state.commentContent = action.payload.Comment;
      state.commentsByPost.push(action.payload.Comment);
      state.commentError = null;
    });

    // ! Reject Create New Comment
    builder.addCase(createNewCommentAction.rejected, (state, action) => {
      state.isLoading = false;
      state.commentError = action.payload.message;
      state.commentSuccess = null;
      state.commentContent = null;
    });
  },
});

export const commentReducer = commentSlice.reducer;

export const commentContentState = (state) =>
  state.commentReducer.commentContent;

export const allCommentsState = (state) => state.commentReducer.allComments;

export const commentsByPostState = (state) =>
  state.commentReducer.commentsByPost;

export const isLoadingState = (state) => state.commentReducer.isLoading;

export const commentErrorState = (state) => state.commentReducer.commentError;

export const commentSuccessState = (state) =>
  state.commentReducer.commentSuccess;
