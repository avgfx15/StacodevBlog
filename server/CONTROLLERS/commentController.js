import { errorHandler } from '../MIDDLEWARE/errorMiddleware.js';
import CommentSchema from '../MODELS/commentSchema.js';

// + Create new Comment by user loggedIn aby postId
export const createCommentController = async (req, res, next) => {
  const { content, postId, userId } = req.body;
  try {
    // % Get LoggedIn user
    const loggedInUser = req.user;

    // % Check loggedIn user same as req.user
    if (userId !== loggedInUser.id) {
      return next(errorHandler(404, 'You are not authorized'));
    } else {
      // $ Create new Comment
      const newComment = new CommentSchema({
        commentText: content,
        postId,
        userId: loggedInUser.id,
      });
      // & save comment to DB
      const savedComment = await newComment.save();

      if (!savedComment) {
        return next(errorHandler(401, 'Error to saved Comment'));
      } else {
        const newSavedComment = await CommentSchema.find(
          savedComment._id
        ).populate('userId', 'username profilePic');

        return res.status(200).json({
          message: 'Comment saved Successfully',
          successStatus: true,
          Comment: newSavedComment,
        });
      }
    }
  } catch (error) {
    return next(errorHandler(500, 'Error to saved Comment'));
  }
};

// / Get All Comment Data with populate userData
export const getAllCommentsByPostIdController = async (req, res, next) => {
  // % get Post Id by params
  const postId = req.params.postId;

  try {
    // & find post by Id and get userData by using populate
    const getAllCommentsByPostId = await CommentSchema.find({
      postId: postId,
    })
      .populate('userId', 'username profilePic')
      .sort({ createdAt: -1 });

    // % if no comment by postId
    if (getAllCommentsByPostId.length === 0 || !getAllCommentsByPostId) {
      return res.status(404).json({
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
    console.log('Error Catch');

    return next(errorHandler(500, 'Error to get all comments by PostId'));
  }
};

// + Like or UnLike Comment by comment Id
export const likeUnLikeCommentController = async (req, res, next) => {
  try {
    // &  Get LoggedIn User
    const loggedInUser = req.user;

    // &  Get comment id by params
    const commentId = req.params.commentId;

    // & Find By comment Id
    const getComment = await CommentSchema.findById(commentId).populate(
      'userId',
      'username profilePic'
    );

    // * If no comment
    if (!getComment) {
      return res
        .status(401)
        .json({ message: 'Comment not exist', successStatus: false });
    } else {
      // & Check if user already like or unlike comment by find index of user in likes array
      const getuserIndex = getComment.likes.indexOf(loggedInUser.id);
      // % if user already like comment

      if (getuserIndex === -1) {
        // & Add user to likes array
        getComment.likes.push(loggedInUser.id);
        getComment.noOfLikes += 1;
      } else {
        // & Remove user from likes array
        getComment.likes.splice(getuserIndex, 1);
        getComment.noOfLikes -= 1;
      }

      await getComment.save();

      return res.status(201).json({
        message: 'Like or DisLike done',
        successStatus: true,
        comment: getComment,
      });
    }
  } catch (error) {
    return next(errorHandler(500, 'Failed to like or dislike comment'));
  }
};

// * Edit Or Update Comment By User By Id
export const editCommentController = async (req, res, next) => {
  try {
    // & Get comment id by params
    const commentId = req.params.commentId;

    // & Get LoggedIn User
    const loggedInUser = req.user;
    const findComment = await CommentSchema.findById(commentId).populate(
      'userId',
      'username profilePic'
    );
    // * If no comment
    if (!findComment) {
      return res
        .status(401)
        .json({ message: 'Comment not exist', successStatus: false });
    }

    // & Check if user is owner of comment
    if (
      findComment.userId._id.toHexString() !== loggedInUser.id &&
      !loggedInUser.isAdmin
    ) {
      return res.status(401).json({
        message: 'You are not owner of comment',
        successStatus: false,
      });
    } else {
      // & Update comment by user
      const updatedComment = await CommentSchema.findByIdAndUpdate(
        commentId,
        { commentText: req.body.commentText },
        { new: true }
      ).populate('userId', 'username profilePic');

      // & Return updated comment
      return res.status(201).json({
        message: 'Comment updated',
        successStatus: true,
        updatedComment: updatedComment,
      });
    }
  } catch (error) {
    return next(errorHandler(500, 'Failed to edit comment'));
  }
};

// - Delete Comment By Owner or Admin By Comment Id
export const deleteCommentByCommentIdController = async (req, res, next) => {
  try {
    const loggedInUser = req.user;
    const commentId = req.params.commentId;
    const findComment = await CommentSchema.findById(commentId).populate(
      'userId',
      'username profilePic'
    );
    // * If no comment
    if (!findComment) {
      return res
        .status(401)
        .json({ message: 'Comment not exist', successStatus: false });
    }
    // & Check if user is owner of comment
    if (
      findComment.userId._id.toHexString() !== loggedInUser.id &&
      !loggedInUser.isAdmin
    ) {
      return res.status(401).json({
        message: 'You are not owner of comment',
        successStatus: false,
      });
    }
    // & Delete comment by user
    await CommentSchema.findByIdAndDelete(commentId);
    return res
      .status(200)
      .json({ message: 'Comment deleted', successStatus: true });
  } catch (error) {
    return next(errorHandler(500, 'Failed to delete comment'));
  }
};
