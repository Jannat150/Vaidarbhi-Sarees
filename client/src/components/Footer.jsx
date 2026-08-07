import {
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiYoutube,
  FiMail,
  FiPhone,
  FiMapPin,
  FiHeart,
  FiShoppingBag,
} from "react-icons/fi";

import { Link } from "react-router-dom";
import logo from "../assets/logo.jpeg";

const Footer = () => {
  return (
    <footer className="bg-[#1F1F1F] text-white pt-16">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}

          <div>

            <Link to="/" className="inline-block">

              <img
                src={logo}
                alt="Vaidarbhi Sarees"
                className="w-40 rounded-2xl p-2 shadow-lg"
              />

            </Link>

            <p className="mt-6 text-gray-400 leading-7">
              Vaidarbhi Sarees celebrates India's timeless craftsmanship with
              premium sarees designed for weddings, festivals, parties, and
              every special occasion. Experience elegance woven into every
              drape.
            </p>

            <div className="flex gap-4 mt-6">

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-[#2B2B2B] flex items-center justify-center hover:bg-[#C9A227] hover:text-black transition"
              >
                <FiFacebook />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-[#2B2B2B] flex items-center justify-center hover:bg-[#C9A227] hover:text-black transition"
              >
                <FiInstagram />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-[#2B2B2B] flex items-center justify-center hover:bg-[#C9A227] hover:text-black transition"
              >
                <FiTwitter />
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-[#2B2B2B] flex items-center justify-center hover:bg-[#C9A227] hover:text-black transition"
              >
                <FiYoutube />
              </a>

            </div>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="text-xl font-semibold text-[#C9A227] mb-6">
              Quick Links
            </h3>

            <ul className="space-y-4 text-gray-400">

              <li>
                <Link to="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/shop" className="hover:text-white transition">
                  Shop
                </Link>
              </li>

              <li>
                <Link to="/about" className="hover:text-white transition">
                  About Us
                </Link>
              </li>

              <li>
                <Link to="/contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li>

              <li>
                <Link
                  to="/wishlist"
                  className="flex items-center gap-2 hover:text-white transition"
                >
                  <FiHeart />
                  Wishlist
                </Link>
              </li>

              <li>
                <Link
                  to="/myorders"
                  className="flex items-center gap-2 hover:text-white transition"
                >
                  <FiShoppingBag />
                  My Orders
                </Link>
              </li>

            </ul>

          </div>

          {/* Customer Care */}

          <div>

            <h3 className="text-xl font-semibold text-[#C9A227] mb-6">
              Customer Care
            </h3>

            <ul className="space-y-4 text-gray-400">

              <li>
                <Link
                  to="/shipping-policy"
                  className="hover:text-white transition"
                >
                  Shipping Policy
                </Link>
              </li>

              <li>
                <Link
                  to="/return-refund-policy"
                  className="hover:text-white transition"
                >
                  Return & Refund Policy
                </Link>
              </li>

              <li>
                <Link
                  to="/privacy-policy"
                  className="hover:text-white transition"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  to="/terms-and-conditions"
                  className="hover:text-white transition"
                >
                  Terms & Conditions
                </Link>
              </li>

              <li>
                <Link
                  to="/faqs"
                  className="hover:text-white transition"
                >
                  FAQs
                </Link>
              </li>

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-xl font-semibold text-[#C9A227] mb-6">
              Contact Us
            </h3>

            <div className="space-y-5 text-gray-400">

              <div className="flex items-start gap-3">
                <FiMapPin className="mt-1 text-[#C9A227]" />
                <span>
                  Amritsar,
                  <br />
                  Punjab, India
                </span>
              </div>

              <a
                href="tel:+919876543210"
                className="flex items-center gap-3 hover:text-white transition"
              >
                <FiPhone className="text-[#C9A227]" />
                <span>+91 98765 43210</span>
              </a>

              <a
                href="mailto:support@vaidarbhisarees.com"
                className="flex items-center gap-3 hover:text-white transition"
              >
                <FiMail className="text-[#C9A227]" />
                <span>support@vaidarbhisarees.com</span>
              </a>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="border-t border-gray-700 mt-14 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">

          <p>
            © {new Date().getFullYear()} <span className="text-[#C9A227] font-semibold">Vaidarbhi Sarees</span>. All Rights Reserved.
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