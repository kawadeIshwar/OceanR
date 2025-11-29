import { useEffect, useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Search, Package, ChevronDown, Filter, SlidersHorizontal } from 'lucide-react';
import api from '../utils/api';
import './Products.css';

const Products = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  // Initialize selectedCategory from URL parameter
  const [selectedCategory, setSelectedCategory] = useState(() => {
    return searchParams.get('category') || '';
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Update selectedCategory when URL changes (for browser back/forward)
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category') || '';
    setSelectedCategory(categoryFromUrl);
  }, [searchParams]);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, searchTerm]);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let url = '/products?';
      if (selectedCategory) url += `category=${selectedCategory}&`;
      if (searchTerm) url += `search=${searchTerm}&`;
      
      const response = await api.get(url);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Swipe detection for mobile
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe || isRightSwipe) {
      // Swipe detected - can be used for image galleries in future
      console.log(isLeftSwipe ? 'Left swipe' : 'Right swipe');
    }
  };

  // Skeleton Loading Component
  const SkeletonCard = () => (
    <div className="product-card skeleton-card">
      <div className="skeleton-image"></div>
      <div className="product-info">
        <div className="skeleton-title"></div>
        <div className="skeleton-badge"></div>
        <div className="skeleton-description"></div>
        <div className="skeleton-description short"></div>
      </div>
    </div>
  );

  return (
    <div className="products-page">
      <div className="products-container">
        {/* Decorative Background Elements */}
        <div className="products-bg-overlay"></div>
        <div className="products-bg-pattern"></div>

        {/* Header Section */}
        <div className="products-header">
          <div className="products-label">
            <div className="label-bar"></div>
            <span className="label-text">Browse Our Collection</span>
            <div className="label-bar"></div>
          </div>
          <h1 className="products-main-title">
            <span className="title-main">OUR </span>
            <span className="title-accent">PRODUCTS</span>
          </h1>
        </div>

        <div className="products-layout">
          {/* Horizontal Filters Bar */}
          <div className="products-sidebar">
            <div className="filters-card">
              <div className="filters-content">
                {/* Search */}
                <div className="filter-group search-group">
                  <label htmlFor="search" className="filter-label">
                    Search Products
                  </label>
                  <div className="search-input-wrapper">
                    <Search className="search-icon" size={20} />
                    <input
                      id="search"
                      type="text"
                      placeholder="Search by name or description..."
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          setSearchTerm(searchInput);
                        }
                      }}
                      className="search-input"
                    />
                    <button
                      type="button"
                      onClick={() => setSearchTerm(searchInput)}
                      className="search-btn"
                      aria-label="Search products"
                    >
                      Search
                    </button>
                  </div>
                </div>

                {/* Category Filter */}
                <div className="filter-group category-group">
                  <label htmlFor="category" className="filter-label">
                    Filter by Category
                  </label>
                  <div className="category-select-wrapper">
                    <select
                      id="category"
                      value={selectedCategory}
                      onChange={(e) => {
                        const newCategory = e.target.value;
                        setSelectedCategory(newCategory);
                        // Update URL with category filter
                        if (newCategory) {
                          navigate(`/products?category=${newCategory}`);
                        } else {
                          navigate('/products');
                        }
                      }}
                      className="category-select"
                    >
                      <option value="">All Categories</option>
                      {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="category-select-icon" size={20} />
                  </div>
                </div>

                {/* Clear Filters */}
                {(selectedCategory || searchTerm) && (
                  <div className="filter-group clear-group">
                    <label className="filter-label" style={{ visibility: 'hidden' }}>
                      Clear
                    </label>
                    <button
                      onClick={() => {
                        setSelectedCategory('');
                        setSearchTerm('');
                        setSearchInput('');
                        // Clear URL parameters
                        navigate('/products');
                      }}
                      className="clear-filters-btn"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <main className="products-content">
            {loading ? (
              <div className="products-grid">
                {[...Array(6)].map((_, index) => (
                  <SkeletonCard key={index} />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="no-products-container">
                <Package className="no-products-icon" />
                <h3 className="no-products-title">No products found</h3>
                <p className="no-products-subtitle">Try adjusting your filters or search terms</p>
              </div>
            ) : (
              <>
                <div className="products-count">
                  Showing <strong>{products.length}</strong> product{products.length !== 1 ? 's' : ''}
                  {selectedCategory && categories.length > 0 && (
                    <span className="category-indicator">
                      {' '}in{' '}
                      <strong>
                        {categories.find(cat => cat._id === selectedCategory)?.name || 'Selected Category'}
                      </strong>
                    </span>
                  )}
                </div>
                <div className="products-grid">
                  {products.map((product) => (
                    <Link
                      key={product._id}
                      to={`/products/${product._id}`}
                      className="product-card"
                      onTouchStart={onTouchStart}
                      onTouchMove={onTouchMove}
                      onTouchEnd={onTouchEnd}
                    >
                      <div className="product-image-container">
                        {product.images?.[0] ? (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="product-image"
                            loading="lazy"
                          />
                        ) : (
                          <div className="product-placeholder">
                            <Package size={64} />
                          </div>
                        )}
                      </div>
                      <div className="product-info">
                        <h3 className="product-name">
                          {product.name}
                        </h3>
                        {product.category && (
                          <span className="product-category-badge">
                            {product.category.name}
                          </span>
                        )}
                        <p className="product-description">{product.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </main>
        </div>

        {/* Mobile Bottom Filter Bar */}
        <div className="mobile-filter-bar">
          <button 
            className="mobile-filter-btn"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            aria-label="Toggle filters"
          >
            <Filter size={20} />
            <span>Filters</span>
            {(selectedCategory || searchTerm) && (
              <span className="filter-badge">{(selectedCategory ? 1 : 0) + (searchTerm ? 1 : 0)}</span>
            )}
          </button>
          <button 
            className="mobile-filter-btn"
            onClick={() => {
              const content = document.querySelector('.products-content');
              if (content) content.scrollIntoView({ behavior: 'smooth' });
            }}
            aria-label="Sort options"
          >
            <SlidersHorizontal size={20} />
            <span>Sort</span>
          </button>
        </div>

        {/* Mobile Filter Overlay */}
        {showMobileFilters && (
          <div className="mobile-filter-overlay" onClick={() => setShowMobileFilters(false)}>
            <div className="mobile-filter-panel" onClick={(e) => e.stopPropagation()}>
              <div className="mobile-filter-header">
                <h3>Filter Products</h3>
                <button 
                  className="mobile-filter-close"
                  onClick={() => setShowMobileFilters(false)}
                  aria-label="Close filters"
                >
                  ×
                </button>
              </div>
              <div className="mobile-filter-content">
                {/* Search */}
                <div className="filter-group">
                  <label htmlFor="mobile-search" className="filter-label">
                    Search Products
                  </label>
                  <div className="search-input-wrapper">
                    <Search className="search-icon" size={20} />
                    <input
                      id="mobile-search"
                      type="text"
                      placeholder="Search..."
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      className="search-input"
                    />
                  </div>
                </div>

                {/* Category */}
                <div className="filter-group">
                  <label htmlFor="mobile-category" className="filter-label">
                    Category
                  </label>
                  <select
                    id="mobile-category"
                    value={selectedCategory}
                    onChange={(e) => {
                      const newCategory = e.target.value;
                      setSelectedCategory(newCategory);
                      // Update URL with category filter
                      if (newCategory) {
                        navigate(`/products?category=${newCategory}`);
                      } else {
                        navigate('/products');
                      }
                    }}
                    className="category-select"
                  >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mobile-filter-actions">
                <button
                  onClick={() => {
                    setSelectedCategory('');
                    setSearchTerm('');
                    setSearchInput('');
                    setShowMobileFilters(false);
                    // Clear URL parameters
                    navigate('/products');
                  }}
                  className="mobile-filter-clear"
                >
                  Clear All
                </button>
                <button
                  onClick={() => {
                    setSearchTerm(searchInput);
                    setShowMobileFilters(false);
                  }}
                  className="mobile-filter-apply"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
