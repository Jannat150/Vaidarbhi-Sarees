import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await API.get(`/products/${slug}`);
        setProduct(data);
      } catch (err) {
        console.error(err);
        alert("Product not found");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  const addToWishlist = async () => {
    try {
      await API.post("/wishlist", { productId: product._id });
      alert("Added to wishlist");
    } catch (err) {
      console.error(err);
      alert("Failed to add to wishlist");
    }
  };

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find(
      (item) => item._id === product._id
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({
        _id: product._id,
        name: product.name,
        price: product.price,
        discountPrice: product.discountPrice,
        images: product.images,
        stock: product.stock,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Product added to cart!");

    navigate("/cart");
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex justify-center items-center text-xl">
          Loading...
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex justify-center items-center text-xl">
          Product not found
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="bg-[#FFF8F0] py-12">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">

          {/* Product Image */}
          <div>
            <img
              src={product.images?.[0]}
              alt={product.name}
              className="w-full rounded-3xl shadow-lg object-cover"
            />
          </div>

          {/* Product Details */}
          <div>

            <h1 className="text-4xl font-bold text-[#8B1E3F]">
              {product.name}
            </h1>

            <p className="text-gray-600 mt-4">
              {product.description}
            </p>

            <div className="mt-6 space-y-2 text-lg">
              <p><strong>Fabric:</strong> {product.fabric}</p>
              <p><strong>Occasion:</strong> {product.occasion}</p>
              <p><strong>Work Type:</strong> {product.workType}</p>
              <p><strong>Region:</strong> {product.region}</p>
              <p><strong>Color:</strong> {product.color}</p>
              <p><strong>Stock:</strong> {product.stock}</p>
            </div>

            <div className="mt-8 flex items-center gap-4">
              {product.discountPrice ? (
                <>
                  <span className="text-4xl font-bold text-[#8B1E3F]">
                    ₹{product.discountPrice}
                  </span>

                  <span className="text-2xl text-gray-400 line-through">
                    ₹{product.price}
                  </span>
                </>
              ) : (
                <span className="text-4xl font-bold text-[#8B1E3F]">
                  ₹{product.price}
                </span>
              )}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <button
                onClick={addToCart}
                className="bg-[#8B1E3F] hover:bg-[#6f1732] text-white px-8 py-4 rounded-xl transition"
              >
                Add To Cart
              </button>

              <button
                onClick={addToWishlist}
                className="border border-[#8B1E3F] text-[#8B1E3F] px-8 py-4 rounded-xl hover:bg-[#8B1E3F] hover:text-white transition"
              >
                Add To Wishlist
              </button>
            </div>

          </div>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProductDetails;