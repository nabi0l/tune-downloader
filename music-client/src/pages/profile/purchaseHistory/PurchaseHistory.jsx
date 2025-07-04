import { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { Link } from 'react-router-dom';
import { FaUser, FaHeart, FaShoppingBag, FaCog, FaSignOutAlt, FaDownload, FaEye, FaCalendar, FaCreditCard, FaCheckCircle, FaClock, FaTimesCircle } from 'react-icons/fa';
import ProtectedRoute from '../../../components/ProtectedRoute';

const PurchaseHistory = () => {
  const { currentUser, signout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Fetch purchase history
  useEffect(() => {
    const fetchPurchaseHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No authentication token found');
          setLoading(false);
          return;
        }
        const [ordersResponse, statsResponse] = await Promise.all([
          fetch('https://tune-downloader.onrender.com/api/orders/history', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }),
          fetch('https://tune-downloader.onrender.com/api/orders/stats/summary', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
        ]);

        if (ordersResponse.ok && statsResponse.ok) {
          const ordersData = await ordersResponse.json();
          const statsData = await statsResponse.json();
          setOrders(ordersData);
          setStats(statsData);
        } else {
          setError('Failed to fetch purchase history');
        }
      } catch (err) {
        setError('Error fetching purchase history');
        console.error('Error fetching purchase history:', err);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchPurchaseHistory();
    }
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await signout();
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'cancelled':
        return 'text-red-600 bg-red-50';
      case 'refunded':
        return 'text-gray-600 bg-gray-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <FaCheckCircle className="text-green-600" />;
      case 'pending':
        return <FaClock className="text-yellow-600" />;
      case 'cancelled':
        return <FaTimesCircle className="text-red-600" />;
      default:
        return <FaClock className="text-gray-600" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your purchase history...</p>
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
              <h1 className="text-3xl font-bold text-gray-900">Purchase History</h1>
              <p className="mt-2 text-gray-600">View your past purchases and downloads</p>
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
                      {currentUser?.displayName || 'User'}
                    </h3>
                    <p className="text-sm text-gray-500">{currentUser?.email}</p>
                  </div>
                </div>

                <nav className="space-y-2">
                  <Link
                    to="/account"
                    className="flex items-center space-x-3 px-3 py-2 text-sm font-medium text-gray-600 hover:text-black hover:bg-gray-50 rounded-md transition-colors"
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
                    className="flex items-center space-x-3 px-3 py-2 text-sm font-medium text-black bg-gray-100 rounded-md"
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
              {error && (
                <div className="mb-6 p-4 text-sm text-red-600 bg-red-50 rounded-lg">
                  {error}
                </div>
              )}

              {/* Statistics */}
              {stats && (
                <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Orders</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
                      </div>
                      <FaShoppingBag className="text-blue-500 text-2xl" />
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Completed</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.completedOrders}</p>
                      </div>
                      <FaCheckCircle className="text-green-500 text-2xl" />
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Spent</p>
                        <p className="text-2xl font-bold text-gray-900">{formatPrice(stats.totalSpent)}</p>
                      </div>
                      <FaCreditCard className="text-purple-500 text-2xl" />
                    </div>
                  </div>
                </div>
              )}

              {/* Orders List */}
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
                </div>

                <div className="divide-y divide-gray-200">
                  {orders.length === 0 ? (
                    <div className="p-6 text-center">
                      <FaShoppingBag className="mx-auto text-gray-400 text-4xl mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No purchases yet</h3>
                      <p className="text-gray-600 mb-4">Start exploring our music collection and make your first purchase!</p>
                      <Link
                        to="/"
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-black hover:bg-gray-800 rounded-md transition-colors"
                      >
                        Browse Music
                      </Link>
                    </div>
                  ) : (
                    orders.map((order) => (
                      <div key={order._id} className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">
                              Order #{order.orderNumber}
                            </h3>
                            <p className="text-sm text-gray-500">
                              <FaCalendar className="inline mr-1" />
                              {formatDate(order.createdAt)}
                            </p>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                              {getStatusIcon(order.status)}
                              <span className="ml-1 capitalize">{order.status}</span>
                            </span>
                            <button
                              onClick={() => setSelectedOrder(selectedOrder === order._id ? null : order._id)}
                              className="flex items-center space-x-1 px-3 py-1 text-sm font-medium text-gray-600 hover:text-black hover:bg-gray-50 rounded-md transition-colors"
                            >
                              <FaEye className="text-gray-600" />
                              <span>{selectedOrder === order._id ? 'Hide' : 'View'}</span>
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                          <div className="text-sm text-gray-600">
                            {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                          </div>
                          <div className="text-lg font-semibold text-gray-900">
                            {formatPrice(order.total)}
                          </div>
                        </div>

                        {/* Order Details */}
                        {selectedOrder === order._id && (
                          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                            <div className="space-y-4">
                              {order.items.map((item, index) => (
                                <div key={index} className="flex items-center space-x-4">
                                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                                    {item.song?.coverImage ? (
                                      <img 
                                        src={item.song.coverImage} 
                                        alt={item.song.title}
                                        className="w-full h-full object-cover rounded-lg"
                                      />
                                    ) : (
                                      <FaDownload className="text-gray-400" />
                                    )}
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="text-sm font-medium text-gray-900">
                                      {item.song?.title || 'Unknown Song'}
                                    </h4>
                                    <p className="text-sm text-gray-500">
                                      {item.song?.artist || 'Unknown Artist'}
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-sm font-medium text-gray-900">
                                      {formatPrice(item.price)}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      Qty: {item.quantity}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-200">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Subtotal:</span>
                                <span className="font-medium">{formatPrice(order.subtotal)}</span>
                              </div>
                              {order.tax > 0 && (
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-600">Tax:</span>
                                  <span className="font-medium">{formatPrice(order.tax)}</span>
                                </div>
                              )}
                              <div className="flex justify-between text-lg font-semibold mt-2 pt-2 border-t border-gray-200">
                                <span>Total:</span>
                                <span>{formatPrice(order.total)}</span>
                              </div>
                            </div>

                            {order.billingAddress && (
                              <div className="mt-4 pt-4 border-t border-gray-200">
                                <h5 className="text-sm font-medium text-gray-900 mb-2">Billing Address</h5>
                                <div className="text-sm text-gray-600">
                                  <p>{order.billingAddress.firstName} {order.billingAddress.lastName}</p>
                                  <p>{order.billingAddress.address}</p>
                                  <p>{order.billingAddress.city}, {order.billingAddress.state} {order.billingAddress.zipCode}</p>
                                  <p>{order.billingAddress.country}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default PurchaseHistory; 