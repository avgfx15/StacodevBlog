import { useDispatch, useSelector } from 'react-redux';
import {
  allPostState,
  postsByLoggedInUserState,
} from '../redux/Post/PostSlice';
import { useEffect, useState } from 'react';
import { postsByLoggedInUserAction } from '../redux/Post/PostActions';
import { currentUserState } from '../redux/User/UserSlice';
import { Button, Table } from 'flowbite-react';
import { Link } from 'react-router-dom';

// # DashAllPost Component
const DashAllPost = () => {
  const dispatch = useDispatch();

  // const [showMore, setShowMore] = useState(true);
  const [visiblePosts, setVisiblePosts] = useState(9); // Initially show 9 posts

  const handleShowMorePost = () => {
    setVisiblePosts((prev) => prev + 9); // Increase by 9 more posts
  };

  // & Get Current User
  const currentUser = useSelector(currentUserState);

  // & Get All Post
  const allPost = useSelector(allPostState);

  // & Get All Post by currentUser
  const postsByLoggedInUser = useSelector(postsByLoggedInUserState);

  const displayedPosts = postsByLoggedInUser.slice(0, visiblePosts);
  // & Manage Show More State
  // useEffect(() => {
  //   if (postsByLoggedInUser.length > 9) {
  //     setShowMore(false);
  //   } else {
  //     setShowMore(true);
  //   }
  // }, [postsByLoggedInUser]);

  // & Get Total Count of All Post
  const totalPostCount = allPost.length;
  console.log(totalPostCount);

  // & Mount All Post By currentUser
  useEffect(() => {
    if (currentUser.isAdmin) {
      dispatch(postsByLoggedInUserAction(currentUser));
    }
  }, [currentUser, dispatch]);

  // # render
  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-600'>
      {currentUser.isAdmin && postsByLoggedInUser.length > 0 ? (
        <div>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Date Updated</Table.HeadCell>
              <Table.HeadCell>Post Image</Table.HeadCell>
              <Table.HeadCell>Post Title</Table.HeadCell>
              <Table.HeadCell>Post Category</Table.HeadCell>
              <Table.HeadCell>Edit</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            <Table.Body className='divide-y'>
              {displayedPosts.map((post) => (
                <Table.Row
                  key={post._id}
                  className='bg-white dark:bg-gray-600 dark:border-gray-900'
                >
                  <Table.Cell>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/posts/${post.slug}`}>
                      <img
                        src={
                          typeof post.postImage === 'string' &&
                          (post?.postImage.startsWith('http://') ||
                            post?.postImage.startsWith('https://'))
                            ? post?.postImage
                            : `./uploads/` + post.postImage
                        }
                        alt={post.title}
                        className='w-20 h-10 object-cover bg-gray-500'
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      to={`/posts/${post.slug}`}
                      className='font-bold text-black dark:text-white'
                    >
                      {post.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{post.category}</Table.Cell>
                  <Table.Cell>
                    <Link
                      to={`'/updatepost/${post._id}`}
                      className='text-teal-500'
                    >
                      <span className='hover:underline'>Edit</span>
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <span className='font-medium text-red-600 hover:underline cursor-pointer'>
                      Delete
                    </span>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          {visiblePosts < postsByLoggedInUser.length && (
            <Button
              onClick={handleShowMorePost}
              className='w-full text-white self-center my-3 text-lg'
            >
              Show More
            </Button>
          )}
        </div>
      ) : (
        <h3>There is No Post By You.</h3>
      )}
    </div>
  );
};

export default DashAllPost;
