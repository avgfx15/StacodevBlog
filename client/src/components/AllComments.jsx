import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import moment from 'moment';

import { FaThumbsUp } from 'react-icons/fa';

import { Textarea, Button } from 'flowbite-react';

import { commentsByPostState } from '../redux/Comment/CommentSlice';
import { currentUserState } from '../redux/User/UserSlice';
import {
  editCommentByCommentIdByOwnerAction,
  likeDisLikeCommentAction,
} from '../redux/Comment/CommentActions';

// # Main Function
const AllComments = () => {
  // & Get react hook
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // & Track the comment being edited
  const [editingCommentId, setEditingCommentId] = useState(null);

  // & Get Edited Conetnt
  const [editedComment, setEditedComment] = useState(null);

  // & Get all Comments by post Id
  const commentsByPost = useSelector(commentsByPostState);

  // & Get Current LoggedIn User
  const currentUser = useSelector(currentUserState);

  // + Like Or DisLike Comment
  const handleLikeDisLike = async (commentId) => {
    if (!currentUser) {
      navigate('/signin');
    } else {
      // & Update Comment Like
      dispatch(likeDisLikeCommentAction(commentId));
    }
  };

  // / Edit Comment By CommentId By Owner
  const handleEditCommentText = async (commentId) => {
    const findComment = await commentsByPost.find(
      (comment) => comment._id === commentId
    );
    if (findComment) {
      setEditingCommentId(commentId);
      setEditedComment(findComment?.commentText);
    } else {
      console.log('Comment Not Found');
    }
  };

  // * Update Comment
  const handleUpdateComment = async (commentId) => {
    dispatch(editCommentByCommentIdByOwnerAction({ commentId, editedComment }));
    setEditingCommentId(null);
  };

  // - Handle Delete Comment
  const handleDeleteComment = async (commentId) => {
    console.log(commentId);
  };

  // # Render Function
  return (
    <div>
      {commentsByPost?.map((comment) => (
        <div
          key={comment?._id}
          className='flex p-4 items-center border-b dark:border-gray-600 text-sm'
        >
          <div className='flex-shrink-0 mr-3'>
            <img
              src={`/uploads/` + comment?.userId?.profilePic}
              alt='userProfile'
              className='h-10 w-10 my-3 rounded-full bg-gray-200'
            />
          </div>
          <div className='flex-1'>
            <div className='flex items-center mb-1'>
              <span className='font-bold truncate text-sm'>
                @ {comment?.userId?.username}
              </span>
              <span>{moment(comment.createdAt).fromNow()}</span>
            </div>
            {editingCommentId === comment._id ? (
              <div>
                <Textarea
                  className='mb-2'
                  value={editedComment}
                  onChange={(e) => setEditedComment(e.target.value)}
                />
                <div className='flex'>
                  <Button
                    onClick={() => handleUpdateComment(comment._id)}
                    className=''
                    gradientDuoTone='purpleToBlue'
                    type='button'
                    size='sm'
                  >
                    Save
                  </Button>
                </div>
              </div>
            ) : (
              <div className='flex-2'>
                <p className='text-gray-400'>{comment?.commentText}</p>
              </div>
            )}

            <div className='flex gap-3 mt-3'>
              <button
                type='button'
                onClick={() => handleLikeDisLike(comment._id)}
                className={`text-gray-600 hover:text-blue-600 ${
                  currentUser &&
                  comment.likes.includes(currentUser._id) &&
                  '!text-blue-500'
                }`}
              >
                <FaThumbsUp className='text-sm' />
              </button>
              {comment?.likes?.length > 1 ? <p>Likes</p> : <p>Like</p>}
              <p className='text-sm text-gray-400'>{comment?.likes?.length}</p>

              {currentUser &&
                (currentUser?._id === comment?.userId?._id ||
                  currentUser.isAdmin) && (
                  <div className='flex gap-3'>
                    <button
                      className='hover:border-b border-teal-500 hover:text-teal-500'
                      onClick={() => handleEditCommentText(comment._id)}
                    >
                      Edit
                    </button>
                    <button
                      className='text-gray-300 hover:border-b border-red-500 hover:text-red-500'
                      type='button'
                      onClick={() => handleDeleteComment(comment._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllComments;
