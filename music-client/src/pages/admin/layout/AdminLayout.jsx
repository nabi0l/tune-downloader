import { Outlet, Link, useLocation } from 'react-router-dom';
import { FaHome, FaMusic, FaUsers, FaChartBar, FaSignOutAlt, FaCompactDisc, FaCog } from 'react-icons/fa';
import { useAuth } from '../../../hooks/useAuth';

const AdminLayout = () => {
  const { signout } = useAuth();
  const location = useLocation();

  console.log('AdminLayout - Current location:', location.pathname);

  const isActive = (path) => {
    return location.pathname === path ? 'bg-gray-700 text-white' : 'text-gray-300';
  };

  const handleLogout = async () => {
    try {
      await signout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 mt-16">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white w-64 flex-shrink-0">
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-400 text-sm mt-1">Music Platform</p>
        </div>
        
        <nav className="mt-6">
          <div className="px-3 mb-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Main</p>
          </div>
          
          <Link 
            to="/admin" 
            className={`flex items-center px-6 py-3 hover:bg-gray-700 transition-colors ${isActive('/admin')}`}
          >
            <FaHome className="mr-3" />
            Dashboard
          </Link>
          
          <div className="px-3 mb-4 mt-6">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Content</p>
          </div>
          
          <Link 
            to="/admin/songs" 
            className={`flex items-center px-6 py-3 hover:bg-gray-700 transition-colors ${isActive('/admin/songs')}`}
          >
            <FaMusic className="mr-3" />
            Songs
          </Link>
          
          <Link 
            to="/admin/albums" 
            className={`flex items-center px-6 py-3 hover:bg-gray-700 transition-colors ${isActive('/admin/albums')}`}
          >
            <FaCompactDisc className="mr-3" />
            Albums
          </Link>
          
          <Link 
            to="/admin/artists" 
            className={`flex items-center px-6 py-3 hover:bg-gray-700 transition-colors ${isActive('/admin/artists')}`}
          >
            <FaUsers className="mr-3" />
            Artists
          </Link>
          
          <div className="px-3 mb-4 mt-6">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Management</p>
          </div>
          
          <Link 
            to="/admin/users" 
            className={`flex items-center px-6 py-3 hover:bg-gray-700 transition-colors ${isActive('/admin/users')}`}
          >
            <FaUsers className="mr-3" />
            Users
          </Link>
          
          <Link 
            to="/admin/analytics" 
            className={`flex items-center px-6 py-3 hover:bg-gray-700 transition-colors ${isActive('/admin/analytics')}`}
          >
            <FaChartBar className="mr-3" />
            Analytics
          </Link>
          
          <Link 
            to="/admin/settings" 
            className={`flex items-center px-6 py-3 hover:bg-gray-700 transition-colors ${isActive('/admin/settings')}`}
          >
            <FaCog className="mr-3" />
            Settings
          </Link>
          
          <div className="mt-8 pt-6 border-t border-gray-700">
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 transition-colors text-left"
            >
              <FaSignOutAlt className="mr-3" />
              Logout
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
