import { Phone, Mail, Clock, MapPin } from 'lucide-react';
import './TopBar.css';

const TopBar = () => {
  return (
    <div className="top-bar">
      <div className="top-bar-container">
        {/* Left - Contact Info */}
        <div className="top-bar-left">
          <a href="tel:+917620980794" className="top-bar-item">
            <Phone size={14} strokeWidth={2.5} />
            <span>+91 7620980794</span>
          </a>
          <a href="mailto:oceanrenterprises@gmail.com" className="top-bar-item">
            <Mail size={14} strokeWidth={2.5} />
            <span>oceanrenterprises@gmail.com</span>
          </a>
        </div>

        {/* Right - Additional Info */}
        <div className="top-bar-right">
          <div className="top-bar-item">
            <Clock size={14} strokeWidth={2.5} />
            <span>Mon - Sat: 9:00 AM - 6:00 PM</span>
          </div>
          <div className="top-bar-item">
            <MapPin size={14} strokeWidth={2.5} />
            <span>Pune, Maharashtra</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
