import {
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiYoutube,
  FiMail,
  FiPhone,
  FiMapPin,
} from "react-icons/fi";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#2B2B2B] text-white pt-16">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold text-[#C9A227]">
              Vaidarbhi
            </h2>

            <p className="uppercase tracking-[4px] text-sm text-gray-300 mb-5">
              Sarees
            </p>

            <p className="text-gray-400 leading-7">
              Where Tradition Meets Elegance.
              Discover premium sarees crafted with timeless artistry,
              luxurious fabrics, and unmatched elegance for every occasion.
            </p>

            <div className="flex gap-4 mt-6 text-2xl">
              <a href="#" className="hover:text-[#C9A227] transition">
                <FiFacebook />
              </a>

              <a href="#" className="hover:text-[#C9A227] transition">
                <FiInstagram />
              </a>

              <a href="#" className="hover:text-[#C9A227] transition">
                <FiTwitter />
              </a>

              <a href="#" className="hover:text-[#C9A227] transition">
                <FiYoutube />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-5 text-[#C9A227]">
              Quick Links
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li>
                <Link to="/" className="hover:text-white">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/products" className="hover:text-white">
                  Shop
                </Link>
              </li>

              <li>
                <Link to="/collections" className="hover:text-white">
                  Collections
                </Link>
              </li>

              <li>
                <Link to="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>

              <li>
                <Link to="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="text-xl font-semibold mb-5 text-[#C9A227]">
              Customer Care
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li>
                <Link to="/shipping" className="hover:text-white">
                  Shipping Policy
                </Link>
              </li>

              <li>
                <Link to="/returns" className="hover:text-white">
                  Return & Refund
                </Link>
              </li>

              <li>
                <Link to="/privacy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link to="/terms" className="hover:text-white">
                  Terms & Conditions
                </Link>
              </li>

              <li>
                <Link to="/faq" className="hover:text-white">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-5 text-[#C9A227]">
              Contact Us
            </h3>

            <div className="space-y-5 text-gray-400">

              <div className="flex gap-3">
                <FiMapPin className="mt-1 text-[#C9A227]" />
                <p>Amritsar, Punjab, India</p>
              </div>

              <div className="flex gap-3">
                <FiPhone className="mt-1 text-[#C9A227]" />
                <p>+91 98765 43210</p>
              </div>

              <div className="flex gap-3">
                <FiMail className="mt-1 text-[#C9A227]" />
                <p>support@vaidarbhisarees.com</p>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 mt-14 py-6 flex flex-col md:flex-row justify-between items-center text-gray-500">

          <p>
            © {new Date().getFullYear()} Vaidarbhi Sarees. All Rights Reserved.
          </p>

          <p className="mt-3 md:mt-0">
            Crafted with ❤️ in India
          </p>

        </div>

      </div>
    </footer>
  );
};

export default Footer;