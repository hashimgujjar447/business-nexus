import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

const InvestorDashboard = () => {
  const { name, email } = useSelector((state: RootState) => state.user);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-600 text-white p-6 hidden sm:block">
        <h2 className="text-xl font-bold mb-6">Investor Panel</h2>
        <nav className="space-y-4">
          <a href="#" className="block hover:text-indigo-200">
            Dashboard
          </a>
          <a href="#" className="block hover:text-indigo-200">
            My Profile
          </a>
          <a href="#" className="block hover:text-indigo-200">
            Browse Entrepreneurs
          </a>
          <a href="#" className="block hover:text-indigo-200">
            Sent Requests
          </a>
          <a href="#" className="block hover:text-indigo-200">
            Settings
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-6">
        {/* Topbar */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Welcome 👋</h1>
        </header>

        {/* User Info */}
        <section className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold text-indigo-600">Your Info</h2>
          <p className="mt-2 text-gray-700">
            <strong>Name:</strong> {name}
          </p>
          <p className="text-gray-700">
            <strong>Email:</strong> {email}
          </p>

          {/* CTA */}
          <div className="mt-6">
            <button className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700">
              Explore Entrepreneur Ideas
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default InvestorDashboard;
