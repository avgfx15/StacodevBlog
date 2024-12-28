import { errorHandler } from '../MIDDLEWARE/errorMiddleware.js';
import CommentSchema from '../MODELS/commentSchema.js';

export const createCommentController = async (req, res, next) => {
  const { comment, postId, userId } = req.body;
  try {
    const loggedInUser = req.user;
    if (userId !== loggedInUser.id) {
      return next(errorHandler(404, 'You are not authorized'));
    } else {
      const newComment = new CommentSchema({
        comment,
        postId,
        userId: loggedInUser.id,
      });

      const savedComment = await newComment.save();
      if (!savedComment) {
        return next(errorHandler(401, 'Error to saved Comment'));
      } else {
        return res.status(200).json({
          message: 'Comment saved Successfully',
          Comment: savedComment,
        });
      }
    }
  } catch (error) {
    return next(errorHandler(500, 'Error to saved Comment'));
  }
};
