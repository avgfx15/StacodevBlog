import { useDispatch, useSelector } from 'react-redux';

import { useEffect, useState } from 'react';

import { currentUserState } from '../redux/User/UserSlice';
import { Button, Table } from 'flowbite-react';

import ModalComponent from './ModalComponent';

import {
  deleteCommentByCommentIdAction,
  getAllCommentsAction,
} from '../redux/Comment/CommentActions';
import { allCommentsState } from '../redux/Comment/CommentSlice';

// # DashAllPost Component
const DashComments = () => {
  const dispatch = useDispatch();

  // & Declare showModalForm state
  const [showModalForm, setShowModalForm] = useState(false);

  // & Post Id
  const [commentId, setCommentId] = useState(null);

  // & Get CurrentUser details
  const currentUser = useSelector(currentUserState);

  // & Get All Post by currentUser
  const allComments = useSelector(allCommentsState);
  console.log(allComments);

  // & Initially show 9 posts
  const [visibleComments, setVisibleComments] = useState(9);

  const handleShowMoreComment = () => {
    setVisibleComments((prev) => prev + 9); // Increase by 9 more posts
  };

  const displayedComments = allComments
    ? allComments.slice(0, visibleComments)
    : [];

  // - Delete Post
  const handleToDeleteCommentByAdmin = async () => {
    dispatch(deleteCommentByCommentIdAction(commentId));

    setShowModalForm(false);
  };

  // & Mount All Post By currentUser
  useEffect(() => {
    if (currentUser.isAdmin) {
      dispatch(getAllCommentsAction());
    }
  }, [currentUser, dispatch]);

  // # render
  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-600'>
      {currentUser.isAdmin && allComments?.length > 0 ? (
        <div>
          <Table hoverable className='shadow-md'>
            <Table.Head className='text-center'>
              <Table.HeadCell>Date Updated</Table.HeadCell>
              <Table.HeadCell>Comment Id</Table.HeadCell>
              <Table.HeadCell>Comment Content</Table.HeadCell>
              <Table.HeadCell>No Of Likes</Table.HeadCell>
              <Table.HeadCell>Comment On Post Title</Table.HeadCell>
              <Table.HeadCell>Comment User Name</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            <Table.Body className='divide-y'>
              {displayedComments.map((comment) => (
                <Table.Row
                  key={comment._id}
                  className='bg-white dark:bg-gray-600 dark:border-gray-900'
                >
                  <Table.Cell>
                    {new Date(comment.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>{comment._id}</Table.Cell>
                  <Table.Cell>{comment.commentText}</Table.Cell>
                  <Table.Cell>{comment.noOfLikes}</Table.Cell>
                  <Table.Cell>{comment.postId.title}</Table.Cell>
                  <Table.Cell>{comment.userId.name}</Table.Cell>
                  <Table.Cell>
                    <span
                      className='font-medium text-red-600 hover:underline cursor-pointer'
                      onClick={() => {
                        setShowModalForm(true);
                        setCommentId(comment._id);
                      }}
                    >
                      Delete
                    </span>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          {visibleComments < allComments.length && (
            <Button
              onClick={handleShowMoreComment}
              className='w-full text-white self-center my-3 text-lg'
            >
              Show More
            </Button>
          )}
        </div>
      ) : (
        <h3>There is No Comments Yet.</h3>
      )}
      <ModalComponent
        showModalForm={showModalForm}
        setShowModalForm={setShowModalForm}
        message='Are you sure you want to delete Comment ?'
        handleToDeleteCommentByAdmin={handleToDeleteCommentByAdmin}
        actionType='comment'
        userType='admin'
      />
    </div>
  );
};

export default DashComments;
