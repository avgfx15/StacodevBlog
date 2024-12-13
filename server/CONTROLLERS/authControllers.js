import bcryptjs from 'bcryptjs';

// ~ Import jsonwebtoken
import jwt from 'jsonwebtoken';

import UserSchema from '../MODELS/userSchema.js';
import { errorHandler } from '../MIDDLEWARE/errorMiddleware.js';

export const signUpController = async (req, res, next) => {
  try {
    // $ Descructure req.body
    const { username, email, mobile, password } = req.body;

    // $ Check all Field data filled otherwise send message
    if (
      !username ||
      !email ||
      !mobile ||
      !password ||
      username === '' ||
      email === '' ||
      mobile === '' ||
      password === ''
    ) {
      return next(errorHandler(400, 'All Fields are required'));
    }

    // $ Hash Password
    const hashPassword = bcryptjs.hashSync(password, 10);

    // $ Create New User Data
    const newUser = new UserSchema({
      username,
      email,
      mobile,
      password: hashPassword,
    });

    // $  Save newUser to database
    await newUser.save();

    return res.status(201).json({ message: 'New User Created', newUser });
  } catch (error) {
    return next(error);
  }
};

// / SignIn Controlelr

export const signInController = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === '' || password === '') {
    return next(errorHandler(400, 'All Fields Are Required'));
  }
  try {
    // % Check if user exist
    const userExist = await UserSchema.findOne({ email });
    if (!userExist) {
      return next(errorHandler(404, 'User Not Exist'));
    }

    // % compare Hash Password
    const checkPasswordValid = bcryptjs.compareSync(
      password,
      userExist.password
    );
    if (!checkPasswordValid) {
      return next(errorHandler(404, 'Invalid Credentials'));
    }

    const { password: userPassword, ...rest } = userExist._doc;

    // * Create Token
    const token = jwt.sign({ id: userExist.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return res
      .status(200)
      .cookie('access_token', token, { httpOnly: true })
      .json(rest);

    // % Create Token
  } catch (error) {
    return next(error);
  }
};

export const googleSignInController = async (req, res, next) => {
  const { username, email, profilePic, mobile } = req.body;

  try {
    // % Check if user exist
    const userExist = await UserSchema.findOne({ email });
    if (userExist) {
      // * Send User Data to client with out password
      const { password, ...rest } = userExist._doc;

      // % User exist then create token and singin
      const token = jwt.sign({ id: userExist.id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      return res
        .status(200)
        .cookie('access_token', token, { httpOnly: true })
        .json(rest);
    } else {
      // % User Not Exist then create NewUser
      // & Create Password for googleUser
      const generatePassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      // & Hash Password
      const hashPassword = bcryptjs.hashSync(generatePassword, 10);
      // & Create New User Data
      const googleUser = new UserSchema({
        username: username,
        email: email,
        mobile: mobile,
        profilePic: profilePic,
        password: hashPassword,
      });
      // & Save to Database
      await googleUser.save();

      // * Send User Data to client with out password
      const { password, ...rest } = googleUser._doc;

      // * Create Token
      const token = jwt.sign({ id: googleUser.id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      return res
        .status(200)
        .cookie('access_token', token, { httpOnly: true })
        .json(rest);
    }
  } catch (error) {}
};
