import { useState } from "react";
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiInstagram,
  FiFacebook,
} from "react-icons/fi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Thank you! Your message has been sent.");

    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <>
      <Navbar />

      <div className="bg-[#FFF8F0] min-h-screen py-14">

        <div className="max-w-7xl mx-auto px-6">

          <h1 className="text-5xl font-bold text-center text-[#8B1E3F] mb-3">
            Contact Us
          </h1>

          <p className="text-center text-gray-600 mb-14">
            We'd love to hear from you. Feel free to reach out with any questions
            about our sarees or your orders.
          </p>

          <div className="grid lg:grid-cols-2 gap-10">

            {/* Contact Info */}
            <div className="bg-white rounded-3xl shadow-lg p-8">

              <h2 className="text-3xl font-bold text-[#8B1E3F] mb-8">
                Get In Touch
              </h2>

              <div className="space-y-7">

                <div className="flex gap-5">
                  <div className="bg-[#8B1E3F] text-white p-4 rounded-full h-fit">
                    <FiMapPin size={22} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg">
                      Address
                    </h3>

                    <p className="text-gray-600">
                      Vaidarbhi Sarees
                      <br />
                      Amritsar, Punjab
                      <br />
                      India
                    </p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="bg-[#8B1E3F] text-white p-4 rounded-full h-fit">
                    <FiPhone size={22} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg">
                      Phone
                    </h3>

                    <p className="text-gray-600">
                      +91 98765 43210
                    </p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="bg-[#8B1E3F] text-white p-4 rounded-full h-fit">
                    <FiMail size={22} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg">
                      Email
                    </h3>

                    <p className="text-gray-600">
                      support@vaidarbhisarees.com
                    </p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="bg-[#8B1E3F] text-white p-4 rounded-full h-fit">
                    <FiClock size={22} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg">
                      Working Hours
                    </h3>

                    <p className="text-gray-600">
                      Monday - Saturday
                      <br />
                      10:00 AM - 8:00 PM
                    </p>
                  </div>
                </div>

              </div>

              <div className="mt-10">

                <h3 className="font-semibold text-xl mb-4">
                  Follow Us
                </h3>

                <div className="flex gap-5">

                  <a
                    href="#"
                    className="bg-[#8B1E3F] text-white p-3 rounded-full hover:bg-[#701632]"
                  >
                    <FiInstagram size={22} />
                  </a>

                  <a
                    href="#"
                    className="bg-[#8B1E3F] text-white p-3 rounded-full hover:bg-[#701632]"
                  >
                    <FiFacebook size={22} />
                  </a>

                </div>

              </div>

            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-3xl shadow-lg p-8">

              <h2 className="text-3xl font-bold text-[#8B1E3F] mb-8">
                Send a Message
              </h2>

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#8B1E3F]"
                />

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  required
                  className="w-full border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#8B1E3F]"
                />

                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  required
                  className="w-full border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#8B1E3F]"
                />

                <textarea
                  rows="6"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  required
                  className="w-full border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#8B1E3F]"
                />

                <button
                  type="submit"
                  className="w-full bg-[#8B1E3F] text-white py-4 rounded-xl hover:bg-[#701632] transition"
                >
                  Send Message
                </button>

              </form>

            </div>

          </div>

          {/* Google Map */}
          <div className="mt-16 bg-white rounded-3xl shadow-lg overflow-hidden">

            <iframe
              title="Google Map"
              src="https://www.google.com/maps?q=Amritsar,Punjab&output=embed"
              className="w-full h-[450px]"
              loading="lazy"
            ></iframe>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
};

export default Contact;