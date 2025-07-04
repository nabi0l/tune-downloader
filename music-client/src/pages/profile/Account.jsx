import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import { FaUser, FaHeart, FaShoppingBag, FaCog, FaSignOutAlt, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import ProtectedRoute from '../../components/ProtectedRoute';

const Account = () => {
  const { currentUser, signout } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    displayName: '',
    email: ''
  });

  // Fetch user data from backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No authentication token found');
          setLoading(false);
          return;
        }

        const response = await fetch('https://tune-downloader.onrender.com/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
          setEditForm({
            displayName: data.displayName || '',
            email: data.email || ''
          });
        } else {
          setError('Failed to fetch user data');
        }
      } catch (err) {
        setError('Error fetching user data');
        console.error('Error fetching user data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchUserData();
    }
  }, [currentUser]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditForm({
      displayName: userData?.displayName || '',
      email: userData?.email || ''
    });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No authentication token found');
        return;
      }

      const response = await fetch('https://tune-downloader.onrender.com/api/auth/me', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editForm)
      });

      if (response.ok) {
        const updatedData = await response.json();
        setUserData(updatedData);
        setIsEditing(false);
        setError(null);
      } else {
        setError('Failed to update profile');
      }
    } catch (err) {
      setError('Error updating profile');
      console.error('Error updating profile:', err);
    }
  };

  const handleLogout = async () => {
    try {
      await signout();
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your account...</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-16">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-6">
              <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
              <p className="mt-2 text-gray-600">Manage your profile and preferences</p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <FaUser className="text-gray-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {userData?.displayName || 'User'}
                    </h3>
                    <p className="text-sm text-gray-500">{userData?.email}</p>
                  </div>
                </div>

                <nav className="space-y-2">
                  <Link
                    to="/account"
                    className="flex items-center space-x-3 px-3 py-2 text-sm font-medium text-black bg-gray-100 rounded-md"
                  >
                    <FaUser className="text-gray-600" />
                    <span>Profile</span>
                  </Link>
                  <Link
                    to="/favorites"
                    className="flex items-center space-x-3 px-3 py-2 text-sm font-medium text-gray-600 hover:text-black hover:bg-gray-50 rounded-md transition-colors"
                  >
                    <FaHeart className="text-gray-600" />
                    <span>Favorites</span>
                  </Link>
                  <Link
                    to="/purchase-history"
                    className="flex items-center space-x-3 px-3 py-2 text-sm font-medium text-gray-600 hover:text-black hover:bg-gray-50 rounded-md transition-colors"
                  >
                    <FaShoppingBag className="text-gray-600" />
                    <span>Purchase History</span>
                  </Link>
                  <Link
                    to="/account/settings"
                    className="flex items-center space-x-3 px-3 py-2 text-sm font-medium text-gray-600 hover:text-black hover:bg-gray-50 rounded-md transition-colors"
                  >
                    <FaCog className="text-gray-600" />
                    <span>Settings</span>
                  </Link>
                </nav>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors w-full"
                  >
                    <FaSignOutAlt className="text-red-600" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
                    {!isEditing ? (
                      <button
                        onClick={handleEdit}
                        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-black hover:bg-gray-50 rounded-md transition-colors"
                      >
                        <FaEdit className="text-gray-600" />
                        <span>Edit</span>
                      </button>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={handleSave}
                          className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-white bg-black hover:bg-gray-800 rounded-md transition-colors"
                        >
                          <FaSave className="text-white" />
                          <span>Save</span>
                        </button>
                        <button
                          onClick={handleCancel}
                          className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-black hover:bg-gray-50 rounded-md transition-colors"
                        >
                          <FaTimes className="text-gray-600" />
                          <span>Cancel</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  {error && (
                    <div className="mb-4 p-3 text-sm text-red-600 bg-red-50 rounded-lg">
                      {error}
                    </div>
                  )}

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Display Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.displayName}
                          onChange={(e) => setEditForm({ ...editForm, displayName: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                          placeholder="Enter your display name"
                        />
                      ) : (
                        <p className="text-gray-900">{userData?.displayName || 'Not set'}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={editForm.email}
                          onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                          placeholder="Enter your email"
                        />
                      ) : (
                        <p className="text-gray-900">{userData?.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Account Type
                      </label>
                      <p className="text-gray-900 capitalize">{userData?.role || 'user'}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Member Since
                      </label>
                      <p className="text-gray-900">
                        {userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString() : 'Unknown'}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Login
                      </label>
                      <p className="text-gray-900">
                        {userData?.lastLogin ? new Date(userData.lastLogin).toLocaleDateString() : 'Unknown'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <FaHeart className="text-red-500 text-xl" />
                    <h3 className="text-lg font-semibold text-gray-900">Favorites</h3>
                  </div>
                  <p className="text-gray-600 mb-4">Manage your favorite songs and albums</p>
                  <Link
                    to="/favorites"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-black bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                  >
                    View Favorites
                  </Link>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <FaShoppingBag className="text-blue-500 text-xl" />
                    <h3 className="text-lg font-semibold text-gray-900">Purchase History</h3>
                  </div>
                  <p className="text-gray-600 mb-4">View your past purchases and downloads</p>
                  <Link
                    to="/purchase-history"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-black bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                  >
                    View History
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Account;
