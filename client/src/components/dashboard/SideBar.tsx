import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  LogOut,
  PenSquareIcon,
  Send,
} from "lucide-react";
import { useAppSelector } from "../../hooks/useTypedHooks";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { pathname } = useLocation();
  const { user } = useAppSelector((state) => state.auth);

  const investorLinks = [
    {
      label: "Dashboard",
      path: "/dashboard/investor",
      icon: <LayoutDashboard />,
    },
    {
      label: "Profile",
      path: "/dashboard/investor/profile",
      icon: <PenSquareIcon />,
    },
    {
      label: "Entrepreneurs",
      path: "/dashboard/investor/entrepreneurs",
      icon: <Users />,
    },
    {
      label: "My Requests",
      path: "/dashboard/investor/requests",
      icon: <Send />,
    },
    { label: "Logout", path: "/", icon: <LogOut /> },
  ];

  const entrepreneurLinks = [
    {
      label: "Dashboard",
      path: "/dashboard/entrepreneur",
      icon: <LayoutDashboard />,
    },
    {
      label: "Profile",
      path: "/dashboard/entrepreneur/profile",
      icon: <PenSquareIcon />,
    },
    {
      label: "Investors",
      path: "/dashboard/entrepreneur/investors",
      icon: <Users />,
    },
    {
      label: "Collab Requests",
      path: "/dashboard/entrepreneur/requests",
      icon: <Send />,
    },
    { label: "Logout", path: "/", icon: <LogOut /> },
  ];

  const links =
    user?.role === "investor"
      ? investorLinks
      : user?.role === "entrepreneur"
      ? entrepreneurLinks
      : [];

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0  bg-opacity-50 z-40 transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={`fixed z-50 top-0 left-0 h-full w-64 bg-white shadow-md transform transition-transform duration-300
        ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0`}
      >
        <div className="p-6 font-bold text-blue-600 text-xl border-b border-gray-100">
          Business Nexus
        </div>
        <nav className="p-4 space-y-2">
          {links.length > 0 ? (
            links.map((link, index) => (
              <Link
                to={link.path}
                key={index}
                onClick={onClose} // Close sidebar on mobile
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                  pathname === link.path
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            ))
          ) : (
            <div className="text-gray-500 text-sm">No role assigned</div>
          )}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
