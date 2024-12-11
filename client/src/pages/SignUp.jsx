import { Button, Label, TextInput } from 'flowbite-react';
import { Link } from 'react-router-dom';

const SignUp = () => {
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
          <form className='flex flex-col gap-4'>
            <div className='mb-3'>
              <Label value='User Name'></Label>
              <TextInput
                type='text'
                placeholder='"Enter Your Username'
                id='username'
              />
            </div>
            <div className=''>
              <Label value='Email'></Label>
              <TextInput
                type='email'
                placeholder='"Enter Your Email'
                id='email'
              />
            </div>
            <div className=''>
              <Label value='Email'></Label>
              <TextInput
                type='text'
                placeholder='"Enter Your Mobile'
                id='mobile'
              />
            </div>
            <div className=''>
              <Label value='Email'></Label>
              <TextInput
                type='password'
                placeholder='"Enter Your Password'
                id='password'
              />
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit'>
              Sign Up
            </Button>
          </form>
          <div className='flex gap-4 text-sm mt-5'>
            <span>Already have an account? </span>
            <Link to='/signin' className='text-blue-600'>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
