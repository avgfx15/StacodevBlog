import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// # Main SignUp Function
const SignUp = () => {
  // & React Hook
  const navigate = useNavigate();

  // & Declare Variable For FormData
  const [formData, setFormData] = useState({});

  // & Declare ErrorMessage
  const [errorMessage, setErrorMessage] = useState(null);

  // & Declare isLoading
  const [isLoading, setIsLoading] = useState(false);
  // & Handle Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  // & Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setErrorMessage(null);
      if (
        !formData.username ||
        !formData.email ||
        !formData.mobile ||
        !formData.password
      ) {
        return setErrorMessage('Please Fill Out All Fields');
      }
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      // % Handle Error
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setIsLoading(false);
      if (response.ok) {
        navigate('/signin');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
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
              <Label value='User Name'></Label>
              <TextInput
                type='text'
                placeholder='"Enter Your Username'
                id='username'
                onChange={handleChange}
              />
            </div>
            <div className=''>
              <Label value='Email'></Label>
              <TextInput
                type='email'
                placeholder='"Enter Your Email'
                id='email'
                onChange={handleChange}
              />
            </div>
            <div className=''>
              <Label value='Mobile'></Label>
              <TextInput
                type='text'
                placeholder='"Enter Your Mobile'
                id='mobile'
                onChange={handleChange}
              />
            </div>
            <div className=''>
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
                'Sign Up'
              )}
            </Button>
          </form>
          <div className='flex gap-4 text-sm mt-5'>
            <span>Already have an account? </span>
            <Link to='/signin' className='text-blue-600'>
              Sign In
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

export default SignUp;
