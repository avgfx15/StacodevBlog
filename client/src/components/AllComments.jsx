import moment from 'moment';

import { useSelector } from 'react-redux';
import { commentsByPostState } from '../redux/Comment/CommentSlice';

const AllComments = () => {
  const commentsByPost = useSelector(commentsByPostState);

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
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllComments;
