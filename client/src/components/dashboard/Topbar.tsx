import { useAppSelector } from "../../hooks/useTypedHooks";

const Topbar = () => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <header className="bg-white shadow px-6 py-4 hidden md:flex items-center justify-between">
      <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>

      {/* User Profile Info */}
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-medium text-gray-800">{user?.name}</p>
          <p className="text-xs text-gray-500">{user?.role}</p>
        </div>
        <img
          src={user?.avatar || "https://i.pravatar.cc/40"}
          alt="avatar"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </header>
  );
};

export default Topbar;
