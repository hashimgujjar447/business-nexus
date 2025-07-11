import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store/store";
import { logoutUser } from "../../api/auth";
import { logout } from "../../redux/slices/userSlice";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const { isAuthenticated, role, name } = useSelector(
    (state: RootState) => state.user,
  );

  const faqs = [
    {
      question: "Is BusinessNexus free?",
      answer:
        "Yes! Basic features are free. We plan to add premium tools later.",
    },
    {
      question: "Can I join from outside Pakistan?",
      answer: "Yes! BusinessNexus is open to users globally.",
    },
  ];

  const handleLogout = async () => {
    try {
      console.log("Logging out user...");
      const res = await logoutUser();
      console.log("Logout response:", res);
      navigate("/", { replace: true });

      dispatch(logout());
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="text-center py-20 min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-indigo-100 to-white">
        <h1 className="text-5xl font-extrabold text-indigo-700 drop-shadow">
          BusinessNexus
        </h1>
        <p className="mt-4 text-lg text-gray-700 max-w-xl">
          A platform that bridges the gap between brilliant entrepreneurs and
          visionary investors. Collaborate, innovate, and grow together.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          {isAuthenticated ? (
            <>
              <Link
                to={`/dashboard/${role}`}
                className="bg-indigo-600 text-white px-6 py-3 rounded shadow hover:bg-indigo-700 transition"
              >
                Visit Dashboard
              </Link>

              <button
                onClick={() => {
                  handleLogout();
                }}
                className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded hover:bg-indigo-50 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/register"
                className="bg-indigo-600 text-white px-6 py-3 rounded shadow hover:bg-indigo-700 transition"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded hover:bg-indigo-50 transition"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16 px-6 bg-white text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              icon: "👤",
              title: "Create Your Profile",
              text: "Sign up as an entrepreneur or investor, complete your profile, and get noticed.",
            },
            {
              icon: "🤝",
              title: "Connect",
              text: "Find and interact with potential investors or innovative startups.",
            },
            {
              icon: "💬",
              title: "Collaborate",
              text: "Share updates, communicate openly, and build successful ventures together.",
            },
          ].map(({ icon, title, text }) => (
            <div
              key={title}
              className="p-6 border rounded-lg shadow hover:shadow-md transition"
            >
              <div className="text-5xl mb-4">{icon}</div>
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Section */}
      <section className="bg-indigo-50 py-16 text-center">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6">
          Why BusinessNexus?
        </h2>
        <p className="max-w-4xl mx-auto text-gray-700 text-lg">
          We empower startups by providing visibility, tools, and strong
          connections. Join a trusted network where your ideas and funds create
          impactful businesses.
        </p>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6 bg-white text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">
          What Our Users Say
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-6 border rounded-lg shadow">
            <p className="text-gray-600 italic">
              "BusinessNexus helped me find the perfect investor who truly
              believes in my vision."
            </p>
            <p className="mt-4 font-semibold text-indigo-700">
              — Aisha Khan, Entrepreneur
            </p>
          </div>
          <div className="p-6 border rounded-lg shadow">
            <p className="text-gray-600 italic">
              "I've found and funded several game-changing startups using this
              platform."
            </p>
            <p className="mt-4 font-semibold text-indigo-700">
              — Bilal Rehman, Investor
            </p>
          </div>
          <div className="p-6 border rounded-lg shadow">
            <p className="text-gray-600 italic">
              "The networking opportunities here are unmatched. It's a real
              community."
            </p>
            <p className="mt-4 font-semibold text-indigo-700">
              — Fatima Zafar, Startup Mentor
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-100 py-16 px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto text-left space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white transition-all duration-300 p-4 rounded shadow cursor-pointer border"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-indigo-700">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <ChevronUp className="text-indigo-700" />
                ) : (
                  <ChevronDown className="text-indigo-700" />
                )}
              </div>
              {openIndex === index && (
                <p className="mt-2 text-gray-700 transition-all duration-300">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-indigo-700 text-white text-center py-16">
        {isAuthenticated ? (
          <>
            <h2 className="text-3xl font-bold">
              Welcome dear {role} {name}
            </h2>
            <p className="mt-4 text-lg">
              Start exploring opportunities and connect with like-minded
              individuals today!
            </p>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold">Ready to Join the Network?</h2>
            <p className="mt-4 text-lg">
              BusinessNexus is your launchpad to growth and innovation.
            </p>
          </>
        )}

        <div className="mt-6 flex justify-center gap-4">
          {isAuthenticated ? (
            <>
              <Link
                to="/register"
                className="bg-white text-indigo-700 px-6 py-3 rounded shadow hover:bg-gray-100 transition"
              >
                Visit Dashboard
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                }}
                className="border border-white px-6 py-3 rounded hover:bg-white hover:text-indigo-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/register"
                className="bg-white text-indigo-700 px-6 py-3 rounded shadow hover:bg-gray-100 transition"
              >
                Register Now
              </Link>
              <Link
                to="/about"
                className="border border-white px-6 py-3 rounded hover:bg-white hover:text-indigo-700 transition"
              >
                Learn More
              </Link>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
