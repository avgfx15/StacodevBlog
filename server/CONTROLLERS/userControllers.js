import bcryptjs from 'bcryptjs';

// ~ Error Handler
import { errorHandler } from '../MIDDLEWARE/errorMiddleware.js';

// ~ Import userSchema
import UserSchema from '../MODELS/userSchema.js';

// & User Test Route
export const testController = async (req, res) => {
  res.json('User Route');
};

// * Update User
export const updateUserController = async (req, res, next) => {
  // & Get user id from params (url)
  const id = req.params.userId;

  // & Get userId from cookie
  const userId = req.user.id;
  console.log(id, userId);

  // * Check loggedInUser and params user id not matched send error
  if (userId !== id) {
    return next(
      errorHandler(403, 'You are not authorized to update this user')
    );
  }

  // & Check if newPassword added
  if (req.body.password) {
    if (req.body.password < 6) {
      return next(errorHandler(400, 'Password must be 6 characters long'));
    }
    // & Hash password

    req.body.password = await bcryptjs.hash(req.body.password, 10);
  }
  // & Check if username change
  if (req.body.username) {
    // & Check if username already exists
    const user = await UserSchema.findOne({ username: req.body.username });
    // % If user matched by username then return  userExist
    if (user) {
      return next(errorHandler(400, 'Username already exists'));
    }
    // ! Change in username cannot contain space
    if (req.body.username.includes(' ')) {
      return next(errorHandler(400, 'Username cannot contain space'));
    }
    // ! Change in username
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(400, 'Username contain only letters and numbers')
      );
    }

    // ! Change in username condition by length
    if (req.body.username.length < 6 || req.body.username.length > 15) {
      return next(
        errorHandler(400, 'Username must between 6 to 15 characters long')
      );
    }
  }
  console.log(req.body.profilePic);

  try {
    // & Update user with new password
    const updatedUser = await UserSchema.findByIdAndUpdate(
      id,
      {
        $set: {
          username: req.body.username,
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          profilePic: req.body.profilePic,
          mobile: req.body.mobile,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    // & Return updated user
    return res.status(200).json(rest);
  } catch (error) {
    return next(errorHandler(500, 'Failed to update user'));
  }
};

// -Delete User By Id
export const deleteUserByIdController = async (req, res, next) => {
  try {
    // & Get Id By loggedIn User Token
    const loggedInUserId = req.user.id;

    // & Get Id from params
    const id = req.params.userId;

    if (id !== loggedInUserId) {
      return next(errorHandler(400, 'You are not authorized to delete user.'));
    }

    // - Delete From Db
    await UserSchema.findByIdAndDelete(id);

    // - Clear cookies
    res.clearCookie('access_token');

    return res.status(200).json('User Deleted Successfully.');
  } catch (error) {
    return next(errorHandler(500, 'Failed to delete Your Account'));
  }
};

// & SignOut User
export const signOutUserController = async (req, res, next) => {
  try {
    // & Clear Cookies
    res
      .clearCookie('access_token')
      .status(200)
      .json({ message: 'User SignOut Successfully', success: true });
  } catch (error) {
    return next(errorHandler(500, 'Failed to Sign Out User'));
  }
};

// / Get All Users By Admin
export const getAllUsersByAdminController = async (req, res, next) => {
  const loggedInUser = req.user;

  try {
    if (!loggedInUser.isAdmin) {
      return next(errorHandler(403, 'You are not authorized'));
    }
    const users = await UserSchema.find().select('-password');
    return res.status(200).json(users);
  } catch (error) {
    return next(errorHandler(500, 'Failed to get allUsers'));
  }
};
