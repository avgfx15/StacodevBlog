import { Link } from 'react-router-dom';
const WelcomeComponent = () => {
  return (
    <div>
      <div className='flex flex-col gap-6 lg:p-28 p-3 max-w-6xl mx-auto'>
        <h1 className='text-3xl font-bold lg:text-6xl'>Welcome To My Blog</h1>
        <p className='test-xs sm:text-sm text-gray-500'>
          Here you will find variety of post articles, tutorials, notes and
          other informative post content that you realy enjoy. All details are
          verified. We also appreciat your suggestion.
        </p>
        <Link
          to={'/search'}
          className='text-xs sm:text-sm font-bold text-teal-500 hover:underline'
        >
          View All Post
        </Link>
      </div>
    </div>
  );
};

export default WelcomeComponent;
