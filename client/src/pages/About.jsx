import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FiAward, FiHeart, FiShield, FiTruck } from "react-icons/fi";

const About = () => {
  return (
    <>
    <Navbar/>
      <div className="bg-[#FFF8F0]">

        {/* Hero Section */}
        <section className="bg-[#8B1E3F] text-white py-24">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About Vaidarbhi Sarees
            </h1>

            <p className="text-xl max-w-3xl mx-auto leading-8 text-gray-200">
              Where Tradition Meets Elegance. We bring together timeless
              craftsmanship, luxurious fabrics, and modern sophistication to
              celebrate every woman's unique style.
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

            <div>
              <img
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80"
                alt="Traditional Saree"
                className="rounded-3xl shadow-xl"
              />
            </div>

            <div>
              <h2 className="text-4xl font-bold text-[#8B1E3F] mb-6">
                Our Story
              </h2>

              <p className="text-gray-700 leading-8 mb-5">
                At Vaidarbhi Sarees, every saree tells a story of heritage,
                craftsmanship, and elegance. Inspired by India's rich textile
                traditions, we curate collections that blend authentic artistry
                with contemporary fashion.
              </p>

              <p className="text-gray-700 leading-8 mb-5">
                From luxurious Banarasi silks to graceful Kanjivarams,
                lightweight Chanderis, elegant Organzas, and handcrafted Cotton
                sarees, every drape is carefully selected to reflect timeless
                beauty and unmatched quality.
              </p>

              <p className="text-gray-700 leading-8">
                Whether it's a wedding, festive celebration, office event, or a
                cherished family gathering, Vaidarbhi Sarees ensures you look
                elegant on every occasion.
              </p>
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

              <div className="bg-[#FFF8F0] rounded-2xl p-8 shadow text-center">
                <FiAward className="mx-auto text-5xl text-[#C9A227]" />
                <h3 className="font-bold text-xl mt-5">
                  Premium Quality
                </h3>
                <p className="mt-3 text-gray-600">
                  Carefully selected fabrics crafted with exceptional attention
                  to detail.
                </p>
              </div>

              <div className="bg-[#FFF8F0] rounded-2xl p-8 shadow text-center">
                <FiHeart className="mx-auto text-5xl text-[#C9A227]" />
                <h3 className="font-bold text-xl mt-5">
                  Authentic Designs
                </h3>
                <p className="mt-3 text-gray-600">
                  Traditional Indian artistry blended with modern elegance.
                </p>
              </div>

              <div className="bg-[#FFF8F0] rounded-2xl p-8 shadow text-center">
                <FiTruck className="mx-auto text-5xl text-[#C9A227]" />
                <h3 className="font-bold text-xl mt-5">
                  Fast Delivery
                </h3>
                <p className="mt-3 text-gray-600">
                  Secure packaging with reliable delivery across India.
                </p>
              </div>

              <div className="bg-[#FFF8F0] rounded-2xl p-8 shadow text-center">
                <FiShield className="mx-auto text-5xl text-[#C9A227]" />
                <h3 className="font-bold text-xl mt-5">
                  Trusted Shopping
                </h3>
                <p className="mt-3 text-gray-600">
                  Safe payments, genuine products, and dedicated customer
                  support.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-6 text-center">

            <h2 className="text-4xl font-bold text-[#8B1E3F] mb-6">
              Our Mission
            </h2>

            <p className="text-gray-700 text-lg leading-8">
              Our mission is to preserve India's rich weaving heritage while
              making premium sarees accessible to women across the world. We
              believe every saree is more than attire—it's a symbol of grace,
              confidence, and tradition.
            </p>

          </div>
        </section>

      </div>
    <Footer/>
        </>
  );
};

export default About;