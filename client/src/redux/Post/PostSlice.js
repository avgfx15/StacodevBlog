import { createSlice } from '@reduxjs/toolkit';
import {
  createNewPostAction,
  deletePostByPostIdByAuthorAction,
  getAllPostsAction,
  getPostByPostIdAction,
  getPostByPostSlugAction,
  getRecentPostAction,
  postsByLoggedInUserAction,
  updatePostByPostIdByAuthorAction,
  uploadPostImageAction,
} from './PostActions';

const initialState = {
  allPost: [],
  post: [],
  postImageUrl: null,
  currentPost: null,
  isPostLoading: false,
  postError: null,
  postsByLoggedInUser: [],
  message: null,
  recentPosts: [],
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // @ Upload postImage

    // & Upload ProfilePic Pending
    builder.addCase(uploadPostImageAction.pending, (state) => {
      state.isPostLoading = true;
      state.error = null;
      state.postImageUrl = null;
      state.successStatus = false;
      state.postError = null;
    });

    // ! Upload ProfilePic rejected
    builder.addCase(uploadPostImageAction.rejected, (state, action) => {
      state.isPostLoading = false;
      state.error = action.payload;
      state.postImageUrl = null;
      state.successStatus = false;
      state.postError = 'Failed to Upload Profile Pic';
    });

    // + Upload ProfilePic Success
    builder.addCase(uploadPostImageAction.fulfilled, (state, action) => {
      state.postImageUrl = action.payload;
      state.isPostLoading = false;
      state.error = null;
      state.successStatus = true;
      state.postError = null;
    });

    // @ Create New Post

    // & create New Post Pending
    builder.addCase(createNewPostAction.pending, (state) => {
      state.isPostLoading = true;
      state.postError = null;
    });

    // + create New Post fulfilled
    builder.addCase(createNewPostAction.fulfilled, (state, action) => {
      state.isPostLoading = false;
      if (!action.payload.successStatus) {
        state.postError = action.payload.message;
      } else {
        state.allPost = [...state.post, action.payload.newPost];
        state.message = action.payload.message;
      }
      state.postImageUrl = null;
    });

    // ! Get All Post Rejected
    builder.addCase(createNewPostAction.rejected, (state, action) => {
      state.isPostLoading = false;
      state.postError = action.payload;
    });

    // @ Get All Post

    // & Get All Posts Pending
    builder.addCase(getAllPostsAction.pending, (state) => {
      state.isPostLoading = true;
      state.allPost = [];
      state.postError = null;
    });

    // / Get All Posts
    builder.addCase(getAllPostsAction.fulfilled, (state, action) => {
      state.isPostLoading = false;
      state.allPost = action.payload; // Use the payload directly
      state.postError = null;
    });

    // ! Get All Post Rejected
    builder.addCase(getAllPostsAction.rejected, (state, action) => {
      state.isPostLoading = false;
      state.postError = action.payload;
      state.post = [];
    });

    // @ allPostByLoggedInUser As author

    // & Get All Posts By LoggedInUser Pending
    builder.addCase(postsByLoggedInUserAction.pending, (state) => {
      state.isPostLoading = true;
      state.postsByLoggedInUser = [];
      state.postError = null;
    });

    // / Get All Posts By LoggedInUser
    builder.addCase(postsByLoggedInUserAction.fulfilled, (state, action) => {
      state.isPostLoading = false;
      state.postsByLoggedInUser = action.payload;
      state.postError = null;
    });

    // ! Get All Post By LoggedInUser Rejected
    builder.addCase(postsByLoggedInUserAction.rejected, (state, action) => {
      state.isPostLoading = false;
      state.postError = action.payload;
      state.postsByLoggedInUser = [];
    });

    // @ Delete Post By author

    // & Delete Post By author pending
    builder.addCase(deletePostByPostIdByAuthorAction.pending, (state) => {
      state.isPostLoading = true;
      state.postError = null;
    });

    // - Delete Post By author
    builder.addCase(
      deletePostByPostIdByAuthorAction.fulfilled,
      (state, action) => {
        const { data, postId } = action.payload;

        state.isPostLoading = false;
        state.postError = null;
        state.message = data;

        state.postsByLoggedInUser = state.postsByLoggedInUser.filter((post) => {
          return post._id !== postId;
        });
        console.log('Posts After Deletion:', state.postsByLoggedInUser);
      }
    );

    // ! Delete Post By author rejected
    builder.addCase(
      deletePostByPostIdByAuthorAction.rejected,
      (state, action) => {
        state.isPostLoading = false;
        state.postError = action.payload;
      }
    );

    // @ Get Post By PostId

    // & Get Post By PostId
    builder.addCase(getPostByPostIdAction.pending, (state) => {
      state.isPostLoading = true;
      state.postError = null;
      state.currentPost = null;
    });

    // / Get Post By PostId
    builder.addCase(getPostByPostIdAction.fulfilled, (state, action) => {
      state.isPostLoading = false;
      state.currentPost = action.payload;
      state.postError = null;
    });

    // ! Get Post By PostId
    builder.addCase(getPostByPostIdAction.rejected, (state, action) => {
      state.isPostLoading = false;
      state.postError = action.payload;
    });

    // @ Update Post

    // & Update Post pending
    builder.addCase(updatePostByPostIdByAuthorAction.pending, (state) => {
      state.isPostLoading = true;
      state.postError = null;
      state.message = null;
    });

    // * Update Post
    builder.addCase(
      updatePostByPostIdByAuthorAction.fulfilled,
      (state, action) => {
        state.currentPost = action.payload;
        state.isPostLoading = false;
        state.postError = null;
      }
    );

    // ! Update Post rejected
    builder.addCase(
      updatePostByPostIdByAuthorAction.rejected,
      (state, action) => {
        state.isPostLoading = false;
        state.postError = action.payload;
      }
    );

    // @ Get post By post Slug

    // & Get Post By Post Slug Pending
    builder.addCase(getPostByPostSlugAction.pending, (state) => {
      state.isPostLoading = null;
      state.postError = null;
      state.message = null;
    });

    // / Get Post By Post Slug Fulfilled
    builder.addCase(getPostByPostSlugAction.fulfilled, (state, action) => {
      state.currentPost = action.payload.AllPost[0];
      state.message = action.payload.message;
      state.isPostLoading = false;
      state.postError = null;
    });
    // ! Get Post By Post Slug Rejected
    builder.addCase(getPostByPostSlugAction.rejected, (state, action) => {
      state.isPostLoading = false;
      state.postError = action.payload;
    });

    // / Get Recent Post
    // & Get Recent Post Pending
    builder.addCase(getRecentPostAction.pending, (state) => {
      state.isPostLoading = true;
      state.postError = null;
      state.message = null;
    });

    // / Get Recent Post Fulfilled
    builder.addCase(getRecentPostAction.fulfilled, (state, action) => {
      state.isPostLoading = false;
      state.recentPosts = action.payload;
      state.message = action.payload.message;
    });
    // ! Get Recent Post Rejected
    builder.addCase(getRecentPostAction.rejected, (state, action) => {
      state.isPostLoading = false;
      state.postError = action.payload;
    });
  },
});

export const postReducer = postSlice.reducer;

export const allPostState = (state) => state.postReducer.allPost;
export const recentPostsState = (state) => state.postReducer.recentPosts;
export const postsByLoggedInUserState = (state) =>
  state.postReducer.postsByLoggedInUser;
export const postState = (state) => state.postReducer.post;
export const postImageUrlState = (state) => state.postReducer.postImageUrl;
export const currentPostState = (state) => state.postReducer.currentPost;
export const isPostLoadingState = (state) => state.postReducer.isPostLoading;
export const postErrorState = (state) => state.postReducer.postError;
export const messageState = (state) => state.postReducer.message;
