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

const App = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector(currentUserState);
  console.log(currentUser);
  const errorMsg = useSelector(errorMsgState);
  const successMsg = useSelector(successMsgState);

  useEffect(() => {
    if (successMsg || errorMsg) {
      setTimeout(() => {
        dispatch(clearMessageAction());
      }, 3000);
    }
  }, [dispatch, errorMsg, successMsg]);

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
