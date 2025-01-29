import Navbar from "../../components/Navbar";
import { Users, Target, Award } from "lucide-react";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 sm:px-12 md:px-24 lg:px-40 py-12 max-w-7xl pt-28">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            About Us
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We are a team of passionate individuals dedicated to delivering
            innovative solutions and exceptional service to our clients.
          </p>
        </div>

        {/* Company Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-blue-50 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Our Team</h3>
            <p className="text-gray-600">
              A diverse group of experts committed to excellence in every
              project we undertake.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-blue-50 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Target className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
            <p className="text-gray-600">
              To empower businesses with cutting-edge technology and
              unparalleled support.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-blue-50 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Award className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Our Achievements</h3>
            <p className="text-gray-600">
              Recognized industry leader with multiple awards for innovation and
              client satisfaction.
            </p>
          </div>
        </div>

        {/* Company Story */}
        <div className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 text-center">
            Our Story
          </h2>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <p className="text-gray-600 mb-4">
              Founded in 2010 in Dhule, Maharashtra, our company started with a
              vision to bridge the gap between complex technology and business
              needs. Over the years, we've grown from a small startup to a
              recognized leader in our field, serving clients across India and
              beyond.
            </p>
            <p className="text-gray-600 mb-4">
              Our journey has been marked by continuous innovation, unwavering
              commitment to quality, and a deep understanding of our clients'
              evolving needs. We've weathered challenges, celebrated milestones,
              and consistently pushed the boundaries of what's possible in our
              industry.
            </p>
            <p className="text-gray-600">
              Today, we stand proud as a team of over 100 professionals, each
              bringing unique skills and perspectives to our work. Our success
              is built on the trust of our clients, the dedication of our team,
              and our relentless pursuit of excellence.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 text-center">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              {
                name: "Saurav Patil",
                role: "CEO & Founder",
                image:
                  "https://img.freepik.com/premium-photo/handsome-smiling-indian-man-holding-smart-phone-shopping-online-street_695242-1230.jpg",
              },
              {
                name: "Tejas Patil",
                role: "CTO",
                image:
                  "https://images.bhaskarassets.com/web2images/521/2024/07/24/dhruv-rathee_1721830276.jpg",
              },
              {
                name: "Mitanshu Patil",
                role: "Head of Operations",
                image:
                  "https://www.forbesindia.com/lists/digital-stars/videos/Ashish_Chalchalni_BG.jpg",
              },
            ].map((member, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Ready to Work With Us?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Let's create something amazing together.
          </p>
          <a
            href="/contact"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium inline-block transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </>
  );
};

export default About;
