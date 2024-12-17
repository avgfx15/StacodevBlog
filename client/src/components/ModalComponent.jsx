import { Button, Modal } from 'flowbite-react';

import { useNavigate } from 'react-router-dom';

// ~ Import PropTypes
import PropTypes from 'prop-types';

import { HiOutlineExclamationCircle } from 'react-icons/hi2';
import { useDispatch, useSelector } from 'react-redux';
import { currentUserState } from '../redux/User/UserSlice';
import { deleteUserAction } from '../redux/User/UserActions';

// # Main Modal COmponent
const ModalComponent = ({ showModalForm, setShowModalForm }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // & Get Value for currentUserState
  const currentUser = useSelector(currentUserState);

  // - Handle Delete User Function
  const handleToDelete = async () => {
    dispatch(deleteUserAction(currentUser));
    navigate('/signin');
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
            Are you sure you want to delete your account?
          </h3>
          <div className='flex justify-center gap-5'>
            <Button color='failure' onClick={handleToDelete}>
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
};

export default ModalComponent;
