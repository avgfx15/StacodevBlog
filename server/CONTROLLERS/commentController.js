import { errorHandler } from '../MIDDLEWARE/errorMiddleware.js';
import CommentSchema from '../MODELS/commentSchema.js';

export const createCommentController = async (req, res, next) => {
  const { content, postId, userId } = req.body;
  try {
    const loggedInUser = req.user;
    if (userId !== loggedInUser.id) {
      return next(errorHandler(404, 'You are not authorized'));
    } else {
      const newComment = new CommentSchema({
        commentText: content,
        postId,
        userId: loggedInUser.id,
      });

      const savedComment = await newComment.save();
      if (!savedComment) {
        return next(errorHandler(401, 'Error to saved Comment'));
      } else {
        return res.status(200).json({
          message: 'Comment saved Successfully',
          successStatus: true,
          Comment: savedComment,
        });
      }
    }
  } catch (error) {
    return next(errorHandler(500, 'Error to saved Comment'));
  }
};

export const getAllCommentsByPostIdController = async (req, res, next) => {
  const postId = req.params.postId;
  console.log(postId);

  try {
    const getAllCommentsByPostId = await CommentSchema.find({
      postId: postId,
    }).sort({ createdAt: -1 });
    if (!getAllCommentsByPostId) {
      return res.status(401).json({
        message: 'There is no comments for this post',
        successStatus: false,
      });
    } else {
      return res.status(200).json({
        message: 'All Comments for this post.',
        successStatus: true,
        allComments: getAllCommentsByPostId,
      });
    }
  } catch (error) {
    return next(errorHandler(500, 'Error to get all comments byPostId'));
  }
};
