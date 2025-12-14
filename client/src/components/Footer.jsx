import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/oceanr logo.png" 
                alt="OceanR Enterprises Logo" 
                className="h-20 w-auto"
              />
              <h3 className="text-xl font-black text-primary-400">
                OCEANR ENTERPRISES
              </h3>
            </div>
            <p className="text-gray-400 text-sm">
              Your trusted partner for industrial supplies, maintenance equipment, and safety solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-primary-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/admin/login" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-start gap-2">
                <Phone size={18} className="mt-1 flex-shrink-0" />
                <span>+91 7620980794</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={18} className="mt-1 flex-shrink-0" />
                <span>oceanrenterprises@gmail.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span>Pune, Maharashtra, India</span>
              </li>
            </ul>
          </div>

          {/* Business Info */}
          <div>
            <h4 className="text-lg font-bold mb-4">Business Info</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <span className="font-semibold text-white">Contact Person:</span>
                <br />
                MR. Aryan Bhosale
              </li>
              <li>
                <span className="font-semibold text-white">GSTIN:</span>
                <br />
                27AABFO9331N1ZC
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} OceanR Enterprises. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
