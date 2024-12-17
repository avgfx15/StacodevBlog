// ~ Button From flowbite-react
import { Button } from 'flowbite-react';

// ~  Google Circle Logo
import { AiFillGoogleCircle } from 'react-icons/ai';

import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../firebaseConfigure.js';

import { useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import { registerWithGoogleAction } from '../redux/User/UserActions.js';

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

      const userData = {
        username: resultFromGoogle.user.displayName,
        email: resultFromGoogle.user.email,
        mobile: resultFromGoogle.user.mobile,
        profilePic: resultFromGoogle.user.photoURL,
      };
      dispatch(registerWithGoogleAction(userData));
      navigate('/');
    } catch (error) {
      console.log(error.message);
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
