import { FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/useTypedHooks";

const Topbar = () => {
  const { user } = useAppSelector((state) => state.auth);

  const userData = {
    name: user?.name || "M Hashim",
    email: user?.email || "hashimgujjar447@gmail.com",
    avatar:
      user?.avatar ||
      "https://ui-avatars.com/api/?name=M+Hashim&background=0D8ABC&color=fff",
  };

  return (
    <header className="bg-white px-3 sm:px-6 py-4 sm:border-b shadow-lg flex items-center justify-between">
      {/* Logo / Title */}
      <h1 className="text-[12px] sm:text-2xl font-bold text-blue-600">
        Business Nexus Chat
      </h1>

      {/* User Section */}
      <div className="relative group flex items-center gap-2 sm:gap-3 cursor-pointer">
        <img
          src={userData.avatar}
          alt={userData.name}
          className="sm:w-10 sm:h-10 w-6 h-6 rounded-full border object-cover"
        />
        <span className="text-sm text-gray-700 font-medium">
          {userData.name}
        </span>
        <FaChevronDown className="text-gray-500 mt-0.5" />

        {/* Dropdown */}
        <div className="absolute top-full right-0 mt-2 bg-white border rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-200 z-20 w-48">
          <Link
            to={`/dashboard/${user?.role}/profile`}
            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            View Profile
          </Link>
          <Link
            to="/"
            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Logout
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
