import { createSlice } from '@reduxjs/toolkit';
import {
  newUserRegisterAction,
  registerWithGoogleAction,
  signInUserAction,
  updateUserAction,
  uploadProfilePicAction,
} from './UserActions';

const initialState = {
  currentUser: null,
  isLoading: false,
  error: null,
  imageFile: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // + Register New User Success
    builder.addCase(newUserRegisterAction.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.error = null;
    });
    // & Register New User Pending
    builder.addCase(newUserRegisterAction.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    // ! Register New User rejected
    builder.addCase(newUserRegisterAction.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // & Register With Google Pending
    builder.addCase(registerWithGoogleAction.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.currentUser = null;
    });
    // ! Register With Google rejected
    builder.addCase(registerWithGoogleAction.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.currentUser = null;
    });

    // + Register With Google Success
    builder.addCase(registerWithGoogleAction.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.error = null;
    });

    // & Sign In user Pending
    builder.addCase(signInUserAction.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.currentUser = null;
    });
    // ! Sign In user rejected
    builder.addCase(signInUserAction.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.currentUser = null;
    });

    // + Sign In user Success
    builder.addCase(signInUserAction.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.error = null;
    });
    // & Upload ProfilePic Pending
    builder.addCase(uploadProfilePicAction.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.imageFile = null;
    });
    // ! Upload ProfilePic rejected
    builder.addCase(uploadProfilePicAction.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.imageFile = null;
    });

    // + Upload ProfilePic Success
    builder.addCase(uploadProfilePicAction.fulfilled, (state, action) => {
      state.imageFile = action.payload;
      state.currentUser.profilePic = action.payload;
      state.isLoading = false;
      state.error = null;
    });
    // & Update User Data Pending
    builder.addCase(updateUserAction.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    // ! Update User Data rejected
    builder.addCase(updateUserAction.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // + Update User Data Success
    builder.addCase(updateUserAction.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.error = null;
    });
  },
});

export const userReducer = userSlice.reducer;

export const currentUserState = (state) => state.userReducer.currentUser;

export const isLoadingState = (state) => state.userReducer.isLoading;

export const errorState = (state) => state.userReducer.error;

export const imageFileState = (state) => state.userReducer.imageFile;
