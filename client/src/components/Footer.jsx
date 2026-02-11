import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#0f172a] text-white overflow-hidden">

      {/* Soft Glow Background */}
      <div className="absolute w-96 h-96 bg-blue-600/10 blur-3xl rounded-full -top-32 -left-32"></div>
      <div className="absolute w-96 h-96 bg-indigo-600/10 blur-3xl rounded-full -bottom-32 -right-32"></div>

      <div className="container mx-auto px-6 py-14 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-[1400px] mx-auto lg:ml-16">

          {/* Company Info */}
          <div>
            <div className="flex items-center gap-4 mb-6">

              {/* Gradient Logo Background */}
              <div className="bg-gradient-to-br from-white to-gray-300 p-3 rounded-2xl shadow-lg">
                <img
                  src="/oceanr logo.png"
                  alt="OceanR Enterprises Logo"
                  className="h-12 w-auto"
                />
              </div>

              {/* Attractive Brand Name */}
              <h3 className="text-2xl font-extrabold tracking-wide">
                <span className="text-white">OCEAN</span>
                <span className="text-blue-500">R</span>
                <span className="block text-sm font-semibold text-gray-400 tracking-wider">
                  ENTERPRISES
                </span>
              </h3>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed">
              Your trusted partner for industrial supplies, maintenance
              equipment, and safety solutions — delivering reliability,
              efficiency, and excellence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-5 border-b border-white/10 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { name: "Home", path: "/" },
                { name: "Products", path: "/products" },
                { name: "About Us", path: "/about" },
                { name: "Contact", path: "/contact" },
                { name: "Admin Login", path: "/admin/login" },
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-5 border-b border-white/10 pb-2">
              Contact Us
            </h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex items-center gap-3 hover:text-blue-400 transition">
                <Phone size={18} />
                +91 7620980794
              </li>
              <li className="flex items-center gap-3 hover:text-blue-400 transition">
                <Mail size={18} />
                oceanrenterprises@gmail.com
              </li>
              <li className="flex items-center gap-3 hover:text-blue-400 transition">
                <MapPin size={18} />
                Pune, Maharashtra, India
              </li>
            </ul>
          </div>

          {/* Business Info */}
          <div>
            <h4 className="text-lg font-bold mb-5 border-b border-white/10 pb-2">
              Business Info
            </h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>
                <span className="text-white font-semibold">
                  Contact Person:
                </span>
                <br />
                Mr. Aryan
              </li>
              <li>
                <span className="text-white font-semibold">
                  GSTIN:
                </span>
                <br />
                27AABFO9331N1ZC
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Divider */}
        <div className="border-t border-white/10 mt-12 pt-6 text-center text-gray-500 text-sm max-w-[1400px] mx-auto">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="text-white font-semibold">
              OceanR Enterprises
            </span>
            . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
