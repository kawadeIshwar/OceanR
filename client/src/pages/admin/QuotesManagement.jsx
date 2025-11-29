import { useEffect, useState } from 'react';
import { MessageSquare, Mail, Phone, Building, Trash2, Filter, Search, Calendar, User, Briefcase, DollarSign, FileText, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import api from '../../utils/api';

const QuotesManagement = () => {
  const [quotes, setQuotes] = useState([]);
  const [filteredQuotes, setFilteredQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    fetchQuotes();
  }, []);

  useEffect(() => {
    filterQuotesData();
  }, [quotes, searchQuery, filterStatus]);

  const fetchQuotes = async () => {
    try {
      const response = await api.get('/quotes');
      setQuotes(response.data);
    } catch (error) {
      console.error('Error fetching quotes:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterQuotesData = () => {
    let filtered = [...quotes];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (q) =>
          q.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.message?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Status filter
    if (filterStatus) {
      filtered = filtered.filter((q) => q.status === filterStatus);
    }

    setFilteredQuotes(filtered);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this quote request?')) return;

    try {
      await api.delete(`/quotes/${id}`);
      setQuotes(quotes.filter((q) => q._id !== id));
    } catch (error) {
      console.error('Error deleting quote:', error);
      alert('Failed to delete quote request');
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await api.put(`/quotes/${id}`, { status });
      setQuotes(
        quotes.map((q) => (q._id === id ? { ...q, status } : q))
      );
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case 'pending':
        return {
          color: 'from-orange-500 to-orange-600',
          bg: 'bg-orange-50',
          text: 'text-orange-700',
          icon: Clock,
        };
      case 'contacted':
        return {
          color: 'from-blue-500 to-blue-600',
          bg: 'bg-blue-50',
          text: 'text-blue-700',
          icon: MessageSquare,
        };
      case 'completed':
        return {
          color: 'from-green-500 to-green-600',
          bg: 'bg-green-50',
          text: 'text-green-700',
          icon: CheckCircle2,
        };
      default:
        return {
          color: 'from-gray-500 to-gray-600',
          bg: 'bg-gray-50',
          text: 'text-gray-700',
          icon: AlertCircle,
        };
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-5 md:mb-6">
        <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-1 md:mb-2">Quote Requests</h1>
        <p className="text-sm md:text-base text-gray-600">Manage and respond to customer inquiries</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-4 md:p-5 mb-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search quotes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 md:py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all text-sm md:text-base"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 md:py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all appearance-none bg-white text-sm md:text-base"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="contacted">Contacted</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-3 md:mt-4 flex items-center gap-2 text-xs md:text-sm text-gray-600">
          <MessageSquare size={14} className="md:w-4 md:h-4" />
          <span className="font-semibold">
            Showing {filteredQuotes.length} of {quotes.length} quote requests
          </span>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : quotes.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare size={36} className="text-purple-600 md:w-10 md:h-10" />
          </div>
          <p className="text-lg md:text-xl font-bold text-gray-900 mb-2">No quote requests yet</p>
          <p className="text-sm md:text-base text-gray-600">Customer inquiries will appear here</p>
        </div>
      ) : filteredQuotes.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search size={36} className="text-gray-400 md:w-10 md:h-10" />
          </div>
          <p className="text-lg md:text-xl font-bold text-gray-900 mb-2">No quotes found</p>
          <p className="text-sm md:text-base text-gray-600 mb-6">Try adjusting your search or filters</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setFilterStatus('');
            }}
            className="text-purple-600 hover:text-purple-700 font-semibold text-sm md:text-base"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredQuotes.map((quote) => {
            const statusConfig = getStatusConfig(quote.status);
            const StatusIcon = statusConfig.icon;
            return (
              <div key={quote._id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${statusConfig.color}`}></div>
                <div className="p-5">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-5">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-10 h-10 bg-gradient-to-br ${statusConfig.color} rounded-xl flex items-center justify-center shadow-md`}>
                          <User className="text-white" size={20} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-black text-gray-900">{quote.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`inline-flex items-center gap-1.5 ${statusConfig.bg} ${statusConfig.text} text-xs font-bold px-3 py-1.5 rounded-lg`}>
                              <StatusIcon size={14} />
                              {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-gray-500">
                              <Calendar size={12} />
                              {new Date(quote.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {quote.company && (
                          <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                            <Building size={16} className="text-gray-500 flex-shrink-0" />
                            <span className="text-sm font-semibold text-gray-700">{quote.company}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg">
                          <Mail size={16} className="text-blue-600 flex-shrink-0" />
                          <a href={`mailto:${quote.email}`} className="text-sm font-semibold text-blue-700 hover:text-blue-800 truncate">
                            {quote.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 bg-emerald-50 px-3 py-2 rounded-lg">
                          <Phone size={16} className="text-emerald-600 flex-shrink-0" />
                          <a href={`tel:${quote.phone}`} className="text-sm font-semibold text-emerald-700 hover:text-emerald-800">
                            {quote.phone}
                          </a>
                        </div>
                        {quote.industry && (
                          <div className="flex items-center gap-2 bg-purple-50 px-3 py-2 rounded-lg">
                            <Briefcase size={16} className="text-purple-600 flex-shrink-0" />
                            <span className="text-sm font-semibold text-purple-700">{quote.industry}</span>
                          </div>
                        )}
                        {quote.budget && (
                          <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-lg">
                            <DollarSign size={16} className="text-green-600 flex-shrink-0" />
                            <span className="text-sm font-semibold text-green-700">{quote.budget}</span>
                          </div>
                        )}
                      </div>

                      {quote.productId && (
                        <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
                          <p className="text-xs font-bold text-blue-700 uppercase tracking-wide mb-2">Product Requested</p>
                          <p className="text-sm font-bold text-gray-900">{quote.productId.name}</p>
                        </div>
                      )}

                      <div className="mt-4">
                        <div className="flex items-center gap-2 mb-2">
                          <FileText size={16} className="text-gray-500" />
                          <p className="text-sm font-bold text-gray-700">Message:</p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                          <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{quote.message}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:min-w-[160px]">
                      <select
                        value={quote.status}
                        onChange={(e) => handleStatusChange(quote._id, e.target.value)}
                        className="flex-1 lg:flex-none px-4 py-3 border-2 border-gray-300 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all bg-white"
                      >
                        <option value="pending">Pending</option>
                        <option value="contacted">Contacted</option>
                        <option value="completed">Completed</option>
                      </select>
                      <button
                        onClick={() => handleDelete(quote._id)}
                        className="p-3 text-red-600 hover:text-red-700 hover:bg-red-100 rounded-xl transition-all font-semibold border-2 border-transparent hover:border-red-200"
                        title="Delete"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default QuotesManagement;
