import { Alert, Button, TextInput } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currentUserState, imageFileState } from '../redux/User/UserSlice';
import {
  updateUserAction,
  uploadProfilePicAction,
} from '../redux/User/UserActions';

// # Main DashProfile Component
const DashProfile = () => {
  const dispatch = useDispatch();
  // & Get Value For CurrentUser

  const [imageFile, setImageFile] = useState(null);

  const [inputData, setInputData] = useState({});

  const [updateMessage, setUpdateMessage] = useState(null);
  const [updateError, setUpdateError] = useState(null);

  const filePickerRef = useRef();

  const currentUser = useSelector(currentUserState);
  const imageFileUrl = useSelector(imageFileState);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleChange = async (e) => {
    setInputData({ ...inputData, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append('file', imageFile);
    dispatch(uploadProfilePicAction(formData));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(inputData).length === 0) {
      setUpdateError('No change done');
      return;
    }

    dispatch(updateUserAction({ inputData, currentUser }));
    setUpdateMessage('Profile updated successfully');
  };

  // # Rander Function
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center text-3xl font-semibold'>Profile</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input
          type='file'
          accept='image/*'
          onChange={handleProfilePicChange}
          ref={filePickerRef}
          hidden
        />

        <div
          className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUrl ? (
            <img
              src={
                imageFileUrl
                  ? `./uploads/` + imageFileUrl
                  : `./uploads/` + currentUser.profilePic
              }
              alt='profilePic'
              className='rounded-full w-full h-full object-cover border-8 border-[lightgray]'
            />
          ) : (
            <img
              src={
                typeof currentUser.profilePic === 'string' &&
                (currentUser?.profilePic.startsWith('http://') ||
                  currentUser?.profilePic.startsWith('https://'))
                  ? currentUser?.profilePic
                  : `./uploads/` + currentUser.profilePic
              }
              alt='profilePic'
              className='rounded-full w-full h-full object-cover border-8 border-[lightgray]'
            />
          )}
        </div>
        <TextInput
          type='text'
          id='username'
          placeholder='username'
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          type='text'
          id='name'
          placeholder='name'
          defaultValue={currentUser.name}
          onChange={handleChange}
        />
        <TextInput
          type='email'
          id='email'
          placeholder='email'
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput
          type='password'
          id='password'
          placeholder='password'
          onChange={handleChange}
        />
        <TextInput
          type='text'
          id='mobile'
          placeholder='Mobile'
          defaultValue={currentUser.mobile}
          onChange={handleChange}
        />
        <Button
          type='submit'
          className=''
          gradientDuoTone='purpleToBlue'
          outline
        >
          Update
        </Button>
      </form>
      <div className='text-red-700 mt-5 flex justify-between'>
        <span className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointer'>Sign Out</span>
      </div>
      {updateMessage && (
        <Alert className='mt-5' color='success'>
          {updateMessage}
        </Alert>
      )}
      {updateError && (
        <Alert className='mt-5' color='failure'>
          {updateError}
        </Alert>
      )}
    </div>
  );
};

export default DashProfile;
