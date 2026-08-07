import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import logo from "../assets/logo.jpeg";

import {
  FiAward,
  FiHeart,
  FiShield,
  FiTruck,
} from "react-icons/fi";

const About = () => {
  return (
    <>
      <Navbar />

      <div className="bg-[#FFF8F0]">

        {/* Hero Section */}

        <section className="bg-gradient-to-r from-[#8B1E3F] to-[#6F1732] text-white py-24">

          <div className="max-w-7xl mx-auto px-6 text-center">

            <img
              src={logo}
              alt="Vaidarbhi Sarees"
              className="w-44 mx-auto mb-8 rounded-full shadow-2xl"
            />

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About Vaidarbhi Sarees
            </h1>

            <p className="text-xl max-w-3xl mx-auto leading-8 text-gray-200">
              Where Tradition Meets Elegance.
              Every saree reflects India's rich heritage,
              exceptional craftsmanship,
              and timeless beauty.
            </p>

          </div>

        </section>

        {/* Brand Identity */}

        <section className="py-20 bg-white">

          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

            <div className="flex justify-center">

              <div className=" rounded-3xl p-8 shadow-2xl">

                <img
                  src={logo}
                  alt="Vaidarbhi Logo"
                  className="w-full max-w-sm"
                />

              </div>

            </div>

            <div>

              <h2 className="text-4xl font-bold text-[#8B1E3F] mb-6">
                Our Identity
              </h2>

              <p className="text-gray-700 leading-8 mb-5">
                Vaidarbhi Sarees is more than just a fashion brand.
                It is a celebration of India's timeless weaving traditions,
                handcrafted artistry,
                and feminine elegance.
              </p>

              <p className="text-gray-700 leading-8 mb-5">
                Our logo symbolizes grace,
                confidence,
                and tradition.
                The golden silhouette represents every woman who carries
                heritage with pride,
                while the floral design reflects beauty,
                prosperity,
                and growth.
              </p>

              <p className="text-gray-700 leading-8">
                We carefully curate premium sarees that combine
                authentic craftsmanship with contemporary fashion,
                ensuring elegance for every occasion.
              </p>

            </div>

          </div>

        </section>

        {/* Our Story */}

        <section className="py-20">

          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

            <div>

              <h2 className="text-4xl font-bold text-[#8B1E3F] mb-6">
                Our Story
              </h2>

              <p className="text-gray-700 leading-8 mb-5">
                Every saree tells a story.
                At Vaidarbhi Sarees,
                we believe traditional Indian textiles deserve to be
                celebrated across generations.
              </p>

              <p className="text-gray-700 leading-8 mb-5">
                Our collection includes Banarasi Silk,
                Kanjivaram,
                Paithani,
                Chanderi,
                Organza,
                Linen,
                Cotton,
                Tissue,
                and designer sarees selected from skilled artisans
                throughout India.
              </p>

              <p className="text-gray-700 leading-8">
                Whether you're dressing for a wedding,
                festive celebration,
                office event,
                or family gathering,
                our sarees bring elegance,
                confidence,
                and sophistication.
              </p>

            </div>

            <div className="flex justify-center">

              <img
                src={logo}
                alt="Vaidarbhi"
                className="w-96 rounded-3xl shadow-2xl p-8"
              />

            </div>

          </div>

        </section>

        {/* Why Choose Us */}

        <section className="bg-white py-20">

          <div className="max-w-7xl mx-auto px-6">

            <h2 className="text-4xl font-bold text-center text-[#8B1E3F] mb-14">
              Why Choose Us
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

              <div className="bg-[#FFF8F0] rounded-3xl shadow-lg p-8 text-center">

                <FiAward className="mx-auto text-5xl text-[#C9A227]" />

                <h3 className="text-2xl font-bold mt-5">
                  Premium Quality
                </h3>

                <p className="mt-4 text-gray-600">
                  Finest fabrics with exceptional craftsmanship.
                </p>

              </div>

              <div className="bg-[#FFF8F0] rounded-3xl shadow-lg p-8 text-center">

                <FiHeart className="mx-auto text-5xl text-[#C9A227]" />

                <h3 className="text-2xl font-bold mt-5">
                  Authentic Designs
                </h3>

                <p className="mt-4 text-gray-600">
                  Inspired by India's centuries-old weaving traditions.
                </p>

              </div>

              <div className="bg-[#FFF8F0] rounded-3xl shadow-lg p-8 text-center">

                <FiTruck className="mx-auto text-5xl text-[#C9A227]" />

                <h3 className="text-2xl font-bold mt-5">
                  Fast Delivery
                </h3>

                <p className="mt-4 text-gray-600">
                  Secure packaging with reliable shipping across India.
                </p>

              </div>

              <div className="bg-[#FFF8F0] rounded-3xl shadow-lg p-8 text-center">

                <FiShield className="mx-auto text-5xl text-[#C9A227]" />

                <h3 className="text-2xl font-bold mt-5">
                  Trusted Shopping
                </h3>

                <p className="mt-4 text-gray-600">
                  Genuine products,
                  secure checkout,
                  and dedicated customer support.
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* Our Values */}

        <section className="py-20">

          <div className="max-w-7xl mx-auto px-6">

            <h2 className="text-4xl font-bold text-center text-[#8B1E3F] mb-14">
              Our Values
            </h2>

            <div className="grid md:grid-cols-3 gap-8">

              <div className="bg-white rounded-3xl shadow-lg p-8">

                <h3 className="text-2xl font-bold text-[#8B1E3F] mb-4">
                  Heritage
                </h3>

                <p className="text-gray-600 leading-7">
                  We preserve India's weaving traditions and celebrate
                  authentic craftsmanship.
                </p>

              </div>

              <div className="bg-white rounded-3xl shadow-lg p-8">

                <h3 className="text-2xl font-bold text-[#8B1E3F] mb-4">
                  Quality
                </h3>

                <p className="text-gray-600 leading-7">
                  Every saree is carefully inspected before reaching
                  your wardrobe.
                </p>

              </div>

              <div className="bg-white rounded-3xl shadow-lg p-8">

                <h3 className="text-2xl font-bold text-[#8B1E3F] mb-4">
                  Trust
                </h3>

                <p className="text-gray-600 leading-7">
                  Honest pricing,
                  customer satisfaction,
                  and reliable service are our highest priorities.
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* Mission */}

        <section className="bg-[#8B1E3F] text-white py-20">

          <div className="max-w-5xl mx-auto px-6 text-center">

            <img
              src={logo}
              alt="Logo"
              className="w-28 mx-auto mb-8 rounded-full"
            />

            <h2 className="text-4xl font-bold mb-6">
              Our Mission
            </h2>

            <p className="text-lg leading-8 text-gray-200">
              Our mission is to preserve India's rich textile heritage
              while making premium ethnic fashion accessible to women
              everywhere. We aspire to blend tradition with contemporary
              elegance so every woman feels confident,
              graceful,
              and connected to her cultural roots.
            </p>

          </div>

        </section>

      </div>

      <Footer />
    </>
  );
};

export default About;