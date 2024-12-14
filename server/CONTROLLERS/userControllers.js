import bcryptjs from 'bcryptjs';

import { errorHandler } from '../MIDDLEWARE/errorMiddleware.js';
import UserSchema from '../MODELS/userSchema.js';

export const testController = async (req, res) => {
  res.json('User Route');
};

export const updateUserController = async (req, res, next) => {
  // & Get user id from params (url)
  const id = req.params.userId;

  // & Get userId from cookie
  const userId = req.user.id;

  // * Check loggedInUser and params user id not matched send error
  if (userId !== id) {
    return next(
      errorHandler(403, 'You are not authorized to update this user')
    );
  }

  // & Check if newPassword added
  if (req.body.newPassword) {
    if (req.body.password < 6) {
      return next(errorHandler(400, 'Password must be 6 characters long'));
    }
    // & Hash password
    req.body.password = await bcryptjs.hash(req.body.newPassword, 10);
  }

  // & Check if username change
  if (req.body.username) {
    // & Check if username already exists
    const user = await UserSchema.findOne({ username: req.body.username });
    console.log('User Not Matched');

    if (user) {
      return next(errorHandler(400, 'Username already exists'));
    }
    if (req.body.username.length < 10 || req.body.username.length > 30) {
      return next(
        errorHandler(400, 'Username must between 10 to 30 characters long')
      );
    }
  }

  try {
    console.log('try catch');

    // & Update user with new password
    const updatedUser = await UserSchema.findByIdAndUpdate(
      id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePic: req.body.profilePic,
        },
      },
      { new: true }
    );
    console.log(updatedUser);

    const { password, ...rest } = updatedUser._doc;
    console.log(rest);

    // & Return updated user
    return res.status(200).json(rest);
  } catch (error) {
    return next(errorHandler(500, 'Failed to update user'));
  }
};
