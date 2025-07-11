import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

const Header = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.user);

  return (
    <header className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <Link to="/" className="text-indigo-600 font-bold text-xl">
          Business<span className="text-gray-900">Nexus</span>
        </Link>

        {/* Navigation Links */}
        <nav className="space-x-6 text-sm font-medium text-gray-700">
          <Link to="/" className="hover:text-indigo-600">
            Home
          </Link>
          <Link to="/about" className="hover:text-indigo-600">
            About
          </Link>

          {isAuthenticated ? (
            <button className="hover:text-indigo-600">Visit Dashboard</button>
          ) : (
            <>
              <Link to="/login" className="hover:text-indigo-600">
                Login
              </Link>{" "}
              <Link to="/register" className="hover:text-indigo-600">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
