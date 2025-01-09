import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashAllPost from '../components/DashAllPost';
import DashUsers from '../components/DashUsers';
import DashComments from '../components/DashComments';
import DashBoardComponent from '../components/DashBoardComponent';

const Dashboard = () => {
  const [tab, setTab] = useState('');
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    setTab(tabFromUrl);
  }, [location.search]);

  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-56'>
        <DashSidebar />
      </div>

      {tab === 'dashboard' && <DashBoardComponent />}
      {tab === 'profile' && <DashProfile />}
      {tab === 'posts' && <DashAllPost />}
      {tab === 'users' && <DashUsers />}
      {tab === 'comments' && <DashComments />}
    </div>
  );
};

export default Dashboard;
