import { Rocket, Users, MessageSquareText, ShieldCheck } from "lucide-react";
import QNA from "../../components/HomeSections/QNA";

const Home = () => {
  return (
    <main className="bg-[#F9FAFB]  text-gray-900">
      {/* Hero Section */}
      <section className="container mx-auto px-3 sm:px-6 py-5 sm:py-20 flex flex-col-reverse lg:flex-row items-center gap-12">
        <div className="lg:w-1/2">
          <h1 className=" text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6 text-gray-900">
            Empowering <span className="text-blue-600">Entrepreneurs</span> &
            Connecting with <span className="text-amber-500">Investors</span>
          </h1>
          <p className="text-[14px] sm:text-lg text-gray-600 mb-3 sm:mb-8">
            Business Nexus helps startups and investors build meaningful
            collaborations with real-time communication and smart matchmaking.
          </p>
          <div className="flex gap-2  sm:justify-start sm:gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-[12px] sm:text-lg px-3 sm:px-6 py-3 rounded-xl">
              Join as Investor
            </button>
            <button className="text-blue-600 border border-blue-600 hover:bg-blue-50 text-[12px] sm:text-lg px-3 sm:px-6 py-3 rounded-xl">
              Join as Entrepreneur
            </button>
          </div>
        </div>
        <div className="lg:w-1/2">
          <img
            src="/hero-illustration.svg"
            alt="Business Networking"
            className="w-full max-w-lg mx-auto"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-5 sm:py-20 ">
        <div className="container mx-auto px-3 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold sm:text-center text-gray-900 mb-5 sm:mb-12">
            Why Business Nexus?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Users className="text-blue-600 w-8 h-8" />}
              title="Smart Matchmaking"
              desc="Connect with relevant profiles based on skills, domain, and goals."
            />
            <FeatureCard
              icon={<MessageSquareText className="text-amber-500 w-8 h-8" />}
              title="Real-time Chat"
              desc="Communicate instantly after collaboration acceptance."
            />
            <FeatureCard
              icon={<Rocket className="text-emerald-500 w-8 h-8" />}
              title="Startup Growth"
              desc="Accelerate your journey with right investments and exposure."
            />
            <FeatureCard
              icon={<ShieldCheck className="text-purple-600 w-8 h-8" />}
              title="Secure & Verified"
              desc="All users are verified and monitored to maintain platform trust."
            />
          </div>
        </div>
      </section>

      {/* most ask question */}

      <section className="py-5 sm:py-20 ">
        <QNA />
      </section>

      {/* Call To Action */}
      <section className="bg-blue-600 py-5 sm:py-20 ">
        <div className="container mx-auto px-3 sm:px-6 text-white text-center">
          <h3 className="text-xl sm:text-3xl font-bold mb-4">
            Ready to Build Something Big?
          </h3>
          <p className="text-sm sm:text-lg mb-3 sm:mb-6">
            Whether you're looking to fund or get funded — join our growing
            community today.
          </p>
          <button className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-3 sm:px-6 py-2 sm:py-3 rounded-xl">
            Get Started Now
          </button>
        </div>
      </section>
    </main>
  );
};

type FeatureProps = {
  icon: React.ReactNode;
  title: string;
  desc: string;
};

const FeatureCard = ({ icon, title, desc }: FeatureProps) => (
  <div className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-md transition">
    <div className="mb-4">{icon}</div>
    <h4 className="text-lg font-semibold text-gray-900 mb-2">{title}</h4>
    <p className="text-gray-600">{desc}</p>
  </div>
);

export default Home;
