import { FiHeart, FiShoppingCart } from "react-icons/fi";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-3xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group">
      <div className="overflow-hidden">
        <img
          src={product.images?.[0]}
          alt={product.name}
          className="h-96 w-full object-cover group-hover:scale-105 transition duration-500"
        />
      </div>

      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-800">
          {product.name}
        </h3>

        <div className="flex items-center gap-3 mt-3">
          <span className="text-2xl font-bold text-[#8B1E3F]">
            ₹{product.discountPrice || product.price}
          </span>

          {product.discountPrice && (
            <span className="line-through text-gray-400">
              ₹{product.price}
            </span>
          )}
        </div>

        <div className="flex justify-between mt-6">
          <button className="bg-[#8B1E3F] text-white px-4 py-2 rounded-full flex items-center gap-2">
            <FiShoppingCart />
            Cart
          </button>

          <button className="border border-[#8B1E3F] p-3 rounded-full">
            <FiHeart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;