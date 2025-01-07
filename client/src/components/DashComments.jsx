import { useDispatch, useSelector } from 'react-redux';

import { useEffect, useState } from 'react';

import { allUsersState, currentUserState } from '../redux/User/UserSlice';
import { Button, Table } from 'flowbite-react';
import { Link } from 'react-router-dom';
import ModalComponent from './ModalComponent';
import {
  deleteUserByAdminAction,
  getAllUsersByAdminAction,
} from '../redux/User/UserActions';
import { FaTimes, FaCheck } from 'react-icons/fa';

// # DashAllPost Component
const DashComments = () => {
  const dispatch = useDispatch();

  // & Declare showModalForm state
  const [showModalForm, setShowModalForm] = useState(false);

  // & Post Id
  const [getUser, setGetUser] = useState(null);

  // & Get CurrentUser details
  const currentUser = useSelector(currentUserState);

  // & Get All Post by currentUser
  const allUsers = useSelector(allUsersState);
  console.log(allUsers);

  // & Initially show 9 posts
  const [visibleUsers, setVisibleUsers] = useState(9);

  const handleShowMorePost = () => {
    setVisibleUsers((prev) => prev + 9); // Increase by 9 more posts
  };

  const displayedUsers = allUsers ? allUsers.slice(0, visibleUsers) : [];

  // - Delete Post
  const handleToDeleteUserByAdmin = async () => {
    dispatch(deleteUserByAdminAction(getUser._id));
    dispatch(getAllUsersByAdminAction());

    setShowModalForm(false);
  };

  // & Mount All Post By currentUser
  useEffect(() => {
    if (currentUser.isAdmin) {
      dispatch(getAllUsersByAdminAction());
    }
  }, [currentUser, dispatch]);

  // # render
  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-600'>
      {currentUser.isAdmin && allUsers?.length > 0 ? (
        <div>
          <Table hoverable className='shadow-md'>
            <Table.Head className='text-center'>
              <Table.HeadCell>Date Updated</Table.HeadCell>
              <Table.HeadCell>Comment Content</Table.HeadCell>
              <Table.HeadCell>No Of Likes</Table.HeadCell>
              <Table.HeadCell>Comment Post Id</Table.HeadCell>
              <Table.HeadCell>Comment User Id</Table.HeadCell>
              <Table.HeadCell>Admin</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            <Table.Body className='divide-y'>
              {displayedUsers.map((user) => (
                <Table.Row
                  key={user._id}
                  className='bg-white dark:bg-gray-600 dark:border-gray-900'
                >
                  <Table.Cell>
                    {new Date(user.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/posts/${user.username}`}>
                      <img
                        src={
                          typeof user.profilePic === 'string' &&
                          (user?.profilePic.startsWith('http://') ||
                            user?.profilePic.startsWith('https://'))
                            ? user?.profilePic
                            : `./uploads/` + user?.profilePic
                        }
                        alt={user.username}
                        className='w-20 h-10 object-cover bg-gray-500'
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      to={`/user/${user.unsename}`}
                      className='font-bold text-black dark:text-white'
                    >
                      {user.username}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{user.name}</Table.Cell>
                  <Table.Cell>
                    <Link
                      to={`/user/${user.unsename}`}
                      className='font-bold text-black dark:text-white'
                    >
                      {user.email}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <span className='hover:underline text-center'>
                      {user.isAdmin === false ? (
                        <FaTimes className='text-2xl text-red-700' />
                      ) : (
                        <FaCheck className='text-green-500 text-2xl' />
                      )}
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <span
                      className='font-medium text-red-600 hover:underline cursor-pointer'
                      onClick={() => {
                        setShowModalForm(true);
                        setGetUser(user);
                      }}
                    >
                      Delete
                    </span>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          {visibleUsers < allUsers.length && (
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
      <ModalComponent
        showModalForm={showModalForm}
        setShowModalForm={setShowModalForm}
        message='Are you sure you want to delete User ?'
        handleToDeleteUserByAdmin={handleToDeleteUserByAdmin}
        actionType='user'
        userType='admin'
      />
    </div>
  );
};

export default DashComments;
