import { useState, useEffect } from 'react';
import { FaUsers, FaMusic, FaDownload, FaEye, FaChartLine, FaChartBar } from 'react-icons/fa';

const Analytics = () => {
  const [analytics, setAnalytics] = useState({
    totalUsers: 0,
    totalSongs: 0,
    totalDownloads: 0,
    totalViews: 0,
    monthlyGrowth: [],
    topSongs: [],
    userActivity: []
  });
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30d');

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        // In a real app, you would fetch from your API
        // const response = await fetch(`/api/admin/analytics?range=${timeRange}`);
        // const data = await response.json();
        
        // Mock data for now
        setAnalytics({
          totalUsers: 5243,
          totalSongs: 1245,
          totalDownloads: 15678,
          totalViews: 89234,
          monthlyGrowth: [
            { month: 'Jan', users: 1200, songs: 300, downloads: 2500 },
            { month: 'Feb', users: 1350, songs: 350, downloads: 2800 },
            { month: 'Mar', users: 1500, songs: 400, downloads: 3200 },
            { month: 'Apr', users: 1650, songs: 450, downloads: 3600 },
            { month: 'May', users: 1800, songs: 500, downloads: 4000 },
            { month: 'Jun', users: 1950, songs: 550, downloads: 4400 }
          ],
          topSongs: [
            { title: 'Amazing Grace', artist: 'Hillsong Worship', downloads: 1250, views: 8900 },
            { title: 'What A Beautiful Name', artist: 'Hillsong Worship', downloads: 1100, views: 7800 },
            { title: 'Reckless Love', artist: 'Cory Asbury', downloads: 950, views: 6700 },
            { title: 'Goodness of God', artist: 'Bethel Music', downloads: 850, views: 5900 },
            { title: 'Way Maker', artist: 'Sinach', downloads: 750, views: 5200 }
          ],
          userActivity: [
            { day: 'Mon', activeUsers: 450, newUsers: 25 },
            { day: 'Tue', activeUsers: 520, newUsers: 30 },
            { day: 'Wed', activeUsers: 480, newUsers: 22 },
            { day: 'Thu', activeUsers: 550, newUsers: 35 },
            { day: 'Fri', activeUsers: 600, newUsers: 40 },
            { day: 'Sat', activeUsers: 580, newUsers: 38 },
            { day: 'Sun', activeUsers: 520, newUsers: 32 }
          ]
        });
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [timeRange]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const StatCard = ({ icon, title, value, change, changeType }) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
          {icon}
        </div>
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-2xl font-bold">{value.toLocaleString()}</p>
          {change && (
            <p className={`text-sm ${changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
              {changeType === 'positive' ? '↗' : '↘'} {change}% from last month
            </p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
          <option value="1y">Last year</option>
        </select>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          icon={<FaUsers size={20} />} 
          title="Total Users" 
          value={analytics.totalUsers}
          change={12}
          changeType="positive"
        />
        <StatCard 
          icon={<FaMusic size={20} />} 
          title="Total Songs" 
          value={analytics.totalSongs}
          change={8}
          changeType="positive"
        />
        <StatCard 
          icon={<FaDownload size={20} />} 
          title="Total Downloads" 
          value={analytics.totalDownloads}
          change={15}
          changeType="positive"
        />
        <StatCard 
          icon={<FaEye size={20} />} 
          title="Total Views" 
          value={analytics.totalViews}
          change={22}
          changeType="positive"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Songs */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Top Songs</h2>
          <div className="space-y-4">
            {analytics.topSongs.map((song, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{song.title}</p>
                    <p className="text-sm text-gray-500">{song.artist}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{song.downloads.toLocaleString()} downloads</p>
                  <p className="text-xs text-gray-500">{song.views.toLocaleString()} views</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Activity */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Weekly User Activity</h2>
          <div className="space-y-3">
            {analytics.userActivity.map((day, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium">{day.day}</span>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">{day.activeUsers}</p>
                    <p className="text-xs text-gray-500">Active users</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-green-600">+{day.newUsers}</p>
                    <p className="text-xs text-gray-500">New users</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Growth Chart */}
      <div className="bg-white rounded-lg shadow p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">Monthly Growth</h2>
        <div className="grid grid-cols-6 gap-4">
          {analytics.monthlyGrowth.map((month, index) => (
            <div key={index} className="text-center">
              <p className="text-sm font-medium text-gray-600">{month.month}</p>
              <div className="mt-2 space-y-1">
                <div className="bg-blue-100 rounded p-2">
                  <p className="text-xs text-blue-800 font-medium">{month.users}</p>
                  <p className="text-xs text-blue-600">Users</p>
                </div>
                <div className="bg-green-100 rounded p-2">
                  <p className="text-xs text-green-800 font-medium">{month.songs}</p>
                  <p className="text-xs text-green-600">Songs</p>
                </div>
                <div className="bg-purple-100 rounded p-2">
                  <p className="text-xs text-purple-800 font-medium">{month.downloads}</p>
                  <p className="text-xs text-purple-600">Downloads</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics; 