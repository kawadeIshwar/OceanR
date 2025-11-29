import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, X, Package } from 'lucide-react';
import { useState, useEffect } from 'react';
import api from '../utils/api';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Search functionality
  useEffect(() => {
    const searchProducts = async () => {
      if (searchQuery.trim().length < 2) {
        setSearchResults([]);
        return;
      }

      setSearching(true);
      try {
        const response = await api.get('/products');
        const filtered = response.data.filter(product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category?.name?.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filtered.slice(0, 5)); // Limit to 5 results
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setSearching(false);
      }
    };

    const debounce = setTimeout(searchProducts, 300);
    return () => clearTimeout(debounce);
  }, [searchQuery]);

  const handleSearchToggle = () => {
    setSearchOpen(!searchOpen);
    if (!searchOpen) {
      setSearchQuery('');
      setSearchResults([]);
    }
  };

  const handleResultClick = (productId) => {
    navigate(`/products/${productId}`);
    setSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Bold Minimal Navbar */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          
          {/* Left - Logo */}
          <Link to="/" className="nav-brand">
            <div className="brand-logo">
              <img 
                src="/oceanr logo.png" 
                alt="OceanR Enterprises Logo" 
                className="logo-img"
              />
            </div>
            <div className="brand-mark">
              <span className="brand-ocean">OCEAN</span>
              <span className="brand-r">R</span>
            </div>
            {/* <span className="brand-line"></span>
            <span className="brand-sub">ENTERPRISES</span> */}
          </Link>

          {/* Center - Navigation Links (Desktop) */}
          <div className="nav-menu">
            <Link to="/" className={`nav-item ${isActive('/') ? 'active' : ''}`}>
              {/* <span className="nav-num">01</span> */}
              <span className="nav-text">Home</span>
            </Link>
            <Link to="/products" className={`nav-item ${isActive('/products') ? 'active' : ''}`}>
              {/* <span className="nav-num">02</span> */}
              <span className="nav-text">Products</span>
            </Link>
            <Link to="/about" className={`nav-item ${isActive('/about') ? 'active' : ''}`}>
              {/* <span className="nav-num">03</span> */}
              <span className="nav-text">About</span>
            </Link>
            <Link to="/contact" className={`nav-item ${isActive('/contact') ? 'active' : ''}`}>
              {/* <span className="nav-num">04</span> */}
              <span className="nav-text">Contact</span>
            </Link>
          </div>

          {/* Right - Actions */}
          <div className="nav-actions">
            <button 
              className="nav-search-btn" 
              onClick={handleSearchToggle}
              aria-label="Search"
            >
              {searchOpen ? <X size={20} strokeWidth={2.5} /> : <Search size={20} strokeWidth={2.5} />}
            </button>
            <Link to="/contact" className="nav-cta">Get a Quote</Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            className={`nav-toggle ${isOpen ? 'active' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-overlay ${isOpen ? 'open' : ''}`}>
        <div className="mobile-menu">
          <div className="mobile-header">
            <Link to="/" className="mobile-brand" onClick={() => setIsOpen(false)}>
              <span className="brand-ocean">OCEAN</span>
              <span className="brand-r">R</span>
            </Link>
            <button 
              className="mobile-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              <span></span>
              <span></span>
            </button>
          </div>

          <nav className="mobile-nav">
            <Link 
              to="/" 
              className={`mobile-item ${isActive('/') ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              <span className="mobile-num">01</span>
              <span className="mobile-text">Home</span>
            </Link>
            <Link 
              to="/products" 
              className={`mobile-item ${isActive('/products') ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              <span className="mobile-num">02</span>
              <span className="mobile-text">Products</span>
            </Link>
            <Link 
              to="/about" 
              className={`mobile-item ${isActive('/about') ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              <span className="mobile-num">03</span>
              <span className="mobile-text">About Us</span>
            </Link>
            <Link 
              to="/contact" 
              className={`mobile-item ${isActive('/contact') ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              <span className="mobile-num">04</span>
              <span className="mobile-text">Contact</span>
            </Link>
          </nav>

          <div className="mobile-footer">
            <Link to="/contact" className="mobile-cta" onClick={() => setIsOpen(false)}>
              Get a Quote
            </Link>
            <div className="mobile-contact-info">
              <a href="tel:+919766652205">+91 9766652205</a>
              <a href="mailto:oceanrenterprises@gmail.com">oceanrenterprises@gmail.com</a>
            </div>
          </div>
        </div>
      </div>

      {/* Search Overlay */}
      <div className={`search-overlay ${searchOpen ? 'open' : ''}`}>
        <div className="search-container">
          <div className="search-box">
            <Search className="search-icon" size={22} />
            <input
              type="text"
              placeholder="Search products by name, category, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
              autoFocus
            />
            {searchQuery && (
              <button 
                className="search-clear"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Search Results */}
          {searchQuery.length >= 2 && (
            <div className="search-results">
              {searching ? (
                <div className="search-loading">
                  <div className="loading-spinner"></div>
                  <p>Searching...</p>
                </div>
              ) : searchResults.length > 0 ? (
                <>
                  <div className="results-header">
                    <p>{searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found</p>
                  </div>
                  <div className="results-list">
                    {searchResults.map((product) => (
                      <button
                        key={product._id}
                        className="result-item"
                        onClick={() => handleResultClick(product._id)}
                      >
                        <div className="result-image">
                          {product.images?.[0] ? (
                            <img src={product.images[0]} alt={product.name} />
                          ) : (
                            <Package size={24} />
                          )}
                        </div>
                        <div className="result-info">
                          <h4 className="result-name">{product.name}</h4>
                          {product.category && (
                            <span className="result-category">{product.category.name}</span>
                          )}
                          <p className="result-description">{product.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="results-footer">
                    <Link 
                      to="/products" 
                      className="view-all-link"
                      onClick={() => setSearchOpen(false)}
                    >
                      View all products →
                    </Link>
                  </div>
                </>
              ) : (
                <div className="no-results">
                  <Package size={48} />
                  <p>No products found</p>
                  <span>Try different keywords or browse all products</span>
                </div>
              )}
            </div>
          )}

          {searchQuery.length < 2 && searchQuery.length > 0 && (
            <div className="search-hint">
              <p>Type at least 2 characters to search...</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
