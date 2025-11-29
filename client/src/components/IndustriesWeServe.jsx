import './IndustriesWeServe.css';

const IndustriesWeServe = () => {
  const industries = [
    {
      title: 'Manufacturing',
      description: 'Comprehensive supply solutions for production facilities and assembly lines',
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      image: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=600&auto=format&fit=crop'
    },
    {
      title: 'Automotive',
      description: 'Precision tools and parts for automotive repair and maintenance shops',
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
      image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&auto=format&fit=crop'
    },
    {
      title: 'Construction',
      description: 'Heavy-duty equipment and safety gear for construction projects',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&auto=format&fit=crop'
    },
    {
      title: 'Oil & Gas',
      description: 'Specialized industrial supplies for energy sector operations',
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop'
    },
    {
      title: 'Electronics',
      description: 'Electronic components and testing equipment for tech industries',
      gradient: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop'
    },
    {
      title: 'Packaging',
      description: 'Industrial packaging materials and machinery for logistics',
      gradient: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
      image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&auto=format&fit=crop'
    },
    {
      title: 'Maintenance',
      description: 'Complete maintenance solutions for facilities and infrastructure',
      gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&auto=format&fit=crop'
    },
    {
      title: 'Power & Energy',
      description: 'Electrical supplies and power distribution equipment',
      gradient: 'linear-gradient(135deg, #eab308 0%, #ca8a04 100%)',
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&auto=format&fit=crop'
    }
  ];

  return (
    <section className="industries-section">
      {/* Animated Background */}
      <div className="industries-bg-overlay"></div>
      <div className="industries-floating-shapes">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
      </div>

      <div className="industries-container">
        {/* Section Header */}
        <div className="industries-header">
          <div className="industries-label">
            <span className="label-bar"></span>
            <span className="label-text">Sector Expertise</span>
            <span className="label-bar"></span>
          </div>
          
          <h2 className="industries-title">
            <span className="title-line">INDUSTRIES</span>
            <span className="title-accent">WE SERVE</span>
          </h2>
          
          <p className="industries-subtitle">
            Delivering specialized solutions across diverse sectors with unmatched industry knowledge and experience
          </p>
        </div>

        {/* Industries Grid */}
        <div className="industries-grid">
          {industries.map((industry, index) => (
            <div 
              key={index} 
              className="industry-card"
              style={{ 
                '--industry-gradient': industry.gradient,
                '--delay': `${index * 0.1}s`
              }}
            >
              {/* Background Image */}
              <div className="industry-bg-image" style={{ backgroundImage: `url(${industry.image})` }}>
                <div className="industry-overlay"></div>
              </div>

              {/* Content */}
              <div className="industry-content">
                <h3 className="industry-title">{industry.title}</h3>
                <p className="industry-description">{industry.description}</p>

                {/* Hover Effect Arrow */}
                <div className="industry-arrow">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H7M17 7V17"/>
                  </svg>
                </div>
              </div>

              {/* Gradient Border */}
              <div className="industry-border"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="industries-cta">
          <div className="cta-content">
            <h3 className="cta-title">Don't See Your Industry?</h3>
            <p className="cta-text">We serve many more sectors. Contact us to discuss your specific requirements.</p>
          </div>
          <a href="/contact" className="cta-button">
            <span>Get In Touch</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default IndustriesWeServe;
