import { useSelector } from 'react-redux';
import { currentUserState } from '../redux/User/UserSlice';
import { Link } from 'react-router-dom';
import { Button, Textarea } from 'flowbite-react';
import { useState } from 'react';

const CommentSection = ({ postId }) => {
  const [comment, setComment] = useState('');

  const currentUser = useSelector(currentUserState);

  const handleSubmit = async () => {};

  return (
    <div className=''>
      {currentUser ? (
        <div className='flex flex-col justify-center gap-2 my-3 text-gray-300 text-sm'>
          <div className='flex-1 flex gap-2 my-3 text-gray-300 text-sm'>
            <p className=''>Sign In as : </p>
            <img
              src={`../uploads/` + currentUser.profilePic}
              alt='loggedInuser'
              className='h-5 w-5 object-cover rounded-full'
            />
            <Link to={`/dashboard?tab=profile`}>@{currentUser.username}</Link>
          </div>
          <div className='flex-2 flex flex-col border border-teal-500 rounded-tr-3xl rounded-bl-3xl p-3'>
            <form className='' onSubmit={handleSubmit}>
              <Textarea
                placeholder='Add your comment...'
                row='3'
                maxLength='200'
                onChange={(e) => setComment(e.target.value)}
                value={comment}
              />
              <div className='flex justify-between mt-3'>
                <p className='text-xs text-gray-500'>
                  {200 - comment.length} characters remaining
                </p>
                <Button gradientDuoTone='purpleToPink'>Add Your Comment</Button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className='my-5 flex gap-2 items-center'>
          <p className='text-sm text-teal-500'>Must be signin to comment</p>
          <Link to={'/signin'} className='text-blue-500 hover:underline'>
            Sign In
          </Link>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
