import React from 'react';
import ReactQuill from 'react-quill';
import { modules, formats, QuillToolbar } from './QuillToolbar';
import 'react-quill/dist/quill.snow.css';

export const QuillEditor = () => {
  const [state, setState] = React.useState({ value: null });
  const handleChange = (value) => {
    setState({ value });
  };
  return (
    <div className='text-editor'>
      <QuillToolbar />
      <ReactQuill
        theme='snow'
        value={state.value}
        onChange={handleChange}
        placeholder={'Write something awesome...'}
        modules={modules}
        formats={formats}
        className='h-80 mb-10'
        required
      />
    </div>
  );
};

export default QuillEditor;
