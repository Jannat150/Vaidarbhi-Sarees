import { Link } from "react-router-dom";
import Categories from "../components/Categories";
import FeaturedProducts from "../components/FeaturedProduct";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/Authcontext";

const Home = () => {
  const { user } = useAuth();

  return (
    <>
      <Navbar />

      {/* Admin Banner */}
      {user?.role === "admin" && (
        <div className="bg-gradient-to-r from-[#8B1E3F] to-[#C9A227] py-12">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-white">
                Welcome Admin 👋
              </h1>

              <p className="text-white mt-3 text-lg">
                Manage products, users, orders and your store from the
                Admin Dashboard.
              </p>
            </div>

            <Link
              to="/admin"
              className="mt-6 md:mt-0 bg-white text-[#8B1E3F] px-8 py-4 rounded-xl text-lg font-bold hover:bg-gray-100 transition"
            >
              Go to Admin Dashboard →
            </Link>
          </div>
        </div>
      )}

      <Hero />
      <Categories />
      <FeaturedProducts />
      <Footer />
    </>
  );
};

export default Home;