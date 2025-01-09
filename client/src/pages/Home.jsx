import { useSelector } from 'react-redux';
import { allPostState } from '../redux/Post/PostSlice';
import { Link } from 'react-router-dom';
import WelcomeComponent from '../components/WelcomeComponent';
import CallToAction from '../components/CallToAction';
import { useState } from 'react';
import { Button } from 'flowbite-react';

const Home = () => {
  const [visiblePost, setVisiblePost] = useState(8);
  const allPost = useSelector(allPostState);
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    setVisiblePost((prev) => prev + 8);
  };

  const displayPost = allPost ? allPost.slice(0, visiblePost) : [];

  return (
    <div className=''>
      <WelcomeComponent />
      <div className='p-3 bg-amber-200 dark:bg-slate-700'>
        <CallToAction />
      </div>
      <div className='flex flex-col items-center gap-3 my-5'>
        <h2 className='text-3xl font-bold my-3'>Recent Post</h2>
        <div className='flex flex-wrap gap-3 justify-center my-3'>
          {displayPost?.map((post) => (
            <div key={post._id} className=''>
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
          ))}
        </div>
        {visiblePost < allPost.length && (
          <Button
            onClick={handleShowMore}
            gradientDuoTone='purpleToPink'
            className='w-96'
          >
            Show More
          </Button>
        )}
      </div>
    </div>
  );
};

export default Home;
