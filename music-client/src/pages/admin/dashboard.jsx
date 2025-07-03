import { useEffect, useState } from 'react';
import { FaMusic, FaUsers, FaCompactDisc, FaChartLine } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  console.log('Dashboard component is rendering!'); // Debug log
  
  const [stats, setStats] = useState({
    totalSongs: 0,
    totalAlbums: 0,
    totalArtists: 0,
    totalUsers: 0,
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Dashboard useEffect running');
    const fetchDashboardData = async () => {
      try {
        // In a real app, you would fetch this from your API
        // const { data } = await axios.get('/api/admin/dashboard');
        // setStats(data.stats);
        // setRecentActivity(data.recentActivity);
        
        // Mock data for now
        setStats({
          totalSongs: 1245,
          totalAlbums: 356,
          totalArtists: 187,
          totalUsers: 5243,
        });
        
        setRecentActivity([
          { id: 1, type: 'song', action: 'added', title: 'Amazing Grace', time: '2 hours ago' },
          { id: 2, type: 'album', action: 'updated', title: 'Worship Hits 2023', time: '5 hours ago' },
          { id: 3, type: 'user', action: 'registered', title: 'New user: johndoe', time: '1 day ago' },
          { id: 4, type: 'artist', action: 'added', title: 'Hillsong Worship', time: '2 days ago' },
        ]);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  console.log('Dashboard render - loading:', loading, 'stats:', stats);

  if (loading) {
    console.log('Dashboard showing loading spinner');
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const StatCard = ({ icon, title, value, link }) => (
    <Link to={link} className="block">
      <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
            {icon}
          </div>
          <div>
            <p className="text-gray-500 text-sm">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        </div>
      </div>
    </Link>
  );

  const ActivityIcon = ({ type }) => {
    const icons = {
      song: <FaMusic className="text-green-500" />,
      album: <FaCompactDisc className="text-blue-500" />,
      artist: <FaUsers className="text-purple-500" />,
      user: <FaUsers className="text-yellow-500" />,
    };
    return <div className="text-xl mr-3">{icons[type] || <FaChartLine />}</div>;
  };

  console.log('Dashboard rendering main content');

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          icon={<FaMusic size={20} />} 
          title="Total Songs" 
          value={stats.totalSongs.toLocaleString()} 
          link="/admin/songs"
        />
        <StatCard 
          icon={<FaCompactDisc size={20} />} 
          title="Total Albums" 
          value={stats.totalAlbums.toLocaleString()} 
          link="/admin/albums"
        />
        <StatCard 
          icon={<FaUsers size={20} />} 
          title="Total Artists" 
          value={stats.totalArtists.toLocaleString()} 
          link="/admin/artists"
        />
        <StatCard 
          icon={<FaUsers size={20} />} 
          title="Total Users" 
          value={stats.totalUsers.toLocaleString()} 
          link="/admin/users"
        />
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center p-3 hover:bg-gray-50 rounded-lg">
              <ActivityIcon type={activity.type} />
              <div className="flex-1">
                <p className="font-medium">
                  <span className="capitalize">{activity.type}</span> {activity.action}: {activity.title}
                </p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;