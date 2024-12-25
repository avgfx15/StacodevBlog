import { Alert, Button, TextInput } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// ~ import all state from userSlice
import {
  currentUserState,
  errorMsgState,
  errorState,
  imageFileState,
  isLoadingState,
  successMsgState,
} from '../redux/User/UserSlice';

// ~ Import user Actions from action
import {
  deleteUserAction,
  signOutUserAction,
  updateUserAction,
  uploadProfilePicAction,
} from '../redux/User/UserActions';

// ~ Import Components
import ModalComponent from './ModalComponent';
import { Link, useNavigate } from 'react-router-dom';

// # Main DashProfile Component
const DashProfile = () => {
  // & dispatch hook
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // & Get Value For CurrentUser

  // & Declare local state for Component
  // & imageFile State
  const [imageFile, setImageFile] = useState(null);

  // & Declare input state
  const [inputData, setInputData] = useState({});

  // & Declare showModalForm state
  const [showModalForm, setShowModalForm] = useState(false);

  // & Declare profilePic input ref
  const filePickerRef = useRef();

  // / Get all current State for User
  const currentUser = useSelector(currentUserState);
  const isLoading = useSelector(isLoadingState);
  const imageFileUrl = useSelector(imageFileState);
  const error = useSelector(errorState);
  const successMsg = useSelector(successMsgState);
  const errorMsg = useSelector(errorMsgState);

  // $ Handle change profilePic
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageFile(file);
    }
  };

  // $ HandleChange all input field
  const handleChange = async (e) => {
    setInputData({
      ...inputData,
      profilePic: imageFileUrl,
      [e.target.id]: e.target.value,
    });
  };

  // $ If new Image File then render
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
    setImageFile(null);
  }, [dispatch, imageFile]);

  // % Upload Image Func
  const uploadImage = async () => {
    const formData = new FormData();
    formData.append('file', imageFile);

    dispatch(uploadProfilePicAction(formData));
  };

  useEffect(() => {
    if (imageFileUrl) {
      setInputData({
        ...inputData,
        profilePic: imageFileUrl,
      });
    }
  }, [imageFileUrl]);

  // * Handle Update User
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputData);

    dispatch(updateUserAction({ inputData, currentUser }));

    setImageFile(null);
  };

  // & Handle SignOut User
  const handlesignOutUser = async () => {
    dispatch(signOutUserAction());
  };

  // - Handle Delete User Function
  const handleToDeleteUser = async () => {
    dispatch(deleteUserAction(currentUser));
    navigate('/signin');
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
          disabled={isLoading}
        >
          {isLoading ? 'loading...' : 'Update'}
        </Button>
        {currentUser.isAdmin && (
          <Link to={'/createnewpost'}>
            <Button
              type='button'
              className='w-full'
              gradientDuoTone='purpleToPink'
            >
              Create A New Post
            </Button>
          </Link>
        )}
      </form>
      <div className='text-red-700 mt-5 flex justify-between'>
        <span
          className='cursor-pointer'
          onClick={() => setShowModalForm(!showModalForm)}
        >
          Delete Account
        </span>
        <span className='cursor-pointer' onClick={handlesignOutUser}>
          Sign Out
        </span>
      </div>
      {successMsg && (
        <Alert className='mt-5' color='success'>
          {successMsg}
        </Alert>
      )}
      {error ||
        (errorMsg && (
          <Alert className='mt-5' color='failure'>
            {error || errorMsg}
          </Alert>
        ))}

      <ModalComponent
        showModalForm={showModalForm}
        setShowModalForm={setShowModalForm}
        message='Are you sure you want to delete your account ?'
        actionType='user'
        handleToDeleteUser={handleToDeleteUser}
      />
    </div>
  );
};

export default DashProfile;
