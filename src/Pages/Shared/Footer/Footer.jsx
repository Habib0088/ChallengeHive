import logo from "../../../assets/ChallengeHive.png";
import { FaFacebook, FaLinkedin, FaWhatsapp, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            
            {/* Brand Section */}
            <div className="footer-section animate-slide-in-left lg:col-span-1">
              <div className="flex flex-col items-center md:items-start space-y-4">
                <div className="flex items-center space-x-3 group">
                  <div className="relative">
                    <img 
                      src={logo} 
                      alt="ChallengeHive Logo" 
                      className="h-16 w-16 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 animate-float" 
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      ChallengeHive
                    </h2>
                    <p className="text-gray-400 text-sm">Contest Management Platform</p>
                  </div>
                </div>
                <p className="text-gray-300 text-center md:text-left leading-relaxed">
                  Empowering creativity and innovation through diverse contest categories. 
                  Join our platform to showcase your skills and compete with talented individuals worldwide.
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-section animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-xl font-bold mb-6 text-center md:text-left">Quick Links</h3>
              <ul className="space-y-3">
                {[
                  { to: "/", label: "Home" },
                  { to: "/allContests", label: "All Contests" },
                  { to: "/blog", label: "Blog" },
                  { to: "/aboutUs", label: "About Us" }
                ].map((link) => (
                  <li key={link.to} className="text-center md:text-left">
                    <Link 
                      to={link.to} 
                      className="footer-link text-gray-300 hover:text-blue-400 transition-colors duration-300 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contest Categories */}
            <div className="footer-section animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <h3 className="text-xl font-bold mb-6 text-center md:text-left">Contest Categories</h3>
              <ul className="space-y-3">
                {[
                  "Coding Challenges",
                  "Design Competitions",
                  "Business Case Studies",
                  "Creative Writing",
                  "Photography",
                  "Innovation Contests"
                ].map((category) => (
                  <li key={category} className="text-center md:text-left">
                    <span className="text-gray-300 hover:text-purple-400 transition-colors duration-300 cursor-pointer">
                      {category}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Social */}
            <div className="footer-section animate-slide-in-right">
              <h3 className="text-xl font-bold mb-6 text-center md:text-left">Get In Touch</h3>
              
              {/* Contact Info */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-center md:justify-start space-x-3 group">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <FaWhatsapp className="text-white text-lg" />
                  </div>
                  <a 
                    href="https://wa.me/8801620673080" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-green-400 transition-colors duration-300"
                  >
                    +880 1620 673080
                  </a>
                </div>

                <div className="flex items-center justify-center md:justify-start space-x-3 group">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <FaEnvelope className="text-white text-lg" />
                  </div>
                  <a 
                    href="mailto:contact@challengehive.com" 
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                  >
                    habibur.sarker1010@gmail.com
                  </a>
                </div>

                <div className="flex items-center justify-center md:justify-start space-x-3 group">
                  <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <FaMapMarkerAlt className="text-white text-lg" />
                  </div>
                  <span className="text-gray-300">
                    Dhaka, Bangladesh
                  </span>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h4 className="text-lg font-semibold mb-4 text-center md:text-left">Follow Us</h4>
                <div className="flex justify-center md:justify-start space-x-4">
                  <a 
                    href="https://www.linkedin.com/in/habib-sarker-dev/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-icon w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center hover:from-blue-700 hover:to-blue-800 transition-all duration-300 animate-glow"
                  >
                    <FaLinkedin className="text-white text-xl" />
                  </a>
                  
                  <a 
                    href="https://wa.me/8801620673080" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-icon w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center hover:from-green-600 hover:to-green-700 transition-all duration-300 animate-glow"
                    style={{ animationDelay: '0.2s' }}
                  >
                    <FaWhatsapp className="text-white text-xl" />
                  </a>
                  
                  <a 
                    href="#" 
                    className="social-icon w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center hover:from-blue-600 hover:to-blue-700 transition-all duration-300 animate-glow"
                    style={{ animationDelay: '0.4s' }}
                  >
                    <FaFacebook className="text-white text-xl" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700/50 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Copyright and Developer Credit Row */}
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-center md:text-left">
                <p className="text-gray-400 text-sm">
                  © 2026 <span className="text-blue-400 font-semibold">ChallengeHive</span>. All rights reserved.
                </p>
              </div>
              
              <div className="text-center md:text-right">
                <p className="text-gray-500 text-sm">
                  Crafted with ❤️ by{' '}
                  <a 
                    href="https://www.linkedin.com/in/habib-sarker-dev/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors duration-300 font-medium"
                  >
                    Habib Sarker
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


