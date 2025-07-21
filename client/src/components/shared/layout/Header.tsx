import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

import { logout } from "../../../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/useTypedHooks";
import { logoutUser } from "../../../api/auth.api";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Business Nexus
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:text-blue-600 transition">
            Home
          </Link>
          <Link to="/about" className="hover:text-blue-600 transition">
            About
          </Link>
          <Link to="/contact" className="hover:text-blue-600 transition">
            Contact
          </Link>

          {!user ? (
            <>
              <button
                onClick={() => navigate("/register")}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm"
              >
                Join as Investor
              </button>
              <button
                onClick={() => navigate("/register")}
                className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50 transition text-sm"
              >
                Join as Entrepreneur
              </button>
            </>
          ) : (
            <>
              <Link
                to={`/dashboard/${user?.role}`}
                className="hover:text-blue-600"
              >
                Dashboard
              </Link>
              <Link
                to={`/profile/${user?.role}/${user?._id}`}
                className="hover:text-blue-600"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="text-white p-1 px-3 rounded-lg bg-red-600 hover:bg-red-700 transition text-sm"
              >
                Logout
              </button>
            </>
          )}
        </nav>

        {/* Mobile Menu Icon */}
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden  text-gray-700"
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Slide-in Mobile Navigation from Right */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-3/4 max-w-xs bg-white shadow-lg px-6 py-6 z-40 transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="menu"
      >
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-bold text-blue-600">Menu</span>
          <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
            <X size={24} />
          </button>
        </div>

        <nav className="flex flex-col gap-4">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="text-gray-700 hover:text-blue-600"
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={() => setMenuOpen(false)}
            className="text-gray-700 hover:text-blue-600"
          >
            About
          </Link>
          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="text-gray-700 hover:text-blue-600"
          >
            Contact
          </Link>

          {!user ? (
            <>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/register");
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
              >
                Join as Investor
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/register");
                }}
                className="w-full text-blue-600 border border-blue-600 hover:bg-blue-50 px-4 py-2 rounded text-sm"
              >
                Join as Entrepreneur
              </button>
            </>
          ) : (
            <>
              <Link
                to={`/dashboard/${user?.role}`}
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 hover:text-blue-600"
              >
                Dashboard
              </Link>
              <Link
                to={`/profile/${user?.role}/${user?._id}`}
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 hover:text-blue-600"
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="text-white rounded-lg py-1 bg-red-500 hover:bg-red-600 transition text-sm px-3"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
