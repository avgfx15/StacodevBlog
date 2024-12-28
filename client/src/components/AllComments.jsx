import { useSelector } from 'react-redux';
import { commentsByPostState } from '../redux/Comment/CommentSlice';
import { allUsersState } from '../redux/User/UserSlice';

const AllComments = () => {
  const commentsByPost = useSelector(commentsByPostState);
  const allUsers = useSelector(allUsersState);

  return (
    <div>
      <div className='flex gap-3 items-center'>
        <h2 className='text-gray-200'>Comments</h2>
        <div className='border border-gray-500 py-1 px-2 rounded-sm'>
          <p className='text-gray-400'>{commentsByPost.length}</p>
        </div>
      </div>
      {commentsByPost.map((comment) => (
        <div key={comment.id}>
          <p>{comment.commentText}</p>
        </div>
      ))}
    </div>
  );
};

export default AllComments;
