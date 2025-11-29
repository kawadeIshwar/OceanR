import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Package, Search, Filter, Star, Eye } from 'lucide-react';
import api from '../../utils/api';
import ProductForm from '../../components/admin/ProductForm';

const ProductsManagement = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterFeatured, setFilterFeatured] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, searchQuery, filterCategory, filterFeatured]);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.SKU?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (filterCategory) {
      filtered = filtered.filter((p) => p.category?._id === filterCategory);
    }

    // Featured filter
    if (filterFeatured) {
      const isFeatured = filterFeatured === 'true';
      filtered = filtered.filter((p) => p.featured === isFeatured);
    }

    setFilteredProducts(filtered);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      await api.delete(`/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingProduct(null);
    fetchProducts();
  };

  return (
    <div>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 md:gap-4 mb-5 md:mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-1 md:mb-2">Products Management</h1>
          <p className="text-sm md:text-base text-gray-600">Manage your product catalog</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2.5 md:px-6 md:py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-bold shadow-lg hover:shadow-xl text-sm md:text-base whitespace-nowrap"
        >
          <Plus size={18} className="md:w-5 md:h-5" />
          Add Product
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-3 sm:p-4 md:p-5 mb-4 md:mb-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 md:gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 md:py-3 border-2 border-gray-300 rounded-lg md:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-xs sm:text-sm md:text-base"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 md:py-3 border-2 border-gray-300 rounded-lg md:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none bg-white text-xs sm:text-sm md:text-base"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Featured Filter */}
          <div className="relative">
            <Star className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <select
              value={filterFeatured}
              onChange={(e) => setFilterFeatured(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 md:py-3 border-2 border-gray-300 rounded-lg md:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none bg-white text-xs sm:text-sm md:text-base"
            >
              <option value="">All Products</option>
              <option value="true">Featured Only</option>
              <option value="false">Non-Featured</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-2.5 sm:mt-3 md:mt-4 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-600">
          <Package size={14} className="md:w-4 md:h-4" />
          <span className="font-semibold">
            Showing {filteredProducts.length} of {products.length} products
          </span>
        </div>
      </div>

      {showForm && (
        <ProductForm
          product={editingProduct}
          onClose={handleFormClose}
        />
      )}

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package size={36} className="text-gray-400 md:w-10 md:h-10" />
          </div>
          <p className="text-lg md:text-xl font-bold text-gray-900 mb-2">No products yet</p>
          <p className="text-sm md:text-base text-gray-600 mb-6">Get started by adding your first product</p>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2.5 md:px-6 md:py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-bold shadow-lg text-sm md:text-base"
          >
            <Plus size={18} />
            Add Product
          </button>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search size={36} className="text-gray-400 md:w-10 md:h-10" />
          </div>
          <p className="text-lg md:text-xl font-bold text-gray-900 mb-2">No products found</p>
          <p className="text-sm md:text-base text-gray-600 mb-6">Try adjusting your search or filters</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setFilterCategory('');
              setFilterFeatured('');
            }}
            className="text-blue-600 hover:text-blue-700 font-semibold text-sm md:text-base"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <>
          {/* Desktop/Tablet Table View */}
          <div className="hidden lg:block bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-black text-gray-700 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-black text-gray-700 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-black text-gray-700 uppercase tracking-wider">
                      Featured
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-black text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredProducts.map((product) => (
                  <tr key={product._id} className="hover:bg-blue-50/50 transition-colors group">
                    <td className="px-4 lg:px-5 xl:px-6 py-3.5 lg:py-4 w-[50%]">
                      <div className="flex items-center gap-2.5 lg:gap-3 xl:gap-4">
                        <div className="w-12 h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 2xl:w-20 2xl:h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg lg:rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden shadow-md group-hover:shadow-lg transition-shadow">
                          {product.images?.[0] ? (
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Package size={20} className="text-gray-400 lg:w-6 lg:h-6 xl:w-7 xl:h-7" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-gray-900 mb-0.5 lg:mb-1 line-clamp-1 text-sm lg:text-base xl:text-lg">{product.name}</p>
                          <p className="text-xs lg:text-sm xl:text-base text-gray-500 line-clamp-1">
                            {product.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 lg:px-5 xl:px-6 py-3.5 lg:py-4 w-[25%]">
                      <span className="inline-block bg-blue-50 text-blue-700 text-xs xl:text-sm font-semibold px-2 lg:px-3 py-1 lg:py-1.5 rounded-lg">
                        {product.category?.name || '-'}
                      </span>
                    </td>
                    <td className="px-4 lg:px-5 xl:px-6 py-3.5 lg:py-4 w-[20%]">
                      {product.featured ? (
                        <span className="inline-flex items-center gap-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs xl:text-sm font-bold px-2.5 lg:px-3 py-1 lg:py-1.5 rounded-lg shadow-md">
                          <Star size={12} fill="currentColor" />
                          Featured
                        </span>
                      ) : (
                        <span className="inline-block bg-gray-100 text-gray-600 text-xs xl:text-sm font-semibold px-2.5 lg:px-3 py-1 lg:py-1.5 rounded-lg">
                          Standard
                        </span>
                      )}
                    </td>
                    <td className="px-4 lg:px-5 xl:px-6 py-3.5 lg:py-4 text-right w-[5%]">
                      <div className="flex items-center justify-end gap-1 xl:gap-1.5">
                        <button
                          onClick={() => window.open(`/products/${product._id}`, '_blank')}
                          className="p-2 lg:p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
                          title="View"
                        >
                          <Eye size={16} className="lg:w-[18px] lg:h-[18px]" />
                        </button>
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-2 lg:p-2.5 text-blue-600 hover:text-blue-700 hover:bg-blue-100 rounded-lg transition-all"
                          title="Edit"
                        >
                          <Edit size={16} className="lg:w-[18px] lg:h-[18px]" />
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="p-2 lg:p-2.5 text-red-600 hover:text-red-700 hover:bg-red-100 rounded-lg transition-all"
                          title="Delete"
                        >
                          <Trash2 size={16} className="lg:w-[18px] lg:h-[18px]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile/Tablet Card View */}
          <div className="lg:hidden space-y-3 md:space-y-4">
            {filteredProducts.map((product) => (
              <div key={product._id} className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-5 hover:shadow-xl transition-all">
                {/* Product Header */}
                <div className="flex items-start gap-3 md:gap-4 mb-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden shadow-md">
                    {product.images?.[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Package size={24} className="text-gray-400 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm md:text-base text-gray-900 mb-1 line-clamp-2">{product.name}</h3>
                    <p className="text-xs md:text-sm text-gray-500 line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                </div>

                {/* Product Details */}
                <div className="grid grid-cols-2 gap-2 md:gap-3 mb-4">
                  <div className="col-span-1">
                    <p className="text-xs text-gray-500 mb-1 font-semibold">Category</p>
                    <span className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-2 py-1 rounded-md md:rounded-lg truncate max-w-full">
                      {product.category?.name || '-'}
                    </span>
                  </div>
                  <div className="col-span-1">
                    <p className="text-xs text-gray-500 mb-1 font-semibold">Status</p>
                    {product.featured ? (
                      <span className="inline-flex items-center gap-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-md md:rounded-lg shadow-md">
                        <Star size={10} fill="currentColor" />
                        Featured
                      </span>
                    ) : (
                      <span className="inline-block bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-1 rounded-md md:rounded-lg">
                        Standard
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => window.open(`/products/${product._id}`, '_blank')}
                    className="flex-1 flex items-center justify-center gap-1.5 md:gap-2 p-2 md:p-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all font-semibold text-xs md:text-sm"
                  >
                    <Eye size={14} className="md:w-4 md:h-4" />
                    View
                  </button>
                  <button
                    onClick={() => handleEdit(product)}
                    className="flex-1 flex items-center justify-center gap-1.5 md:gap-2 p-2 md:p-2.5 text-blue-700 bg-blue-100 hover:bg-blue-200 rounded-lg transition-all font-semibold text-xs md:text-sm"
                  >
                    <Edit size={14} className="md:w-4 md:h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="p-2 md:p-2.5 text-red-600 bg-red-100 hover:bg-red-200 rounded-lg transition-all"
                  >
                    <Trash2 size={16} className="md:w-[18px] md:h-[18px]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductsManagement;
