// ~ Button From flowbite-react
import { Button } from 'flowbite-react';

// ~  Google Circle Logo
import { AiFillGoogleCircle } from 'react-icons/ai';

import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../firebaseConfigure';

import { useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import { signInFailure, signInSuccess } from '../redux/User/UserSlice.js';

// # Main OAuth Function
const OAuth = () => {
  const auth = getAuth(app);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // & Handle Google Login
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
      const resultFromGoogle = await signInWithPopup(auth, provider);
      console.log(resultFromGoogle.user);

      const userData = {
        username: resultFromGoogle.user.displayName,
        email: resultFromGoogle.user.email,
        mobile: resultFromGoogle.user.mobile,
        profilePic: resultFromGoogle.user.photoURL,
      };
      const response = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer YOUR_API_KEY',
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log(response);

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      const response = await fetch('/api/auth/google');
      const text = await response.text();
      console.log(text);
      dispatch(signInFailure(error.message));
    }
  };

  // #  Main Render Function
  return (
    <Button
      type='button'
      gradientDuoTone='pinkToOrange'
      outline
      onClick={handleGoogleLogin}
    >
      <AiFillGoogleCircle className='w-6 h-6 mr-3' />
      Continue With Google
    </Button>
  );
};

export default OAuth;
