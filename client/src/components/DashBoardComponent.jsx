// ~ Import react hook
import { useSelector } from 'react-redux';

// ~ Import Link from react-router-dom
import { Link } from 'react-router-dom';

// ~ Import from flowbite
import { Button, Table } from 'flowbite-react';

// ~ Import from react-icon
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from 'react-icons/hi';

// ~ import current User State
import {
  allUsersState,
  lastMonthRegisteredUsersState,
} from '../redux/User/UserSlice';

// ~ Import Current Post State
import { allPostState, lastMonthPostsState } from '../redux/Post/PostSlice';

// ~ Import Current Comment State
import {
  allCommentsState,
  lastMonthCommentsState,
} from '../redux/Comment/CommentSlice';

// # Main Dashboard Component
const DashBoardComponent = () => {
  const allUsers = useSelector(allUsersState);

  const lastMonthRegisteredUsers = useSelector(lastMonthRegisteredUsersState);

  const allPost = useSelector(allPostState);

  const lastMonthPosts = useSelector(lastMonthPostsState);

  const allComments = useSelector(allCommentsState);

  const lastMonthComments = useSelector(lastMonthCommentsState);

  // $ Display User
  const displayUser = allUsers ? allUsers.slice(0, 5) : [];

  // $ Display Comment
  const displayComment = allComments ? allComments.slice(0, 5) : [];

  // $ Display Post
  const displayPost = allPost ? allPost.slice(0, 5) : [];

  // # Render
  return (
    <div className='m-3'>
      <div className='flex flex-wrap gap-3 justify-center'>
        <div className='flex flex-col p-3 dark:bg-slate-800 gap-3 md:w-72 w-full rounded-md shadow-md border botder-teal-500'>
          <div className='text-center flex justify-between'>
            <div className=''>
              <h3 className='text-red-600 text-md uppercase'>Total Users</h3>
              <p className='text-2xl'>{allUsers.length}</p>
            </div>
            <HiOutlineUserGroup className='bg-teal-500 text-white rounded-full p-3 text-5xl shadow-lg' />
          </div>
          <div className='flex gap-3 text-sm'>
            <span className='text-green-500 flex items-center'>
              {lastMonthRegisteredUsers === 0 ? (
                0
              ) : (
                <>
                  <HiArrowNarrowUp />
                  <p>{lastMonthRegisteredUsers}</p>
                </>
              )}
            </span>
            <div className='text-gray-400'>Last Month</div>
          </div>
        </div>
        <div className='flex flex-col p-3 dark:bg-slate-800 gap-3 md:w-72 w-full rounded-md shadow-md border botder-teal-500'>
          <div className='text-center flex justify-between'>
            <div className=''>
              <h3 className='text-red-600 text-md uppercase'>Total Comment</h3>
              <p className='text-2xl'>{allComments?.length}</p>
            </div>
            <HiAnnotation className='bg-lime-700 text-white rounded-full p-3 text-5xl shadow-lg' />
          </div>
          <div className='flex gap-3 text-sm'>
            <span className='text-green-500 flex items-center'>
              {lastMonthComments === 0 ? (
                0
              ) : (
                <>
                  <HiArrowNarrowUp />
                  <p>{lastMonthComments}</p>
                </>
              )}
            </span>
            <div className='text-gray-400'>Last Month</div>
          </div>
        </div>
        <div className='flex flex-col p-3 dark:bg-slate-800 gap-3 md:w-72 w-full rounded-md shadow-md border botder-teal-500'>
          <div className='text-center flex justify-between'>
            <div className=''>
              <h3 className='text-red-600 text-md uppercase'>Total Post</h3>
              <p className='text-2xl'>{allPost?.length}</p>
            </div>
            <HiDocumentText className='bg-indigo-700 text-white rounded-full p-3 text-5xl shadow-lg' />
          </div>
          <div className='flex gap-3 text-sm'>
            <span className='text-green-500 flex items-center'>
              {lastMonthPosts === 0 ? (
                0
              ) : (
                <>
                  <HiArrowNarrowUp />
                  <p>{lastMonthPosts}</p>
                </>
              )}
            </span>
            <div className='text-gray-400'>Last Month</div>
          </div>
        </div>
      </div>

      <div className='flex flex-wrap gap-3 py-3 mx-auto justify-center'>
        {/* Get User Data  */}
        <div className='flex flex-col w-full lg:w-auto shadow-md p-2 rounded-md dark:bg-gray-700'>
          <div className='flex justify-center items-center border-b gap-20'>
            <h2 className='text-xl text-center'>Recent User</h2>
            {allUsers.length > 5 && (
              <Button
                type='button'
                gradientDuoTone='purpleToPink'
                className='text-white self-center my-3 text-lg'
              >
                <Link to={'/dashboard?tab=users'}>Show More</Link>
              </Button>
            )}
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>No</Table.HeadCell>
              <Table.HeadCell>User ProfilePic</Table.HeadCell>
              <Table.HeadCell>User Name</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {displayUser.map((user, ind) => (
                <Table.Row key={user._id}>
                  <Table.Cell className=''>
                    <p>{ind + 1}</p>
                  </Table.Cell>
                  <Table.Cell>
                    <img
                      src={`/uploads/${user.profilePic}`}
                      alt='user'
                      className='w-10 h-10 rounded-full mx-auto'
                    />
                  </Table.Cell>
                  <Table.Cell className=''>
                    <p>{user.name}</p>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>

        {/* Get Comments Data  */}

        <div className='flex flex-col  w-full lg:w-auto shadow-md p-2 rounded-md dark:bg-gray-700'>
          <div className='flex justify-center items-center border-b gap-20'>
            <h2 className='text-xl text-center'>Recent Comments</h2>
            {allComments.length > 5 && (
              <Button
                type='button'
                gradientDuoTone='purpleToPink'
                className='text-white self-center my-3 text-lg'
              >
                <Link to={'/dashboard?tab=comments'}>Show More</Link>
              </Button>
            )}
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>No</Table.HeadCell>
              <Table.HeadCell>Comment</Table.HeadCell>
              <Table.HeadCell>No Of Likes</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {displayComment.map((comment, ind) => (
                <Table.Row key={comment._id}>
                  <Table.Cell className='text-center'>{ind + 1}</Table.Cell>
                  <Table.Cell className='w-80'>
                    <p>{comment.commentText}</p>
                  </Table.Cell>
                  <Table.Cell className='text-center'>
                    {comment.noOfLikes}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>

        {/* Get Post Data  */}

        <div className='flex flex-col  w-full lg:w-auto shadow-md p-2 rounded-md dark:bg-gray-700'>
          <div className='flex justify-center items-center border-b gap-20'>
            <h2 className='text-xl text-center'>Recent Post</h2>
            {allPost?.length > 5 && (
              <Button
                type='button'
                gradientDuoTone='purpleToPink'
                className='text-white self-center my-3 text-lg'
              >
                <Link to={'/dashboard?tab=posts'}>Show More</Link>
              </Button>
            )}
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>No</Table.HeadCell>
              <Table.HeadCell>Post Image</Table.HeadCell>
              <Table.HeadCell>Post Title</Table.HeadCell>
              <Table.HeadCell>Post Category</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {displayPost.map((post, ind) => (
                <Table.Row key={post._id}>
                  <Table.Cell className='text-center'>{ind + 1}</Table.Cell>
                  <Table.Cell>
                    <img
                      src={`/uploads/${post.postImage}`}
                      alt='Post'
                      className='w-10 h-10 rounded-full mx-auto'
                    />
                  </Table.Cell>
                  <Table.Cell className='w-80'>{post.title}</Table.Cell>
                  <Table.Cell className=''>
                    <p>{post.category}</p>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default DashBoardComponent;
