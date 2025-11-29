import { useEffect, useState } from 'react';
import { Package, FolderTree, MessageSquare, Clock, TrendingUp, ArrowUpRight, Activity, Eye } from 'lucide-react';
import api from '../../utils/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    quotes: 0,
    pendingQuotes: 0,
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
      title: 'Quote Requests',
      value: stats.quotes,
      icon: MessageSquare,
      gradient: 'from-purple-500 to-purple-600',
      bgGradient: 'from-purple-50 to-purple-100',
      change: '+23%',
    },
    {
      title: 'Pending Quotes',
      value: stats.pendingQuotes,
      icon: Clock,
      gradient: 'from-orange-500 to-orange-600',
      bgGradient: 'from-orange-50 to-orange-100',
      change: '-8%',
    },
  ];

  return (
    <div>
      {/* Page Header */}
      <div className="mb-5 md:mb-6">
        <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-1 md:mb-2">Dashboard</h1>
        <p className="text-sm md:text-base text-gray-600">Welcome back! Here's what's happening with your store.</p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-5 md:mb-6">
            {statCards.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.title} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  <div className={`h-2 bg-gradient-to-r ${card.gradient}`}></div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-14 h-14 bg-gradient-to-br ${card.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="text-white" size={24} />
                      </div>
                      <div className={`flex items-center gap-1 text-sm font-bold ${
                        card.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        <TrendingUp size={16} />
                        <span>{card.change}</span>
                      </div>
                    </div>
                    <h3 className="text-gray-600 text-sm font-semibold mb-2">{card.title}</h3>
                    <p className="text-4xl font-black text-gray-900">{card.value}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5">
            {/* Quick Actions */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-5 md:p-6">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h2 className="text-xl md:text-2xl font-black text-gray-900">Quick Actions</h2>
                <Activity className="text-blue-600" size={24} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                <a
                  href="/admin/products"
                  className="group block p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 border-blue-200 hover:border-blue-400"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform shadow-lg">
                    <Package className="text-white" size={20} />
                  </div>
                  <p className="font-bold text-gray-900 mb-1 text-sm md:text-base">Manage Products</p>
                  <p className="text-xs md:text-sm text-gray-600">Add, edit, or remove products</p>
                  <ArrowUpRight className="text-blue-600 mt-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={20} />
                </a>
                <a
                  href="/admin/categories"
                  className="group block p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 border-emerald-200 hover:border-emerald-400"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform shadow-lg">
                    <FolderTree className="text-white" size={20} />
                  </div>
                  <p className="font-bold text-gray-900 mb-1 text-sm md:text-base">Manage Categories</p>
                  <p className="text-xs md:text-sm text-gray-600">Organize your products</p>
                  <ArrowUpRight className="text-emerald-600 mt-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={20} />
                </a>
                <a
                  href="/admin/quotes"
                  className="group block p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 border-purple-200 hover:border-purple-400"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform shadow-lg">
                    <MessageSquare className="text-white" size={20} />
                  </div>
                  <p className="font-bold text-gray-900 mb-1 text-sm md:text-base">Quote Requests</p>
                  <p className="text-xs md:text-sm text-gray-600">Review customer inquiries</p>
                  <ArrowUpRight className="text-purple-600 mt-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={20} />
                </a>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-lg p-5 md:p-6">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h2 className="text-xl md:text-2xl font-black text-gray-900">Activity</h2>
                <Eye className="text-gray-400" size={20} />
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Package className="text-blue-600" size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">New product added</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="text-purple-600" size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">New quote request</p>
                    <p className="text-xs text-gray-500">5 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FolderTree className="text-emerald-600" size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">Category updated</p>
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
