import { Sidebar } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { HiArrowSmRight, HiUser } from 'react-icons/hi';
import { HiDocumentText } from 'react-icons/hi2';

import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOutUserAction } from '../redux/User/UserActions';
import { currentUserState } from '../redux/User/UserSlice';

// # Main Component
const DashSidebar = () => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState('');
  const location = useLocation();

  const currentUser = useSelector(currentUserState);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    setTab(tabFromUrl);
  }, [location.search]);

  // & Handle SignOut User
  const handlesignOutUser = async () => {
    dispatch(signOutUserAction());
  };
  return (
    <Sidebar className='w-full md:w-56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup className='flex flex-col gap-2'>
          <Link to='/dashboard?tab=profile'>
            <Sidebar.Item
              active={tab === 'profile'}
              icon={HiUser}
              label={currentUser.isAdmin ? 'Admin' : 'User'}
              labelColor='dark'
              as='div'
            >
              Profile
            </Sidebar.Item>
          </Link>
          {currentUser.isAdmin && (
            <Link to='/dashboard?tab=posts'>
              <Sidebar.Item
                active={tab === 'posts'}
                icon={HiDocumentText}
                labelColor='dark'
                as='div'
              >
                Posts
              </Sidebar.Item>
            </Link>
          )}
          {currentUser.isAdmin && (
            <Link to='/dashboard?tab=users'>
              <Sidebar.Item
                active={tab === 'users'}
                icon={HiDocumentText}
                labelColor='dark'
                as='div'
              >
                Users
              </Sidebar.Item>
            </Link>
          )}
          {currentUser.isAdmin && (
            <Link to='/dashboard?tab=comments'>
              <Sidebar.Item
                active={tab === 'comments'}
                icon={HiDocumentText}
                labelColor='dark'
                as='div'
              >
                Comments
              </Sidebar.Item>
            </Link>
          )}
          <Sidebar.Item
            icon={HiArrowSmRight}
            className='cursor-pointer'
            onClick={handlesignOutUser}
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashSidebar;
