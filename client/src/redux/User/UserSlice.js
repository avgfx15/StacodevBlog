import { createSlice } from '@reduxjs/toolkit';
import {
  deleteUserAction,
  deleteUserByAdminAction,
  getAllUsersByAdminAction,
  getUserByIdAction,
  newUserRegisterAction,
  registerWithGoogleAction,
  signInUserAction,
  signOutUserAction,
  updateUserAction,
  uploadProfilePicAction,
} from './UserActions';

const initialState = {
  allUsers: [],
  currentUser: null,
  isLoading: false,
  error: null,
  successStatus: false,
  successMsg: null,
  errorMsg: null,
  imageFileUrl: null,
  getUserData: null,
  lastMonthRegisteredUsers: 0,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    clearMessageAction: (state) => {
      state.errorMsg = null;
      state.successMsg = null;
    },
  },
  extraReducers: (builder) => {
    // + Register New User Success
    builder.addCase(newUserRegisterAction.fulfilled, (state) => {
      state.currentUser = null;
      state.successStatus = true;
      state.successMsg = 'User Registered Successfully';
      state.errorMsg = null;
      state.isLoading = false;
      state.error = null;
    });
    // & Register New User Pending
    builder.addCase(newUserRegisterAction.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.successStatus = false;
      state.successMsg = null;
    });
    // ! Register New User rejected
    builder.addCase(newUserRegisterAction.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.successStatus = false;
      state.successMsg = null;
      state.errorMsg = 'Failed to Register User';
    });

    // & Register With Google Pending
    builder.addCase(registerWithGoogleAction.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.currentUser = null;
      state.successStatus = false;
      state.successMsg = null;
    });
    // ! Register With Google rejected
    builder.addCase(registerWithGoogleAction.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.currentUser = null;
      state.successStatus = false;
      state.successMsg = null;
      state.errorMsg = 'Failed to register with Google';
    });

    // + Register With Google Success
    builder.addCase(registerWithGoogleAction.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.error = null;
      state.successStatus = true;
      state.successMsg = 'User Registered Successfully with Google';
      state.errorMsg = null;
    });

    // & Sign In user Pending
    builder.addCase(signInUserAction.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.currentUser = null;
      state.successStatus = false;
      state.successMsg = null;
      state.errorMsg = null;
    });
    // ! Sign In user rejected
    builder.addCase(signInUserAction.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.currentUser = null;
      state.successStatus = false;
      state.successMsg = null;
      state.errorMsg = 'Failed to Sign In User';
    });

    // + Sign In user Success
    builder.addCase(signInUserAction.fulfilled, (state, action) => {
      if (action.payload.success === false) {
        state.errorMsg = action.payload.message;
        state.isLoading = false;
        state.error = null;
        state.successStatus = false;
      } else {
        state.currentUser = action.payload;
        state.imageFileUrl = null;
        state.isLoading = false;
        state.error = null;
        state.successStatus = true;
        state.errorMsg = null;
        state.successMsg = 'User Signed In Successfully';
      }
    });
    // & Upload ProfilePic Pending
    builder.addCase(uploadProfilePicAction.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.imageFileUrl = null;
      state.successStatus = false;
      state.successMsg = null;
      state.errorMsg = null;
    });
    // ! Upload ProfilePic rejected
    builder.addCase(uploadProfilePicAction.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.imageFileUrl = null;
      state.successStatus = false;
      state.successMsg = null;
      state.errorMsg = 'Failed to Upload Profile Pic';
    });

    // + Upload ProfilePic Success
    builder.addCase(uploadProfilePicAction.fulfilled, (state, action) => {
      console.log('10 - ', action.payload);

      state.imageFileUrl = action.payload;
      state.isLoading = false;
      state.error = null;
      state.successStatus = true;
      state.successMsg = 'Profile Pic Uploaded Successfully';
      state.errorMsg = null;
    });
    // & Update User Data Pending
    builder.addCase(updateUserAction.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.successStatus = false;
      state.successMsg = null;
      state.errorMsg = null;
    });
    // ! Update User Data rejected
    builder.addCase(updateUserAction.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.successStatus = false;
      state.successMsg = null;
      state.errorMsg = 'Error to update User Profile';
    });

    // + Update User Data Success
    builder.addCase(updateUserAction.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.error = null;
      state.successStatus = true;
      state.successMsg = 'User Profile Updated Successfully';
      state.errorMsg = null;
    });
    // & Delete User Account & User Data Pending
    builder.addCase(deleteUserAction.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.successStatus = false;
      state.successMsg = null;
      state.errorMsg = null;
    });
    // ! Delete User Account & User Data rejected
    builder.addCase(deleteUserAction.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.successStatus = false;
      state.successMsg = null;
      state.errorMsg = 'Error to delete User Account';
    });

    // - Delete User Account & User Data Success
    builder.addCase(deleteUserAction.fulfilled, (state) => {
      state.currentUser = null;
      state.isLoading = false;
      state.error = null;
      state.successStatus = true;
      state.successMsg = 'User Account Deleted Successfully';
      state.errorMsg = null;
    });
    // & SignOut User Pending
    builder.addCase(signOutUserAction.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.successStatus = false;
      state.successMsg = null;
    });
    // ! SignOut User Reject
    builder.addCase(signOutUserAction.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.successStatus = false;
      state.errorMsg = 'Error to SignOut User';
    });
    // $ SignOut User Reject
    builder.addCase(signOutUserAction.fulfilled, (state, action) => {
      state.currentUser = null;
      state.isLoading = false;
      state.error = null;
      state.successMsg = action.payload.message;
    });

    // / Get all users by admin
    // & Get All Users pending
    builder.addCase(getAllUsersByAdminAction.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.successStatus = false;
      state.successMsg = null;
      state.errorMsg = null;
    });
    // ! Get All Users Reject
    builder.addCase(getAllUsersByAdminAction.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.successStatus = false;
      state.errorMsg = action.payload;
    });
    // $ Get All Users Success
    builder.addCase(getAllUsersByAdminAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.allUsers = action.payload.allUsers;
      state.lastMonthRegisteredUsers = action.payload.lastMonthRegisteredUsers;
    });

    // - Delete User By admin
    // & Delete User By Admin pending
    builder.addCase(deleteUserByAdminAction.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.successStatus = false;
      state.successMsg = null;
      state.errorMsg = null;
    });
    // ! Delete User By Admin Reject
    builder.addCase(deleteUserByAdminAction.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.data;
      state.successMsg = null;
      state.errorMsg = action.payload.data;
    });
    // $ Delete User By Admin Success
    builder.addCase(deleteUserByAdminAction.fulfilled, (state, action) => {
      state.successMsg = action.payload.message;
      state.isLoading = false;
      state.error = null;
      state.errorMsg = null;
      state.allUsers = state.allUsers.filter((user) => {
        return user.id !== action.payload.id;
      });
    });

    // / Get User data
    // & Get User data pending
    builder.addCase(getUserByIdAction.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.successStatus = false;
      state.successMsg = null;
      state.errorMsg = null;
    });

    // $ Ge User Data Fulfilled
    builder.addCase(getUserByIdAction.fulfilled, (state, action) => {
      console.log(action.payload);

      state.isLoading = false;
      state.error = null;
      state.getUserData = action.payload.User;
      state.successMsg = action.payload.message;
    });

    // ! reject Get User
    builder.addCase(getUserByIdAction.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
      state.errorMsg = action.payload.message;
    });
  },
});

export const userReducer = userSlice.reducer;

export const allUsersState = (state) => state.userReducer.allUsers;

export const lastMonthRegisteredUsersState = (state) =>
  state.userReducer.lastMonthRegisteredUsers;

export const currentUserState = (state) => state.userReducer.currentUser;

export const getUserState = (state) => state.userReducer.getUserData;

export const isLoadingState = (state) => state.userReducer.isLoading;

export const errorState = (state) => state.userReducer.error;

export const successMsgState = (state) => state.userReducer.successMsg;

export const errorMsgState = (state) => state.userReducer.errorMsg;

export const successStatus = (state) => state.userReducer.successStatus;

export const imageFileState = (state) => state.userReducer.imageFileUrl;

export const { clearMessageAction } = userSlice.actions;
