import bcryptjs from 'bcryptjs';

import UserSchema from '../MODELS/userSchema.js';

export const signUpController = async (req, res) => {
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
      return res.status(400).json({ message: 'All fields are required' });
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
    return res.status(500).json({ message: error.message });
  }
};
