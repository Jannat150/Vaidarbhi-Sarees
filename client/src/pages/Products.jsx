import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const { data } = await API.get("/products");
      setProducts(data.products);
    } catch (err) {
      console.log(err);
      alert("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <Navbar />

      <div className="bg-[#FFF8F0] min-h-screen py-12 px-6">

        <div className="max-w-7xl mx-auto">

          <h1 className="text-4xl font-bold text-[#8B1E3F] mb-10">
            Our Saree Collection
          </h1>

          {loading ? (
            <div className="text-center text-xl">
              Loading Products...
            </div>
          ) : products.length === 0 ? (
            <div className="text-center text-gray-600">
              No Products Found
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden"
                >
                  <img
                    src={product.images?.[0]}
                    alt={product.name}
                    className="w-full h-72 object-cover"
                  />

                  <div className="p-5">

                    <h2 className="font-bold text-lg">
                      {product.name}
                    </h2>

                    <p className="text-gray-500 mt-1">
                      {product.fabric}
                    </p>

                    <div className="mt-3 flex items-center gap-3">

                      {product.discountPrice ? (
                        <>
                          <span className="text-2xl font-bold text-[#8B1E3F]">
                            ₹{product.discountPrice}
                          </span>

                          <span className="line-through text-gray-400">
                            ₹{product.price}
                          </span>
                        </>
                      ) : (
                        <span className="text-2xl font-bold text-[#8B1E3F]">
                          ₹{product.price}
                        </span>
                      )}

                    </div>

                    <Link
  to={`/product/${product.slug}`}
  className="block mt-5 bg-[#8B1E3F] text-white text-center py-3 rounded-xl hover:bg-[#6d1731]"
>
  View Details
</Link>

                  </div>
                </div>
              ))}

            </div>
          )}

        </div>

      </div>

      <Footer />
    </>
  );
};

export default Products;