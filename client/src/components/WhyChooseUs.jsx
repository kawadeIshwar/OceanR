import { Award, Users, Package, Headphones, ShieldCheck, TrendingUp } from 'lucide-react';
import './WhyChooseUs.css';

const WhyChooseUs = () => {
  const features = [
    {
      icon: <Award size={40} strokeWidth={1.5} />,
      title: '5+ Years Experience',
      description: 'Proven track record in industrial supply with deep market understanding and reliability.',
      color: '#3b82f6'
    },
    {
      icon: <Users size={40} strokeWidth={1.5} />,
      title: 'Industry Expertise',
      description: 'Specialized knowledge across multiple sectors with expert consultation available.',
      color: '#8b5cf6'
    },
    {
      icon: <Package size={40} strokeWidth={1.5} />,
      title: 'Custom Solutions',
      description: 'Tailored product packages and solutions designed to meet your specific requirements.',
      color: '#ec4899'
    },
    {
      icon: <TrendingUp size={40} strokeWidth={1.5} />,
      title: 'Bulk Order Capabilities',
      description: 'Competitive pricing on large orders with flexible payment terms for businesses.',
      color: '#f59e0b'
    },
    {
      icon: <Headphones size={40} strokeWidth={1.5} />,
      title: 'Technical Support',
      description: '24/7 dedicated technical assistance to help you choose and use the right products.',
      color: '#10b981'
    },
    {
      icon: <ShieldCheck size={40} strokeWidth={1.5} />,
      title: 'Warranty Information',
      description: 'Comprehensive warranty coverage and after-sales service on all products.',
      color: '#06b6d4'
    }
  ];

  return (
    <section className="why-choose-section">
      <div className="why-choose-bg-overlay"></div>
      <div className="why-choose-bg-grid"></div>
      
      <div className="why-choose-container">
        {/* Section Header */}
        <div className="why-choose-header">
          <div className="why-choose-label">
            <span className="label-bar"></span>
            <span className="label-text">Our Advantages</span>
            <span className="label-bar"></span>
          </div>
          
          <h2 className="why-choose-title">
            <span className="title-line">WHY CHOOSE</span>
            <span className="title-accent">OCEANR</span>
          </h2>
          
          <p className="why-choose-subtitle">
            We deliver excellence through experience, expertise, and unwavering commitment to your success
          </p>
        </div>

        {/* Features Grid */}
        <div className="why-features-grid">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="why-feature-card"
              style={{ '--feature-color': feature.color }}
            >
              {/* Card Background Elements */}
              <div className="feature-card-bg"></div>
              <div className="feature-card-shine"></div>
              
              {/* Icon Container */}
              <div className="feature-icon-container">
                <div className="feature-icon-glow"></div>
                <div className="feature-icon-wrapper">
                  {feature.icon}
                </div>
              </div>

              {/* Content */}
              <div className="feature-content">
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>

              {/* Decorative Number */}
              <div className="feature-number">0{index + 1}</div>
              
              {/* Hover Border Effect */}
              <div className="feature-border-effect"></div>
            </div>
          ))}
        </div>

        {/* Bottom Stats Bar */}
        <div className="why-stats-bar">
          <div className="stat-item">
            <div className="stat-value">500+</div>
            <div className="stat-label">Products</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-value">100%</div>
            <div className="stat-label">Quality Assured</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-value">24/7</div>
            <div className="stat-label">Support</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-value">Fast</div>
            <div className="stat-label">Delivery</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
