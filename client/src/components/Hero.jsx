import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-[#FFF8F0] min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-center">

        {/* Left Content */}
        <div>
          <p className="text-[#C9A227] uppercase tracking-[4px] font-semibold mb-3">
            Vaidarbhi Sarees
          </p>

          <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-[#2B2B2B]">
            Discover the Timeless Beauty
            <span className="block text-[#8B1E3F]">
              of Indian Sarees
            </span>
          </h1>

          <p className="mt-6 text-gray-600 text-lg leading-8">
            <strong>Where Tradition Meets Elegance.</strong>
            <br />
            Explore handcrafted sarees that celebrate India's rich heritage,
            luxurious fabrics, and timeless craftsmanship for every occasion.
          </p>

          <div className="flex flex-wrap gap-5 mt-10">

            <button
              onClick={() => navigate("/shop")}
              className="bg-[#8B1E3F] hover:bg-[#701632] text-white px-8 py-4 rounded-full transition-all duration-300 flex items-center gap-2 shadow-lg"
            >
              Shop Collection
              <FiArrowRight size={20} />
            </button>

            <button
              onClick={() => navigate("/collections")}
              className="border-2 border-[#8B1E3F] text-[#8B1E3F] hover:bg-[#8B1E3F] hover:text-white px-8 py-4 rounded-full transition-all duration-300"
            >
              Explore Collection 
            </button>

          </div>
        </div>

        {/* Right Image */}
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80"
            alt="Elegant Saree"
            className="rounded-3xl shadow-2xl w-full object-cover"
          />

          <div className="absolute -bottom-6 left-6 bg-white shadow-xl rounded-2xl px-6 py-4">
            <h3 className="text-3xl font-bold text-[#8B1E3F]">
              10K+
            </h3>

            <p className="text-gray-600">
              Happy Customers
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;