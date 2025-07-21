import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 ">
      <div className="container mx-auto px-3 sm:px-6 py-4 sm:py-10 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
        {/* Logo & Description */}
        <div>
          <h2 className="text-xl font-bold text-blue-600">Business Nexus</h2>
          <p className="text-gray-600 mt-1 sm:mt-2">
            Bridging the gap between startups and investors. Join our mission to
            foster innovation and collaboration.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1 sm:mb-3">
            Quick Links
          </h3>
          <ul className="space-y-1 sm:space-y-2 text-gray-600">
            <li>
              <a href="/" className="hover:text-blue-600">
                Home
              </a>
            </li>
            <li>
              <a href="/login" className="hover:text-blue-600">
                Login
              </a>
            </li>
            <li>
              <a href="/register" className="hover:text-blue-600">
                Register
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-blue-600">
                About
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Contact Us
          </h3>
          <ul className="space-y-1 sm:space-y-3 text-gray-600">
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-600" />
              <span>support@businessnexus.com</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-600" />
              <span>+92 300 1234567</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>Lahore, Pakistan</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Business Nexus. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
