import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from '../redux/User/UserSlice';

// # Main SignIn Function
const SignIn = () => {
  // & React Hook
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // & Declare Variable For FormData
  const [formData, setFormData] = useState({});

  const userState = useSelector((state) => state.userReducer);
  const { isLoading, error: errorMessage } = userState;

  // & Handle Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  // & Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      if (!formData.email || !formData.password) {
        return dispatch(signInFailure('Please Fill Out All Fields'));
      }
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      // % Handle Error
      if (data.success === false) {
        return dispatch(signInFailure(data.message));
      }

      if (response.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      return dispatch(signInFailure(error.message));
    }
  };

  // # Main SignUp Render
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-7xl mx-auto flex-col md:flex-row md:items-center gap-3'>
        <div className='flex-1'>
          <Link to='/' className='text-4xl  font-bold dark:text-white'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
              Stacodev
            </span>
            <span className='ml-2'>Blog</span>
          </Link>
          <p className='mt-5 text-sm'>
            This is a Blog page managed by Stacodev. Stcak Code Developer
          </p>
        </div>
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div className='mb-3'>
              <Label value='Email'></Label>
              <TextInput
                type='email'
                placeholder='"Enter Your Email'
                id='email'
                onChange={handleChange}
              />
            </div>

            <div className='mb-3'>
              <Label value='Password'></Label>
              <TextInput
                type='password'
                placeholder='"Enter Your Password'
                id='password'
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone='purpleToPink'
              type='submit'
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
          <div className='flex gap-4 text-sm mt-5'>
            <span>If no account? </span>
            <Link to='/signup' className='text-blue-600'>
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
