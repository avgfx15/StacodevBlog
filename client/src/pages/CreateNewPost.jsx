import 'react-quill/dist/quill.snow.css';

import { Button, FileInput, Select, TextInput } from 'flowbite-react';

import QuillEditor from '../components/QuillEditor';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { currentUserState } from '../redux/User/UserSlice';
import {
  createNewPostAction,
  uploadPostImageAction,
} from '../redux/Post/PostActions';
import { postImageUrlState } from '../redux/Post/PostSlice';

// # Main Create Post Component
const CreateNewPost = () => {
  const dispatch = useDispatch();
  // & declare postImage
  const [postImage, setPostImage] = useState(null);

  // & Declare input state
  const [inputData, setInputData] = useState({});

  const [editorContent, setEditorContent] = useState('');

  const handleEditorChange = (content) => {
    setEditorContent(content); // Update the state with the new content
    setInputData({ ...inputData, content });
  };

  // / Get all current State for User
  const currentUser = useSelector(currentUserState);
  console.log(currentUser);

  const postImageUrl = useSelector(postImageUrlState);

  // & handle Post Image Change
  const handlePostImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPostImage(e.target.files[0]);
    } else {
      console.log('Please add File');

      setPostImage(null);
    }
  };

  // & Upload Image
  const handleUploadPostImage = async () => {
    if (!postImage) {
      return;
    }
    const formData = new FormData();
    formData.append('file', postImage);
    dispatch(uploadPostImageAction(formData));
    setInputData({
      ...inputData,
      postImage: postImageUrl,
    });
    console.log(inputData);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log(inputData);

    dispatch(createNewPostAction(inputData));
  };

  return (
    <div className='p-3 max-w-4xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>CreateNewPost</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput
            type='text'
            placeholder='Post Title'
            required
            id='postTitle'
            className='flex-1'
            onChange={(e) =>
              setInputData({ ...inputData, title: e.target.value })
            }
          />
          <Select
            onChange={(e) =>
              setInputData({ ...inputData, category: e.target.value })
            }
            id='category'
          >
            <option value='uncategorized'>Select a category</option>
            <option value='javascript'>Javascript</option>
            <option value='reactjs'>ReactJs</option>
            <option value='nodejs'>NodeJs</option>
          </Select>
        </div>
        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
          <FileInput
            type='file'
            accept='image/*'
            onChange={handlePostImageChange}
          />
          <Button
            type='button'
            className=''
            size='sm'
            gradientDuoTone='purpleToBlue'
            outline
            onClick={handleUploadPostImage}
          >
            Upload Image
          </Button>
        </div>
        {postImage !== null && (
          <img
            src={'./uploads/' + postImageUrl}
            className='w-full h-72 object-cover'
            alt='Post'
          />
        )}

        <QuillEditor value={editorContent} onChange={handleEditorChange} />
        <Button type='submit' gradientDuoTone='purpleToPink'>
          Publish Post
        </Button>
      </form>
    </div>
  );
};

export default CreateNewPost;
