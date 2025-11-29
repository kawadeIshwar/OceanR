import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, FolderTree, MessageSquare, LogOut, Menu, X, Bell, Settings } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/products', icon: Package, label: 'Products' },
    { path: '/admin/categories', icon: FolderTree, label: 'Categories' },
    { path: '/admin/quotes', icon: MessageSquare, label: 'Quote Requests' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-[#0f172a] shadow-lg sticky top-0 z-40">
        <div className="mx-auto px-4 lg:px-6">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden text-white hover:bg-blue-600/20 p-2 rounded-lg transition-colors"
              >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <Link to="/admin/dashboard" className="flex items-baseline gap-1">
                <h1 className="text-2xl font-black">
                  <span className="text-white">OCEAN</span>
                  <span className="text-blue-400">R</span>
                </h1>
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-2">
                  Admin
                </span>
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <button className="text-gray-300 hover:text-white hover:bg-blue-600/20 p-2 rounded-lg transition-colors">
                <Bell size={20} />
              </button>
              <button className="text-gray-300 hover:text-white hover:bg-blue-600/20 p-2 rounded-lg transition-colors">
                <Settings size={20} />
              </button>
              <div className="hidden sm:block text-right">
                <p className="text-white text-sm font-semibold">Welcome, {user?.name}</p>
                <p className="text-gray-400 text-xs">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all shadow-lg font-medium"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`fixed top-0 left-0 h-screen bg-[#0f172a] w-64 md:w-72 lg:w-64 flex-shrink-0 z-30 transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="h-full overflow-y-auto pt-20 pb-6 px-4 md:px-5 lg:px-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40 pointer-events-none"></div>
            <nav className="space-y-2 relative z-10">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30'
                        : 'text-gray-300 hover:bg-blue-600/10 hover:text-white'
                    }`}
                  >
                    <Icon size={20} className={isActive ? '' : 'group-hover:scale-110 transition-transform'} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* User Info at Bottom */}
            <div className="mt-8 p-4 bg-blue-600/10 rounded-xl border border-blue-500/20 relative z-10">
              <p className="text-white text-sm font-semibold mb-1">Admin Account</p>
              <p className="text-gray-400 text-xs">{user?.email}</p>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6 lg:ml-64">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
