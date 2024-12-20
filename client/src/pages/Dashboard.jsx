import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashAllPost from '../components/DashAllPost';

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

      {tab === 'profile' && <DashProfile />}
      {tab === 'posts' && <DashAllPost />}
    </div>
  );
};

export default Dashboard;
