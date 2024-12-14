import { Alert, Button, TextInput } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateUserStart,
  updateUserSuccess,
  updatUserfailure,
} from '../redux/User/UserSlice';

// # Main DashProfile Component
const DashProfile = () => {
  const dispatch = useDispatch();
  // & Get Value For CurrentUser
  const { currentUser } = useSelector((state) => state.userReducer);

  console.log(currentUser);

  const [imageFile, setImageFile] = useState(null);

  const [imageFileUrl, setImageFileUrl] = useState(null);

  const [inputData, setInputData] = useState({});

  const [updateMessage, setUpdateMessage] = useState(null);
  const [updateError, setUpdateError] = useState(null);

  const filePickerRef = useRef();

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
    // e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('file', imageFile);
      const response = await fetch('http://localhost:3200/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log(data);
      setImageFileUrl(data);
      setInputData({ ...inputData, profilePic: data });

      return data;
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(inputData).length === 0) {
      setUpdateError('No change done');
      return;
    }
    try {
      dispatch(updateUserStart());

      const response = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputData),
      });

      const data = await response.json();

      if (!response.ok) {
        dispatch(updatUserfailure(data.message));
        return;
      } else {
        dispatch(updateUserSuccess(data));
        setUpdateMessage('User Profile Updates Successfully');
      }
    } catch (error) {
      dispatch(updatUserfailure(error.message));
      return;
    }
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
              src={currentUser.profilePic}
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
