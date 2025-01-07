import { useDispatch, useSelector } from 'react-redux';
import { currentUserState } from '../redux/User/UserSlice';
import { Link } from 'react-router-dom';
import { Button, Textarea } from 'flowbite-react';
import { useEffect, useState } from 'react';

import { commentsByPostState } from '../redux/Comment/CommentSlice';
import {
  createNewCommentAction,
  getAllCommentsByPostIdAction,
} from '../redux/Comment/CommentActions';
import AllComments from './AllComments';
import { currentPostState } from '../redux/Post/PostSlice';

// # Main Function
const CommentSection = () => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');

  const currentUser = useSelector(currentUserState);

  const currentPost = useSelector(currentPostState);

  const commentsByPost = useSelector(commentsByPostState);
  console.log(commentsByPost);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newComment = {
      content: comment,
      postId: currentPost._id,
      userId: currentUser._id,
    };

    dispatch(createNewCommentAction(newComment));
    setComment('');
  };

  useEffect(() => {
    dispatch(getAllCommentsByPostIdAction(currentPost._id));
  }, [dispatch, currentPost]);

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
                <Button gradientDuoTone='purpleToPink' type='submit'>
                  Add Your Comment
                </Button>
              </div>
            </form>
          </div>
          {commentsByPost.length === 0 ? (
            <p className='text-lg font-bold my-5 text-red-500'>
              Still no comments for this post
            </p>
          ) : (
            <div>
              <div className='flex gap-3 items-center'>
                <h2 className='text-gray-200'>Comments</h2>
                <div className='border border-gray-500 py-1 px-2 rounded-sm'>
                  <p className='text-gray-400'>{commentsByPost?.length}</p>
                </div>
              </div>
              <AllComments />
            </div>
          )}
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
