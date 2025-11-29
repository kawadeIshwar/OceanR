import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, Mail, MapPin, Award, Users, Target, Shield, 
  TrendingUp, CheckCircle, Zap, Eye, Heart, Rocket,
  ArrowRight, Sparkles, Factory, Globe, MessageCircle,
  Clock, Star, Headphones
} from 'lucide-react';
import ScrollAnimation from '../components/ScrollAnimation';
import './About.css';

const About = () => {
  const [activeValue, setActiveValue] = useState(0);
  const [isHoveringValues, setIsHoveringValues] = useState(false);
  const [stats, setStats] = useState({
    experience: 0,
    clients: 0,
    products: 0,
    satisfaction: 0
  });

  // Animate stats on mount
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = duration / steps;

    const targetValues = {
      experience: 5,
      clients: 100,
      products: 500,
      satisfaction: 98
    };

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setStats({
        experience: Math.floor(targetValues.experience * progress),
        clients: Math.floor(targetValues.clients * progress),
        products: Math.floor(targetValues.products * progress),
        satisfaction: Math.floor(targetValues.satisfaction * progress)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setStats(targetValues);
      }
    }, increment);

    return () => clearInterval(timer);
  }, []);

  // Auto-rotate values (pause when hovering)
  useEffect(() => {
    if (isHoveringValues) return; // Don't rotate while hovering
    
    const interval = setInterval(() => {
      setActiveValue((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, [isHoveringValues]);

  const coreValues = [
    {
      icon: Award,
      title: 'Quality Excellence',
      description: 'We never compromise on quality and ensure all products meet international standards',
      color: '#3b82f6'
    },
    {
      icon: Users,
      title: 'Customer First',
      description: 'Your satisfaction is our priority, and we go the extra mile to meet your needs',
      color: '#8b5cf6'
    },
    {
      icon: Target,
      title: 'Reliability',
      description: 'Count on us for consistent service and timely delivery of quality products',
      color: '#ec4899'
    },
    {
      icon: Shield,
      title: 'Safety Focus',
      description: 'We prioritize workplace safety with comprehensive PPE and safety equipment',
      color: '#10b981'
    }
  ];

  return (
    <div className="about-page">
      {/* Decorative Background */}
      <div className="about-bg-overlay"></div>
      <div className="about-bg-pattern"></div>
      <div className="about-accent-line"></div>

      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-container">
          <div className="hero-badge">
            <Sparkles size={16} />
            <span>Your Industrial Partner Since 2020</span>
          </div>
          
          <h1 className="hero-title">
            <span className="title-line">ABOUT</span>
            <span className="title-gradient">OCEANR</span>
          </h1>
          
          <p className="hero-subtitle">
            Empowering industries with world-class equipment, uncompromising quality,
            and unwavering commitment to excellence.
          </p>

          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">{stats.experience}+</div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">{stats.clients}+</div>
              <div className="stat-label">Happy Clients</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">{stats.products}+</div>
              <div className="stat-label">Products</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">{stats.satisfaction}%</div>
              <div className="stat-label">Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="story-section">
        <div className="story-container">
          <div className="story-content">
            <div className="section-label">
              <span className="label-bar"></span>
              <span className="label-text">Our Journey</span>
              <span className="label-bar"></span>
            </div>

            <h2 className="section-title">
              <span className="title-main">THE </span>
              <span className="title-accent">STORY</span>
            </h2>

            <div className="story-text">
              <p className="story-paragraph">
                At <strong>OCEANR Enterprises</strong>, we are dedicated to providing high-quality industrial supplies, 
                maintenance equipment, and safety solutions to businesses across various sectors. With years of 
                experience and a commitment to excellence, we have become a trusted partner for companies seeking 
                reliable products and exceptional service.
              </p>
              <p className="story-paragraph">
                Our extensive product range includes maintenance materials, electrical and electronic components, 
                PPE kits, safety equipment, hand tools, power tools, measuring instruments, and general industrial 
                supplies. We pride ourselves on delivering quality products that meet international standards and 
                exceed customer expectations.
              </p>
              <p className="story-paragraph highlight">
                We understand the critical importance of quality and reliability in industrial operations. 
                That's why we carefully select our products from reputable manufacturers and maintain rigorous 
                quality control standards.
              </p>
            </div>
          </div>

          <div className="story-visual">
            <div className="visual-card card-1">
              <Factory size={48} />
              <h3>Industrial Excellence</h3>
              <p>Serving diverse industries with precision</p>
            </div>
            <div className="visual-card card-2">
              <Globe size={48} />
              <h3>Global Standards</h3>
              <p>International quality certifications</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-vision-section">
        <div className="mission-vision-container">
          <div className="mission-card">
            <div className="card-icon">
              <Rocket size={40} />
            </div>
            <h3 className="card-title">Our Mission</h3>
            <p className="card-text">
              To empower businesses with world-class industrial solutions, ensuring safety, efficiency, 
              and excellence in every operation. We strive to be the most trusted partner in industrial supplies.
            </p>
            <div className="card-glow"></div>
          </div>

          <div className="vision-card">
            <div className="card-icon">
              <Eye size={40} />
            </div>
            <h3 className="card-title">Our Vision</h3>
            <p className="card-text">
              To be the leading provider of industrial equipment in India, recognized for our unwavering 
              commitment to quality, innovation, and customer satisfaction across all sectors.
            </p>
            <div className="card-glow"></div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="values-section">
        <div className="values-container">
          <div className="section-label">
            <span className="label-bar"></span>
            <span className="label-text">What Drives Us</span>
            <span className="label-bar"></span>
          </div>

          <h2 className="section-title">
            <span className="title-main">CORE </span>
            <span className="title-accent">VALUES</span>
          </h2>

          <div className="values-grid">
            {coreValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <div 
                  key={index}
                  className={`value-card ${activeValue === index ? 'active' : ''}`}
                  onMouseEnter={() => {
                    setIsHoveringValues(true);
                    setActiveValue(index);
                  }}
                  onMouseLeave={() => {
                    setIsHoveringValues(false);
                  }}
                >
                  <div className="value-icon" style={{ '--icon-color': value.color }}>
                    <Icon size={36} />
                  </div>
                  <h3 className="value-title">{value.title}</h3>
                  <p className="value-description">{value.description}</p>
                  <div className="value-shine"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="about-why-choose-section">
        <div className="about-why-choose-container">
          <div className="about-why-choose-content">
            <h2 className="section-title">
              <span className="title-main">WHY CHOOSE </span>
              <span className="title-accent">US</span>
            </h2>

            <div className="reasons-list">
              <div className="reason-item">
                <div className="reason-icon">
                  <CheckCircle size={24} />
                </div>
                <div className="reason-text">
                  <h4>Quality Assurance</h4>
                  <p>Every product undergoes rigorous quality checks before delivery</p>
                </div>
              </div>

              <div className="reason-item">
                <div className="reason-icon">
                  <CheckCircle size={24} />
                </div>
                <div className="reason-text">
                  <h4>Competitive Pricing</h4>
                  <p>Best value for money without compromising on quality</p>
                </div>
              </div>

              <div className="reason-item">
                <div className="reason-icon">
                  <CheckCircle size={24} />
                </div>
                <div className="reason-text">
                  <h4>Timely Delivery</h4>
                  <p>Fast and reliable delivery across all locations</p>
                </div>
              </div>

              <div className="reason-item">
                <div className="reason-icon">
                  <CheckCircle size={24} />
                </div>
                <div className="reason-text">
                  <h4>Expert Support</h4>
                  <p>Dedicated team to assist with product selection and queries</p>
                </div>
              </div>

              <div className="reason-item">
                <div className="reason-icon">
                  <CheckCircle size={24} />
                </div>
                <div className="reason-text">
                  <h4>Wide Product Range</h4>
                  <p>Comprehensive catalog covering all industrial needs</p>
                </div>
              </div>

              <div className="reason-item">
                <div className="reason-icon">
                  <CheckCircle size={24} />
                </div>
                <div className="reason-text">
                  <h4>Certified Products</h4>
                  <p>All products meet international quality and safety standards</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section - Redesigned */}
      <section className="contact-cta-section">
        {/* Floating Particles */}
        <div className="cta-particle particle-1"></div>
        <div className="cta-particle particle-2"></div>
        <div className="cta-particle particle-3"></div>
        <div className="cta-particle particle-4"></div>

        <div className="contact-cta-container">
          {/* Main CTA Content - Centered */}
          <div className="cta-main">
            <div className="cta-badge-wrapper">
              <div className="cta-badge">
                <Sparkles size={16} />
                <span>Let's Work Together</span>
              </div>
            </div>

            <h2 className="cta-title">
              Ready to <span className="gradient-text">Transform</span>
              <br />
              Your Operations?
            </h2>

            <p className="cta-subtitle">
              Partner with OCEANR Enterprises for reliable industrial solutions.
              <br />
              Get in touch with us today and experience excellence!
            </p>

            {/* Quick Features */}
            <div className="cta-features">
              <div className="cta-feature">
                <div className="feature-icon">
                  <Clock size={20} />
                </div>
                <span>24/7 Support</span>
              </div>
              <div className="cta-feature">
                <div className="feature-icon">
                  <Star size={20} />
                </div>
                <span>Quality Assured</span>
              </div>
              <div className="cta-feature">
                <div className="feature-icon">
                  <Zap size={20} />
                </div>
                <span>Fast Delivery</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="cta-buttons">
              <Link to="/contact" className="cta-btn primary">
                <MessageCircle size={20} />
                <span>Start Conversation</span>
                <div className="btn-shine"></div>
              </Link>
              <Link to="/products" className="cta-btn secondary">
                <span>Explore Products</span>
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>

          {/* Contact Information Cards */}
          <div className="contact-info-grid">
            {/* Call Us Card */}
            <a href="tel:+919766652205" className="info-card call-card">
              <div className="info-card-icon">
                <Phone size={28} />
              </div>
              <div className="info-card-content">
                <h4>Call Us</h4>
                <p className="info-highlight">+91 9766652205</p>
                <span className="info-subtitle">Mon-Sat, 9 AM - 6 PM</span>
              </div>
              <div className="card-arrow">
                <ArrowRight size={20} />
              </div>
            </a>

            {/* Email Card */}
            <a href="mailto:oceanrenterprises@gmail.com" className="info-card email-card">
              <div className="info-card-icon">
                <Mail size={28} />
              </div>
              <div className="info-card-content">
                <h4>Email Us</h4>
                <p className="info-highlight">oceanrenterprises@gmail.com</p>
                <span className="info-subtitle">Get response in 24 hours</span>
              </div>
              <div className="card-arrow">
                <ArrowRight size={20} />
              </div>
            </a>

            {/* Location Card */}
            <div className="info-card location-card">
              <div className="info-card-icon">
                <MapPin size={28} />
              </div>
              <div className="info-card-content">
                <h4>Visit Us</h4>
                <p className="info-highlight">Pune, Maharashtra</p>
                <span className="info-subtitle">India</span>
              </div>
              <div className="card-badge">GSTIN: 27AABFO9331N1ZC</div>
            </div>

            {/* Contact Person Card */}
            <div className="info-card person-card">
              <div className="info-card-icon">
                <Headphones size={28} />
              </div>
              <div className="info-card-content">
                <h4>Contact Person</h4>
                <p className="info-highlight">MR. Aryan Bhosale</p>
                <span className="info-subtitle">Business Manager</span>
              </div>
              <div className="card-status">
                <div className="status-dot"></div>
                <span>Available</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
