import { useSelector } from 'react-redux';

import {
  isPostLoadingState,
  postErrorState,
  recentPostsState,
} from '../redux/Post/PostSlice';

import { Link } from 'react-router-dom';

const RecentArticlePost = () => {
  // Selectors for posts, loading, and error states
  const recentPosts = useSelector(recentPostsState);

  const isLoading = useSelector(isPostLoadingState);
  const postError = useSelector(postErrorState);

  // Display loading spinner while data is being fetched
  if (isLoading) {
    return <div className='flex justify-center items-center'>Loading...</div>;
  }

  // Display error message if there's an error
  if (postError) {
    return (
      <div className='flex justify-center items-center text-red-500'>
        Error: {postError}
      </div>
    );
  }

  return (
    <div className='flex flex-col justify-center items-center mb-5'>
      <h1 className='text-xl text-center mb-4'>Recent Articles</h1>
      <div className='flex flex-wrap gap-3 mt-5 justify-center'>
        {recentPosts?.length > 0 ? (
          recentPosts?.map((post) => (
            <div key={post._id}>
              {/* <SinglePostCard post={post} /> */}
              <div className='group relative w-full border h-[400px] overflow-hidden rounded-lg sm:w-[350px] border-teal-500 hover:border-2 transition-all duration-300'>
                <Link to={`/posts/${post.slug}`}>
                  <img
                    alt='recentpost'
                    src={`/uploads/` + post.postImage}
                    className='h-[260px] w-full object-cover group-hover:h-[200px] transition-all duration-300 z-20'
                  />
                </Link>
                <div className='p-3 flex flex-col gap-2'>
                  <p className='text-lg font-semibold line-clamp-2'>
                    {post.title}
                  </p>
                  <span className='text-sm italic'>{post.category}</span>
                  <Link
                    to={`/posts/${post.slug}`}
                    className='z-10 absolute group-hover:bottom-0 bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2'
                  >
                    Read Article
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default RecentArticlePost;
