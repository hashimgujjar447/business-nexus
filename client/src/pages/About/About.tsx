const About = () => {
  return (
    <div className="container mx-auto px-4 py-5 sm:py-16 max-w-4xl text-center space-y-5 sm:space-y-10">
      <h1 className="text-2xl sm:text-4xl font-bold text-blue-700">
        About Business Nexus
      </h1>

      <p className="text-gray-700 text-lg leading-relaxed">
        Business Nexus is a dynamic platform that bridges the gap between
        passionate entrepreneurs and visionary investors. Our goal is to foster
        innovation, growth, and impactful collaborations by providing a
        streamlined space to connect, communicate, and grow startups into
        successful ventures.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
        <div className="p-6 rounded-xl shadow-md bg-white border">
          <h3 className="text-xl font-semibold text-blue-600 mb-2">
            Our Mission
          </h3>
          <p className="text-gray-600">
            Empower startups with the right resources, funding, and mentorship
            by connecting them with strategic investors.
          </p>
        </div>

        <div className="p-6 rounded-xl shadow-md bg-white border">
          <h3 className="text-xl font-semibold text-blue-600 mb-2">
            Our Vision
          </h3>
          <p className="text-gray-600">
            Become the most trusted platform where innovation meets investment.
          </p>
        </div>

        <div className="p-6 rounded-xl shadow-md bg-white border">
          <h3 className="text-xl font-semibold text-blue-600 mb-2">
            Who We Serve
          </h3>
          <p className="text-gray-600">
            Entrepreneurs with big ideas and investors looking to be part of the
            next big success story.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
