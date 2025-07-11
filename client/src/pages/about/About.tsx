const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen px-4 py-10 text-gray-800">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-indigo-600 mb-8">
          About BusinessNexus
        </h1>

        <p className="text-lg leading-relaxed text-center mb-10">
          BusinessNexus is a platform that bridges the gap between aspiring
          entrepreneurs and visionary investors. We help dreamers and backers
          find each other to bring great ideas to life.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Our Mission */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
              🎯 Our Mission
            </h2>
            <p className="text-base leading-relaxed">
              Our mission is to empower the next generation of creators and
              innovators by connecting them with the right people and resources
              they need to succeed. Whether you're building a startup or
              investing in one, we're here to make that journey easier.
            </p>
          </div>

          {/* Why BusinessNexus? */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
              💡 Why BusinessNexus?
            </h2>
            <ul className="list-disc list-inside space-y-2 text-base">
              <li>Easy-to-use platform for both entrepreneurs and investors</li>
              <li>Secure login, user management, and role-based access</li>
              <li>Clean, modern UI with full mobile responsiveness</li>
              <li>Fast onboarding and real-time collaboration features</li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-indigo-600 mb-4">
            Ready to start your journey?
          </h3>
          <div className="flex justify-center gap-4">
            <a
              href="/register"
              className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
            >
              Join as Entrepreneur
            </a>
            <a
              href="/register"
              className="bg-emerald-600 text-white px-6 py-2 rounded hover:bg-emerald-700 transition"
            >
              Join as Investor
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
