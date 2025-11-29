import { useState, useEffect } from 'react';
import { Zap, Shield, Headphones, Award } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  const [stats, setStats] = useState({
    products: 0,
    experience: 0,
    quality: 0
  });

  // Animate stats on mount
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = duration / steps;

    const targetValues = {
      products: 500,
      experience: 5,
      quality: 100
    };

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setStats({
        products: Math.floor(targetValues.products * progress),
        experience: Math.floor(targetValues.experience * progress),
        quality: Math.floor(targetValues.quality * progress)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setStats(targetValues);
      }
    }, increment);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hero-wrapper">
      {/* Bold Asymmetric Hero Section */}
      <section className="hero-section">
        
        {/* Decorative Elements */}
        <div className="hero-accent-line"></div>
        <div className="hero-corner-shape"></div>
        
        {/* Main Content Container */}
        <div className="hero-container">
          
          {/* Left Column - Primary Content */}
          <div className="hero-main-content">

            {/* Massive Typography */}
            <div className="hero-title-block">
              <h1 className="hero-mega-title">
                <span className="mega-line mega-line-1">INDUSTRIAL</span>
                <span className="mega-line mega-line-2">EXCELLENCE</span>
              </h1>
            </div>

            {/* Tagline */}
            <p className="hero-tagline-text">
              Powering Industries With Reliable Tools & Parts Designed for Long-Lasting Performance.
            </p>

            {/* Action Buttons */}
            <div className="hero-actions">
              <a href="/products" className="action-btn action-primary">
                View Products
                <span className="btn-arrow">→</span>
              </a>
              <a href="/contact" className="action-btn action-outline">
                Get In Touch
              </a>
            </div>

            {/* Bottom Stats Row */}
            <div className="hero-metrics">
              <div className="metric">
                <div className="metric-value">{stats.products}+</div>
                <div className="metric-label">Products Available</div>
              </div>
              <div className="metric">
                <div className="metric-value">{stats.experience}+</div>
                <div className="metric-label">Years in Business</div>
              </div>
              <div className="metric">
                <div className="metric-value">{stats.quality}%</div>
                <div className="metric-label">Quality Guarantee</div>
              </div>
            </div>
          </div>

          {/* Right Column - Image Grid */}
          <div className="hero-visual-grid">
            
            {/* Primary Large Image */}
            <div className="grid-image grid-main">
              <img 
                src="/Press parts.jpg" 
                alt="Industrial machinery"
              />
              
            </div>

            {/* Secondary Images */}
            <div className="grid-image grid-small-1">
              <img 
                src="https://plus.unsplash.com/premium_photo-1752533866443-fa7938c19d6c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Industrial equipment"
              />
            </div>

            <div className="grid-image grid-small-2">
              <img 
                src="/heat shrink sleves.jpg" 
                alt="Manufacturing process"
              />
            </div>

            {/* Decorative Stats Card */}
            {/*  */}
          </div>
        </div>

        
      </section>

      {/* Feature Highlights Strip - Redesigned */}
      <div className="feature-strip-modern">
        <div className="feature-strip-container">
          <div className="feature-card feature-card-1">
            <div className="feature-card-inner">
              <div className="feature-icon-wrapper">
                <div className="feature-icon-glow"></div>
                <Zap className="feature-icon" size={32} strokeWidth={2} />
              </div>
              <div className="feature-content">
                <h3 className="feature-title">Fast Delivery</h3>
                <p className="feature-description">Lightning-fast shipping to your doorstep</p>
              </div>
              <div className="feature-number">01</div>
            </div>
          </div>

          <div className="feature-card feature-card-2">
            <div className="feature-card-inner">
              <div className="feature-icon-wrapper">
                <div className="feature-icon-glow"></div>
                <Shield className="feature-icon" size={32} strokeWidth={2} />
              </div>
              <div className="feature-content">
                <h3 className="feature-title">Secure Payment</h3>
                <p className="feature-description">Bank-level encryption for all transactions</p>
              </div>
              <div className="feature-number">02</div>
            </div>
          </div>

          <div className="feature-card feature-card-3">
            <div className="feature-card-inner">
              <div className="feature-icon-wrapper">
                <div className="feature-icon-glow"></div>
                <Headphones className="feature-icon" size={32} strokeWidth={2} />
              </div>
              <div className="feature-content">
                <h3 className="feature-title">24/7 Support</h3>
                <p className="feature-description">Expert assistance whenever you need it</p>
              </div>
              <div className="feature-number">03</div>
            </div>
          </div>

          <div className="feature-card feature-card-4">
            <div className="feature-card-inner">
              <div className="feature-icon-wrapper">
                <div className="feature-icon-glow"></div>
                <Award className="feature-icon" size={32} strokeWidth={2} />
              </div>
              <div className="feature-content">
                <h3 className="feature-title">Quality Assured</h3>
                <p className="feature-description">Premium products with certified excellence</p>
              </div>
              <div className="feature-number">04</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
