import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, ArrowRight } from 'lucide-react';
import api from '../utils/api';
import './FeaturedProducts.css';

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await api.get('/products?featured=true');
        // Limit to 8 products for 2 rows × 4 columns
        const products = Array.isArray(response.data) ? response.data : [];
        setFeaturedProducts(products.slice(0, 8));
      } catch (error) {
        console.error('Error fetching featured products:', error);
        setFeaturedProducts([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  if (loading) {
    return (
      <section className="featured-products-section">
        <div className="featured-container">
          <div className="loading-state">Loading featured products...</div>
        </div>
      </section>
    );
  }

  if (featuredProducts.length === 0) {
    return null;
  }

  return (
    <section className="featured-products-section">
      <div className="featured-bg-overlay"></div>
      <div className="featured-bg-pattern"></div>
      
      <div className="featured-container">
        {/* Section Header */}
        <div className="featured-header">
          <div className="featured-label">
            <div className="label-bar"></div>
            <span className="label-text">Premium Selection</span>
            <div className="label-bar"></div>
          </div>
          <h2 className="featured-title">
            <span className="title-line">FEATURED </span>{' '}
            <span className="title-accent">PRODUCTS</span>
          </h2>
          <p className="featured-subtitle">
            Discover our handpicked selection of premium industrial products
          </p>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {featuredProducts.map((product) => (
            <div key={product._id} className="product-card">
              <Link to={`/products/${product._id}`} className="product-image-link">
                <div className="product-image-wrapper">
                  {product.images?.[0] ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="product-image"
                      loading="lazy"
                    />
                  ) : (
                    <div className="product-placeholder">
                      <Package size={48} strokeWidth={1.5} />
                    </div>
                  )}
                  <div className="product-overlay"></div>
                </div>
              </Link>

              <div className="product-info">
                <Link to={`/products/${product._id}`} className="product-name-link">
                  <h3 className="product-name">{product.name}</h3>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Products Button */}
        <div className="featured-footer">
          <Link to="/products" className="view-all-btn">
            <span>View All Products</span>
            <ArrowRight size={20} strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
