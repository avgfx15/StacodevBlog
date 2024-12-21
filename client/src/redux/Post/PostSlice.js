import { createSlice } from '@reduxjs/toolkit';
import {
  createNewPostAction,
  getAllPostsAction,
  postsByLoggedInUserAction,
  uploadPostImageAction,
} from './PostActions';

const initialState = {
  allPost: [],
  post: [],
  postImageUrl: null,
  currentPost: null,
  isPostLoading: false,
  postError: null,
  postsByLoggedInUser: [],
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // & Upload ProfilePic Pending
    builder.addCase(uploadPostImageAction.pending, (state) => {
      state.isPostLoading = true;
      state.error = null;
      state.postImageUrl = null;
      state.successStatus = false;
      state.postError = null;
    });
    // ! Upload ProfilePic rejected
    builder.addCase(uploadPostImageAction.rejected, (state, action) => {
      state.isPostLoading = false;
      state.error = action.payload;
      state.postImageUrl = null;
      state.successStatus = false;
      state.postError = 'Failed to Upload Profile Pic';
    });

    // + Upload ProfilePic Success
    builder.addCase(uploadPostImageAction.fulfilled, (state, action) => {
      state.postImageUrl = action.payload;
      state.isPostLoading = false;
      state.error = null;
      state.successStatus = true;
      state.postError = null;
    });
    // & create New Post Pending
    builder.addCase(createNewPostAction.pending, (state) => {
      state.isPostLoading = true;
      state.postError = null;
    });
    // ! create New Post Rejected
    builder.addCase(createNewPostAction.fulfilled, (state, action) => {
      state.isPostLoading = false;
      state.allPost = [...state.post, action.payload];
      state.postError = action.payload;
    });
    // & Get All Posts Pending
    builder.addCase(getAllPostsAction.pending, (state) => {
      state.isPostLoading = true;
      state.allPost = [];
      state.postError = null;
    });
    // / Get All Posts
    builder.addCase(getAllPostsAction.fulfilled, (state, action) => {
      state.isPostLoading = false;
      state.allPost = action.payload;
      state.postError = null;
    });
    // ! Get All Post Rejected
    builder.addCase(getAllPostsAction.rejected, (state, action) => {
      state.isPostLoading = false;
      state.postError = action.payload;
      state.post = [];
    });
    // & Get All Posts By LoggedInUser Pending
    builder.addCase(postsByLoggedInUserAction.pending, (state) => {
      state.isPostLoading = true;
      state.postsByLoggedInUser = [];
      state.postError = null;
    });
    // / Get All Posts By LoggedInUser
    builder.addCase(postsByLoggedInUserAction.fulfilled, (state, action) => {
      state.isPostLoading = false;
      state.postsByLoggedInUser = action.payload;
      state.postError = null;
    });
    // ! Get All Post By LoggedInUser Rejected
    builder.addCase(postsByLoggedInUserAction.rejected, (state, action) => {
      state.isPostLoading = false;
      state.postError = action.payload;
      state.postsByLoggedInUser = [];
    });
  },
});

export const postReducer = postSlice.reducer;

export const allPostState = (state) => state.postReducer.allPost;
export const postsByLoggedInUserState = (state) =>
  state.postReducer.postsByLoggedInUser;
export const postState = (state) => state.postReducer.post;
export const postImageUrlState = (state) => state.postReducer.postImageUrl;
export const currentPostState = (state) => state.postReducer.currentPost;
export const isPostLoadingState = (state) => state.postReducer.isPostLoading;
export const postErrorState = (state) => state.postReducer.postError;
