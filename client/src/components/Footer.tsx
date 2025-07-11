const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left: Logo or Brand */}
        <div className="text-gray-700 font-semibold">
          © {new Date().getFullYear()} BusinessNexus. All rights reserved.
        </div>

        {/* Center: Links */}
        <div className="flex gap-4 text-sm text-gray-600">
          <a href="/" className="hover:text-indigo-600 transition">
            Home
          </a>
          <a href="/about" className="hover:text-indigo-600 transition">
            About
          </a>
          <a href="/contact" className="hover:text-indigo-600 transition">
            Contact
          </a>
          <a href="/privacy" className="hover:text-indigo-600 transition">
            Privacy Policy
          </a>
        </div>

        {/* Right: Made by */}
        <div className="text-sm text-gray-500">
          Made with 💻 by{" "}
          <span className="text-indigo-600 font-medium">Hashim</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
