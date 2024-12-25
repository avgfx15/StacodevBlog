import 'react-quill/dist/quill.snow.css';

import { Button, FileInput, Select, TextInput } from 'flowbite-react';

import QuillEditor from '../components/QuillEditor';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getPostByPostIdAction,
  updatePostByPostIdByAuthorAction,
  uploadPostImageAction,
} from '../redux/Post/PostActions';
import { currentPostState, postImageUrlState } from '../redux/Post/PostSlice';
import { useParams } from 'react-router-dom';
import { currentUserState } from '../redux/User/UserSlice';

const UpdatePost = () => {
  const dispatch = useDispatch();

  // & Get PostId from useParams hook
  const { postId } = useParams();

  // & declare postImage
  const [postImage, setPostImage] = useState(null);

  // & Declare input state
  const [inputData, setInputData] = useState({});

  // const [editorContent, setEditorContent] = useState('');

  useEffect(() => {
    if (postId) {
      dispatch(getPostByPostIdAction(postId));
      setInputData({ ...inputData, content: currentPost?.content });
    }
  }, [dispatch, postId]);

  // % Handle Content Change in ReactQuill
  const handleEditorChange = (content) => {
    setInputData(content); // Update the state with the new content
    setInputData({ ...inputData, content });
  };

  // / Get all current State for User
  const currentUser = useSelector(currentUserState);
  const currentPost = useSelector(currentPostState);

  useEffect(() => {
    if (currentPost) {
      setInputData({
        ...inputData,
        title: currentPost.title,
        category: currentPost.category,
        content: currentPost?.content,
      });
      setPostImage(currentPost.postImage);
    }
  }, [currentPost]);

  // const postTitle = currentPost?.title;
  // const postCategory = currentPost?.category;

  const postImageUrl = useSelector(postImageUrlState);

  // & handle Post Image Change
  const handlePostImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPostImage(e.target.files[0]);
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
  };

  // % Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    setInputData((prevData) => {
      const updatedData = {
        ...prevData,
        postImage:
          postImageUrl === null ? currentPost?.postImage : postImageUrl,
      };

      dispatch(
        updatePostByPostIdByAuthorAction({
          postId,
          userId: currentUser._id,
          updatedData,
        })
      ); // Use updated data

      return updatedData; // Return updated state
    });

    setPostImage(null);
  };

  return (
    <div className='p-3 max-w-4xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Update Post</h1>
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
            value={inputData.title}
          />
          <Select
            onChange={(e) =>
              setInputData({ ...inputData, category: e.target.value })
            }
            id='category'
            value={inputData.category}
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
        {postImageUrl !== null ? (
          <img
            src={'../uploads/' + postImageUrl}
            className='w-full h-72 object-cover'
            alt='Post'
          />
        ) : (
          <img
            src={`../uploads/` + currentPost?.postImage}
            className='w-full h-72 object-cover'
            alt='Post'
          />
        )}

        <QuillEditor value={inputData.content} onChange={handleEditorChange} />
        <Button type='submit' gradientDuoTone='purpleToPink'>
          Update Post
        </Button>
      </form>
    </div>
  );
};

export default UpdatePost;
