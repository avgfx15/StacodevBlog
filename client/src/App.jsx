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
  currentUserState,
  errorMsgState,
  successMsgState,
} from './redux/User/UserSlice';
import { useEffect } from 'react';

// # Main App Component
const App = () => {
  // & Dispatch Hook
  const dispatch = useDispatch();

  // & Get Current State
  const currentUser = useSelector(currentUserState);

  const errorMsg = useSelector(errorMsgState);
  const successMsg = useSelector(successMsgState);

  // & Auto Clear Alert for successMsg and errorMsg
  useEffect(() => {
    if (successMsg || errorMsg) {
      setTimeout(() => {
        dispatch(clearMessageAction());
      }, 3000);
    }
  }, [dispatch, errorMsg, successMsg]);

  // # Return Func
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<AboutPage />} />
        {currentUser === null && (
          <>
            <Route path='/signup' element={<SignUp />} />
            <Route path='/signin' element={<SignIn />} />
          </>
        )}
        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        <Route path='/projects' element={<Projects />} />
      </Routes>
      <FooterComponent />
    </BrowserRouter>
  );
};

export default App;
