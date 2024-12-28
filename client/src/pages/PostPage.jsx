import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getPostByPostSlugAction } from '../redux/Post/PostActions';
import { currentPostState, isPostLoadingState } from '../redux/Post/PostSlice';
import { Button, Spinner } from 'flowbite-react';

import 'react-quill/dist/quill.snow.css';
import CallToAction from '../components/CallToAction';
import CommentSection from '../components/CommentSection';

const PostPage = () => {
  const dispatch = useDispatch();
  const { postslug } = useParams();

  const currentPost = useSelector(currentPostState);

  const isPostLoading = useSelector(isPostLoadingState);

  useEffect(() => {
    dispatch(getPostByPostSlugAction(postslug));
  }, [dispatch, postslug]);

  if (isPostLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Spinner size='xl' />;
      </div>
    );
  }

  return (
    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
      <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
        {currentPost?.title}
      </h1>
      <Link
        to={`/search?category=${currentPost?.category}`}
        className='self-center mt-3'
      >
        <Button color='grey' pill size='xl'>
          {currentPost?.category}
        </Button>
      </Link>
      <img
        src={`/uploads/` + currentPost?.postImage}
        alt='currentPost'
        className='mt-10 p-3 max-h-[600px] w-full object-cover'
      />
      <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
        <span>{new Date(currentPost?.createdAt).toLocaleDateString()}</span>
        <span>{(currentPost?.content.length / 1000).toFixed(0)} mins read</span>
      </div>
      <div
        className='p-3 max-w-2xl mx-auto w-full postContent'
        dangerouslySetInnerHTML={{ __html: currentPost?.content }}
      ></div>
      <div className='max-w-4xl mx-auto w-full'>
        <CallToAction />
      </div>
      <div className='max-w-4xl mx-auto w-full'>
        <CommentSection postId={currentPost?._id} />
      </div>
    </main>
  );
};

export default PostPage;
