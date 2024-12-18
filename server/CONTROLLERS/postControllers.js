import { errorHandler } from '../MIDDLEWARE/errorMiddleware.js';
import PostSchema from '../MODELS/postSchema.js';

export const createNewPostController = async (req, res, next) => {
  const { title, content, category } = req.body;
  try {
    const loggedInUser = req.user;
    console.log(loggedInUser);

    if (!loggedInUser.isAdmin) {
      return next(errorHandler(400, 'You are not authorized to Create Post'));
    }
    if (!title || !content) {
      return next(errorHandler(400, 'Please fill all required fields'));
    }

    const titleMacthed = await PostSchema.findOne({ title });

    if (titleMacthed) {
      return next(errorHandler(400, 'Post with same title is Exist'));
    }

    const slug = title
      .split(' ')
      .join('-')
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, '-');

    const newBlog = new PostSchema({
      title,
      slug,
      content,
      category,
      author: loggedInUser.id,
    });

    const savedPost = await newBlog.save();
    res
      .status(201)
      .json({ message: 'Post created successfully', newPost: savedPost });
  } catch (error) {
    return next(errorHandler(500, 'Failed to Create New Post'));
  }
};
