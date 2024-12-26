import { Button, Modal } from 'flowbite-react';

// ~ Import PropTypes
import PropTypes from 'prop-types';

import { HiOutlineExclamationCircle } from 'react-icons/hi2';

// # Main Modal COmponent
const ModalComponent = ({
  showModalForm,
  setShowModalForm,
  message,
  actionType,
  userType,
  handleDeletePost,
  handleToDeleteUser,
  handleToDeleteUserByAdmin,
}) => {
  const handleConfirmDelete = async () => {
    if (actionType === 'user') {
      // Call the delete user function
      console.log('Deleting user...');
      if (userType === 'admin') {
        handleToDeleteUserByAdmin();
      } else {
        handleToDeleteUser();
      }
    } else if (actionType === 'post') {
      // Call the delete post function
      console.log('Deleting post...');
      handleDeletePost();
    }
  };
  // #Modal Component Render
  return (
    <Modal
      show={showModalForm}
      onClose={() => setShowModalForm(false)}
      popup
      size='md'
    >
      <Modal.Header />
      <Modal.Body>
        <div className='text-center'>
          <HiOutlineExclamationCircle
            className='h-14 w-14 text-gray-500
            dark:text-gray-300
            mx-auto mb-4'
          />
          <h3 className='mb-5 text-lg text-gray-600 dark:text-gray-600'>
            {message}
          </h3>
          <div className='flex justify-center gap-5'>
            <Button color='failure' onClick={handleConfirmDelete}>
              Yes, I am Sure
            </Button>
            <Button color='info' onClick={() => setShowModalForm(false)}>
              No, Cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

// Define prop types
ModalComponent.propTypes = {
  // & Validate that setShowModalForm is a required function
  setShowModalForm: PropTypes.func.isRequired,
  showModalForm: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  handleDeletePost: PropTypes.func,
  handleToDeleteUser: PropTypes.func,
  handleToDeleteUserByAdmin: PropTypes.func,
  actionType: PropTypes.string.isRequired,
  userType: PropTypes.string.isRequired,
};

export default ModalComponent;
