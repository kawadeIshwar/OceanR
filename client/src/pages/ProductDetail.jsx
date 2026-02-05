import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Package, Download, ArrowLeft, MessageCircle, Mail, Phone, CheckCircle2, Share2, Heart, ShoppingCart } from 'lucide-react';
import api from '../utils/api';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [imageZoom, setImageZoom] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  // Contact handlers
  const handleWhatsApp = () => {
    const phoneNumber = '7620980794'; // Replace with your WhatsApp number
    const message = `Hello, I'm interested in the product ${product.name}. Could you please share detailed information about its features, specifications, pricing, and delivery options?`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEmail = () => {
    const email = 'info@oceanr.com'; // Replace with your email
    const subject = `Inquiry about ${product.name}`;
    const body = `Hi,\n\nI'm interested in the following product:\n\nProduct Name: ${product.name}\nCategory: ${product.category?.name || 'N/A'}\nDescription: ${product.description}\n\nPlease provide more details and pricing information.\n\nThank you!`;
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  const handleCall = () => {
    const phoneNumber = '+917620980794'; // Replace with your phone number
    window.location.href = `tel:${phoneNumber}`;
  };

  if (loading) {
    return (
      <div className="product-detail-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-page">
        <div className="not-found-container">
          <Package size={80} className="not-found-icon" />
          <h2 className="not-found-title">Product Not Found</h2>
          <p className="not-found-text">The product you're looking for doesn't exist or has been removed.</p>
          <Link to="/products" className="back-to-products-btn">
            <ArrowLeft size={20} />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        {/* Back Button */}
        <Link to="/products" className="back-button">
          <ArrowLeft size={20} />
          <span>Back to Products</span>
        </Link>

        {/* Main Product Section */}
        <div className="product-main-section">
          {/* Left Side - Image Gallery */}
          <div className="product-gallery">
            <div className={`main-image-container ${imageZoom ? 'zoomed' : ''}`}>
              {product.images?.length > 0 ? (
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="main-product-image"
                  onClick={() => setImageZoom(!imageZoom)}
                />
              ) : (
                <div className="image-placeholder">
                  <Package size={120} />
                </div>
              )}
              {product.images?.length > 0 && (
                <div className="image-zoom-hint">Click to {imageZoom ? 'zoom out' : 'zoom in'}</div>
              )}
            </div>

            <div className="product-header mobile-product-header">
              {product.category && (
                <Link to={`/products?category=${product.category._id}`} className="product-category-badge">
                  {product.category.name}
                </Link>
              )}
              <h1 className="product-title">{product.name}</h1>
            </div>

            {product.images?.length > 1 && (
              <div className="thumbnail-gallery">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`thumbnail-button ${selectedImage === index ? 'active' : ''}`}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} className="thumbnail-image" />
                  </button>
                ))}
              </div>
            )}

            {/* Inquiry Section - Moved Below Image */}
            <div className="inquiry-section">
              <div className="inquiry-header">
                <CheckCircle2 className="inquiry-icon" size={24} />
                <div>
                  <h3 className="inquiry-title">Interested in this product?</h3>
                  <p className="inquiry-subtitle">Get in touch with us through your preferred channel</p>
                </div>
              </div>

              {/* Inquiry Buttons */}
              <div className="inquiry-buttons">
                {/* WhatsApp Button */}
                <button className="inquiry-btn whatsapp-btn" onClick={handleWhatsApp}>
                  <div className="inquiry-btn-icon">
                    <MessageCircle size={22} />
                  </div>
                  <div className="inquiry-btn-content">
                    <span className="inquiry-btn-title">WhatsApp</span>
                    <span className="inquiry-btn-desc">Get instant response</span>
                  </div>
                  <div className="inquiry-btn-arrow">→</div>
                </button>

                {/* Email Button */}
                <button className="inquiry-btn email-btn" onClick={handleEmail}>
                  <div className="inquiry-btn-icon">
                    <Mail size={22} />
                  </div>
                  <div className="inquiry-btn-content">
                    <span className="inquiry-btn-title">Email Us</span>
                    <span className="inquiry-btn-desc">Send detailed inquiry</span>
                  </div>
                  <div className="inquiry-btn-arrow">→</div>
                </button>

                {/* Call Now Button - Full Width */}
                <button className="inquiry-btn call-btn full-width" onClick={handleCall}>
                  <div className="inquiry-btn-icon">
                    <Phone size={22} />
                  </div>
                  <div className="inquiry-btn-content">
                    <span className="inquiry-btn-title">Call Now</span>
                    <span className="inquiry-btn-desc">Speak directly with our team</span>
                  </div>
                  <div className="inquiry-btn-arrow">→</div>
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Product Info & Actions */}
          <div className="product-info-section">
            {/* Product Header */}
            <div className="product-header">
              {product.category && (
                <Link to={`/products?category=${product.category._id}`} className="product-category-badge">
                  {product.category.name}
                </Link>
              )}
              <h1 className="product-title">{product.name}</h1>
            </div>

            {/* Product Description */}
            <div className="product-description-box">
              <h3 className="description-title">Product Description</h3>
              <div className="description-content">
                {product.description ? (
                  <>
                    <p 
                      className={`product-description ${showFullDescription ? 'expanded' : 'collapsed'}`}
                      style={{display: 'block', visibility: 'visible', opacity: '1'}}
                    >
                      {product.description}
                    </p>
                    {product.description.length > 150 && (
                      <button 
                        className={`see-more-btn ${showFullDescription ? 'expanded' : ''}`}
                        onClick={() => setShowFullDescription(!showFullDescription)}
                        style={{display: 'inline-block', visibility: 'visible'}}
                      >
                        {showFullDescription ? 'See Less' : 'See More'}
                      </button>
                    )}
                  </>
                ) : (
                  <p className="product-description no-description" style={{display: 'block', visibility: 'visible'}}>
                    No description available for this product.
                  </p>
                )}
              </div>
            </div>

            {/* Specifications */}
            {product.specs && Object.keys(product.specs).length > 0 && (
              <div className="specifications-box">
                <h3 className="specs-title">Specifications</h3>
                <div className="specs-table">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="spec-row">
                      <span className="spec-key">{key}</span>
                      <span className="spec-value">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Download Datasheet */}
            {product.datasheet && (
              <a
                href={product.datasheet}
                target="_blank"
                rel="noopener noreferrer"
                className="datasheet-button"
              >
                <Download size={20} />
                <span>Download Product Datasheet</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
