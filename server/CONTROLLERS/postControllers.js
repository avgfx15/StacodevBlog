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
    console.log(req.query.slug);

    const sortAscending = req.query.order === 'asc' ? 1 : -1;

    const allPosts = await PostSchema.find({
      ...(req.query.author && { author: req.query.author }),
      ...(req.query.postId && { _id: req.query.postId }),
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

// - Delete Post By PostId and Author

export const deletePostController = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const user = req.user;

    // & Check if loggedInUser is Admin
    if (!user.isAdmin) {
      return next(
        errorHandler(403, 'You are not authorized to delete the Post')
      );
    }

    // & Find Post by id
    const post = await PostSchema.findById(postId);

    // & Check Post author is loggedInUser or not
    if (post.author.toString() !== user.id) {
      return next(errorHandler(403, 'You are not the author of this post'));
    }

    // & If no post found
    if (!post) {
      return next(errorHandler(404, 'Post not found'));
    }

    await PostSchema.findByIdAndDelete(postId);
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    return next(errorHandler(500, 'Failed to delete Post'));
  }
};

// / Get Post By author by postId

export const getPostByPostIdController = async (req, res, next) => {
  try {
    const postId = req.params.postId;

    // & Find Post by id
    const post = await PostSchema.findById(postId);

    // & If no post found
    if (!post) {
      return next(errorHandler(404, 'Post not found'));
    }
    res.status(200).json(post);
  } catch (error) {
    return next(errorHandler(500, 'Failed to Get Post'));
  }
};

// * Update Post By author by postId
export const updatePostController = async (req, res, next) => {
  try {
    // & get from token
    const loggedInUser = req.user;

    // & get from params
    const postId = req.params.postId;
    const userId = req.params.userId;

    // & check loggedInUser isAdmin and req.params.id, requested user are same
    if (!loggedInUser.isAdmin || loggedInUser.id !== userId) {
      return next(
        errorHandler(403, 'You are not authorized to update the Post')
      );
    }

    const { title, content, category } = req.body;
    console.log(req.body);

    const slug = title
      .split(' ')
      .join('-')
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, '-');
    console.log(slug);

    // & Update Post
    const updatePost = await PostSchema.findByIdAndUpdate(
      postId,
      {
        $set: {
          title,
          slug,
          content,
          category,
          postImage: req.body.postImage,
          author: loggedInUser.id,
        },
      },
      {
        new: true,
      }
    );
    if (!updatePost) {
      return next(errorHandler(404, 'Error to update Post'));
    } else {
      console.log(updatePost);

      return res.status(200).json(updatePost);
    }
  } catch (error) {
    return next(errorHandler(500, 'Failed to update post'));
  }
};
