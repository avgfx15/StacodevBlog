import { createAsyncThunk } from '@reduxjs/toolkit';

const baseUrl = 'http://localhost:3200/';

// + Signup New User
export const newUserRegisterAction = createAsyncThunk(
  'newUserRegister',
  async (userData) => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
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

// + Sign Up with Google
export const registerWithGoogleAction = createAsyncThunk(
  'registerWithGoogle',
  async (userData) => {
    try {
      const response = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer YOUR_API_KEY',
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (response.ok) {
        return data;
      }
    } catch (error) {
      const response = await fetch('/api/auth/google');
      const text = await response.text();
      console.log(text);
      return error.message;
    }
  }
);

// & SignIn Action
export const signInUserAction = createAsyncThunk(
  'signInUser',
  async (formData) => {
    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      return data;
    } catch (error) {
      return error.message;
    }
  }
);

// + Upload ProfilePic
export const uploadProfilePicAction = createAsyncThunk(
  'uploadProfilePic',
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

// * Update User Data
export const updateUserAction = createAsyncThunk(
  'updateUser',
  async ({ inputData, currentUser }) => {
    try {
      if (Object.keys(inputData).length === 0) {
        return;
      }
      const response = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputData),
      });

      const data = await response.json();

      if (!response.ok) {
        return data.message;
      } else {
        return data;
      }
    } catch (error) {
      return error.message;
    }
  }
);

// - Delete User
export const deleteUserAction = createAsyncThunk(
  'deleteUser',
  async (currentUser) => {
    try {
      const response = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = response.json();

      if (!response.ok) {
        return data.message;
      } else {
        return data;
      }
    } catch (error) {
      return error.message;
    }
  }
);

export const signOutUserAction = createAsyncThunk('signoutUser', async () => {
  try {
    const response = await fetch('/api/user/signout', {
      method: 'POST',
    });

    const data = response.json();
    return data;
  } catch (error) {
    return error.message;
  }
});

export const getAllUsersByAdminAction = createAsyncThunk(
  'getAllUsers',
  async () => {
    try {
      const response = await fetch('/api/user/getallusers', {
        method: 'GET',
      });
      const data = response.json();

      if (!response.ok) {
        return data.message;
      } else {
        return data;
      }
    } catch (error) {
      return error.message;
    }
  }
);
