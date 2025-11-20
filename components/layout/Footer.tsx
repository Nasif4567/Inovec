import React from "react";
import Image from "next/image";
import Logo from "../../public/resources/logo.png";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
                  <Image src={Logo} alt="INOVEC" width={40} height={40} />
              <span className="font-display text-xl font-bold bronze-gradient">NAK</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Your dedicated partner for lighting, automation, HVAC, controls, and air filtration solutions in Qatar.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/products" className="hover:text-yellow-400 transition-colors">Products</a>
              </li>
              <li>
                <a href="/about" className="hover:text-yellow-400 transition-colors">About Us</a>
              </li>
              <li>
                <a href="/contact" className="hover:text-yellow-400 transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Lighting Solutions</li>
              <li>HVAC Controls</li>
              <li>Building Automation</li>
              <li>Emergency Systems</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
            <div className="space-y-2 text-gray-400">
              <p>Qatar, Doha</p>
              <p>+974 1234 5678</p>
              <p>info@NAK.qa</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 INOVEC Trading Qatar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
