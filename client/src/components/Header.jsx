import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';

import { Link, useLocation } from 'react-router-dom';

import { AiOutlineSearch } from 'react-icons/ai';

import { FaMoon, FaSun } from 'react-icons/fa';

import { useDispatch, useSelector } from 'react-redux';

import { toggleTheme } from '../redux/Theme/ThemeSlice';
import { currentUserState } from '../redux/User/UserSlice';
import { signOutUserAction } from '../redux/User/UserActions';

// # Main Home Component
const Header = () => {
  const path = useLocation().pathname;

  const dispatch = useDispatch();

  const currentUser = useSelector(currentUserState);

  const { theme } = useSelector((state) => state.themeReducer);

  const profilePic = currentUser?.profilePic || '';
  const isProfilePicValid =
    profilePic.startsWith('http://') || profilePic.startsWith('https://');

  // & Handle SignOut User
  const handlesignOutUser = async () => {
    dispatch(signOutUserAction());
  };

  // # Render Function
  return (
    <Navbar className='border-b-2'>
      <Link
        to='/'
        className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'
      >
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
          Stacodev
        </span>
        <span className='ml-2'>Blog</span>
      </Link>
      <form>
        <TextInput
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline'
        />
      </form>
      <Button className='w-12 h-10 lg:hidden' color='grey' pill>
        <AiOutlineSearch />
      </Button>
      <div className='flex gap-2 md:order-2'>
        <Button
          className='w-12 h-10 hidden sm:inline'
          color='black'
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === 'light' ? <FaMoon /> : <FaSun />}
        </Button>

        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt='User'
                img={isProfilePicValid ? profilePic : `./uploads/` + profilePic}
                rounded
              />
            }
          >
            <Dropdown.Header>
              <span className='block test-sm'>@{currentUser.username}</span>
              <span className='block test-sm font-medium truncate'>
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handlesignOutUser}>Sign Out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to='/signin'>
            <Button gradientDuoTone='purpleToBlue' outline>
              Sign In
            </Button>
          </Link>
        )}

        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === '/'} as={'div'}>
          <Link to='/'>Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/about'} as={'div'}>
          <Link to='/about'>About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/projects'} as={'div'}>
          <Link to='/projects'>Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
