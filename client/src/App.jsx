import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Header from './components/Header';
import FooterComponent from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearMessageAction,
  errorMsgState,
  successMsgState,
} from './redux/User/UserSlice';
import { useEffect } from 'react';
import AdminPrivateRoute from './components/AdminPrivateRoute';
import CreateNewPost from './pages/CreateNewPost';
import {
  getAllPostsAction,
  getRecentPostAction,
} from './redux/Post/PostActions';
import UpdatePost from './pages/UpdatePost';
import PostPage from './pages/PostPage';
import ScrollToTop from './components/ScrollToTop';
import SearchPage from './pages/SearchPage';

// # Main App Component
const App = () => {
  // & Dispatch Hook
  const dispatch = useDispatch();

  // & Get Current State

  const errorMsg = useSelector(errorMsgState);
  const successMsg = useSelector(successMsgState);

  // & Auto Clear Alert for successMsg and errorMsg
  useEffect(() => {
    dispatch(getAllPostsAction());
    dispatch(getRecentPostAction());
    console.log();

    if (successMsg || errorMsg) {
      setTimeout(() => {
        dispatch(clearMessageAction());
      }, 3000);
    }
  }, [dispatch, errorMsg, successMsg]);

  // # Return Func
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<AboutPage />} />
        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        <Route element={<AdminPrivateRoute />}>
          <Route path='/createnewpost' element={<CreateNewPost />} />
          <Route path='/updatepost/:postId' element={<UpdatePost />} />
        </Route>
        <Route path='/projects' element={<Projects />} />
        <Route path='/posts/:postslug' element={<PostPage />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/search' element={<SearchPage />} />
      </Routes>
      <FooterComponent />
    </BrowserRouter>
  );
};

export default App;
