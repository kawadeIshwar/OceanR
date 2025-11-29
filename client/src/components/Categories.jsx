import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Package, Shield, Wrench, Zap, HardHat, Boxes, Cog, Ruler, ChevronLeft, ChevronRight } from 'lucide-react';
import api from '../utils/api';
import './Categories.css';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Category background images mapping
  const categoryImages = {
    'Maintenance Material & Equipment\'s': '/image%204.jpg',
    'Consumables': '/image%201.jpg',
    'Electricals': '/image%202.jpg',
    'Electronics': '/image%203.jpg',
    'Press parts / Machining Parts': '/image%205.jpg',
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);


  // Helper function to get category icons
  const getCategoryIcon = (categoryName, size = 40) => {
    const name = categoryName.toLowerCase();
    const iconProps = { size, strokeWidth: 1.5 };
    
    if (name.includes('maintenance') || name.includes('equipment')) {
      return <Cog {...iconProps} />;
    } else if (name.includes('consumable')) {
      return <Boxes {...iconProps} />;
    } else if (name.includes('electrical') && !name.includes('electronic')) {
      return <Zap {...iconProps} />;
    } else if (name.includes('electronic')) {
      return <Package {...iconProps} />;
    } else if (name.includes('press') || name.includes('machining')) {
      return <Wrench {...iconProps} />;
    } else if (name.includes('ppe') || name.includes('safety')) {
      return <Shield {...iconProps} />;
    } else if (name.includes('tool')) {
      return <HardHat {...iconProps} />;
    } else if (name.includes('measuring')) {
      return <Ruler {...iconProps} />;
    }
    return <Package {...iconProps} />;
  };

  if (loading) {
    return (
      <section className="categories-section">
        <div className="categories-container">
          <div className="categories-loading">Loading categories...</div>
        </div>
      </section>
    );
  }


  return (
    <section className="categories-section">
      {/* Animated Background */}
      <div className="carousel-bg-overlay"></div>
      <div className="carousel-bg-pattern"></div>

      <div className="categories-container">
        {/* Section Header */}
        <div className="categories-header">
          <div className="categories-label">
            <span className="label-bar"></span>
            <span className="label-text">Industry Solutions</span>
            <span className="label-bar"></span>
          </div>
          
          <h2 className="categories-title">
            <span className="title-line">EXPLORE </span>
            <span className="title-accent">CATEGORIES</span>
          </h2>
          
          <p className="categories-subtitle">
            Discover our extensive range of industrial equipment, tools, and materials.
            Each category represents years of expertise and commitment to quality excellence.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="categories-grid-container">
          {categories.slice(0, 5).map((category, index) => {
            const backgroundImage = categoryImages[category.name] || '/image1.jpg';
            
            return (
              <Link 
                key={category._id}
                to={`/products?category=${category._id}`}
                className="category-card-static"
              >
                <div className="card-image-box">
                  <div 
                    className="card-image-content"
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                  >
                    <div className="card-image-fade"></div>
                  </div>
                </div>
                <div className="card-text-box">
                  <h3 className="card-name">{category.name}</h3>
                  {category.description && (
                    <p className="card-description">{category.description}</p>
                  )}
                  <div className="card-action-btn">
                    <span>View Products</span>
                    <ArrowUpRight size={18} strokeWidth={2.5} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;
