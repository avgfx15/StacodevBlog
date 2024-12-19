import 'react-quill/dist/quill.snow.css';

import { Button, FileInput, Select, TextInput } from 'flowbite-react';

import QuillEditor from '../components/QuillEditor';

const CreateNewPost = () => {
  return (
    <div className='p-3 max-w-4xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>CreateNewPost</h1>
      <form className='flex flex-col gap-4'>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput
            type='text'
            placeholder='Post Title'
            required
            id='postTitle'
            className='flex-1'
          />
          <Select>
            <option value='uncategorized'>Select a category</option>
            <option value='javascript'>Javascript</option>
            <option value='reactjs'>ReactJs</option>
            <option value='nodejs'>NodeJs</option>
          </Select>
        </div>
        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
          <FileInput type='file' accept='image/*' />
          <Button
            type='button'
            className=''
            size='sm'
            gradientDuoTone='purpleToBlue'
            outline
          >
            Upload Image
          </Button>
        </div>
        {/* <ReactQuill
          theme='snow'
          placeholder='Write your post'
          className='h-80 mb-10'
          required
        /> */}
        <QuillEditor />
        <Button type='submit' gradientDuoTone='purpleToPink'>
          Publish Post
        </Button>
      </form>
    </div>
  );
};

export default CreateNewPost;
