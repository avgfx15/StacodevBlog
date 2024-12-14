import { Button, TextInput } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

// # Main DashProfile Component
const DashProfile = () => {
  // & Get Value For CurrentUser
  const { currentUser } = useSelector((state) => state.userReducer);

  const [imageFile, setImageFile] = useState(null);

  const [imageFileUrl, setImageFileUrl] = useState(null);

  // const [message, setMessage] = useState('');
  console.log(imageFile);
  console.log(imageFileUrl);

  const filePickerRef = useRef();

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log(file);

      setImageFile(e.target.files[0]);
    }
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

      return data;
    } catch (error) {
      console.log(error.message);
    }
  };

  // # Rander Function
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center text-3xl font-semibold'>Profile</h1>
      <form className='flex flex-col gap-4'>
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
          <img
            src={
              imageFileUrl
                ? `./uploads/` + imageFileUrl
                : currentUser.profilePic
            }
            alt='profilePic'
            className='rounded-full w-full h-full object-cover border-8 border-[lightgray]'
          />
        </div>
        <TextInput
          type='text'
          id='username'
          placeholder='username'
          defaultValue={currentUser.username}
        />
        <TextInput
          type='email'
          id='email'
          placeholder='email'
          defaultValue={currentUser.email}
        />
        <TextInput type='password' id='password' placeholder='password' />
        <TextInput
          type='text'
          id='mobile'
          placeholder='Mobile'
          defaultValue={currentUser.mobile}
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
    </div>
  );
};

export default DashProfile;
