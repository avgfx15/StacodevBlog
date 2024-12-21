import { errorHandler } from '../MIDDLEWARE/errorMiddleware.js';
import PostSchema from '../MODELS/postSchema.js';

export const createNewPostController = async (req, res, next) => {
  const { title, content, category } = req.body;
  try {
    const loggedInUser = req.user;

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
      postImage: req.body.postImage,
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

// / Get All Post Controller
export const getAllPostController = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortAscending = req.query.order === 'asc' ? 1 : -1;

    const allPosts = await PostSchema.find({
      ...(req.query.author && { author: req.query.author }),
      ...(req.query.id && { _id: req.query.id }),
      ...(req.query.title && { title: req.query.title }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.searchText && {
        $or: [
          { title: { $regex: req.query.searchText, $options: 'i' } },
          {
            content: { $regex: req.query.searchText, $options: 'i' },
          },
        ],
      }),
    }).sort({ updatedAt: sortAscending });

    const totalPostsCount = await PostSchema.countDocuments();

    const currentNow = new Date();

    const oneMonthAgo = new Date(
      currentNow.getFullYear(),
      currentNow.getMonth() - 1,
      currentNow.getDate()
    );

    const lastMonthPosts = await PostSchema.countDocuments({
      updatedAt: { $gte: oneMonthAgo },
    });
    res.status(201).json({
      message: 'Post created successfully',
      AllPost: allPosts,
      totalPostsCount,
      lastMonthPosts,
    });
  } catch (error) {
    return next(errorHandler(500, 'Failed to Get All Posts'));
  }
};
