import { createSlice } from '@reduxjs/toolkit';
import {
  createNewCommentAction,
  deleteCommentByCommentIdAction,
  editCommentByCommentIdByOwnerAction,
  getAllCommentsAction,
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
  lastMonthComments: 0,
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
      if (!action.payload.successStatus) {
        state.commentError = action.payload.message;
      } else {
        state.commentSuccess = action.payload.message;
        state.commentContent = action.payload.Comment;

        // % Ensure action.payload.Comment is treated as an object, not an array
        const newComment = Array.isArray(action.payload.Comment)
          ? action.payload.Comment[0]
          : action.payload.Comment;

        // % Add the new comment to the existing comments array
        state.commentsByPost = [newComment, ...state.commentsByPost];
      }
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

      if (!action.payload.successStatus) {
        state.commentError = action.payload.message;
        state.commentsByPost = [];
      } else {
        state.commentsByPost = action.payload.allComments;
        state.commentSuccess = action.payload.message;
        state.commentError = null;
      }
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

    // - Delet Comment By Owner Or Admin By CommentId
    // & Pending Like Or DisLike
    builder.addCase(deleteCommentByCommentIdAction.pending, (state) => {
      state.isLoading = true;
      state.commentError = null;
      state.commentSuccess = null;
      state.currentComment = null;
    });

    // - Delete Comment
    builder.addCase(
      deleteCommentByCommentIdAction.fulfilled,
      (state, action) => {
        if (!action.payload.data.successStatus) {
          state.isLoading = false;
          state.commentSuccess = action.payload?.data?.message;
          state.commentError = null;
        } else {
          state.commentSuccess = action.payload?.data?.message;
          // Remove the deleted comment from the state
          state.commentsByPost = state.commentsByPost.filter(
            (comment) => comment._id !== action.payload?.commentId
          );
          state.allComments = state.allComments.filter(
            (comment) => comment._id !== action.payload?.commentId
          );
        }
      }
    );

    // / Get All Comments
    // & Pending Get All Comments
    builder.addCase(getAllCommentsAction.pending, (state) => {
      state.isLoading = true;
      state.commentError = null;
      state.commentSuccess = null;
    });
    // $ Get Comments
    builder.addCase(getAllCommentsAction.fulfilled, (state, action) => {
      state.isLoading = false;
      if (!action.payload.successStatus) {
        state.commentError = action.payload.message;
        state.commentSuccess = null;
      } else {
        state.allComments = action.payload.AllComments;
        state.commentSuccess = action.payload.message;
        state.lastMonthComments = action.payload.lastMonthComments;
      }
    });

    // ! Reject Get All Comments
    builder.addCase(getAllCommentsAction.rejected, (state, action) => {
      state.isLoading = false;
      state.commentError = action.payload.message;
      state.commentSuccess = null;
    });
  },
});

export const commentReducer = commentSlice.reducer;

export const commentContentState = (state) =>
  state.commentReducer.commentContent;

export const allCommentsState = (state) => state.commentReducer.allComments;

export const lastMonthCommentsState = (state) =>
  state.commentReducer.lastMonthComments;

export const commentsByPostState = (state) =>
  state.commentReducer.commentsByPost;

export const isLoadingState = (state) => state.commentReducer.isLoading;

export const commentErrorState = (state) => state.commentReducer.commentError;

export const commentSuccessState = (state) =>
  state.commentReducer.commentSuccess;
