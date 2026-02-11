import { useEffect, useState } from 'react';
import { Package, FolderTree, Clock, TrendingUp, ArrowUpRight, Activity, Eye, BarChart3, Users, ShoppingCart } from 'lucide-react';
import api from '../../utils/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    views: 0,
    users: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get('/admin/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Products',
      value: stats.products,
      icon: Package,
      gradient: 'from-blue-500 to-blue-600',
      bgGradient: 'from-blue-50 to-blue-100',
      change: '+12%',
    },
    {
      title: 'Categories',
      value: stats.categories,
      icon: FolderTree,
      gradient: 'from-emerald-500 to-emerald-600',
      bgGradient: 'from-emerald-50 to-emerald-100',
      change: '+5%',
    },
    {
      title: 'Page Views',
      value: stats.views || '2.4K',
      icon: Eye,
      gradient: 'from-purple-500 to-purple-600',
      bgGradient: 'from-purple-50 to-purple-100',
      change: '+18%',
    },
    {
      title: 'Active Users',
      value: stats.users || '156',
      icon: Users,
      gradient: 'from-orange-500 to-orange-600',
      bgGradient: 'from-orange-50 to-orange-100',
      change: '+23%',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      {/* Page Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-base md:text-lg text-gray-600">Welcome back! Here's your business overview.</p>
          </div>
          <div className="hidden md:flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm">
            <BarChart3 className="text-blue-600" size={20} />
            <span className="text-sm font-semibold text-gray-700">Live Stats</span>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-blue-600 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            {statCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <div key={card.title} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${card.gradient}`}></div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-14 h-14 bg-gradient-to-br ${card.gradient} rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="text-white" size={28} />
                        </div>
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-sm font-bold ${
                          card.change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          <TrendingUp size={14} />
                          <span>{card.change}</span>
                        </div>
                      </div>
                      <h3 className="text-gray-600 text-sm font-semibold mb-2 uppercase tracking-wider">{card.title}</h3>
                      <p className="text-3xl md:text-4xl font-black text-gray-900">{card.value}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Quick Actions */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-6 md:p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl md:text-3xl font-black text-gray-900">Quick Actions</h2>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Activity className="text-white" size={24} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href="/admin/products"
                  className="group block p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-blue-200 hover:border-blue-400"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                    <Package className="text-white" size={24} />
                  </div>
                  <p className="font-bold text-gray-900 mb-2 text-lg">Manage Products</p>
                  <p className="text-sm text-gray-600 mb-3">Add, edit, or remove products</p>
                  <ArrowUpRight className="text-blue-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={20} />
                </a>
                <a
                  href="/admin/categories"
                  className="group block p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-emerald-200 hover:border-emerald-400"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                    <FolderTree className="text-white" size={24} />
                  </div>
                  <p className="font-bold text-gray-900 mb-2 text-lg">Manage Categories</p>
                  <p className="text-sm text-gray-600 mb-3">Organize your products</p>
                  <ArrowUpRight className="text-emerald-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={20} />
                </a>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-6 md:p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl md:text-3xl font-black text-gray-900">Activity</h2>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Eye className="text-white" size={24} />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Package className="text-blue-600" size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-900">New product added</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FolderTree className="text-emerald-600" size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-900">Category updated</p>
                    <p className="text-xs text-gray-500">5 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="text-purple-600" size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-900">New user registered</p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
