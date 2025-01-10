import { errorHandler } from '../MIDDLEWARE/errorMiddleware.js';
import PostSchema from '../MODELS/postSchema.js';

// + Create new post
export const createNewPostController = async (req, res, next) => {
  const { title, content, category } = req.body;
  try {
    // & get logged In user
    const loggedInUser = req.user;
    // % Check loggesIn user is not admin
    if (!loggedInUser.isAdmin) {
      return next(errorHandler(400, 'You are not authorized to Create Post'));
    }
    // % check req.body input is empty
    if (!title || !content) {
      return next(errorHandler(400, 'Please fill all required fields'));
    }
    // % Check if post title already exist
    const titleMacthed = await PostSchema.findOne({ title });

    if (titleMacthed) {
      return next(errorHandler(400, 'Post with same title is Exist'));
    }
    // & Create slug for creating post route
    const slug = title
      .split(' ')
      .join('_')
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, '-');

    // % Create new post object
    const newBlog = new PostSchema({
      title,
      slug,
      content,
      category,
      postImage: req.body.postImage,
      author: loggedInUser.id,
    });
    // % Save newPost in DB
    const savedPost = await newBlog.save();
    res.status(201).json({
      message: 'Post created successfully',
      successStatus: false,
      newPost: savedPost,
    });
  } catch (error) {
    return next(errorHandler(500, 'Failed to Create New Post'));
  }
};

// / Get All Post Controller
export const getAllPostController = async (req, res, next) => {
  try {
    // & Create sort condition as ascending order
    const sortAscending = req.query.sort === 'asc' ? 1 : -1;

    // & get all post from DB with query
    const allPosts = await PostSchema.find({
      ...(req.query.author && { author: req.query.author }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.title && { title: req.query.title }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: 'i' } },
          {
            content: { $regex: req.query.searchTerm, $options: 'i' },
          },
        ],
      }),
    }).sort({ updatedAt: sortAscending });

    // & Get total post count
    const totalPostsCount = await PostSchema.countDocuments();
    // & Calculate time from create or update to till date
    // & Get Current Date
    const currentNow = new Date();

    // & Get time more then 1 month
    const oneMonthAgo = new Date(
      currentNow.getFullYear(),
      currentNow.getMonth() - 1,
      currentNow.getDate()
    );
    // & Get Last month post count
    const lastMonthPosts = await PostSchema.countDocuments({
      updatedAt: { $gte: oneMonthAgo },
    });

    res.status(201).json({
      message: 'Get Post.',
      AllPost: allPosts,
      totalPostsCount,
      lastMonthPosts,
      successStatus: true,
    });
  } catch (error) {
    return next(errorHandler(500, 'Failed to Get All Posts'));
  }
};

// - Delete Post By PostId and Author

export const deletePostController = async (req, res, next) => {
  try {
    // & Get post from params
    const postId = req.params.postId;

    // & Get LoggedIn user
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
    // - Find Post and Delete
    await PostSchema.findByIdAndDelete(postId);
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    return next(errorHandler(500, 'Failed to delete Post'));
  }
};

// / Get Post By author by postId

export const getPostByPostIdController = async (req, res, next) => {
  try {
    // & Get Post Id by params
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

    // % get updated req.body input
    const { title, content, category } = req.body;

    // & Create new slug based on new title
    const slug = title
      .split(' ')
      .join('_')
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

    // % If error to update
    if (!updatePost) {
      return next(errorHandler(404, 'Error to update Post'));
    } else {
      return res.status(200).json(updatePost);
    }
  } catch (error) {
    return next(errorHandler(500, 'Failed to update post'));
  }
};

export const getRecentPostController = async (req, res, next) => {
  try {
    const getRecentPost = await PostSchema.find()
      .sort({ updatedAt: -1 })
      .limit(3);

    return res.status(200).json(getRecentPost);
  } catch (error) {
    return next(errorHandler(500, 'Failed to get recent Post'));
  }
};
