import moment from 'moment';

import { FaThumbsUp } from 'react-icons/fa';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { commentsByPostState } from '../redux/Comment/CommentSlice';
import { currentUserState } from '../redux/User/UserSlice';
import { likeDisLikeCommentAction } from '../redux/Comment/CommentActions';

// # Main Function
const AllComments = () => {
  // & Get react hook
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // & Get all Comments by post Id
  const commentsByPost = useSelector(commentsByPostState);
  console.log(commentsByPost);

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
              src={`/uploads/` + comment?.userId.profilePic}
              alt='userProfile'
              className='h-10 w-10 my-3 rounded-full bg-gray-200'
            />
          </div>
          <div className='flex-1'>
            <div className='flex items-center mb-1'>
              <span className='font-bold truncate text-sm'>
                @ {comment?.userId ? comment.userId.username : 'anonymous user'}
              </span>
              <span>{moment(comment.createdAt).fromNow()}</span>
            </div>
            <div className='fle-2'>
              <p className='text-gray-400'>{comment?.commentText}</p>
            </div>
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
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllComments;
