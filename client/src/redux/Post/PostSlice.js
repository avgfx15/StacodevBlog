import { createSlice } from '@reduxjs/toolkit';
import { createNewPostAction, uploadPostImageAction } from './PostActions';

const initialState = {
  allPost: [],
  post: [],
  postImageUrl: null,
  currentPost: null,
  isPostLoading: false,
  postError: null,
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

    builder.addCase(createNewPostAction.pending, (state) => {
      state.isPostLoading = true;
      state.postError = null;
    });
    builder.addCase(createNewPostAction.fulfilled, (state, action) => {
      state.isPostLoading = false;
      state.post = [...state.post, action.payload];
    });
  },
});

export const postReducer = postSlice.reducer;

export const allPostState = (state) => state.postReducer.allPost;
export const postState = (state) => state.postReducer.post;
export const postImageUrlState = (state) => state.postReducer.postImageUrl;
export const currentPostState = (state) => state.postReducer.currentPost;
export const isPostLoadingState = (state) => state.postReducer.isPostLoading;
export const postErrorState = (state) => state.postReducer.postError;
