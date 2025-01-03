import { createSlice } from '@reduxjs/toolkit';
import {
  createNewCommentAction,
  editCommentByCommentIdByOwnerAction,
  getAllCommentsByPostIdAction,
  likeDisLikeCommentAction,
} from './CommentActions';

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

    // / Get All Comments By PostId

    // & Pending Get All Comments by Post Id
    builder.addCase(getAllCommentsByPostIdAction.pending, (state) => {
      state.isLoading = true;
      state.commentError = null;
      state.commentSuccess = null;
    });

    // $ Get All Comments By PostId
    builder.addCase(getAllCommentsByPostIdAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.commentSuccess = action.payload.message;
      state.commentsByPost = action.payload.allComments;
      state.commentError = null;
    });

    // ! Reject Get All Comments By PostId
    builder.addCase(getAllCommentsByPostIdAction.rejected, (state, action) => {
      state.isLoading = false;
      state.commentError = action.payload.message;
      state.commentSuccess = null;
    });

    // + Like Or DisLike

    // & Pending Like Or DisLike
    builder.addCase(likeDisLikeCommentAction.pending, (state) => {
      state.isLoading = true;
      state.commentError = null;
      state.commentSuccess = null;
      state.currentComment = null;
    });
    // $ Like Or DisLike
    builder.addCase(likeDisLikeCommentAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.commentSuccess = action.payload.data.message;
      state.commentError = null;

      // Update the specific comment in the state
      const updatedComment = action.payload.data.comment;
      const commentIndex = state.commentsByPost.findIndex(
        (comment) => comment._id === updatedComment._id
      );
      if (commentIndex !== -1) {
        state.commentsByPost[commentIndex] = updatedComment;
      }
    });

    // ! Reject Like Or DisLike
    builder.addCase(likeDisLikeCommentAction.rejected, (state, action) => {
      state.isLoading = false;
      state.commentError = action.payload.message;
      state.commentSuccess = null;
    });

    // * Update Edit Comment

    // & Pending Like Or DisLike
    builder.addCase(editCommentByCommentIdByOwnerAction.pending, (state) => {
      state.isLoading = true;
      state.commentError = null;
      state.commentSuccess = null;
      state.currentComment = null;
    });
    // $ Like Or DisLike
    builder.addCase(
      editCommentByCommentIdByOwnerAction.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.commentSuccess = action.payload?.data?.message;
        state.commentError = null;

        // Update the specific comment in the state
        const editedComment = action.payload.data?.updatedComment;
        const commentIndex = state.commentsByPost.findIndex(
          (comment) => comment._id === editedComment._id
        );
        if (commentIndex !== -1) {
          state.commentsByPost[commentIndex] = editedComment;
        }
      }
    );

    // ! Reject Like Or DisLike
    builder.addCase(
      editCommentByCommentIdByOwnerAction.rejected,
      (state, action) => {
        state.isLoading = false;
        state.commentError = action.payload.message;
        state.commentSuccess = null;
      }
    );
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
