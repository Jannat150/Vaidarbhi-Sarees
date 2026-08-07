import { useEffect, useState } from "react";
import API from "../services/axios";
import ProductCard from "./ProductCard";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await API.get("/products/featured");

      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="uppercase tracking-[4px] text-[#C9A227]">
            Best Collection
          </p>

          <h2 className="text-5xl font-bold mt-3">
            Featured Sarees
          </h2>

          <p className="text-gray-500 mt-4">
            Handpicked favourites from our latest collection.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;