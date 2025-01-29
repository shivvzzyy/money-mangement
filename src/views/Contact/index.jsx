import Navbar from "../../components/Navbar";
import { MapPin, Phone, Send } from "lucide-react";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-40 sm:px-32 md:px-24 py-12 max-w-7xl pt-28">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Get In Touch
          </h1>
          <p className="text-gray-600 max-w-2xl">
            We&apos;d love to hear from you! Whether you have questions, need
            support, or want to learn more about our services, our team is here
            to help.
          </p>
        </div>

        {/* Contact Info Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="flex items-start space-x-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <MapPin className="h-6 w-6 text-blue-700" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Our Address</h3>
              <p className="text-gray-600">
                Near Deopur Circle
                <br />
                Dhule, Maharashtra 424002
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Phone className="h-6 w-6 text-blue-700" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                Our Contact Info
              </h3>
              <p className="text-gray-600">+91 1234567890</p>
              <p className="text-gray-600">help@trackoomy.com</p>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="w-full h-[250px] mb-12 relative rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59797.37644054434!2d74.75627082667!3d20.901632543903387!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdec5f2c571bb47%3A0x5827ae11b9524864!2sDhule%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1706633274022!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          ></iframe>
          <button className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-50 transition-colors">
            Get Directions →
          </button>
        </div>

        {/* Form Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Request a Demo or Ask Queries
          </h2>
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name*
              </label>
              <input
                type="text"
                id="fullName"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your name..."
                required
              />
            </div>
            <div>
              <label
                htmlFor="jobPosition"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Job Position*
              </label>
              <input
                type="text"
                id="jobPosition"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your job position..."
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address*
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email..."
                required
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number*
              </label>
              <input
                type="tel"
                id="phone"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your phone number..."
                required
              />
            </div>
            <div className="md:col-span-2">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Message*
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Write your message here..."
                required
              />
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full md:w-auto px-6 py-3 bg-blue-500 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <Send className="h-5 w-5" />
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
