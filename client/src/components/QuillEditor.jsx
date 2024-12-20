import ReactQuill from 'react-quill';
import { modules, formats, QuillToolbar } from './QuillToolbar';
import 'react-quill/dist/quill.snow.css';

import PropTypes from 'prop-types'; // Import PropTypes

const QuillEditor = ({ value, onChange }) => {
  return (
    <div className='text-editor'>
      <QuillToolbar />
      <ReactQuill
        theme='snow'
        placeholder={'Write something awesome...'}
        modules={modules}
        formats={formats}
        className='h-80 mb-10'
        required
        value={value} // Set the value from props
        onChange={onChange} // Handle the onChange event
      />
    </div>
  );
};

// Define prop types
QuillEditor.propTypes = {
  value: PropTypes.string.isRequired, // Expect value to be a string and required
  onChange: PropTypes.func.isRequired, // Expect onChange to be a function and required
};

export default QuillEditor;
