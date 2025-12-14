import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import FeaturedProducts from '../components/FeaturedProducts';
import WhyChooseUs from '../components/WhyChooseUs';
import IndustriesWeServe from '../components/IndustriesWeServe';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Featured Products Section */}
      <FeaturedProducts />

      {/* Categories Section */}
      <Categories />

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* Industries We Serve Section */}
      <IndustriesWeServe />

      
    
    </div>
  );
};

export default Home;
